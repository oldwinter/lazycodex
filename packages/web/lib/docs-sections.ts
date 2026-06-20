export type DocSectionId =
  | "overview"
  | "installation"
  | "getting-started"
  | "init-deep"
  | "ulw-plan"
  | "start-work"
  | "ulw-loop"
  | "ultrawork"
  | "discipline-agents"
  | "model-routing"
  | "hooks-lifecycle"
  | "skills"
  | "configuration"
  | "cli";

export type DocSection = {
  readonly id: DocSectionId;
  readonly file: string;
  readonly title: string;
  readonly group: string;
};

// Ordered list of sidebar groups. Each group renders as a category header with
// its sections nested underneath, matching the lzx.vibetip.help docs layout.
export const DOC_GROUPS: readonly string[] = [
  "安装",
  "入门",
  "命令",
  "概念",
  "Skills",
  "参考",
];

export const DOC_SECTIONS: readonly DocSection[] = [
  { id: "installation", file: "installation.md", group: "安装", title: "安装" },
  { id: "overview", file: "overview.md", group: "入门", title: "概览" },
  { id: "getting-started", file: "getting-started.md", group: "入门", title: "快速开始" },
  { id: "init-deep", file: "init-deep.md", group: "命令", title: "$init-deep" },
  { id: "ulw-plan", file: "ulw-plan.md", group: "命令", title: "$ulw-plan" },
  { id: "start-work", file: "start-work.md", group: "命令", title: "$start-work" },
  { id: "ulw-loop", file: "ulw-loop.md", group: "命令", title: "$ulw-loop" },
  { id: "ultrawork", file: "ultrawork.md", group: "概念", title: "ultrawork 模式" },
  { id: "discipline-agents", file: "discipline-agents.md", group: "概念", title: "Hephaestus" },
  { id: "model-routing", file: "model-routing.md", group: "概念", title: "多模型路由" },
  { id: "hooks-lifecycle", file: "hooks-lifecycle.md", group: "概念", title: "Hooks 与生命周期" },
  { id: "skills", file: "skills.md", group: "Skills", title: "能力覆盖" },
  { id: "configuration", file: "configuration.md", group: "参考", title: "配置" },
  { id: "cli", file: "cli.md", group: "参考", title: "CLI" },
] as const;

export const DOC_SECTION_IDS = DOC_SECTIONS.map((s) => s.id);

export function sectionsByGroup(group: string): readonly DocSection[] {
  return DOC_SECTIONS.filter((s) => s.group === group);
}

export function neighborSections(id: DocSectionId): {
  prev: DocSection | undefined;
  next: DocSection | undefined;
} {
  const index = DOC_SECTIONS.findIndex((s) => s.id === id);
  if (index === -1) return { prev: undefined, next: undefined };
  return {
    prev: index > 0 ? DOC_SECTIONS[index - 1] : undefined,
    next: index < DOC_SECTIONS.length - 1 ? DOC_SECTIONS[index + 1] : undefined,
  };
}
