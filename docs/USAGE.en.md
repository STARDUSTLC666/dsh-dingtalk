# dsh-dingtalk Usage Guide

[Overview](../README.en.md) · [Changelog](../CHANGELOG.md) · [Validation](VALIDATION.md)

## Get Started in 3 Steps

### Step 1: Create a Custom Robot in Your DingTalk Group

Use DingTalk's **Custom Webhook Robot** — **no enterprise app or admin approval needed**:

1. Open your DingTalk group → **Group Settings** → **Smart Group Assistant** → **Add Robot** → **Custom (Webhook)**.
2. Name the robot and check **Sign (加签)** under Security Settings (checking only "Sign" avoids unexpected keyword rejections).
3. Copy both values:
   - **Webhook URL**: `https://oapi.dingtalk.com/robot/send?access_token=xxxx`
   - **Signing secret (`secret`)**: `SECxxxx`

### Step 2: Configure in DSH (Choose Either Option)

**Option A (Recommended): Native DSH Settings Form (Live Apply, No Restart)**

Open **DSH → Settings → Plugins → DingTalk (`dsh-dingtalk`)**:
- Paste the full robot URL into `webhook`.
- Paste your `SEC...` signing key into `secret` (both fields use native secret masking so credentials are never echoed in plaintext).

**Option B: Environment Variable or `cordis.patch.yml` (CLI / Headless Setups)**

```powershell
# Windows PowerShell (recommended for keeping secrets out of files)
$env:DSH_DINGTALK_SECRET = "SEC_YOUR_SIGNING_SECRET"
```

Or override `tool-dingtalk` in `$DSH_HOME/profiles/<name>/cordis.patch.yml`:

```yaml
- id: tool-dingtalk
  config:
    webhook: https://oapi.dingtalk.com/robot/send?access_token=YOUR_TOKEN
    secret: SEC_YOUR_SIGNING_SECRET   # optional; falls back to DSH_DINGTALK_SECRET
    timeoutMs: 10000                  # optional; timeout in ms (1000–60000)
```

### Step 3: Run a Silent Self-Check Before Sending

The plugin ships with an empty config and never crashes startup. Ask the assistant to run a quick offline check first (zero network traffic, zero group noise), then start sending real notifications.

---

## Copy-Ready Prompts for Everyday Work

- **Silent first-run health check**
  > Run a DingTalk health check and confirm my webhook and signing secret are ready without sending a message.
- **Send a structured Markdown report after a task**
  > After running the test suite, send a Markdown summary to our DingTalk group titled "Regression Report" with pass counts, failures, and next steps.
- **Draft first, confirm before posting to an important group**
  > Draft a release announcement for our DingTalk group. Show me the title and Markdown body here first, and wait for my confirmation before sending.
- **Quick plain-text alert**
  > Send a plain-text message to DingTalk: Daily health check finished; all services are green.

---

## Quick Troubleshooting Checklist

Ask the assistant to run `dingtalk_health` first (validates URL structure and secret source locally without touching the network):

| Symptom | Usual Cause | Quick Fix |
| :--- | :--- | :--- |
| `dsh-dingtalk 未配置：webhook …` | `webhook` is still empty | Paste the full Webhook URL in **DSH Settings → Plugins → DingTalk** and save (applies live) |
| Health check reports missing `access_token` or wrong host | Incomplete URL pasted | Re-copy the full `https://oapi.dingtalk.com/robot/send?access_token=...` URL from DingTalk |
| DingTalk returns `310000` | Signing `secret` mismatch, or "Custom keywords" is also checked | Verify `SEC...` secret; if keywords are enabled on DingTalk, include the keyword in the message |
| DingTalk returns `120001` | `access_token` expired or reset | Copy the updated Webhook URL from DingTalk robot settings |
| Request times out | Slow network or proxy; remote receipt is uncertain | **Check the DingTalk group history first** before resending; raise `timeoutMs` if needed |
| Formatting looks off | DingTalk Markdown subset or message size limit | Stick to standard headings, lists, bold, and links; split very long messages |

---

## Configuration & Tool Reference

### Configuration Fields

| Field | Default | Description |
| :--- | :--- | :--- |
| `webhook` | required | Full DingTalk custom robot Webhook URL (`?access_token=...`), secret-masked & live-updated |
| `secret` | empty | HMAC-SHA256 signing secret (`SEC...`); falls back to `DSH_DINGTALK_SECRET` env var |
| `timeoutMs` | `10000` | Request timeout in milliseconds (`1000`–`60000`) |

### Registered Tools

| Tool | Purpose | Notes |
| :--- | :--- | :--- |
| `dingtalk_notify` | Send a **Markdown** card message | Args: `title` (card header), `text` (Markdown body) |
| `dingtalk_text` | Send a **plain-text** message | Args: `content` (text body) |
| `dingtalk_health` | Offline configuration check | Verifies `webhook` shape, signing mode, and timeout without network calls |

### Safety, Cancellation & Delivery Guarantees

- **One-way & redacted**: Posts outbound notifications only (never reads group messages) and redacts `webhook`, `access_token`, `secret`, and `sign` from all error messages.
- **Cancellation without auto-retry**: Aborting a turn immediately cancels the in-flight HTTP request and body read. Timeouts never auto-retry so groups are never spammed.
- **Official signing**: Computes `urlencode(base64(HmacSHA256(secret, timestamp + "\n" + secret)))` matching DingTalk's official specification.

## Install, Uninstall & Development

```bash
# Install (use desktop instead of web for DSH Desktop)
dsh plugin --profile web add dsh-dingtalk

# Uninstall
dsh plugin --profile web remove dsh-dingtalk

# Build & run offline tests
pnpm install
pnpm test
```

## License

MIT. Community plugin, not affiliated with DeepSeek or DingTalk; `@deepseek-ai/*` is an officially reserved namespace.
