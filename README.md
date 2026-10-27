# dsh-dingtalk

[English](README.en.md)

![dsh-dingtalk 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/assets/cover-whale-girl.png)

把任务结果发送到钉钉群机器人的通知插件。

[![npm](https://img.shields.io/npm/v/dsh-dingtalk)](https://www.npmjs.com/package/dsh-dingtalk) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-dingtalk-downloads.svg)](https://www.npmjs.com/package/dsh-dingtalk)

欢迎使用，遇到问题或有改进建议，请提交 [issues](https://github.com/STARDUSTLC666/dsh-dingtalk/issues) 和 [PR](https://github.com/STARDUSTLC666/dsh-dingtalk/pulls)。

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

## 插件更新

需要 DSH 0.2.1-rc.3 或更新版本。每个插件在自己的页面或设置项提供检查、更新记录与确认安装入口，开关独立保存。自动检查默认开启；**自动安装默认关闭**，只有明确授权后，兼容的稳定补丁才会在空闲且没有未保存修改时安装。可单独关闭、推迟或忽略提醒；不会强制重启 DSH、升级 DSH 本体或替换本地源码安装。Suite 安装的组件会明确提示通过 Suite 整包更新。

旧版用户先在官方插件管理中手动更新一次，之后才会获得此入口。发布到 npm 不会直接替换用户已经安装的版本。

## License

[MIT](LICENSE)
