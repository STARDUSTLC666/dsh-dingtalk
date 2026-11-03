import { registerUpdates } from '@stardustlc/dsh-updates';
import { describeWebhookProblem, resolveDingTalkConfig, DINGTALK_SECRET_ENV } from './config.js';
import { DingTalkClient } from './client.js';
export const name = 'tool-dingtalk';
export const inject = ['tools'];
/**
 * 把作者 DSL 映射编译成原生 JSON Schema 对象，作为 defineTool 的
 * definition.parameters 原样下发。原生 wire 请求会逐字携带该值，塞原始 DSL
 * 会被模型 API 拒绝（"schema must be a JSON Schema of 'type: object'"）。
 */
function compileParameters(spec) {
    const properties = {};
    const required = [];
    for (const [key, prop] of Object.entries(spec)) {
        if (prop?.required === true)
            required.push(key);
        const node = {};
        if (typeof prop?.type === 'string')
            node.type = prop.type;
        if (typeof prop?.description === 'string')
            node.description = prop.description;
        properties[key] = node;
    }
    return { type: 'object', properties, ...(required.length > 0 ? { required } : {}) };
}
const notifySchema = {
    type: 'object',
    properties: {
        ok: { type: 'boolean' },
        msgtype: { type: 'string' },
        title: { type: 'string' },
        errcode: { type: 'integer' },
        errmsg: { type: 'string' },
    },
    additionalProperties: true,
};
function oneText(text) {
    return [{ type: 'text', text }];
}
function executionSignal(exec) {
    const signal = exec?.signal;
    return signal instanceof AbortSignal ? signal : undefined;
}
/**
 * 成功回执只留用户需要的信息：发到哪、发了什么标题。
 * 原来把 errcode=0 / errmsg=ok 也摆出来，属于协议噪声；错误路径由 client 抛中文指引。
 */
function renderNotify(value) {
    if (value.msgtype === 'markdown') {
        return oneText('已发送 Markdown 消息到钉钉群（标题「' + value.title + '」）。如需核对，请查看群消息。');
    }
    return oneText('已发送文本消息到钉钉群。如需核对，请查看群消息。');
}
export function apply(ctx, config = {}) {
    registerUpdates(ctx, { name: "dsh-dingtalk" });
    let client = null;
    let fingerprint = '';
    const getClient = () => {
        const resolved = resolveDingTalkConfig(config);
        const fp = JSON.stringify(resolved);
        if (client === null || fp !== fingerprint) {
            client = new DingTalkClient(resolved);
            fingerprint = fp;
        }
        return client;
    };
    // 加载期仅提示，绝不弄崩启动；具体细节由各工具的 execute 抛出中文指引。
    try {
        getClient();
    }
    catch (error) {
        ctx.logger?.warn?.('[dsh-dingtalk] ' + (error instanceof Error ? error.message : '未配置钉钉机器人'));
    }
    ctx.tools.register({
        name: 'dingtalk_notify',
        description: '向配置的钉钉群发送一条 Markdown 消息（单向通知）。title 为标题，text 为 Markdown 正文；需先在 profile 的 cordis.patch.yml 配置 webhook（与可选 secret 加签密钥）。',
        parameters: compileParameters({
            title: { type: 'string', required: true, description: '消息标题（显示在钉钉卡片顶部）' },
            text: { type: 'string', required: true, description: 'Markdown 正文内容' },
        }),
        output: {
            schema: notifySchema,
            render: (_args, value) => renderNotify(value),
        },
        timeoutMs: 65000,
        async execute(rawArgs, exec) {
            const args = rawArgs;
            if (typeof args.title !== 'string' || args.title.trim() === '')
                throw new Error('title 不能为空：请提供显示在钉钉卡片顶部的消息标题。');
            if (typeof args.text !== 'string' || args.text.trim() === '')
                throw new Error('text 不能为空：请提供 Markdown 正文（钉钉单条消息有长度上限，过长请分段发送）。');
            const result = await getClient().sendMarkdown(args.title, args.text, executionSignal(exec));
            return { ok: true, msgtype: 'markdown', title: args.title, errcode: result.errcode, errmsg: result.errmsg };
        },
    });
    ctx.tools.register({
        name: 'dingtalk_text',
        description: '向配置的钉钉群发送一条纯文本消息（单向通知）。',
        parameters: compileParameters({
            content: { type: 'string', required: true, description: '纯文本消息内容' },
        }),
        output: {
            schema: notifySchema,
            render: (_args, value) => renderNotify(value),
        },
        timeoutMs: 65000,
        async execute(rawArgs, exec) {
            const args = rawArgs;
            if (typeof args.content !== 'string' || args.content.trim() === '')
                throw new Error('content 不能为空：请提供要发送的纯文本内容。');
            const result = await getClient().sendText(args.content, executionSignal(exec));
            return { ok: true, msgtype: 'text', title: '', errcode: result.errcode, errmsg: result.errmsg };
        },
    });
    ctx.tools.register({
        name: 'dingtalk_health',
        description: 'dsh-dingtalk 自检：检查钉钉机器人 webhook 与加签密钥（secret）配置是否就绪（不发送任何消息）。遇到问题时先运行本工具定位。',
        parameters: compileParameters({}),
        output: {
            schema: { type: 'object', additionalProperties: true },
            render: (_args, value) => {
                const rec = (value ?? {});
                const rawChecks = Array.isArray(rec.checks) ? rec.checks : [];
                const lines = ['dsh-dingtalk 自检' + (rec.ok === true ? '：正常。' : '：发现问题。')];
                for (const item of rawChecks) {
                    const c = (item ?? {});
                    lines.push('- ' + String(c.name) + '：' + (c.ok === true ? '✅ ' + String(c.detail ?? '') : '❌ ' + String(c.detail ?? '')));
                }
                if (rec.ok !== true) {
                    lines.push('', '下一步：');
                    lines.push('  · 在 profile 的 cordis.patch.yml 里覆盖 tool-dingtalk 行，填完整 webhook（含 access_token）；secret 建议放环境变量 DSH_DINGTALK_SECRET，改完重启 DSH。');
                    lines.push('  · 发送失败时先看错误里的钉钉 errcode：310000 是加签不匹配，120001 是 token 失效，按提示改配置后重新运行 dingtalk_health。');
                }
                return oneText(lines.join('\n'));
            },
        },
        async execute() {
            const checks = [];
            let ok = true;
            // 自检只做本地校验：既不发消息，也不触网，避免「自检」把告警群刷屏。
            const webhook = typeof config?.webhook === 'string' ? config.webhook.trim() : '';
            const webhookProblem = describeWebhookProblem(webhook);
            if (webhookProblem === undefined) {
                checks.push({ name: 'webhook', ok: true, detail: '已配置（https://oapi.dingtalk.com/robot/send?access_token=***）' });
            }
            else {
                ok = false;
                checks.push({ name: 'webhook', ok: false, detail: webhookProblem + '：请从钉钉群「自定义机器人」设置里复制完整地址，填到 tool-dingtalk 行的 webhook 后重启' });
            }
            const configuredSecret = typeof config?.secret === 'string' ? config.secret.trim() : '';
            const envSecret = (process.env[DINGTALK_SECRET_ENV] ?? '').trim();
            if (configuredSecret !== '')
                checks.push({ name: '加签密钥', ok: true, detail: '已配置（加签模式，来源：配置里的 secret）' });
            else if (envSecret !== '')
                checks.push({ name: '加签密钥', ok: true, detail: '已配置（加签模式，来源：环境变量 ' + DINGTALK_SECRET_ENV + '）' });
            else
                checks.push({ name: '加签密钥', ok: true, detail: '未配置（关键词/IP 白名单模式；若机器人开启加签，发送会返回 310000）' });
            try {
                const resolved = resolveDingTalkConfig(config);
                checks.push({ name: '请求超时', ok: true, detail: resolved.timeoutMs + 'ms（1000-60000，可用 timeoutMs 调整）' });
            }
            catch {
                checks.push({ name: '请求超时', ok: true, detail: '默认 10000ms（webhook 未就绪时不做完整解析）' });
            }
            return { ok, plugin: 'dsh-dingtalk', checks };
        },
    });
}
export { resolveDingTalkConfig, describeWebhookProblem, DINGTALK_SECRET_ENV, DEFAULT_TIMEOUT_MS, clampInt } from './config.js';
export { DingTalkClient, DingTalkError, dingTalkErrorMessage } from './client.js';
export { computeDingTalkSign, signedUrl, dingTalkTimestamp } from './sign.js';
