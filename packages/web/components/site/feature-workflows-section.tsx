import type { JSX } from "react"
import { SITE_CONFIG } from "../../lib/site-config"

export function FeatureWorkflowsSection(): JSX.Element {
  return (
    <section className="mx-auto mt-24 w-full max-w-[1200px] px-4 md:mt-32 md:px-8">
      <div className="grid gap-8 border-y border-white/10 py-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:py-16">
        <div>
          <p className="font-mono text-xs uppercase text-[color:var(--accent-cyan)]">
            {SITE_CONFIG.featureWorkflows.kicker}
          </p>
          <h2 className="mt-4 text-balance text-[clamp(32px,5vw,56px)] font-medium leading-tight text-[color:var(--text-primary)]">
            {SITE_CONFIG.featureWorkflows.title}
          </h2>
          <p className="mt-6 max-w-[58ch] text-base leading-relaxed text-[color:var(--text-muted)] md:text-lg">
            {SITE_CONFIG.featureWorkflows.intro}
          </p>
        </div>

        <div className="grid gap-3">
          {SITE_CONFIG.featureWorkflows.points.map((point, index) => (
            <div
              key={point.label}
              className="grid gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-5 md:grid-cols-[72px_1fr]"
            >
              <span className="font-mono text-xs uppercase text-[color:var(--text-tertiary)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg font-medium text-[color:var(--text-primary)]">
                  {point.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--text-muted)]">
                  {point.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 rounded-lg border border-[color:var(--accent-cyan)]/20 bg-[color:var(--accent-cyan)]/5 p-5 md:grid-cols-[0.9fr_1.1fr] md:p-6">
        <div>
          <h2 className="text-2xl font-medium text-[color:var(--text-primary)]">
            {SITE_CONFIG.builtInSkills.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--text-muted)]">
            {SITE_CONFIG.builtInSkills.summary}
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {SITE_CONFIG.builtInSkills.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-md border border-white/10 bg-black/20 px-3 py-2 font-mono text-xs text-[color:var(--text-secondary)]"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
