export const SITE_CONFIG = {
  installCommand: "npx lazycodex-ai install",
  installCommandAutonomous: "npx lazycodex-ai install --no-tui --codex-autonomous",
  installEquivalent: "npx --yes --package oh-my-openagent omo install --platform=codex",
  githubUrl: "https://github.com/code-yeongyu/lazycodex",
  githubStarsUrl: "https://github.com/code-yeongyu/lazycodex/stargazers",
  omoUrl: "https://github.com/code-yeongyu/oh-my-openagent",
  sisyphusUrl: "https://sisyphuslabs.ai",
  siteUrl: "https://lazycodex.ai",
  docsPath: "/docs",
  eyebrow: "CODEX FOR NO-BRAINERS",
  wordmark: "LazyCodex",
  heroLineA: "You don't need to ultrathink.",
  heroLineB: {
    prefix: "Just prompt ",
    slot: "{your prompt}",
    suffix: " ",
    keyword: "ultrawork",
    period: ".",
  },
  ultraworkTagline: "One word. Every agent activates. Doesn't stop until done.",
  ultraworkExample: "ulw add authentication",
  featureWorkflows: {
    kicker: "What LazyCodex installs",
    title: "Use the built-in workflows",
    intro:
      "LazyCodex is a thin Codex distribution for OmO. It installs the command loop, planner, executor, project-memory setup, skills, hooks, model routing, and verification defaults in one pass.",
    points: [
      {
        label: "Project memory",
        text: "/init-deep generates hierarchical AGENTS.md context so future agents start with local guidance instead of guessing.",
      },
      {
        label: "Planning and execution",
        text: "$ulw-plan turns fuzzy work into a plan, then $start-work executes that plan with durable Boulder progress.",
      },
      {
        label: "Verified completion",
        text: "$ulw-loop keeps work moving until the completion promise is backed by evidence instead of a hopeful status update.",
      },
    ],
  },
  builtInSkills: {
    title: "Built-in skill coverage",
    summary:
      "Skills add specialist guidance for review, cleanup, UI, strict language work, LSP diagnostics, AST-grep rewrites, project rules, and comment-checker feedback.",
    skills: ["review-work", "remove-ai-slops", "frontend-ui-ux", "programming", "LSP", "AST-grep", "rules", "comment-checker"],
  },
} as const;

export type SiteConfig = typeof SITE_CONFIG;
