import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import ImageWorkbench from "@/components/ImageWorkbench";
import { GuideLinks, Sections, Sources, type Section } from "@/components/PageSections";
import ToolPage from "@/components/ToolPage";
import { resizeTo, scaleDims } from "@/lib/image";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("image-resizer");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

/** A 4000 x 3000 photo, the size many phone cameras produce, is the worked example. Every figure is computed. */
const SRC = { width: 4000, height: 3000 };
const px = (n: number) => n.toLocaleString("en-US");
const byWidth = [1920, 1280, 800, 400].map((w) => {
  const d = resizeTo(SRC, w, null, true) ?? SRC;
  return [`Width ${w}`, `${d.width} x ${d.height}`, px(d.width * d.height)];
});
const byPercent = [50, 25, 10].map((p) => {
  const d = scaleDims(SRC, p / 100);
  return [`${p}%`, `${d.width} x ${d.height}`, px(d.width * d.height)];
});

const sections: Section[] = [
  {
    heading: "The calculation",
    paragraphs: [
      "With Keep aspect ratio on, the tool works out the missing side from the one you give: new height = original height x (new width / original width). The result is rounded to whole pixels.",
      "Example: a 4000 x 3000 photo has 12,000,000 pixels. These are the sizes you get from it.",
    ],
    table: {
      head: ["You enter", "Result (px)", "Pixels"],
      rows: [...byWidth, ...byPercent],
    },
  },
  {
    heading: "Width, height, both, or a percentage",
    list: [
      "One side only, ratio kept: the other side follows, and the picture is not stretched.",
      "Both sides, ratio kept: the picture is fitted inside that box, so one side can come out smaller than you typed.",
      "Both sides, ratio not kept: the picture is stretched to exactly that size.",
      "One side only, ratio not kept: the tool asks for both sides.",
      "A percentage: both sides are scaled by it. Typing in a percentage clears the width and height boxes, and typing a width or height clears the percentage.",
    ],
    paragraphs: [
      "Unlike the compressor's maximum width, the resizer will also enlarge a picture if you ask for a bigger size. That only stretches the existing pixels and does not add detail.",
    ],
  },
  {
    heading: "What format you get back",
    table: {
      head: ["You add", "You get"],
      rows: [
        ["JPEG", "JPEG at 92% quality"],
        ["WebP", "WebP at 92% quality"],
        ["PNG", "PNG, lossless, with transparency kept"],
        ["Anything else (AVIF, GIF and so on)", "PNG, a single still"],
      ],
    },
    paragraphs: [
      "So a resized PNG stays a PNG, and its file can still be large. To turn the result into a smaller JPEG, run it through the image compressor or the PNG to JPG converter.",
    ],
  },
  {
    heading: "Quality, metadata and dpi",
    paragraphs: [
      "The tool asks the browser for high-quality smoothing when it scales the picture. A JPEG or WebP is saved again, so a little more detail is discarded. Only pixels are saved, so EXIF and GPS data are not copied. The browser applies the EXIF rotation when it reads the file, so the result is the right way up.",
      "The tool sets pixels, not print size. The browser marks files it creates as 96 dpi where the format records it, so you cannot ask for 300 dpi here.",
    ],
  },
  {
    heading: "Resizing for a file-size limit",
    paragraphs: [
      "If a form wants both a pixel size and a small file, resize first, then run the result through the compressor with a maximum size. Fewer pixels is the largest single saving: halving both sides leaves a quarter of the pixels.",
    ],
  },
  {
    heading: "What this tool leaves out",
    list: [
      "No cropping or rotating, and no preset sizes for social networks or forms.",
      "No dpi or print-size setting.",
      "It cannot read formats your browser cannot decode, such as HEIC in most browsers.",
      "Pictures over 120 million pixels are refused, and very large ones can be slow on a phone.",
    ],
  },
  {
    heading: "Privacy",
    paragraphs: [
      "The code that reads, scales and saves your picture does not call fetch, XMLHttpRequest or a beacon. The browser decodes the file, draws it on a canvas at the new size, and the download button points at a temporary link held in your own browser's memory. The page loads its own scripts, such as analytics, but none of them is given your picture.",
    ],
  },
];

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
    a: "Usually a lot, because fewer pixels means a smaller file. A PNG stays a PNG, though, so it can still be large. To hit an exact file size as well, resize first and then use the image compressor.",
  },
  {
    q: "Which format do I get back?",
    a: "A JPEG stays a JPEG and a WebP stays a WebP, both at 92% quality. A PNG stays a PNG. Any other format becomes a PNG.",
  },
  {
    q: "Can I set the dpi of the resized image?",
    a: "No. The tool sets the pixel size only. The browser marks the file it creates as 96 dpi where the format records resolution.",
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
      related={["image-compressor", "compress-image-to-50kb", "png-to-jpg", "webp-to-jpg", "jpeg-compressor"]}
    >
      <h2>How to resize an image</h2>
      <ol>
        <li>Add your image.</li>
        <li>
          Enter a <strong>width</strong> or a <strong>height</strong> in pixels, or a percentage to scale by.
        </li>
        <li>
          Keep <strong>Keep aspect ratio</strong> ticked so the picture is not stretched. The new size is
          shown under the result.
        </li>
        <li>Press Download.</li>
      </ol>
      <Sections sections={sections} />
      <p>
        For a form with a size limit in KB, see{" "}
        <Link href="/guides/image-size-limits-on-forms">
          how to get a photo under a form&apos;s size limit
        </Link>
        .
      </p>
      <GuideLinks />
      <Sources ids={["mdnTypes", "mdnToBlob", "mdnBitmap"]} />
    </ToolPage>
  );
}
