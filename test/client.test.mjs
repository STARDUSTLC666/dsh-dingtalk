import test from 'node:test'
import assert from 'node:assert/strict'
import { DingTalkClient, DingTalkError, dingTalkErrorMessage } from '../lib/index.js'

function fakeFetch(captures, response) {
  return async (url, init) => {
    captures.push({ url, init })
    return response
  }
}

function okResponse(body) {
  return { ok: true, status: 200, json: async () => body, text: async () => '' }
}

const WEBHOOK = 'https://oapi.dingtalk.com/robot/send?access_token=TOKEN'

test('sendMarkdown 发送 markdown 载荷结构正确', async () => {
  const captured = []
  const client = new DingTalkClient({ webhook: WEBHOOK, secret: 'SEC', fetchImpl: fakeFetch(captured, okResponse({ errcode: 0, errmsg: 'ok' })) })
  const result = await client.sendMarkdown('标题', '**正文**')
  assert.deepEqual(result, { errcode: 0, errmsg: 'ok' })
  assert.equal(captured.length, 1)
  const { url, init } = captured[0]
  assert.equal(init.method, 'POST')
  assert.equal(init.headers['Content-Type'], 'application/json')
  assert.deepEqual(JSON.parse(init.body), { msgtype: 'markdown', markdown: { title: '标题', text: '**正文**' } })
  assert.ok(url.startsWith(WEBHOOK + '&timestamp='))
  assert.ok(url.includes('&sign='))
})

test('sendText 发送 text 载荷结构正确，未配置 secret 不加签', async () => {
  const captured = []
  const client = new DingTalkClient({ webhook: WEBHOOK, fetchImpl: fakeFetch(captured, okResponse({ errcode: 0, errmsg: 'ok' })) })
  await client.sendText('纯文本内容')
  assert.deepEqual(JSON.parse(captured[0].init.body), { msgtype: 'text', text: { content: '纯文本内容' } })
  assert.ok(!captured[0].url.includes('sign='))
})

test('errcode 310000 映射为加签检查中文错误', async () => {
  const client = new DingTalkClient({ webhook: WEBHOOK, secret: 'SEC', fetchImpl: fakeFetch([], okResponse({ errcode: 310000, errmsg: 'sign not match' })) })
  await assert.rejects(
    () => client.sendText('x'),
    err => err instanceof DingTalkError && err.errcode === 310000 && /加签/.test(err.message) && /310000/.test(err.message),
  )
})

test('errcode 120001 映射为 token 失效中文错误', async () => {
  const client = new DingTalkClient({ webhook: WEBHOOK, fetchImpl: fakeFetch([], okResponse({ errcode: 120001, errmsg: 'token invalid' })) })
  await assert.rejects(
    () => client.sendText('x'),
    err => err instanceof DingTalkError && err.errcode === 120001 && /token|失效/.test(err.message),
  )
})

test('其他 errcode 透传 errmsg', async () => {
  const client = new DingTalkClient({ webhook: WEBHOOK, fetchImpl: fakeFetch([], okResponse({ errcode: 500, errmsg: '服务器开小差' })) })
  await assert.rejects(
    () => client.sendText('x'),
    err => err instanceof DingTalkError && /500/.test(err.message) && /服务器开小差/.test(err.message),
  )
})

test('非 200 响应抛 HTTP 错误', async () => {
  const client = new DingTalkClient({ webhook: WEBHOOK, fetchImpl: fakeFetch([], { ok: false, status: 502, json: async () => ({}), text: async () => 'Bad Gateway' }) })
  await assert.rejects(() => client.sendText('x'), /HTTP 502/)
})

test('非 JSON 响应抛格式错误', async () => {
  const client = new DingTalkClient({ webhook: WEBHOOK, fetchImpl: fakeFetch([], { ok: true, status: 200, json: async () => { throw new Error('not json') }, text: async () => 'not-json' }) })
  await assert.rejects(() => client.sendText('x'), /非 JSON/)
})

test('dingTalkErrorMessage 直接输出中文', () => {
  assert.match(dingTalkErrorMessage(310000, ''), /加签/)
  assert.match(dingTalkErrorMessage(120001, ''), /token/)
})
