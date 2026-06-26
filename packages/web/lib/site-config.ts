export const SITE_CONFIG = {
  installCommand: "npx lazycodex-ai install",
  installCommandAutonomous: "npx lazycodex-ai install --no-tui --codex-autonomous",
  installEquivalent: "npx --yes --package oh-my-openagent omo install --platform=codex",
  githubUrl: "https://github.com/code-yeongyu/lazycodex",
  githubStarsUrl: "https://github.com/code-yeongyu/lazycodex/stargazers",
  omoUrl: "https://github.com/code-yeongyu/oh-my-openagent",
  siteUrl: "https://lazycodex.ai",
  docsPath: "/docs",
  version: "v0.2.2",
  eyebrow: "OMO HEPHAESTUS 的 CODEX 轻量移植",
  wordmark: "LazyCodex",
  heroLineA: "把 Hephaestus deep-worker agent 轻量移植进 Codex。",
  heroLineB: {
    prefix: "从 ",
    slot: "OmO",
    suffix: " 取出最关键的一层：目标而不是步骤，",
    keyword: "可验证完成",
    period: "。",
  },
  harnessPillars: ["目标而不是步骤", "并行探索", "可验证完成"],
  ultraworkTagline: "ultrawork 会把 harness 变成一次可验证运行。",
  ultraworkExample: "ulw add authentication",
  omoIntro: {
    kicker: "它来自哪里",
    title: "OmO Hephaestus 的轻量移植",
    body: "OmO 是完整的 agent harness：主 orchestrator、deep worker、specialist agents、multi-model routing，以及数十个 lifecycle hooks。LazyCodex 不交付全部内容，而是把 Hephaestus 这个角色以专注、可重复的方式移植进 Codex：deep worker 加上让运行保持诚实的 workflows。",
    omoLabel: "OmO — 完整 harness",
    omoPoints: [
      "带 boulder.json 会话连续性的 Sisyphus orchestrator",
      "Hephaestus deep worker + specialist agents",
      "54+ lifecycle hooks、multi-model routing、team mode",
    ],
    lazyLabel: "LazyCodex — Hephaestus 移植版",
    lazyPoints: [
      "只保留 Hephaestus：给目标，不给逐步 recipe",
      "$ulw-plan / $start-work / $ulw-loop workflows",
      "面向 Codex 的 skills、hooks 和 verification defaults",
    ],
  },
  hephaestus: {
    badge: "Deep Worker",
    title: "Hephaestus",
    headline: "给它目标，而不是步骤",
    description:
      "名字来自希腊锻造之神。Methodical、thorough、obsessive。写代码前先启动并行 explore subagents，然后运行紧凑循环，直到工作被证明完成。适合深层架构推理、复杂调试和跨领域综合。",
    loop: [
      { step: "Explore", text: "映射地形：用工具读代码，绝不猜测。" },
      { step: "Plan", text: "规划路线：要改的文件、具体编辑、依赖关系。" },
      { step: "Implement", text: "精确构建：符合代码库风格的外科式编辑。" },
      { step: "Verify", text: "证明可用：LSP diagnostics、tests、build 并行运行。" },
      { step: "Manually QA", text: "驱动真实表面：HTTP、tmux、browser，然后报告。" },
    ],
    tagline: "当“差不多”不够时使用。",
  },
  featureWorkflows: {
    kicker: "LazyCodex 会写入 Codex 的能力",
    title: "驾驭整个代码库",
    intro:
      "LazyCodex 会把 OmO 作为严肃的 agent harness 安装到复杂仓库工作流里：项目记忆、规划、执行、skills、hooks、model routing 和 verification defaults 一次到位。",
    points: [
      {
        label: "可持续的上下文",
        text: "$init-deep 生成分层 AGENTS.md 上下文，让 agent 触碰大型仓库前先读取局部指导。",
      },
      {
        label: "先计划再编辑",
        text: "$ulw-plan 把模糊工作转成 decision-complete plan，再由 $start-work 带持久进度执行。",
      },
      {
        label: "最后要有证据",
        text: "$ulw-loop 会持续推进复杂工作，直到完成承诺被 verification 支撑，而不是只靠乐观状态更新。",
      },
    ],
  },
  builtInSkills: {
    title: "内置 skill 覆盖面",
    summary:
      "Skills 会在任务匹配领域时自动激活，因此不需要先逐个学习。想显式调用时，把 skill 名称写进 prompt；ulw-research 是面向代码库、网页、官方文档和开源仓库深度研究的最大饱和模式。",
    skills: ["ulw-research", "review-work", "remove-ai-slops", "frontend", "programming", "visual-qa", "LSP", "AST-grep"],
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
