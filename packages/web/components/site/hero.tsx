import type { JSX } from "react"
import { HeroBrandMark } from "../design-system/brand-mark"
import { SITE_CONFIG } from "../../lib/site-config"

export function Hero(): JSX.Element {
  return (
    <section className="relative isolate flex w-full flex-col justify-end overflow-hidden rounded-[20px] bg-[color:var(--card-base)] px-[28px] pb-[44px] pt-[88px] shadow-[0_40px_120px_rgba(0,0,0,0.6)] md:px-[64px] md:pb-[56px] md:pt-[120px]">
      {/* Card background — pure CSS gradient layers. A left-weighted emerald
          glow rather than a flat centered slab, so the composition reads as
          a crafted product moment instead of a generic gradient card.
          Image-free so the hero text is the LCP element and paints at FCP. */}
      <div className="card-gradient-pools absolute inset-0 -z-10" />
      <div className="card-gradient-beam absolute inset-0 -z-10" />
      <div className="card-gradient-sheen absolute -inset-[10%] -z-10" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(90% 70% at 18% 110%, rgba(74,222,128,0.42) 0%, rgba(34,197,94,0.18) 28%, rgba(10,12,11,0) 60%), linear-gradient(180deg, rgba(10,12,11,0.86) 0%, rgba(14,20,17,0.5) 45%, rgba(14,20,17,0) 100%)",
        }}
      />

      {/* Content — left-aligned editorial with a right-anchored mark panel
          so the hero composes as a scene, not a blank gradient field. */}
      <div className="flex items-end justify-between gap-8">
        <div className="flex max-w-[820px] flex-col gap-[20px] text-left">
          <p className="font-mono text-[13px] font-medium uppercase tracking-[0.28em] text-[color:var(--accent-mint)]">
            {SITE_CONFIG.eyebrow}
          </p>

          <h1 className="wordmark m-0 text-balance text-[clamp(44px,7vw,104px)] font-semibold leading-[0.95] tracking-[-0.03em] text-[color:var(--text-primary)]">
            {SITE_CONFIG.wordmark}
          </h1>

          <p className="m-0 max-w-[640px] text-balance text-[clamp(18px,2.2vw,26px)] font-normal leading-[1.4] tracking-[-0.005em] text-[color:var(--text-secondary)]">
            {SITE_CONFIG.heroLineA}
          </p>

          <p className="m-0 max-w-[620px] text-balance text-[clamp(15px,1.6vw,19px)] font-normal leading-[1.5] text-[color:var(--text-muted)]">
            {SITE_CONFIG.heroLineB.prefix}
            <span className="font-mono text-[color:var(--accent-mint)]">
              {SITE_CONFIG.heroLineB.slot}
            </span>
            {SITE_CONFIG.heroLineB.suffix}
            <span className="font-medium text-[color:var(--accent-primary)]">
              {SITE_CONFIG.heroLineB.keyword}
            </span>
            {SITE_CONFIG.heroLineB.period}
          </p>
        </div>

        {/* Right-anchored brand mark — a composed visual anchor. */}
        <div className="hidden shrink-0 items-center justify-end md:flex">
          <HeroBrandMark />
        </div>
      </div>
    </section>
  )
}
