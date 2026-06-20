import Link from "next/link"
import type { JSX } from "react"
import { SITE_CONFIG } from "../../lib/site-config"
import { GithubStarsPill } from "./github-stars-pill"

export function SiteHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[color:var(--surface-base)]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)]"
            aria-label="LazyCodex 首页"
          >
            {/* Inline SVG mark: zero network bytes (a real <img> of the 512px
                icon would download ~200KB above the fold and starve the LCP
                text paint on throttled mobile). */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="h-6 w-6"
            >
              <rect
                x="3.2"
                y="3.2"
                width="17.6"
                height="17.6"
                rx="4.4"
                fill="var(--card-base)"
                stroke="var(--accent-primary)"
                strokeWidth="1.3"
              />
              <path
                d="M8 9 V15.2 H14.6"
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="15.6" cy="9" r="1.6" fill="var(--accent-mint)" />
            </svg>
            <span className="font-medium tracking-tight text-[color:var(--text-primary)]">
              {SITE_CONFIG.wordmark}
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-4 md:gap-6">
          <Link
            href={SITE_CONFIG.docsPath}
            prefetch={false}
            className="text-sm font-medium text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)]"
          >
            文档
          </Link>
          <GithubStarsPill />
        </nav>
      </div>
    </header>
  )
}
