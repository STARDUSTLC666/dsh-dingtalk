[简体中文](README.md) · **English**

# DingTalk

**Send DSH task results to your DingTalk group.**

[![npm](https://img.shields.io/npm/v/dsh-dingtalk)](https://www.npmjs.com/package/dsh-dingtalk) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-dingtalk-downloads.svg)](https://www.npmjs.com/package/dsh-dingtalk) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-dingtalk-total-downloads.svg)](https://www.npmjs.com/package/dsh-dingtalk)

**[Install](#install) · [Workflow](#start-using-it) · [Full guide](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/REFERENCE.en.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-en-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-en-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-en-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-en-light.svg" alt="Send DSH task results to your DingTalk group. · workflow illustration" width="100%">
</picture>

## Features

- Send plain-text or Markdown notifications.
- Use signing with your own robot configuration.
- Check configuration and test before sending real notices.

## Install

Open **Plugins** in the DSH desktop app and install `dsh-dingtalk`. If the CLI is available:

```bash
dsh plugin --profile desktop add dsh-dingtalk
```

For the web profile, replace `desktop` with `web`. Restart that DSH profile after installation. The package’s DSH requirement is `>=0.2.1-rc.3`.

## Start using it

1. Create a custom robot in your DingTalk group and obtain its webhook and signing secret.
2. Enter the configuration in DSH plugin settings and run the configuration check.
3. Verify a simple notification in your own test group before preparing the real message.
4. Provide the content and target group, confirm sending, then check the text or Markdown in DingTalk.

Example request：

> Check my DingTalk robot configuration and prepare a task-complete notice for review before sending.

## Before you start

Requires your own group robot webhook. Verify delivery in a test group first.

Configuration, detailed tools and troubleshooting: [full reference](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/REFERENCE.en.md).

## Plugin updates

Check updates at the bottom of the workbench or native plugin details. Automatic checks are on by default; **automatic installation is off**. You choose whether to install and when to restart. Suite-managed components update with their bundle. [Update behavior](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/REFERENCE.en.md).

## Documentation

- [Full usage, configuration and limits](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/REFERENCE.en.md)
- [Release notes](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/CHANGELOG.md)
- [Validation scope and history](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/VALIDATION.md)

## Feedback and contributions

If the plugin helps, a Star makes it easier for others to discover. Report problems or suggest improvements in [Issues](https://github.com/STARDUSTLC666/dsh-dingtalk/issues); code and documentation [PRs](https://github.com/STARDUSTLC666/dsh-dingtalk/pulls) are welcome. Include versions and reproduction steps, and remove credentials from reports.

## License

[MIT](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/LICENSE)

<a id="what-it-does"></a>
<a id="requirements-and-configuration"></a>
