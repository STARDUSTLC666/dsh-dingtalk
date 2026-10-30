> Full usage reference. The landing page focuses on outcomes, installation and workflows; detailed parameters, limits, update rules and historical validation links remain here.

# dsh-dingtalk

[中文](../README.md)

![dsh-dingtalk whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/assets/cover-whale-girl.png)

Send DSH task results to a DingTalk custom group robot as text or Markdown. Configure your robot URL and signing options, then check the connection before sending.

[![npm](https://img.shields.io/npm/v/dsh-dingtalk)](https://www.npmjs.com/package/dsh-dingtalk) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-dingtalk-downloads.svg)](https://www.npmjs.com/package/dsh-dingtalk) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-dingtalk-total-downloads.svg)](https://www.npmjs.com/package/dsh-dingtalk)

[Download statistics](https://github.com/STARDUSTLC666/dsh-suite/blob/npm-downloads/README.md)

Feedback and contributions are welcome: report [issues](https://github.com/STARDUSTLC666/dsh-dingtalk/issues) or submit [pull requests](https://github.com/STARDUSTLC666/dsh-dingtalk/pulls).

## What it does

- Send Markdown or plain-text group notifications.
- Support signed robot requests.
- Check configuration and explain common errors.

## Install

In DSH Desktop, install `dsh-dingtalk` from the Plugins panel. If the bundled dsh command is available:

```bash
dsh plugin --profile desktop add dsh-dingtalk
```

For the web version, replace `desktop` with `web`. Restart DSH after installation.

## Start using it

1. Create a custom robot in your DingTalk group and obtain its webhook and signing secret.
2. Enter the configuration in DSH plugin settings and run the configuration check.
3. Verify a simple notification in your own test group before preparing the real message.
4. Provide the content and target group, confirm sending, then check the text or Markdown in DingTalk.

## Requirements and configuration

Requires a DingTalk robot webhook. This plugin provides one-way notifications.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](USAGE.en.md). For standalone development, follow the Node requirement in [package.json](../package.json).

## Documentation

- [Usage and troubleshooting](USAGE.en.md)
- [Changelog](../CHANGELOG.md)
- [Validation scope and history](VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-dingtalk/issues)

## Plugin updates

Requires DSH 0.2.1-rc.3 or newer. Update controls sit at the bottom of the existing workbench, or native plugin details for plugins without a workbench. Checks, release notes and preferences expand in place, with no separate update page or settings menu. Automatic checks are on by default; **automatic installation is off by default**. Only explicit opt-in permits compatible stable patches while idle with no unsaved changes. Preferences are independent, with per-plugin disable, deferral and ignore controls. No forced DSH restart or upgrade, and local-source installations stay unchanged. Suite components explain and operate on the whole Suite in the same footer.

Older releases need one manual update in native plugin management to acquire these controls. Publishing to npm does not replace an existing user installation.

## License

[MIT](../LICENSE)
