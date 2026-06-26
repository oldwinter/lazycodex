Hooks 和 lifecycle 是 harness 让长任务无需你每轮重新提示也能继续推进的方式。OmO 会把 lifecycle hooks 安装进 Codex，用来观察每个 turn 并决定下一步。

### 触发矩阵

| Event | What fires |
| --- | --- |
| `SessionStart` | Project rules loading、telemetry、auto-update check、bootstrap provisioning、CodeGraph bootstrap。 |
| `UserPromptSubmit` | Project rules re-injection、ultrawork trigger detection、`$ulw-loop` steering。 |
| `PreToolUse` | Bash calls 的 Git Bash MCP guidance、goal creation 上的 `$ulw-loop` goal budget protection。 |
| `PostToolUse` | Comment checker、LSP diagnostics、CodeGraph init guidance、`apply_patch` rule matching、thread title hygiene。 |
| `Stop` / `SubagentStop` | `$start-work` continuation、LazyCodex executor evidence verification。 |
| `PostCompact` | Git Bash notification、project rules 和 LSP diagnostics cache resets。 |

### 核心机制

当一个 turn 结束时，Stop-hook 会触发。如果 plan 仍在进行，hook 会自动重新注入下一轮，agent 从 durable progress state 继续，而不是等你说“continue”。只有当 plan 完成，或某个 gate 以需要人工介入的方式失败时，运行才会停止。

### 进度在哪里

进度状态写入 `.omo/boulder.json`，并跨 turns 和 sessions 保留。这让 [`$start-work`](./start-work.md) 能在重启后恢复计划，也让 [`$ulw-loop`](./ulw-loop.md) 对真实进度保持诚实。

### 批准与信任

Hooks 在批准前绝不会运行。安装后的首次启动，Codex startup review 会要求你批准 omo hooks。每次升级后 hooks 会显示为 **Modified**，这是预期行为，因为 plugin 文件变了，之前的 trust hashes 不再匹配；重新批准后，下一个 session 会在新版本上重新运行 bootstrap。

### 证据门禁

执行期间，lifecycle 会在步骤关闭前强制五个 evidence gates：plan reread、automated verification、manual-QA、adversarial QA 和 cleanup。无法通过门禁的步骤不会前进，不管状态文本声称什么。

### 已安装组件

上面的 hooks 是进入以下 installed components 的轻量入口：

| Component | Responsibility |
| --- | --- |
| `rules` | Session start、prompt submit、`apply_patch` 和 post-compact 阶段的 project rules。 |
| `bootstrap` | LazyCodex install state 和 provisioning checks。 |
| `telemetry` | Session start recording。 |
| `comment-checker` | Edit-like tool calls 后的 comment feedback。 |
| `lsp` | Edit-like tool calls 后的 language-server diagnostics，以及 compact 后的 cache reset。 |
| `ultrawork` | Prompt submit 阶段的 ultrawork trigger detection。 |
| `ulw-loop` | Loop steering 和 goal budget protection。 |
| `start-work-continuation` | `$start-work` execution continuation。 |
| `git-bash` | Bash calls 和 post-compact 阶段的 Git Bash MCP guidance。 |
| `codegraph` | CodeGraph bootstrap 和 init guidance。 |
| `teammode` | Thread title hygiene checks。 |
| `lazycodex-executor-verify` | Sub-agent evidence verification。 |

### 继续阅读

- [ultrawork mode](./ultrawork.md)：把这些 gates 变成 binding loop 的模式。
- [配置](./configuration.md)：如何调整 hook behavior 和 lifecycle defaults。
