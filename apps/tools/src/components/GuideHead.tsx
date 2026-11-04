import { Breadcrumbs, JsonLd, guideJsonLd, type Crumb } from "@sites/shell";
import { UPDATED, guides, site } from "@/site";

/** Breadcrumbs, a "last reviewed" line and TechArticle JSON-LD for one guide. */
export default function GuideHead({ slug }: { slug: string }) {
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) throw new Error(`unknown guide ${slug}`);
  const crumbs: Crumb[] = [
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides/" },
    { name: guide.title, href: guide.path },
  ];
  return (
    <>
      <JsonLd
        data={guideJsonLd(site, {
          headline: guide.title,
          description: guide.description,
          path: guide.path,
          crumbs,
          datePublished: guide.published,
          dateModified: UPDATED,
        })}
      />
      <Breadcrumbs items={crumbs} />
    </>
  );
}
