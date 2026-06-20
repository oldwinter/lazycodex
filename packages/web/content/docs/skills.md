LazyCodex 最适合作为复杂代码库的 harness：项目记忆、规划、执行、可验证完成、skills、hooks、model routing 和 diagnostics。

### 内置工作流

当仓库太大或历史太久，无法靠记忆解释时，从 `$init-deep` 开始。它生成分层 `AGENTS.md` 上下文，让 agent 在改代码前能找到正确文件。

当工作需要先做决策再实现，使用 `$ulw-plan`；当计划需要执行，使用 `$start-work`；当你希望 agent 持续推进到结果被验证，使用 `$ulw-loop`。

### 能力覆盖

三个命令支柱保持简单：

- `$ulw-loop` 持续推进到 verified completion
- `$ulw-plan` 把模糊工作变成 decision-complete plan
- `$start-work` 用 durable Boulder progress 执行计划

Skills 为这些支柱加入专业判断：

| Skill | 用途 |
| --- | --- |
| `review-work` | 多角度实现后审查 |
| `remove-ai-slops` | 保持行为不变地清理 AI 痕迹代码 |
| `frontend-ui-ux` | 经过设计的 UI 工作，而不是泛泛填充布局 |
| `programming` | 严格的 TypeScript、Rust、Python 或 Go 工程纪律 |
| `LSP` | diagnostics、definitions、references、symbols 和 renames |
| `AST-grep` | 跨代码结构搜索与重写 |
| `rules` | 来自 AGENTS、rules 和 instruction files 的项目指令 |
| `comment-checker` | 对编辑类操作后的反馈 |

### Skills 在哪里

OmO 可以从项目和用户位置加载 skills，例如 `.opencode/skills`、`~/.config/opencode/skills`、`.claude/skills`、`.agents/skills` 和 `~/.agents/skills`。

LazyCodex 通过以下命令安装 Codex Light setup：

```bash
npx lazycodex-ai install
```

该安装器会把 Codex marketplace plugin 注册为 `omo@sisyphuslabs`，同时保留容易记住的 public package alias。
