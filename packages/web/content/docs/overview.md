LazyCodex 是把 [OmO](https://github.com/code-yeongyu/oh-my-openagent) 移植到 Codex 的轻量版本。它不交付完整 harness；它移植一个角色：**Hephaestus**，自主 deep worker，以及让它的运行保持诚实的 workflows。可以把它理解成 Codex 版 [LazyVim](https://github.com/LazyVim/LazyVim)。

### 它来自哪里

OmO 是完整 agent harness：主 orchestrator（Sisyphus）通过 `.omo/boulder.json` 提供 session continuity，deep worker（Hephaestus）、specialist agents、multi-model routing、54+ lifecycle hooks 和 team mode。规模很大。LazyCodex 只取 focused Codex setup 最需要的部分，并把它打包成可重复安装。

### 你会得到什么

移植到 Codex 的 Hephaestus deep worker，包括：

- Goal-oriented execution — 你给 objective，而不是 step-by-step recipes。
- 紧凑运行循环：**Explore -> Plan -> Implement -> Verify -> Manually QA**。
- 并行 explore subagents，让它写代码前先映射地形。
- `$ulw-plan`、`$start-work` 和 `$ulw-loop` workflows，让复杂工作持续推进直到被验证。
- 一次性写入 Codex 的 skills、hooks、model routing 和 verification defaults。

### Harness 工作流

当任务需要 deep worker 作为一个协调一致、受证据约束的循环运行，而不是单个回合时，使用 `{your prompt} ultrawork`。

### 如何组合在一起

LazyCodex 是 [OmO](https://github.com/code-yeongyu/oh-my-openagent) 之上的薄发行层。核心引擎是 OmO；LazyCodex 把 OmO 的 Hephaestus 打包给 Codex。

鸣谢：LazyCodex 这个名字受到 [LazyVim](https://github.com/LazyVim/LazyVim) 启发。Ultragoal 和 UltraQA 的想法受到 [oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex) 启发，并为这个 Codex setup 重新实现。

- [GitHub 上的 LazyCodex](https://github.com/code-yeongyu/lazycodex)
- [GitHub 上的 OmO](https://github.com/code-yeongyu/oh-my-openagent)
