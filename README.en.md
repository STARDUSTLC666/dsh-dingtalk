[简体中文](README.md) · **English**

# DingTalk

> **Send DSH task results straight to your DingTalk group—signed, masked, and spam-free.**

DingTalk custom webhook notification plugin for DeepSeek Harness (`>=0.2.2-rc.3`), supporting plain-text and Markdown delivery, HMAC-SHA256 signing, live settings, and silent health checks.

[![npm](https://img.shields.io/npm/v/dsh-dingtalk)](https://www.npmjs.com/package/dsh-dingtalk) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-dingtalk-downloads.svg)](https://www.npmjs.com/package/dsh-dingtalk) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-dingtalk-total-downloads.svg)](https://www.npmjs.com/package/dsh-dingtalk)

**[Features](#features) · [Install](#install) · [Get Started in 3 Steps](#get-started-in-3-steps) · [Troubleshooting](#quick-troubleshooting-checklist) · [Full Guide](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/USAGE.en.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-en-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-en-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-en-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-en-light.svg" alt="Send DSH task results to your DingTalk group. · workflow illustration" width="100%">
</picture>

<a id="what-it-does"></a>
## Features

| Capability | What It Gives You |
| :--- | :--- |
| **Text & Markdown Alerts** | Push build summaries, check reports, and release notices to custom DingTalk group robots |
| **HMAC-SHA256 Signing** | Built-in `SEC...` request signing and compatibility with DingTalk security rules |
| **Live Masked Settings** | Configure inside DSH Settings with instant hot reload and masked secrets (or `DSH_DINGTALK_SECRET` env var) |
| **Silent Local Self-Check** | Validate your webhook and signing config offline before posting anything to a live group |

## Install

Open **Plugins** in the DSH desktop app and install `dsh-dingtalk`, or use the CLI:

```bash
dsh plugin --profile desktop add dsh-dingtalk
```

For the web profile, replace `desktop` with `web`. Restart DSH once after installing. Requires DSH `>=0.2.2-rc.3`.

<a id="start-using-it"></a>
## Get Started in 3 Steps

1. **Create a webhook robot**: In your DingTalk group, open **Group Settings → Smart Group Assistant → Add Robot → Custom**, enable **Sign (加签)**, and copy the **Webhook URL** and **`SEC...` signing secret**.
2. **Save in DSH Settings**: Open **DSH Settings → Plugins → DingTalk (`dsh-dingtalk`)**, paste `webhook` and `secret` (credentials are masked and apply immediately without restart).
3. **Verify silently, then post**: Run a local config check in chat before posting build summaries or alerts to your team group.

### Ready-to-copy prompts

- **Silent first-run check (sends zero messages)**
  > Check whether my DingTalk robot configuration is ready without sending any message to the group.
- **Formatted Markdown summary (review before sending)**
  > Turn the build and test results into a concise Markdown DingTalk notice. Show me the title and body first, and send only after I confirm.
- **Quick plain-text heads-up**
  > Send a plain-text DingTalk notice: Staging will be under maintenance at 22:00 tonight for 15 minutes; please pause merges.

## Quick Troubleshooting Checklist

| Symptom | Likely Cause | Fix |
| :--- | :--- | :--- |
| `dsh-dingtalk 未配置` or missing `access_token` | `webhook` is blank or truncated | Paste the full Webhook URL in **DSH Settings → Plugins → DingTalk** and save |
| DingTalk error `310000` | Signing `secret` mismatch, or "Custom keywords" is also enabled | Verify the `SEC...` secret; if keywords are enabled, include the keyword in the title/body |
| DingTalk error `120001` | Robot `access_token` expired or was reset | Copy the refreshed Webhook URL from DingTalk group settings and save |
| Request timeout | Network jitter; delivery is uncertain | **Check the DingTalk group first** before resending to avoid duplicate alerts |

## Plugin updates

Check updates at the bottom of native plugin details. Automatic checks are on by default; **automatic installation is off**. Suite-managed components update with their bundle.

## Documentation & Feedback

- [Usage & config](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/USAGE.en.md) · [Full reference](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/REFERENCE.en.md) · [Release notes](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/CHANGELOG.md) · [Validation](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/VALIDATION.md)
- If this plugin helps, consider starring the repo. Report bugs in [Issues](https://github.com/STARDUSTLC666/dsh-dingtalk/issues) or open [PRs](https://github.com/STARDUSTLC666/dsh-dingtalk/pulls) (strip credentials first).

## License

[MIT](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/LICENSE)

<a id="requirements-and-configuration"></a>
