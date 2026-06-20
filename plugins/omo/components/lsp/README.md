# codex-lsp

[![ci](https://github.com/code-yeongyu/codex-lsp/actions/workflows/ci.yml/badge.svg)](https://github.com/code-yeongyu/codex-lsp/actions/workflows/ci.yml) [![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

这个 Codex plugin 移植了 [`pi-lsp-client`](https://github.com/code-yeongyu/pi-lsp-client) 的 standalone LSP runtime。它为 Codex 提供编辑后的 diagnostics，以及面向 language-aware code work 的显式 MCP tools。

## 架构

LSP runtime 已迁移到 [`lsp-tools-mcp`](https://github.com/code-yeongyu/lsp-tools-mcp)，并由本仓库根部的 `packages/lsp-tools-mcp/` package 消费。

- `codex-lsp` 保留 Codex-specific integration（`hook post-tool-use`、plugin metadata、package wiring）。
- `lsp-tools-mcp` 拥有 MCP runtime、LSP manager 和 tool implementations。
- `src/cli.ts` 把 `mcp` 路由到 upstream runtime，同时把 `hook post-tool-use` 保持在本地。

## 行为

| 情况 | 结果 |
|------|--------|
| `apply_patch` succeeds | 解析 `tool_input.command`，提取新增/更新/移动文件，并对每个文件检查 LSP error diagnostics |
| `write` / `edit` / `multiedit` succeeds | 检查 `path`、`filePath` 或 `file_path` aliases |
| diagnostics contain errors | 返回 Codex `PostToolUse` blocking feedback，并把相同 diagnostics 作为 additional context 注入，让 Codex 修复文件 |
| no diagnostics | 不输出 hook 内容 |
| unsupported extension | 不输出 hook 内容 |
| missing configured language server | 通过 hook 或 MCP output 显示安装/配置消息 |

删除操作会被忽略，因为它们不能引入新的 diagnostics。

## MCP Tools 工具

- `lsp.status`
- `lsp.diagnostics`
- `lsp.goto_definition`
- `lsp.find_references`
- `lsp.symbols`
- `lsp.prepare_rename`
- `lsp.rename`

`lsp.rename` 会把返回的 workspace edit 应用到文件。尽可能先使用 `lsp.prepare_rename`。

## 配置

项目配置：

```text
.codex/lsp-client.json
```

用户配置：

```text
~/.codex/lsp-client.json
```

示例：

```json
{
	"lsp": {
		"typescript": {
			"command": ["typescript-language-server", "--stdio"],
			"extensions": [".ts", ".tsx", ".js", ".jsx"]
		}
	}
}
```

没有 custom config 覆盖时，会使用内置 server definitions。`lsp.status` 会显示哪些 configured servers 已安装或缺失。

## Codex Plugin 插件

plugin 包含：

- `.codex-plugin/plugin.json`，用于 Codex plugin discovery。
- `.mcp.json`，用于 `lsp` MCP server。
- `hooks/hooks.json`，用于 `PostToolUse` diagnostics hook。
- `skills/lsp/SKILL.md`，提供 MCP 使用指导。

runtime 通过 `file:../../../../lsp-tools-mcp` 依赖 `@code-yeongyu/lsp-tools-mcp`，因此 marketplace build 会复用根 package，而不是在该组件下携带第二份副本。

hook 命令是：

```bash
node "${PLUGIN_ROOT}/dist/cli.js" hook post-tool-use
```

MCP 命令是：

```bash
node ../../../../lsp-tools-mcp/dist/cli.js mcp
```

## 本地开发

```bash
npm run bootstrap     # installs + builds the root packages/lsp-tools-mcp package
npm install
npm test
npm run typecheck
npm run check
npm pack --dry-run
```

`bootstrap` script 会安装并构建根部 `lsp-tools-mcp` package，让 `@code-yeongyu/lsp-tools-mcp/dist/*.js` 可供 codex-lsp build 使用。

Smoke-test hook：

```bash
node dist/cli.js hook post-tool-use < test/fixtures/post-tool-use.json
```

Smoke-test MCP server：

```bash
printf '%s\n' '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node dist/cli.js mcp
```

## 本地 Codex 安装

```bash
npx lazycodex-ai install
```

安装器会构建并复制 plugin 到 `~/.codex/plugins/cache/sisyphuslabs/omo/0.1.0`，从 `lazycodex` Git 仓库注册 `sisyphuslabs` marketplace，并启用：

```toml
[plugins."omo@sisyphuslabs"]
enabled = true
```

## 分支规则与发布

- `main` 受 `.github/branch-ruleset.json` 保护。
- CI 在 Ubuntu、macOS 和 Windows 上运行 Node 20 与 22。
- Releases 以 `v<semver>` 形式发布为 GitHub Releases。
- GitHub Release 发布后，`publish` workflow 负责发布。

## 隐私

此 plugin 在本地运行。它会在你的机器上启动已配置的 language-server commands；它本身不会调用网络服务。

## 许可证

[MIT](LICENSE).

## 相关项目

- [pi-lsp-client](https://github.com/code-yeongyu/pi-lsp-client) - 此 Codex plugin 移植的源 extension。
