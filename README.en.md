# dsh-dingtalk

[![Awesome DSH Plugin](https://awesome-dsh-plugin.com/badge.svg)](https://awesome-dsh-plugin.com)

DeepSeek Harness DingTalk group robot notification plugin: lets the agent **push Markdown / plain-text messages to a DingTalk group one-way**. Pure plugin implementation, zero core changes, works out of the box.

Pure Node implementation, **cross-platform** (one codebase for Windows / macOS / Linux), depends only on `node:crypto` and the built-in `fetch` — no runtime dependencies, no native binaries.

## Tools

| Tool | Purpose |
|---|---|
| `dingtalk_notify` | Send a **Markdown** message to the configured DingTalk group (`title` heading + `text` Markdown body) |
| `dingtalk_text` | Send a **plain-text** message to the configured DingTalk group (`content`) |

Example:

> Send a message to the DingTalk group: title "Build complete", body "Pipeline #123 passed ✅".

## Installation

```sh
dsh plugin --profile web add dsh-dingtalk
```

After installing, restart `dsh web`. The plugin ships with an empty config and **won't crash startup**; calling any `dingtalk_*` tool before configuration returns a clear Chinese configuration hint.

## Step 1: Get the webhook and signing secret

Use DingTalk's **custom robot** method — **no enterprise app or admin permission needed**:

1. Open the target DingTalk group → **Group settings** → **Smart group assistant** → **Add robot** → **Custom (connect a custom service via Webhook)**
2. The robot name is arbitrary; under **Security settings, check "Sign" (加签)**, then finish
3. Copy two things:
   - **Webhook URL**: like `https://oapi.dingtalk.com/robot/send?access_token=xxxx`
   - **Signing secret (secret)**: like `SECxxxx` (only appears after checking "Sign")

> For security settings it's recommended to check only "Sign". If you also check "Custom keywords", the robot validates whether the message contains the keyword — that's DingTalk server-side behavior, not handled by this plugin (see "Known limitations").

## Configuration

In your profile's `cordis.patch.yml` (under `$DSH_HOME/profiles/<name>/`), override the `tool-dingtalk` line, then restart:

```yaml
- id: tool-dingtalk
  config:
    webhook: https://oapi.dingtalk.com/robot/send?access_token=你的token
    secret: SEC你的加签密钥        # 可选，但强烈建议；也可用环境变量 DSH_DINGTALK_SECRET
```

### Full configuration

| Field | Default | Description |
|---|---|---|
| `webhook` | required | Full webhook URL of the robot (`?access_token=...`) |
| `secret` | empty | Signing secret; when omitted, falls back to the `DSH_DINGTALK_SECRET` env var. Empty = no signing |
| `timeoutMs` | `10000` | Request timeout in milliseconds (1000–60000) |

### Store the secret in an environment variable

If you don't want to write the secret into YAML, write only `webhook` and set an environment variable:

```sh
# Windows PowerShell
$env:DSH_DINGTALK_SECRET = "SEC你的加签密钥"
# 或系统环境变量里加一条 DSH_DINGTALK_SECRET
```

An explicit `secret` in YAML takes precedence over the environment variable.

## Security notes

- **The webhook is the key to group notifications**: anyone who knows it can post to the group. Don't commit `cordis.patch.yml` to any Git repo; for the `secret`, prefer the `DSH_DINGTALK_SECRET` env var.
- This plugin is **one-way notification only** (agent → DingTalk group); it never reads messages from the group and has no two-way bot capability.
- This plugin performs no outbound telemetry; the `secret` is used in memory only to compute an HMAC signature, which is appended to the URL and sent to DingTalk's official endpoint.

## Signing algorithm (matches the official one)

When a `secret` is present, the request URL appends `timestamp` (millisecond timestamp) and `sign`:

```text
stringToSign = timestamp + "
" + secret
sign = urlencode(base64(HmacSHA256(secret, stringToSign)))
```

Identical to this plugin's `computeDingTalkSign`, equivalent to `urllib.parse.quote_plus(base64(...))` in the official Python example.

## Known limitations

- **One-way notification only**: no support for enterprise self-built apps, no receiving group messages / two-way bots (@robot replies, etc.); these are v0.2+ directions.
- **No automatic workaround for custom keyword validation**: if the robot checks "Custom keywords" on DingTalk's side, messages must contain the keyword or DingTalk returns an error (errcode 310000 can also appear for this reason). This plugin attributes 310000 to signing; please also check the keyword setting.
- **No settings page**: v0.1 is a "node half-body"; configuration only via `cordis.patch.yml` (+ env var). A Web settings page is planned for v0.2+.
- **Message types**: currently only Markdown (`dingtalk_notify`) and plain text (`dingtalk_text`); image / Link / FeedCard / ActionCard etc. come later.
- **Markdown rendering**: DingTalk robot Markdown syntax differs slightly from standard Markdown (e.g., headings, links); write according to DingTalk's syntax.

## Error code reference

| errcode | Meaning | Suggestion |
|---|---|---|
| `0` | Success | — |
| `310000` | Signing validation failed (see the keyword note above) | Check that `secret` is correct and matches the robot's "Sign" setting |
| `120001` | `access_token` expired | Re-copy the webhook URL from the DingTalk group and overwrite `webhook` |
| other | Server error | Check the returned `errmsg` |

## Development

```sh
pnpm install
pnpm run build   # tsc → lib/
pnpm test        # 构建 + node --test（加签算法/配置解析/客户端封装/注册与中文报错）
```

## License

MIT. This is a community plugin, not affiliated with DeepSeek or DingTalk; `@deepseek-ai/*` is an officially reserved namespace.
