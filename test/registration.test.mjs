import test from 'node:test'
import assert from 'node:assert/strict'
import { apply } from '../lib/index.js'

function fakeCtx() {
  return {
    tools: { register(def) { this.defs.push(def) }, defs: [] },
    logger: { warn() {} },
  }
}

const CONFIG = { webhook: 'https://oapi.dingtalk.com/robot/send?access_token=TOKEN', secret: 'SEC' }

test('每个已注册工具的 parameters 都是编译好的 JSON Schema（原生 wire 契约）', () => {
  const ctx = fakeCtx()
  apply(ctx, {})
  for (const def of ctx.tools.defs) {
    assert.equal(def.parameters.type, 'object', def.name + ' parameters 根必须是 object')
    assert.ok(def.parameters.properties && typeof def.parameters.properties === 'object', def.name + ' 必须有 properties')
    for (const [key, node] of Object.entries(def.parameters.properties)) {
      assert.ok(typeof node.type === 'string', def.name + '.' + key + ' 必须声明 type')
    }
  }
  const notify = ctx.tools.defs.find(def => def.name === 'dingtalk_notify')
  assert.deepEqual(notify.parameters.required, ['title', 'text'])
  const text = ctx.tools.defs.find(def => def.name === 'dingtalk_text')
  assert.deepEqual(text.parameters.required, ['content'])
})

test('apply 无需配置也注册三个工具（加载不失败）', () => {
  const ctx = fakeCtx()
  apply(ctx, {})
  assert.deepEqual(ctx.tools.defs.map(def => def.name).sort(), ['dingtalk_health', 'dingtalk_notify', 'dingtalk_text'])
})

test('未配置时 execute 返回中文配置提示而非崩溃', async () => {
  const ctx = fakeCtx()
  apply(ctx, {})
  const notify = ctx.tools.defs.find(def => def.name === 'dingtalk_notify')
  await assert.rejects(() => notify.execute({ title: 't', text: 'x' }), /dsh-dingtalk 未配置/)
  const text = ctx.tools.defs.find(def => def.name === 'dingtalk_text')
  await assert.rejects(() => text.execute({ content: 'x' }), /dsh-dingtalk 未配置/)
})

test('execute 校验参数，不触网', async () => {
  const ctx = fakeCtx()
  apply(ctx, CONFIG)
  const notify = ctx.tools.defs.find(def => def.name === 'dingtalk_notify')
  await assert.rejects(() => notify.execute({ title: '  ', text: 'x' }), /title 不能为空/)
  await assert.rejects(() => notify.execute({ title: 't', text: '' }), /text 不能为空/)
  const text = ctx.tools.defs.find(def => def.name === 'dingtalk_text')
  await assert.rejects(() => text.execute({ content: '   ' }), /content 不能为空/)
})

test('output.schema 是纯 JSON（可无损序列化）', () => {
  const ctx = fakeCtx()
  apply(ctx, CONFIG)
  for (const def of ctx.tools.defs) {
    const schema = def.output.schema
    assert.equal(schema.type, 'object')
    assert.equal(schema.additionalProperties, true)
    assert.deepEqual(JSON.parse(JSON.stringify(schema)), schema)
  }
})

test('配置就绪时 execute 通过注入的 fetch 返回纯 JSON 结果（无 undefined 字段）', async () => {
  const ctx = fakeCtx()
  apply(ctx, CONFIG)
  const captured = []
  const oldFetch = globalThis.fetch
  globalThis.fetch = async (url, init) => {
    captured.push({ url: String(url), init })
    return { ok: true, status: 200, json: async () => ({ errcode: 0, errmsg: 'ok' }), text: async () => '' }
  }
  try {
    const notify = ctx.tools.defs.find(def => def.name === 'dingtalk_notify')
    const out = await notify.execute({ title: '周报', text: '# 完成' })
    assert.deepEqual(out, { ok: true, msgtype: 'markdown', title: '周报', errcode: 0, errmsg: 'ok' })
    assert.equal(JSON.stringify(out), JSON.stringify({ ok: true, msgtype: 'markdown', title: '周报', errcode: 0, errmsg: 'ok' }))
    assert.equal(captured.length, 1)
    assert.deepEqual(JSON.parse(captured[0].init.body), { msgtype: 'markdown', markdown: { title: '周报', text: '# 完成' } })

    const text = ctx.tools.defs.find(def => def.name === 'dingtalk_text')
    const out2 = await text.execute({ content: '纯文本' })
    assert.deepEqual(out2, { ok: true, msgtype: 'text', title: '', errcode: 0, errmsg: 'ok' })
  } finally {
    globalThis.fetch = oldFetch
  }
})

test('execute 将钉钉 errcode 错误映射为中文并抛出', async () => {
  const ctx = fakeCtx()
  apply(ctx, CONFIG)
  const oldFetch = globalThis.fetch
  globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => ({ errcode: 310000, errmsg: 'sign not match' }), text: async () => '' })
  try {
    const text = ctx.tools.defs.find(def => def.name === 'dingtalk_text')
    await assert.rejects(() => text.execute({ content: 'x' }), /加签/)
  } finally {
    globalThis.fetch = oldFetch
  }
})
