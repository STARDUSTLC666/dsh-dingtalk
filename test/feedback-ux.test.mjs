import test from 'node:test'
import assert from 'node:assert/strict'
import { apply, describeWebhookProblem } from '../lib/index.js'

function fakeCtx() {
  return {
    tools: { defs: [], register(def) { this.defs.push(def); return () => {} } },
    logger: { warn() {} },
    on() { return () => {} },
  }
}

test('describeWebhookProblem：只判空会把粘错的地址当成已配置', () => {
  assert.equal(describeWebhookProblem('https://oapi.dingtalk.com/robot/send?access_token=abc'), undefined)
  assert.match(describeWebhookProblem(''), /未配置/)
  assert.match(describeWebhookProblem('not a url'), /不是合法 URL/)
  assert.match(describeWebhookProblem('http://oapi.dingtalk.com/robot/send?access_token=abc'), /https/)
  assert.match(describeWebhookProblem('https://example.com/robot/send?access_token=abc'), /oapi\.dingtalk\.com/)
  assert.match(describeWebhookProblem('https://oapi.dingtalk.com/robot/send'), /access_token/)
})

test('dingtalk_health：webhook 粘错时 ok=false 且指出具体问题', async () => {
  const ctx = fakeCtx()
  apply(ctx, { webhook: 'https://oapi.dingtalk.com/robot/send' })
  const health = ctx.tools.defs.find((d) => d.name === 'dingtalk_health')
  const value = await health.execute({})
  assert.equal(value.ok, false)
  assert.match(String(value.checks[0].detail), /access_token/)
  const text = health.output.render({}, value)[0].text
  assert.match(text, /自检：发现问题/)
  assert.match(text, /下一步：/)
  assert.match(text, /310000/)
})

test('dingtalk_health：区分 secret 来自配置还是环境变量', async () => {
  const ctx = fakeCtx()
  apply(ctx, { webhook: 'https://oapi.dingtalk.com/robot/send?access_token=t', secret: 'SEC123' })
  const health = ctx.tools.defs.find((d) => d.name === 'dingtalk_health')
  const fromConfig = await health.execute({})
  assert.match(String(fromConfig.checks[1].detail), /来源：配置/)

  const envCtx = fakeCtx()
  const old = process.env.DSH_DINGTALK_SECRET
  process.env.DSH_DINGTALK_SECRET = 'ENVSECRET'
  try {
    apply(envCtx, { webhook: 'https://oapi.dingtalk.com/robot/send?access_token=t' })
    const envHealth = envCtx.tools.defs.find((d) => d.name === 'dingtalk_health')
    const fromEnv = await envHealth.execute({})
    assert.match(String(fromEnv.checks[1].detail), /环境变量/)
  } finally {
    if (old === undefined) delete process.env.DSH_DINGTALK_SECRET
    else process.env.DSH_DINGTALK_SECRET = old
  }
})

test('发送成功回执只讲结果，不再摆 errcode/errmsg 噪声', async () => {
  const ctx = fakeCtx()
  apply(ctx, { webhook: 'https://oapi.dingtalk.com/robot/send?access_token=t', secret: 'S' })
  const oldFetch = globalThis.fetch
  globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => ({ errcode: 0, errmsg: 'ok' }), text: async () => '' })
  try {
    const notify = ctx.tools.defs.find((d) => d.name === 'dingtalk_notify')
    const value = await notify.execute({ title: '周报', text: '# 完成' })
    const text = notify.output.render({}, value)[0].text
    assert.match(text, /已发送 Markdown 消息到钉钉群/)
    assert.match(text, /周报/)
    assert.doesNotMatch(text, /errcode/)
  } finally {
    globalThis.fetch = oldFetch
  }
})

test('参数为空时错误里带上下一步', async () => {
  const ctx = fakeCtx()
  apply(ctx, { webhook: 'https://oapi.dingtalk.com/robot/send?access_token=t' })
  const notify = ctx.tools.defs.find((d) => d.name === 'dingtalk_notify')
  await assert.rejects(() => notify.execute({ title: ' ', text: 'x' }), /钉钉卡片顶部/)
  await assert.rejects(() => notify.execute({ title: 't', text: '' }), /Markdown 正文/)
})
