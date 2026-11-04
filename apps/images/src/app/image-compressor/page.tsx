import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import ImageWorkbench from "@/components/ImageWorkbench";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("image-compressor");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I compress an image without losing quality?",
    a: "Some quality is always lost with JPEG and WebP, but a moderate setting, around 75% to 85%, usually looks the same to the eye while cutting the file a lot. Resizing very large pictures first saves even more.",
  },
  {
    q: "Is my image uploaded to a server?",
    a: "No. The image is decoded and re-encoded in your browser, so it never leaves your device.",
  },
  {
    q: "Can I compress to an exact size, like 100 KB?",
    a: "Yes. Type a maximum file size in KB. The tool finds the highest quality that fits, and reduces the dimensions if quality alone cannot get there. There are also ready-made pages for 20 KB, 50 KB and 100 KB.",
  },
  {
    q: "Should I choose JPEG or WebP?",
    a: "JPEG works everywhere. WebP gives a smaller file at similar quality, but some older programs and forms do not accept it.",
  },
  {
    q: "Why did my PNG get a white background?",
    a: "JPEG and the lossy mode of WebP here do not keep transparency, so see-through areas are filled with white. Keep the PNG if you need transparency.",
  },
  {
    q: "Is there a limit on file size or number of files?",
    a: "No limit is set here. Very large photos use a lot of memory in the browser, so a huge file may be slow or fail on a phone.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="image-compressor"
      lede="Compress JPG, PNG and WebP images in your browser. Set a quality, or a maximum file size in KB. Your photos are never uploaded."
      widget={<ImageWorkbench mode="compress" />}
      faq={faq}
      related={["compress-image-to-100kb", "compress-image-to-50kb", "image-resizer", "png-to-jpg"]}
    >
      <h2>How to compress an image</h2>
      <ol>
        <li>Add one or more images by dropping them in the box or choosing them.</li>
        <li>
          Set a <strong>quality</strong>, or type a <strong>maximum file size</strong> in KB if a form or
          website has a limit.
        </li>
        <li>
          Check the new size, then press <strong>Download</strong> for each file.
        </li>
      </ol>

      <h2>What makes an image smaller</h2>
      <p>Four things change a file size, roughly in this order of effect:</p>
      <ul>
        <li>
          <strong>Dimensions:</strong> halving the width and height cuts the pixels to a quarter. Use the{" "}
          <Link href="/image-resizer">image resizer</Link> or the maximum width option.
        </li>
        <li>
          <strong>Format:</strong> JPEG and WebP are far smaller than PNG for photos.
        </li>
        <li>
          <strong>Quality:</strong> a lower quality discards more detail. The gains get smaller and the damage
          larger at the low end.
        </li>
        <li>
          <strong>Metadata:</strong> re-encoding drops camera data such as EXIF, including location.
        </li>
      </ul>
      <p>
        The <Link href="/guides/reduce-image-size">guide to reducing image size</Link> goes through each one.
      </p>

      <h2>Need a specific size?</h2>
      <p>
        These pages are set to common limits: <Link href="/compress-image-to-20kb">20 KB</Link>,{" "}
        <Link href="/compress-image-to-50kb">50 KB</Link> and{" "}
        <Link href="/compress-image-to-100kb">100 KB</Link>.
      </p>
    </ToolPage>
  );
}
