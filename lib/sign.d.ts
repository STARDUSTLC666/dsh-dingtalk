/** 当前毫秒时间戳（字符串）。 */
export declare function dingTalkTimestamp(now?: number): string;
/**
 * 钉钉自定义机器人「加签」安全模式的签名。
 *
 * 官方算法：
 *   stringToSign = timestamp + "\n" + secret
 *   sign = urlencode(base64(HmacSHA256(secret, stringToSign)))
 *
 * 与官方 Python 示例的 urllib.parse.quote_plus(base64(...)) 等价：base64 输出
 * 不含空格，只需编码 '+' '/' '=' 三个字符，encodeURIComponent 正好覆盖。
 */
export declare function computeDingTalkSign(secret: string, timestamp: string): string;
/** 在 webhook 地址上追加 timestamp 与 sign 参数（secret 为空则原样返回）。 */
export declare function signedUrl(webhook: string, secret: string | undefined, timestamp?: string): string;
