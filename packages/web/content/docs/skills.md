Skills 是 LazyCodex 加在 command pillars 之上的 specialist playbooks。当任务匹配某个领域时，它们会自动激活，你不需要学习或记住全部 skill。在 prompt 中包含 `ultrawork`（或短别名 `ulw`），harness 会在内部选择正确 skills。

如果想显式调用某个 skill，把名称写进 prompt，例如 `$review-work`、`$remove-ai-slops`、`$ulw-research`。

### Commands

核心命令保持简单：

- `$init-deep`：项目记忆
- `$ulw-plan`：编码前产出 decision-complete planning
- `$start-work`：用 durable Boulder progress 执行计划
- `$ulw-loop`：证据约束的 loop，直到验证完成

Skills 会围绕这些 pillars 增加 specialist judgment。下面说明每个 skill 以及通常如何使用。

### Skill index

大多数 skills 会在请求匹配其领域时自动激活，所以使用 LazyCodex 前不需要学习或手动选择每个 skill。想显式调用时，把 skill 名称写进 prompt，例如 `$visual-qa`、`$git-master` 或 `$ulw-research`。

| Skill | Use it for |
| --- | --- |
| `init-deep` | 面向大型或老旧仓库的分层 `AGENTS.md` 上下文 |
| `ulw-plan` | 编码前的 explore-first planning |
| `ulw-loop` | 证据约束的 loop，直到验证完成 |
| `start-work` | 用 durable Boulder progress 执行计划 |
| `review-work` | 五路并行 post-implementation review |
| `remove-ai-slops` | 保持行为不变，清理看起来像 AI 生成的代码 |
| `frontend` | 有设计判断的 UI 工作，而不是通用 layout 填充 |
| `programming` | 严格 TypeScript、Rust、Python 或 Go discipline，TDD-first |
| `git-master` | 原子 commits、rebase/squash、push safety、history investigation |
| `visual-qa` | Screenshot/TUI diff 加双 oracle visual QA |
| `debugging` | 证据驱动的 root-cause investigation |
| `refactor` | 保持行为不变地重构现有代码 |
| `ulw-research` | 代码库、web、官方文档和 OSS repo swarms 的 maximum-saturation research |
| `LSP` | Diagnostics、definitions、references、symbols 和 renames |
| `lsp-setup` | 为项目配置 language servers |
| `AST-grep` | 跨代码的 structural search 与 rewrite |
| `rules` | 来自 AGENTS、rules 和 instruction files 的项目指令 |
| `comment-checker` | Edit-like operations 后的反馈 |

### Skill highlights

---

### review-work

五路并行 post-implementation review。

完成有分量的工作后，`review-work` 会并行启动五个 sub-agents，每个覆盖不同角度：目标/约束验证、动手 QA execution、代码质量、安全性，以及从 git history 和 issues 挖掘上下文。五路都通过，review 才通过。任何一路失败，review 就失败。

**何时激活：** 完成任何有意义的实现后，特别是改动触及 3+ files 或运行 20+ 分钟时。

**示例：** 完成 PR 后，用户说：

```text
review my work
```

harness 会在独立 threads 中 spawn 五个并行 reviewers，每个带一个聚焦 lens。只有每一路都同意时，最终 verdict 才是 PASS。

---

### remove-ai-slops

保持行为不变地清理 AI-generated code smells。

安全不变量：删除任何一行之前，先用 regression tests 锁定行为。覆盖明显注释、过度防御代码、不必要抽象、死代码、重复和过大的模块（250+ pure LOC 会触发完整模块化重构）。Workers 按每批五个并行运行，任何 test failure 都立即 revert。

**何时激活：** 当要求 cleanup、deslop 或移除 AI-generated patterns 时。

**示例：** 结合 `refactor` 和 `programming` 做完整 cleanup pass：

```text
ulw plan and manual qa, no behaviour changes, no regressions
/refactor /remove-ai-slops through /programming
```

harness 会先规划 cleanup，用 tests 锁定行为，然后按 slop category 并行派发 workers，从安全到危险依次处理。

---

### frontend

UI、UX、design、performance、accessibility 和 visual QA 的统一 router。

它不是单个 rule file，而是 router。它会根据任务读取 design、perfection 和 ui-ux-db references，然后构建并在真实浏览器中验证。覆盖 UI implementation、styling、layout、animation、Lighthouse 100、Core Web Vitals、accessibility、SEO，以及 `react-scan`、`react-doctor` 等 React dev tools。

**何时激活：** 任何涉及 UI、styling、layout、animation、design 或 performance auditing 的任务。

**示例：**

```text
redesign the sidebar with better spacing and hit Lighthouse 100
```

skill 会路由到正确 design references，构建时匹配现有 design system，然后运行真实 Playwright Chromium Lighthouse audit。不会用 Lighthouse CLI，也不会通过削弱 UX 过关。

---

### programming

跨四种语言的一套哲学：strict types、modern stacks、TDD。

适用于每个 `.py`、`.pyi`、`.rs`、`.ts`、`.tsx`、`.mts`、`.cts`、`.go` 文件。skill 会按语言 gate，加载匹配 reference set，并强制：parse-don't-validate at boundaries、exhaustive variant matching、typed errors、无 escape hatches（`any`、`unwrap`、`@ts-ignore`）、每文件 250 pure LOC ceiling，以及 mandatory TDD（RED -> GREEN -> REFACTOR）。

**何时激活：** 自动在任何受支持语言的代码文件编辑时激活。

**示例：** skill 始终开启。编辑 TypeScript 时，它加载 TypeScript reference（Bun + Biome + strict tsconfig），强制 branded types 和 discriminated unions，并运行 post-write review loop：测量 pure LOC、自审七个问题，超过 250 LOC 就重构。

---

### debugging

跨任何语言或 binary 的 hypothesis-driven runtime debugging。

关于 bug 为什么发生的每个 claim，都必须来自观察到的 runtime state，而不是只读代码。skill 运行分阶段循环：setup and journal、形成 3+ 个正交 hypotheses、并行调查、两轮失败后升级给 independent verifiers、通过 toggling 确认 root cause、用 failing test 锁定、最小修复、在真实表面 QA，最后清理所有 debug artifacts。

**何时激活：** crashes、silent failures、wrong responses、stuck processes、memory leaks、async misbehavior 或 reverse engineering。

**示例：**

```text
debug this — the API returns 200 but the body is empty
```

skill 会启动并行 investigation lanes，接入真实 debuggers（pdb、node inspect、lldb、dlv），并且不会在 root cause 通过 toggling 确认、failing test 变 GREEN 前关闭 bug。

---

### refactor

Codemap-aware、由 LSP 和 AST-grep 支撑的 restructuring。

触碰任何内容前先映射代码库，评估 test coverage 以确定 verification strategy，用 rollback points 规划 atomic steps，然后用 LSP renames 和 AST-grep structural rewrites 执行。执行期间任何 test failure 都会立即停止并 revert。

**何时激活：** 请求 refactor、restructure、extract、simplify 或 modernize code 时。

**示例：**

```text
refactor the validation logic into its own module --scope=module
```

skill 会建立目标 dependency graph，运行 characterization tests 固定当前行为，然后逐步执行 restructuring，每步后验证。

---

### visual-qa

Screenshot 和 TUI diff，加双 oracle visual QA。

它会捕获 reference 和 actual evidence：web UIs 用 screenshots，terminal UIs 用 `tmux capture-pane`，再运行 bundled pixel-diff 或 column-width script。两个并行只读 oracle passes 会评估：一个关注 design-system and functional integrity，另一个关注 visual fidelity and CJK text precision。最终 verdict 是单一好/坏评分。

**何时激活：** 构建或修改任何 UI 之后，或要求验证 visual correctness 时。

---

### git-master

Atomic commits、rebase/squash、push safety、history investigation。

处理 commit message style detection、semantic grouping、fixup autosquash、blame、bisect、`log -S`，以及“谁写的”“何时加入的”这类问题。

**何时激活：** 任何 git 操作，包括 committing、rebasing、squashing、history search。

---

### ulw-research

Maximum-saturation research mode（原 `ultraresearch`）。

在代码库、web、官方文档和 OSS repositories 上编排并行 explore 和 librarian swarms。运行由 workers 返回的 leads 驱动的 recursive EXPAND loop，通过运行代码经验性验证 findings，并生成带引用的综合结论和可选 reports。

**何时激活：** 只在显式要求时：出现 `ulw-research`、legacy alias `ultraresearch`，或要求 deep research / ultra-precise investigation。

**示例：**

```text
ulw-research the typeclaw architecture — map every module and find the official docs
```

skill 会在 GitHub、官方文档和 web sources 上扇出 10+ 个并行 search lanes，递归扩展有价值 leads，然后综合成带引用 report。

---

### LSP

Language-server diagnostics、definitions、references、symbols 和 safe renames。

通过 MCP tool calls 给 agent 提供 language-server precision。每次编辑后运行 diagnostics，在 workspace 中查找 definitions 和 references，并通过 language server 自己的 workspace edit 做 safe renames，而不是 text find-and-replace。

**何时激活：** edit-like tool calls 后自动 diagnostics，也可按需用于导航和 renames。

---

### AST-grep

跨 25 种语言的 structural search 和 rewrite。

按语法形状而不是文本查找代码，例如匹配某种形状的每个 function call、某种形状的每个 import。rewrites 是确定性的，并且应用前总会用 `dryRun=true` 预览。可与 `refactor` skill 配合做安全的大规模 codemods。

**何时激活：** structural code matching、pattern-based search 或 deterministic rewrites（移除 `as any`、把 `require()` 迁移到 `import`、查找 empty catch blocks）。

---

### lsp-setup

Language-server 安装和 workspace wiring。

当项目还没有可靠 diagnostics、definitions、references 和 safe renames 时，配置 language servers。它会检测语言栈，安装或指向正确 server，并验证 LSP calls 可用，再让更高层 coding 或 refactor skills 依赖它。

**何时激活：** diagnostics 缺失、definitions 无法解析，或项目在 refactor/programming task 前需要 LSP support。

---

### rules

来自 repository 和用户 rule files 的 project instruction injection。

自动从 `AGENTS.md`、`CONTEXT.md`、`.omo/rules/`、`.claude/rules/`、`.github/instructions/` 和 `.github/copilot-instructions.md` 等来源加载 project instructions。没有需要运行的命令；plugin 启用时，harness 会把这些 rules 当作 active context。

**何时激活：** session start 和 prompt submission 阶段，让 agents 在规划或编辑前继承项目约束。

---

### comment-checker

Edit-like operations 后的即时反馈。

代码改动后，`comment-checker` 会检查编辑行附近的注释。如果发现 comment drift，即注释不再匹配下面的代码，agent 必须先修复或说明原因再继续。它会在 stale comments 被引入的当下捕捉，而不是等到后续 review。

**何时激活：** plugin 启用 guardrail 后，在 write、edit、patch 或其他 edit-like tool calls 之后激活。

---

### Skills 在哪里

LazyCodex 会把 skills 作为 OmO plugin 的一部分安装。OmO 也可以从项目和用户位置加载 skills，例如 `.codex/skills`、`~/.codex/skills`、`.opencode/skills`、`~/.config/opencode/skills`、`.claude/skills`、`.agents/skills` 和 `~/.agents/skills`。

LazyCodex 安装 Codex Light setup：

```bash
npx lazycodex-ai install
```

installer 会把 Codex marketplace plugin 作为 `omo@sisyphuslabs` 接入，同时保留易记的 public package alias。

每个 skill 都带有深层 internal references，包括详细 playbooks、语言特定 recipes 和分阶段 instructions，但这些不是你需要阅读的内容。skill 激活时，harness 会替你读取。

Command pillars 和背后的 disciplines 有更详细的页面：[ulw-plan](./ulw-plan.md)、[ulw-loop](./ulw-loop.md)、[start-work](./start-work.md)、[TDD](./tdd.md)、[manual QA](./manual-qa.md) 和 [git workflow](./git-workflow.md)。
