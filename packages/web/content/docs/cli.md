`lazycodex-ai` CLI 是安装和诊断 harness 的入口。它设计为通过 `npx` 运行，不要全局安装。

### install

```bash
npx lazycodex-ai install
```

一次性把 OmO agent harness 安装进 Codex：commands、skills、hooks、model routing 和 verification defaults。它完全等价于：

```bash
npx --yes --package oh-my-openagent omo install --platform=codex
```

如果要跳过 TUI 并让安装器自主运行：

```bash
npx lazycodex-ai install --no-tui --codex-autonomous
```

### doctor

```bash
npx lazycodex-ai doctor
```

输出健康报告：哪些已经配置、哪些缺失，以及原因。当 hook 处于 pending、skill 没有加载，或 routing 看起来异常时，先运行它。

### 前置条件

- [Node.js](https://nodejs.org) — 任意仍受维护的 LTS 版本；`npx` 随 Node 一起安装。安装器不需要 Bun。
- [OpenAI Codex CLI](https://github.com/openai/codex) 或已登录的 Codex app。

> 不要使用 `npm install -g` 或 `bun add -g`。始终通过 `npx` 调用。

### Marketplace 替代路径

作为补充性的实验路径，你可以在 Codex 内安装：输入 `/plugins`，打开 **Add Marketplace** 标签页，填入 `https://github.com/code-yeongyu/lazycodex`，然后从 `sisyphuslabs` marketplace 安装 `omo`。也可以通过 CLI：

```bash
codex plugin marketplace add https://github.com/code-yeongyu/lazycodex
codex plugin add omo@sisyphuslabs
```

上面的 npx 安装器仍然是主要路径。完整步骤见 [安装](./installation.md)。
