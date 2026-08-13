import { resolveDingTalkConfig, type DingTalkConfig } from './config.js'
import { DingTalkClient } from './client.js'
import type { DingTalkNotifyArgs, DingTalkNotifyResult, DingTalkTextArgs } from './types.js'

export const name = 'tool-dingtalk'
export const inject = ['tools']
export type Config = DingTalkConfig

/**
 * 把作者 DSL 映射编译成原生 JSON Schema 对象，作为 defineTool 的
 * definition.parameters 原样下发。原生 wire 请求会逐字携带该值，塞原始 DSL
 * 会被模型 API 拒绝（"schema must be a JSON Schema of 'type: object'"）。
 */
function compileParameters(spec: Record<string, any>): Record<string, unknown> {
  const properties: Record<string, unknown> = {}
  const required: string[] = []
  for (const [key, prop] of Object.entries(spec)) {
    if (prop?.required === true) required.push(key)
    const node: Record<string, unknown> = {}
    if (typeof prop?.type === 'string') node.type = prop.type
    if (typeof prop?.description === 'string') node.description = prop.description
    properties[key] = node
  }
  return { type: 'object', properties, ...(required.length > 0 ? { required } : {}) }
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
}

type TextBlock = { type: 'text'; text: string }
function oneText(text: string): TextBlock[] {
  return [{ type: 'text', text }]
}

function renderNotify(value: DingTalkNotifyResult): TextBlock[] {
  if (value.msgtype === 'markdown') {
    return oneText('已通过钉钉机器人发送 Markdown 消息（标题「' + value.title + '」），钉钉返回 errcode=' + value.errcode + '，errmsg=' + value.errmsg)
  }
  return oneText('已通过钉钉机器人发送文本消息，钉钉返回 errcode=' + value.errcode + '，errmsg=' + value.errmsg)
}

export function apply(ctx: any, config: Config = {}): void {
  let client: DingTalkClient | null = null
  let fingerprint = ''
  const getClient = (): DingTalkClient => {
    const resolved = resolveDingTalkConfig(config)
    const fp = JSON.stringify(resolved)
    if (client === null || fp !== fingerprint) {
      client = new DingTalkClient(resolved)
      fingerprint = fp
    }
    return client
  }

  // 加载期仅提示，绝不弄崩启动；具体细节由各工具的 execute 抛出中文指引。
  try {
    getClient()
  } catch (error) {
    ctx.logger?.warn?.('[dsh-dingtalk] ' + (error instanceof Error ? error.message : '未配置钉钉机器人'))
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
      render: (_args: unknown, value: unknown) => renderNotify(value as DingTalkNotifyResult),
    },
    async execute(rawArgs: unknown) {
      const args = rawArgs as DingTalkNotifyArgs
      if (typeof args.title !== 'string' || args.title.trim() === '') throw new Error('title 不能为空')
      if (typeof args.text !== 'string' || args.text.trim() === '') throw new Error('text 不能为空')
      const result = await getClient().sendMarkdown(args.title, args.text)
      return { ok: true, msgtype: 'markdown' as const, title: args.title, errcode: result.errcode, errmsg: result.errmsg }
    },
  })

  ctx.tools.register({
    name: 'dingtalk_text',
    description: '向配置的钉钉群发送一条纯文本消息（单向通知）。',
    parameters: compileParameters({
      content: { type: 'string', required: true, description: '纯文本消息内容' },
    }),
    output: {
      schema: notifySchema,
      render: (_args: unknown, value: unknown) => renderNotify(value as DingTalkNotifyResult),
    },
    async execute(rawArgs: unknown) {
      const args = rawArgs as DingTalkTextArgs
      if (typeof args.content !== 'string' || args.content.trim() === '') throw new Error('content 不能为空')
      const result = await getClient().sendText(args.content)
      return { ok: true, msgtype: 'text' as const, title: '', errcode: result.errcode, errmsg: result.errmsg }
    },
  })
}

export { resolveDingTalkConfig, DINGTALK_SECRET_ENV, DEFAULT_TIMEOUT_MS, clampInt } from './config.js'
export { DingTalkClient, DingTalkError, dingTalkErrorMessage } from './client.js'
export type { FetchLike, FetchLikeResponse, DingTalkClientOptions } from './client.js'
export { computeDingTalkSign, signedUrl, dingTalkTimestamp } from './sign.js'
