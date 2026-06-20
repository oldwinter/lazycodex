// AUTO-GENERATED — do not edit. Run: node ./scripts/generate-docs-content.mjs
export const DOC_SOURCES: Record<string, string> = {
  "overview.md": "<p>LazyCodex 是把 <a href=\"https://github.com/code-yeongyu/oh-my-openagent\">OmO</a> 移植到 Codex 的轻量版本。它不交付完整 harness；它移植一个角色：<strong>Hephaestus</strong>，自主 deep worker，以及让它的运行保持诚实的 workflows。可以把它理解成 Codex 版 <a href=\"https://github.com/LazyVim/LazyVim\">LazyVim</a>。</p>\n<h3 id=\"它来自哪里\">它来自哪里</h3>\n<p>OmO 是完整 agent harness：主 orchestrator（Sisyphus）通过 <code>.omo/boulder.json</code> 提供 session continuity，deep worker（Hephaestus）、specialist agents、multi-model routing、54+ lifecycle hooks 和 team mode。规模很大。LazyCodex 只取 focused Codex setup 最需要的部分，并把它打包成可重复安装。</p>\n<h3 id=\"你会得到什么\">你会得到什么</h3>\n<p>移植到 Codex 的 Hephaestus deep worker，包括：</p>\n<ul>\n<li>Goal-oriented execution — 你给 objective，而不是 step-by-step recipes。</li>\n<li>紧凑运行循环：<strong>Explore -&gt; Plan -&gt; Implement -&gt; Verify -&gt; Manually QA</strong>。</li>\n<li>并行 explore subagents，让它写代码前先映射地形。</li>\n<li><code>$ulw-plan</code>、<code>$start-work</code> 和 <code>$ulw-loop</code> workflows，让复杂工作持续推进直到被验证。</li>\n<li>一次性写入 Codex 的 skills、hooks、model routing 和 verification defaults。</li>\n</ul>\n<h3 id=\"harness-工作流\">Harness 工作流</h3>\n<p>当任务需要 deep worker 作为一个协调一致、受证据约束的循环运行，而不是单个回合时，使用 <code>{your prompt} ultrawork</code>。</p>\n<h3 id=\"如何组合在一起\">如何组合在一起</h3>\n<p>LazyCodex 是 <a href=\"https://github.com/code-yeongyu/oh-my-openagent\">OmO</a> 之上的薄发行层。核心引擎是 OmO；LazyCodex 把 OmO 的 Hephaestus 打包给 Codex。</p>\n<p>鸣谢：LazyCodex 这个名字受到 <a href=\"https://github.com/LazyVim/LazyVim\">LazyVim</a> 启发。Ultragoal 和 UltraQA 的想法受到 <a href=\"https://github.com/Yeachan-Heo/oh-my-codex\">oh-my-codex</a> 启发，并为这个 Codex setup 重新实现。</p>\n<ul>\n<li><a href=\"https://github.com/code-yeongyu/lazycodex\">GitHub 上的 LazyCodex</a></li>\n<li><a href=\"https://github.com/code-yeongyu/oh-my-openagent\">GitHub 上的 OmO</a></li>\n</ul>\n",
  "installation.md": "<p>一个命令即可为 Codex 安装 OmO agent harness，不需要全局安装 package。</p>\n<h3 id=\"安装\">安装</h3>\n<pre><code class=\"language-bash\">npx lazycodex-ai install\n</code></pre>\n<p>这完全等价于 <code>npx --yes --package oh-my-openagent omo install --platform=codex</code>。</p>\n<h3 id=\"自主安装一行命令\">自主安装一行命令</h3>\n<pre><code class=\"language-bash\">npx lazycodex-ai install --no-tui --codex-autonomous\n</code></pre>\n<h3 id=\"前置条件\">前置条件</h3>\n<ul>\n<li><a href=\"https://nodejs.org\">Node.js</a> — 任意仍受维护的 LTS；<code>npx</code> 随它一起安装。Bun <strong>不是</strong> 必需项，安装器运行在普通 Node 上。</li>\n<li><a href=\"https://github.com/openai/codex\">OpenAI Codex CLI</a></li>\n</ul>\n<blockquote>\n<p>不要使用 <code>npm install -g</code> 或 <code>bun add -g</code>。始终通过 <code>npx</code> 调用。</p>\n</blockquote>\n<h3 id=\"从-codex-marketplace-安装实验性\">从 Codex marketplace 安装（实验性）</h3>\n<p>上面的 npx 安装器仍然是主要路径。作为补充性的实验路径，你可以在 Codex 内安装：输入 <code>/plugins</code>，打开 <strong>Add Marketplace</strong> 标签页（&quot;Add a marketplace from a Git repo or local root.&quot;），填入 <code>https://github.com/code-yeongyu/lazycodex</code>，然后从 <code>sisyphuslabs</code> marketplace 安装 <code>omo</code>。也可以通过 CLI：</p>\n<pre><code class=\"language-bash\">codex plugin marketplace add https://github.com/code-yeongyu/lazycodex\ncodex plugin add omo@sisyphuslabs\n</code></pre>\n<p>下次启动时，在 Codex startup review 中批准 omo hooks。hook 在批准前绝不会运行。第一次批准后的会话会打印 <code>LazyCodex bootstrap running in background — restart the session when it completes</code>，同时后台 worker 完成 setup：config blocks、agent roles、bin links，以及 <code>ast_grep</code> MCP 使用的固定版 <code>sg</code> binary。完成后重启即可。marketplace 安装不会修改 Codex permission settings；autonomous mode 仍然需要显式使用 <code>npx lazycodex-ai install --no-tui --codex-autonomous</code>。</p>\n<p>升级使用 <code>codex plugin marketplace upgrade sisyphuslabs</code>。下次 startup review 会把 hooks 显示为 <strong>Modified</strong>，这是每次升级后的预期状态，因为 plugin 文件变了、旧 trust hashes 不再匹配。重新批准后，下一次会话会在新版本上重新运行 bootstrap。如果任何项目看起来 pending 或 degraded，<code>npx lazycodex-ai doctor</code> 会解释原因。</p>\n<h3 id=\"windows\">Windows</h3>\n<p>两条安装路径都支持原生 Windows。</p>\n<ul>\n<li><strong>Node:</strong> <code>npx lazycodex-ai install</code> 需要 <code>PATH</code> 上有 Node.js（推荐 LTS）。marketplace 安装时，如果缺少 <code>node</code>，bootstrap 步骤会自动把固定版 Node LTS runtime provision 到 <code>%USERPROFILE%\\.codex\\runtime\\node\\</code>；你先自行安装 Node 也可以，并会跳过下载。</li>\n<li><strong>Git Bash:</strong> shell hooks 需要它。安装器和 marketplace bootstrap 在缺少 Git Bash 时，都会尝试运行 <code>winget install --id Git.Git -e --source winget</code>。如果 Git 安装在自定义位置，把 <code>OMO_CODEX_GIT_BASH_PATH</code> 设置为类似 <code>C:\\Program Files\\Git\\bin\\bash.exe</code> 的路径。</li>\n<li><strong><code>where bash</code> 显示 <code>C:\\Windows\\System32\\bash.exe</code>:</strong> 这是 WSL launcher，不是 Git Bash。LazyCodex 在解析 Git Bash 时会有意忽略 <code>System32</code> 和 <code>WindowsApps</code> 下的 <code>bash.exe</code> shim。安装 Git for Windows，或把 <code>OMO_CODEX_GIT_BASH_PATH</code> 指向真实 Git Bash。</li>\n<li><strong>故障排查:</strong> Windows marketplace bootstrap 会把 transcript 写到 <code>%USERPROFILE%\\.codex\\plugins\\data\\omo-sisyphuslabs\\bootstrap\\ps-bootstrap.log</code>；degraded 行看起来像 <code>degraded component=node reason=... hint=npx lazycodex-ai doctor</code>。运行 <code>npx lazycodex-ai doctor</code> 查看完整健康报告。</li>\n</ul>\n<h3 id=\"让-agent-替你安装\">让 agent 替你安装</h3>\n<p>强烈建议让 LLM agent 运行安装并引导 setup。agent 会自动处理 subscription detection、model selection 和 provider auth。</p>\n",
  "getting-started.md": "<p>LazyCodex 最适合作为复杂代码库的 harness：项目记忆、规划、执行、可验证完成、skills、hooks、model routing 和 diagnostics。本页说明最常用的四个命令，以及什么时候选择它们。</p>\n<h3 id=\"四个命令\">四个命令</h3>\n<table>\n<thead>\n<tr>\n<th>Command</th>\n<th>适用场景</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><code>$init-deep</code></td>\n<td>仓库太大或历史太久，无法靠记忆解释。</td>\n</tr>\n<tr>\n<td><code>$ulw-plan</code></td>\n<td>写代码前需要先做决策。</td>\n</tr>\n<tr>\n<td><code>$start-work</code></td>\n<td>已有计划，需要执行到完成。</td>\n</tr>\n<tr>\n<td><code>$ulw-loop</code></td>\n<td>希望 agent 持续推进，直到结果被验证。</td>\n</tr>\n</tbody></table>\n<h3 id=\"如何选择\">如何选择</h3>\n<p>每个仓库先运行一次 <code>$init-deep</code>，让 agent 有分层 <code>AGENTS.md</code> 上下文可用。</p>\n<p>只要任务有歧义，先运行 <code>$ulw-plan</code>。它会访谈你、并行探索代码库，并把 decision-complete 计划写入 <code>plans/&lt;slug&gt;.md</code>，不会触碰产品代码。</p>\n<p>把该计划交给 <code>$start-work</code> 执行：durable Boulder state、parallel subagents、strict TDD 和五个 evidence gates。所有 checkbox 完成后，它会打印 <code>ORCHESTRATION COMPLETE</code>。</p>\n<p><code>$ulw-loop</code> 是最紧的循环。适合单个任务必须运行到 oracle 验证完成的情况。它不规划，只执行和验证。</p>\n<h3 id=\"一个典型会话\">一个典型会话</h3>\n<pre><code class=\"language-text\">$init-deep\n$ulw-plan &quot;add rate limiting to the api gateway&quot;\n$start-work plans/add-rate-limiting.md\n</code></pre>\n<p>如果工作很小且已经清楚，可以跳过计划，直接进入 loop：</p>\n<pre><code class=\"language-text\">ulw fix the flaky checkout test\n</code></pre>\n<p>为这些命令补充专业判断的 skills 见 <a href=\"#skills\">能力覆盖</a>。</p>\n",
  "init-deep.md": "<p><code>$init-deep</code> 会生成分层 <code>AGENTS.md</code> 上下文，让 agent 在触碰大型仓库前先读取局部指导。每个项目运行一次；当架构变化到现有上下文不再反映现实，也要再次运行。</p>\n<h3 id=\"它会产出什么\">它会产出什么</h3>\n<ul>\n<li>根级 <code>AGENTS.md</code>，说明项目 stack、layout、conventions，以及优先查看的位置。</li>\n<li>关键目录中的嵌套 <code>AGENTS.md</code>，让 agent 进入某个 package 时获得作用域内指导，而不是猜测。</li>\n<li>指向 harness 应遵守的 project rules、skills 和 instruction files。</li>\n</ul>\n<h3 id=\"什么时候运行\">什么时候运行</h3>\n<ul>\n<li>接手一个太大或太旧、无法靠记忆说明的仓库。</li>\n<li>完成一次大型重构、迁移或布局变化后。</li>\n<li>当 agent 反复选错文件或忽略局部约定时。</li>\n</ul>\n<h3 id=\"如何使用\">如何使用</h3>\n<pre><code class=\"language-text\">$init-deep\n</code></pre>\n<p>该命令会遍历目录树，读取定义项目实际工作方式的文件，并写入上下文。审查生成的 <code>AGENTS.md</code> 文件，删掉陈旧内容，然后提交。后续回合中的 agent 会在编辑前读取这些上下文，因此第一次会话的成本会回报给之后每个会话。</p>\n<h3 id=\"初始化之后\">初始化之后</h3>\n<p>上下文就位后，如果工作需要计划，进入 <a href=\"#ulw-plan\"><code>$ulw-plan</code></a>；如果是单个可验证任务，进入 <a href=\"#ulw-loop\"><code>$ulw-loop</code></a>。</p>\n",
  "ulw-plan.md": "<p><code>$ulw-plan</code> 是战略规划顾问（Prometheus）。它会把想法转成 decision-complete work plan。它是 planner，<strong>不是</strong> implementer。当你说 &quot;do X&quot; 时，它会为 X 产出计划，绝不写产品代码。</p>\n<h3 id=\"流程\">流程</h3>\n<ol>\n<li>Socratic 访谈</li>\n<li>并行代码库探索</li>\n<li>Metis 差距分析</li>\n<li>把计划写入 <code>plans/&lt;slug&gt;.md</code></li>\n<li>可选 Momus high-accuracy review</li>\n</ol>\n<h3 id=\"输出\">输出</h3>\n<p>问题、研究结果，以及可以交给 <a href=\"#start-work\"><code>$start-work</code></a> 的工作计划。</p>\n",
  "start-work.md": "<p><code>$start-work</code> 会执行 Prometheus work plan，直到每个 top-level checkbox 都完成。</p>\n<h3 id=\"工作方式\">工作方式</h3>\n<ul>\n<li><code>.omo/boulder.json</code> 中的 durable Boulder state 可跨回合和会话保存</li>\n<li>Stop-hook 会重新注入下一轮，直到计划完成</li>\n<li>独立 sub-tasks 会扇出到并行 subagents</li>\n<li>Strict TDD 加五个 evidence gates：plan reread、automated verification、manual-QA、adversarial QA、cleanup</li>\n<li>进度会记录到 ledger</li>\n</ul>\n<h3 id=\"语法\">语法</h3>\n<pre><code class=\"language-bash\">$start-work [plan-name] [--worktree &lt;absolute-path&gt;]\n</code></pre>\n<h3 id=\"完成\">完成</h3>\n<p>当每个 checkbox 都被勾选后，它会打印 <code>ORCHESTRATION COMPLETE</code> block。</p>\n",
  "ulw-loop.md": "<p><code>$ulw-loop</code> 是自指式开发循环，会一直运行到 verified completion。</p>\n<h3 id=\"工作方式\">工作方式</h3>\n<p>agent 会持续工作，并在它认为任务完成时输出 <code>&lt;promise&gt;DONE&lt;/promise&gt;</code>，但这<strong>不会</strong>结束循环。必须先由 Oracle 验证结果。只有系统确认 Oracle verified 后，循环才会结束。如果验证失败，它会继续，并附带消息：&quot;Oracle verification failed. Continuing ULTRAWORK loop.&quot;</p>\n<h3 id=\"语法\">语法</h3>\n<pre><code class=\"language-bash\">$ulw-loop &quot;task description&quot; [--completion-promise=TEXT] [--strategy=reset|continue]\n</code></pre>\n<h3 id=\"限制\">限制</h3>\n<p>迭代上限在 ultrawork 模式下是 500，普通模式下是 100。</p>\n",
  "ultrawork.md": "<p>ultrawork 是主打模式。在 prompt 任意位置输入 <code>ultrawork</code>（或短别名 <code>ulw</code>），即可激活最高精度、结果优先、证据驱动的 orchestration。</p>\n<blockquote>\n<p>&quot;Plan, execute, verify, and keep the evidence attached.&quot;</p>\n</blockquote>\n<h3 id=\"用法\">用法</h3>\n<pre><code class=\"language-bash\">ulw add authentication\n</code></pre>\n<h3 id=\"它会强制什么\">它会强制什么</h3>\n<ul>\n<li>Strict TDD：RED -&gt; GREEN -&gt; SURFACE -&gt; CLEAN</li>\n<li>至少 3 个现实 QA scenarios</li>\n<li>真实 manual-QA channels（HTTP call、tmux、browser）</li>\n<li>绑定 verification gate，持续循环直到工作真正完成</li>\n</ul>\n",
  "discipline-agents.md": "<p>LazyCodex 从 OmO 向 Codex 移植了一个 discipline agent：<strong>Hephaestus</strong>，自主 deep worker。Codex 包里没有 Sisyphus orchestrator；Hephaestus 是唯一主角色，它会用只读子 agent 做并行探索，并独自承担整次运行。</p>\n<h3 id=\"hephaestus-是什么\">Hephaestus 是什么</h3>\n<p>名字来自希腊锻造之神。它以目标为中心：你给它 objective，而不是一步步 recipe，它负责端到端执行。&quot;The Legitimate Craftsman.&quot; Methodical、thorough、obsessive，适合深层架构推理、复杂调试和跨领域综合。</p>\n<h3 id=\"运行循环\">运行循环</h3>\n<p>Hephaestus 在每个工作单元上运行短而紧的循环：</p>\n<ol>\n<li><strong>Explore</strong> — 映射地形。用工具读代码，绝不猜测。写代码前触发 2-5 个并行 explore subagents。</li>\n<li><strong>Plan</strong> — 规划路线。通过 <code>update_plan</code> 记录要改的文件、具体改动和依赖。</li>\n<li><strong>Implement</strong> — 精确构建。做符合代码库风格的外科式编辑，包括 naming、indentation、imports 和 error handling。</li>\n<li><strong>Verify</strong> — 证明它能工作。对改动文件运行 LSP diagnostics、相关 tests 和 build，能并行就并行。</li>\n<li><strong>Manually QA</strong> — 通过真实表面驱动产物，例如 HTTP call、tmux、browser，然后再写最终回复。</li>\n</ol>\n<h3 id=\"它绝不会做什么\">它绝不会做什么</h3>\n<ul>\n<li><strong>不会相信子 agent 自报完成。</strong> 验证必须独立完成；child 说 &quot;done&quot; 不会关闭工作。</li>\n<li><strong>你要代码时不会只提方案。</strong> 除非你明确要计划或 brainstorm，否则它会实现。</li>\n<li><strong>不会猜未读过的代码。</strong> Exploration 很便宜，assumption 很昂贵。</li>\n<li><strong>不会在回合结束时留下未对齐的工作。</strong> 每个 plan step 都会被归档为 <code>completed</code>、blocked（一句原因）或 removed（一句原因）。</li>\n</ul>\n<h3 id=\"delegation不是-orchestration\">Delegation，不是 orchestration</h3>\n<p>Hephaestus 保持父会话身份。并行探索时，它会启动只读 Codex subagent roles（<code>multi_agent_v1.spawn_agent</code>），同时父会话用简短状态更新保持活跃。它不会把运行交给单独 orchestrator；它拥有目标，委派脏活，并亲自验证结果。</p>\n<h3 id=\"boulder-从哪里来\">Boulder 从哪里来</h3>\n<p>完整 OmO 有第二个主 agent：<strong>Sisyphus</strong>，负责带 <code>.omo/boulder.json</code> 会话连续性的 orchestrator。Codex 包是 Hephaestus-only light port，因此在 Codex 上，持久进度状态由 <a href=\"#start-work\"><code>$start-work</code></a> 和 Stop-hook continuation 写入 <code>.omo/boulder.json</code>，但没有 Sisyphus orchestration layer。</p>\n<h3 id=\"继续阅读\">继续阅读</h3>\n<ul>\n<li><a href=\"#ultrawork\">ultrawork 模式</a> — 把循环变成强约束 verified run 的模式。</li>\n<li><a href=\"#hooks-lifecycle\">Hooks 与生命周期</a> — Stop-hook 如何持续注入下一轮，直到计划完成。</li>\n</ul>\n",
  "model-routing.md": "<p>Multi-model routing 会把一次运行的不同部分发送到更适合的模型，而不是所有工作都塞给同一个模型。LazyCodex 会把 OmO 的 routing defaults 安装进 Codex，让严肃仓库不被单个 context window 或 price point 卡住。</p>\n<h3 id=\"什么会被路由\">什么会被路由</h3>\n<ul>\n<li><strong>规划与探索</strong> 交给强推理模型，它能容纳更大上下文并权衡取舍。</li>\n<li><strong>实现回合</strong> 交给快速、能干的 coding model，承担大部分 edit loop。</li>\n<li><strong>验证</strong> 交给作为 oracle 使用的模型，优先看 judgment 而不是 throughput。</li>\n<li><strong>专门 skills</strong> 在某个 skill 需要特定 profile 时，可以定位到自己的模型。</li>\n</ul>\n<h3 id=\"它如何适配-harness\">它如何适配 harness</h3>\n<p>Routing 是 <code>npx lazycodex-ai install</code> 写入 Codex 的 harness setup 的一部分。它会检测可用订阅和 provider auth，然后把 roles 映射到 models，避免你手动配置每个角色。</p>\n<h3 id=\"provider-认证\">Provider 认证</h3>\n<p>认证目标是 Codex 本身，不是 LazyCodex。Codex 登录后，安装器的 subscription detection 和 provider routing 会接管。如果你让 LLM agent 运行安装，它会走同样的检测和选择流程。</p>\n<h3 id=\"自定义\">自定义</h3>\n<p>Routing 和 provider settings 存放在配置里。控制哪个模型处理哪个角色、如何按项目覆盖默认值，见 <a href=\"#configuration\">配置</a>。</p>\n",
  "hooks-lifecycle.md": "<p>Hooks and lifecycle 让 harness 可以在不需要你每回合重新提示的情况下持续推进长任务。OmO 会向 Codex 安装 lifecycle hooks，观察每个回合并决定下一步。</p>\n<h3 id=\"核心机制\">核心机制</h3>\n<p>Stop-hook 会在一个回合结束时触发。如果计划仍在进行，hook 会自动重新注入下一轮，让 agent 从持久进度状态继续，而不是等待你说 &quot;continue&quot;。只有计划完成，或某个 gate 以需要人工介入的方式失败，运行才会停止。</p>\n<h3 id=\"进度在哪里\">进度在哪里</h3>\n<p>进度状态写入 <code>.omo/boulder.json</code>，可以跨回合、跨会话保存。这让 <a href=\"#start-work\"><code>$start-work</code></a> 能在重启后恢复计划，也让 <a href=\"#ulw-loop\"><code>$ulw-loop</code></a> 对实际推进距离保持诚实。</p>\n<h3 id=\"批准与信任\">批准与信任</h3>\n<p>Hooks 在批准前绝不会运行。安装后第一次启动时，Codex 的 startup review 会要求你批准 omo hooks。每次升级后 hooks 会显示为 <strong>Modified</strong>，这是预期行为，因为 plugin 文件变了、旧 trust hashes 不再匹配。重新批准后，下一个会话会在新版本上重新运行 bootstrap。</p>\n<h3 id=\"证据门禁\">证据门禁</h3>\n<p>执行期间，lifecycle 会在 step 关闭前强制执行五个 evidence gates：plan reread、automated verification、manual-QA、adversarial QA 和 cleanup。无论状态文本声称什么，一个不能通过 gates 的 step 都不会前进。</p>\n<h3 id=\"继续阅读\">继续阅读</h3>\n<ul>\n<li><a href=\"#ultrawork\">ultrawork 模式</a> — 把这些 gates 变成强约束循环的模式。</li>\n<li><a href=\"#configuration\">配置</a> — 如何调整 hook 行为和 lifecycle defaults。</li>\n</ul>\n",
  "skills.md": "<p>LazyCodex 最适合作为复杂代码库的 harness：项目记忆、规划、执行、可验证完成、skills、hooks、model routing 和 diagnostics。</p>\n<h3 id=\"内置工作流\">内置工作流</h3>\n<p>当仓库太大或历史太久，无法靠记忆解释时，从 <code>$init-deep</code> 开始。它生成分层 <code>AGENTS.md</code> 上下文，让 agent 在改代码前能找到正确文件。</p>\n<p>当工作需要先做决策再实现，使用 <code>$ulw-plan</code>；当计划需要执行，使用 <code>$start-work</code>；当你希望 agent 持续推进到结果被验证，使用 <code>$ulw-loop</code>。</p>\n<h3 id=\"能力覆盖\">能力覆盖</h3>\n<p>三个命令支柱保持简单：</p>\n<ul>\n<li><code>$ulw-loop</code> 持续推进到 verified completion</li>\n<li><code>$ulw-plan</code> 把模糊工作变成 decision-complete plan</li>\n<li><code>$start-work</code> 用 durable Boulder progress 执行计划</li>\n</ul>\n<p>Skills 为这些支柱加入专业判断：</p>\n<table>\n<thead>\n<tr>\n<th>Skill</th>\n<th>用途</th>\n</tr>\n</thead>\n<tbody><tr>\n<td><code>review-work</code></td>\n<td>多角度实现后审查</td>\n</tr>\n<tr>\n<td><code>remove-ai-slops</code></td>\n<td>保持行为不变地清理 AI 痕迹代码</td>\n</tr>\n<tr>\n<td><code>frontend-ui-ux</code></td>\n<td>经过设计的 UI 工作，而不是泛泛填充布局</td>\n</tr>\n<tr>\n<td><code>programming</code></td>\n<td>严格的 TypeScript、Rust、Python 或 Go 工程纪律</td>\n</tr>\n<tr>\n<td><code>LSP</code></td>\n<td>diagnostics、definitions、references、symbols 和 renames</td>\n</tr>\n<tr>\n<td><code>AST-grep</code></td>\n<td>跨代码结构搜索与重写</td>\n</tr>\n<tr>\n<td><code>rules</code></td>\n<td>来自 AGENTS、rules 和 instruction files 的项目指令</td>\n</tr>\n<tr>\n<td><code>comment-checker</code></td>\n<td>对编辑类操作后的反馈</td>\n</tr>\n</tbody></table>\n<h3 id=\"skills-在哪里\">Skills 在哪里</h3>\n<p>OmO 可以从项目和用户位置加载 skills，例如 <code>.opencode/skills</code>、<code>~/.config/opencode/skills</code>、<code>.claude/skills</code>、<code>.agents/skills</code> 和 <code>~/.agents/skills</code>。</p>\n<p>LazyCodex 通过以下命令安装 Codex Light setup：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai install\n</code></pre>\n<p>该安装器会把 Codex marketplace plugin 注册为 <code>omo@sisyphuslabs</code>，同时保留容易记住的 public package alias。</p>\n",
  "configuration.md": "<p>LazyCodex 是 <a href=\"https://github.com/code-yeongyu/oh-my-openagent\">OmO</a> 之上的薄发行层。安装器写入 Codex 的配置会控制 model routing、hooks、skills，以及 harness 使用的 agent roles。</p>\n<h3 id=\"配置在哪里\">配置在哪里</h3>\n<ul>\n<li>安装器连接并写入的 Codex 配置。</li>\n<li>项目级 <code>AGENTS.md</code> 和 rule files，它们按仓库塑造 agent 行为。</li>\n<li>用户级 skill 位置，例如 <code>~/.config/opencode/skills</code> 和 <code>~/.agents/skills</code>。</li>\n</ul>\n<h3 id=\"可以调整什么\">可以调整什么</h3>\n<ul>\n<li><strong>Model routing</strong> — 哪个模型负责 planning、implementation、verification 和 specialist skills。安装器会根据检测到的订阅设置合理默认值；当项目需要不同配置时，可以按角色覆盖。</li>\n<li><strong>Hooks and lifecycle</strong> — Stop-hook 是否自动继续计划、迭代上限（ultrawork 模式 500，普通模式 100），以及完成状态如何被 gate 约束。</li>\n<li><strong>Skills</strong> — 哪些 skills 处于 active 状态，以及它们从哪里加载。</li>\n<li><strong>Agent</strong> — Hephaestus autonomous deep worker 及其模型/提示词覆盖。Codex 包是 Hephaestus-only light port，不包含完整 OmO 的 Sisyphus orchestrator。</li>\n</ul>\n<h3 id=\"诊断配置\">诊断配置</h3>\n<p>如果某些状态看起来 pending 或 degraded，运行：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai doctor\n</code></pre>\n<p>它会解释哪里配置错误、为什么错误，并指出需要修复的具体字段。</p>\n<h3 id=\"重新运行安装\">重新运行安装</h3>\n<p>安装器是幂等的。重新运行 <code>npx lazycodex-ai install</code> 会在现有状态上重写配置块、agent roles 和 bin links，因此手动编辑配置后再次运行是安全的。</p>\n<p>每个命令见 <a href=\"#cli\">CLI 参考</a>。</p>\n",
  "cli.md": "<p><code>lazycodex-ai</code> CLI 是安装和诊断 harness 的入口。它设计为通过 <code>npx</code> 运行，不要全局安装。</p>\n<h3 id=\"install\">install</h3>\n<pre><code class=\"language-bash\">npx lazycodex-ai install\n</code></pre>\n<p>一次性把 OmO agent harness 安装进 Codex：commands、skills、hooks、model routing 和 verification defaults。它完全等价于：</p>\n<pre><code class=\"language-bash\">npx --yes --package oh-my-openagent omo install --platform=codex\n</code></pre>\n<p>如果要跳过 TUI 并让安装器自主运行：</p>\n<pre><code class=\"language-bash\">npx lazycodex-ai install --no-tui --codex-autonomous\n</code></pre>\n<h3 id=\"doctor\">doctor</h3>\n<pre><code class=\"language-bash\">npx lazycodex-ai doctor\n</code></pre>\n<p>输出健康报告：哪些已经配置、哪些缺失，以及原因。当 hook 处于 pending、skill 没有加载，或 routing 看起来异常时，先运行它。</p>\n<h3 id=\"前置条件\">前置条件</h3>\n<ul>\n<li><a href=\"https://nodejs.org\">Node.js</a> — 任意仍受维护的 LTS 版本；<code>npx</code> 随 Node 一起安装。安装器不需要 Bun。</li>\n<li><a href=\"https://github.com/openai/codex\">OpenAI Codex CLI</a> 或已登录的 Codex app。</li>\n</ul>\n<blockquote>\n<p>不要使用 <code>npm install -g</code> 或 <code>bun add -g</code>。始终通过 <code>npx</code> 调用。</p>\n</blockquote>\n<h3 id=\"marketplace-替代路径\">Marketplace 替代路径</h3>\n<p>作为补充性的实验路径，你可以在 Codex 内安装：输入 <code>/plugins</code>，打开 <strong>Add Marketplace</strong> 标签页，填入 <code>https://github.com/code-yeongyu/lazycodex</code>，然后从 <code>sisyphuslabs</code> marketplace 安装 <code>omo</code>。也可以通过 CLI：</p>\n<pre><code class=\"language-bash\">codex plugin marketplace add https://github.com/code-yeongyu/lazycodex\ncodex plugin add omo@sisyphuslabs\n</code></pre>\n<p>上面的 npx 安装器仍然是主要路径。完整步骤见 <a href=\"#installation\">安装</a>。</p>\n"
};

export type DocHeading = { level: number; id: string; text: string };
export const DOC_TOC: Record<string, DocHeading[]> = {
  "overview.md": [
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
      "id": "harness-工作流",
      "text": "Harness 工作流"
    },
    {
      "level": 3,
      "id": "如何组合在一起",
      "text": "如何组合在一起"
    }
  ],
  "installation.md": [
    {
      "level": 3,
      "id": "安装",
      "text": "安装"
    },
    {
      "level": 3,
      "id": "自主安装一行命令",
      "text": "自主安装一行命令"
    },
    {
      "level": 3,
      "id": "前置条件",
      "text": "前置条件"
    },
    {
      "level": 3,
      "id": "从-codex-marketplace-安装实验性",
      "text": "从 Codex marketplace 安装（实验性）"
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
  "getting-started.md": [
    {
      "level": 3,
      "id": "四个命令",
      "text": "四个命令"
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
      "id": "语法",
      "text": "语法"
    },
    {
      "level": 3,
      "id": "限制",
      "text": "限制"
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
      "id": "运行循环",
      "text": "运行循环"
    },
    {
      "level": 3,
      "id": "它绝不会做什么",
      "text": "它绝不会做什么"
    },
    {
      "level": 3,
      "id": "delegation不是-orchestration",
      "text": "Delegation，不是 orchestration"
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
      "id": "什么会被路由",
      "text": "什么会被路由"
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
      "id": "自定义",
      "text": "自定义"
    }
  ],
  "hooks-lifecycle.md": [
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
      "id": "继续阅读",
      "text": "继续阅读"
    }
  ],
  "skills.md": [
    {
      "level": 3,
      "id": "内置工作流",
      "text": "内置工作流"
    },
    {
      "level": 3,
      "id": "能力覆盖",
      "text": "能力覆盖"
    },
    {
      "level": 3,
      "id": "skills-在哪里",
      "text": "Skills 在哪里"
    }
  ],
  "configuration.md": [
    {
      "level": 3,
      "id": "配置在哪里",
      "text": "配置在哪里"
    },
    {
      "level": 3,
      "id": "可以调整什么",
      "text": "可以调整什么"
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
  "cli.md": [
    {
      "level": 3,
      "id": "install",
      "text": "install"
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
    }
  ]
};
