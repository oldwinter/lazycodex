`$start-work` 会执行 Prometheus work plan，直到每个 top-level checkbox 都完成。

### 工作方式

- `.omo/boulder.json` 中的 durable Boulder state 可跨回合和会话保存
- Stop-hook 会重新注入下一轮，直到计划完成
- 独立 sub-tasks 会扇出到并行 subagents
- Strict TDD 加五个 evidence gates：plan reread、automated verification、manual-QA、adversarial QA、cleanup
- 进度会记录到 ledger

### 语法

```bash
$start-work [plan-name] [--worktree <absolute-path>]
```

### 完成

当每个 checkbox 都被勾选后，它会打印 `ORCHESTRATION COMPLETE` block。
