多模型路由会把运行中的不同部分交给最适合的模型，而不是所有事情都压在一个模型上。LazyCodex 会把 OmO 的 routing defaults 安装进 Codex，让严肃仓库不被单一 context window 或价格点卡住。

### 当前基线

`4.12.1` bundled `model-catalog.json` 的默认 profile 以 `gpt-5.5` 为中心：

| Profile | Model | Reasoning |
| --- | --- | --- |
| Default | `gpt-5.5` | `high` |
| Plan mode | `gpt-5.5` | `xhigh` |
| Worker | `gpt-5.5` | `high` |
| Verifier | `gpt-5.5` | `high` |

随着 Codex 和 OpenAI 更新模型阵容，你实际看到的模型名可能不同。本文档关注 LazyCodex *如何* 使用 model profiles，而不是比较具体模型。

### 什么会被路由

- **Planning and exploration** 会交给强 reasoning model，用于承载大上下文和权衡 trade-offs。
- **Implementation turns** 会交给快速且能写代码的模型，承担大部分编辑循环。
- **Verification** 会交给用作 oracle 的模型，选择重点是判断力而非吞吐。
- **Specialist skills** 在受益于特定 profile 时，可以指向自己的模型。

### 为什么需要 role profiles

Role-based profiles 会按工作性质分离：

- 普通任务使用默认模型设置。
- Plan mode 可能需要更强 reasoning。
- Worker 和 verifier 分开，方便从不同角度检查同一结果。

这会和 [Agent Roles](./discipline-agents.md) 配合。即使多个 roles 并行推进，每个 role 的 model profile 也会记录在 Codex configuration 中。

### 它如何适配 harness

Routing 是 `npx lazycodex-ai install` 接入 Codex 的 harness setup 一部分。它会检测可用订阅和 provider auth，再把 roles 映射到 models，这样你不需要逐个手工配置。

### Provider 认证

Auth 目标是 Codex 本身，不是 LazyCodex。Codex 登录后，installer 的 subscription detection 和 provider routing 会接管。如果让 LLM agent 运行安装，它会为你走同样的检测和选择流程。

### 用户注意事项

- 安装后看到的模型名可能和文档列出的不同。已安装的 `model-catalog.json` 和你的 Codex build 支持的模型优先。
- Model settings 会平衡质量和速度。随意降低会同时影响 planning、review 和 QA 质量。
- 不确定时，先检查 install state 和 Codex config。

### 自定义

Routing 和 provider settings 位于配置中。哪个 role 使用哪个模型，以及如何按项目覆盖默认值，见[配置](./configuration.md)。
