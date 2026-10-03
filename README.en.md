# dsh-dingtalk

[中文](README.md)

![dsh-dingtalk whale girl plugin cover](https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/assets/cover-whale-girl.png)

Send task notifications to a DingTalk group robot.

[![npm](https://img.shields.io/npm/v/dsh-dingtalk)](https://www.npmjs.com/package/dsh-dingtalk) [![downloads](https://img.shields.io/npm/dm/dsh-dingtalk)](https://www.npmjs.com/package/dsh-dingtalk)

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

Configure the robot webhook and signing secret, then ask to send a result summary to your group.

## Requirements and configuration

Requires a DingTalk robot webhook. This plugin provides one-way notifications.

Detailed configuration, tool arguments and troubleshooting are in the [usage guide](docs/USAGE.en.md). For standalone development, follow the Node requirement in [package.json](package.json).

## Documentation

- [Usage and troubleshooting](docs/USAGE.en.md)
- [Changelog](CHANGELOG.md)
- [Validation scope and history](docs/VALIDATION.md)
- [Report a problem or suggest a feature](https://github.com/STARDUSTLC666/dsh-dingtalk/issues)

## License

[MIT](LICENSE)
