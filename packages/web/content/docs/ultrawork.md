ultrawork 是核心模式。在 prompt 任意位置加入 `ultrawork`（或短别名 `ulw`），类似加上 `ultrathink`，harness 就会切换到 maximum-precision、outcome-first、evidence-driven orchestration。Skills 会在内部激活；你不需要点名它们。

> "Plan, execute, verify, and keep the evidence attached."

原则很简单。Agent 说完成，不代表工作完成。只有**可观察证据验证**后，工作才算完成。

### 用法

只要在 prompt 中包含这个词即可。无需其他配置。

```text
ulw add authentication
```

```text
fix the flaky checkout test ultrawork
```

harness 会读取任务，选择合适 skills（programming、debugging、refactor 等），并自动运行 evidence-bound loop。除非你想显式调用，例如 `$review-work` 或 `$ulw-research`，否则不需要自己选择 skills。

### 它会强制什么

- Strict TDD：RED -> GREEN -> SURFACE -> CLEAN
- 至少 3 个真实 QA scenarios，按任务风险调整规模
- 真实 manual-QA channels（HTTP call、tmux、browser、computer use、CLI stdout、data diff）
- binding verification gate，持续循环直到工作真正完成

### 与 `$ulw-loop` 的关系

`$ulw-loop` 是 ultrawork discipline 的命令形式。最新流程会把 request、goals、success criteria 和 evidence ledger 存在 `.omo/ulw-loop` 下：

| File | Role |
| --- | --- |
| `.omo/ulw-loop/brief.md` | 原始请求和持久约束 |
| `.omo/ulw-loop/goals.json` | Goals 和 success criteria |
| `.omo/ulw-loop/ledger.jsonl` | pass、fail、block、steering、checkpoint records |

只说“done”不够。每条 success criterion 都需要从真实表面捕获的证据，并且证据必须通过，loop 才会停止。

准确语法和 flags 见 [`$ulw-loop` command docs](./ulw-loop.md)。

### 失败上限

loop 不会无限运行。最新 `$ulw-loop` workflow 使用这些 caps：

| Condition | Limit |
| --- | --- |
| 单个 goal 未完整通过时的 iteration 数 | 5 cycles |
| 同一 criterion 上的同一 failure | 3 times |

### 证据优先，而不是希望

loop 不会停在“我写了一些代码”。它会停在结果被证据确认时，也就是运行了什么检查、检查显示什么，而不是 agent 预期的状态报告。

### 在命令中的位置

`$ulw-loop` 是多个命令之一，每个命令对应不同形态的工作。

典型流程是：`$ulw-plan` 产出 decision-complete plan，`$start-work` 按 checkpoint 执行它，`$ulw-loop` 让开放式工作持续运行直到 verifier 批准。每个命令的详细语法见 [Commands](./ulw-plan.md) section。
