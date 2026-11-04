import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdSenseScript, SiteShell } from "@sites/shell";
import "@sites/shell/styles.css";
import { site } from "@/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: free JSON, Base64 and developer tools`, template: `%s | ${site.name}` },
  description: site.tagline,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <AdSenseScript />
      </head>
      <body>
        <SiteShell site={site}>{children}</SiteShell>
      </body>
    </html>
  );
}
