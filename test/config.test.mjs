import test from 'node:test'
import assert from 'node:assert/strict'
import { resolveDingTalkConfig, DINGTALK_SECRET_ENV, clampInt } from '../lib/index.js'

test('webhook 必填，缺失时抛出中文配置指引', () => {
  assert.throws(() => resolveDingTalkConfig({}), /dsh-dingtalk 未配置/)
  assert.throws(() => resolveDingTalkConfig({}), /webhook/)
  assert.throws(() => resolveDingTalkConfig({}), /cordis\.patch\.yml/)
  assert.throws(() => resolveDingTalkConfig(undefined), /webhook/)
})

test('webhook 去首尾空白，secret 可选、默认空', () => {
  const r = resolveDingTalkConfig({ webhook: '  https://oapi.dingtalk.com/robot/send?access_token=TOKEN  ' })
  assert.equal(r.webhook, 'https://oapi.dingtalk.com/robot/send?access_token=TOKEN')
  assert.equal(r.secret, '')
  assert.equal(r.timeoutMs, 10000)
})

test('secret 优先用显式配置，其次环境变量', () => {
  const old = process.env[DINGTALK_SECRET_ENV]
  delete process.env[DINGTALK_SECRET_ENV]
  try {
    assert.equal(resolveDingTalkConfig({ webhook: 'W' }).secret, '')
    process.env[DINGTALK_SECRET_ENV] = 'ENV-SECRET'
    assert.equal(resolveDingTalkConfig({ webhook: 'W' }).secret, 'ENV-SECRET')
    assert.equal(resolveDingTalkConfig({ webhook: 'W', secret: 'YAML-SECRET' }).secret, 'YAML-SECRET')
  } finally {
    if (old === undefined) delete process.env[DINGTALK_SECRET_ENV]
    else process.env[DINGTALK_SECRET_ENV] = old
  }
})

test('timeoutMs 夹取到合法范围，非法值兜底', () => {
  assert.equal(resolveDingTalkConfig({ webhook: 'W' }).timeoutMs, 10000)
  assert.equal(resolveDingTalkConfig({ webhook: 'W', timeoutMs: 10 }).timeoutMs, 1000)
  assert.equal(resolveDingTalkConfig({ webhook: 'W', timeoutMs: 999999 }).timeoutMs, 60000)
  assert.equal(resolveDingTalkConfig({ webhook: 'W', timeoutMs: 'x' }).timeoutMs, 10000)
})

test('clampInt 夹取与兜底', () => {
  assert.equal(clampInt(5, 10, 1, 100), 5)
  assert.equal(clampInt(999, 10, 1, 100), 100)
  assert.equal(clampInt(-1, 10, 1, 100), 1)
  assert.equal(clampInt('x', 10, 1, 100), 10)
})
