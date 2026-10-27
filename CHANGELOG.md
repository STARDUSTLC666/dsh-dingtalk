# 更新记录

[返回简介](README.md) · [使用说明](docs/USAGE.md) · [验证记录](docs/VALIDATION.md)

## 0.3.0 (2026-10-26)

- Add this plugin’s own update controls and independent preferences. Automatic installation stays off until explicitly enabled.
- Confirm manual installs, preserve local sources and disabled state, pause for tasks or unsaved changes, and use native DSH recovery without forced restarts.
- Require the public DSH 0.2.1-rc.3 update APIs; Suite components remain managed through Suite.

## 0.2.3（2026-10-26）

- 宿主取消信号传递到发送请求，超时覆盖响应体读取，错误脱敏机器人凭据与签名；超时明确提示送达状态未知，避免盲目重复发送。
- Windows 回归 32 项通过、0 项跳过；宿主与未验收范围见[本次记录](docs/validation-0.2.3.md)。

## 0.2.2 (2026-09-28)

- 更新官方 Harness 0.2.0-rc.1 的兼容声明和共同加载验证；运行时代码未变。验证范围见[验证记录](docs/VALIDATION.md)。

## 更早的改动

完整历史可查阅 [GitHub 提交记录](https://github.com/STARDUSTLC666/dsh-dingtalk/commits/main)。
