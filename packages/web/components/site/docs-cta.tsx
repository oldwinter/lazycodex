import Link from "next/link"
import type { JSX } from "react"
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
        <div className="relative group">
          <div className="absolute -inset-1 rounded-lg bg-[color:var(--accent-mint)] opacity-20 blur-xl transition-opacity group-hover:opacity-30" />
          <Link
            href={SITE_CONFIG.docsPath}
            prefetch={false}
            className="relative block rounded-md bg-[color:var(--text-primary)] px-6 py-3 font-medium text-[color:var(--surface-base)] transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-panel)]"
          >
            阅读文档
          </Link>
        </div>
        <Link
          href={`${SITE_CONFIG.docsPath}#ulw-loop`}
          prefetch={false}
          className="rounded-md border border-white/20 bg-transparent px-6 py-3 font-medium text-[color:var(--text-primary)] transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-panel)]"
        >
          Ultrawork 如何工作
        </Link>
      </div>
    </section>
  )
}
