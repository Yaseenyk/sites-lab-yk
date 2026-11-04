import Link from "next/link";
import { AdSlot, pageMetadata } from "@sites/shell";
import GuideHead from "@/components/GuideHead";
import { AD_SLOT_CONTENT, site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Photo Upload Rejected? Get a Picture Under 20, 50 or 100 KB",
  description:
    "Why online forms reject photos, how to check the real requirements, and a step-by-step way to get a picture under a small file-size limit.",
  path: "/guides/image-size-limits-on-forms/",
  type: "article",
});

export default function Page() {
  return (
    <>
      <GuideHead slug="image-size-limits-on-forms" />
      <article className="doc">
        <h1>Photo upload rejected? How to hit a 20 KB, 50 KB or 100 KB limit</h1>
        <p>
          Application portals, job sites and government forms often accept only small images. The rejection
          message is usually short, so it helps to know the handful of things a form can be checking and how
          to fix each one.
        </p>

        <h2>What the form may be checking</h2>
        <ul>
          <li>
            <strong>File size:</strong> a maximum, and sometimes a minimum too, in KB or MB.
          </li>
          <li>
            <strong>Pixel dimensions:</strong> an exact width and height, or a range.
          </li>
          <li>
            <strong>Format:</strong> JPG or PNG. A file renamed from PNG to .jpg is still a PNG inside and may
            be rejected.
          </li>
          <li>
            <strong>Content:</strong> for photos, framing, background and face size.
          </li>
        </ul>
        <p>
          Read the instructions for all of them before you start; fixing only the size and being rejected for
          the format is the common trap.
        </p>

        <h2>Step by step</h2>
        <ol>
          <li>
            <strong>Crop first.</strong> Cut the picture to the area that matters. Fewer pixels means a
            smaller file at the same quality.
          </li>
          <li>
            <strong>Resize to the required pixels,</strong> if the form states them, with the{" "}
            <Link href="/image-resizer">image resizer</Link>.
          </li>
          <li>
            <strong>Compress to the limit.</strong> Open the page for your limit:{" "}
            <Link href="/compress-image-to-20kb">20 KB</Link>,{" "}
            <Link href="/compress-image-to-50kb">50 KB</Link> or{" "}
            <Link href="/compress-image-to-100kb">100 KB</Link>. The tool finds the best quality that fits.
          </li>
          <li>
            <strong>Check the result:</strong> size, pixel dimensions and that it looks clear when zoomed in.
          </li>
        </ol>

        <AdSlot slot={AD_SLOT_CONTENT} />

        <h2>If it will not get small enough</h2>
        <p>
          A very detailed picture at large dimensions cannot reach a tiny limit at good quality. Reduce the
          pixel dimensions, or use a plainer background; a face on a plain background compresses far better
          than a busy scene. Signatures on white paper compress very well.
        </p>

        <h2>If it is too small</h2>
        <p>
          Some forms set a minimum as well as a maximum. If the compressed file is under the minimum, compress
          to a higher limit, for example 100 KB instead of 50 KB, and check the result lands in the allowed
          range.
        </p>

        <h2>Keep your photos private</h2>
        <p>
          ID-style photos are sensitive. Many online compressors upload the file to a server. The tools here
          work in your browser, so the picture never leaves your device, and the saved file has its camera and
          location data removed.
        </p>
      </article>
    </>
  );
}
