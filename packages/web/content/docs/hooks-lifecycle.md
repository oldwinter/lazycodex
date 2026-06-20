Hooks and lifecycle 让 harness 可以在不需要你每回合重新提示的情况下持续推进长任务。OmO 会向 Codex 安装 lifecycle hooks，观察每个回合并决定下一步。

### 核心机制

Stop-hook 会在一个回合结束时触发。如果计划仍在进行，hook 会自动重新注入下一轮，让 agent 从持久进度状态继续，而不是等待你说 "continue"。只有计划完成，或某个 gate 以需要人工介入的方式失败，运行才会停止。

### 进度在哪里

进度状态写入 `.omo/boulder.json`，可以跨回合、跨会话保存。这让 [`$start-work`](./start-work.md) 能在重启后恢复计划，也让 [`$ulw-loop`](./ulw-loop.md) 对实际推进距离保持诚实。

### 批准与信任

Hooks 在批准前绝不会运行。安装后第一次启动时，Codex 的 startup review 会要求你批准 omo hooks。每次升级后 hooks 会显示为 **Modified**，这是预期行为，因为 plugin 文件变了、旧 trust hashes 不再匹配。重新批准后，下一个会话会在新版本上重新运行 bootstrap。

### 证据门禁

执行期间，lifecycle 会在 step 关闭前强制执行五个 evidence gates：plan reread、automated verification、manual-QA、adversarial QA 和 cleanup。无论状态文本声称什么，一个不能通过 gates 的 step 都不会前进。

### 继续阅读

- [ultrawork 模式](./ultrawork.md) — 把这些 gates 变成强约束循环的模式。
- [配置](./configuration.md) — 如何调整 hook 行为和 lifecycle defaults。
