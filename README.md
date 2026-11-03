**简体中文** · [English](README.en.md)

# DingTalk

**把 DSH 的任务结果送到钉钉群。**

[![npm](https://img.shields.io/npm/v/dsh-dingtalk)](https://www.npmjs.com/package/dsh-dingtalk) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-dingtalk-downloads.svg)](https://www.npmjs.com/package/dsh-dingtalk) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-dingtalk-total-downloads.svg)](https://www.npmjs.com/package/dsh-dingtalk)

**[安装使用](#安装) · [使用流程](#开始使用) · [完整说明](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/REFERENCE.zh.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-zh-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-zh-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-zh-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-zh-light.svg" alt="把 DSH 的任务结果送到钉钉群。 · 流程示意" width="100%">
</picture>

## 功能

- 发送纯文本或 Markdown 通知。
- 按自己的机器人配置使用加签。
- 先自检和测试，再用于正式通知。

## 安装

在 DSH 桌面版「插件」面板安装 `dsh-dingtalk`。已配置命令行时也可使用：

```bash
dsh plugin --profile desktop add dsh-dingtalk
```

网页版把 `desktop` 改为 `web`；安装后重启对应的 DSH。宿主要求以包声明 `>=0.2.1-rc.3` 为准。

## 开始使用

1. 在自己的钉钉群创建自定义机器人，取得 webhook 和加签密钥。
2. 在 DSH 插件设置中填写配置，先执行配置自检。
3. 在自己的测试群确认一条简单通知能送达，再准备正式消息。
4. 给助手消息内容和目标群，确认后发送，并在钉钉检查收到的文本或 Markdown。

可以这样说：

> 先检查钉钉机器人配置，准备一条任务完成通知，发送前让我核对正文。

## 开始前要知道

需要自己的群机器人 webhook；请先在测试群确认消息能送达。

配置、完整工具与排错见[详细使用说明](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/REFERENCE.zh.md)。

## 插件更新

在工作台或原生插件详情页底部检查更新。默认自动检查，**默认不自动安装**；是否安装、何时重启由你决定。Suite 管理的组件随整包更新。[查看更新规则](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/REFERENCE.zh.md)。

## 文档

- [详细使用、配置与边界](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/REFERENCE.zh.md)
- [更新记录](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/CHANGELOG.md)
- [验证范围与历史](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/VALIDATION.md)

## 反馈与贡献

如果插件帮到了你，欢迎 Star，让更多人发现它。问题和建议请提交 [Issues](https://github.com/STARDUSTLC666/dsh-dingtalk/issues)，也欢迎代码与文档 [PR](https://github.com/STARDUSTLC666/dsh-dingtalk/pulls)。反馈时附上版本与复现步骤，并移除凭据。

## License

[MIT](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/LICENSE)

<a id="依赖与配置"></a>
