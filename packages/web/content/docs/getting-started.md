LazyCodex 最适合作为复杂代码库的 harness：项目记忆、规划、执行、可验证完成、skills、hooks、model routing 和 diagnostics。这一页会带你验证安装，并介绍最常用的四个命令。

### 前置条件

- 通过 Node.js/npm 安装可用的 `npx`。不需要 Bun。
- Codex App 或 [OpenAI Codex CLI](https://github.com/openai/codex)。

LazyCodex 会把 OmO commands、skills 和 hooks 接入 Codex configuration。如果 Codex 本身正常工作，App 和 CLI 的安装流程相同。

### 安装

最简单的方法：在 Codex 中打开一个新任务，把 LazyCodex GitHub 链接给它，并要求它安装。

```text
https://github.com/code-yeongyu/lazycodex

Install LazyCodex from this repository.
```

如果你更想直接运行命令：

```bash
npx lazycodex-ai install
```

安装后，重新打开 Codex，并确认 `$` 菜单中出现 OmO commands 和 skills。下一次启动会要求你在 startup review 中批准 `omo` hooks；hooks 在批准前不会运行。

如果状态显示 `pending` 或 `degraded`，先运行诊断：

```bash
npx lazycodex-ai doctor
```

### Authentication

LazyCodex 没有单独登录。installer（或运行 installer 的 agent）会处理订阅检测、模型选择和 provider auth。Codex App 或 Codex CLI 必须已经登录，但这只是前置条件，不是 LazyCodex 专属步骤。

Provider 和 routing 详情见[配置](./configuration.md)。

### 四个命令

| Command | Use it when |
| --- | --- |
| `$init-deep` | 仓库太大或太旧，不能靠记忆解释。 |
| `$ulw-plan` | 写代码前需要先做决策。 |
| `$start-work` | 已有计划，需要执行到完成。 |
| `$ulw-loop` | 你希望 agent 持续推进，直到结果被验证。 |

### 第一次运行

先用分层 `AGENTS.md` 记忆给 agent 项目上下文：

```text
$init-deep
```

然后选择匹配任务的命令。

**如果需要先规划**，这个命令会读取仓库并写出 decision-complete plan，不触碰产品代码。执行前先批准计划。

```text
$ulw-plan "add a done-toggle helper to the small task app"
```

**如果已经有计划**，执行它。所有 checkboxes 必须完成后才会停止。

```text
$start-work
```

**如果需要端到端验证完成**，loop 会持续推进，直到证据证明结果。

```text
$ulw-loop "fix the payment flow failure and verify end to end"
```

### 如何选择

每个仓库先运行一次 `$init-deep`，让 agents 拥有可依赖的分层 `AGENTS.md` 上下文。

任何模糊任务，先运行 `$ulw-plan`。它会访谈你、并行探索代码库，并把 decision-complete plan 写入 `plans/<slug>.md`，不触碰产品代码。

把计划交给 `$start-work` 执行：durable Boulder state、parallel subagents、strict TDD 和五个 evidence gates。每个 checkbox 完成后，它会打印 `ORCHESTRATION COMPLETE`。

`$ulw-loop` 是最紧的循环，用于必须运行到 oracle 验证完成的单个任务。它不做规划，而是执行和验证。

### 一个典型会话

```text
$init-deep
$ulw-plan "add rate limiting to the api gateway"
$start-work plans/add-rate-limiting.md
```

如果任务很小且理解充分，可以跳过 plan，直接 loop：

```text
ulw fix the flaky checkout test
```

围绕这些命令提供 specialist judgment 的 skills，见[能力覆盖](./skills.md)。
