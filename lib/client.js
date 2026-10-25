import { signedUrl } from './sign.js';
const defaultFetch = (url, init) => fetch(url, init);
export class DingTalkError extends Error {
    errcode;
    constructor(message, errcode) {
        super(message);
        this.name = 'DingTalkError';
        this.errcode = errcode;
    }
}
/** 把钉钉 errcode 映射为中文指引（模型与用户都读）。 */
export function dingTalkErrorMessage(errcode, errmsg) {
    if (errcode === 310000) {
        return '钉钉返回 310000（加签校验失败）：请检查 secret 加签密钥是否填写正确、是否与机器人「安全设置-加签」一致；若同时勾选了「自定义关键词」，也请确认消息包含关键词。';
    }
    if (errcode === 120001) {
        return '钉钉返回 120001（access_token 失效）：webhook 里的 token 已过期或被重置，请到钉钉群重新复制机器人 webhook 地址，覆盖配置里的 webhook。';
    }
    return '钉钉返回错误 ' + errcode + '：' + (errmsg || '未知错误');
}
/** 钉钉自定义机器人 webhook 客户端（单向发送，加签模式）。 */
export class DingTalkClient {
    webhook;
    secret;
    timeoutMs;
    fetchImpl;
    constructor(options) {
        this.webhook = options.webhook;
        this.secret = options.secret ?? '';
        this.timeoutMs = options.timeoutMs ?? 10000;
        this.fetchImpl = options.fetchImpl ?? defaultFetch;
    }
    /** 发送 Markdown 消息：{ msgtype: 'markdown', markdown: { title, text } } */
    async sendMarkdown(title, text, signal) {
        return this.post({ msgtype: 'markdown', markdown: { title, text } }, signal);
    }
    /** 发送纯文本消息：{ msgtype: 'text', text: { content } } */
    async sendText(content, signal) {
        return this.post({ msgtype: 'text', text: { content } }, signal);
    }
    async post(payload, signal) {
        signal?.throwIfAborted();
        const url = signedUrl(this.webhook, this.secret || undefined);
        const parsedUrl = new URL(url);
        const redact = (text) => [url, this.webhook, this.secret, parsedUrl.searchParams.get('access_token'), parsedUrl.searchParams.get('sign')]
            .filter((value) => typeof value === 'string' && value !== '')
            .reduce((safe, value) => safe.replaceAll(value, '[已隐藏]').replaceAll(encodeURIComponent(value), '[已隐藏]'), text);
        const controller = new AbortController();
        const requestSignal = signal ? AbortSignal.any([signal, controller.signal]) : controller.signal;
        const timer = setTimeout(() => controller.abort(new Error('请求超时')), this.timeoutMs);
        try {
            const response = await this.fetchImpl(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                signal: requestSignal,
            });
            requestSignal.throwIfAborted();
            if (!response.ok) {
                const body = await response.text().catch(() => '');
                requestSignal.throwIfAborted();
                throw new DingTalkError('钉钉机器人返回 HTTP ' + response.status + '：' + body.slice(0, 200));
            }
            let body;
            try {
                body = await response.json();
            }
            catch (error) {
                requestSignal.throwIfAborted();
                throw new DingTalkError('钉钉机器人返回非 JSON 响应（HTTP ' + response.status + '）');
            }
            requestSignal.throwIfAborted();
            const result = body;
            if (!Number.isSafeInteger(result?.errcode))
                throw new DingTalkError('钉钉机器人返回格式异常：缺少 errcode');
            if (result.errcode !== 0)
                throw new DingTalkError(dingTalkErrorMessage(result.errcode, result.errmsg ?? ''), result.errcode);
            return result;
        }
        catch (error) {
            signal?.throwIfAborted();
            if (controller.signal.aborted)
                throw new DingTalkError('钉钉机器人请求超时，尚未确认远端是否收到；请先核对群消息，再决定是否重发。');
            if (error instanceof DingTalkError)
                throw new DingTalkError(redact(error.message), error.errcode);
            const message = error instanceof Error ? error.message : String(error);
            const safe = redact(message);
            throw new DingTalkError('钉钉机器人请求失败：' + safe);
        }
        finally {
            clearTimeout(timer);
        }
    }
}
