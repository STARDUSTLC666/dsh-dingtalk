# 0.2.3 验证记录

日期：2026-10-26。官方 Windows 宿主：DSH 0.2.1-rc.3。

## 行为变化

宿主取消信号传递到发送请求，超时覆盖响应体读取，错误脱敏机器人凭据与签名；超时明确提示送达状态未知，避免盲目重复发送。

## 验证与限制

- Windows 本地：32 项，32 通过、0 跳过；没有把跳过计为通过。
- 官方 RC.3 tools.execute 接入本地模拟 HTTP 对端，验证正常回执、读取响应体时取消和超时，以及连接关闭；没有向真实钉钉群发送消息。
- GitHub 的跨平台 CI 和 npm 发布完整性以该版本工作流及 registry 为准；本记录不把本地测试等同于已发布。

## English

Host cancellation reaches the HTTP request; timeout also covers the response body. Errors redact webhook credentials and signatures. A timeout reports unknown delivery and asks users to check the group before retrying.

Runtime/account limits are listed above. Synthetic peers and model adapters do not establish live account delivery or model quality.
