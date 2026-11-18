# dsh-dingtalk 使用说明

[返回简介](../README.md) · [更新记录](../CHANGELOG.md) · [验证记录](VALIDATION.md)

## 最快 3 步用起来

### 第 1 步：在钉钉群拿到 Webhook 与加签密钥

使用钉钉【自定义机器人】，**无需企业自建应用或管理员审批**：

1. 打开目标钉钉群 → **群设置** → **智能群助手** → **添加机器人** → **自定义（通过 Webhook 接入自定义服务）**。
2. 填写机器人名称，**安全设置勾选「加签」**（推荐只勾「加签」，避免关键词误拦）。
3. 复制两项信息：
   - **Webhook 地址**：形如 `https://oapi.dingtalk.com/robot/send?access_token=xxxx`
   - **加签密钥（secret）**：形如 `SECxxxx`

### 第 2 步：在 DSH 中填写配置（两种方式任选）

**方式 A（推荐）：DSH 原生设置面板（保存立即生效，无需重启）**

打开 **DSH → 设置 → 插件 → 钉钉（`dsh-dingtalk`）**：
- 在 `webhook` 填入完整机器人地址；
- 在 `secret` 填入 `SEC...` 加签密钥（两个字段均按凭据脱敏保护，不会回显明文）。

**方式 B：环境变量或 `cordis.patch.yml`（适合命令行 / 服务器部署）**

```powershell
# Windows PowerShell（推荐用环境变量保存加签密钥）
$env:DSH_DINGTALK_SECRET = "SEC你的加签密钥"
```

或在 `$DSH_HOME/profiles/<name>/cordis.patch.yml` 覆盖 `tool-dingtalk` 行：

```yaml
- id: tool-dingtalk
  config:
    webhook: https://oapi.dingtalk.com/robot/send?access_token=你的token
    secret: SEC你的加签密钥        # 可选；省略时自动读取环境变量 DSH_DINGTALK_SECRET
    timeoutMs: 10000              # 可选；单次请求超时毫秒数（1000–60000）
```

### 第 3 步：先自检，再发消息

插件自带空配置启动保护，未填凭据时绝不弄崩宿主。配好后先让助手跑一次本地自检（不触网、不往群里发测试噪声），全绿即可投入日常使用。

---

## 平时怎么对助手说（可直接复制的自然语言示例）

- **本地配置自检（零打扰）**
  > 先运行钉钉自检，帮我确认 webhook 和加签状态正常。
- **长任务结束自动发结构化日报 / 构建总结**
  > 跑完本轮测试后，用 Markdown 给钉钉群发一份结果摘要（标题写「回归测试结果」，列出通过数、失败项与下一步建议）。
- **发前人工把关（正式群防误发）**
  > 帮我拟一条发往钉钉群的版本发布通知，先把标题和正文贴在对话里让我确认，我说「发送」后再发。
- **简短纯文本提醒**
  > 给钉钉群发一条纯文本消息：线上巡检已完成，全部服务正常。

---

## 常见卡点自检

遇到异常时先让助手执行 `dingtalk_health`（本地检查 URL 结构与密钥来源，不发网络请求）：

| 现象 | 常见原因 | 一步修复 |
| :--- | :--- | :--- |
| `dsh-dingtalk 未配置：webhook …` | 尚未填写 `webhook` | 在 **DSH「设置 → 插件 → 钉钉」**粘贴完整 Webhook 并保存（立即生效） |
| 自检提示 `缺少 access_token` / `主机不是 oapi.dingtalk.com` | Webhook 地址粘贴不全或粘错链接 | 回钉钉群「自定义机器人」设置重新复制完整 `https://oapi.dingtalk.com/robot/send?access_token=...` |
| 返回 `310000` | `secret` 加签不匹配，或机器人同时勾选了「自定义关键词」 | 核对 `SEC...` 密钥；若启用了关键词，确认标题或正文包含该关键词 |
| 返回 `120001` | `access_token` 已过期或被重置 | 重新复制群机器人的最新 Webhook 更新配置 |
| 请求超时 | 网络慢或代理阻断，无法证明远端未收到 | **先查看钉钉群消息记录**；确认未送达再决定是否重发，必要时调大 `timeoutMs` |
| 消息发出但排版异常 | 钉钉 Markdown 子集限制或单条超长 | 使用标题、列表、加粗与链接等常用语法；超长内容让助手分段发送 |

---

## 配置项与工具参考

### 配置字段

| 字段 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `webhook` | 必填 | 钉钉自定义机器人完整 Webhook 地址（含 `?access_token=...`），凭据脱敏，支持热更新 |
| `secret` | 空 | HMAC-SHA256 加签密钥（`SEC...`）；留空时回退环境变量 `DSH_DINGTALK_SECRET` |
| `timeoutMs` | `10000` | 请求超时毫秒数（范围 `1000`–`60000`） |

### 注册工具清单

| 工具 | 作用 | 说明 |
| :--- | :--- | :--- |
| `dingtalk_notify` | 发送 **Markdown** 卡片消息 | 参数：`title`（卡片标题）、`text`（Markdown 正文） |
| `dingtalk_text` | 发送 **纯文本** 消息 | 参数：`content`（纯文本内容） |
| `dingtalk_health` | 本地配置自检 | 校验 `webhook` 形态、加签来源与超时配置，不触网、不刷群 |

### 安全、取消与送达边界

- **单向通知与凭据脱敏**：仅从助手向钉钉群单向发送消息，不读取群聊天记录；报错信息自动将 `webhook`、`access_token`、`secret` 与 `sign` 脱敏为 `[已隐藏]`。
- **取消与不自动重发**：会话取消会立即中止等待中的 HTTP 请求与响应读取；超时不会自动重试，避免群消息重复刷屏。
- **加签算法**：当存在 `secret` 时，按钉钉官方规范计算 `timestamp + "\n" + secret` 的 `HmacSHA256` Base64 并 URL 编码追加到请求参数。

## 安装、卸载与开发

```bash
# 安装（桌面版把 web 换为 desktop）
dsh plugin --profile web add dsh-dingtalk

# 卸载
dsh plugin --profile web remove dsh-dingtalk

# 本地构建与离线测试
pnpm install
pnpm test
```

## 协议

MIT。社区插件，与 DeepSeek 官方及钉钉官方无关；`@deepseek-ai/*` 为官方保留命名空间。
