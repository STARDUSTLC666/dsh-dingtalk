import { signedUrl } from './sign.js'
import type { DingTalkSendResult } from './types.js'

export interface FetchLikeResponse {
  ok: boolean
  status: number
  json(): Promise<unknown>
  text(): Promise<string>
}

export type FetchLike = (url: string, init?: Record<string, unknown>) => Promise<FetchLikeResponse>

const defaultFetch: FetchLike = (url, init) => fetch(url, init as unknown as RequestInit)

export class DingTalkError extends Error {
  readonly errcode: number | undefined
  constructor(message: string, errcode?: number) {
    super(message)
    this.name = 'DingTalkError'
    this.errcode = errcode
  }
}

/** 把钉钉 errcode 映射为中文指引（模型与用户都读）。 */
export function dingTalkErrorMessage(errcode: number, errmsg: string): string {
  if (errcode === 310000) {
    return '钉钉返回 310000（加签校验失败）：请检查 secret 加签密钥是否填写正确、是否与机器人「安全设置-加签」一致；若同时勾选了「自定义关键词」，也请确认消息包含关键词。'
  }
  if (errcode === 120001) {
    return '钉钉返回 120001（access_token 失效）：webhook 里的 token 已过期或被重置，请到钉钉群重新复制机器人 webhook 地址，覆盖配置里的 webhook。'
  }
  return '钉钉返回错误 ' + errcode + '：' + (errmsg || '未知错误')
}

export interface DingTalkClientOptions {
  webhook: string
  secret?: string
  timeoutMs?: number
  /** 可注入的 fetch 实现（默认用全局 fetch），便于测试。 */
  fetchImpl?: FetchLike
}

/** 钉钉自定义机器人 webhook 客户端（单向发送，加签模式）。 */
export class DingTalkClient {
  private readonly webhook: string
  private readonly secret: string
  private readonly timeoutMs: number
  private readonly fetchImpl: FetchLike

  constructor(options: DingTalkClientOptions) {
    this.webhook = options.webhook
    this.secret = options.secret ?? ''
    this.timeoutMs = options.timeoutMs ?? 10000
    this.fetchImpl = options.fetchImpl ?? defaultFetch
  }

  /** 发送 Markdown 消息：{ msgtype: 'markdown', markdown: { title, text } } */
  async sendMarkdown(title: string, text: string): Promise<DingTalkSendResult> {
    return this.post({ msgtype: 'markdown', markdown: { title, text } })
  }

  /** 发送纯文本消息：{ msgtype: 'text', text: { content } } */
  async sendText(content: string): Promise<DingTalkSendResult> {
    return this.post({ msgtype: 'text', text: { content } })
  }

  private async post(payload: unknown): Promise<DingTalkSendResult> {
    const url = signedUrl(this.webhook, this.secret || undefined)
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), this.timeoutMs)
    let response: FetchLikeResponse
    try {
      response = await this.fetchImpl(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      const hint = /abort/i.test(message) ? '（请求超时）' : ''
      throw new DingTalkError('钉钉机器人请求失败' + hint + '：' + message)
    } finally {
      clearTimeout(timer)
    }

    if (!response.ok) {
      const body = await response.text().catch(() => '')
      throw new DingTalkError('钉钉机器人返回 HTTP ' + response.status + '：' + body.slice(0, 200))
    }

    let body: unknown
    try {
      body = await response.json()
    } catch {
      throw new DingTalkError('钉钉机器人返回非 JSON 响应（HTTP ' + response.status + '）')
    }
    const result = body as DingTalkSendResult
    if (typeof result?.errcode !== 'number') {
      throw new DingTalkError('钉钉机器人返回格式异常：缺少 errcode')
    }
    if (result.errcode !== 0) {
      throw new DingTalkError(dingTalkErrorMessage(result.errcode, result.errmsg ?? ''), result.errcode)
    }
    return result
  }
}
