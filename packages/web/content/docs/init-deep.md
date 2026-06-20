`$init-deep` 会生成分层 `AGENTS.md` 上下文，让 agent 在触碰大型仓库前先读取局部指导。每个项目运行一次；当架构变化到现有上下文不再反映现实，也要再次运行。

### 它会产出什么

- 根级 `AGENTS.md`，说明项目 stack、layout、conventions，以及优先查看的位置。
- 关键目录中的嵌套 `AGENTS.md`，让 agent 进入某个 package 时获得作用域内指导，而不是猜测。
- 指向 harness 应遵守的 project rules、skills 和 instruction files。

### 什么时候运行

- 接手一个太大或太旧、无法靠记忆说明的仓库。
- 完成一次大型重构、迁移或布局变化后。
- 当 agent 反复选错文件或忽略局部约定时。

### 如何使用

```text
$init-deep
```

该命令会遍历目录树，读取定义项目实际工作方式的文件，并写入上下文。审查生成的 `AGENTS.md` 文件，删掉陈旧内容，然后提交。后续回合中的 agent 会在编辑前读取这些上下文，因此第一次会话的成本会回报给之后每个会话。

### 初始化之后

上下文就位后，如果工作需要计划，进入 [`$ulw-plan`](./ulw-plan.md)；如果是单个可验证任务，进入 [`$ulw-loop`](./ulw-loop.md)。
