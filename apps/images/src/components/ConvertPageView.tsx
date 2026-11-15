import ImageWorkbench from "@/components/ImageWorkbench";
import { GuideLinks, Sections, Sources } from "@/components/PageSections";
import ToolPage from "@/components/ToolPage";
import { convertPageBySlug } from "@/lib/pages";

/** One of the "X to Y" format converter pages. All text comes from the page's own data. */
export default function ConvertPageView({ slug }: { slug: string }) {
  const p = convertPageBySlug(slug);
  return (
    <ToolPage
      slug={slug}
      lede={p.lede}
      widget={<ImageWorkbench mode="convert" convertTo={p.mime} hint={p.hint} />}
      faq={p.faq}
      related={p.related}
    >
      <h2>
        How to convert {p.from} to {p.to}
      </h2>
      <ol>
        {p.steps.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ol>
      <Sections sections={p.sections} />
      <GuideLinks />
      <Sources ids={p.sources} />
    </ToolPage>
  );
}
