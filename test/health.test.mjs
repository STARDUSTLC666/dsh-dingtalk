import test from 'node:test'
import assert from 'node:assert/strict'
import { apply } from '../lib/index.js'

function fakeCtx() {
  return {
    tools: { defs: [], register(def) { this.defs.push(def); return () => {} } },
    logger: { warn() {} },
    on() { return () => {} },
  }
}

test('dingtalk_health webhook 配置就绪时 ok=true', async () => {
  const ctx = fakeCtx()
  apply(ctx, { webhook: 'https://oapi.dingtalk.com/robot/send?access_token=t', secret: 'SEC123' })
  const health = ctx.tools.defs.find((d) => d.name === 'dingtalk_health')
  const value = await health.execute({})
  assert.equal(value.ok, true)
  assert.match(String(value.checks[1].detail), /加签模式/)
})

test('dingtalk_health 未配置 webhook 时 ok=false 且有指引', async () => {
  const ctx = fakeCtx()
  apply(ctx, {})
  const health = ctx.tools.defs.find((d) => d.name === 'dingtalk_health')
  const value = await health.execute({})
  assert.equal(value.ok, false)
  assert.notEqual(String(value.checks[0].detail), '')
})
