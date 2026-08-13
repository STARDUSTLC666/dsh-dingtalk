import test from 'node:test'
import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { computeDingTalkSign, signedUrl, dingTalkTimestamp } from '../lib/index.js'

const SECRET = 'SEC8c9f1a2b3c4d5e6f'
const TIMESTAMP = '1700000000000'
const KNOWN_RAW = 'nw2DJH9MlafhSsHNrpyAXxqp9TZcNqKQEdc3PzfQDOs='
const KNOWN_SIGN = 'nw2DJH9MlafhSsHNrpyAXxqp9TZcNqKQEdc3PzfQDOs%3D'

test('computeDingTalkSign 与官方算法已知用例一致', () => {
  assert.equal(computeDingTalkSign(SECRET, TIMESTAMP), KNOWN_SIGN)
})

test('签名 = urlencode(base64(HmacSHA256(secret, timestamp+换行+secret)))', () => {
  const sign = computeDingTalkSign(SECRET, TIMESTAMP)
  const raw = decodeURIComponent(sign)
  assert.equal(raw, KNOWN_RAW)
  assert.equal(raw.length, 44) // 32 字节 HMAC-SHA256 的 base64 固定 44 字符（含填充）
  const expected = createHmac('sha256', SECRET).update(TIMESTAMP + '\n' + SECRET, 'utf8').digest('base64')
  assert.equal(raw, expected)
})

test('签名是确定性的：相同输入得到相同输出', () => {
  assert.equal(computeDingTalkSign(SECRET, TIMESTAMP), computeDingTalkSign(SECRET, TIMESTAMP))
})

test('signedUrl 追加 timestamp 与 sign', () => {
  const url = signedUrl('https://oapi.dingtalk.com/robot/send?access_token=TOKEN', SECRET, TIMESTAMP)
  assert.ok(url.includes('access_token=TOKEN'))
  assert.ok(url.includes('timestamp=' + TIMESTAMP))
  assert.ok(url.includes('sign=' + KNOWN_SIGN))
})

test('secret 为空时 signedUrl 原样返回（不加签）', () => {
  const url = 'https://oapi.dingtalk.com/robot/send?access_token=TOKEN'
  assert.equal(signedUrl(url, undefined, TIMESTAMP), url)
  assert.equal(signedUrl(url, '', TIMESTAMP), url)
})

test('dingTalkTimestamp 返回毫秒数字符串', () => {
  assert.equal(dingTalkTimestamp(1700000000123), '1700000000123')
  assert.match(dingTalkTimestamp(), /^\d{13}$/)
})
