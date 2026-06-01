export type DocSectionId =
  | "overview"
  | "installation"
  | "skills"
  | "ultrawork"
  | "ulw-loop"
  | "ulw-plan"
  | "start-work";

export type DocSection = {
  readonly id: DocSectionId;
  readonly file: string;
  readonly title: string;
};

export const DOC_SECTIONS: readonly DocSection[] = [
  { id: "overview", file: "overview.md", title: "Overview" },
  { id: "installation", file: "installation.md", title: "Installation" },
  { id: "skills", file: "skills.md", title: "Feature coverage" },
  { id: "ultrawork", file: "ultrawork.md", title: "ultrawork mode" },
  { id: "ulw-loop", file: "ulw-loop.md", title: "$ulw-loop" },
  { id: "ulw-plan", file: "ulw-plan.md", title: "$ulw-plan" },
  { id: "start-work", file: "start-work.md", title: "$start-work" },
] as const;

export const DOC_SECTION_IDS = DOC_SECTIONS.map((s) => s.id);
