# codex-rules

这个 Codex plugin 通过 lifecycle hooks 把本地项目 rule files 注入模型上下文。

它把 `pi-rules` rule injector 移植到 Codex：

- `SessionStart` 和 `UserPromptSubmit` 每个会话加载一次 static project instructions。
- `PostToolUse` 默认监听 Codex `apply_patch`，然后把匹配的 file-specific rules 作为 additional context 注入。
- `PostCompact` 在手动或自动 compact 后清空 per-session injection cache，让相关 rules 可以重新注入 compacted conversation。
- Session-level deduplication 防止同一条 rule 在已经注入后重复出现。

`PostToolUse` output 仅提供 context：它输出 `hookSpecificOutput.additionalContext`，不会重写 tool output。

runtime 没有 npm production dependencies，因此干净的 Codex marketplace copy 不需要后续 `npm install` 也能运行。

## Rule Sources 来源

项目级 sources：

- `CONTEXT.md`
- `.omo/rules/**/*.md`
- `.claude/rules/**/*.md`
- `.cursor/rules/**/*.md`
- `.github/instructions/**/*.md`
- `.github/copilot-instructions.md`

ported engine 可用时也支持 user-home sources。`AGENTS.md` 不属于 `auto` source selection，因为 Codex 已经把它作为 native project instructions 加载；通过 hooks 再注入会重复上下文。如果确实需要 hook-level migration behavior，可用 `CODEX_RULES_ENABLED_SOURCES` 显式开启。Claude user-home sources（`~/.claude/rules`、`~/.claude/CLAUDE.md`）也从 `auto` 中排除，因为它们通常包含 Claude Code runtime instructions，而不是 Codex rules；需要迁移行为时再显式开启。

Markdown rule files 可以使用 frontmatter，例如：

```md
---
description: TypeScript defaults
globs: ["**/*.ts", "**/*.tsx"]
alwaysApply: false
---

优先使用 strict TypeScript，并保持 runtime imports 与 ESM 兼容。
```

## 本地安装

```bash
npx lazycodex-ai install
```

本地安装器会构建 plugin，并把干净 cache entry 复制到：

```text
~/.codex/plugins/cache/sisyphuslabs/omo/0.1.0
```

同时启用：

```toml
[features]
plugins = true
plugin_hooks = true
multi_agent = true
child_agents_md = true

[plugins."omo@sisyphuslabs"]
enabled = true
```

## 配置

使用 `CODEX_RULES_*` 环境变量：

| 变量 | 取值 | 默认值 |
| --- | --- | --- |
| `CODEX_RULES_DISABLED` | `1`, `true`, `yes`, `on` | unset |
| `CODEX_RULES_MODE` | `both`, `static`, `dynamic`, `off` | `both` |
| `CODEX_RULES_MAX_RULE_CHARS` | positive integer | `12000` |
| `CODEX_RULES_MAX_RESULT_CHARS` | positive integer | `40000` |
| `CODEX_RULES_ENABLED_SOURCES` | comma-separated source names or `auto` | `auto` (excludes `AGENTS.md`, `~/.claude/rules`, `~/.claude/CLAUDE.md`) |

从 `pi-rules` 迁移时，等价的 `PI_RULES_*` variables 会作为 fallback 被接受。

## 调试

用 `NODE_DEBUG=codex-rules` 开启 hook phase timing：

```bash
NODE_DEBUG=codex-rules node dist/cli.js hook post-tool-use < fixture.json
```

debug 行输出到 stderr，hook JSON 保持在 stdout。日志包含 `PostToolUse` phases，例如 `extract`、`fingerprint`、`load`、`persist`、elapsed `ms`、target counts、pending counts、rule counts 和 output bytes。它不会记录 rule bodies 或 tool response contents。

默认 `PostToolUse` hook matcher 故意严格：只匹配 Codex canonical `apply_patch` hook tool name。Read tools、MCP filesystem tools、shell commands 和 Claude-style `Write`/`Edit` aliases 默认没有注册。

## 开发

```bash
npm install
npm test
npm run check
npm run typecheck
npm pack --dry-run
```

Performance smoke test：

```bash
npm run bench
```

Benchmark timings 取决于本地机器。比较运行时使用 relative counters 和 repeat-output checks。

Hook smoke test：

```bash
npm run build
printf '%s\n' '{"session_id":"s","transcript_path":null,"cwd":"/path/to/project","hook_event_name":"SessionStart","model":"gpt-5.5","permission_mode":"default","source":"startup"}' \
  | PLUGIN_DATA=/tmp/codex-rules-data node dist/cli.js hook session-start
```

## 隐私

`codex-rules` 在本地运行。它读取本地 rule files 和 Codex hook payloads，在 Codex plugin data directory 下写入 per-session deduplication state，并且不会发起网络请求。

## 许可证

MIT. See [LICENSE](LICENSE) and [NOTICE](NOTICE).
