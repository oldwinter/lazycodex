import type { JSX } from "react"
import { MarketingSection } from "../design-system/layout"
import { ShowcaseSurface } from "../design-system/surfaces"
import { GradientTitle, InlineCode } from "../design-system/typography"
import { SITE_CONFIG } from "../../lib/site-config"
import { BrandImage } from "./brand-image"

export function UltraworkSection(): JSX.Element {
  return (
    <MarketingSection className="mt-32 flex flex-col items-center text-center md:mt-40">
      <h2 className="text-balance text-[clamp(32px,5vw,48px)] font-medium tracking-tight text-[color:var(--text-primary)]">
        {SITE_CONFIG.ultraworkTagline}
      </h2>

      <div className="mt-8 rounded-lg border border-[color:var(--accent-primary)]/20 bg-[color:var(--accent-primary)]/5 px-6 py-3 shadow-[0_0_30px_rgba(74,222,128,0.1)]">
        <InlineCode className="text-lg text-[color:var(--accent-mint)]">
          {SITE_CONFIG.ultraworkExample}
        </InlineCode>
      </div>

      <ShowcaseSurface className="mt-24 max-w-[960px]">
        <GradientTitle
          className="mb-12 text-center text-[clamp(28px,4vw,48px)] font-semibold tracking-tight opacity-90"
        >
          Ultrawork
        </GradientTitle>

        <BrandImage
          src="/img/badge-ultrawork.png"
          alt="Ultrawork"
          width={897}
          height={512}
          className="h-auto w-full max-w-[560px]"
        />
      </ShowcaseSurface>
    </MarketingSection>
  )
}
