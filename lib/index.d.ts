import { type DingTalkConfig } from './config.js';
export declare const name = "tool-dingtalk";
export declare const inject: string[];
export type Config = DingTalkConfig;
export declare function apply(ctx: any, config?: Config): void;
export { resolveDingTalkConfig, DINGTALK_SECRET_ENV, DEFAULT_TIMEOUT_MS, clampInt } from './config.js';
export { DingTalkClient, DingTalkError, dingTalkErrorMessage } from './client.js';
export type { FetchLike, FetchLikeResponse, DingTalkClientOptions } from './client.js';
export { computeDingTalkSign, signedUrl, dingTalkTimestamp } from './sign.js';
