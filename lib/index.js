import { resolveDingTalkConfig } from './config.js';
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
function renderNotify(value) {
    if (value.msgtype === 'markdown') {
        return oneText('已通过钉钉机器人发送 Markdown 消息（标题「' + value.title + '」），钉钉返回 errcode=' + value.errcode + '，errmsg=' + value.errmsg);
    }
    return oneText('已通过钉钉机器人发送文本消息，钉钉返回 errcode=' + value.errcode + '，errmsg=' + value.errmsg);
}
export function apply(ctx, config = {}) {
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
        async execute(rawArgs) {
            const args = rawArgs;
            if (typeof args.title !== 'string' || args.title.trim() === '')
                throw new Error('title 不能为空');
            if (typeof args.text !== 'string' || args.text.trim() === '')
                throw new Error('text 不能为空');
            const result = await getClient().sendMarkdown(args.title, args.text);
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
        async execute(rawArgs) {
            const args = rawArgs;
            if (typeof args.content !== 'string' || args.content.trim() === '')
                throw new Error('content 不能为空');
            const result = await getClient().sendText(args.content);
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
                return oneText(lines.join('\n'));
            },
        },
        async execute() {
            const checks = [];
            let ok = true;
            try {
                const resolved = resolveDingTalkConfig(config);
                checks.push({ name: 'webhook', ok: true, detail: '已配置' });
                const secret = resolved.secret;
                checks.push({ name: '加签密钥', ok: true, detail: typeof secret === 'string' && secret !== '' ? '已配置（加签模式）' : '未配置（关键词/白名单模式）' });
            }
            catch (error) {
                ok = false;
                checks.push({ name: 'webhook', ok: false, detail: error instanceof Error ? error.message : String(error) });
            }
            return { ok, plugin: 'dsh-dingtalk', checks };
        },
    });
}
export { resolveDingTalkConfig, DINGTALK_SECRET_ENV, DEFAULT_TIMEOUT_MS, clampInt } from './config.js';
export { DingTalkClient, DingTalkError, dingTalkErrorMessage } from './client.js';
export { computeDingTalkSign, signedUrl, dingTalkTimestamp } from './sign.js';
