**简体中文** · [English](README.en.md)

# DingTalk

> **把 DSH 的任务结果安全、整齐地送到钉钉群。**

DeepSeek Harness（`>=0.2.2-rc.3`）钉钉群自定义机器人插件，支持纯文本 / Markdown 推送、HMAC-SHA256 加签校验与本地无打扰配置自检。

[![npm](https://img.shields.io/npm/v/dsh-dingtalk)](https://www.npmjs.com/package/dsh-dingtalk) [![downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-dingtalk-downloads.svg)](https://www.npmjs.com/package/dsh-dingtalk) [![total downloads](https://raw.githubusercontent.com/STARDUSTLC666/dsh-suite/npm-downloads/assets/dsh-dingtalk-total-downloads.svg)](https://www.npmjs.com/package/dsh-dingtalk)

**[核心能力](#核心能力) · [安装](#安装) · [最快 3 步用起来](#最快-3-步用起来) · [常见卡点](#常见卡点自检) · [完整说明](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/USAGE.md)**

<picture>
  <source media="(prefers-color-scheme: dark) and (max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-zh-mobile-dark.svg">
  <source media="(max-width: 640px)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-zh-mobile-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-zh-dark.svg">
  <img src="https://raw.githubusercontent.com/STARDUSTLC666/dsh-dingtalk/main/docs/assets/intro/workflow-zh-light.svg" alt="把 DSH 的任务结果送到钉钉群。 · 流程示意" width="100%">
</picture>

## 核心能力

| 能力 | 说明 |
| :--- | :--- |
| **纯文本与 Markdown 推送** | 将构建结果、巡检摘要或维护通知直接发送至钉钉群自定义机器人 |
| **HMAC-SHA256 加签校验** | 原生支持钉钉 `SEC...` 加签密钥与关键词校验，兼顾群内安全策略 |
| **原生设置热生效与脱敏** | 在 DSH 设置面板保存即生效，自动脱敏凭据；同时支持环境变量 `DSH_DINGTALK_SECRET` |
| **无打扰本地自检** | 发送前可离线校验 Webhook 与签名配置，避免测试消息刷屏正式群 |

## 安装

在 DSH 桌面版「插件」面板搜索安装 `dsh-dingtalk`，或使用命令行：

```bash
dsh plugin --profile desktop add dsh-dingtalk
```

网页版将 `desktop` 改为 `web`；安装后重启一次 DSH。宿主要求 `>=0.2.2-rc.3`。

<a id="开始使用"></a>
## 最快 3 步用起来

1. **创建群机器人**：在目标钉钉群打开「群设置 → 智能群助手 → 添加机器人 → 自定义」，勾选「加签」，复制 **Webhook 地址**与 **`SEC...` 密钥**。
2. **填入原生设置**：打开 DSH「**设置 → 插件 → 钉钉（dsh-dingtalk）**」，填入 `webhook` 与 `secret`（凭据自动脱敏、保存即生效，无需重启）。
3. **先自检再发群**：让助手先跑一次本地配置自检，确认无误后再把构建报告或提醒发进群。

### 常用对话示例

- **首次自检（不发群消息）**
  > 帮我检查一下钉钉机器人配置有没有填好，不要往群里发消息。
- **任务汇总发 Markdown（确认后再发）**
  > 把刚才构建和测试的结果整理成一条简明 Markdown 钉钉通知，先给我看一眼标题和正文，我确认后再发出。
- **纯文本快速提醒**
  > 给钉钉群发一条纯文本提醒：今晚 22:00 预发布环境维护 15 分钟，请暂停合并。

## 常见卡点自检

| 遇到的现象 | 原因定位 | 解决方法 |
| :--- | :--- | :--- |
| `dsh-dingtalk 未配置` 或缺 `access_token` | `webhook` 为空或漏了 `?access_token=...` | 在「设置 → 插件 → 钉钉」粘贴完整 Webhook 并保存 |
| 钉钉返回 `310000` | `secret` 加签密钥错误，或同时启用了「自定义关键词」 | 核对 `SEC...` 密钥；若开启关键词，确保标题或正文包含它 |
| 钉钉返回 `120001` | 机器人 `access_token` 已失效或被重置 | 在钉钉群重新复制最新 Webhook 替换保存 |
| 提示请求超时 | 网络抖动，尚不确定群里是否已收到 | **先看一眼群消息是否已到**，确认未送达再重发，避免刷屏 |

## 插件更新

在原生插件详情页底部检查更新。默认自动检查，**默认不自动安装**；是否安装、何时重启由你决定。Suite 管理的组件随整包更新。

## 文档与反馈

- [使用说明与参数参考](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/USAGE.md) · [详细参考](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/REFERENCE.zh.md) · [更新记录](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/CHANGELOG.md) · [验证范围](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/docs/VALIDATION.md)
- 欢迎 Star，问题与建议请提交 [Issues](https://github.com/STARDUSTLC666/dsh-dingtalk/issues) 或 [PR](https://github.com/STARDUSTLC666/dsh-dingtalk/pulls)（反馈前请移除凭据）。

## License

[MIT](https://github.com/STARDUSTLC666/dsh-dingtalk/blob/main/LICENSE)

<a id="依赖与配置"></a>
