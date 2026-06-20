import type { Metadata, Viewport } from "next"
import type { JSX, ReactNode } from "react"
import "./globals.css"


const SITE_URL = "https://lazycodex.ai"
const SITE_NAME = "LazyCodex"
const TAGLINE = "面向复杂代码库的 Codex agent harness"
const DESCRIPTION =
  "LazyCodex 把 OmO agent harness 安装进 Codex，为复杂代码库提供项目记忆、规划、并行 agents、skills、hooks、路由和可验证完成。"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#22c55e",
  colorScheme: "dark",
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "lazycodex",
    "codex",
    "opencode",
    "oh-my-openagent",
    "omo",
    "ai agent",
    "code agent",
    "agent harness",
    "complex codebases",
    "verified completion",
    "project memory",
    "lazyvim",
  ],
  authors: [{ name: "Yeongyu Kim", url: "https://github.com/code-yeongyu" }],
  creator: "Yeongyu Kim",
  publisher: "Yeongyu Kim",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    // og:image supplied by app/opengraph-image.tsx (file-based convention).
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    creator: "@code_yeongyu",
    // twitter:image supplied by app/twitter-image.tsx.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "developer tools",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux, Windows",
  url: SITE_URL,
  description: DESCRIPTION,
  author: {
    "@type": "Person",
    name: "Yeongyu Kim",
    url: "https://github.com/code-yeongyu",
  },
  publisher: {
    "@type": "Organization",
    name: "LazyCodex",
    url: SITE_URL,
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  potentialAction: {
    "@type": "ViewAction",
    target: "https://github.com/code-yeongyu/lazycodex",
  },
}

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode
}): JSX.Element {
  return (
    <html lang="zh-CN">
      <body className="min-h-[100dvh] font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
