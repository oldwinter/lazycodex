这里回答常见卡点。正在安装时先看**安装与环境**；不知道选哪个命令时看**第一次使用**；运行中感觉不对时看**执行与验证**；碰到阻塞时看**冲突与限制**。

### 安装与环境

**LazyCodex 是什么？**
面向 Codex 的 OmO 轻量移植版。它把 commands、skills、hooks 和 model routing 叠加到 Codex 上，让 agent 在编辑前先计划，在声称完成前先验证，并跨会话保留项目上下文。

**LazyCodex 会替代 OmO 吗？**
不会。它是一个聚焦子集。完整 OmO 有更深的 orchestration。LazyCodex 只取在 Codex 内效果好的部分，并打包成可重复安装。

**可以让 Codex 替我安装吗？**
可以。打开 Codex，把 LazyCodex GitHub 链接或 `lazycodex.ai` 给它，然后让它安装。你也可以自己运行 `npx lazycodex-ai install`。

**Codex App 和 Codex CLI 的安装有区别吗？**
流程相同。LazyCodex 会安装到 Codex 环境中。你喜欢 App 或 CLI 哪个表面，就用哪个。

**需要 Bun 吗？**
不需要。除非你从源码构建 LazyCodex，否则 Bun 不是必需品。安装和使用都通过普通 Node.js/npm 的 `npx` 完成。

**Windows 能用吗？**
可以。npx installer 和 Codex marketplace 路径都原生支持 Windows。缺少 Node.js 和 Git Bash 时，installer 会自动 provision；shell hooks 会通过 Git Bash 运行。如果你已经安装了 Node.js 和 Git for Windows，通常开箱即用。环境变量覆盖和 bootstrap 日志见[安装中的 Windows 小节](./installation.md)。

### 第一次使用

**LazyCodex 最适合什么任务？**
适合规划和验证很重要的大型、长时间工作。小问题或一行修复可以直接用 Codex，不必上 harness。

**使用前需要学完所有 skill 吗？**
不需要。任务匹配领域时，skills 会自动激活。先学四个命令；碰到具体需要时再深入单个 skill。

**应该先学哪些命令？**
`$init-deep` 用于项目记忆，`$ulw-plan` 用于规划，`$start-work` 用于执行计划，`$ulw-loop` 用于需要验证完成的开放式任务。

**怎么知道安装成功？**
打开 Codex，在输入框里键入 `$`，应该能看到 OmO commands 和 skills。CLI 中输入 `ulw` 应该会激活 ultrawork mode。第一个实际命令通常是 `$init-deep`。

**安装后 `$` 菜单没有任何命令。**
打开新的 Codex session 重新加载 plugin，然后检查 startup review 里是否有待批准的 `omo` hook。如果仍不显示，运行 `npx lazycodex-ai doctor` 检查安装和 skill loading 状态。

### 执行与验证

**`npx lazycodex-ai doctor` 真能用吗？**
能。它运行 OmO doctor flow，并报告已配置什么、缺失什么以及原因。任何地方看起来不对时，都先用它。

**为什么要我批准 hooks？**
Codex 会在启动时 review hooks。`omo` hooks 只有在你批准后才会运行。每次升级后 hooks 会显示为 **Modified**，因为 plugin 文件变了；重新批准即可使用新版本。

**升级后要检查什么？**
如果 hooks 显示 Modified，重新批准。任何状态显示 pending 或 degraded 时，运行 `npx lazycodex-ai doctor` 看完整诊断。

**`$ulw-loop` 总是太快结束，怎么办？**
仅靠迭代不能修复模糊的完成标准。明确说明你希望收集什么、必须通过哪些验证、缺数据时 agent 应该调查什么。也可以先运行 `$ulw-plan` 固定范围。

**需要更大的 token budget 吗？**
LazyCodex 不是省 token 工具。它会把足够好的模型和足够多的 tokens 用在规划、执行和验证上。大型任务应拆成更小单元，避免单个 thread 过重。

**怎么选择 thinking/reasoning level？**
不用想太多。避免 `low`；日常工作用 `medium`；失败代价高或 review 很重要时用 `high`；`xhigh` 留给真正重的任务。

**LazyCodex 能做 computer-use 吗？**
如果 Codex session 连接了 computer-use 工具，就可以。LazyCodex 自身不提供这些工具；它会在 workflows 中指导 agent 使用它们，并在工具可用时施加更强验证。

### 冲突与限制

**可以桌面使用，然后在移动端/远程继续吗？**
LazyCodex 安装进 Codex，所以 Codex 可用的地方它就可用。Codex App 的桌面/移动端远程流程很适合搭配使用。某些功能可能只有桌面 app 完整可用。

**Team mode 显示了，但创建 thread 失败。**
把 LazyCodex 和 Codex 都更新到最新版，然后运行 `npx lazycodex-ai doctor`。Team mode 依赖 Codex desktop app 功能，App 与 CLI 之间可能存在差异。

**可以把 OMX 和 LazyCodex 一起用吗？**
不推荐。两者一起运行可能产生冲突，浪费 tokens 并静默失败。如果 installer 警告冲突，移除其中一个。LazyCodex 设计成 Codex 之上的唯一轻量层。
