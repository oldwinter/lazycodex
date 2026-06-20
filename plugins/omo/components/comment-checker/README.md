# codex-comment-checker

[![ci](https://github.com/code-yeongyu/codex-comment-checker/actions/workflows/ci.yml/badge.svg)](https://github.com/code-yeongyu/codex-comment-checker/actions/workflows/ci.yml) [![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

这个 Codex plugin 会在成功的编辑类 `PostToolUse` hook 调用后运行 [`@code-yeongyu/comment-checker`](https://github.com/code-yeongyu/go-claude-code-comment-checker)。

## 行为

| 情况 | 结果 |
|------|--------|
| `apply_patch` succeeds | 解析 `tool_input.command` 并检查新增/更新文件 |
| `write`, `edit`, `multi_edit`, or `multiedit` succeeds | 将 Codex payload 映射为 native checker hook input |
| non-edit tool succeeds | 忽略 |
| checker exits `2` | 返回 Codex `PostToolUse` blocking feedback，让模型修复或解释 warning |
| checker binary missing or unavailable on the current platform | 不输出 hook 内容 |
| checker exits unexpectedly | 保持 hook output 不变 |

删除操作会被忽略，因为它们不能引入新注释。

## Codex Plugin 插件

plugin 包含：

- `.codex-plugin/plugin.json`，用于 Codex plugin discovery。
- `hooks/hooks.json`，用于 `PostToolUse` hook。
- `skills/comment-checker/SKILL.md`，提供使用指导。

hook 命令是：

```bash
node "${PLUGIN_ROOT}/dist/cli.js" hook post-tool-use
```

不会暴露 MCP server 或 `comment_check` tool。

## 本地开发

```bash
npm install
npm test
npm run typecheck
npm run check
npm pack --dry-run
```

Smoke-test hook：

```bash
node dist/cli.js hook post-tool-use < test/fixtures/post-tool-use.json
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

## 分支规则与发布

- `main` 受 `.github/branch-ruleset.json` 保护。
- CI 在 Ubuntu、macOS 和 Windows 上运行 Node 20 与 22。
- Releases 以 `v<semver>` 形式发布为 GitHub Releases。
- GitHub Release 发布后，`publish` workflow 负责发布。

## 隐私

此 plugin 在本地运行。可用时，它会把 hook input 发送给可选的本地 `comment-checker` binary；它本身不会调用网络服务。

## 许可证

[MIT](LICENSE).

## 相关项目

- [pi-comment-checker](https://github.com/code-yeongyu/pi-comment-checker) - 此 Codex plugin 移植的源 extension。
- [comment-checker](https://github.com/code-yeongyu/go-claude-code-comment-checker) - native checker binary。
