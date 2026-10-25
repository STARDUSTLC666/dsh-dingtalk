import test from 'node:test'
import assert from 'node:assert/strict'
import { DingTalkClient, apply } from '../lib/index.js'

const webhook = 'https://oapi.dingtalk.com/robot/send?access_token=SYNTHETIC_TOKEN'

test('caller cancellation before dispatch sends no message', async () => {
  let calls = 0
  const client = new DingTalkClient({ webhook, fetchImpl: async () => { calls++; throw new Error('unexpected dispatch') } })
  const abort = new AbortController(), reason = new Error('user cancelled')
  abort.abort(reason)
  await assert.rejects(() => client.sendText('example', abort.signal), error => error === reason)
  assert.equal(calls, 0)
})

test('timeout remains active while the response body is pending', async () => {
  let bodyAborted = false
  const client = new DingTalkClient({ webhook, timeoutMs: 15, fetchImpl: async (_url, init) => ({
    ok: true, status: 200, text: async () => '',
    json: () => new Promise((_resolve, reject) => {
      init.signal.addEventListener('abort', () => { bodyAborted = true; reject(init.signal.reason) }, { once: true })
    }),
  }) })
  const outcome = await Promise.race([
    client.sendText('example').then(() => 'unexpected success', error => error.message),
    new Promise(resolve => { const timer = setTimeout(() => resolve('body deadline missing'), 100); timer.unref() }),
  ])
  assert.match(outcome, /超时/)
  assert.equal(bodyAborted, true)
})

test('registered tools pass the host cancellation signal to the active request', async () => {
  const tools = [], abort = new AbortController(), reason = new Error('host cancelled')
  apply({ tools: { register(tool) { tools.push(tool) } }, logger: { warn() {} } }, { webhook })
  const oldFetch = globalThis.fetch
  let observed
  globalThis.fetch = async (_url, init) => {
    observed = init.signal
    abort.abort(reason)
    init.signal.throwIfAborted()
    return { ok: true, status: 200, json: async () => ({ errcode: 0, errmsg: 'ok' }) }
  }
  try {
    await assert.rejects(() => tools.find(tool => tool.name === 'dingtalk_text').execute({ content: 'example' }, { signal: abort.signal }), error => error === reason)
    assert.equal(observed.aborted, true)
  } finally { globalThis.fetch = oldFetch }
})

test('HTTP failures cannot echo the webhook token or signing credentials', async () => {
  const secret = 'SYNTHETIC_SIGNING_SECRET'
  const client = new DingTalkClient({ webhook, secret, fetchImpl: async url => ({
    ok: false, status: 502, json: async () => ({}), text: async () => 'Upstream failed for ' + url + '; secret=' + secret,
  }) })
  await assert.rejects(() => client.sendText('example'), error => {
    assert.match(error.message, /HTTP 502/)
    assert.ok(!error.message.includes('SYNTHETIC_TOKEN'))
    assert.ok(!error.message.includes(secret))
    assert.ok(!error.message.includes('sign='))
    return true
  })
})
