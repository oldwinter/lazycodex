import type { Metadata } from "next";
import { DocsShell, type SectionView } from "@/components/docs/docs-shell";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { DOC_SECTIONS, neighborSections } from "@/lib/docs-sections";
import { loadDocSource, loadDocToc } from "@/lib/docs-source";
import { SITE_CONFIG } from "@/lib/site-config";
import "@/app/styles/docs.css";

export const metadata: Metadata = {
  title: "文档",
  description:
    "LazyCodex 文档：OmO agent harness 的安装、快速开始、命令、概念、skills 和参考。",
  alternates: {
    canonical: "/docs",
  },
};

export default function DocsPage() {
  const sections: SectionView[] = DOC_SECTIONS.map((s) => {
    const { prev, next } = neighborSections(s.id);
    return {
      id: s.id,
      title: s.title,
      group: s.group,
      html: loadDocSource(s.file),
      toc: loadDocToc(s.file),
      prev,
      next,
    };
  });

  return (
    <>
      <a href="#content" className="skip-link">
        跳到主要内容
      </a>
      <SiteHeader />
      <main id="content" className="docs-page">
        <div className="docs-hero">
          <div className="docs-hero-badge">
            <span className="docs-hero-dot" aria-hidden="true" />
            {SITE_CONFIG.version}
          </div>
          <h1 className="docs-hero-title">文档</h1>
          <p className="docs-hero-tagline">
            在 Codex 中安装并运行面向复杂代码库的 OmO harness：项目记忆、规划、执行与可验证完成。
          </p>
        </div>
        <DocsShell sections={sections} />
      </main>
      <SiteFooter />
    </>
  );
}
