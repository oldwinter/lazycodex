# codex-ulw-loop

[![ci](https://img.shields.io/badge/ci-pending-lightgrey.svg)](#) [![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

这是一个 Codex plugin component，用于 durable repo-native multi-goal orchestration，内嵌 success criteria 和 observable evidence audit。State 位于 `.omo/ulw-loop/` 下，并通过 `omo ulw-loop` CLI 修改。

## CLI

下面的每个 subcommand 都已实现。支持时可传 `--json` 获取 machine-readable output；也可传 `--session-id <id>`，或设置 `OMO_ULW_LOOP_SESSION_ID`，将 state 限定到一个 parallel session。

| 子命令 | 作用 |
|------------|---------|
| `omo ulw-loop help` | 打印 CLI usage。 |
| `omo ulw-loop create-goals` | 从 brief 创建 repo-native goals，并 seed success criteria。 |
| `omo ulw-loop status` | 报告 active goal、criteria 和 evidence state。 |
| `omo ulw-loop complete-goals` | 启动或恢复下一个 eligible goal，或报告 aggregate completion / blocked handoff。 |
| `omo ulw-loop checkpoint` | 用 evidence gate goal transition；final completion 需要完整的 Codex goal snapshot 和通过的 quality gate。 |
| `omo ulw-loop steer` | 对 plan 应用 steering updates。 |
| `omo ulw-loop add-goal` | 向 active plan 追加 goal。 |
| `omo ulw-loop criteria` | 检查一个 goal 的 success criteria。 |
| `omo ulw-loop record-evidence` | 为一个 criterion 记录 observable evidence。 |
| `omo ulw-loop record-review-blockers` | 将 goal 标记为 review-blocked，并从 final-review findings 添加 follow-up work。 |

`checkpoint` 解析的 final quality gate 会验证 `codeReview`、`manualQa`、`gateReview`、`iteration` 和 `criteriaCoverage`。`criteriaCoverage` 会记录 original intent、desired outcome、user-facing outcome review、pass counts 和 covered adversarial classes。

## Codex Plugin 插件

此目录是 aggregate `@sisyphuslabs/omo-codex-plugin` root 的一个 component。Plugin discovery（`.codex-plugin/plugin.json`）由 aggregate root 拥有，不由该 component 拥有。Component ships：

- `hooks/hooks.json` 注册两个 hooks：
  - `UserPromptSubmit` -> `node "${PLUGIN_ROOT}/dist/cli.js" hook user-prompt-submit --with-ultrawork`
  - `PreToolUse` 匹配 `^create_goal$` -> `node "${PLUGIN_ROOT}/dist/cli.js" hook pre-tool-use`
- `skills/ulw-loop/`，用于 bundled `ulw-loop` skill。
- `bin.omo-ulw-loop` -> `dist/cli.js`，用于 standalone CLI invocation。

此 component ships 一个 CLI、一个 skill 和 hooks。它不暴露 MCP server。

## 本地开发

```bash
npm install
npm test
npm run typecheck
npm run check
npm pack --dry-run
```

`npm test` 运行 Vitest，`npm run typecheck` 运行 `tsc --noEmit`，`npm run check` 运行 typecheck、Biome 和 build。

## 本地 Codex 安装

```bash
npx lazycodex-ai install
```

安装器会构建并复制 plugin 到 `~/.codex/plugins/cache/sisyphuslabs/omo/0.1.0`，从 `lazycodex` Git 仓库注册 `sisyphuslabs` marketplace，在那里安装 runtime dependencies，并启用：

```toml
[features]
plugins = true
plugin_hooks = true

[plugins."omo@sisyphuslabs"]
enabled = true
```

## 隐私

此 component 在本地运行，本身不会调用网络服务。

## 许可证

[MIT](LICENSE).

## 相关项目

- [lazycodex](https://github.com/code-yeongyu/lazycodex) - Sisyphus Labs Codex marketplace repository。
- [oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent) - 开发此 component 的 monorepo。
