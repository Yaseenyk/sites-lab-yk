import Link from "next/link";
import { AdSlot, pageMetadata } from "@sites/shell";
import GuideHead from "@/components/GuideHead";
import { AD_SLOT_CONTENT, site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "How to Reduce Image File Size Without Ruining Quality",
  description:
    "The four things that shrink an image: dimensions, format, quality and metadata, in the order that matters, with how to choose between JPG, PNG and WebP.",
  path: "/guides/reduce-image-size/",
  type: "article",
});

export default function Page() {
  return (
    <>
      <GuideHead slug="reduce-image-size" />
      <article className="doc">
        <h1>How to reduce image file size without ruining quality</h1>
        <p>
          A phone photo is often several megabytes, far more than a web page, an email or an upload form
          needs. Four things decide a file size. Working through them in this order gets the biggest saving
          for the least damage.
        </p>

        <h2>1. Dimensions: fewer pixels</h2>
        <p>
          File size grows with the number of pixels, which is width times height. Halving both sides leaves a
          quarter of the pixels. A photo taken at 4000 x 3000 pixels is 12 million pixels, far more than a
          screen needs; scaled to 1600 pixels wide it is about 1.9 million. Resizing is the biggest lever and
          costs the least visible quality. Use the <Link href="/image-resizer">image resizer</Link>.
        </p>

        <h2>2. Format: pick the right one</h2>
        <ul>
          <li>
            <strong>JPEG</strong> suits photos. It discards detail the eye barely notices, so files are small,
            and it is accepted everywhere. It has no transparency.
          </li>
          <li>
            <strong>PNG</strong> is lossless and keeps transparency, which makes it ideal for logos,
            screenshots and text, and large for photos.
          </li>
          <li>
            <strong>WebP</strong> makes smaller files than JPEG or PNG at similar quality and supports
            transparency, but some older programs and upload forms reject it.
          </li>
        </ul>
        <p>
          A photo saved as PNG is usually many times larger than the same photo as JPEG. Convert with the{" "}
          <Link href="/png-to-jpg">PNG to JPG converter</Link>.
        </p>

        <AdSlot slot={AD_SLOT_CONTENT} placement="in-article" />

        <h2>3. Quality: lower it, but not too far</h2>
        <p>
          JPEG and WebP have a quality setting. The first reductions save a lot of space with little visible
          change; past a point the savings shrink and blocky artefacts appear. A setting in the range of 75%
          to 85% is a sensible place to start, then look at the result. The{" "}
          <Link href="/image-compressor">image compressor</Link> shows the before and after sizes so you can
          decide.
        </p>

        <h2>4. Metadata: strip what you do not need</h2>
        <p>
          Photos carry extra data such as the camera model and, often, GPS location. It is usually small, but
          removing it is good for privacy. Saving an image through a canvas, as these tools do, drops it.
        </p>

        <h2>Compress to an exact size</h2>
        <p>
          When a form or site has a limit, such as <Link href="/compress-image-to-100kb">100 KB</Link>,{" "}
          <Link href="/compress-image-to-50kb">50 KB</Link> or{" "}
          <Link href="/compress-image-to-20kb">20 KB</Link>, the tool searches for the highest quality that
          fits, and reduces dimensions in steps if quality alone is not enough. Always keep the original,
          because lossy compression cannot be undone.
        </p>
        <AdSlot slot={AD_SLOT_CONTENT} placement="article-end" />
      </article>
    </>
  );
}
