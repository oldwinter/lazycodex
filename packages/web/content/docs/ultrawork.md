ultrawork 是主打模式。在 prompt 任意位置输入 `ultrawork`（或短别名 `ulw`），即可激活最高精度、结果优先、证据驱动的 orchestration。

> "Plan, execute, verify, and keep the evidence attached."

### 用法

```bash
ulw add authentication
```

### 它会强制什么

- Strict TDD：RED -> GREEN -> SURFACE -> CLEAN
- 至少 3 个现实 QA scenarios
- 真实 manual-QA channels（HTTP call、tmux、browser）
- 绑定 verification gate，持续循环直到工作真正完成
