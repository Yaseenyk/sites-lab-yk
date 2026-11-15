import ImageWorkbench from "@/components/ImageWorkbench";
import { GuideLinks, Sections, Sources } from "@/components/PageSections";
import ToolPage from "@/components/ToolPage";
import { sizePageBySlug } from "@/lib/pages";

/** One of the "compress image to N KB" pages. All text comes from the page's own data. */
export default function SizePageView({ slug }: { slug: string }) {
  const p = sizePageBySlug(slug);
  return (
    <ToolPage
      slug={slug}
      lede={p.lede}
      widget={
        <ImageWorkbench
          mode="compress"
          presetKB={p.kb}
          hint="JPG, PNG, WebP or AVIF. The result is a JPEG under the limit. Files stay on your device."
        />
      }
      faq={p.faq}
      related={p.related}
    >
      <h2>How to compress an image to {p.kb} KB</h2>
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
