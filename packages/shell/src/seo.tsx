import type { Metadata } from "next";
import type { SiteConfig } from "./config";

export function pageMetadata(
  site: SiteConfig,
  opts: { title: string; description: string; path: string },
): Metadata {
  const url = `${site.url}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: { title: opts.title, description: opts.description, url, siteName: site.name, type: "website" },
  };
}

/** SoftwareApplication JSON-LD for a free browser tool page. */
export function toolJsonLd(site: SiteConfig, opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts.name,
    description: opts.description,
    url: `${site.url}${opts.path}`,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any (web browser)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
