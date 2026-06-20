`$ulw-loop` 是自指式开发循环，会一直运行到 verified completion。

### 工作方式

agent 会持续工作，并在它认为任务完成时输出 `<promise>DONE</promise>`，但这**不会**结束循环。必须先由 Oracle 验证结果。只有系统确认 Oracle verified 后，循环才会结束。如果验证失败，它会继续，并附带消息："Oracle verification failed. Continuing ULTRAWORK loop."

### 语法

```bash
$ulw-loop "task description" [--completion-promise=TEXT] [--strategy=reset|continue]
```

### 限制

迭代上限在 ultrawork 模式下是 500，普通模式下是 100。
