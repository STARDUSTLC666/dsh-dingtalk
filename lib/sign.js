import { createHmac } from 'node:crypto';
/** 当前毫秒时间戳（字符串）。 */
export function dingTalkTimestamp(now = Date.now()) {
    return String(Math.floor(now));
}
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
export function computeDingTalkSign(secret, timestamp) {
    const stringToSign = timestamp + '\n' + secret;
    const hmac = createHmac('sha256', secret).update(stringToSign, 'utf8').digest();
    return encodeURIComponent(hmac.toString('base64'));
}
/** 在 webhook 地址上追加 timestamp 与 sign 参数（secret 为空则原样返回）。 */
export function signedUrl(webhook, secret, timestamp) {
    if (!secret)
        return webhook;
    const ts = timestamp ?? dingTalkTimestamp();
    const sign = computeDingTalkSign(secret, ts);
    const sep = webhook.includes('?') ? '&' : '?';
    return webhook + sep + 'timestamp=' + ts + '&sign=' + sign;
}
