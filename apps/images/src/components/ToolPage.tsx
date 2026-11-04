import Link from "next/link";
import type { ReactNode } from "react";
import { AdSlot, Breadcrumbs, Icon, JsonLd, toolPageJsonLd, type Crumb } from "@sites/shell";
import { AD_SLOT_CONTENT, UPDATED, site, toolBySlug } from "@/site";

export interface Faq {
  q: string;
  a: string;
}

export default function ToolPage({
  slug,
  lede,
  widget,
  faq,
  related,
  children,
}: {
  slug: string;
  lede: string;
  widget: ReactNode;
  faq: Faq[];
  related: string[];
  children: ReactNode;
}) {
  const tool = toolBySlug(slug);
  // No duplicates, and never link a page to itself.
  const relatedUnique = Array.from(new Set(related)).filter((s) => s !== slug);
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: tool.h1, href: tool.path },
  ];
  return (
    <>
      <JsonLd
        data={toolPageJsonLd(site, {
          name: tool.h1,
          description: tool.description,
          path: tool.path,
          crumbs,
          faq,
          dateModified: UPDATED,
          category: "MultimediaApplication",
        })}
      />
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow mb-3 hidden sm:block">Free · private · runs in your browser</p>
      <h1 className="page-h1">{tool.h1}</h1>
      <p className="lede">{lede}</p>
      {widget}
      <nav aria-label="Try next" className="related-row">
        <span className="related-label">Try next</span>
        {relatedUnique.slice(0, 3).map((s) => {
          const t = toolBySlug(s);
          return (
            <Link key={s} href={t.path}>
              <Icon name={t.icon} size={14} /> {t.h1}
            </Link>
          );
        })}
      </nav>
      <AdSlot slot={AD_SLOT_CONTENT} placement="after-tool" />
      <div className="doc mt-10">{children}</div>
      <AdSlot slot={AD_SLOT_CONTENT} placement="mid-content" />
      <section aria-labelledby="faq-h">
        <h2 id="faq-h" className="page-h2">
          Frequently asked questions
        </h2>
        <div className="faq">
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <section aria-labelledby="rel-h">
        <h2 id="rel-h" className="page-h2">
          Related tools
        </h2>
        <div className="related">
          {relatedUnique.map((s) => {
            const t = toolBySlug(s);
            return (
              <Link key={s} href={t.path}>
                <Icon name={t.icon} size={16} /> {t.h1}
              </Link>
            );
          })}
        </div>
      </section>
      <p className="meta mt-10">Last reviewed {UPDATED}.</p>
    </>
  );
}
