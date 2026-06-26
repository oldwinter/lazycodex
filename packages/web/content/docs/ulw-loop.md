`$ulw-loop` 是一个自指开发循环，会把工作拆成系统化、证据约束的步骤，并持续运行直到验证完成。

### 工作方式

agent 会持续工作，并在它认为任务完成时输出 `<promise>DONE</promise>`，但这**不会**结束 loop。必须由 Oracle 先验证结果。只有系统确认 Oracle 已验证通过后，loop 才结束。如果验证失败，它会继续，并给出消息："Oracle verification failed. Continuing ULTRAWORK loop."

每个步骤都有自己的证据：真实 artifact，而不是 dry-run claim。进度会 checkpoint，因此长任务即使重启，也不会丢失已经证明过的内容。

### Bootstrap

首次运行前，loop 会读取完整 workflow reference（Bootstrap tier triage、Execution Loop 和 Manual-QA channels table），确保后续每个阶段按同一方式执行。它只读取当前阶段需要的 sections。

### Manual-QA channels

步骤不会因为状态字符串而关闭。它需要来自真实表面的捕获 artifact，例如 HTTP call、tmux session 或 browser，再加上 adversarial pass 和 cleanup receipt。见 [manual QA](./manual-qa.md)。

### 语法

```bash
$ulw-loop "task description" [--completion-promise=TEXT] [--strategy=reset|continue]
```

### 限制

iteration cap 在 ultrawork mode 下是 500，在 normal mode 下是 100。

### 继续阅读

- [ultrawork mode](./ultrawork.md)：把 loop 变成 binding verified run 的模式。
- [Hooks 与生命周期](./hooks-lifecycle.md)：Stop-hook 如何重新注入下一轮。
