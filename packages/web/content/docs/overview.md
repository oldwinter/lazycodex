LazyCodex 是把 [OmO](https://github.com/code-yeongyu/oh-my-openagent) 轻量移植进 Codex 的分发层。它不交付完整 harness，而是移植一个角色：**Hephaestus**，也就是 autonomous deep worker，以及让它的运行保持诚实的 workflows。可以把它理解成 Codex 版的 [LazyVim](https://github.com/LazyVim/LazyVim) 之于 [lazy.nvim](https://github.com/folke/lazy.nvim)。

> *"LazyVim made Neovim usable for the rest of us. LazyCodex does the same for Codex."*

### 轻量分发

LazyCodex 本身接近一个小型 install alias。`lazycodex-ai` 会运行面向 Codex platform 的 OmO installer，实际能力来自 `omo` plugin。

### 会安装什么

| Layer | What it means in Codex |
| --- | --- |
| **Commands** | `$init-deep`、`$ulw-plan`、`$start-work`、`$ulw-loop`，也就是 workflow entry points。 |
| **Skills** | Review、debugging、refactoring、frontend、LSP、rules injection 等 specialist playbooks。 |
| **Hooks** | 在 session start、prompt submit、post-edit、post-compact 和 stop 时触发的自动助手。 |
| **MCP Servers** | `grep_app`、`context7`、`codegraph`、`git_bash`、`lsp` 等 tool connections。 |
| **Model routing** | Role-based model profiles，让 planning、implementation 和 verification 各用合适模型。 |
| **Agent roles** | `explorer`、`librarian`、`plan`、`momus`、`metis`，以及用于 subagent delegation 的 executor/reviewer roles。 |

### 它来自哪里

OmO 是完整 agent harness：一个带 `.omo/boulder.json` session continuity 的 primary orchestrator（Sisyphus）、一个 deep worker（Hephaestus）、specialist agents、multi-model routing、54+ lifecycle hooks 和 team mode。内容很多。LazyCodex 只取对 Codex 聚焦设置最重要的部分，并把它打包成可重复安装。

### 你会得到什么

移植进 Codex 的 Hephaestus deep worker，包含：

- Goal-oriented execution：你给目标，不给 step-by-step recipes。
- 紧凑运行循环：**Explore -> Plan -> Implement -> Verify -> Manually QA**。
- 并行 explore subagents，让它在写任何内容前先映射地形。
- `$ulw-plan`、`$start-work` 和 `$ulw-loop` workflows，让复杂工作持续推进直到被验证。
- Skills、hooks、model routing 和 verification defaults 一次性接入 Codex。

### 记住这四个

1. `$init-deep` 创建项目记忆。
2. `$ulw-plan "what to build"` 确定工作指令。
3. `$start-work` 执行计划。
4. `$ulw-loop "task"` 持续推进直到验证完成。

LazyCodex 会围绕这个流程接入 rules loading、skills、hooks、model routing 和 verification habits。需要细节时，再按 sidebar 逐节阅读。

### Harness 工作流

当工作需要 deep worker 作为一个协调一致、证据约束的循环运行，而不是单 turn 时，在 prompt 中使用 `{your prompt} ultrawork`。

### 如何组合在一起

LazyCodex 是 [OmO](https://github.com/code-yeongyu/oh-my-openagent) 之上的轻量分发层。核心引擎是 OmO；LazyCodex 把 OmO 的 Hephaestus 打包给 Codex。

Credit: LazyCodex 的命名灵感来自 [LazyVim](https://github.com/LazyVim/LazyVim)。Ultragoal 和 UltraQA 的想法来自 [oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex)，并为这个 Codex 设置从概念重新实现。

- [LazyCodex on GitHub](https://github.com/code-yeongyu/lazycodex)
- [OmO on GitHub](https://github.com/code-yeongyu/oh-my-openagent)
- [Discord - #building-in-public](https://discord.gg/PUwSMR9XNk)
- [lazycodex.ai](https://lazycodex.ai)
