LazyCodex 从 OmO 向 Codex 移植了一个 discipline agent：**Hephaestus**，自主 deep worker。Codex 包里没有 Sisyphus orchestrator；Hephaestus 是唯一主角色，它会用只读子 agent 做并行探索，并独自承担整次运行。

### Hephaestus 是什么

名字来自希腊锻造之神。它以目标为中心：你给它 objective，而不是一步步 recipe，它负责端到端执行。"The Legitimate Craftsman." Methodical、thorough、obsessive，适合深层架构推理、复杂调试和跨领域综合。

### 运行循环

Hephaestus 在每个工作单元上运行短而紧的循环：

1. **Explore** — 映射地形。用工具读代码，绝不猜测。写代码前触发 2-5 个并行 explore subagents。
2. **Plan** — 规划路线。通过 `update_plan` 记录要改的文件、具体改动和依赖。
3. **Implement** — 精确构建。做符合代码库风格的外科式编辑，包括 naming、indentation、imports 和 error handling。
4. **Verify** — 证明它能工作。对改动文件运行 LSP diagnostics、相关 tests 和 build，能并行就并行。
5. **Manually QA** — 通过真实表面驱动产物，例如 HTTP call、tmux、browser，然后再写最终回复。

### 它绝不会做什么

- **不会相信子 agent 自报完成。** 验证必须独立完成；child 说 "done" 不会关闭工作。
- **你要代码时不会只提方案。** 除非你明确要计划或 brainstorm，否则它会实现。
- **不会猜未读过的代码。** Exploration 很便宜，assumption 很昂贵。
- **不会在回合结束时留下未对齐的工作。** 每个 plan step 都会被归档为 `completed`、blocked（一句原因）或 removed（一句原因）。

### Delegation，不是 orchestration

Hephaestus 保持父会话身份。并行探索时，它会启动只读 Codex subagent roles（`multi_agent_v1.spawn_agent`），同时父会话用简短状态更新保持活跃。它不会把运行交给单独 orchestrator；它拥有目标，委派脏活，并亲自验证结果。

### Boulder 从哪里来

完整 OmO 有第二个主 agent：**Sisyphus**，负责带 `.omo/boulder.json` 会话连续性的 orchestrator。Codex 包是 Hephaestus-only light port，因此在 Codex 上，持久进度状态由 [`$start-work`](./start-work.md) 和 Stop-hook continuation 写入 `.omo/boulder.json`，但没有 Sisyphus orchestration layer。

### 继续阅读

- [ultrawork 模式](./ultrawork.md) — 把循环变成强约束 verified run 的模式。
- [Hooks 与生命周期](./hooks-lifecycle.md) — Stop-hook 如何持续注入下一轮，直到计划完成。
