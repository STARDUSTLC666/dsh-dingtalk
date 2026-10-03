# dsh-dingtalk

[English](README.en.md)

![dsh-dingtalk 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/assets/cover-whale-girl.png)

把任务结果发送到钉钉群机器人的通知插件。

[![npm](https://img.shields.io/npm/v/dsh-dingtalk)](https://www.npmjs.com/package/dsh-dingtalk) [![downloads](https://img.shields.io/npm/dm/dsh-dingtalk)](https://www.npmjs.com/package/dsh-dingtalk)

## 功能

- 发送 Markdown 或纯文本群通知。
- 支持机器人加签。
- 提供配置自检与常见错误说明。

## 安装

桌面版可在「插件」面板按包名 `dsh-dingtalk` 安装。已配置 dsh 命令时也可使用：

```bash
dsh plugin --profile desktop add dsh-dingtalk
```

网页版把命令中的 `desktop` 改为 `web`。安装后重启 DSH。

## 开始使用

配置群机器人 webhook 和加签密钥后，可说：“把这份结果摘要发到钉钉群。”

## 依赖与配置

需要钉钉群机器人 webhook；本插件提供单向通知。

详细配置、工具参数与排错见[使用说明](docs/USAGE.md)。从源码独立开发时，Node 要求以 [package.json](package.json) 为准。

## 文档

- [使用与排错](docs/USAGE.md)
- [更新记录](CHANGELOG.md)
- [验证范围与历史记录](docs/VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-dingtalk/issues)

## License

[MIT](LICENSE)
