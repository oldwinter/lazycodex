import type { JSX } from "react"
import { GlowActionFrame, LinkAction } from "../design-system/actions"
import { SITE_CONFIG } from "../../lib/site-config"

export function DocsCta(): JSX.Element {
  return (
    <section className="mx-auto mt-32 mb-24 flex w-full max-w-[800px] flex-col items-center rounded-2xl border border-white/10 bg-[color:var(--surface-panel)] px-6 py-16 text-center md:mt-40 md:px-12 relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border-[1.5px] border-[rgba(74,222,128,0.12)]" />

      <h2 className="relative z-10 text-3xl font-medium tracking-tight text-[color:var(--text-primary)]">
        准备接入 harness？
      </h2>
      <p className="relative z-10 mt-4 text-lg text-[color:var(--text-muted)]">
        安装 Codex setup，然后运行能把大型改动稳住的 workflows。
      </p>
      <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-4">
        <GlowActionFrame>
          <LinkAction href={SITE_CONFIG.docsPath} variant="primary">
            阅读文档
          </LinkAction>
        </GlowActionFrame>
        <LinkAction href={`${SITE_CONFIG.docsPath}#ulw-loop`}>
          Ultrawork 如何工作
        </LinkAction>
      </div>
    </section>
  )
}
