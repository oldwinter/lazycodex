`$ulw-plan` 是战略规划顾问（Prometheus）。它把想法变成 decision-complete work plan。它是 planner，**不是** implementer。当你说“do X”时，它会为 X 产出计划，绝不写产品代码。

### 流程

1. **Socratic interview**：只问探索无法解决的分叉。意图模糊时，先研究 best practice，而不是追问用户。
2. **Parallel codebase exploration**：扇出只读 subagents，让每个决策都基于真实代码，而不是记忆。
3. **Metis gap analysis**：列出计划依赖的每个 unknown，并关闭它，或把它作为显式分叉暴露出来。
4. **Write the plan** 到 `plans/<slug>.md`：一份 decision-complete plan，worker 执行时无需再次访谈。
5. **Optional Momus high-accuracy review**：在计划交付前，用 adversarial pass 尝试打破计划。

### 输出

Questions、research 和 work plan。每个 todo 都带 references、acceptance criteria、QA plan 和 commit boundary。计划会记录 `status: awaiting-approval` 并等待批准；它绝不会自己开始执行。

### Handoff

批准后，把计划交给 [`$start-work`](./start-work.md)，它会基于 durable Boulder state 和五个 evidence gates 执行。
