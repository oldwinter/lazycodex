一个命令即可为 Codex 安装 OmO agent harness，不需要全局安装 package。

### 安装

```bash
npx lazycodex-ai install
```

这完全等价于 `npx --yes --package oh-my-openagent omo install --platform=codex`。

### 自主安装一行命令

```bash
npx lazycodex-ai install --no-tui --codex-autonomous
```

### 前置条件

- [Node.js](https://nodejs.org) — 任意仍受维护的 LTS；`npx` 随它一起安装。Bun **不是** 必需项，安装器运行在普通 Node 上。
- [OpenAI Codex CLI](https://github.com/openai/codex)

> 不要使用 `npm install -g` 或 `bun add -g`。始终通过 `npx` 调用。

### 从 Codex marketplace 安装（实验性）

上面的 npx 安装器仍然是主要路径。作为补充性的实验路径，你可以在 Codex 内安装：输入 `/plugins`，打开 **Add Marketplace** 标签页（"Add a marketplace from a Git repo or local root."），填入 `https://github.com/code-yeongyu/lazycodex`，然后从 `sisyphuslabs` marketplace 安装 `omo`。也可以通过 CLI：

```bash
codex plugin marketplace add https://github.com/code-yeongyu/lazycodex
codex plugin add omo@sisyphuslabs
```

下次启动时，在 Codex startup review 中批准 omo hooks。hook 在批准前绝不会运行。第一次批准后的会话会打印 `LazyCodex bootstrap running in background — restart the session when it completes`，同时后台 worker 完成 setup：config blocks、agent roles、bin links，以及 `ast_grep` MCP 使用的固定版 `sg` binary。完成后重启即可。marketplace 安装不会修改 Codex permission settings；autonomous mode 仍然需要显式使用 `npx lazycodex-ai install --no-tui --codex-autonomous`。

升级使用 `codex plugin marketplace upgrade sisyphuslabs`。下次 startup review 会把 hooks 显示为 **Modified**，这是每次升级后的预期状态，因为 plugin 文件变了、旧 trust hashes 不再匹配。重新批准后，下一次会话会在新版本上重新运行 bootstrap。如果任何项目看起来 pending 或 degraded，`npx lazycodex-ai doctor` 会解释原因。

### Windows

两条安装路径都支持原生 Windows。

- **Node:** `npx lazycodex-ai install` 需要 `PATH` 上有 Node.js（推荐 LTS）。marketplace 安装时，如果缺少 `node`，bootstrap 步骤会自动把固定版 Node LTS runtime provision 到 `%USERPROFILE%\.codex\runtime\node\`；你先自行安装 Node 也可以，并会跳过下载。
- **Git Bash:** shell hooks 需要它。安装器和 marketplace bootstrap 在缺少 Git Bash 时，都会尝试运行 `winget install --id Git.Git -e --source winget`。如果 Git 安装在自定义位置，把 `OMO_CODEX_GIT_BASH_PATH` 设置为类似 `C:\Program Files\Git\bin\bash.exe` 的路径。
- **`where bash` 显示 `C:\Windows\System32\bash.exe`:** 这是 WSL launcher，不是 Git Bash。LazyCodex 在解析 Git Bash 时会有意忽略 `System32` 和 `WindowsApps` 下的 `bash.exe` shim。安装 Git for Windows，或把 `OMO_CODEX_GIT_BASH_PATH` 指向真实 Git Bash。
- **故障排查:** Windows marketplace bootstrap 会把 transcript 写到 `%USERPROFILE%\.codex\plugins\data\omo-sisyphuslabs\bootstrap\ps-bootstrap.log`；degraded 行看起来像 `degraded component=node reason=... hint=npx lazycodex-ai doctor`。运行 `npx lazycodex-ai doctor` 查看完整健康报告。

### 让 agent 替你安装

强烈建议让 LLM agent 运行安装并引导 setup。agent 会自动处理 subscription detection、model selection 和 provider auth。
