import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import ImageWorkbench from "@/components/ImageWorkbench";
import { GuideLinks, Sections, Sources, type Section } from "@/components/PageSections";
import ToolPage from "@/components/ToolPage";
import { site, toolBySlug } from "@/site";

const tool = toolBySlug("image-compressor");
export const metadata = pageMetadata(site, {
  title: tool.seoTitle,
  description: tool.description,
  path: tool.path,
});

const sections: Section[] = [
  {
    heading: "What the tool does to your picture",
    paragraphs: [
      "Your browser decodes the file, the tool draws it on a canvas, and the canvas is saved again as a JPEG or WebP. That one path decides what happens to everything else in the file.",
    ],
    table: {
      head: ["Part of the file", "What happens here"],
      rows: [
        [
          "File format",
          "The output is JPEG or WebP, whatever you add. A PNG you add comes out as JPEG or WebP, not PNG",
        ],
        [
          "Pixel size",
          "Unchanged, unless you set a maximum width or a file-size limit forces it down. It is never enlarged",
        ],
        ["Transparency", "JPEG: transparent areas are filled with white. WebP: transparency is kept"],
        ["Animation", "Only a single still is saved"],
        ["EXIF and GPS data", "Not copied. Only pixels are saved"],
        [
          "Rotation",
          "The browser applies the EXIF orientation when it reads the file, so the result is the right way up",
        ],
      ],
    },
  },
  {
    heading: "Quality or a size limit",
    paragraphs: [
      "There are two ways to use it. With the file-size box empty, the Quality slider sets the encoder quality directly, from 5% to 100%. It starts at 75%.",
      "If you type a maximum file size in KB, the slider disappears and the tool searches for the highest quality that fits. It tries 95% first, will not go below 35%, and shrinks the width and height in steps of 85%, down to about a tenth, if quality alone is not enough. It counts 1 KB as 1,000 bytes. If nothing fits, it says so and gives you the smallest file it made.",
    ],
  },
  {
    heading: "What makes an image smaller",
    paragraphs: ["Four things change a file size, roughly in this order of effect:"],
    list: [
      "Dimensions: halving the width and height cuts the pixels to a quarter. Use the maximum width option here or the image resizer.",
      "Format: JPEG and WebP are usually far smaller than PNG for photos.",
      "Quality: a lower quality discards more detail. The savings shrink and the damage grows at the low end.",
      "Metadata: re-encoding drops camera data such as EXIF, including location.",
    ],
  },
  {
    heading: "JPEG, WebP or PNG",
    table: {
      head: ["", "JPEG", "WebP", "PNG"],
      rows: [
        ["Compression", "Lossy", "Lossy or lossless", "Lossless"],
        ["Transparency", "No", "Yes", "Yes"],
        ["Accepted everywhere", "Almost", "Not always", "Almost"],
        ["Available as output here", "Yes", "Yes", "No"],
      ],
    },
    paragraphs: [
      "Pick JPEG when the picture is going to a form, an older program or someone you do not know. Pick WebP for a smaller file when you know the place accepts it. WebP also keeps transparency here. If you need to stay in PNG, this tool cannot do it: the image resizer keeps a PNG as a PNG, and reducing the pixel size is the main way to shrink one.",
      "Google says lossy WebP files are 25 to 34 percent smaller than comparable JPEGs at equivalent quality. Your own result will vary with the picture.",
    ],
  },
  {
    heading: "What this tool leaves out",
    list: [
      "No PNG output and no PNG optimising.",
      "No cropping, rotating or dpi setting. The browser marks files it creates as 96 dpi where the format records it.",
      "No colour picker for transparent areas in this mode: they become white in JPEG. The PNG to JPG converter has one.",
      "Pictures over 120 million pixels are refused, and very large ones can be slow or fail on a phone.",
      "It cannot read formats your browser cannot decode, such as HEIC in most browsers.",
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
    q: "How do I compress an image without losing quality?",
    a: "Some quality is always lost with JPEG and WebP, but a moderate setting, around 75% to 85%, usually looks the same to the eye while cutting the file a lot. Making a very large picture smaller first saves even more.",
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
    a: "JPEG works everywhere. WebP gives a smaller file at similar quality and keeps transparency, but some older programs and forms do not accept it.",
  },
  {
    q: "Why did my PNG get a white background?",
    a: "A JPEG cannot be transparent, so see-through areas are filled with white. Choose WebP as the output format to keep the transparency, or keep the original PNG.",
  },
  {
    q: "Can it compress a PNG and keep it a PNG?",
    a: "No. The output here is JPEG or WebP. To keep a PNG, reduce its pixel size with the image resizer, which saves a PNG as a PNG.",
  },
  {
    q: "Does it remove EXIF and location data?",
    a: "Yes. The tool saves only the pixels, so camera details and GPS position are not in the result.",
  },
  {
    q: "Why did my file get bigger?",
    a: "A picture that was already well compressed can grow when it is saved again at a higher quality. The result line shows a plus sign when that happens. Lower the quality, or set a file-size limit.",
  },
  {
    q: "Is there a limit on file size or number of files?",
    a: "No count limit is set. Pictures over 120 million pixels are refused, and very large photos use a lot of memory, so a huge file may be slow or fail on a phone.",
  },
];

export default function Page() {
  return (
    <ToolPage
      slug="image-compressor"
      lede="Compress JPG, PNG and WebP images in your browser. Set a quality, or a maximum file size in KB. Your photos are never uploaded."
      widget={<ImageWorkbench mode="compress" />}
      faq={faq}
      related={[
        "compress-image-to-100kb",
        "compress-image-to-50kb",
        "compress-image-to-20kb",
        "jpeg-compressor",
        "image-resizer",
        "png-to-jpg",
      ]}
    >
      <h2>How to compress an image</h2>
      <ol>
        <li>Add one or more images by dropping them in the box or choosing them.</li>
        <li>
          Set a <strong>quality</strong>, or type a <strong>maximum file size</strong> in KB if a form or
          website has a limit.
        </li>
        <li>
          Pick the <strong>output format</strong>: JPEG for compatibility, WebP for a smaller file.
        </li>
        <li>
          Check the new size and pixel dimensions, then press <strong>Download</strong> for each file.
        </li>
      </ol>
      <Sections sections={sections} />
      <h2>Need a specific size?</h2>
      <p>
        These pages are set to common limits: <Link href="/compress-image-to-20kb">20 KB</Link>,{" "}
        <Link href="/compress-image-to-50kb">50 KB</Link> and{" "}
        <Link href="/compress-image-to-100kb">100 KB</Link>. To compress a JPEG in particular, see the{" "}
        <Link href="/jpeg-compressor">JPEG compressor</Link>.
      </p>
      <GuideLinks />
      <Sources ids={["mdnTypes", "mdnToBlob", "mdnBitmap", "htmlCanvas", "webp"]} />
    </ToolPage>
  );
}
