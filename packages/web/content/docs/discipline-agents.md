LazyCodex 把 OmO 中的一个 discipline agent 移植到 Codex：**Hephaestus**，也就是 autonomous deep worker。Codex package 中没有 Sisyphus orchestrator；Hephaestus 是唯一角色，并通过只读 subagents 做并行探索，自己承担整次运行。

### Hephaestus 是什么

名字来自希腊锻造之神。它是目标导向的：你给目标，不给 step-by-step recipes，它会端到端执行。“The Legitimate Craftsman.” Methodical、thorough、obsessive，适合深层架构推理、复杂调试和跨领域综合。

### 已安装角色

截至 `4.12.1`，会安装以下 roles。当 Codex 暴露 `agent_type` 时，会直接设置 role；否则 role description 会作为 fallback 写进 message。

| Role | Primary use |
| --- | --- |
| `explorer` | 代码库内部上下文：结构、调用流、测试位置。 |
| `librarian` | 外部文档、library contracts、最新 API research。 |
| `plan` | 计划草拟与任务拆分。 |
| `momus` / `metis` | 缺失决策、边界情况、风险 review。 |
| `lazycodex-executor` | 执行 plan 中的具体任务单元。 |
| `lazycodex-code-reviewer` | 实现后的代码质量 review。 |
| `lazycodex-qa-executor` | 基于真实执行的 QA。 |
| `lazycodex-gate-reviewer` | 完成前 verification gates。 |
| `lazycodex-clone-fidelity-reviewer` | clone 与 sync 操作 fidelity 检查。 |

### 父会话拥有最终判断

即使有多个 roles，完成判断也不会整体交给 sub-agent。父 Codex session 保留目标、约束和最终判断的所有权。Sub-agents 用来读取地形、发现缺口或辅助 review。

### 运行循环

Hephaestus 会在每个工作单元上运行短而紧的循环：

1. **Explore**：映射地形。用工具读代码，绝不猜测。写任何内容前先启动 2-5 个并行 explore subagents。
2. **Plan**：规划路线。通过 `update_plan` 记录要修改的文件、具体改动和依赖关系。
3. **Implement**：精确构建。即使 greenfield 里会写成另一种样子，也要做符合代码库风格的外科式编辑，包括命名、缩进、imports 和错误处理。
4. **Verify**：证明可用。对改动文件运行 LSP diagnostics、相关 tests 和 build，能并行就并行。
5. **Manually QA**：驱动 artifact 通过真实表面（HTTP call、tmux、browser），然后写最终消息。

### Non-goals

- **绝不信任 subagent 自报。** 验证必须独立；child 说“done”不代表工作关闭。
- **你要代码时绝不只提 proposal。** 除非你明确想要 plan 或 brainstorm，否则它会实现。
- **绝不猜测没读过的代码。** 探索便宜，假设昂贵。
- **绝不在 turn 结束时留下未归档工作。** 每个 plan step 都要 reconciled：`completed`、blocked（一行原因）或 removed（一行原因）。

### Delegation，不是 orchestration

Hephaestus 保持父会话身份。做并行探索时，它会 spawn 只读 Codex subagent roles（`multi_agent_v1.spawn_agent`），并在 children 运行期间让父会话保持简短状态更新。它不会把运行交给另一个 orchestrator；它拥有目标，委派苦活，并亲自验证结果。

### Boulder state

`$start-work` 使用 `.omo/boulder.json` 持久化进度，并用 Stop-hook continuation 保持 plan execution 前进。这是核心可见行为：checkboxes 推进，全部完成后打印 **ORCHESTRATION COMPLETE**。

### Boulder 从哪里来

完整 OmO 还有第二个 primary agent：**Sisyphus**，也就是带 `.omo/boulder.json` session continuity 的 orchestrator。Codex package 是只包含 Hephaestus 的轻量移植版，因此在 Codex 上，durable progress state 由 [`$start-work`](./start-work.md) 和 Stop-hook continuation 写入 `.omo/boulder.json`，没有 Sisyphus orchestration layer。

### 继续阅读

- [ultrawork mode](./ultrawork.md)：把循环变成 binding verified run 的模式。
- [Hooks 与生命周期](./hooks-lifecycle.md)：Stop-hook 如何重新注入下一轮，直到 plan 完成。
