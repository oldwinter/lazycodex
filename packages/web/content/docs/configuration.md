LazyCodex 是 [OmO](https://github.com/code-yeongyu/oh-my-openagent) 之上的薄发行层。安装器写入 Codex 的配置会控制 model routing、hooks、skills，以及 harness 使用的 agent roles。

### 配置在哪里

- 安装器连接并写入的 Codex 配置。
- 项目级 `AGENTS.md` 和 rule files，它们按仓库塑造 agent 行为。
- 用户级 skill 位置，例如 `~/.config/opencode/skills` 和 `~/.agents/skills`。

### 可以调整什么

- **Model routing** — 哪个模型负责 planning、implementation、verification 和 specialist skills。安装器会根据检测到的订阅设置合理默认值；当项目需要不同配置时，可以按角色覆盖。
- **Hooks and lifecycle** — Stop-hook 是否自动继续计划、迭代上限（ultrawork 模式 500，普通模式 100），以及完成状态如何被 gate 约束。
- **Skills** — 哪些 skills 处于 active 状态，以及它们从哪里加载。
- **Agent** — Hephaestus autonomous deep worker 及其模型/提示词覆盖。Codex 包是 Hephaestus-only light port，不包含完整 OmO 的 Sisyphus orchestrator。

### 诊断配置

如果某些状态看起来 pending 或 degraded，运行：

```bash
npx lazycodex-ai doctor
```

它会解释哪里配置错误、为什么错误，并指出需要修复的具体字段。

### 重新运行安装

安装器是幂等的。重新运行 `npx lazycodex-ai install` 会在现有状态上重写配置块、agent roles 和 bin links，因此手动编辑配置后再次运行是安全的。

每个命令见 [CLI 参考](./cli.md)。
