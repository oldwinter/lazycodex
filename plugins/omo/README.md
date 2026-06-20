# omo

`omo` 是 Yeongyu 的 Codex 组件在本地使用的单一 Codex plugin namespace。

内部每个组件仍然隔离在 `components/` 下：

- `components/comment-checker`
- `components/rules`
- `components/lsp`
- `components/git-bash`
- `components/start-work-continuation`
- `components/ultrawork`
- `components/ulw-loop`
- `components/telemetry`

根 plugin manifest 导出一个名为 `omo` 的 Codex plugin，聚合 hooks、skills，以及 plugin-scoped MCP servers：`grep_app`、`context7`、`git_bash` 和 `lsp`。AST-aware search 作为 `ast-grep` skill 发布，不作为 MCP server 发布。

## Telemetry 遥测

内置 telemetry 组件会在 Codex `SessionStart` hook 运行时，最多每天（UTC）每台机器发送一次匿名 `omo_codex_daily_active` event。它使用 `sha256("omo-codex:" + hostname)` 作为 distinct ID，禁用 PostHog person profiles，并把每日去重状态存储在 `$XDG_DATA_HOME/omo-codex/posthog-activity.json` 或 `~/.local/share/omo-codex/posthog-activity.json`。

采集属性仅限 product/runtime metadata、operating-system metadata、粗粒度机器形态、locale/timezone、shell/terminal hints、`source`、`reason` 和 `day_utc`。它不会发送 prompt 内容、chat transcripts、source files、repository contents、file paths、access tokens、API keys、raw hostnames、Git remotes、usernames、email addresses 或 runtime error diagnostics。

在启动 Codex 前可选择退出：

```bash
export OMO_CODEX_DISABLE_POSTHOG=1
export OMO_CODEX_SEND_ANONYMOUS_TELEMETRY=0
```

全局 opt-out flags 也会禁用此 telemetry：

```bash
export OMO_DISABLE_POSTHOG=1
export OMO_SEND_ANONYMOUS_TELEMETRY=0
```

详细实现说明见 `components/telemetry/README.md`；根产品披露位于源仓库的 `docs/reference/codex-telemetry.md`。
