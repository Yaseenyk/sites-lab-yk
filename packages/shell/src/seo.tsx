import type { Metadata } from "next";
import type { SiteConfig } from "./config";
import { breadcrumbJsonLd, type Crumb } from "./Breadcrumbs";

export const OG_IMAGE = "/og.png";

export function pageMetadata(
  site: SiteConfig,
  opts: { title: string; description: string; path: string; type?: "website" | "article" },
): Metadata {
  const url = `${site.url}${opts.path}`;
  const image = `${site.url}${OG_IMAGE}`;
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: site.name,
      type: opts.type ?? "website",
      images: [{ url: image, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  };
}

/** Sitewide entity graph: the site and the person who runs it. Emitted once, in the root layout. */
export function siteJsonLd(site: SiteConfig, author: { name: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: `${site.url}/`,
        name: site.name,
        description: site.tagline,
        inLanguage: "en",
        publisher: { "@id": `${site.url}/#author` },
      },
      { "@type": "Person", "@id": `${site.url}/#author`, name: author.name, url: author.url },
    ],
  };
}

/** WebApplication + BreadcrumbList (+ optional FAQ) for one tool page, as a single graph. */
export function toolPageJsonLd(
  site: SiteConfig,
  opts: {
    name: string;
    description: string;
    path: string;
    crumbs: Crumb[];
    faq?: { q: string; a: string }[];
    dateModified: string;
  },
) {
  const url = `${site.url}${opts.path}`;
  const graph: object[] = [
    {
      "@type": "WebApplication",
      "@id": `${url}#app`,
      name: opts.name,
      description: opts.description,
      url,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any (web browser)",
      browserRequirements: "Requires JavaScript",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      dateModified: opts.dateModified,
      publisher: { "@id": `${site.url}/#author` },
      isPartOf: { "@id": `${site.url}/#website` },
    },
    breadcrumbJsonLd(site.url, opts.crumbs),
  ];
  if (opts.faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: opts.faq.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

/** TechArticle + BreadcrumbList for a guide. */
export function guideJsonLd(
  site: SiteConfig,
  opts: {
    headline: string;
    description: string;
    path: string;
    crumbs: Crumb[];
    datePublished: string;
    dateModified: string;
  },
) {
  const url = `${site.url}${opts.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${url}#article`,
        headline: opts.headline,
        description: opts.description,
        url,
        mainEntityOfPage: url,
        image: `${site.url}${OG_IMAGE}`,
        datePublished: opts.datePublished,
        dateModified: opts.dateModified,
        inLanguage: "en",
        author: { "@id": `${site.url}/#author` },
        publisher: { "@id": `${site.url}/#author` },
        isPartOf: { "@id": `${site.url}/#website` },
      },
      breadcrumbJsonLd(site.url, opts.crumbs),
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
