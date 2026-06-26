LazyCodex 是 [OmO](https://github.com/code-yeongyu/oh-my-openagent) 之上的轻量分发层。installer 写入 Codex 的配置控制 model routing、hooks、skills，以及 harness 使用的 agent roles。

### 默认零配置

LazyCodex 带着合理默认值，安装后即可使用。只有当默认值不适合你的仓库时，才需要触碰配置。无需预先创建配置文件，安装后直接开始工作即可。

```bash
npx lazycodex-ai install
```

不要全局安装，始终使用 `npx`。这相当于 `npx --yes --package oh-my-openagent omo install --platform=codex` 的简写。

### Codex target

LazyCodex 始终以 Codex 为目标。`--platform=codex` 参数已经内置在 `lazycodex-ai` bin 的 `install` 路径中，因此 harness 会连接 [OpenAI Codex CLI](https://github.com/openai/codex)，而不是其他平台。你不需要自己传 `--platform`。

**前置条件：**

- [Node.js](https://nodejs.org)：任一维护中的 LTS；`npx` 随 Node/npm 提供。不需要 Bun。
- 已登录的 [OpenAI Codex CLI](https://github.com/openai/codex) 或 Codex App。

### 配置在哪里

- installer 连接和写入的 Codex configuration。
- 项目级 `AGENTS.md` 与 rule files，用来按仓库塑造 agent 行为。
- 用户级 skill locations，例如 `~/.config/opencode/skills` 和 `~/.agents/skills`。

### Install flags

默认 installer 是交互式 TUI。它会检测订阅，帮助选择模型，并引导 provider auth。

```bash
npx lazycodex-ai install
```

如果需要完全自主、无 prompt 的安装，两个 flag 要一起加：

```bash
npx lazycodex-ai install --no-tui --codex-autonomous
```

`--no-tui --codex-autonomous` 会透传给 `omo install`，`lazycodex-ai` bin 自身不解释它们。强烈建议让 LLM agent 运行安装：agent 会自动处理订阅检测、模型选择和 provider auth。

### 可以调整什么

- **Model routing**：规划、实现、验证和 specialist skills 分别使用哪个模型。installer 会根据检测到的订阅设置合理默认值；项目需要不同 profile 时可按 role 覆盖。
- **Hooks and lifecycle**：Stop-hook 是否自动继续 plan、iteration caps（ultrawork mode 为 500，normal mode 为 100），以及完成如何 gated。
- **Skills**：哪些 skills active，以及从哪里加载。
- **Agent**：Hephaestus autonomous deep worker，以及它的 model/prompt overrides。Codex package 是只包含 Hephaestus 的轻量移植版；不包含完整 OmO 的 Sisyphus orchestrator。

### Hooks 与生命周期

Hooks 在批准前绝不会运行。安装后的首次启动，Codex startup review 会要求你批准 `omo` hooks。每次升级后 hooks 会显示为 **Modified**，这是预期行为，因为 plugin 文件变了，之前的 trust hashes 不再匹配。重新批准后，下一个 session 会运行新版本 bootstrap。

### Provider 与模型设置

Provider 和 model settings 由 OmO 管理，不由 LazyCodex 直接管理。安装期间，OmO 会读取 Codex configuration 和 bundled `model-catalog.json` 来对齐 model profiles，这就是 model routing layer。

- installer 会替你连接 provider auth。推荐让 agent 运行安装。
- Provider keys 从环境读取。所有 `*_API_KEY` 和 OAuth credentials 都是 secrets，绝不要记录到日志或提交到仓库。
- 安装之外更深的 provider/model tuning 遵循 OmO 约定。provider environment variables 和 model resolution rules 见 OmO 文档。

> 不要编造 provider keys。按所选 provider 的文档通过环境提供 key，并让 installer 的 routing 解释它。

### 诊断配置

如果状态看起来 pending 或 degraded，运行：

```bash
npx lazycodex-ai doctor
```

它会说明哪里配置错误、原因是什么，并指出需要修复的具体字段。它会检查 plugin cache、hooks、MCP servers、agent roles 和 Codex config state。

### 重新运行安装

installer 是幂等的。重新运行 `npx lazycodex-ai install` 会在现有内容上重写 config blocks、agent roles 和 bin links，因此手工编辑配置后也可以安全重跑。

installer 暴露的所有命令见 [CLI reference](./cli.md)。
