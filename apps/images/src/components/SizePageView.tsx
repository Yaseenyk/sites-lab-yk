import Link from "next/link";
import ImageWorkbench from "@/components/ImageWorkbench";
import ToolPage from "@/components/ToolPage";
import { sizePageBySlug } from "@/lib/pages";

/** One of the "compress image to N KB" pages. */
export default function SizePageView({ slug }: { slug: string }) {
  const p = sizePageBySlug(slug);
  const others = ["compress-image-to-20kb", "compress-image-to-50kb", "compress-image-to-100kb"].filter(
    (s) => s !== slug,
  );
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
      related={["image-compressor", "image-resizer", ...others]}
    >
      <h2>How to compress an image to {p.kb} KB</h2>
      <ol>
        <li>Add your image. It stays on your device.</li>
        <li>
          The maximum file size is already set to <strong>{p.kb} KB</strong>. The tool finds the best quality
          that fits.
        </li>
        <li>
          Press <strong>Download</strong>. If it says the limit could not be reached, set a smaller maximum
          width and try again.
        </li>
      </ol>

      <h2>About a {p.kb} KB limit</h2>
      {p.about.map((t) => (
        <p key={t}>{t}</p>
      ))}

      <h2>Tips for staying under {p.kb} KB</h2>
      <ul>
        {p.tips.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <p>
        More detail in the guide:{" "}
        <Link href="/guides/image-size-limits-on-forms">
          how to hit a small file-size limit on an upload form
        </Link>
        .
      </p>
    </ToolPage>
  );
}
