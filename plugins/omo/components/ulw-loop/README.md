# codex-ulw-loop

[![ci](https://img.shields.io/badge/ci-pending-lightgrey.svg)](#) [![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

这是一个 Codex plugin scaffold，用于 durable repo-native multi-goal orchestration，内嵌 success criteria 和 observable evidence audit。

## 行为

| 子命令 | 作用 |
|------------|---------|
| `omo ulw-loop create-goals` | 从 brief 和 seed criteria 创建 repo-native goals。 |
| `omo ulw-loop record-evidence` | 为当前 active criterion 记录 observable evidence。 |
| `omo ulw-loop criteria` | 检查或修订 goal success criteria。 |
| `omo ulw-loop complete-goals` | criteria 通过后完成 eligible goals。 |
| `omo ulw-loop checkpoint` | criteria 与 evidence gates 通过前拒绝 completion。 |
| `omo ulw-loop steer` | 对 plan 应用 steering updates。 |
| `omo ulw-loop status` | 报告 active goal、criteria 和 evidence state。 |

Wave 1 只是 scaffold。命令行为会在后续 waves 落地。

## Codex Plugin 插件

plugin 包含：

- `.codex-plugin/plugin.json`，用于 Codex plugin discovery。
- `hooks/hooks.json`，用于 `UserPromptSubmit` hook。
- `skills/ulw-loop/`，作为未来 skill directory。

hook 命令是：

```bash
node "${PLUGIN_ROOT}/dist/cli.js" hook user-prompt-submit
```

这个 scaffold 不暴露 MCP server 或 Codex tool。

## 本地开发

```bash
npm install
npm test
npm run typecheck
npm run check
npm pack --dry-run
```

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

此 plugin 在本地运行。scaffold 本身不会调用网络服务。

## 许可证

[MIT](LICENSE).

## 相关项目

- [lazycodex](https://github.com/code-yeongyu/lazycodex) - Sisyphus Labs Codex marketplace repository。
