import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import ImageWorkbench from "@/components/ImageWorkbench";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("jpeg-compressor");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How does JPEG compression work?",
    a: "JPEG discards detail the eye is least likely to notice, mostly fine colour and texture, and stores what is left efficiently. A lower quality setting discards more, so the file is smaller and the picture is less exact.",
  },
  {
    q: "What quality should I use for a JPEG?",
    a: "Around 75% to 85% is a sensible starting point for photos: much smaller than the original with little visible change. Below about 50%, blocky artefacts around edges become easy to see.",
  },
  {
    q: "Can I compress a JPEG to an exact size like 100 KB?",
    a: "Yes. Type a maximum file size in KB. The tool finds the highest quality that fits and reduces the dimensions in steps if quality alone is not enough.",
  },
  {
    q: "Does compressing a JPEG again make it worse?",
    a: "Yes. Every lossy save discards a little more detail, so compress from the original file when you can and avoid re-saving the same JPEG many times.",
  },
  {
    q: "Is my photo uploaded?",
    a: "No. The JPEG is decoded and re-encoded in your browser. It never leaves your device, and the saved file has its camera and location data removed.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="jpeg-compressor"
      lede="Reduce the size of JPG photos in your browser. Choose a quality, or set a maximum file size in KB. Your photos are never uploaded."
      widget={
        <ImageWorkbench
          mode="compress"
          hint="JPG, PNG, WebP or AVIF. The result is a smaller JPEG. Files stay on your device."
        />
      }
      faq={faq}
      related={["compress-image-to-100kb", "compress-image-to-50kb", "image-resizer", "image-to-jpg"]}
    >
      <h2>How to compress a JPEG</h2>
      <ol>
        <li>Add one or more JPEG files, or drop them in the box.</li>
        <li>
          Pick a <strong>quality</strong>, or type a <strong>maximum file size</strong> in KB if a form or
          website has a limit.
        </li>
        <li>
          Compare the sizes shown and press <strong>Download</strong> for each result.
        </li>
      </ol>

      <h2>Choosing a quality</h2>
      <table>
        <thead>
          <tr>
            <th>Quality</th>
            <th>Typical use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>90% and up</td>
            <td>Photos you will print or edit again</td>
          </tr>
          <tr>
            <td>75% to 85%</td>
            <td>Web pages, email and sharing: the best balance</td>
          </tr>
          <tr>
            <td>50% to 70%</td>
            <td>Thumbnails and strict size limits</td>
          </tr>
          <tr>
            <td>Below 50%</td>
            <td>Only when nothing else fits; artefacts are visible</td>
          </tr>
        </tbody>
      </table>
      <p>
        Dimensions matter even more than quality: halving the width and height cuts the pixels to a quarter.
        See the <Link href="/guides/reduce-image-size">guide to reducing image size</Link>, or use the{" "}
        <Link href="/image-resizer">image resizer</Link> first.
      </p>
    </ToolPage>
  );
}
