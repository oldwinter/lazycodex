// AUTO-GENERATED — do not edit. Run: node ./scripts/generate-docs-content.mjs
export const DOC_SOURCES: Record<string, string> = {
  "installation.md": "<p>一个命令就能把 OmO agent harness 安装到 Codex，不需要全局安装 package。</p>\n<h3 id=\"前置条件\">前置条件</h3>\n<ul>\n<li><a href=\"https://nodejs.org\">Node.js</a>：任一维护中的 LTS；<code>npx</code> 随 Node/npm 提供。<strong>不需要</strong> Bun，installer 在普通 Node 上运行。</li>\n<li><a href=\"https://github.com/openai/codex\">OpenAI Codex</a>：<strong>Codex App</strong>（推荐）或 <strong>Codex CLI</strong>。</li>\n</ul>\n<p>LazyCodex 运行在 Codex <em>内部</em>。开始前 Codex 必须已安装并登录。如果你是第一次设置，Codex App 更简单，因为可以打开项目并直接从 GUI 调用 <code>$command</code>。</p>\n<blockquote>\n<p>不要使用 <code>npm install -g</code> 或 <code>bun add -g</code>。始终通过 <code>npx</code> 调用。</p>\n</blockquote>\n<h3 id=\"安装\">安装</h3>\n<p>命令只有一行。无需全局安装，也无需 setup files。</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai install\n</code></pre>\n<p>它与 <code>npx --yes --package oh-my-openagent omo install --platform=codex</code> 完全等价。</p>\n<p>如果要跳过 TUI 并运行完全自主、无 prompt 的设置：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai install --no-tui --codex-autonomous\n</code></pre>\n<p>installer 会把 commands、skills、hooks、model routing 和 verification defaults 接入你的 Codex configuration。强烈建议让 LLM agent 运行安装；agent 会自动处理订阅检测、模型选择和 provider auth。</p>\n<p>安装后，下次 Codex 启动会要求你在 startup review 中批准 <code>omo</code> hooks。Hooks 在批准前不会运行。</p>\n<p>如果你觉得安装步骤太多，不必自己运行命令。打开 Codex，把 <a href=\"https://lazycodex.ai\">lazycodex.ai</a> 链接给它，然后让它安装 LazyCodex。agent 会阅读文档并走完整设置。</p>\n<blockquote>\n<p><strong>卡住了？</strong> 加入 <a href=\"https://discord.gg/6ztZB9jvWq\">LazyCodex Discord</a>，找 <strong>Jobdori</strong> 求助。</p>\n</blockquote>\n<h3 id=\"从-codex-marketplace-安装实验性\">从 Codex marketplace 安装（实验性）</h3>\n<p>上面的 npx installer 仍是主路径。作为附加的实验性替代方案，你可以直接在 Codex 内安装：输入 <code>/plugins</code>，打开 <strong>Add Marketplace</strong> tab（&quot;Add a marketplace from a Git repo or local root.&quot;），输入 <code>https://github.com/code-yeongyu/lazycodex</code>，然后从 <code>sisyphuslabs</code> marketplace 安装 <code>omo</code>。也可以用 CLI：</p>\n<pre><code class=\"language-bash\">codex plugin marketplace add https://github.com/code-yeongyu/lazycodex\ncodex plugin add omo@sisyphuslabs\n</code></pre>\n<p>下一次启动时，在 Codex startup review 中批准 omo hooks；hooks 在批准前绝不会运行。首次批准的 session 会打印 <code>LazyCodex bootstrap running in background — restart the session when it completes</code>，同时后台 worker 完成设置（config blocks、agent roles、bin links、用于 <code>ast_grep</code> MCP 的 pinned <code>sg</code> binary）；完成后重启 session。marketplace 路径不会触碰 Codex permission settings；autonomous mode 仍然需要显式选择 <code>npx lazycodex-ai install --no-tui --codex-autonomous</code>。</p>\n<p>使用 <code>codex plugin marketplace upgrade sisyphuslabs</code> 升级。下一次 startup review 会把 hooks 显示为 <strong>Modified</strong>，这是每次升级后的预期行为，因为 plugin 文件变了，之前的 trust hashes 不再匹配。重新批准后，随后的 session 会在新版本上重新运行 bootstrap。如果状态看起来 pending 或 degraded，<code>npx lazycodex-ai doctor</code> 会说明问题和原因。</p>\n<h3 id=\"authentication\">Authentication</h3>\n<p>Auth 的目标是 <strong>Codex 本身</strong>，不是 LazyCodex。Codex CLI 在自身设置流程中登录；Codex App 通过 app UI 登录。没有单独的 LazyCodex login command。</p>\n<p>Codex 登录后，<code>npx lazycodex-ai install</code> 会处理订阅检测、模型选择和 provider routing。如果你让 LLM agent 运行安装，它会为你走同一流程。</p>\n<p>检查已配置内容：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai doctor\n</code></pre>\n<p><code>doctor</code> 会说明已设置什么、缺失什么，以及为什么重要。Provider 和 routing 详情见<a href=\"#configuration\">配置</a>。</p>\n<h3 id=\"windows\">Windows</h3>\n<p>两种安装路径都支持原生 Windows。</p>\n<ul>\n<li><strong>Node:</strong> <code>npx lazycodex-ai install</code> 需要 <code>PATH</code> 上有 Node.js（推荐 LTS）。marketplace 安装时，如果缺少 <code>node</code>，bootstrap 步骤会自动把 pinned Node LTS runtime provision 到 <code>%USERPROFILE%\\.codex\\runtime\\node\\</code>；先自己安装 Node 也可以，并会跳过下载。</li>\n<li><strong>Git Bash:</strong> shell hooks 需要 Git Bash。installer 和 marketplace bootstrap 在缺少 Git Bash 时都会尝试运行 <code>winget install --id Git.Git -e --source winget</code>。如果 Git 位于自定义路径，把 <code>OMO_CODEX_GIT_BASH_PATH</code> 设为类似 <code>C:\\Program Files\\Git\\bin\\bash.exe</code> 的路径。</li>\n<li><strong><code>where bash</code> 显示 <code>C:\\Windows\\System32\\bash.exe</code>:</strong> 这是 WSL launcher，不是 Git Bash。LazyCodex 在解析 Git Bash 时会故意忽略 <code>System32</code> 和 <code>WindowsApps</code> 中的 <code>bash.exe</code> shims。安装 Git for Windows，或把 <code>OMO_CODEX_GIT_BASH_PATH</code> 指向真正的 Git Bash。</li>\n<li><strong>Troubleshooting:</strong> Windows marketplace bootstrap 会把 transcript 写到 <code>%USERPROFILE%\\.codex\\plugins\\data\\omo-sisyphuslabs\\bootstrap\\ps-bootstrap.log</code>；degraded lines 类似 <code>degraded component=node reason=... hint=npx lazycodex-ai doctor</code>。运行 <code>npx lazycodex-ai doctor</code> 查看完整健康报告。</li>\n</ul>\n<h3 id=\"让-agent-替你安装\">让 agent 替你安装</h3>\n<p>强烈建议让 LLM agent 运行安装并为你走完整设置。agent 会自动处理订阅检测、模型选择和 provider auth。</p>\n",
  "recommended-environment.md": "<p>LazyCodex 最顺滑的运行环境是 Ubuntu 或 macOS。harness 依赖 shell、Git、Node.js/npm、Codex 配置文件和 hooks，这些在类 Unix 系统上表现最可预测。</p>\n<h3 id=\"操作系统\">操作系统</h3>\n<table>\n<thead>\n<tr>\n<th>OS</th>\n<th>Recommendation</th>\n<th>Notes</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><strong>Ubuntu</strong></td>\n<td>最推荐</td>\n<td>服务器和开发环境都有可预测的路径、shell 和包管理。</td>\n</tr>\n<tr>\n<td><strong>macOS</strong></td>\n<td>推荐</td>\n<td>适合本地开发。Homebrew 加 Node.js/npm 就够了。</td>\n</tr>\n<tr>\n<td><strong>Windows</strong></td>\n<td>不推荐</td>\n<td>原生 Windows shell 和路径差异会给 hooks、CLI、文件权限和脚本执行带来不必要摩擦。</td>\n</tr>\n</tbody></table>\n<p>如果必须使用 Windows，建议在 <strong>WSL2 Ubuntu</strong> 内运行 Codex 和 LazyCodex，而不是原生 Windows。把项目放在 WSL2 文件系统中，体验最稳定。</p>\n<h3 id=\"安装前\">安装前</h3>\n<table>\n<thead>\n<tr>\n<th>Item</th>\n<th>Expected state</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Codex</td>\n<td>已安装并登录 Codex App 或 Codex CLI。</td>\n</tr>\n<tr>\n<td>Node.js/npm</td>\n<td>维护中的 Node.js LTS。<code>npx</code> 随 npm 提供。</td>\n</tr>\n<tr>\n<td>Project</td>\n<td>在 Codex 中打开一个你要处理的仓库。</td>\n</tr>\n<tr>\n<td>Git</td>\n<td>仓库应使用 Git，方便追踪和回滚改动。</td>\n</tr>\n<tr>\n<td>Secrets</td>\n<td>Provider keys 放在 shell 或 Codex 环境里，绝不粘贴进项目文件。</td>\n</tr>\n</tbody></table>\n<p>除非你要从源码构建 LazyCodex，否则<strong>不需要</strong>安装 Bun。正常安装和使用都走 <code>npx</code> 路径。</p>\n<p>先检查版本：</p>\n<pre><code class=\"language-bash\">node -v\nnpm -v\nnpx -v\n</code></pre>\n<p>如果缺失，安装 Node.js：</p>\n<pre><code class=\"language-bash\"># Ubuntu or WSL2 Ubuntu\nsudo apt update\nsudo apt install -y nodejs npm\n\n# macOS\nbrew install node\n</code></pre>\n<h3 id=\"作者建议\">作者建议</h3>\n<ul>\n<li><strong>从 Codex App 开始。</strong> 安装、登录、会话管理和 skill 调用都能在 GUI 里看到，对第一次使用的人更不容易困惑。</li>\n<li><strong>使用 ChatGPT Pro 或更高档位。</strong> 本文档默认你使用的是 ChatGPT Pro 及以上附带的 Codex 使用环境。</li>\n<li><strong>先试裸 Codex。</strong> 如果你从未用过 coding agent，先单独用一次 Codex，再叠加 LazyCodex。理解基础 agent 如何回应和改文件，会让 harness 层更容易掌握。</li>\n<li><strong>坚持使用支持的模型。</strong> 不建议混入 GLM、Kimi、Mimo 或其他非默认模型栈。文档和 skill flows 都围绕 Codex 与 OmO 默认设置编写。</li>\n</ul>\n",
  "overview.md": "<p>LazyCodex 是把 <a href=\"https://github.com/code-yeongyu/oh-my-openagent\">OmO</a> 轻量移植进 Codex 的分发层。它不交付完整 harness，而是移植一个角色：<strong>Hephaestus</strong>，也就是 autonomous deep worker，以及让它的运行保持诚实的 workflows。可以把它理解成 Codex 版的 <a href=\"https://github.com/LazyVim/LazyVim\">LazyVim</a> 之于 <a href=\"https://github.com/folke/lazy.nvim\">lazy.nvim</a>。</p>\n<blockquote>\n<p><em>&quot;LazyVim made Neovim usable for the rest of us. LazyCodex does the same for Codex.&quot;</em></p>\n</blockquote>\n<h3 id=\"轻量分发\">轻量分发</h3>\n<p>LazyCodex 本身接近一个小型 install alias。<code>lazycodex-ai</code> 会运行面向 Codex platform 的 OmO installer，实际能力来自 <code>omo</code> plugin。</p>\n<h3 id=\"会安装什么\">会安装什么</h3>\n<table>\n<thead>\n<tr>\n<th>Layer</th>\n<th>What it means in Codex</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><strong>Commands</strong></td>\n<td><code>$init-deep</code>、<code>$ulw-plan</code>、<code>$start-work</code>、<code>$ulw-loop</code>，也就是 workflow entry points。</td>\n</tr>\n<tr>\n<td><strong>Skills</strong></td>\n<td>Review、debugging、refactoring、frontend、LSP、rules injection 等 specialist playbooks。</td>\n</tr>\n<tr>\n<td><strong>Hooks</strong></td>\n<td>在 session start、prompt submit、post-edit、post-compact 和 stop 时触发的自动助手。</td>\n</tr>\n<tr>\n<td><strong>MCP Servers</strong></td>\n<td><code>grep_app</code>、<code>context7</code>、<code>codegraph</code>、<code>git_bash</code>、<code>lsp</code> 等 tool connections。</td>\n</tr>\n<tr>\n<td><strong>Model routing</strong></td>\n<td>Role-based model profiles，让 planning、implementation 和 verification 各用合适模型。</td>\n</tr>\n<tr>\n<td><strong>Agent roles</strong></td>\n<td><code>explorer</code>、<code>librarian</code>、<code>plan</code>、<code>momus</code>、<code>metis</code>，以及用于 subagent delegation 的 executor/reviewer roles。</td>\n</tr>\n</tbody></table>\n<h3 id=\"它来自哪里\">它来自哪里</h3>\n<p>OmO 是完整 agent harness：一个带 <code>.omo/boulder.json</code> session continuity 的 primary orchestrator（Sisyphus）、一个 deep worker（Hephaestus）、specialist agents、multi-model routing、54+ lifecycle hooks 和 team mode。内容很多。LazyCodex 只取对 Codex 聚焦设置最重要的部分，并把它打包成可重复安装。</p>\n<h3 id=\"你会得到什么\">你会得到什么</h3>\n<p>移植进 Codex 的 Hephaestus deep worker，包含：</p>\n<ul>\n<li>Goal-oriented execution：你给目标，不给 step-by-step recipes。</li>\n<li>紧凑运行循环：<strong>Explore -&gt; Plan -&gt; Implement -&gt; Verify -&gt; Manually QA</strong>。</li>\n<li>并行 explore subagents，让它在写任何内容前先映射地形。</li>\n<li><code>$ulw-plan</code>、<code>$start-work</code> 和 <code>$ulw-loop</code> workflows，让复杂工作持续推进直到被验证。</li>\n<li>Skills、hooks、model routing 和 verification defaults 一次性接入 Codex。</li>\n</ul>\n<h3 id=\"记住这四个\">记住这四个</h3>\n<ol>\n<li><code>$init-deep</code> 创建项目记忆。</li>\n<li><code>$ulw-plan &quot;what to build&quot;</code> 确定工作指令。</li>\n<li><code>$start-work</code> 执行计划。</li>\n<li><code>$ulw-loop &quot;task&quot;</code> 持续推进直到验证完成。</li>\n</ol>\n<p>LazyCodex 会围绕这个流程接入 rules loading、skills、hooks、model routing 和 verification habits。需要细节时，再按 sidebar 逐节阅读。</p>\n<h3 id=\"harness-工作流\">Harness 工作流</h3>\n<p>当工作需要 deep worker 作为一个协调一致、证据约束的循环运行，而不是单 turn 时，在 prompt 中使用 <code>{your prompt} ultrawork</code>。</p>\n<h3 id=\"如何组合在一起\">如何组合在一起</h3>\n<p>LazyCodex 是 <a href=\"https://github.com/code-yeongyu/oh-my-openagent\">OmO</a> 之上的轻量分发层。核心引擎是 OmO；LazyCodex 把 OmO 的 Hephaestus 打包给 Codex。</p>\n<p>Credit: LazyCodex 的命名灵感来自 <a href=\"https://github.com/LazyVim/LazyVim\">LazyVim</a>。Ultragoal 和 UltraQA 的想法来自 <a href=\"https://github.com/Yeachan-Heo/oh-my-codex\">oh-my-codex</a>，并为这个 Codex 设置从概念重新实现。</p>\n<ul>\n<li><a href=\"https://github.com/code-yeongyu/lazycodex\">LazyCodex on GitHub</a></li>\n<li><a href=\"https://github.com/code-yeongyu/oh-my-openagent\">OmO on GitHub</a></li>\n<li><a href=\"https://discord.gg/PUwSMR9XNk\">Discord - #building-in-public</a></li>\n<li><a href=\"https://lazycodex.ai\">lazycodex.ai</a></li>\n</ul>\n",
  "getting-started.md": "<p>LazyCodex 最适合作为复杂代码库的 harness：项目记忆、规划、执行、可验证完成、skills、hooks、model routing 和 diagnostics。这一页会带你验证安装，并介绍最常用的四个命令。</p>\n<h3 id=\"前置条件\">前置条件</h3>\n<ul>\n<li>通过 Node.js/npm 安装可用的 <code>npx</code>。不需要 Bun。</li>\n<li>Codex App 或 <a href=\"https://github.com/openai/codex\">OpenAI Codex CLI</a>。</li>\n</ul>\n<p>LazyCodex 会把 OmO commands、skills 和 hooks 接入 Codex configuration。如果 Codex 本身正常工作，App 和 CLI 的安装流程相同。</p>\n<h3 id=\"安装\">安装</h3>\n<p>最简单的方法：在 Codex 中打开一个新任务，把 LazyCodex GitHub 链接给它，并要求它安装。</p>\n<pre><code class=\"language-text\">https://github.com/code-yeongyu/lazycodex\n\n请从这个仓库安装 LazyCodex。\n</code></pre>\n<p>如果你更想直接运行命令：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai install\n</code></pre>\n<p>安装后，重新打开 Codex，并确认 <code>$</code> 菜单中出现 OmO commands 和 skills。下一次启动会要求你在 startup review 中批准 <code>omo</code> hooks；hooks 在批准前不会运行。</p>\n<p>如果状态显示 <code>pending</code> 或 <code>degraded</code>，先运行诊断：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai doctor\n</code></pre>\n<h3 id=\"authentication\">Authentication</h3>\n<p>LazyCodex 没有单独登录。installer（或运行 installer 的 agent）会处理订阅检测、模型选择和 provider auth。Codex App 或 Codex CLI 必须已经登录，但这只是前置条件，不是 LazyCodex 专属步骤。</p>\n<p>Provider 和 routing 详情见<a href=\"#configuration\">配置</a>。</p>\n<h3 id=\"四个命令\">四个命令</h3>\n<table>\n<thead>\n<tr>\n<th>Command</th>\n<th>Use it when</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><code>$init-deep</code></td>\n<td>仓库太大或太旧，不能靠记忆解释。</td>\n</tr>\n<tr>\n<td><code>$ulw-plan</code></td>\n<td>写代码前需要先做决策。</td>\n</tr>\n<tr>\n<td><code>$start-work</code></td>\n<td>已有计划，需要执行到完成。</td>\n</tr>\n<tr>\n<td><code>$ulw-loop</code></td>\n<td>你希望 agent 持续推进，直到结果被验证。</td>\n</tr>\n</tbody></table>\n<h3 id=\"第一次运行\">第一次运行</h3>\n<p>先用分层 <code>AGENTS.md</code> 记忆给 agent 项目上下文：</p>\n<pre><code class=\"language-text\">$init-deep\n</code></pre>\n<p>然后选择匹配任务的命令。</p>\n<p><strong>如果需要先规划</strong>，这个命令会读取仓库并写出 decision-complete plan，不触碰产品代码。执行前先批准计划。</p>\n<pre><code class=\"language-text\">$ulw-plan &quot;add a done-toggle helper to the small task app&quot;\n</code></pre>\n<p><strong>如果已经有计划</strong>，执行它。所有 checkboxes 必须完成后才会停止。</p>\n<pre><code class=\"language-text\">$start-work\n</code></pre>\n<p><strong>如果需要端到端验证完成</strong>，loop 会持续推进，直到证据证明结果。</p>\n<pre><code class=\"language-text\">$ulw-loop &quot;fix the payment flow failure and verify end to end&quot;\n</code></pre>\n<h3 id=\"如何选择\">如何选择</h3>\n<p>每个仓库先运行一次 <code>$init-deep</code>，让 agents 拥有可依赖的分层 <code>AGENTS.md</code> 上下文。</p>\n<p>任何模糊任务，先运行 <code>$ulw-plan</code>。它会访谈你、并行探索代码库，并把 decision-complete plan 写入 <code>plans/&lt;slug&gt;.md</code>，不触碰产品代码。</p>\n<p>把计划交给 <code>$start-work</code> 执行：durable Boulder state、parallel subagents、strict TDD 和五个 evidence gates。每个 checkbox 完成后，它会打印 <code>ORCHESTRATION COMPLETE</code>。</p>\n<p><code>$ulw-loop</code> 是最紧的循环，用于必须运行到 oracle 验证完成的单个任务。它不做规划，而是执行和验证。</p>\n<h3 id=\"一个典型会话\">一个典型会话</h3>\n<pre><code class=\"language-text\">$init-deep\n$ulw-plan &quot;add rate limiting to the api gateway&quot;\n$start-work plans/add-rate-limiting.md\n</code></pre>\n<p>如果任务很小且理解充分，可以跳过 plan，直接 loop：</p>\n<pre><code class=\"language-text\">ulw fix the flaky checkout test\n</code></pre>\n<p>围绕这些命令提供 specialist judgment 的 skills，见<a href=\"#skills\">能力覆盖</a>。</p>\n",
  "faq.md": "<p>这里回答常见卡点。正在安装时先看<strong>安装与环境</strong>；不知道选哪个命令时看<strong>第一次使用</strong>；运行中感觉不对时看<strong>执行与验证</strong>；碰到阻塞时看<strong>冲突与限制</strong>。</p>\n<h3 id=\"安装与环境\">安装与环境</h3>\n<p><strong>LazyCodex 是什么？</strong>\n面向 Codex 的 OmO 轻量移植版。它把 commands、skills、hooks 和 model routing 叠加到 Codex 上，让 agent 在编辑前先计划，在声称完成前先验证，并跨会话保留项目上下文。</p>\n<p><strong>LazyCodex 会替代 OmO 吗？</strong>\n不会。它是一个聚焦子集。完整 OmO 有更深的 orchestration。LazyCodex 只取在 Codex 内效果好的部分，并打包成可重复安装。</p>\n<p><strong>可以让 Codex 替我安装吗？</strong>\n可以。打开 Codex，把 LazyCodex GitHub 链接或 <code>lazycodex.ai</code> 给它，然后让它安装。你也可以自己运行 <code>npx lazycodex-ai install</code>。</p>\n<p><strong>Codex App 和 Codex CLI 的安装有区别吗？</strong>\n流程相同。LazyCodex 会安装到 Codex 环境中。你喜欢 App 或 CLI 哪个表面，就用哪个。</p>\n<p><strong>需要 Bun 吗？</strong>\n不需要。除非你从源码构建 LazyCodex，否则 Bun 不是必需品。安装和使用都通过普通 Node.js/npm 的 <code>npx</code> 完成。</p>\n<p><strong>Windows 能用吗？</strong>\n可以。npx installer 和 Codex marketplace 路径都原生支持 Windows。缺少 Node.js 和 Git Bash 时，installer 会自动 provision；shell hooks 会通过 Git Bash 运行。如果你已经安装了 Node.js 和 Git for Windows，通常开箱即用。环境变量覆盖和 bootstrap 日志见<a href=\"#installation\">安装中的 Windows 小节</a>。</p>\n<h3 id=\"第一次使用\">第一次使用</h3>\n<p><strong>LazyCodex 最适合什么任务？</strong>\n适合规划和验证很重要的大型、长时间工作。小问题或一行修复可以直接用 Codex，不必上 harness。</p>\n<p><strong>使用前需要学完所有 skill 吗？</strong>\n不需要。任务匹配领域时，skills 会自动激活。先学四个命令；碰到具体需要时再深入单个 skill。</p>\n<p><strong>应该先学哪些命令？</strong>\n<code>$init-deep</code> 用于项目记忆，<code>$ulw-plan</code> 用于规划，<code>$start-work</code> 用于执行计划，<code>$ulw-loop</code> 用于需要验证完成的开放式任务。</p>\n<p><strong>怎么知道安装成功？</strong>\n打开 Codex，在输入框里键入 <code>$</code>，应该能看到 OmO commands 和 skills。CLI 中输入 <code>ulw</code> 应该会激活 ultrawork mode。第一个实际命令通常是 <code>$init-deep</code>。</p>\n<p><strong>安装后 <code>$</code> 菜单没有任何命令。</strong>\n打开新的 Codex session 重新加载 plugin，然后检查 startup review 里是否有待批准的 <code>omo</code> hook。如果仍不显示，运行 <code>npx lazycodex-ai doctor</code> 检查安装和 skill loading 状态。</p>\n<h3 id=\"执行与验证\">执行与验证</h3>\n<p><strong><code>npx lazycodex-ai doctor</code> 真能用吗？</strong>\n能。它运行 OmO doctor flow，并报告已配置什么、缺失什么以及原因。任何地方看起来不对时，都先用它。</p>\n<p><strong>为什么要我批准 hooks？</strong>\nCodex 会在启动时 review hooks。<code>omo</code> hooks 只有在你批准后才会运行。每次升级后 hooks 会显示为 <strong>Modified</strong>，因为 plugin 文件变了；重新批准即可使用新版本。</p>\n<p><strong>升级后要检查什么？</strong>\n如果 hooks 显示 Modified，重新批准。任何状态显示 pending 或 degraded 时，运行 <code>npx lazycodex-ai doctor</code> 看完整诊断。</p>\n<p><strong><code>$ulw-loop</code> 总是太快结束，怎么办？</strong>\n仅靠迭代不能修复模糊的完成标准。明确说明你希望收集什么、必须通过哪些验证、缺数据时 agent 应该调查什么。也可以先运行 <code>$ulw-plan</code> 固定范围。</p>\n<p><strong>需要更大的 token budget 吗？</strong>\nLazyCodex 不是省 token 工具。它会把足够好的模型和足够多的 tokens 用在规划、执行和验证上。大型任务应拆成更小单元，避免单个 thread 过重。</p>\n<p><strong>怎么选择 thinking/reasoning level？</strong>\n不用想太多。避免 <code>low</code>；日常工作用 <code>medium</code>；失败代价高或 review 很重要时用 <code>high</code>；<code>xhigh</code> 留给真正重的任务。</p>\n<p><strong>LazyCodex 能做 computer-use 吗？</strong>\n如果 Codex session 连接了 computer-use 工具，就可以。LazyCodex 自身不提供这些工具；它会在 workflows 中指导 agent 使用它们，并在工具可用时施加更强验证。</p>\n<h3 id=\"冲突与限制\">冲突与限制</h3>\n<p><strong>可以桌面使用，然后在移动端/远程继续吗？</strong>\nLazyCodex 安装进 Codex，所以 Codex 可用的地方它就可用。Codex App 的桌面/移动端远程流程很适合搭配使用。某些功能可能只有桌面 app 完整可用。</p>\n<p><strong>Team mode 显示了，但创建 thread 失败。</strong>\n把 LazyCodex 和 Codex 都更新到最新版，然后运行 <code>npx lazycodex-ai doctor</code>。Team mode 依赖 Codex desktop app 功能，App 与 CLI 之间可能存在差异。</p>\n<p><strong>可以把 OMX 和 LazyCodex 一起用吗？</strong>\n不推荐。两者一起运行可能产生冲突，浪费 tokens 并静默失败。如果 installer 警告冲突，移除其中一个。LazyCodex 设计成 Codex 之上的唯一轻量层。</p>\n",
  "init-deep.md": "<p><code>$init-deep</code> 会生成分层 <code>AGENTS.md</code> 上下文，让 agent 在触碰大型仓库前先读取局部指导。每个项目运行一次；当架构变化到现有上下文不再反映现实，也要再次运行。</p>\n<h3 id=\"它会产出什么\">它会产出什么</h3>\n<ul>\n<li>根级 <code>AGENTS.md</code>，说明项目 stack、layout、conventions，以及优先查看的位置。</li>\n<li>关键目录中的嵌套 <code>AGENTS.md</code>，让 agent 进入某个 package 时获得作用域内指导，而不是猜测。</li>\n<li>指向 harness 应遵守的 project rules、skills 和 instruction files。</li>\n</ul>\n<h3 id=\"什么时候运行\">什么时候运行</h3>\n<ul>\n<li>接手一个太大或太旧、无法靠记忆说明的仓库。</li>\n<li>完成一次大型重构、迁移或布局变化后。</li>\n<li>当 agent 反复选错文件或忽略局部约定时。</li>\n</ul>\n<h3 id=\"如何使用\">如何使用</h3>\n<pre><code class=\"language-text\">$init-deep\n</code></pre>\n<p>该命令会遍历目录树，读取定义项目实际工作方式的文件，并写入上下文。审查生成的 <code>AGENTS.md</code> 文件，删掉陈旧内容，然后提交。后续回合中的 agent 会在编辑前读取这些上下文，因此第一次会话的成本会回报给之后每个会话。</p>\n<h3 id=\"初始化之后\">初始化之后</h3>\n<p>上下文就位后，如果工作需要计划，进入 <a href=\"#ulw-plan\"><code>$ulw-plan</code></a>；如果是单个可验证任务，进入 <a href=\"#ulw-loop\"><code>$ulw-loop</code></a>。</p>\n",
  "ulw-plan.md": "<p><code>$ulw-plan</code> 是战略规划顾问（Prometheus）。它把想法变成 decision-complete work plan。它是 planner，<strong>不是</strong> implementer。当你说“do X”时，它会为 X 产出计划，绝不写产品代码。</p>\n<h3 id=\"流程\">流程</h3>\n<ol>\n<li><strong>Socratic interview</strong>：只问探索无法解决的分叉。意图模糊时，先研究 best practice，而不是追问用户。</li>\n<li><strong>Parallel codebase exploration</strong>：扇出只读 subagents，让每个决策都基于真实代码，而不是记忆。</li>\n<li><strong>Metis gap analysis</strong>：列出计划依赖的每个 unknown，并关闭它，或把它作为显式分叉暴露出来。</li>\n<li><strong>Write the plan</strong> 到 <code>plans/&lt;slug&gt;.md</code>：一份 decision-complete plan，worker 执行时无需再次访谈。</li>\n<li><strong>Optional Momus high-accuracy review</strong>：在计划交付前，用 adversarial pass 尝试打破计划。</li>\n</ol>\n<h3 id=\"输出\">输出</h3>\n<p>Questions、research 和 work plan。每个 todo 都带 references、acceptance criteria、QA plan 和 commit boundary。计划会记录 <code>status: awaiting-approval</code> 并等待批准；它绝不会自己开始执行。</p>\n<h3 id=\"handoff\">Handoff</h3>\n<p>批准后，把计划交给 <a href=\"#start-work\"><code>$start-work</code></a>，它会基于 durable Boulder state 和五个 evidence gates 执行。</p>\n",
  "start-work.md": "<p><code>$start-work</code> 会执行 Prometheus work plan，直到每个 top-level checkbox 都完成。</p>\n<h3 id=\"工作方式\">工作方式</h3>\n<ul>\n<li><code>.omo/boulder.json</code> 中的 durable Boulder state 可跨回合和会话保存</li>\n<li>Stop-hook 会重新注入下一轮，直到计划完成</li>\n<li>独立 sub-tasks 会扇出到并行 subagents</li>\n<li>Strict TDD 加五个 evidence gates：plan reread、automated verification、manual-QA、adversarial QA、cleanup</li>\n<li>进度会记录到 ledger</li>\n</ul>\n<h3 id=\"语法\">语法</h3>\n<pre><code class=\"language-bash\">$start-work [plan-name] [--worktree &lt;absolute-path&gt;]\n</code></pre>\n<h3 id=\"完成\">完成</h3>\n<p>当每个 checkbox 都被勾选后，它会打印 <code>ORCHESTRATION COMPLETE</code> block。</p>\n",
  "ulw-loop.md": "<p><code>$ulw-loop</code> 是一个自指开发循环，会把工作拆成系统化、证据约束的步骤，并持续运行直到验证完成。</p>\n<h3 id=\"工作方式\">工作方式</h3>\n<p>agent 会持续工作，并在它认为任务完成时输出 <code>&lt;promise&gt;DONE&lt;/promise&gt;</code>，但这<strong>不会</strong>结束 loop。必须由 Oracle 先验证结果。只有系统确认 Oracle 已验证通过后，loop 才结束。如果验证失败，它会继续，并给出消息：&quot;Oracle verification failed. Continuing ULTRAWORK loop.&quot;</p>\n<p>每个步骤都有自己的证据：真实 artifact，而不是 dry-run claim。进度会 checkpoint，因此长任务即使重启，也不会丢失已经证明过的内容。</p>\n<h3 id=\"bootstrap\">Bootstrap</h3>\n<p>首次运行前，loop 会读取完整 workflow reference（Bootstrap tier triage、Execution Loop 和 Manual-QA channels table），确保后续每个阶段按同一方式执行。它只读取当前阶段需要的 sections。</p>\n<h3 id=\"manual-qa-channels\">Manual-QA channels</h3>\n<p>步骤不会因为状态字符串而关闭。它需要来自真实表面的捕获 artifact，例如 HTTP call、tmux session 或 browser，再加上 adversarial pass 和 cleanup receipt。见 <a href=\"#manual-qa\">manual QA</a>。</p>\n<h3 id=\"语法\">语法</h3>\n<pre><code class=\"language-bash\">$ulw-loop &quot;task description&quot; [--completion-promise=TEXT] [--strategy=reset|continue]\n</code></pre>\n<h3 id=\"限制\">限制</h3>\n<p>iteration cap 在 ultrawork mode 下是 500，在 normal mode 下是 100。</p>\n<h3 id=\"继续阅读\">继续阅读</h3>\n<ul>\n<li><a href=\"#ultrawork\">ultrawork mode</a>：把 loop 变成 binding verified run 的模式。</li>\n<li><a href=\"#hooks-lifecycle\">Hooks 与生命周期</a>：Stop-hook 如何重新注入下一轮。</li>\n</ul>\n",
  "skills.md": "<p>Skills 是 LazyCodex 加在 command pillars 之上的 specialist playbooks。当任务匹配某个领域时，它们会自动激活，你不需要学习或记住全部 skill。在 prompt 中包含 <code>ultrawork</code>（或短别名 <code>ulw</code>），harness 会在内部选择正确 skills。</p>\n<p>如果想显式调用某个 skill，把名称写进 prompt，例如 <code>$review-work</code>、<code>$remove-ai-slops</code>、<code>$ulw-research</code>。</p>\n<h3 id=\"commands\">Commands</h3>\n<p>核心命令保持简单：</p>\n<ul>\n<li><code>$init-deep</code>：项目记忆</li>\n<li><code>$ulw-plan</code>：编码前产出 decision-complete planning</li>\n<li><code>$start-work</code>：用 durable Boulder progress 执行计划</li>\n<li><code>$ulw-loop</code>：证据约束的 loop，直到验证完成</li>\n</ul>\n<p>Skills 会围绕这些 pillars 增加 specialist judgment。下面说明每个 skill 以及通常如何使用。</p>\n<h3 id=\"skill-index\">Skill index</h3>\n<p>大多数 skills 会在请求匹配其领域时自动激活，所以使用 LazyCodex 前不需要学习或手动选择每个 skill。想显式调用时，把 skill 名称写进 prompt，例如 <code>$visual-qa</code>、<code>$git-master</code> 或 <code>$ulw-research</code>。</p>\n<table>\n<thead>\n<tr>\n<th>Skill</th>\n<th>Use it for</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><code>init-deep</code></td>\n<td>面向大型或老旧仓库的分层 <code>AGENTS.md</code> 上下文</td>\n</tr>\n<tr>\n<td><code>ulw-plan</code></td>\n<td>编码前的 explore-first planning</td>\n</tr>\n<tr>\n<td><code>ulw-loop</code></td>\n<td>证据约束的 loop，直到验证完成</td>\n</tr>\n<tr>\n<td><code>start-work</code></td>\n<td>用 durable Boulder progress 执行计划</td>\n</tr>\n<tr>\n<td><code>review-work</code></td>\n<td>五路并行 post-implementation review</td>\n</tr>\n<tr>\n<td><code>remove-ai-slops</code></td>\n<td>保持行为不变，清理看起来像 AI 生成的代码</td>\n</tr>\n<tr>\n<td><code>frontend</code></td>\n<td>有设计判断的 UI 工作，而不是通用 layout 填充</td>\n</tr>\n<tr>\n<td><code>programming</code></td>\n<td>严格 TypeScript、Rust、Python 或 Go discipline，TDD-first</td>\n</tr>\n<tr>\n<td><code>git-master</code></td>\n<td>原子 commits、rebase/squash、push safety、history investigation</td>\n</tr>\n<tr>\n<td><code>visual-qa</code></td>\n<td>Screenshot/TUI diff 加双 oracle visual QA</td>\n</tr>\n<tr>\n<td><code>debugging</code></td>\n<td>证据驱动的 root-cause investigation</td>\n</tr>\n<tr>\n<td><code>refactor</code></td>\n<td>保持行为不变地重构现有代码</td>\n</tr>\n<tr>\n<td><code>ulw-research</code></td>\n<td>代码库、web、官方文档和 OSS repo swarms 的 maximum-saturation research</td>\n</tr>\n<tr>\n<td><code>LSP</code></td>\n<td>Diagnostics、definitions、references、symbols 和 renames</td>\n</tr>\n<tr>\n<td><code>lsp-setup</code></td>\n<td>为项目配置 language servers</td>\n</tr>\n<tr>\n<td><code>AST-grep</code></td>\n<td>跨代码的 structural search 与 rewrite</td>\n</tr>\n<tr>\n<td><code>rules</code></td>\n<td>来自 AGENTS、rules 和 instruction files 的项目指令</td>\n</tr>\n<tr>\n<td><code>comment-checker</code></td>\n<td>Edit-like operations 后的反馈</td>\n</tr>\n</tbody></table>\n<h3 id=\"skill-highlights\">Skill highlights</h3>\n<hr>\n<h3 id=\"review-work\">review-work</h3>\n<p>五路并行 post-implementation review。</p>\n<p>完成有分量的工作后，<code>review-work</code> 会并行启动五个 sub-agents，每个覆盖不同角度：目标/约束验证、动手 QA execution、代码质量、安全性，以及从 git history 和 issues 挖掘上下文。五路都通过，review 才通过。任何一路失败，review 就失败。</p>\n<p><strong>何时激活：</strong> 完成任何有意义的实现后，特别是改动触及 3+ files 或运行 20+ 分钟时。</p>\n<p><strong>示例：</strong> 完成 PR 后，用户说：</p>\n<pre><code class=\"language-text\">review my work\n</code></pre>\n<p>harness 会在独立 threads 中 spawn 五个并行 reviewers，每个带一个聚焦 lens。只有每一路都同意时，最终 verdict 才是 PASS。</p>\n<hr>\n<h3 id=\"remove-ai-slops\">remove-ai-slops</h3>\n<p>保持行为不变地清理 AI-generated code smells。</p>\n<p>安全不变量：删除任何一行之前，先用 regression tests 锁定行为。覆盖明显注释、过度防御代码、不必要抽象、死代码、重复和过大的模块（250+ pure LOC 会触发完整模块化重构）。Workers 按每批五个并行运行，任何 test failure 都立即 revert。</p>\n<p><strong>何时激活：</strong> 当要求 cleanup、deslop 或移除 AI-generated patterns 时。</p>\n<p><strong>示例：</strong> 结合 <code>refactor</code> 和 <code>programming</code> 做完整 cleanup pass：</p>\n<pre><code class=\"language-text\">ulw plan and manual qa, no behaviour changes, no regressions\n/refactor /remove-ai-slops through /programming\n</code></pre>\n<p>harness 会先规划 cleanup，用 tests 锁定行为，然后按 slop category 并行派发 workers，从安全到危险依次处理。</p>\n<hr>\n<h3 id=\"frontend\">frontend</h3>\n<p>UI、UX、design、performance、accessibility 和 visual QA 的统一 router。</p>\n<p>它不是单个 rule file，而是 router。它会根据任务读取 design、perfection 和 ui-ux-db references，然后构建并在真实浏览器中验证。覆盖 UI implementation、styling、layout、animation、Lighthouse 100、Core Web Vitals、accessibility、SEO，以及 <code>react-scan</code>、<code>react-doctor</code> 等 React dev tools。</p>\n<p><strong>何时激活：</strong> 任何涉及 UI、styling、layout、animation、design 或 performance auditing 的任务。</p>\n<p><strong>示例：</strong></p>\n<pre><code class=\"language-text\">redesign the sidebar with better spacing and hit Lighthouse 100\n</code></pre>\n<p>skill 会路由到正确 design references，构建时匹配现有 design system，然后运行真实 Playwright Chromium Lighthouse audit。不会用 Lighthouse CLI，也不会通过削弱 UX 过关。</p>\n<hr>\n<h3 id=\"programming\">programming</h3>\n<p>跨四种语言的一套哲学：strict types、modern stacks、TDD。</p>\n<p>适用于每个 <code>.py</code>、<code>.pyi</code>、<code>.rs</code>、<code>.ts</code>、<code>.tsx</code>、<code>.mts</code>、<code>.cts</code>、<code>.go</code> 文件。skill 会按语言 gate，加载匹配 reference set，并强制：parse-don&#39;t-validate at boundaries、exhaustive variant matching、typed errors、无 escape hatches（<code>any</code>、<code>unwrap</code>、<code>@ts-ignore</code>）、每文件 250 pure LOC ceiling，以及 mandatory TDD（RED -&gt; GREEN -&gt; REFACTOR）。</p>\n<p><strong>何时激活：</strong> 自动在任何受支持语言的代码文件编辑时激活。</p>\n<p><strong>示例：</strong> skill 始终开启。编辑 TypeScript 时，它加载 TypeScript reference（Bun + Biome + strict tsconfig），强制 branded types 和 discriminated unions，并运行 post-write review loop：测量 pure LOC、自审七个问题，超过 250 LOC 就重构。</p>\n<hr>\n<h3 id=\"debugging\">debugging</h3>\n<p>跨任何语言或 binary 的 hypothesis-driven runtime debugging。</p>\n<p>关于 bug 为什么发生的每个 claim，都必须来自观察到的 runtime state，而不是只读代码。skill 运行分阶段循环：setup and journal、形成 3+ 个正交 hypotheses、并行调查、两轮失败后升级给 independent verifiers、通过 toggling 确认 root cause、用 failing test 锁定、最小修复、在真实表面 QA，最后清理所有 debug artifacts。</p>\n<p><strong>何时激活：</strong> crashes、silent failures、wrong responses、stuck processes、memory leaks、async misbehavior 或 reverse engineering。</p>\n<p><strong>示例：</strong></p>\n<pre><code class=\"language-text\">debug this — the API returns 200 but the body is empty\n</code></pre>\n<p>skill 会启动并行 investigation lanes，接入真实 debuggers（pdb、node inspect、lldb、dlv），并且不会在 root cause 通过 toggling 确认、failing test 变 GREEN 前关闭 bug。</p>\n<hr>\n<h3 id=\"refactor\">refactor</h3>\n<p>Codemap-aware、由 LSP 和 AST-grep 支撑的 restructuring。</p>\n<p>触碰任何内容前先映射代码库，评估 test coverage 以确定 verification strategy，用 rollback points 规划 atomic steps，然后用 LSP renames 和 AST-grep structural rewrites 执行。执行期间任何 test failure 都会立即停止并 revert。</p>\n<p><strong>何时激活：</strong> 请求 refactor、restructure、extract、simplify 或 modernize code 时。</p>\n<p><strong>示例：</strong></p>\n<pre><code class=\"language-text\">refactor the validation logic into its own module --scope=module\n</code></pre>\n<p>skill 会建立目标 dependency graph，运行 characterization tests 固定当前行为，然后逐步执行 restructuring，每步后验证。</p>\n<hr>\n<h3 id=\"visual-qa\">visual-qa</h3>\n<p>Screenshot 和 TUI diff，加双 oracle visual QA。</p>\n<p>它会捕获 reference 和 actual evidence：web UIs 用 screenshots，terminal UIs 用 <code>tmux capture-pane</code>，再运行 bundled pixel-diff 或 column-width script。两个并行只读 oracle passes 会评估：一个关注 design-system and functional integrity，另一个关注 visual fidelity and CJK text precision。最终 verdict 是单一好/坏评分。</p>\n<p><strong>何时激活：</strong> 构建或修改任何 UI 之后，或要求验证 visual correctness 时。</p>\n<hr>\n<h3 id=\"git-master\">git-master</h3>\n<p>Atomic commits、rebase/squash、push safety、history investigation。</p>\n<p>处理 commit message style detection、semantic grouping、fixup autosquash、blame、bisect、<code>log -S</code>，以及“谁写的”“何时加入的”这类问题。</p>\n<p><strong>何时激活：</strong> 任何 git 操作，包括 committing、rebasing、squashing、history search。</p>\n<hr>\n<h3 id=\"ulw-research\">ulw-research</h3>\n<p>Maximum-saturation research mode（原 <code>ultraresearch</code>）。</p>\n<p>在代码库、web、官方文档和 OSS repositories 上编排并行 explore 和 librarian swarms。运行由 workers 返回的 leads 驱动的 recursive EXPAND loop，通过运行代码经验性验证 findings，并生成带引用的综合结论和可选 reports。</p>\n<p><strong>何时激活：</strong> 只在显式要求时：出现 <code>ulw-research</code>、legacy alias <code>ultraresearch</code>，或要求 deep research / ultra-precise investigation。</p>\n<p><strong>示例：</strong></p>\n<pre><code class=\"language-text\">ulw-research the typeclaw architecture — map every module and find the official docs\n</code></pre>\n<p>skill 会在 GitHub、官方文档和 web sources 上扇出 10+ 个并行 search lanes，递归扩展有价值 leads，然后综合成带引用 report。</p>\n<hr>\n<h3 id=\"lsp\">LSP</h3>\n<p>Language-server diagnostics、definitions、references、symbols 和 safe renames。</p>\n<p>通过 MCP tool calls 给 agent 提供 language-server precision。每次编辑后运行 diagnostics，在 workspace 中查找 definitions 和 references，并通过 language server 自己的 workspace edit 做 safe renames，而不是 text find-and-replace。</p>\n<p><strong>何时激活：</strong> edit-like tool calls 后自动 diagnostics，也可按需用于导航和 renames。</p>\n<hr>\n<h3 id=\"ast-grep\">AST-grep</h3>\n<p>跨 25 种语言的 structural search 和 rewrite。</p>\n<p>按语法形状而不是文本查找代码，例如匹配某种形状的每个 function call、某种形状的每个 import。rewrites 是确定性的，并且应用前总会用 <code>dryRun=true</code> 预览。可与 <code>refactor</code> skill 配合做安全的大规模 codemods。</p>\n<p><strong>何时激活：</strong> structural code matching、pattern-based search 或 deterministic rewrites（移除 <code>as any</code>、把 <code>require()</code> 迁移到 <code>import</code>、查找 empty catch blocks）。</p>\n<hr>\n<h3 id=\"lsp-setup\">lsp-setup</h3>\n<p>Language-server 安装和 workspace wiring。</p>\n<p>当项目还没有可靠 diagnostics、definitions、references 和 safe renames 时，配置 language servers。它会检测语言栈，安装或指向正确 server，并验证 LSP calls 可用，再让更高层 coding 或 refactor skills 依赖它。</p>\n<p><strong>何时激活：</strong> diagnostics 缺失、definitions 无法解析，或项目在 refactor/programming task 前需要 LSP support。</p>\n<hr>\n<h3 id=\"rules\">rules</h3>\n<p>来自 repository 和用户 rule files 的 project instruction injection。</p>\n<p>自动从 <code>AGENTS.md</code>、<code>CONTEXT.md</code>、<code>.omo/rules/</code>、<code>.claude/rules/</code>、<code>.github/instructions/</code> 和 <code>.github/copilot-instructions.md</code> 等来源加载 project instructions。没有需要运行的命令；plugin 启用时，harness 会把这些 rules 当作 active context。</p>\n<p><strong>何时激活：</strong> session start 和 prompt submission 阶段，让 agents 在规划或编辑前继承项目约束。</p>\n<hr>\n<h3 id=\"comment-checker\">comment-checker</h3>\n<p>Edit-like operations 后的即时反馈。</p>\n<p>代码改动后，<code>comment-checker</code> 会检查编辑行附近的注释。如果发现 comment drift，即注释不再匹配下面的代码，agent 必须先修复或说明原因再继续。它会在 stale comments 被引入的当下捕捉，而不是等到后续 review。</p>\n<p><strong>何时激活：</strong> plugin 启用 guardrail 后，在 write、edit、patch 或其他 edit-like tool calls 之后激活。</p>\n<hr>\n<h3 id=\"skills-在哪里\">Skills 在哪里</h3>\n<p>LazyCodex 会把 skills 作为 OmO plugin 的一部分安装。OmO 也可以从项目和用户位置加载 skills，例如 <code>.codex/skills</code>、<code>~/.codex/skills</code>、<code>.opencode/skills</code>、<code>~/.config/opencode/skills</code>、<code>.claude/skills</code>、<code>.agents/skills</code> 和 <code>~/.agents/skills</code>。</p>\n<p>LazyCodex 安装 Codex Light setup：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai install\n</code></pre>\n<p>installer 会把 Codex marketplace plugin 作为 <code>omo@sisyphuslabs</code> 接入，同时保留易记的 public package alias。</p>\n<p>每个 skill 都带有深层 internal references，包括详细 playbooks、语言特定 recipes 和分阶段 instructions，但这些不是你需要阅读的内容。skill 激活时，harness 会替你读取。</p>\n<p>Command pillars 和背后的 disciplines 有更详细的页面：<a href=\"#ulw-plan\">ulw-plan</a>、<a href=\"#ulw-loop\">ulw-loop</a>、<a href=\"#start-work\">start-work</a>、<a href=\"#tdd\">TDD</a>、<a href=\"#manual-qa\">manual QA</a> 和 <a href=\"#git-workflow\">git workflow</a>。</p>\n",
  "ultrawork.md": "<p>ultrawork 是核心模式。在 prompt 任意位置加入 <code>ultrawork</code>（或短别名 <code>ulw</code>），类似加上 <code>ultrathink</code>，harness 就会切换到 maximum-precision、outcome-first、evidence-driven orchestration。Skills 会在内部激活；你不需要点名它们。</p>\n<blockquote>\n<p>&quot;Plan, execute, verify, and keep the evidence attached.&quot;</p>\n</blockquote>\n<p>原则很简单。Agent 说完成，不代表工作完成。只有<strong>可观察证据验证</strong>后，工作才算完成。</p>\n<h3 id=\"用法\">用法</h3>\n<p>只要在 prompt 中包含这个词即可。无需其他配置。</p>\n<pre><code class=\"language-text\">ulw add authentication\n</code></pre>\n<pre><code class=\"language-text\">fix the flaky checkout test ultrawork\n</code></pre>\n<p>harness 会读取任务，选择合适 skills（programming、debugging、refactor 等），并自动运行 evidence-bound loop。除非你想显式调用，例如 <code>$review-work</code> 或 <code>$ulw-research</code>，否则不需要自己选择 skills。</p>\n<h3 id=\"它会强制什么\">它会强制什么</h3>\n<ul>\n<li>Strict TDD：RED -&gt; GREEN -&gt; SURFACE -&gt; CLEAN</li>\n<li>至少 3 个真实 QA scenarios，按任务风险调整规模</li>\n<li>真实 manual-QA channels（HTTP call、tmux、browser、computer use、CLI stdout、data diff）</li>\n<li>binding verification gate，持续循环直到工作真正完成</li>\n</ul>\n<h3 id=\"与-ulw-loop-的关系\">与 <code>$ulw-loop</code> 的关系</h3>\n<p><code>$ulw-loop</code> 是 ultrawork discipline 的命令形式。最新流程会把 request、goals、success criteria 和 evidence ledger 存在 <code>.omo/ulw-loop</code> 下：</p>\n<table>\n<thead>\n<tr>\n<th>File</th>\n<th>Role</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><code>.omo/ulw-loop/brief.md</code></td>\n<td>原始请求和持久约束</td>\n</tr>\n<tr>\n<td><code>.omo/ulw-loop/goals.json</code></td>\n<td>Goals 和 success criteria</td>\n</tr>\n<tr>\n<td><code>.omo/ulw-loop/ledger.jsonl</code></td>\n<td>pass、fail、block、steering、checkpoint records</td>\n</tr>\n</tbody></table>\n<p>只说“done”不够。每条 success criterion 都需要从真实表面捕获的证据，并且证据必须通过，loop 才会停止。</p>\n<p>准确语法和 flags 见 <a href=\"#ulw-loop\"><code>$ulw-loop</code> command docs</a>。</p>\n<h3 id=\"失败上限\">失败上限</h3>\n<p>loop 不会无限运行。最新 <code>$ulw-loop</code> workflow 使用这些 caps：</p>\n<table>\n<thead>\n<tr>\n<th>Condition</th>\n<th>Limit</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>单个 goal 未完整通过时的 iteration 数</td>\n<td>5 cycles</td>\n</tr>\n<tr>\n<td>同一 criterion 上的同一 failure</td>\n<td>3 times</td>\n</tr>\n</tbody></table>\n<h3 id=\"证据优先而不是希望\">证据优先，而不是希望</h3>\n<p>loop 不会停在“我写了一些代码”。它会停在结果被证据确认时，也就是运行了什么检查、检查显示什么，而不是 agent 预期的状态报告。</p>\n<h3 id=\"在命令中的位置\">在命令中的位置</h3>\n<p><code>$ulw-loop</code> 是多个命令之一，每个命令对应不同形态的工作。</p>\n<p>典型流程是：<code>$ulw-plan</code> 产出 decision-complete plan，<code>$start-work</code> 按 checkpoint 执行它，<code>$ulw-loop</code> 让开放式工作持续运行直到 verifier 批准。每个命令的详细语法见 <a href=\"#ulw-plan\">Commands</a> section。</p>\n",
  "discipline-agents.md": "<p>LazyCodex 把 OmO 中的一个 discipline agent 移植到 Codex：<strong>Hephaestus</strong>，也就是 autonomous deep worker。Codex package 中没有 Sisyphus orchestrator；Hephaestus 是唯一角色，并通过只读 subagents 做并行探索，自己承担整次运行。</p>\n<h3 id=\"hephaestus-是什么\">Hephaestus 是什么</h3>\n<p>名字来自希腊锻造之神。它是目标导向的：你给目标，不给 step-by-step recipes，它会端到端执行。“The Legitimate Craftsman.” Methodical、thorough、obsessive，适合深层架构推理、复杂调试和跨领域综合。</p>\n<h3 id=\"已安装角色\">已安装角色</h3>\n<p>截至 <code>4.12.1</code>，会安装以下 roles。当 Codex 暴露 <code>agent_type</code> 时，会直接设置 role；否则 role description 会作为 fallback 写进 message。</p>\n<table>\n<thead>\n<tr>\n<th>Role</th>\n<th>Primary use</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><code>explorer</code></td>\n<td>代码库内部上下文：结构、调用流、测试位置。</td>\n</tr>\n<tr>\n<td><code>librarian</code></td>\n<td>外部文档、library contracts、最新 API research。</td>\n</tr>\n<tr>\n<td><code>plan</code></td>\n<td>计划草拟与任务拆分。</td>\n</tr>\n<tr>\n<td><code>momus</code> / <code>metis</code></td>\n<td>缺失决策、边界情况、风险 review。</td>\n</tr>\n<tr>\n<td><code>lazycodex-executor</code></td>\n<td>执行 plan 中的具体任务单元。</td>\n</tr>\n<tr>\n<td><code>lazycodex-code-reviewer</code></td>\n<td>实现后的代码质量 review。</td>\n</tr>\n<tr>\n<td><code>lazycodex-qa-executor</code></td>\n<td>基于真实执行的 QA。</td>\n</tr>\n<tr>\n<td><code>lazycodex-gate-reviewer</code></td>\n<td>完成前 verification gates。</td>\n</tr>\n<tr>\n<td><code>lazycodex-clone-fidelity-reviewer</code></td>\n<td>clone 与 sync 操作 fidelity 检查。</td>\n</tr>\n</tbody></table>\n<h3 id=\"父会话拥有最终判断\">父会话拥有最终判断</h3>\n<p>即使有多个 roles，完成判断也不会整体交给 sub-agent。父 Codex session 保留目标、约束和最终判断的所有权。Sub-agents 用来读取地形、发现缺口或辅助 review。</p>\n<h3 id=\"运行循环\">运行循环</h3>\n<p>Hephaestus 会在每个工作单元上运行短而紧的循环：</p>\n<ol>\n<li><strong>Explore</strong>：映射地形。用工具读代码，绝不猜测。写任何内容前先启动 2-5 个并行 explore subagents。</li>\n<li><strong>Plan</strong>：规划路线。通过 <code>update_plan</code> 记录要修改的文件、具体改动和依赖关系。</li>\n<li><strong>Implement</strong>：精确构建。即使 greenfield 里会写成另一种样子，也要做符合代码库风格的外科式编辑，包括命名、缩进、imports 和错误处理。</li>\n<li><strong>Verify</strong>：证明可用。对改动文件运行 LSP diagnostics、相关 tests 和 build，能并行就并行。</li>\n<li><strong>Manually QA</strong>：驱动 artifact 通过真实表面（HTTP call、tmux、browser），然后写最终消息。</li>\n</ol>\n<h3 id=\"non-goals\">Non-goals</h3>\n<ul>\n<li><strong>绝不信任 subagent 自报。</strong> 验证必须独立；child 说“done”不代表工作关闭。</li>\n<li><strong>你要代码时绝不只提 proposal。</strong> 除非你明确想要 plan 或 brainstorm，否则它会实现。</li>\n<li><strong>绝不猜测没读过的代码。</strong> 探索便宜，假设昂贵。</li>\n<li><strong>绝不在 turn 结束时留下未归档工作。</strong> 每个 plan step 都要 reconciled：<code>completed</code>、blocked（一行原因）或 removed（一行原因）。</li>\n</ul>\n<h3 id=\"delegation不是-orchestration\">Delegation，不是 orchestration</h3>\n<p>Hephaestus 保持父会话身份。做并行探索时，它会 spawn 只读 Codex subagent roles（<code>multi_agent_v1.spawn_agent</code>），并在 children 运行期间让父会话保持简短状态更新。它不会把运行交给另一个 orchestrator；它拥有目标，委派苦活，并亲自验证结果。</p>\n<h3 id=\"boulder-state\">Boulder state</h3>\n<p><code>$start-work</code> 使用 <code>.omo/boulder.json</code> 持久化进度，并用 Stop-hook continuation 保持 plan execution 前进。这是核心可见行为：checkboxes 推进，全部完成后打印 <strong>ORCHESTRATION COMPLETE</strong>。</p>\n<h3 id=\"boulder-从哪里来\">Boulder 从哪里来</h3>\n<p>完整 OmO 还有第二个 primary agent：<strong>Sisyphus</strong>，也就是带 <code>.omo/boulder.json</code> session continuity 的 orchestrator。Codex package 是只包含 Hephaestus 的轻量移植版，因此在 Codex 上，durable progress state 由 <a href=\"#start-work\"><code>$start-work</code></a> 和 Stop-hook continuation 写入 <code>.omo/boulder.json</code>，没有 Sisyphus orchestration layer。</p>\n<h3 id=\"继续阅读\">继续阅读</h3>\n<ul>\n<li><a href=\"#ultrawork\">ultrawork mode</a>：把循环变成 binding verified run 的模式。</li>\n<li><a href=\"#hooks-lifecycle\">Hooks 与生命周期</a>：Stop-hook 如何重新注入下一轮，直到 plan 完成。</li>\n</ul>\n",
  "model-routing.md": "<p>多模型路由会把运行中的不同部分交给最适合的模型，而不是所有事情都压在一个模型上。LazyCodex 会把 OmO 的 routing defaults 安装进 Codex，让严肃仓库不被单一 context window 或价格点卡住。</p>\n<h3 id=\"当前基线\">当前基线</h3>\n<p><code>4.12.1</code> bundled <code>model-catalog.json</code> 的默认 profile 以 <code>gpt-5.5</code> 为中心：</p>\n<table>\n<thead>\n<tr>\n<th>Profile</th>\n<th>Model</th>\n<th>Reasoning</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Default</td>\n<td><code>gpt-5.5</code></td>\n<td><code>high</code></td>\n</tr>\n<tr>\n<td>Plan mode</td>\n<td><code>gpt-5.5</code></td>\n<td><code>xhigh</code></td>\n</tr>\n<tr>\n<td>Worker</td>\n<td><code>gpt-5.5</code></td>\n<td><code>high</code></td>\n</tr>\n<tr>\n<td>Verifier</td>\n<td><code>gpt-5.5</code></td>\n<td><code>high</code></td>\n</tr>\n</tbody></table>\n<p>随着 Codex 和 OpenAI 更新模型阵容，你实际看到的模型名可能不同。本文档关注 LazyCodex <em>如何</em> 使用 model profiles，而不是比较具体模型。</p>\n<h3 id=\"什么会被路由\">什么会被路由</h3>\n<ul>\n<li><strong>Planning and exploration</strong> 会交给强 reasoning model，用于承载大上下文和权衡 trade-offs。</li>\n<li><strong>Implementation turns</strong> 会交给快速且能写代码的模型，承担大部分编辑循环。</li>\n<li><strong>Verification</strong> 会交给用作 oracle 的模型，选择重点是判断力而非吞吐。</li>\n<li><strong>Specialist skills</strong> 在受益于特定 profile 时，可以指向自己的模型。</li>\n</ul>\n<h3 id=\"为什么需要-role-profiles\">为什么需要 role profiles</h3>\n<p>Role-based profiles 会按工作性质分离：</p>\n<ul>\n<li>普通任务使用默认模型设置。</li>\n<li>Plan mode 可能需要更强 reasoning。</li>\n<li>Worker 和 verifier 分开，方便从不同角度检查同一结果。</li>\n</ul>\n<p>这会和 <a href=\"#discipline-agents\">Agent Roles</a> 配合。即使多个 roles 并行推进，每个 role 的 model profile 也会记录在 Codex configuration 中。</p>\n<h3 id=\"它如何适配-harness\">它如何适配 harness</h3>\n<p>Routing 是 <code>npx lazycodex-ai install</code> 接入 Codex 的 harness setup 一部分。它会检测可用订阅和 provider auth，再把 roles 映射到 models，这样你不需要逐个手工配置。</p>\n<h3 id=\"provider-认证\">Provider 认证</h3>\n<p>Auth 目标是 Codex 本身，不是 LazyCodex。Codex 登录后，installer 的 subscription detection 和 provider routing 会接管。如果让 LLM agent 运行安装，它会为你走同样的检测和选择流程。</p>\n<h3 id=\"用户注意事项\">用户注意事项</h3>\n<ul>\n<li>安装后看到的模型名可能和文档列出的不同。已安装的 <code>model-catalog.json</code> 和你的 Codex build 支持的模型优先。</li>\n<li>Model settings 会平衡质量和速度。随意降低会同时影响 planning、review 和 QA 质量。</li>\n<li>不确定时，先检查 install state 和 Codex config。</li>\n</ul>\n<h3 id=\"自定义\">自定义</h3>\n<p>Routing 和 provider settings 位于配置中。哪个 role 使用哪个模型，以及如何按项目覆盖默认值，见<a href=\"#configuration\">配置</a>。</p>\n",
  "hooks-lifecycle.md": "<p>Hooks 和 lifecycle 是 harness 让长任务无需你每轮重新提示也能继续推进的方式。OmO 会把 lifecycle hooks 安装进 Codex，用来观察每个 turn 并决定下一步。</p>\n<h3 id=\"触发矩阵\">触发矩阵</h3>\n<table>\n<thead>\n<tr>\n<th>Event</th>\n<th>What fires</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><code>SessionStart</code></td>\n<td>Project rules loading、telemetry、auto-update check、bootstrap provisioning、CodeGraph bootstrap。</td>\n</tr>\n<tr>\n<td><code>UserPromptSubmit</code></td>\n<td>Project rules re-injection、ultrawork trigger detection、<code>$ulw-loop</code> steering。</td>\n</tr>\n<tr>\n<td><code>PreToolUse</code></td>\n<td>Bash calls 的 Git Bash MCP guidance、goal creation 上的 <code>$ulw-loop</code> goal budget protection。</td>\n</tr>\n<tr>\n<td><code>PostToolUse</code></td>\n<td>Comment checker、LSP diagnostics、CodeGraph init guidance、<code>apply_patch</code> rule matching、thread title hygiene。</td>\n</tr>\n<tr>\n<td><code>Stop</code> / <code>SubagentStop</code></td>\n<td><code>$start-work</code> continuation、LazyCodex executor evidence verification。</td>\n</tr>\n<tr>\n<td><code>PostCompact</code></td>\n<td>Git Bash notification、project rules 和 LSP diagnostics cache resets。</td>\n</tr>\n</tbody></table>\n<h3 id=\"核心机制\">核心机制</h3>\n<p>当一个 turn 结束时，Stop-hook 会触发。如果 plan 仍在进行，hook 会自动重新注入下一轮，agent 从 durable progress state 继续，而不是等你说“continue”。只有当 plan 完成，或某个 gate 以需要人工介入的方式失败时，运行才会停止。</p>\n<h3 id=\"进度在哪里\">进度在哪里</h3>\n<p>进度状态写入 <code>.omo/boulder.json</code>，并跨 turns 和 sessions 保留。这让 <a href=\"#start-work\"><code>$start-work</code></a> 能在重启后恢复计划，也让 <a href=\"#ulw-loop\"><code>$ulw-loop</code></a> 对真实进度保持诚实。</p>\n<h3 id=\"批准与信任\">批准与信任</h3>\n<p>Hooks 在批准前绝不会运行。安装后的首次启动，Codex startup review 会要求你批准 omo hooks。每次升级后 hooks 会显示为 <strong>Modified</strong>，这是预期行为，因为 plugin 文件变了，之前的 trust hashes 不再匹配；重新批准后，下一个 session 会在新版本上重新运行 bootstrap。</p>\n<h3 id=\"证据门禁\">证据门禁</h3>\n<p>执行期间，lifecycle 会在步骤关闭前强制五个 evidence gates：plan reread、automated verification、manual-QA、adversarial QA 和 cleanup。无法通过门禁的步骤不会前进，不管状态文本声称什么。</p>\n<h3 id=\"已安装组件\">已安装组件</h3>\n<p>上面的 hooks 是进入以下 installed components 的轻量入口：</p>\n<table>\n<thead>\n<tr>\n<th>Component</th>\n<th>Responsibility</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><code>rules</code></td>\n<td>Session start、prompt submit、<code>apply_patch</code> 和 post-compact 阶段的 project rules。</td>\n</tr>\n<tr>\n<td><code>bootstrap</code></td>\n<td>LazyCodex install state 和 provisioning checks。</td>\n</tr>\n<tr>\n<td><code>telemetry</code></td>\n<td>Session start recording。</td>\n</tr>\n<tr>\n<td><code>comment-checker</code></td>\n<td>Edit-like tool calls 后的 comment feedback。</td>\n</tr>\n<tr>\n<td><code>lsp</code></td>\n<td>Edit-like tool calls 后的 language-server diagnostics，以及 compact 后的 cache reset。</td>\n</tr>\n<tr>\n<td><code>ultrawork</code></td>\n<td>Prompt submit 阶段的 ultrawork trigger detection。</td>\n</tr>\n<tr>\n<td><code>ulw-loop</code></td>\n<td>Loop steering 和 goal budget protection。</td>\n</tr>\n<tr>\n<td><code>start-work-continuation</code></td>\n<td><code>$start-work</code> execution continuation。</td>\n</tr>\n<tr>\n<td><code>git-bash</code></td>\n<td>Bash calls 和 post-compact 阶段的 Git Bash MCP guidance。</td>\n</tr>\n<tr>\n<td><code>codegraph</code></td>\n<td>CodeGraph bootstrap 和 init guidance。</td>\n</tr>\n<tr>\n<td><code>teammode</code></td>\n<td>Thread title hygiene checks。</td>\n</tr>\n<tr>\n<td><code>lazycodex-executor-verify</code></td>\n<td>Sub-agent evidence verification。</td>\n</tr>\n</tbody></table>\n<h3 id=\"继续阅读\">继续阅读</h3>\n<ul>\n<li><a href=\"#ultrawork\">ultrawork mode</a>：把这些 gates 变成 binding loop 的模式。</li>\n<li><a href=\"#configuration\">配置</a>：如何调整 hook behavior 和 lifecycle defaults。</li>\n</ul>\n",
  "git-workflow.md": "<p>Git 工作通过 <code>git-master</code> skill 执行。它强调精确、保守和证据优先：agent 会先读取仓库状态，再做任何推断；除非你明确要求，否则不会 commit、rebase、push、force-push、reset 或 stash-pop。</p>\n<h3 id=\"模式门禁\">模式门禁</h3>\n<p>每个请求都会先分类：</p>\n<ul>\n<li><code>COMMIT</code>：stage 并 commit 本地改动。</li>\n<li><code>REBASE</code>：rebase、squash、fixup、autosquash、重排或拆分分支历史。</li>\n<li><code>HISTORY</code>：回答某项改动何时、何处、由谁、为什么或由哪个 commit 引入。</li>\n<li><code>STATUS</code>：只检查 branch、diff 或 working tree 状态，不修改任何内容。</li>\n</ul>\n<p>调查型请求会报告发现后停止。</p>\n<h3 id=\"commit-模式\">Commit 模式</h3>\n<p>Commit 会按行为、模块和可回滚性保持原子性。agent 会从最近历史中识别 message 风格（主导模式、语言、大小写；除非仓库本身使用 Conventional Commits，否则不会默认采用它），检查完整 diff，并按路径或 hunk stage，确保每个 commit 只包含自己的组。实现和直接测试放在一起；无关关注点拆成不同 commit。每次 commit 前检查 <code>git diff --staged --stat</code>，commit 后检查 <code>git log -1 --oneline</code>。</p>\n<h3 id=\"rebase-与-merge\">Rebase 与 merge</h3>\n<p>历史重写会影响共享协作。除非你明确点名该操作，否则 agent 不会 rebase 或重写 <code>main</code>、<code>master</code>、<code>dev</code>、release 或受保护分支。如果 commit 可能已经 push，force-push 前会先询问，并使用 <code>--force-with-lease</code>，绝不使用裸 <code>--force</code>。冲突按意图解决，绝不盲目选择 ours/theirs。如果 rebase 出错，第一步是 <code>git rebase --abort</code>；reflog 是恢复路径，使用前会先说明。</p>\n<h3 id=\"push-安全\">Push 安全</h3>\n<p>任何写历史操作前，都要确认：当前分支已知，dirty work 已归属清楚，upstream/pushed 状态已知或明确未知，操作符合你的请求，并且恢复路径已知。完成后会运行最便宜且相关的验证，并明确留下工作树状态。</p>\n<h3 id=\"继续阅读\">继续阅读</h3>\n<ul>\n<li><a href=\"#start-work\">start-work</a>：把计划工作落成 commit 的执行器。</li>\n<li><a href=\"#manual-qa\">手动 QA</a>：一个步骤被允许关闭前必须通过的门禁。</li>\n</ul>\n",
  "tdd.md": "<p>严格的测试驱动开发，是让 harness 可以不靠希望就把工作称为“完成”的纪律。每项改动都按 red -&gt; green -&gt; refactor 的顺序推进。顺序反过来，就是在写 speculative code。</p>\n<h3 id=\"顺序\">顺序</h3>\n<ol>\n<li><strong>Red.</strong> 写一个失败测试，用 <code>Given / When / Then</code> 说明行为。运行它，确认失败原因正确，不是拼写错误或缺少 import。</li>\n<li><strong>Green.</strong> 写最少代码让测试通过。第一个 case 通过前，不要加第二个；第二个 case 是下一轮 red。</li>\n<li><strong>Refactor.</strong> 测试变绿后，才大胆重构。如果测试让重构很困难，说明测试本身不好，先修测试再修代码。</li>\n</ol>\n<h3 id=\"测试金字塔\">测试金字塔</h3>\n<p>每个功能都要带上三层测试：大量快速 unit tests（覆盖 happy、edge、boundary 和 error paths 的纯函数正确性，每个 &lt; 10ms），一些通过 testcontainers 或 httptest 连接真实下游的 integration tests（每个 &lt; 1s），以及少量 E2E scenarios，通过真实表面驱动 binary 并断言可观察结果。没有 E2E 覆盖的功能还没完成，即使所有 unit tests 都通过。</p>\n<h3 id=\"必须确定性否则就是坏的\">必须确定性，否则就是坏的</h3>\n<p>一个 10 次通过 9 次的测试，就是有 10% 的失败率。除非时间本身就是被测系统，否则测试体里禁止使用 <code>setTimeout(resolve, N)</code>、<code>await sleep(N)</code> 或“等够久让 X 发生”。替代方案是 subscribe-first、timeout-bound：先注册 listener，再触发事件，并与显式 circuit breaker 竞争；超时时要给出有用错误信息。整个 repo 必须能在单个进程、一次运行里通过 <code>bun test</code>，不靠隔离 flag，也不靠 retries。</p>\n<h3 id=\"prompt-测试断言行为不断言文本\">Prompt 测试断言行为，不断言文本</h3>\n<p>测试构造 LLM prompt 的代码时，不要固定当前措辞（例如 <code>toContain(&quot;You are Sisyphus&quot;)</code>、<code>toMatchSnapshot</code>、<code>toBe(EXPECTED_PROMPT)</code>）。应断言逻辑保证的结构性不变量，例如 conditional branch、negative branch、redaction、skill inclusion/exclusion。测试会破坏行为的东西，不测试只会让 diff 变动的东西。</p>\n<h3 id=\"五个证据门禁\">五个证据门禁</h3>\n<p>执行期间，lifecycle 会在步骤关闭前强制五个门禁：plan reread、automated verification、<a href=\"#manual-qa\">manual QA</a>、adversarial QA 和 cleanup。无法通过门禁的步骤不会前进，不管状态文本声称什么。</p>\n<h3 id=\"继续阅读\">继续阅读</h3>\n<ul>\n<li><a href=\"#ultrawork\">ultrawork mode</a>：让循环具备约束力的模式。</li>\n<li><a href=\"#start-work\">start-work</a>：五个门禁在每个 checkbox 上落地的地方。</li>\n</ul>\n",
  "manual-qa.md": "<p>手动 QA 是把“它应该能工作”变成“它确实能工作，这是证据”的门禁。步骤不会因为状态字符串而关闭；它需要来自真实表面的捕获 artifact，再加上 adversarial pass 和 cleanup receipt。两个 skill 承担这件事：<code>visual-qa</code> 负责 UI 表面，<code>review-work</code> 负责整体实现 review。</p>\n<h3 id=\"visual-qa\">visual-qa</h3>\n<p>对于你构建或修改的任何 UI，无论是网页还是 TUI，visual QA 都会运行三个阶段。首先用内置 diff 脚本捕获客观参考证据：截图用 <code>image-diff</code>（similarity score、hotspots、<code>alphaChannelIntact</code>），终端捕获用 <code>tui-check</code>（<code>maxWidth</code>、<code>overflowLines</code>、<code>borderMisaligned</code>、宽字符列）。这些 JSON 是参考证据，不是最终判定。</p>\n<p>然后并行派发两个只读 oracle subagents：</p>\n<ul>\n<li><strong>Pass A - design-system and functional integrity.</strong> 更深、更严格的一轮。证明界面是真正由一致 token 和复用 primitives 驱动的 design-system 实现，而不是只用于 mock 的屏幕，也不是把位图贴出来伪装成 live elements。它会检查 alpha、响应式以及用户期望功能是否真的可用。</li>\n<li><strong>Pass B - visual fidelity and CJK precision.</strong> 更聚焦的一轮。直接打开截图，并检查源码/内容是否存在裁剪、baseline 下沉、字形破损，以及韩文/日文/中文精度问题。</li>\n</ul>\n<p>harness 会把两轮结果综合成一个带定位 findings 的 <code>PASS | REVISE | FAIL</code> verdict。</p>\n<h3 id=\"review-work\">review-work</h3>\n<p>完成有分量的实现后，<code>review-work</code> 会启动五个并行后台 subagents。五个都通过，review 才通过；任何一个失败，整体 review 就失败。</p>\n<table>\n<thead>\n<tr>\n<th>Lane</th>\n<th>Role</th>\n<th>Asks</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>1</td>\n<td>Goal Verifier</td>\n<td>Did we build what was asked?</td>\n</tr>\n<tr>\n<td>2</td>\n<td>QA Executor</td>\n<td>Does it actually work?</td>\n</tr>\n<tr>\n<td>3</td>\n<td>Code Reviewer</td>\n<td>Is the code well-written?</td>\n</tr>\n<tr>\n<td>4</td>\n<td>Security Auditor</td>\n<td>Is it secure?</td>\n</tr>\n<tr>\n<td>5</td>\n<td>Context Miner</td>\n<td>Did we miss any context?</td>\n</tr>\n</tbody></table>\n<p>Oracle lanes 会在 prompt 中收到 diff 和完整文件内容（它们不能自行读文件）。崩溃、<code>BLOCKED:</code> 或结论不明的一路永远不算通过；它会以更小范围重启，如果重试预算耗尽，就保持 <code>INCONCLUSIVE</code>，同时仍输出聚合结果。</p>\n<h3 id=\"adversarial-classes-与-cleanup\">Adversarial classes 与 cleanup</h3>\n<p>在 <a href=\"#start-work\"><code>$start-work</code></a> 内，每个 checkbox 都会探测所有适用的 adversarial class，并为每项记录可观察结果；跳过的 class 需要在 ledger 里给出一行不适用原因。每个 QA 资源，包括 scripts、tmux assets、browser sessions、PIDs、ports、containers、temp dirs，都会登记成自己的 teardown todo，并以捕获 receipt 执行。不会留下仍在运行的 QA asset。</p>\n<h3 id=\"继续阅读\">继续阅读</h3>\n<ul>\n<li><a href=\"#tdd\">TDD</a>：手动 QA 之前的自动化验证门禁。</li>\n<li><a href=\"#ulw-loop\">ulw-loop</a>：完成条件依赖此门禁的循环。</li>\n</ul>\n",
  "configuration.md": "<p>LazyCodex 是 <a href=\"https://github.com/code-yeongyu/oh-my-openagent\">OmO</a> 之上的轻量分发层。installer 写入 Codex 的配置控制 model routing、hooks、skills，以及 harness 使用的 agent roles。</p>\n<h3 id=\"默认零配置\">默认零配置</h3>\n<p>LazyCodex 带着合理默认值，安装后即可使用。只有当默认值不适合你的仓库时，才需要触碰配置。无需预先创建配置文件，安装后直接开始工作即可。</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai install\n</code></pre>\n<p>不要全局安装，始终使用 <code>npx</code>。这相当于 <code>npx --yes --package oh-my-openagent omo install --platform=codex</code> 的简写。</p>\n<h3 id=\"codex-target\">Codex target</h3>\n<p>LazyCodex 始终以 Codex 为目标。<code>--platform=codex</code> 参数已经内置在 <code>lazycodex-ai</code> bin 的 <code>install</code> 路径中，因此 harness 会连接 <a href=\"https://github.com/openai/codex\">OpenAI Codex CLI</a>，而不是其他平台。你不需要自己传 <code>--platform</code>。</p>\n<p><strong>前置条件：</strong></p>\n<ul>\n<li><a href=\"https://nodejs.org\">Node.js</a>：任一维护中的 LTS；<code>npx</code> 随 Node/npm 提供。不需要 Bun。</li>\n<li>已登录的 <a href=\"https://github.com/openai/codex\">OpenAI Codex CLI</a> 或 Codex App。</li>\n</ul>\n<h3 id=\"配置在哪里\">配置在哪里</h3>\n<ul>\n<li>installer 连接和写入的 Codex configuration。</li>\n<li>项目级 <code>AGENTS.md</code> 与 rule files，用来按仓库塑造 agent 行为。</li>\n<li>用户级 skill locations，例如 <code>~/.config/opencode/skills</code> 和 <code>~/.agents/skills</code>。</li>\n</ul>\n<h3 id=\"install-flags\">Install flags</h3>\n<p>默认 installer 是交互式 TUI。它会检测订阅，帮助选择模型，并引导 provider auth。</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai install\n</code></pre>\n<p>如果需要完全自主、无 prompt 的安装，两个 flag 要一起加：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai install --no-tui --codex-autonomous\n</code></pre>\n<p><code>--no-tui --codex-autonomous</code> 会透传给 <code>omo install</code>，<code>lazycodex-ai</code> bin 自身不解释它们。强烈建议让 LLM agent 运行安装：agent 会自动处理订阅检测、模型选择和 provider auth。</p>\n<h3 id=\"可以调整什么\">可以调整什么</h3>\n<ul>\n<li><strong>Model routing</strong>：规划、实现、验证和 specialist skills 分别使用哪个模型。installer 会根据检测到的订阅设置合理默认值；项目需要不同 profile 时可按 role 覆盖。</li>\n<li><strong>Hooks and lifecycle</strong>：Stop-hook 是否自动继续 plan、iteration caps（ultrawork mode 为 500，normal mode 为 100），以及完成如何 gated。</li>\n<li><strong>Skills</strong>：哪些 skills active，以及从哪里加载。</li>\n<li><strong>Agent</strong>：Hephaestus autonomous deep worker，以及它的 model/prompt overrides。Codex package 是只包含 Hephaestus 的轻量移植版；不包含完整 OmO 的 Sisyphus orchestrator。</li>\n</ul>\n<h3 id=\"hooks-与生命周期\">Hooks 与生命周期</h3>\n<p>Hooks 在批准前绝不会运行。安装后的首次启动，Codex startup review 会要求你批准 <code>omo</code> hooks。每次升级后 hooks 会显示为 <strong>Modified</strong>，这是预期行为，因为 plugin 文件变了，之前的 trust hashes 不再匹配。重新批准后，下一个 session 会运行新版本 bootstrap。</p>\n<h3 id=\"provider-与模型设置\">Provider 与模型设置</h3>\n<p>Provider 和 model settings 由 OmO 管理，不由 LazyCodex 直接管理。安装期间，OmO 会读取 Codex configuration 和 bundled <code>model-catalog.json</code> 来对齐 model profiles，这就是 model routing layer。</p>\n<ul>\n<li>installer 会替你连接 provider auth。推荐让 agent 运行安装。</li>\n<li>Provider keys 从环境读取。所有 <code>*_API_KEY</code> 和 OAuth credentials 都是 secrets，绝不要记录到日志或提交到仓库。</li>\n<li>安装之外更深的 provider/model tuning 遵循 OmO 约定。provider environment variables 和 model resolution rules 见 OmO 文档。</li>\n</ul>\n<blockquote>\n<p>不要编造 provider keys。按所选 provider 的文档通过环境提供 key，并让 installer 的 routing 解释它。</p>\n</blockquote>\n<h3 id=\"诊断配置\">诊断配置</h3>\n<p>如果状态看起来 pending 或 degraded，运行：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai doctor\n</code></pre>\n<p>它会说明哪里配置错误、原因是什么，并指出需要修复的具体字段。它会检查 plugin cache、hooks、MCP servers、agent roles 和 Codex config state。</p>\n<h3 id=\"重新运行安装\">重新运行安装</h3>\n<p>installer 是幂等的。重新运行 <code>npx lazycodex-ai install</code> 会在现有内容上重写 config blocks、agent roles 和 bin links，因此手工编辑配置后也可以安全重跑。</p>\n<p>installer 暴露的所有命令见 <a href=\"#cli\">CLI reference</a>。</p>\n",
  "deploy.md": "<p><code>lazycodex.ai</code> 文档站会自动部署到 Cloudflare Workers。Web 没有手动发布步骤；只要推送到 <code>main</code> 且改动触及 web package，就会发布。</p>\n<h3 id=\"触发条件\">触发条件</h3>\n<p><code>Web Deploy (Cloudflare Workers)</code> workflow 会在推送到 <code>main</code> 且 <code>packages/web/**</code> 或 workflow 文件本身发生变化时运行，也支持手动 <code>workflow_dispatch</code>。按 ref 分组的 concurrency 会串行化运行，并且不会取消正在进行的部署。</p>\n<h3 id=\"构建\">构建</h3>\n<p>在 <code>packages/web</code> 内，prebuild 步骤会从 <code>content/docs/*.md</code> 重新生成 <code>lib/docs-content.generated.ts</code>。随后站点用面向 Cloudflare 的 OpenNext 构建（<code>pnpm exec opennextjs-cloudflare build</code>）。</p>\n<h3 id=\"部署\">部署</h3>\n<p><code>cloudflare/wrangler-action@v4</code> 会针对 <code>web-production</code> 环境运行 <code>wrangler deploy</code>（提供 environment 时运行 <code>deploy --env &lt;environment&gt;</code>）。该环境的 URL 是 <code>https://lazycodex.ai</code>。</p>\n<h3 id=\"部署后冒烟检查\">部署后冒烟检查</h3>\n<p>任一检查失败都会让 workflow 失败：</p>\n<ul>\n<li>Apex <code>https://lazycodex.ai/</code> 返回 <code>200</code>。</li>\n<li><code>www.lazycodex.ai</code>、<code>lazycodex.dev</code> 和 <code>www.lazycodex.dev</code> 都返回 <code>301</code>，并重定向到 <code>https://lazycodex.ai</code>。</li>\n</ul>\n<p>PageSpeed Insights 会在移动端和桌面端审计线上 URL 的 Lighthouse performance、accessibility、best-practices 和 SEO 100/100/100/100。这里它是非阻塞检查，因为 PSI 共享额度会限制频繁 CI；真正门禁级的 Lighthouse 检查在 <code>web-ci.yml</code> 中通过真实 Playwright Chromium 运行。</p>\n<h3 id=\"本地预览\">本地预览</h3>\n<pre><code class=\"language-bash\">cd packages/web\npnpm preview   # opennextjs-cloudflare build &amp;&amp; preview\npnpm deploy    # build &amp;&amp; deploy (requires Cloudflare auth)\n</code></pre>\n<h3 id=\"继续阅读\">继续阅读</h3>\n<ul>\n<li><a href=\"#skills\">Skills</a>：文档站覆盖的能力。</li>\n<li><a href=\"#configuration\">配置</a>：会影响构建的可调参数。</li>\n</ul>\n",
  "cli.md": "<p><code>lazycodex-ai</code> CLI 是安装和诊断 harness 的入口。它应该通过 <code>npx</code> 运行，绝不要全局安装。</p>\n<h3 id=\"转发到-omo\">转发到 OmO</h3>\n<p>bin 会读取参数并转发给 <code>oh-my-openagent</code>。<code>install</code> 子命令会被特殊处理，以锁定 Codex platform target；其他参数原样透传。</p>\n<p><strong>install</strong> 会展开为：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai install\n# → npx --yes --package oh-my-openagent omo install --platform=codex\n</code></pre>\n<p><code>install</code> 后面的参数会逐字追加：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai install --no-tui --codex-autonomous\n# → npx --yes --package oh-my-openagent omo install --platform=codex --no-tui --codex-autonomous\n</code></pre>\n<p><strong>其他子命令</strong>不会锁定 platform，直接转发：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai &lt;args...&gt;\n# → npx --yes --package oh-my-openagent omo &lt;args...&gt;\n</code></pre>\n<h3 id=\"install\">install</h3>\n<pre><code class=\"language-bash\">npx lazycodex-ai install\n</code></pre>\n<p>一次性把 OmO agent harness 安装进 Codex：commands、skills、hooks、model routing 和 verification defaults。</p>\n<p>如果要跳过 TUI，让 installer 自主运行：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai install --no-tui --codex-autonomous\n</code></pre>\n<h3 id=\"dry-run\"><code>--dry-run</code></h3>\n<p>把 <code>--dry-run</code> 放在<strong>第一个</strong>参数位置，可以打印解析后的 <code>npx</code> 命令而不执行：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai --dry-run install --no-tui --codex-autonomous\n</code></pre>\n<p>输出：</p>\n<pre><code class=\"language-text\">npx --yes --package oh-my-openagent omo install --platform=codex --no-tui --codex-autonomous\n</code></pre>\n<p>转发前会移除 <code>--dry-run</code>，因此剩余参数会像真实运行一样解释。执行前可用它确认准确的 <code>omo</code> 调用。</p>\n<h3 id=\"doctor\">doctor</h3>\n<pre><code class=\"language-bash\">npx lazycodex-ai doctor\n</code></pre>\n<p>打印健康报告：已配置什么、缺少什么以及原因。它会检查 plugin cache、hooks、MCP servers、agent roles 和 Codex config state。当 hook pending、skill 未加载或 routing 看起来异常时，先运行它。</p>\n<h3 id=\"前置条件\">前置条件</h3>\n<ul>\n<li><a href=\"https://nodejs.org\">Node.js</a>：任一维护中的 LTS；<code>npx</code> 随 Node/npm 提供。installer <strong>不需要</strong> Bun。</li>\n<li>已登录的 <a href=\"https://github.com/openai/codex\">OpenAI Codex CLI</a> 或 Codex app。</li>\n</ul>\n<blockquote>\n<p>不要使用 <code>npm install -g</code> 或 <code>bun add -g</code>。始终通过 <code>npx</code> 调用。</p>\n</blockquote>\n<h3 id=\"marketplace-替代路径\">Marketplace 替代路径</h3>\n<p>作为一个附加的实验性路径，你也可以在 Codex 内安装：输入 <code>/plugins</code>，打开 <strong>Add Marketplace</strong> tab，输入 <code>https://github.com/code-yeongyu/lazycodex</code>，然后从 <code>sisyphuslabs</code> marketplace 安装 <code>omo</code>。或者用 CLI：</p>\n<pre><code class=\"language-bash\">codex plugin marketplace add https://github.com/code-yeongyu/lazycodex\ncodex plugin add omo@sisyphuslabs\n</code></pre>\n<p>使用 <code>codex plugin marketplace upgrade sisyphuslabs</code> 升级。升级后 hooks 会显示为 <strong>Modified</strong>，这是预期行为，因为 plugin 文件变了，之前的 trust hashes 不再匹配。重新批准后，下一个 session 会运行新版本 bootstrap。</p>\n<p>上面的 npx installer 仍是主路径。完整流程见<a href=\"#installation\">安装</a>。</p>\n<h3 id=\"退出行为\">退出行为</h3>\n<p>bin 会用继承的 stdio 执行解析后的命令，并以该命令的 status code 退出。如果 <code>npx</code> 本身启动失败，它会打印错误并以非零状态退出。</p>\n<h3 id=\"session-内命令\">Session 内命令</h3>\n<p>安装后，LazyCodex 会在 Codex 内注册 OmO commands。它们是在 Codex 输入框中调用的 <code>$command</code>，不是 shell commands。语法和使用流程集中在 <a href=\"#ulw-plan\">Commands</a> section。</p>\n"
};

export type DocHeading = { level: number; id: string; text: string };
export const DOC_TOC: Record<string, DocHeading[]> = {
  "installation.md": [
    {
      "level": 3,
      "id": "前置条件",
      "text": "前置条件"
    },
    {
      "level": 3,
      "id": "安装",
      "text": "安装"
    },
    {
      "level": 3,
      "id": "从-codex-marketplace-安装实验性",
      "text": "从 Codex marketplace 安装（实验性）"
    },
    {
      "level": 3,
      "id": "authentication",
      "text": "Authentication"
    },
    {
      "level": 3,
      "id": "windows",
      "text": "Windows"
    },
    {
      "level": 3,
      "id": "让-agent-替你安装",
      "text": "让 agent 替你安装"
    }
  ],
  "recommended-environment.md": [
    {
      "level": 3,
      "id": "操作系统",
      "text": "操作系统"
    },
    {
      "level": 3,
      "id": "安装前",
      "text": "安装前"
    },
    {
      "level": 3,
      "id": "作者建议",
      "text": "作者建议"
    }
  ],
  "overview.md": [
    {
      "level": 3,
      "id": "轻量分发",
      "text": "轻量分发"
    },
    {
      "level": 3,
      "id": "会安装什么",
      "text": "会安装什么"
    },
    {
      "level": 3,
      "id": "它来自哪里",
      "text": "它来自哪里"
    },
    {
      "level": 3,
      "id": "你会得到什么",
      "text": "你会得到什么"
    },
    {
      "level": 3,
      "id": "记住这四个",
      "text": "记住这四个"
    },
    {
      "level": 3,
      "id": "harness-工作流",
      "text": "Harness 工作流"
    },
    {
      "level": 3,
      "id": "如何组合在一起",
      "text": "如何组合在一起"
    }
  ],
  "getting-started.md": [
    {
      "level": 3,
      "id": "前置条件",
      "text": "前置条件"
    },
    {
      "level": 3,
      "id": "安装",
      "text": "安装"
    },
    {
      "level": 3,
      "id": "authentication",
      "text": "Authentication"
    },
    {
      "level": 3,
      "id": "四个命令",
      "text": "四个命令"
    },
    {
      "level": 3,
      "id": "第一次运行",
      "text": "第一次运行"
    },
    {
      "level": 3,
      "id": "如何选择",
      "text": "如何选择"
    },
    {
      "level": 3,
      "id": "一个典型会话",
      "text": "一个典型会话"
    }
  ],
  "faq.md": [
    {
      "level": 3,
      "id": "安装与环境",
      "text": "安装与环境"
    },
    {
      "level": 3,
      "id": "第一次使用",
      "text": "第一次使用"
    },
    {
      "level": 3,
      "id": "执行与验证",
      "text": "执行与验证"
    },
    {
      "level": 3,
      "id": "冲突与限制",
      "text": "冲突与限制"
    }
  ],
  "init-deep.md": [
    {
      "level": 3,
      "id": "它会产出什么",
      "text": "它会产出什么"
    },
    {
      "level": 3,
      "id": "什么时候运行",
      "text": "什么时候运行"
    },
    {
      "level": 3,
      "id": "如何使用",
      "text": "如何使用"
    },
    {
      "level": 3,
      "id": "初始化之后",
      "text": "初始化之后"
    }
  ],
  "ulw-plan.md": [
    {
      "level": 3,
      "id": "流程",
      "text": "流程"
    },
    {
      "level": 3,
      "id": "输出",
      "text": "输出"
    },
    {
      "level": 3,
      "id": "handoff",
      "text": "Handoff"
    }
  ],
  "start-work.md": [
    {
      "level": 3,
      "id": "工作方式",
      "text": "工作方式"
    },
    {
      "level": 3,
      "id": "语法",
      "text": "语法"
    },
    {
      "level": 3,
      "id": "完成",
      "text": "完成"
    }
  ],
  "ulw-loop.md": [
    {
      "level": 3,
      "id": "工作方式",
      "text": "工作方式"
    },
    {
      "level": 3,
      "id": "bootstrap",
      "text": "Bootstrap"
    },
    {
      "level": 3,
      "id": "manual-qa-channels",
      "text": "Manual-QA channels"
    },
    {
      "level": 3,
      "id": "语法",
      "text": "语法"
    },
    {
      "level": 3,
      "id": "限制",
      "text": "限制"
    },
    {
      "level": 3,
      "id": "继续阅读",
      "text": "继续阅读"
    }
  ],
  "skills.md": [
    {
      "level": 3,
      "id": "commands",
      "text": "Commands"
    },
    {
      "level": 3,
      "id": "skill-index",
      "text": "Skill index"
    },
    {
      "level": 3,
      "id": "skill-highlights",
      "text": "Skill highlights"
    },
    {
      "level": 3,
      "id": "review-work",
      "text": "review-work"
    },
    {
      "level": 3,
      "id": "remove-ai-slops",
      "text": "remove-ai-slops"
    },
    {
      "level": 3,
      "id": "frontend",
      "text": "frontend"
    },
    {
      "level": 3,
      "id": "programming",
      "text": "programming"
    },
    {
      "level": 3,
      "id": "debugging",
      "text": "debugging"
    },
    {
      "level": 3,
      "id": "refactor",
      "text": "refactor"
    },
    {
      "level": 3,
      "id": "visual-qa",
      "text": "visual-qa"
    },
    {
      "level": 3,
      "id": "git-master",
      "text": "git-master"
    },
    {
      "level": 3,
      "id": "ulw-research",
      "text": "ulw-research"
    },
    {
      "level": 3,
      "id": "lsp",
      "text": "LSP"
    },
    {
      "level": 3,
      "id": "ast-grep",
      "text": "AST-grep"
    },
    {
      "level": 3,
      "id": "lsp-setup",
      "text": "lsp-setup"
    },
    {
      "level": 3,
      "id": "rules",
      "text": "rules"
    },
    {
      "level": 3,
      "id": "comment-checker",
      "text": "comment-checker"
    },
    {
      "level": 3,
      "id": "skills-在哪里",
      "text": "Skills 在哪里"
    }
  ],
  "ultrawork.md": [
    {
      "level": 3,
      "id": "用法",
      "text": "用法"
    },
    {
      "level": 3,
      "id": "它会强制什么",
      "text": "它会强制什么"
    },
    {
      "level": 3,
      "id": "与-ulw-loop-的关系",
      "text": "与 $ulw-loop 的关系"
    },
    {
      "level": 3,
      "id": "失败上限",
      "text": "失败上限"
    },
    {
      "level": 3,
      "id": "证据优先而不是希望",
      "text": "证据优先，而不是希望"
    },
    {
      "level": 3,
      "id": "在命令中的位置",
      "text": "在命令中的位置"
    }
  ],
  "discipline-agents.md": [
    {
      "level": 3,
      "id": "hephaestus-是什么",
      "text": "Hephaestus 是什么"
    },
    {
      "level": 3,
      "id": "已安装角色",
      "text": "已安装角色"
    },
    {
      "level": 3,
      "id": "父会话拥有最终判断",
      "text": "父会话拥有最终判断"
    },
    {
      "level": 3,
      "id": "运行循环",
      "text": "运行循环"
    },
    {
      "level": 3,
      "id": "non-goals",
      "text": "Non-goals"
    },
    {
      "level": 3,
      "id": "delegation不是-orchestration",
      "text": "Delegation，不是 orchestration"
    },
    {
      "level": 3,
      "id": "boulder-state",
      "text": "Boulder state"
    },
    {
      "level": 3,
      "id": "boulder-从哪里来",
      "text": "Boulder 从哪里来"
    },
    {
      "level": 3,
      "id": "继续阅读",
      "text": "继续阅读"
    }
  ],
  "model-routing.md": [
    {
      "level": 3,
      "id": "当前基线",
      "text": "当前基线"
    },
    {
      "level": 3,
      "id": "什么会被路由",
      "text": "什么会被路由"
    },
    {
      "level": 3,
      "id": "为什么需要-role-profiles",
      "text": "为什么需要 role profiles"
    },
    {
      "level": 3,
      "id": "它如何适配-harness",
      "text": "它如何适配 harness"
    },
    {
      "level": 3,
      "id": "provider-认证",
      "text": "Provider 认证"
    },
    {
      "level": 3,
      "id": "用户注意事项",
      "text": "用户注意事项"
    },
    {
      "level": 3,
      "id": "自定义",
      "text": "自定义"
    }
  ],
  "hooks-lifecycle.md": [
    {
      "level": 3,
      "id": "触发矩阵",
      "text": "触发矩阵"
    },
    {
      "level": 3,
      "id": "核心机制",
      "text": "核心机制"
    },
    {
      "level": 3,
      "id": "进度在哪里",
      "text": "进度在哪里"
    },
    {
      "level": 3,
      "id": "批准与信任",
      "text": "批准与信任"
    },
    {
      "level": 3,
      "id": "证据门禁",
      "text": "证据门禁"
    },
    {
      "level": 3,
      "id": "已安装组件",
      "text": "已安装组件"
    },
    {
      "level": 3,
      "id": "继续阅读",
      "text": "继续阅读"
    }
  ],
  "git-workflow.md": [
    {
      "level": 3,
      "id": "模式门禁",
      "text": "模式门禁"
    },
    {
      "level": 3,
      "id": "commit-模式",
      "text": "Commit 模式"
    },
    {
      "level": 3,
      "id": "rebase-与-merge",
      "text": "Rebase 与 merge"
    },
    {
      "level": 3,
      "id": "push-安全",
      "text": "Push 安全"
    },
    {
      "level": 3,
      "id": "继续阅读",
      "text": "继续阅读"
    }
  ],
  "tdd.md": [
    {
      "level": 3,
      "id": "顺序",
      "text": "顺序"
    },
    {
      "level": 3,
      "id": "测试金字塔",
      "text": "测试金字塔"
    },
    {
      "level": 3,
      "id": "必须确定性否则就是坏的",
      "text": "必须确定性，否则就是坏的"
    },
    {
      "level": 3,
      "id": "prompt-测试断言行为不断言文本",
      "text": "Prompt 测试断言行为，不断言文本"
    },
    {
      "level": 3,
      "id": "五个证据门禁",
      "text": "五个证据门禁"
    },
    {
      "level": 3,
      "id": "继续阅读",
      "text": "继续阅读"
    }
  ],
  "manual-qa.md": [
    {
      "level": 3,
      "id": "visual-qa",
      "text": "visual-qa"
    },
    {
      "level": 3,
      "id": "review-work",
      "text": "review-work"
    },
    {
      "level": 3,
      "id": "adversarial-classes-与-cleanup",
      "text": "Adversarial classes 与 cleanup"
    },
    {
      "level": 3,
      "id": "继续阅读",
      "text": "继续阅读"
    }
  ],
  "configuration.md": [
    {
      "level": 3,
      "id": "默认零配置",
      "text": "默认零配置"
    },
    {
      "level": 3,
      "id": "codex-target",
      "text": "Codex target"
    },
    {
      "level": 3,
      "id": "配置在哪里",
      "text": "配置在哪里"
    },
    {
      "level": 3,
      "id": "install-flags",
      "text": "Install flags"
    },
    {
      "level": 3,
      "id": "可以调整什么",
      "text": "可以调整什么"
    },
    {
      "level": 3,
      "id": "hooks-与生命周期",
      "text": "Hooks 与生命周期"
    },
    {
      "level": 3,
      "id": "provider-与模型设置",
      "text": "Provider 与模型设置"
    },
    {
      "level": 3,
      "id": "诊断配置",
      "text": "诊断配置"
    },
    {
      "level": 3,
      "id": "重新运行安装",
      "text": "重新运行安装"
    }
  ],
  "deploy.md": [
    {
      "level": 3,
      "id": "触发条件",
      "text": "触发条件"
    },
    {
      "level": 3,
      "id": "构建",
      "text": "构建"
    },
    {
      "level": 3,
      "id": "部署",
      "text": "部署"
    },
    {
      "level": 3,
      "id": "部署后冒烟检查",
      "text": "部署后冒烟检查"
    },
    {
      "level": 3,
      "id": "本地预览",
      "text": "本地预览"
    },
    {
      "level": 3,
      "id": "继续阅读",
      "text": "继续阅读"
    }
  ],
  "cli.md": [
    {
      "level": 3,
      "id": "转发到-omo",
      "text": "转发到 OmO"
    },
    {
      "level": 3,
      "id": "install",
      "text": "install"
    },
    {
      "level": 3,
      "id": "dry-run",
      "text": "--dry-run"
    },
    {
      "level": 3,
      "id": "doctor",
      "text": "doctor"
    },
    {
      "level": 3,
      "id": "前置条件",
      "text": "前置条件"
    },
    {
      "level": 3,
      "id": "marketplace-替代路径",
      "text": "Marketplace 替代路径"
    },
    {
      "level": 3,
      "id": "退出行为",
      "text": "退出行为"
    },
    {
      "level": 3,
      "id": "session-内命令",
      "text": "Session 内命令"
    }
  ]
};
