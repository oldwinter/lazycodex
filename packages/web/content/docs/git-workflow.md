Git 工作通过 `git-master` skill 执行。它强调精确、保守和证据优先：agent 会先读取仓库状态，再做任何推断；除非你明确要求，否则不会 commit、rebase、push、force-push、reset 或 stash-pop。

### 模式门禁

每个请求都会先分类：

- `COMMIT`：stage 并 commit 本地改动。
- `REBASE`：rebase、squash、fixup、autosquash、重排或拆分分支历史。
- `HISTORY`：回答某项改动何时、何处、由谁、为什么或由哪个 commit 引入。
- `STATUS`：只检查 branch、diff 或 working tree 状态，不修改任何内容。

调查型请求会报告发现后停止。

### Commit 模式

Commit 会按行为、模块和可回滚性保持原子性。agent 会从最近历史中识别 message 风格（主导模式、语言、大小写；除非仓库本身使用 Conventional Commits，否则不会默认采用它），检查完整 diff，并按路径或 hunk stage，确保每个 commit 只包含自己的组。实现和直接测试放在一起；无关关注点拆成不同 commit。每次 commit 前检查 `git diff --staged --stat`，commit 后检查 `git log -1 --oneline`。

### Rebase 与 merge

历史重写会影响共享协作。除非你明确点名该操作，否则 agent 不会 rebase 或重写 `main`、`master`、`dev`、release 或受保护分支。如果 commit 可能已经 push，force-push 前会先询问，并使用 `--force-with-lease`，绝不使用裸 `--force`。冲突按意图解决，绝不盲目选择 ours/theirs。如果 rebase 出错，第一步是 `git rebase --abort`；reflog 是恢复路径，使用前会先说明。

### Push 安全

任何写历史操作前，都要确认：当前分支已知，dirty work 已归属清楚，upstream/pushed 状态已知或明确未知，操作符合你的请求，并且恢复路径已知。完成后会运行最便宜且相关的验证，并明确留下工作树状态。

### 继续阅读

- [start-work](./start-work.md)：把计划工作落成 commit 的执行器。
- [手动 QA](./manual-qa.md)：一个步骤被允许关闭前必须通过的门禁。
