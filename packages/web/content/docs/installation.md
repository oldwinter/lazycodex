一个命令就能把 OmO agent harness 安装到 Codex，不需要全局安装 package。

### 前置条件

- [Node.js](https://nodejs.org)：任一维护中的 LTS；`npx` 随 Node/npm 提供。**不需要** Bun，installer 在普通 Node 上运行。
- [OpenAI Codex](https://github.com/openai/codex)：**Codex App**（推荐）或 **Codex CLI**。

LazyCodex 运行在 Codex *内部*。开始前 Codex 必须已安装并登录。如果你是第一次设置，Codex App 更简单，因为可以打开项目并直接从 GUI 调用 `$command`。

> 不要使用 `npm install -g` 或 `bun add -g`。始终通过 `npx` 调用。

### 安装

命令只有一行。无需全局安装，也无需 setup files。

```bash
npx lazycodex-ai install
```

它与 `npx --yes --package oh-my-openagent omo install --platform=codex` 完全等价。

如果要跳过 TUI 并运行完全自主、无 prompt 的设置：

```bash
npx lazycodex-ai install --no-tui --codex-autonomous
```

installer 会把 commands、skills、hooks、model routing 和 verification defaults 接入你的 Codex configuration。强烈建议让 LLM agent 运行安装；agent 会自动处理订阅检测、模型选择和 provider auth。

安装后，下次 Codex 启动会要求你在 startup review 中批准 `omo` hooks。Hooks 在批准前不会运行。

如果你觉得安装步骤太多，不必自己运行命令。打开 Codex，把 [lazycodex.ai](https://lazycodex.ai) 链接给它，然后让它安装 LazyCodex。agent 会阅读文档并走完整设置。

> **卡住了？** 加入 [LazyCodex Discord](https://discord.gg/6ztZB9jvWq)，找 **Jobdori** 求助。

### 从 Codex marketplace 安装（实验性）

上面的 npx installer 仍是主路径。作为附加的实验性替代方案，你可以直接在 Codex 内安装：输入 `/plugins`，打开 **Add Marketplace** tab（"Add a marketplace from a Git repo or local root."），输入 `https://github.com/code-yeongyu/lazycodex`，然后从 `sisyphuslabs` marketplace 安装 `omo`。也可以用 CLI：

```bash
codex plugin marketplace add https://github.com/code-yeongyu/lazycodex
codex plugin add omo@sisyphuslabs
```

下一次启动时，在 Codex startup review 中批准 omo hooks；hooks 在批准前绝不会运行。首次批准的 session 会打印 `LazyCodex bootstrap running in background — restart the session when it completes`，同时后台 worker 完成设置（config blocks、agent roles、bin links、用于 `ast_grep` MCP 的 pinned `sg` binary）；完成后重启 session。marketplace 路径不会触碰 Codex permission settings；autonomous mode 仍然需要显式选择 `npx lazycodex-ai install --no-tui --codex-autonomous`。

使用 `codex plugin marketplace upgrade sisyphuslabs` 升级。下一次 startup review 会把 hooks 显示为 **Modified**，这是每次升级后的预期行为，因为 plugin 文件变了，之前的 trust hashes 不再匹配。重新批准后，随后的 session 会在新版本上重新运行 bootstrap。如果状态看起来 pending 或 degraded，`npx lazycodex-ai doctor` 会说明问题和原因。

### Authentication

Auth 的目标是 **Codex 本身**，不是 LazyCodex。Codex CLI 在自身设置流程中登录；Codex App 通过 app UI 登录。没有单独的 LazyCodex login command。

Codex 登录后，`npx lazycodex-ai install` 会处理订阅检测、模型选择和 provider routing。如果你让 LLM agent 运行安装，它会为你走同一流程。

检查已配置内容：

```bash
npx lazycodex-ai doctor
```

`doctor` 会说明已设置什么、缺失什么，以及为什么重要。Provider 和 routing 详情见[配置](./configuration.md)。

### Windows

两种安装路径都支持原生 Windows。

- **Node:** `npx lazycodex-ai install` 需要 `PATH` 上有 Node.js（推荐 LTS）。marketplace 安装时，如果缺少 `node`，bootstrap 步骤会自动把 pinned Node LTS runtime provision 到 `%USERPROFILE%\.codex\runtime\node\`；先自己安装 Node 也可以，并会跳过下载。
- **Git Bash:** shell hooks 需要 Git Bash。installer 和 marketplace bootstrap 在缺少 Git Bash 时都会尝试运行 `winget install --id Git.Git -e --source winget`。如果 Git 位于自定义路径，把 `OMO_CODEX_GIT_BASH_PATH` 设为类似 `C:\Program Files\Git\bin\bash.exe` 的路径。
- **`where bash` 显示 `C:\Windows\System32\bash.exe`:** 这是 WSL launcher，不是 Git Bash。LazyCodex 在解析 Git Bash 时会故意忽略 `System32` 和 `WindowsApps` 中的 `bash.exe` shims。安装 Git for Windows，或把 `OMO_CODEX_GIT_BASH_PATH` 指向真正的 Git Bash。
- **Troubleshooting:** Windows marketplace bootstrap 会把 transcript 写到 `%USERPROFILE%\.codex\plugins\data\omo-sisyphuslabs\bootstrap\ps-bootstrap.log`；degraded lines 类似 `degraded component=node reason=... hint=npx lazycodex-ai doctor`。运行 `npx lazycodex-ai doctor` 查看完整健康报告。

### 让 agent 替你安装

强烈建议让 LLM agent 运行安装并为你走完整设置。agent 会自动处理订阅检测、模型选择和 provider auth。
