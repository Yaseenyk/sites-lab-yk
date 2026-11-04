import Link from "next/link";
import ImageWorkbench from "@/components/ImageWorkbench";
import ToolPage from "@/components/ToolPage";
import { convertPageBySlug } from "@/lib/pages";

/** One of the "X to Y" format converter pages. */
export default function ConvertPageView({ slug }: { slug: string }) {
  const p = convertPageBySlug(slug);
  const others = ["png-to-jpg", "jpg-to-png", "webp-to-jpg", "avif-to-jpg"].filter((s) => s !== slug);
  return (
    <ToolPage
      slug={slug}
      lede={p.lede}
      widget={<ImageWorkbench mode="convert" convertTo={p.mime} hint={p.hint} />}
      faq={p.faq}
      related={["image-compressor", "image-resizer", ...others.slice(0, 2)]}
    >
      <h2>
        How to convert {p.from} to {p.to}
      </h2>
      <ol>
        <li>Add one or more images. They are converted on your device and never uploaded.</li>
        <li>
          Adjust the options if you want, then press <strong>Download</strong> on each result.
        </li>
      </ol>

      <h2>
        About {p.from} and {p.to}
      </h2>
      {p.about.map((t) => (
        <p key={t}>{t}</p>
      ))}
      <p>
        Want smaller files rather than a different format? Use the{" "}
        <Link href="/image-compressor">image compressor</Link>.
      </p>
    </ToolPage>
  );
}
