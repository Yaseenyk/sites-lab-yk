import Link from "next/link";
import { Breadcrumbs, JsonLd, breadcrumbJsonLd, pageMetadata } from "@sites/shell";
import { guides, site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Money Guides: Salary, Overtime and Exchange Rates",
  description:
    "Short, practical guides that go with the calculators: salary to hourly, how overtime pay works, and how exchange rates work.",
  path: "/guides/",
});

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Guides", href: "/guides/" },
];

export default function Page() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...breadcrumbJsonLd(site.url, crumbs) }} />
      <Breadcrumbs items={crumbs} />
      <p className="eyebrow mb-3">Guides</p>
      <h1 className="page-h1">Guides for pay and currency</h1>
      <p className="lede">
        Short explanations that go with the tools, written to fix the problem you came with.
      </p>
      <div className="card-grid">
        {guides.map((g) => (
          <Link key={g.slug} href={g.path} className="card group">
            <h3>{g.title}</h3>
            <p>{g.blurb}</p>
            <span className="more">Read guide →</span>
          </Link>
        ))}
      </div>
    </>
  );
}
