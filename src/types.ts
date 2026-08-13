export interface DingTalkNotifyArgs {
  title: string
  text: string
}

export interface DingTalkTextArgs {
  content: string
}

export interface DingTalkNotifyResult {
  ok: boolean
  msgtype: 'markdown' | 'text'
  title: string
  errcode: number
  errmsg: string
}

/** 钉钉 send 接口的原始返回（成功时 errcode === 0）。 */
export interface DingTalkSendResult {
  errcode: number
  errmsg: string
}
