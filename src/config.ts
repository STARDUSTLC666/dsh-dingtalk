export const DINGTALK_SECRET_ENV = 'DSH_DINGTALK_SECRET'
export const DEFAULT_TIMEOUT_MS = 10000

export interface DingTalkConfig {
  /** 完整 webhook URL（必填），形如 https://oapi.dingtalk.com/robot/send?access_token=XXX */
  webhook?: string
  /** 加签密钥（可选，推荐）。省略时回退环境变量 DSH_DINGTALK_SECRET */
  secret?: string
  /** 请求超时毫秒数，默认 10000（1000–60000） */
  timeoutMs?: number
}

export interface ResolvedDingTalkConfig {
  webhook: string
  secret: string
  timeoutMs: number
}

/**
 * 解析并校验原始行配置。webhook 缺失时抛出带中文指引的错误（模型与用户都读）。
 * 只解析、不失败：secret 可选，未配置加签则不加签。
 */
export function resolveDingTalkConfig(config: DingTalkConfig | undefined): ResolvedDingTalkConfig {
  const raw = config ?? {}
  const webhook = (typeof raw.webhook === 'string' ? raw.webhook : '').trim()
  const secret = (typeof raw.secret === 'string' ? raw.secret : '').trim() || (process.env[DINGTALK_SECRET_ENV] ?? '').trim()
  if (webhook === '') {
    throw new Error(
      'dsh-dingtalk 未配置：webhook（钉钉机器人完整地址）未填写。请在 profile 的 cordis.patch.yml 中覆盖 tool-dingtalk 行并重启（见插件 README）',
    )
  }
  return {
    webhook,
    secret,
    timeoutMs: clampInt(raw.timeoutMs, DEFAULT_TIMEOUT_MS, 1000, 60000),
  }
}

/**
 * 校验 webhook 形态（纯本地判断，不发网络请求）。
 *
 * 只判空会把「粘错 token」「少了 access_token」「用了 http」当成已配置，
 * 直到真正发送失败才暴露；这里按钉钉机器人地址的真实结构逐项给出原因。
 */
export function describeWebhookProblem(webhook: string): string | undefined {
  if (webhook === '') return '未配置 webhook'
  let url: URL
  try {
    url = new URL(webhook)
  } catch {
    return 'webhook 不是合法 URL（应形如 https://oapi.dingtalk.com/robot/send?access_token=...）'
  }
  if (url.protocol !== 'https:') return 'webhook 必须使用 https（当前 ' + url.protocol + '//）'
  if (!/^(?:[a-z0-9-]+\.)*oapi\.dingtalk\.com$/i.test(url.hostname)) return 'webhook 主机不是 oapi.dingtalk.com（当前 ' + url.hostname + '）'
  if (url.pathname !== '/robot/send') return 'webhook 路径应为 /robot/send（当前 ' + url.pathname + '）'
  const token = url.searchParams.get('access_token')
  if (token === null || token.trim() === '') return 'webhook 缺少 access_token 参数'
  return undefined
}

export function clampInt(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === 'number' ? Math.trunc(value) : fallback
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, n))
}
