import test, { beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { apply, Config, liveConfig, resolveDingTalkConfig, DINGTALK_SECRET_ENV, clampInt } from '../lib/index.js'

// User machines may already have real credentials. Configuration fixtures never use them.
const originalSecret = process.env[DINGTALK_SECRET_ENV]
beforeEach(() => { delete process.env[DINGTALK_SECRET_ENV] })
afterEach(() => {
  if (originalSecret === undefined) delete process.env[DINGTALK_SECRET_ENV]
  else process.env[DINGTALK_SECRET_ENV] = originalSecret
})

test('webhook 必填，缺失时抛出中文配置指引（同时覆盖原生设置页与 cordis.patch.yml）', () => {
  assert.throws(() => resolveDingTalkConfig({}), /dsh-dingtalk 未配置/)
  assert.throws(() => resolveDingTalkConfig({}), /webhook/)
  assert.throws(() => resolveDingTalkConfig({}), /设置 → 插件/)
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

test('Config Schema 兼容宿主设置面板：凭据脱敏、volatile 热更新与 toJSON 序列化', async () => {
  assert.equal(Config[Symbol.for('schemastery')], true)
  assert.equal(Config.dict.webhook.meta.role, 'secret')
  assert.equal(Config.dict.secret.meta.role, 'secret')
  assert.equal(Config.dict.webhook.meta.volatile, true)
  assert.equal(Config.dict.secret.meta.volatile, true)
  assert.equal(Config.dict.timeoutMs.meta.volatile, true)

  const serialized = JSON.parse(JSON.stringify(Config))
  assert.equal(typeof serialized.uid, 'number')
  assert.ok(serialized.refs && typeof serialized.refs === 'object')

  const parsed = Config({})
  assert.equal(Symbol.for('cosmokit.volatile.write') in parsed.webhook, true)
  assert.equal(parsed.webhook.get(), undefined)

  // 模拟用户在 DSH 设置页热更新：无需重新 apply，dingtalk_health 立即读到新配置
  const ctx = { tools: { defs: [], register(def) { this.defs.push(def); return () => {} } }, logger: { warn() {} }, on() { return () => {} } }
  apply(ctx, parsed)
  const health = ctx.tools.defs.find((d) => d.name === 'dingtalk_health')
  assert.equal((await health.execute({})).ok, false)

  const updated = Config({ webhook: 'https://oapi.dingtalk.com/robot/send?access_token=live-token', secret: 'SEC-LIVE' })
  const writeSym = Symbol.for('cosmokit.volatile.write')
  parsed.webhook[writeSym](updated.webhook.get())
  parsed.secret[writeSym](updated.secret.get())
  assert.equal(liveConfig(parsed).webhook, 'https://oapi.dingtalk.com/robot/send?access_token=live-token')
  assert.equal((await health.execute({})).ok, true)
})
