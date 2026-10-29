# dsh-dingtalk

[English](README.en.md)

![dsh-dingtalk 鲸鱼娘插件封面](https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/assets/cover-whale-girl.png)

把 DSH 中的任务结果发送到钉钉自定义群机器人，支持纯文本和 Markdown 通知。填写自己的机器人地址与签名配置后，可先自检再发送。

[![npm](https://img.shields.io/npm/v/dsh-dingtalk)](https://www.npmjs.com/package/dsh-dingtalk) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-dingtalk-downloads.svg)](https://www.npmjs.com/package/dsh-dingtalk) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-dingtalk-total-downloads.svg)](https://www.npmjs.com/package/dsh-dingtalk)

[下载统计说明](https://github.com/STARDUSTLC666/dsh-suite/blob/npm-downloads/README.md)

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

1. 在自己的钉钉群创建自定义机器人，取得 webhook 和加签密钥。
2. 在 DSH 插件设置中填写配置，先执行配置自检。
3. 在自己的测试群确认一条简单通知能送达，再准备正式消息。
4. 给助手消息内容和目标群，确认后发送，并在钉钉检查收到的文本或 Markdown。

## 依赖与配置

需要钉钉群机器人 webhook；本插件提供单向通知。

详细配置、工具参数与排错见[使用说明](docs/USAGE.md)。从源码独立开发时，Node 要求以 [package.json](package.json) 为准。

## 文档

- [使用与排错](docs/USAGE.md)
- [更新记录](CHANGELOG.md)
- [验证范围与历史记录](docs/VALIDATION.md)
- [问题反馈与功能建议](https://github.com/STARDUSTLC666/dsh-dingtalk/issues)

## 插件更新

需要 DSH 0.2.1-rc.3 或更新版本。更新控件直接位于原有工作台内容末尾；没有工作台的插件，位于原生插件详情页底部。检查、更新记录和偏好在原地展开，不增加独立更新页面或设置菜单。自动检查默认开启；**自动安装默认关闭**，明确授权后才会在空闲且没有未保存修改时安装兼容的稳定补丁。开关按插件独立保存，可关闭、推迟或忽略提醒；不会强制重启 DSH、升级 DSH 本体或替换本地源码安装。Suite 组件在当前页面底部明确说明并操作 Suite 整包更新。

旧版用户先在官方插件管理中手动更新一次，之后才会获得此入口。发布到 npm 不会直接替换用户已经安装的版本。

## License

[MIT](LICENSE)
