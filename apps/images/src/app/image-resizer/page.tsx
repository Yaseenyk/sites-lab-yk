import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import ImageWorkbench from "@/components/ImageWorkbench";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("image-resizer");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const faq = [
  {
    q: "How do I resize an image to a specific size in pixels?",
    a: "Enter the width, the height, or both, and download the result. With Keep aspect ratio ticked, entering one side works out the other so the picture is not stretched.",
  },
  {
    q: "What happens if I enter both a width and a height?",
    a: "With Keep aspect ratio on, the image is fitted inside that box without distortion, so one side may come out smaller than you typed. Untick it to force the exact size, which can stretch the picture.",
  },
  {
    q: "Can I resize by percentage?",
    a: "Yes. Enter a percentage in Or scale by. 50 makes the image half as wide and half as tall, which is a quarter of the pixels.",
  },
  {
    q: "Will making an image bigger improve it?",
    a: "No. Enlarging only stretches existing pixels, so it looks softer. Resize down whenever you can, and start from the highest-resolution original.",
  },
  {
    q: "Does resizing change the file size?",
    a: "Yes, usually a lot. Fewer pixels means a smaller file. To hit an exact file size as well, resize first and then use the image compressor.",
  },
  {
    q: "Is my image uploaded?",
    a: "No. Resizing happens in your browser and the file never leaves your device.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="image-resizer"
      lede="Resize images by width, height or percentage, keeping the aspect ratio. It runs in your browser, so your photos are never uploaded."
      widget={<ImageWorkbench mode="resize" />}
      faq={faq}
      related={["image-compressor", "compress-image-to-50kb", "png-to-jpg", "webp-to-jpg"]}
    >
      <h2>How to resize an image</h2>
      <ol>
        <li>Add your image.</li>
        <li>
          Enter a <strong>width</strong> or a <strong>height</strong> in pixels, or a percentage to scale by.
        </li>
        <li>
          Keep <strong>Keep aspect ratio</strong> ticked so the picture is not stretched, then download the
          result.
        </li>
      </ol>

      <h2>The calculation</h2>
      <pre>{`new height = original height x (new width / original width)`}</pre>
      <p>
        An image 4000 x 3000 pixels resized to a width of 800 becomes 800 x 600. The tool does this for you
        and rounds to whole pixels.
      </p>

      <h2>Resizing for a file-size limit</h2>
      <p>
        If a form wants both a pixel size and a small file, resize first, then run the result through the{" "}
        <Link href="/image-compressor">image compressor</Link> with a maximum size. See{" "}
        <Link href="/guides/image-size-limits-on-forms">
          how to get a photo under a form&apos;s size limit
        </Link>
        .
      </p>
    </ToolPage>
  );
}
