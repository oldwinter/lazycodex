export type LazyCommand = {
  readonly name: string;
  readonly syntax: string;
  readonly summary: string;
  readonly facts: readonly string[];
  readonly glyph: "loop" | "plan" | "work";
};

export const COMMANDS: readonly LazyCommand[] = [
  {
    name: "$ulw-loop",
    glyph: "loop",
    syntax: '$ulw-loop "task" [--strategy=reset|continue]',
    summary: "自指式循环，持续运行到 VERIFIED completion。",
    facts: [
      "到达完成声明时输出 <promise>DONE</promise>",
      "循环结束前必须由 Oracle 验证",
      "ultrawork 模式迭代上限 500，普通模式 100",
    ],
  },
  {
    name: "$ulw-plan",
    glyph: "plan",
    syntax: '$ulw-plan "what to build"',
    summary: "Prometheus 战略规划器：把想法转成 decision-complete work plan。",
    facts: [
      "先 Socratic interview，再并行探索代码库",
      "Metis gap analysis，可选 Momus review",
      "写入 plans/<slug>.md，绝不写产品代码",
    ],
  },
  {
    name: "$start-work",
    glyph: "work",
    syntax: '$start-work [plan] [--worktree <path>]',
    summary: "执行 Prometheus plan，直到每个 checkbox 完成。",
    facts: [
      "Durable Boulder state 可跨回合保存",
      "Parallel subagents、strict TDD + 5 evidence gates",
      "完成时打印 ORCHESTRATION COMPLETE",
    ],
  },
] as const;
