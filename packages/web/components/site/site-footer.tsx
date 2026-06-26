import type { JSX } from "react"
import { MarketingContainer } from "../design-system/layout"
import { SITE_CONFIG } from "../../lib/site-config"

export function SiteFooter(): JSX.Element {
  return (
    <footer className="w-full border-t border-white/5 bg-[color:var(--surface-night)] py-8">
      <MarketingContainer className="flex flex-col items-center justify-between gap-4 text-sm text-[color:var(--text-tertiary)] md:flex-row">
        <div className="flex items-center gap-2">
          <span className="font-mono font-medium text-[color:var(--text-secondary)]">
            lazycodex.ai
          </span>
          <span aria-hidden="true">·</span>
          <span>MIT License</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={SITE_CONFIG.omoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[color:var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)]"
          >
            OmO
          </a>
          <a
            href={SITE_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[color:var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)]"
          >
            GitHub
          </a>
        </div>
      </MarketingContainer>
    </footer>
  )
}
