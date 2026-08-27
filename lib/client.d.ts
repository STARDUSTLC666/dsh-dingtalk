import type { DingTalkSendResult } from './types.js';
export interface FetchLikeResponse {
    ok: boolean;
    status: number;
    json(): Promise<unknown>;
    text(): Promise<string>;
}
export type FetchLike = (url: string, init?: Record<string, unknown>) => Promise<FetchLikeResponse>;
export declare class DingTalkError extends Error {
    readonly errcode: number | undefined;
    constructor(message: string, errcode?: number);
}
/** 把钉钉 errcode 映射为中文指引（模型与用户都读）。 */
export declare function dingTalkErrorMessage(errcode: number, errmsg: string): string;
export interface DingTalkClientOptions {
    webhook: string;
    secret?: string;
    timeoutMs?: number;
    /** 可注入的 fetch 实现（默认用全局 fetch），便于测试。 */
    fetchImpl?: FetchLike;
}
/** 钉钉自定义机器人 webhook 客户端（单向发送，加签模式）。 */
export declare class DingTalkClient {
    private readonly webhook;
    private readonly secret;
    private readonly timeoutMs;
    private readonly fetchImpl;
    constructor(options: DingTalkClientOptions);
    /** 发送 Markdown 消息：{ msgtype: 'markdown', markdown: { title, text } } */
    sendMarkdown(title: string, text: string): Promise<DingTalkSendResult>;
    /** 发送纯文本消息：{ msgtype: 'text', text: { content } } */
    sendText(content: string): Promise<DingTalkSendResult>;
    private post;
}
