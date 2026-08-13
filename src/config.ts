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

export function clampInt(value: unknown, fallback: number, min: number, max: number): number {
  const n = typeof value === 'number' ? Math.trunc(value) : fallback
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, n))
}
