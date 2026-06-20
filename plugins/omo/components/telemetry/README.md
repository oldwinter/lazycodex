# codex-telemetry

这是一个 Codex plugin component。每当 Codex session 启动时，它会向 PostHog 发送一个匿名 daily-active event（`omo_codex_daily_active`）。

该 event **每台机器每天 UTC 最多发送一次**。它使用从 `omo-codex:${hostname}` 派生的 SHA256 hashed installation identifier，绝不发送 raw hostname。PostHog person profiles 被显式禁用。

## Hook 接线

组件注册单个 `SessionStart` hook：

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node \"${PLUGIN_ROOT}/dist/cli.js\" hook session-start",
            "timeout": 5
          }
        ]
      }
    ]
  }
}
```

aggregate `plugin/hooks/hooks.json` 会把此 hook 与 `rules` 和 `ultrawork` 一起挂载，让三者在每次 Codex session 开始时并行触发。

## 采集内容

单次 PostHog `capture` 调用包含：

- `event: "omo_codex_daily_active"`
- `distinctId: sha256("omo-codex:" + hostname)`
- `properties`:
  - `platform`, `product_name`, `package_name`, `package_version`
  - `runtime` (`"node"`), `runtime_version`
  - `source: "plugin"`, `reason: "session_start"`
  - `$os`, `$os_version`, `os_arch`, `os_type`
  - `cpu_count`, `cpu_model`, `total_memory_gb`
  - `locale`, `timezone`, `shell`, `ci`, `terminal`
  - `day_utc`（当天 UTC 日期）
  - `$process_person_profile: false`

组件绝不会发送 prompt contents、file contents、API keys、raw hostnames 或任何 user-identifying data。

## 退出遥测

启动 Codex 前设置任意以下环境变量：

```bash
# Codex-only opt-out
export OMO_CODEX_DISABLE_POSTHOG=1
export OMO_CODEX_SEND_ANONYMOUS_TELEMETRY=0

# Global opt-out (covers both omo and omo-codex)
export OMO_DISABLE_POSTHOG=1
export OMO_SEND_ANONYMOUS_TELEMETRY=0
```

设置任意变量后，组件会创建 no-op PostHog client，并且不发起任何网络调用。

## 每日去重

组件会在以下位置写入小型 JSON state file：

```text
$XDG_DATA_HOME/omo-codex/posthog-activity.json
# or, when XDG_DATA_HOME is unset:
~/.local/share/omo-codex/posthog-activity.json
```

内容形如 `{ "lastActiveDayUTC": "YYYY-MM-DD" }`。如果存储日期与今天（UTC）相同，hook 会直接返回，不发送任何内容。文件通过 `rename(2)` 原子写入。

## 失败行为

每条 telemetry 路径都包在 `try`/`catch` 中。即使 PostHog construction、capture 或 shutdown 失败，hook 也始终 exit 0，并且没有 stdout 或 stderr 输出。Codex session startup 不会被 telemetry failures 阻塞或拖慢。

已处理的 telemetry failures 只会写到本地 diagnostics file：

```text
$XDG_DATA_HOME/omo-codex/telemetry-diagnostics.jsonl
# or, when XDG_DATA_HOME is unset:
~/.local/share/omo-codex/telemetry-diagnostics.jsonl
```

diagnostics file 会保留最近 telemetry failures 的 JSONL rows，写入时清理陈旧 rows，并通过丢弃最旧的完整 rows 把文件限制在 256 KiB。Diagnostics 永远不会发送给 PostHog，也不包含 prompt contents、transcript contents、raw hostnames、API keys、tokens 或完整 hook payloads。

## Endpoint 覆盖

| 变量 | 默认值 |
|----------|---------|
| `POSTHOG_HOST` | `https://us.i.posthog.com` |
| `POSTHOG_API_KEY` | shared `omo-codex` project key |

## 开发

```bash
npm install
npm test           # vitest (in-process + subprocess CLI smoke)
npm run typecheck
npm run build      # tsc -> dist/
npm run check      # typecheck + biome + build
```

组件与 `@oh-my-opencode/omo-codex` CLI installer 共享 product identity constants。两处实现漂移会由 `packages/omo-codex/src/telemetry/cross-package-equivalence.test.ts` 防护。

## 隐私

完整披露见 [omo Privacy Policy](https://github.com/code-yeongyu/oh-my-openagent/blob/dev/docs/legal/privacy-policy.md)。
