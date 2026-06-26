手动 QA 是把“它应该能工作”变成“它确实能工作，这是证据”的门禁。步骤不会因为状态字符串而关闭；它需要来自真实表面的捕获 artifact，再加上 adversarial pass 和 cleanup receipt。两个 skill 承担这件事：`visual-qa` 负责 UI 表面，`review-work` 负责整体实现 review。

### visual-qa

对于你构建或修改的任何 UI，无论是网页还是 TUI，visual QA 都会运行三个阶段。首先用内置 diff 脚本捕获客观参考证据：截图用 `image-diff`（similarity score、hotspots、`alphaChannelIntact`），终端捕获用 `tui-check`（`maxWidth`、`overflowLines`、`borderMisaligned`、宽字符列）。这些 JSON 是参考证据，不是最终判定。

然后并行派发两个只读 oracle subagents：

- **Pass A - design-system and functional integrity.** 更深、更严格的一轮。证明界面是真正由一致 token 和复用 primitives 驱动的 design-system 实现，而不是只用于 mock 的屏幕，也不是把位图贴出来伪装成 live elements。它会检查 alpha、响应式以及用户期望功能是否真的可用。
- **Pass B - visual fidelity and CJK precision.** 更聚焦的一轮。直接打开截图，并检查源码/内容是否存在裁剪、baseline 下沉、字形破损，以及韩文/日文/中文精度问题。

harness 会把两轮结果综合成一个带定位 findings 的 `PASS | REVISE | FAIL` verdict。

### review-work

完成有分量的实现后，`review-work` 会启动五个并行后台 subagents。五个都通过，review 才通过；任何一个失败，整体 review 就失败。

| Lane | Role | Asks |
| --- | --- | --- |
| 1 | Goal Verifier | Did we build what was asked? |
| 2 | QA Executor | Does it actually work? |
| 3 | Code Reviewer | Is the code well-written? |
| 4 | Security Auditor | Is it secure? |
| 5 | Context Miner | Did we miss any context? |

Oracle lanes 会在 prompt 中收到 diff 和完整文件内容（它们不能自行读文件）。崩溃、`BLOCKED:` 或结论不明的一路永远不算通过；它会以更小范围重启，如果重试预算耗尽，就保持 `INCONCLUSIVE`，同时仍输出聚合结果。

### Adversarial classes 与 cleanup

在 [`$start-work`](./start-work.md) 内，每个 checkbox 都会探测所有适用的 adversarial class，并为每项记录可观察结果；跳过的 class 需要在 ledger 里给出一行不适用原因。每个 QA 资源，包括 scripts、tmux assets、browser sessions、PIDs、ports、containers、temp dirs，都会登记成自己的 teardown todo，并以捕获 receipt 执行。不会留下仍在运行的 QA asset。

### 继续阅读

- [TDD](./tdd.md)：手动 QA 之前的自动化验证门禁。
- [ulw-loop](./ulw-loop.md)：完成条件依赖此门禁的循环。
