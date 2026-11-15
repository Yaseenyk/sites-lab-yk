import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import ImageWorkbench from "@/components/ImageWorkbench";
import { GuideLinks, Sections, Sources, type Section } from "@/components/PageSections";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("jpeg-compressor");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const sections: Section[] = [
  {
    heading: "How JPEG compression works",
    paragraphs: [
      "JPEG is a lossy format based on the discrete cosine transform. It discards fine detail the eye is least likely to notice, mostly small colour and texture changes, and stores what is left. A lower quality discards more, so the file is smaller and the picture is less exact. JPG and JPEG are the same format.",
      "According to MDN, a JPEG has no transparency and stores 8 bits for each of red, green and blue.",
    ],
  },
  {
    heading: "Choosing a quality",
    table: {
      head: ["Quality", "Typical use"],
      rows: [
        ["90% and up", "Photos you will print or edit again"],
        ["75% to 85%", "Web pages, email and sharing: the best balance"],
        ["50% to 70%", "Thumbnails and strict size limits"],
        ["Below 50%", "Only when nothing else fits; artefacts are visible"],
      ],
    },
    paragraphs: [
      "These bands are rules of thumb, not measurements. The number is passed to your browser's JPEG encoder, so the same number in another program can give a different file. Judge by the preview and the size shown.",
    ],
  },
  {
    heading: "Compressing a JPEG that is already a JPEG",
    paragraphs: [
      "The tool decodes your JPEG to pixels and saves a new JPEG. That is a second lossy save, so a little more detail is discarded each time. Compress from the original camera file when you can, and avoid re-saving the same file many times.",
      "If the JPEG was already saved at a low quality, saving it again at a higher one can make the file bigger, not smaller. The result line then shows a plus sign next to the percentage. Lower the quality, or type a file-size limit instead.",
    ],
  },
  {
    heading: "Quality slider or a size limit",
    paragraphs: [
      "With the file-size box empty, the Quality slider sets the encoder quality, from 5% to 100%, starting at 75%. If you type a maximum size in KB, the tool tries 95% first, will not go below 35%, and shrinks the width and height in steps of 85%, down to about a tenth, if quality alone cannot reach it. It counts 1 KB as 1,000 bytes. Leave the Output format menu on JPEG for a JPEG result.",
    ],
  },
  {
    heading: "Orientation and metadata",
    paragraphs: [
      "Phone photos often store their rotation in an EXIF tag. The browser applies it when it reads the file, so the saved picture is the right way up and has no orientation tag. EXIF data, including camera model and GPS position, is not copied to the result, because only pixels are saved. If you need to keep it, this tool is the wrong one.",
    ],
  },
  {
    heading: "What this tool leaves out",
    list: [
      "No encoder settings other than quality.",
      "No cropping, rotating or dpi setting.",
      "Transparent areas in a PNG or WebP you add are filled with white.",
      "Pictures over 120 million pixels are refused, and very large ones can be slow on a phone.",
    ],
  },
  {
    heading: "Privacy",
    paragraphs: [
      "The code that reads, shrinks and saves your picture does not call fetch, XMLHttpRequest or a beacon. The browser decodes the file, draws it on a canvas, and the download button points at a temporary link held in your own browser's memory. The page loads its own scripts, such as analytics, but none of them is given your picture.",
    ],
  },
];

const faq = [
  {
    q: "How does JPEG compression work?",
    a: "JPEG discards detail the eye is least likely to notice, mostly fine colour and texture, and stores what is left efficiently. A lower quality discards more, so the file is smaller and the picture is less exact.",
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
    q: "Why did my JPEG get bigger after compressing?",
    a: "If it was already saved at a low quality, a new save at a higher quality stores more data. Lower the quality or set a file-size limit.",
  },
  {
    q: "Is JPG the same as JPEG?",
    a: "Yes. They are the same format, and the tool saves files with the .jpg extension.",
  },
  {
    q: "Does the JPEG keep its camera and location data?",
    a: "No. The saved file has no EXIF, GPS or camera details, only pixels. The picture is turned the right way up first.",
  },
  {
    q: "Is my photo uploaded?",
    a: "No. The JPEG is decoded and re-encoded in your browser and never leaves your device.",
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
      related={[
        "compress-image-to-100kb",
        "compress-image-to-50kb",
        "image-compressor",
        "image-resizer",
        "image-to-jpg",
      ]}
    >
      <h2>How to compress a JPEG</h2>
      <ol>
        <li>Add one or more JPEG files, or drop them in the box.</li>
        <li>
          Pick a <strong>quality</strong>, or type a <strong>maximum file size</strong> in KB if a form or
          website has a limit.
        </li>
        <li>Compare the sizes shown. If a file got bigger, lower the quality.</li>
        <li>
          Press <strong>Download</strong> for each result.
        </li>
      </ol>
      <Sections sections={sections} />
      <p>
        Dimensions matter even more than quality: halving the width and height cuts the pixels to a quarter.
        Use the <Link href="/image-resizer">image resizer</Link> first for a big photo, or go straight to a
        set size with <Link href="/compress-image-to-100kb">100 KB</Link>,{" "}
        <Link href="/compress-image-to-50kb">50 KB</Link> or <Link href="/compress-image-to-20kb">20 KB</Link>
        .
      </p>
      <GuideLinks />
      <Sources ids={["mdnTypes", "mdnToBlob", "mdnBitmap"]} />
    </ToolPage>
  );
}
