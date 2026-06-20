LazyCodex 最适合作为复杂代码库的 harness：项目记忆、规划、执行、可验证完成、skills、hooks、model routing 和 diagnostics。本页说明最常用的四个命令，以及什么时候选择它们。

### 四个命令

| Command | 适用场景 |
| --- | --- |
| `$init-deep` | 仓库太大或历史太久，无法靠记忆解释。 |
| `$ulw-plan` | 写代码前需要先做决策。 |
| `$start-work` | 已有计划，需要执行到完成。 |
| `$ulw-loop` | 希望 agent 持续推进，直到结果被验证。 |

### 如何选择

每个仓库先运行一次 `$init-deep`，让 agent 有分层 `AGENTS.md` 上下文可用。

只要任务有歧义，先运行 `$ulw-plan`。它会访谈你、并行探索代码库，并把 decision-complete 计划写入 `plans/<slug>.md`，不会触碰产品代码。

把该计划交给 `$start-work` 执行：durable Boulder state、parallel subagents、strict TDD 和五个 evidence gates。所有 checkbox 完成后，它会打印 `ORCHESTRATION COMPLETE`。

`$ulw-loop` 是最紧的循环。适合单个任务必须运行到 oracle 验证完成的情况。它不规划，只执行和验证。

### 一个典型会话

```text
$init-deep
$ulw-plan "add rate limiting to the api gateway"
$start-work plans/add-rate-limiting.md
```

如果工作很小且已经清楚，可以跳过计划，直接进入 loop：

```text
ulw fix the flaky checkout test
```

为这些命令补充专业判断的 skills 见 [能力覆盖](./skills.md)。
