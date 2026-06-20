<div align="center">
  <img src=".github/assets/lazycodex-logo.png" alt="LazyCodex" width="280">

  <h1>LazyCodex</h1>

  <p><strong>面向复杂代码库的 Codex Agent Harness。</strong><br />
  在 Codex 里提供项目记忆、规划、执行与可验证完成。</p>

  <p>
    <a href="https://github.com/code-yeongyu/lazycodex/stargazers">
      <img alt="Stars" src="https://img.shields.io/github/stars/code-yeongyu/lazycodex?style=for-the-badge&color=c69ff5&logoColor=D9E0EE&labelColor=302D41" />
    </a>
  </p>

  <p>
    <a href="#-这是什么">这是什么？</a>
    ·
    <a href="https://github.com/code-yeongyu/oh-my-openagent">OmO</a>
    ·
    <a href="https://lazycodex.ai">lazycodex.ai</a>
  </p>

  <br />
</div>

<hr />

> [!NOTE]
> **[OmO] 60K Stars：那个可怕的 token burner 已经来到 LazyCodex。**
>
> Sisyphus Labs 的 OmO 是一个对质量极其执着的 agent harness。公开故事里，它曾经深度依赖 Anthropic 模型，甚至让第三方客户端被封堵。现在同样的 OmO 质量标准可以通过 LazyCodex 用在 Codex 里。
>
> 如果你想要 OmO，但不想处理繁琐配置，从这里开始：
>
> ```bash
> npx lazycodex-ai install
> ```
>
> 背景：[OmO 60K Stars on X](https://x.com/justsisyphus/status/2060210365338939452?s=20)

## 🚀 安装

一行命令。不需要全局安装，也不需要 `npm i -g`。始终使用 `npx`：

```bash
npx lazycodex-ai install
```

这等价于 `npx --yes --package oh-my-openagent omo install --platform=codex`。如果要全自动、无 TUI 安装：

```bash
npx lazycodex-ai install --no-tui --codex-autonomous
```

### 从 Codex marketplace 安装（实验性）

上面的 npx 安装器仍然是主要路径。作为补充性的实验路径，你也可以直接在 Codex 内安装：输入 `/plugins`，打开 **Add Marketplace** 标签页（"Add a marketplace from a Git repo or local root."），填入 `https://github.com/code-yeongyu/lazycodex`，然后从 `sisyphuslabs` marketplace 安装 `omo`。也可以通过 CLI：

```bash
codex plugin marketplace add https://github.com/code-yeongyu/lazycodex
codex plugin add omo@sisyphuslabs
```

下次启动时，在 Codex 的启动审查里批准 omo hooks。hook 在批准前不会运行。第一次批准后的会话会打印：

```text
LazyCodex bootstrap running in background — restart the session when it completes
```

后台 worker 会完成配置块、agent 角色、bin links，以及供 `ast_grep` MCP 使用的固定版 `sg` 二进制。完成后重启会话。marketplace 安装路径不会修改 Codex 权限设置；自主模式仍然必须显式选择：

```bash
npx lazycodex-ai install --no-tui --codex-autonomous
```

升级使用：

```bash
codex plugin marketplace upgrade sisyphuslabs
```

下次启动审查会把 hooks 显示为 **Modified**，这是每次升级后的预期状态。重新批准后，随后的会话会在新版本上重新运行 bootstrap。如果任何项目看起来 pending 或 degraded，运行 `npx lazycodex-ai doctor` 查看原因。完整文档见：[lazycodex.ai/docs](https://lazycodex.ai/docs)。

### 验证安装

```bash
npx lazycodex-ai doctor
```

`doctor` 会输出安装健康报告：plugin cache、hooks、MCP servers、agents 和配置状态。在 Codex 里，在输入框键入 `$` 可以浏览所有已安装技能，包括 `init-deep`、`ulw-loop`、`ulw-plan`、`start-work` 等。hook 在会话中会用 `LazyCodex(<version>): ...` 状态消息报告自己。

### 卸载

```bash
npx lazycodex-ai uninstall
```

该命令会移除已安装的 plugin cache、bin links、agent roles，以及 `~/.codex/config.toml` 中由安装器管理的配置段。

## ⚡ 命令

LazyCodex 会把这些作为 Codex 的 OmO 命令安装。使用安装器展示的 `$command` 语法调用。

| 命令 | 输入方式 | 作用 |
| --- | --- | --- |
| `$ulw-loop` | `$ulw-loop "task" [--completion-promise=TEXT] [--strategy=reset\|continue]` | 自指式循环，持续运行到 Oracle 验证完成。ultrawork 模式最多 500 轮，普通模式最多 100 轮。 |
| `$ulw-plan` | `$ulw-plan "what to build"` | Prometheus 战略规划器。把计划写入 `plans/<slug>.md`，不会修改产品代码。 |
| `$start-work` | `$start-work [plan-name] [--worktree <path>]` | 执行计划直到每个 checkbox 完成。完成时打印 **ORCHESTRATION COMPLETE**。 |

完整文档见 [lazycodex.ai/docs](https://lazycodex.ai/docs)。

## 使用内置工作流

评价 LazyCodex 应该看它实际安装的能力。它是 OmO agent harness 面向 Codex 的发行层：项目记忆、规划、执行、可验证完成、skills、hooks、模型路由与 diagnostics。

### 1. `$init-deep` 创建项目记忆

`$init-deep` 会生成分层 `AGENTS.md` 上下文。它会评估复杂目录，把局部指导写到需要的位置，让后续 agent 在编辑前有地标可循。在 Codex 输入框中键入 `$init-deep` 即可；`$` 前缀是调用所有已安装技能的方式。

当仓库大到无法凭记忆解释时使用它。代码库结构变化后也应重新运行。

### 2. 三个命令支柱保持在最前面

当工作需要先做决策再实现时，使用 `$ulw-plan`。它会把计划写入 `plans/<slug>.md`，不会触碰产品代码。

当计划已经准备好时，使用 `$start-work`。它会结合持久 Boulder 进度执行 checklist，只在计划完成后停止。

当任务需要持续推进，直到结果被证据验证而不是被乐观状态文本宣称完成时，使用 `$ulw-loop`。

### 3. Skills 覆盖专业工作

命令层保持简单。skill 层为实际工作加入专业判断：

| Feature | 用途 |
| --- | --- |
| `$init-deep` | 通过 `AGENTS.md` 建立分层项目记忆 |
| `$ulw-plan` | 在改代码前做决策完整的规划 |
| `$start-work` | 带 Boulder 进度的持久计划执行 |
| `$ulw-loop` | 开放式任务的可验证完成 |
| `review-work` | 多角度实现后审查 |
| `remove-ai-slops` | 保持行为不变地清理 AI 痕迹代码 |
| `frontend-ui-ux` | 打磨 UI 表面 |
| `programming` | 严格的 TypeScript、Rust、Python 或 Go 工程纪律 |
| `LSP` | diagnostics、definitions、references、symbols 和 renames |
| `AST-grep` | 跨代码结构搜索与重写 |
| `rules` | 来自 AGENTS、rules 和 instruction files 的项目指令 |
| `comment-checker` | 对编辑类操作后的反馈 |

### 4. 子 agent 角色使用 Codex 原生 multi-agent 工具

LazyCodex 会把可选 agent roles 安装到 `~/.codex/agents/`：`explorer`、`librarian`、`plan`、`momus`、`metis` 和 `codex-ultrawork-reviewer`。通过给 Codex 的 `spawn_agent` 工具传入 `agent_type` 选择角色；子 agent 会使用该角色的模型与指令：

```jsonc
spawn_agent({"message": "TASK: map the auth flow end to end.", "agent_type": "explorer"})
```

安装器会在 `multi_agent_v2` 会话中暴露 `agent_type`（Codex 默认隐藏它）。如果你的 Codex build 的 spawn 工具没有 `agent_type` 参数，就把角色描述写进 `message`；这些 skills 会自动回退到该形式。

从 [https://lazycodex.ai](https://lazycodex.ai) 开始。

<hr />

## 💤 这是什么？

**LazyCodex** 把 [OmO (oh-my-openagent)](https://github.com/code-yeongyu/oh-my-openagent) 打包为面向复杂代码库的 Codex agent harness。

可以把它理解为：面向 Codex 的 [LazyVim](https://github.com/LazyVim/LazyVim)。

OmO 是 agent harness：discipline agents、parallel orchestration、multi-model routing、skills、hooks 和 verified completion。LazyCodex 把这套 harness 打包给 Codex 使用。

> _"LazyVim 让更多人能顺手使用 Neovim。LazyCodex 对 Codex 做同样的事。"_

鸣谢：LazyCodex 这个名字受到 [LazyVim](https://github.com/LazyVim/LazyVim) 启发。Ultragoal 和 UltraQA 的想法受到 [oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex) 启发，并为这个 Codex setup 重新实现。

## 🧩 你会得到什么

| 能力 | 说明 |
| --- | --- |
| 🤖 **纪律型 agents** | Sisyphus 编排 Hephaestus、Oracle、Librarian，一支完整 AI 开发团队 |
| 🔀 **并行执行** | 多个 agent 同时处理子任务 |
| 🎯 **多模型路由** | 按任务类别自动选择模型 |
| 🛠️ **Skills 系统** | 面向专业任务的可扩展 skill library |
| 📋 **Hooks 与生命周期** | 覆盖每个 agent 动作的 pre/post hooks |
| 🔧 **零配置** | 合理默认值，需要时再覆盖 |

## 🧠 为什么会出现不同 GPT 模型

如果一次 OmO/LazyCodex 运行中出现 `gpt-5.2` + `xhigh`、`gpt-5.4-mini`、`gpt-5.3-codex`，或 `gpt-5.5` + `xhigh` 这样的更新组合，不需要惊讶。这是设计使然。

OmO 不会盲目把最强模型花在每个子任务上。它在源码里定义任务类别和 fallback chains，让 agent 为工作选择合适模型：`quick` 会把小改动路由到 `gpt-5.4-mini`，`ultrabrain` 会把高难逻辑交给高推理 GPT 模型，可用时 agentic coding 路径会使用 Codex-tuned GPT 模型。参见 [`openai-categories.ts`](src/src/tools/delegate-task/openai-categories.ts) 和 [`model-requirements.ts`](src/packages/model-core/src/model-requirements.ts)。

目标是 quota discipline：需要深度推理时使用最强模型；足够时使用更便宜、更快的模型；并让并行 agent 工作高效，而不是把 premium quota 花在例行步骤上。这是 benchmark-driven routing，不是随机模型切换：

- [GPT-5.2](https://openai.com/index/introducing-gpt-5-2/) 被 OpenAI 描述为更擅长 code review、bug finding 和复杂工具使用；公告提到其最高 API reasoning effort 使用 `xhigh`。
- [GPT-5.3-Codex](https://developers.openai.com/api/docs/models/gpt-5.3-codex) 是 OpenAI 面向 agentic software engineering 调优的 Codex 模型，公开 coding-agent benchmarks 包括 SWE-Bench Pro、Terminal-Bench 2.0 和 OSWorld Verified，见 [GPT-5.3-Codex announcement](https://openai.com/index/introducing-gpt-5-3-codex)。
- [GPT-5.4 mini](https://openai.com/index/introducing-gpt-5-4-mini-and-nano/) 定位于高效的 everyday coding、computer use 和 subagents；因此轻量 OmO 任务会落到那里，而不是消耗 frontier reasoning model。

参考链接：

- [OpenAI GPT-5.2 announcement](https://openai.com/index/introducing-gpt-5-2/)
- [OpenAI GPT-5.2 model docs](https://platform.openai.com/docs/models/gpt-5.2/)
- [OpenAI GPT-5.3-Codex model docs](https://developers.openai.com/api/docs/models/gpt-5.3-codex)
- [OpenAI GPT-5.4 mini and nano announcement](https://openai.com/index/introducing-gpt-5-4-mini-and-nano/)
- [OpenAI latest model guide](https://platform.openai.com/docs/guides/latest-model)

## 🏗️ 架构

LazyCodex 是一层很薄的发行层。核心引擎是 [oh-my-openagent (OmO)](https://github.com/code-yeongyu/oh-my-openagent)，作为 submodule 放在 `src/` 下。

```text
lazycodex/
├── src/                     → oh-my-openagent (submodule)
├── packages/
│   └── web/                 → Next.js 15 + Tailwind v4 + opennextjs-cloudflare
│                              (通过 Cloudflare Workers 部署到 lazycodex.ai)
├── .github/workflows/       → web-ci.yml + web-deploy.yml
├── README.md
└── ...
```

LazyCodex 是 [omo.dev](https://omo.dev) 项目的一部分。**omo in Codex**，为懒人打包。

## 👷 维护者

LazyCodex 由 **Jobdori** 维护。Jobdori 是实时构建和发布 [OmO](https://github.com/code-yeongyu/oh-my-openagent) 的 AI assistant。

<div align="center">

[![Sisyphus Labs](.github/assets/sisyphuslabs.png)](https://sisyphuslabs.ai)

> **认识你自己的 Jobdori，Dori。**
> **更多信息见 [sisyphuslabs.ai](https://sisyphuslabs.ai)。**

</div>

## 📄 许可证

MIT
