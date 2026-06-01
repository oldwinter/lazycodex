# LazyCodex Design System

## 1. Core Philosophy
- **Complex-Codebase Harness Tone**: The page uses a near-black canvas (`#0a0a0a`) with a centered, glowing teal card that presents LazyCodex as the Codex agent harness for serious repositories.
- **Card-in-Canvas Architecture**: The main content lives inside a 1200x630px card with a complex radial gradient, and the OpenGraph image mirrors that HTML card instead of using a separate visual language.
- **Typography**: Clean, geometric sans-serif (Geist Sans) for the wordmark and tagline, with monospace (Geist Mono) for eyebrows and footers.

## 2. Color Palette
- `--surface-base`: `#0a0a0a` (Near-black canvas)
- `--card-base`: `#0E1115` (Panel and hero card base)
- `--brand-core`: `#008385` (Teal gradient core)
- `--brand-mid`: `#006668` (Gradient mid)
- `--brand-outer`: `#004d4e` (Gradient outer)
- `--text-primary`: `#ffffff` (White)
- `--text-secondary`: `#99A1AF` (Muted gray)
- `--text-tertiary`: `#8A93A2` (Soft gray)
- `--text-muted`: `rgba(255, 255, 255, 0.72)` (Translucent white)
- `--text-soft`: `#E4FFFF` (Soft cyan-white)
- `--accent-cyan`: `#87F0F2` (Primary accent)
- `--accent-teal`: `#008385` (Secondary accent)
- `--accent-mint`: `#B3FEFF` (Highlight accent)
- `--accent-glow`: `#ABF5F7` (Glow accent)

## 3. Typography Scale
- **Wordmark**: `clamp(64px, 12vw, 168px)`, medium weight, tight tracking (`-0.03em`).
- **Tagline**: `clamp(20px, 3vw, 34px)`, normal weight, tight tracking (`-0.005em`).
- **Eyebrow**: `15px`, medium weight, wide tracking (`0.32em`), uppercase, monospace.
- **Footer URL**: `22px`, medium weight, tracking (`0.02em`), monospace.

## 4. Layout & Spacing
- **Canvas**: Full viewport (`min-h-[100dvh]`), flex column, centered.
- **Card**: Max width 1200px, aspect ratio 1200/630 on large screens. Rounded corners (`16px`).
- **Outer Elements**: The canvas may carry small co-brand labels outside the card when needed, but the current public landing page leads with installable Codex setup instead of launch timing.

## 5. Gradients & Effects
- **Base Gradient**: Radial gradient from `#008385` through `#006668` and `#004d4e` into `#0a0a0a`.
- **Beam**: Screen blend mode, soft white light pouring from top-left.
- **Sheen**: Screen blend mode, diagonal linear gradients with blur.
- **Pools**: Screen blend mode, subtle teal/cyan pools at bottom-left and top-right.
- **Grain**: Overlay blend mode, SVG fractal noise.

## 6. Co-brand layer (Sisyphus Labs)

Sisyphus Labs colors are used as accents across the landing page while the black/teal Codex card stays the hero centerpiece.

- **Cyan**: `#87F0F2`
- **Teal**: `#008385`
- **Mint**: `#B3FEFF`
- **Glow**: `#ABF5F7`
- **Night**: `#0A0A0A`
- **Panel**: `#0E1115`

Where they appear:
- GitHub stars pill in the sticky header
- Command-card accents (borders, icons, hover states)
- The `verified completion` keyword glow inside the hero tagline
- CTA and link accents (hover underlines, button fills)
- Footer co-brand strip

## 7. Landing IA

The landing page is a single scrollable document with the following sections, top to bottom:

1. **Sticky header**
   - Boulder mark (small, 32px) + wordmark
   - GitHub stars pill (Sisyphus Labs cyan accent)
   - "Docs" link
   - "by Sisyphus Labs" co-brand

2. **Hero luminous card**
   - Eyebrow: "AGENT HARNESS FOR COMPLEX CODEBASES"
   - H1 wordmark
   - Tagline: "The one and only agent harness for complex codebases. / Project memory, planning, execution, and verified completion."
   - The `planning,` placeholder uses Geist Mono and pulses subtly

3. **Install block**
   - Copyable bash snippet: `npx lazycodex-ai install`
   - One-line note: equivalent OmO install command
   - Secondary line for the autonomous variant: `npx lazycodex-ai install --no-tui --codex-autonomous`

4. **Three command cards**
   - `$ulw-loop` — self-referential loop
   - `$ulw-plan` — Prometheus planner
   - `$start-work` — plan executor
   - Each card has a monospace command header, a one-line description, and a syntax example

5. **Harness workflows + skill coverage**
   - The existing three command cards remain the main pillars and appear before this guide
   - Explains the installed LazyCodex workflows: `/init-deep`, `$ulw-plan`, `$start-work`, and `$ulw-loop`
   - Calls out project memory, planning, execution, and verified completion
   - Lists built-in skill coverage such as `review-work`, `remove-ai-slops`, `frontend-ui-ux`, `programming`, LSP, AST-grep, rules, and comment-checker

6. **Ultrawork explainer**
   - Short paragraph on what `ultrawork` means (OmO discipline mode, parallel agents, auto-verification)
   - Link to the docs deep-dive

7. **Docs CTA**
   - Large button: "Read the docs"
   - Secondary link: "View on GitHub"

8. **Footer**
   - Sisyphus Labs co-brand strip (night + panel colors)
   - Links: GitHub, OmO, sisyphuslabs.ai
   - MIT license note

## 8. Docs system

- **Markdown source**: `content/docs/*.md`
- **Build-time compilation**: `marked` parses each `.md` file into HTML strings and TypeScript exports at `lib/docs-content.generated.ts`
- **Static navigation**: `lib/docs-sections.ts` defines the section order, slugs, and titles; no runtime file-system access
- **Server rendering**: Each docs page is server-rendered (SSR) so the content is readable with JavaScript disabled
- **Client docs-shell**: A lean React layer adds:
  - Search (filters sections by title and heading text)
  - Scroll-spy (highlights the current heading in the nav)
  - Mobile menu (collapsible section list)

## 9. Image pipeline

- **OpenGraph / Twitter card**: `app/opengraph-image.tsx` and `app/twitter-image.tsx` use `next/og` and inline the same black/teal tokens, gradient layers, wordmark, harness tagline, planning pill, pillar chips, URL, and install command seen in the HTML hero.
- **Boulder art**: Generated via `imagegen` on a chroma background, keyed to alpha so it composites cleanly on the dark canvas without a visible bounding box
- **Delivery format**: Served as AVIF / WebP / PNG via a `<picture>` element using the `BrandImage` component
- **Dimensions**: Explicit `width` and `height` attributes on every image to prevent CLS
- **Favicon / app-icon**: The simplified boulder mark from the sticky header is the canonical site icon so browser chrome, pinned tabs, and the in-page wordmark read as one identity:
  - `app/icon.svg` for the scalable browser favicon
  - `app/apple-icon.png` at 180x180 for Apple touch surfaces, generated from the same mark
