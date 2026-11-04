import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { AdSenseScript, JsonLd, SiteShell, siteJsonLd } from "@sites/shell";
import "./globals.css";
import { GA_ID, GSC_VERIFICATION, author, site } from "@/site";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono" });

const TITLE = "Image Tools: Compress, Resize and Convert Images Online";
const DESCRIPTION =
  "Free image tools: compress to a target size like 20 KB or 100 KB, resize, and convert PNG, JPG, WebP and AVIF. Private: nothing is uploaded.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: TITLE, template: "%s | StreamerOS Image Tools" },
  description: DESCRIPTION,
  applicationName: site.name,
  authors: [{ name: author.name, url: author.url }],
  alternates: { canonical: `${site.url}/` },
  ...(GSC_VERIFICATION ? { verification: { google: GSC_VERIFICATION } } : {}),
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
    url: `${site.url}/`,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: `${site.url}/og.png`, width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: [`${site.url}/og.png`] },
};

export const viewport: Viewport = {
  themeColor: "#05070a",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <head>
        {/* Plain head scripts: Google's tag checker does not see next/script output. */}
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`,
              }}
            />
          </>
        )}
        <AdSenseScript />
        <JsonLd data={siteJsonLd(site, author)} />
      </head>
      <body>
        <SiteShell site={site}>{children}</SiteShell>
      </body>
    </html>
  );
}
