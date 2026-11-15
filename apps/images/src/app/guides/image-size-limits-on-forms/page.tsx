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

        <AdSlot slot={AD_SLOT_CONTENT} placement="in-article" />

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
        <h2>KB, kilobytes and what the form means</h2>
        <p>
          A kilobyte is 1,000 bytes in the decimal convention and 1,024 bytes in the older binary one, and
          portals do not say which they use. The size tools on this site aim at the smaller figure: a 50 KB
          target means at most 50 x 1,000 = 50,000 bytes, which is also under 50 x 1,024 = 51,200 bytes, so
          the file passes under either reading. File managers differ too, so a file shown as &quot;48.8
          KB&quot; in one program can be &quot;50,000 bytes&quot; in another; the byte count is what the
          portal compares.
        </p>

        <h2>Worked example: a passport-style photo for a 50 KB limit</h2>
        <p>
          A photo from a phone is, say, 3024 x 4032 pixels and 2.6 MB. The form asks for a JPG under 50 KB and
          gives no pixel size. Cropping to the head and shoulders and resizing to about 600 x 800 leaves
          480,000 pixels, about 4% of the original 12.2 million, which is more than enough for a small
          on-screen portrait. At that size a photo on a plain background will often land under the limit near
          the middle of the quality range; a cluttered background needs a lower setting and may not. Look at
          the result at 100% zoom before you upload: if the face is clear, the file is good; if edges are
          blocky, go back to the original and crop tighter instead of lowering quality further.
        </p>

        <h2>Common reasons a form still rejects the file</h2>
        <ul>
          <li>The pixel dimensions are outside the range the form states, even though the size is fine.</li>
          <li>The file is a different format inside than its extension says (a renamed PNG).</li>
          <li>The file is below a stated minimum size because it was compressed too far.</li>
          <li>
            The form measures the size in its own way, for example counting a different unit; read the
            instructions again for the exact wording.
          </li>
          <li>
            The photo rules were not met: background colour, face position or no glasses. No tool can fix
            those afterwards; retake the picture.
          </li>
        </ul>
        <p>
          These numbers and rules are general. Each portal sets its own, so follow the instructions on the
          form you are using; this guide cannot know them.
        </p>
        <AdSlot slot={AD_SLOT_CONTENT} placement="article-end" />
      </article>
    </>
  );
}
