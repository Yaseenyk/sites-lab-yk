/** Data for the target-size pages and the format-converter pages. Each entry has its own copy. */
import type { Section } from "@/components/PageSections";
import { bytesPerPixel } from "./image";
import type { SourceId } from "./sources";

export interface Faq {
  q: string;
  a: string;
}

interface PageBase {
  slug: string;
  seoTitle: string;
  h1: string;
  description: string;
  blurb: string;
  lede: string;
  /** Numbered how-to steps for this exact task. Plain text. */
  steps: string[];
  /** Headed content blocks, rendered in order after the steps. */
  sections: Section[];
  faq: Faq[];
  /** Tool slugs to link to; the first three show under the tool. */
  related: string[];
  sources: SourceId[];
}

export interface SizePage extends PageBase {
  kb: number;
}

/** One row per picture size: its pixels, and the bytes the limit leaves for each pixel. */
const budgetRows = (kb: number, sizes: [number, number][]): string[][] =>
  sizes.map(([w, h]) => [
    `${w} x ${h}`,
    (w * h).toLocaleString("en-US"),
    bytesPerPixel(kb, w, h).toPrecision(2),
  ]);
const BUDGET_HEAD = ["Picture size (px)", "Pixels", "Bytes per pixel allowed"];

/** How the tool searches for a fit. It matches compressToTarget in lib/image.ts. */
const SEARCH_STEPS =
  "The tool first saves at 95% quality at the full size, and stops if that already fits. Otherwise it checks 35% quality, the lowest it will go. If 35% fits, it searches between 35% and 95% for the highest quality that still fits. If 35% does not fit, it shrinks the width and height to 85% and repeats, down to about a tenth of the original size.";

const NO_UPLOAD =
  "The code that reads, shrinks and saves your picture does not call fetch, XMLHttpRequest or a beacon. The browser decodes the file, draws it on a canvas, and the download button points at a temporary link to the result held in your own browser's memory. The page does load its own scripts, such as analytics, but none of them is given your picture.";

export const SIZE_PAGES: SizePage[] = [
  {
    slug: "compress-image-to-20kb",
    kb: 20,
    seoTitle: "Compress Image to 20KB Online: Photo or Signature, No Upload",
    h1: "Compress Image to 20KB",
    description:
      "Compress a photo or signature scan to 20 KB or less in your browser. No upload. See what makes 20 KB reachable, and what to do when it is not.",
    blurb: "Shrink a photo or signature scan to under 20 KB for upload forms.",
    lede: "Drop in a photo or a signature scan and get a JPEG under 20 KB. The tool lowers quality first and shrinks the dimensions only if it has to.",
    steps: [
      "Add your photo or signature scan. It stays on your device.",
      "Leave the maximum file size at 20 KB. If the form also gives a width in pixels, resize the picture to that first with the image resizer.",
      "Check the size and the pixel dimensions shown under the result. A signature should still be readable in the preview.",
      "Press Download. The file is saved as a JPEG with -compressed added to its name.",
    ],
    sections: [
      {
        heading: "What 20 KB means",
        paragraphs: [
          "Here 20 KB is 20,000 bytes. The tool counts 1 KB as 1,000 bytes, so a file that passes is also under 20 KB on a form that counts 1,024 bytes per KB.",
          "An uncompressed picture with 8 bits for each of red, green and blue needs 3 bytes per pixel. JPEG stores far less than that, but the budget still shrinks fast as the picture gets bigger. This table shows how many bytes each pixel gets if the whole file is 20,000 bytes. It is arithmetic, not a prediction: what a real picture needs depends on its content.",
        ],
        table: {
          head: BUDGET_HEAD,
          rows: budgetRows(20, [
            [100, 100],
            [200, 200],
            [300, 300],
            [600, 600],
            [1200, 900],
            [4000, 3000],
          ]),
        },
      },
      {
        heading: "How the tool gets to 20 KB",
        paragraphs: [
          SEARCH_STEPS,
          "Because a 20 KB limit is so tight, most phone photos end up in the shrink step. The result card shows the final pixel size and quality, so you can see which of the two did the work.",
        ],
      },
      {
        heading: "Signature or photo: which reaches 20 KB",
        paragraphs: [
          "A scan of a signature on white paper is mostly flat white with a few dark strokes. JPEG usually handles flat areas cheaply, so a signature tends to fit at a reasonable size. A photo of a face is full of fine texture, so it has to be made small before 20 KB is possible.",
          "If the picture is a photo with a busy background, crop to the face before you compress. Fewer pixels to store is the one change that always helps.",
        ],
        list: [
          "Signature: scan or photograph it on plain white paper, crop close to the strokes, then compress.",
          "Passport-style photo: crop to head and shoulders first, then compress.",
          "Check the preview. If a signature looks broken or a face is mush, the dimensions went too low; crop tighter and try again.",
        ],
      },
      {
        heading: "When 20 KB cannot be reached",
        paragraphs: [
          "The tool never goes below 35% quality and stops shrinking at about a tenth of the width and height. If even that is over 20 KB, it shows a warning and gives you the smallest file it made. That happens with large, detailed pictures.",
        ],
        list: [
          "Crop away everything you do not need.",
          "Use the image resizer to set a small width, then run the result through this tool.",
          "Use a plainer background. Smooth areas cost fewer bytes than texture.",
          "Check whether the form really needs 20 KB. The guide on form size limits shows how to read the real requirement.",
        ],
      },
      {
        heading: "Check the form's other rules",
        paragraphs: [
          "A file under the limit can still be rejected. Look for a required width and height in pixels, a required file type, and whether the limit is a maximum or a range with a minimum. This tool saves a JPEG named .jpg by default. It cannot set a dpi value: the browser marks files it creates as 96 dpi where the format records resolution.",
        ],
      },
      {
        heading: "Privacy",
        paragraphs: [
          NO_UPLOAD,
          "Camera details such as EXIF, including any GPS location, are not copied to the new file. The tool draws the pixels onto a canvas and saves the canvas, and it never reads or writes metadata. The picture is turned the right way up first, because the browser applies the EXIF orientation when it reads the file.",
        ],
      },
      {
        heading: "What this tool leaves out",
        list: [
          "It saves a JPEG unless you pick WebP, and forms often need JPG.",
          "Transparent areas are filled with white. There is no colour picker in this mode; use the PNG to JPG converter if you need another background colour.",
          "It cannot crop, rotate or set dpi.",
          "It cannot read formats your browser cannot decode, such as HEIC in most browsers.",
          "Pictures over 120 million pixels are refused, and very large ones can be slow on a phone.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I compress an image to 20 KB?",
        a: "Add the image, leave the maximum file size at 20 KB, and press Download. The tool saves at the highest JPEG quality that fits and shrinks the picture in steps if quality alone is not enough.",
      },
      {
        q: "How do I get a signature under 20 KB?",
        a: "Scan or photograph it on plain white paper, crop close to the writing, then add it here. Flat white with thin dark strokes is much easier to shrink than a photo.",
      },
      {
        q: "Will a photo still look good at 20 KB?",
        a: "At this size you trade detail for file size. A small face crop can stay clear; a large landscape will look soft. Crop before compressing and check the preview.",
      },
      {
        q: "Why does the tool say it could not reach 20 KB?",
        a: "It tried quality down to 35% and sizes down to about a tenth of the original width and height, and the file was still bigger than 20,000 bytes. Crop the picture, or resize it smaller first.",
      },
      {
        q: "Is 20 KB counted as 20,000 or 20,480 bytes?",
        a: "The tool aims for under 20,000 bytes. That file is also under 20 KB when a form counts 1,024 bytes per KB.",
      },
      {
        q: "The file is under 20 KB but the form still rejects it. Why?",
        a: "Check the pixel size, the file type and any minimum size. Also check the file name: some forms accept only certain extensions.",
      },
      {
        q: "Does it keep my EXIF or location data?",
        a: "No. The tool saves only the pixels, so camera details and GPS data are not in the result.",
      },
      {
        q: "Is my photo uploaded to a server?",
        a: "No. The picture is decoded and re-encoded in your browser and never sent anywhere, which matters for ID-style photos.",
      },
    ],
    related: ["image-resizer", "compress-image-to-50kb", "image-compressor", "jpeg-compressor", "png-to-jpg"],
    sources: ["mdnToBlob", "mdnBitmap", "mdnTypes"],
  },
  {
    slug: "compress-image-to-50kb",
    kb: 50,
    seoTitle: "Compress Image to 50KB Online: ID Photo or Document Scan",
    h1: "Compress Image to 50KB",
    description:
      "Compress a photo or document scan to 50 KB or less in your browser. No upload. Steps, a size budget table and what to do if text turns blurry.",
    blurb: "Get a photo or document scan under 50 KB for application and portal uploads.",
    lede: "Drop in a photo or a scanned document and get a JPEG under 50 KB. The tool keeps quality as high as the limit allows and shrinks the picture only when it must.",
    steps: [
      "Add your photo or scan. It stays on your device.",
      "Leave the maximum file size at 50 KB. Crop off borders and desk first if you can, since the tool does not crop.",
      "Press Download and open the file. For a document, zoom in and check that the text is still readable.",
      "If the text is blurry, try a tighter crop, or check whether the portal accepts a larger file.",
    ],
    sections: [
      {
        heading: "What 50 KB gives you",
        paragraphs: [
          "50 KB is 50,000 bytes here, 2.5 times the room of a 20 KB limit. That is enough for a small portrait or one page of a scan at modest size. This table shows how many bytes each pixel gets at several sizes. It is plain division, not a quality promise.",
        ],
        table: {
          head: BUDGET_HEAD,
          rows: budgetRows(50, [
            [200, 200],
            [300, 400],
            [600, 800],
            [1000, 750],
            [1654, 2339],
            [4000, 3000],
          ]),
        },
      },
      {
        heading: "Worked example: from a phone photo to 50 KB",
        paragraphs: [
          "A 4000 x 3000 photo has 12,000,000 pixels. Scaled to 25% on each side it is 1000 x 750, which is 750,000 pixels, 16 times fewer. 50,000 bytes over 750,000 pixels is about 0.067 bytes per pixel, so a plain, soft subject may fit at that size and a detailed one may not. The tool tries smaller sizes in steps and stops at the first that fits, so it finds the balance for you.",
          SEARCH_STEPS,
        ],
      },
      {
        heading: "Photos and document scans behave differently",
        paragraphs: [
          "A portrait has smooth skin and soft shapes, which JPEG usually compresses well. A scanned page is the harder case: sharp black text on white shows fuzz around the letters when JPEG quality is low, and shrinking the page makes small print unreadable.",
        ],
        list: [
          "For a document, scan only the area you need, and keep scans straight so the page fills the frame.",
          "Do not photograph a page from far away. Wasted background uses up the byte budget.",
          "For several pages, add them together: every file gets its own 50 KB limit, its own result line and its own download button.",
        ],
      },
      {
        heading: "When 50 KB is not reachable",
        paragraphs: [
          "The tool never goes below 35% quality and stops shrinking at about a tenth of the original width and height. If the result is still over 50,000 bytes it warns you and gives you the smallest file it made.",
        ],
        list: [
          "A very detailed picture, such as a crowd or foliage, is hard to fit.",
          "A tight crop is the best fix because it removes pixels outright.",
          "If a document page needs to stay legible, ask whether the portal accepts a PDF or a higher limit instead.",
        ],
      },
      {
        heading: "Checks before you upload",
        paragraphs: [
          "Read the form's own rules for pixel size, file type and minimum size. This tool saves a JPEG by default, named .jpg. The WebP choice makes smaller files, but many forms do not accept WebP, so leave JPEG selected for forms. A WebP save also needs your browser to support WebP encoding; if it does not, the tool shows an error.",
        ],
      },
      {
        heading: "Privacy",
        paragraphs: [
          NO_UPLOAD,
          "Identity photos and scans are sensitive, which is why processing in the browser matters here. The saved file carries no EXIF or location data, because only pixels are written.",
        ],
      },
      {
        heading: "What this tool leaves out",
        list: [
          "No cropping, rotating or deskewing.",
          "No dpi setting. The browser marks a file it creates as 96 dpi where the format records it.",
          "No PDF output, and no multi-page documents.",
          "Transparent areas are filled with white.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I compress an image to 50 KB?",
        a: "Add the image, leave the maximum file size at 50 KB, and download the result. The tool picks the highest quality that fits, and shrinks the dimensions if it has to.",
      },
      {
        q: "How do I compress a scanned document to 50 KB?",
        a: "Crop the scan to the page, add it here and check that the text is still readable. If it is blurry, try a tighter crop or ask whether the portal takes a larger file.",
      },
      {
        q: "Why does my text look fuzzy after compressing?",
        a: "JPEG is built for photos. At low quality it smears sharp edges, and when the page is also made smaller the letters lose detail. A larger limit or a tighter crop helps more than lowering quality.",
      },
      {
        q: "Can I compress several files to 50 KB at once?",
        a: "Yes. Select them together. Each file is compressed to its own 50 KB limit and gets its own download button.",
      },
      {
        q: "What if my original is already under 50 KB?",
        a: "You may not need the tool. If you still run it, the picture is re-saved as a JPEG at high quality, so the result can differ in size from the original.",
      },
      {
        q: "Should I pick WebP to get under 50 KB more easily?",
        a: "WebP makes smaller files, but most upload forms ask for JPG or PNG. Use WebP only if the site says it accepts it.",
      },
      {
        q: "Does it remove EXIF and location data?",
        a: "Yes. Only pixels are saved, so the result has no camera details or GPS position.",
      },
      {
        q: "Is anything uploaded?",
        a: "No. The picture is processed in your browser tab and never sent to a server.",
      },
    ],
    related: [
      "compress-image-to-20kb",
      "compress-image-to-100kb",
      "image-resizer",
      "image-compressor",
      "jpeg-compressor",
    ],
    sources: ["mdnToBlob", "mdnBitmap", "mdnTypes"],
  },
  {
    slug: "compress-image-to-100kb",
    kb: 100,
    seoTitle: "Compress Image to 100KB Online: Keep Quality, No Upload",
    h1: "Compress Image to 100KB",
    description:
      "Compress a photo to 100 KB or less in your browser, keeping as much quality as the limit allows. No upload. Free, with a size budget table.",
    blurb: "Get a photo under 100 KB for forms, email and web uploads, keeping as much detail as possible.",
    lede: "Drop in a photo and get a JPEG under 100 KB. At this size the tool can usually keep a lot of detail, so it works mainly by choosing the quality.",
    steps: [
      "Add your photo. It stays on your device.",
      "Leave the maximum file size at 100 KB. Leave Maximum width empty unless you want a smaller picture anyway.",
      "Read the result line: it shows the new size, the pixel size and the quality used. If the pixel size matches the original, only quality changed.",
      "Press Download.",
    ],
    sections: [
      {
        heading: "What 100 KB gives you",
        paragraphs: [
          "100 KB is 100,000 bytes here, twice the room of 50 KB. It suits profile pictures, web uploads, email attachments and forms with a moderate limit. This table shows the bytes each pixel gets at different sizes. It is arithmetic only.",
        ],
        table: {
          head: BUDGET_HEAD,
          rows: budgetRows(100, [
            [400, 400],
            [800, 600],
            [1280, 720],
            [1920, 1080],
            [3000, 2000],
            [4000, 3000],
          ]),
        },
      },
      {
        heading: "Quality first, size second",
        paragraphs: [
          SEARCH_STEPS,
          "With 100 KB, a modest picture often fits at full size, so it keeps its pixels and only the quality drops. A big camera photo usually does not, and the tool shrinks it in steps.",
          "When you want control over the look, set a maximum width yourself. A smaller picture at high quality can look better on screen than a large picture at low quality.",
        ],
      },
      {
        heading: "JPEG or WebP",
        paragraphs: [
          "The Output format menu has JPEG and WebP. JPEG is accepted almost everywhere. Google says lossy WebP files are 25 to 34 percent smaller than comparable JPEGs at equivalent quality, so more detail may fit under 100 KB. Check that the site you are uploading to accepts WebP before you choose it.",
          "In this tool a WebP save keeps transparent areas, while a JPEG save fills them with white.",
        ],
      },
      {
        heading: "When 100 KB is not reachable",
        paragraphs: [
          "The tool never goes below 35% quality and stops shrinking at about a tenth of the width and height. A picture that is still too big after that gets a warning and the smallest result. This is rare at 100 KB, but a huge, detailed picture can do it.",
        ],
      },
      {
        heading: "Orientation and metadata",
        paragraphs: [
          "Phone photos often store their rotation as an EXIF tag. The browser reads that tag and draws the picture the right way up, and the tool saves the rotated pixels without the tag. EXIF and GPS data are not copied to the result.",
        ],
      },
      {
        heading: "Privacy",
        paragraphs: [NO_UPLOAD],
      },
      {
        heading: "What this tool leaves out",
        list: [
          "No cropping, rotating or dpi setting.",
          "No PNG output. A PNG you add is saved as a JPEG or WebP, and JPEG fills transparency with white.",
          "No promise about sharpness for print.",
          "Pictures over 120 million pixels are refused.",
        ],
      },
    ],
    faq: [
      {
        q: "How do I compress an image to 100 KB?",
        a: "Add the image, leave the maximum file size at 100 KB, and download the result. The tool searches for the highest quality that fits and shrinks the picture only if it must.",
      },
      {
        q: "Will my photo keep its pixel size?",
        a: "Often yes at 100 KB, because lowering quality is enough. The result line shows the pixel size so you can check. A very large photo will be shrunk.",
      },
      {
        q: "What quality will I get?",
        a: "The tool tries 95% first and goes down only as far as needed. The result line shows the quality it used.",
      },
      {
        q: "Should I choose JPEG or WebP for 100 KB?",
        a: "Choose JPEG when the destination needs JPG or you are not sure. Choose WebP only if it is accepted, for a smaller file at similar quality.",
      },
      {
        q: "What happens to a transparent PNG?",
        a: "With JPEG the transparent areas turn white. With WebP they stay transparent. If you need a different background colour, use the PNG to JPG converter.",
      },
      {
        q: "Is 100 KB counted as 100,000 or 102,400 bytes?",
        a: "The tool aims for under 100,000 bytes, which also fits a form that counts 1,024 bytes per KB.",
      },
      {
        q: "Does it remove location data from my photo?",
        a: "Yes. Only pixels are saved, so GPS and other camera data are gone from the result.",
      },
      {
        q: "Is the image uploaded anywhere?",
        a: "No. It is processed in your browser and never leaves your device.",
      },
    ],
    related: [
      "compress-image-to-50kb",
      "image-compressor",
      "image-resizer",
      "jpeg-compressor",
      "image-to-jpg",
    ],
    sources: ["mdnToBlob", "mdnBitmap", "webp"],
  },
];

export interface ConvertPage extends PageBase {
  from: string;
  to: string;
  mime: "image/jpeg" | "image/png" | "image/webp";
  hint: string;
}

/** The conversion, opening and saving all happen in the browser tab. Shared by every converter. */
const CONVERT_NO_UPLOAD =
  "The conversion code does not call fetch, XMLHttpRequest or a beacon. The browser decodes the file, the tool draws it on a canvas and saves the canvas, and the download button points at a temporary link held in your own browser's memory. The page loads its own scripts, such as analytics, but none of them is given your picture.";

/** What the tool does with metadata, from the code: it only ever writes pixels. */
const CONVERT_METADATA =
  "The tool saves only pixels. It never reads or writes metadata, so camera details, GPS position and text notes stored in the original are not copied to the new file. If the original had an EXIF rotation tag, the browser applies it when it reads the picture, so the result is the right way up.";

export const CONVERT_PAGES: ConvertPage[] = [
  {
    slug: "png-to-jpg",
    from: "PNG",
    to: "JPG",
    mime: "image/jpeg",
    hint: "PNG images (other formats work too). Files stay on your device.",
    seoTitle: "PNG to JPG Converter: Set Background & Quality (No Upload)",
    h1: "PNG to JPG Converter",
    description:
      "Convert PNG to JPG in your browser with no upload. Pick the quality and the colour that replaces transparent areas. Free, with batch support.",
    blurb: "Convert PNG images to smaller JPG files, with a background for transparency.",
    lede: "Convert PNG images to JPG in your browser. Pick the quality and the background colour that replaces transparent areas.",
    steps: [
      "Add one or more PNG files. They are converted on your device and never uploaded.",
      "If your PNG has see-through areas, pick the background colour. White is the default; choose the colour of the page the picture will sit on if it matters.",
      "Set the quality. It starts at 92%. Lower it for a smaller file, and compare the size shown.",
      "Press Download on each result. The file is named like logo-converted.jpg.",
    ],
    sections: [
      {
        heading: "PNG and JPG compared",
        table: {
          head: ["", "PNG", "JPG"],
          rows: [
            ["Compression", "Lossless", "Lossy"],
            ["Transparency", "Yes (alpha channel)", "No"],
            [
              "Best for",
              "Graphics, logos, text, screenshots, images you will edit again",
              "Photographs you only need to share",
            ],
            ["Typical effect on a photo", "Large file, exact pixels", "Smaller file, some detail discarded"],
          ],
        },
        paragraphs: [
          "PNG keeps every pixel exactly. JPG discards fine detail the eye is least likely to notice, which is why a photo is usually much smaller as a JPG.",
        ],
      },
      {
        heading: "What happens to transparent areas",
        paragraphs: [
          "JPG cannot be transparent. Before drawing your PNG, the tool paints the whole canvas with the background colour you chose, then draws the PNG on top. Fully transparent pixels become that colour. Semi-transparent pixels, such as a soft shadow or an anti-aliased edge, are blended with it.",
          "That blend is why a logo with a smooth edge can show a faint halo if you convert it on white and then place it on a dark page. Pick the colour of the destination instead.",
        ],
      },
      {
        heading: "Quality and file size",
        paragraphs: [
          "The slider runs from 30% to 100% and starts at 92%. A lower number makes a smaller file and discards more detail. The quality value is passed to your browser's JPEG encoder, so the same number in another program can give a different file.",
          "A JPG is not always smaller. For flat graphics, text and screenshots with sharp edges, the PNG can be as small or smaller, and sharper. Compare the two sizes the tool shows before you replace your original.",
        ],
      },
      {
        heading: "When to keep the PNG",
        list: [
          "The picture has transparency you still need.",
          "It is a logo, icon, diagram or screenshot with sharp lines and text.",
          "You will edit it again. Every JPG save discards more detail.",
        ],
      },
      {
        heading: "What this converter leaves out",
        list: [
          "An animated PNG (APNG) becomes a single still, because a canvas holds one picture and JPG cannot be animated.",
          CONVERT_METADATA,
          "The picture keeps its pixel size. To make it smaller, use the image resizer afterwards.",
          "To hit a size such as 100 KB, use the compress pages: they pick the quality for you.",
        ],
      },
      {
        heading: "Privacy",
        paragraphs: [CONVERT_NO_UPLOAD],
      },
    ],
    faq: [
      {
        q: "How do I convert PNG to JPG?",
        a: "Add the PNG files, adjust the quality if you want, and download the JPGs. The conversion runs in your browser, so nothing is uploaded.",
      },
      {
        q: "What happens to the transparent background?",
        a: "JPG has no transparency, so transparent pixels are painted with the background colour you pick. It is white by default.",
      },
      {
        q: "Why does my logo have a halo after converting?",
        a: "Soft edges are partly transparent, and they are blended with the background colour you chose. Convert again with the colour of the page the logo will sit on.",
      },
      {
        q: "Will converting reduce quality?",
        a: "JPG is lossy, so some detail is discarded. At a quality around 90% the difference is usually hard to see for photos. For text and sharp lines it is easier to notice.",
      },
      {
        q: "Is a JPG always smaller than a PNG?",
        a: "For photos it usually is. For flat graphics, logos and text, a PNG can be as small or smaller, so check the sizes shown.",
      },
      {
        q: "Is the JPG the same pixel size as the PNG?",
        a: "Yes. The tool does not resize. Use the image resizer if you need fewer pixels.",
      },
      {
        q: "Can I convert many PNG files at once?",
        a: "Yes. Select several files and each is converted and listed with its own download button.",
      },
      {
        q: "Does it keep metadata from the PNG?",
        a: "No. Only pixels are saved, so text chunks and other metadata are not in the JPG.",
      },
    ],
    related: ["image-to-jpg", "image-compressor", "image-resizer", "jpg-to-png", "webp-to-jpg"],
    sources: ["mdnTypes", "mdnToBlob", "mdnBitmap", "htmlCanvas"],
  },
  {
    slug: "jpg-to-png",
    from: "JPG",
    to: "PNG",
    mime: "image/png",
    hint: "JPG images (other formats work too). Files stay on your device.",
    seoTitle: "JPG to PNG Converter: Lossless PNG Copy, No Upload",
    h1: "JPG to PNG Converter",
    description:
      "Convert JPG to PNG in your browser with no upload. Get a lossless PNG copy for editing. See what changes, why the file is bigger and what stays the same.",
    blurb: "Convert JPG images to lossless PNG files in your browser.",
    lede: "Convert JPG images to PNG in your browser. The PNG is lossless, so it will not lose any more detail when you edit and save it again.",
    steps: [
      "Add one or more JPG files. They are converted on your device and never uploaded.",
      "There are no options to set: PNG is lossless, so there is no quality slider.",
      "Check the new size next to the old one. Expect the PNG to be larger.",
      "Press Download on each result. The file is named like photo-converted.png.",
    ],
    sections: [
      {
        heading: "What a PNG copy of a JPG is, and is not",
        paragraphs: [
          "The tool decodes the JPG into pixels and saves those pixels as a PNG. PNG is lossless, so nothing more is lost from that point. The detail the JPG already discarded when it was made does not come back, and the blocky patches some JPGs show stay in the PNG.",
          "A JPG has no transparency, so the PNG has the same solid background. The tool does not remove backgrounds.",
        ],
        table: {
          head: ["", "JPG you add", "PNG you get"],
          rows: [
            ["Pixels", "As stored", "The same decoded pixels"],
            ["Detail already lost", "Lost", "Still lost"],
            ["Further loss when you edit and save again", "Yes, each save", "No"],
            ["Transparency", "None", "None added"],
            ["File size", "Smaller", "Usually larger"],
          ],
        },
      },
      {
        heading: "Why you might still want PNG",
        list: [
          "A site or form asks for PNG only.",
          "You will edit the picture several times and want no more loss from saving.",
          "The picture is a screenshot or graphic that was saved as JPG, and you want a safe working copy.",
          "Your editing tool handles PNG better than JPG.",
        ],
      },
      {
        heading: "Why the PNG is bigger",
        paragraphs: [
          "PNG compresses without throwing anything away, while JPG compresses by discarding detail. For a photo that usually means a much larger PNG. The tool shows both sizes so you can see it. This is also why PNG is the wrong choice when a form has a small size limit: use the compress pages, which save a JPEG.",
        ],
      },
      {
        heading: "How this tool saves the PNG",
        paragraphs: [
          "The picture keeps its pixel size. The browser's PNG encoder is used with no quality setting, so there is nothing to tune, and the background colour option you see on other converters does not apply here. Where the format records resolution, your browser marks the file as 96 dpi.",
          CONVERT_METADATA,
        ],
      },
      {
        heading: "What this converter leaves out",
        list: [
          "It does not restore quality, sharpen, or remove JPG artefacts.",
          "It does not cut out backgrounds or add transparency.",
          "It does not shrink the PNG. Use the image resizer to reduce the pixel size.",
        ],
      },
      {
        heading: "Privacy",
        paragraphs: [CONVERT_NO_UPLOAD],
      },
    ],
    faq: [
      {
        q: "How do I convert JPG to PNG?",
        a: "Add the JPG files and download the PNGs. The conversion happens in your browser and nothing is uploaded.",
      },
      {
        q: "Does converting JPG to PNG improve quality?",
        a: "No. The detail lost when the JPG was made stays lost. PNG only stops further loss when you edit and save again.",
      },
      {
        q: "Will the PNG have a transparent background?",
        a: "No. A JPG has no transparency, so the PNG has the same solid background. Removing a background needs an editing tool.",
      },
      {
        q: "Why is the PNG so much bigger?",
        a: "PNG is lossless and stores the pixels exactly, while JPG discards detail to save space. For photos the PNG is usually much larger.",
      },
      {
        q: "Is there a quality setting?",
        a: "No. PNG has no quality setting here, because nothing is discarded.",
      },
      {
        q: "When should I use PNG instead of JPG?",
        a: "For graphics, logos, text and screenshots with sharp edges, for images with transparency, and for images you will edit many times. Use JPG for photos you only need to share.",
      },
      {
        q: "Can I make the PNG smaller afterwards?",
        a: "You can reduce the pixel size with the image resizer. To fit a small file-size limit, go back to a JPEG with the compress pages instead.",
      },
      {
        q: "Does the PNG keep the camera data from the JPG?",
        a: "No. Only pixels are saved, so EXIF and GPS data are not in the PNG.",
      },
    ],
    related: ["png-to-jpg", "image-resizer", "image-compressor", "image-to-jpg", "webp-to-jpg"],
    sources: ["mdnTypes", "mdnToBlob", "mdnBitmap"],
  },
  {
    slug: "webp-to-jpg",
    from: "WebP",
    to: "JPG",
    mime: "image/jpeg",
    hint: "WebP images (other formats work too). Files stay on your device.",
    seoTitle: "WebP to JPG Converter: Open WebP Anywhere (No Upload)",
    h1: "WebP to JPG Converter",
    description:
      "Convert WebP to JPG in your browser with no upload. Fix a .webp download that a form or app rejects. Handles transparency and animated WebP.",
    blurb: "Convert WebP images to widely supported JPG files.",
    lede: "Convert WebP images to JPG in your browser, so they open in any program and upload to any form.",
    steps: [
      "Add the .webp files you saved from a website. They are converted on your device and never uploaded.",
      "If the WebP has transparent areas, pick the background colour that replaces them. White is the default.",
      "Keep the quality at 92%, or lower it for a smaller file.",
      "Press Download on each result. The file is named like image-converted.jpg and opens in any program that reads JPG.",
    ],
    sections: [
      {
        heading: "Why you got a WebP file",
        paragraphs: [
          "Many sites serve WebP because it makes smaller files. Google says lossy WebP files are 25 to 34 percent smaller than comparable JPEGs at equivalent quality. When you save such a picture, the browser saves what the site sent, so you get a .webp file.",
          "WebP is not new: according to MDN, it works in all versions of Chrome, Edge, Firefox, Opera and Safari. On Safari for macOS it needs Safari 14 or later on macOS Big Sur or newer. Older editors, some upload forms, and many email and document tools still do not accept it.",
        ],
      },
      {
        heading: "WebP and JPG compared",
        table: {
          head: ["", "WebP", "JPG"],
          rows: [
            ["Compression", "Lossy or lossless", "Lossy"],
            ["Transparency", "Yes, in both modes", "No"],
            ["Animation", "Yes", "No"],
            ["Accepted by older software and forms", "Not always", "Almost always"],
          ],
        },
      },
      {
        heading: "Animated and transparent WebP",
        paragraphs: [
          "An animated WebP becomes a single still picture. A canvas draws an animated image as its default image, or its first frame, so the JPG shows one frame and the motion is gone.",
          "A WebP with transparency is flattened. The tool paints the background colour you chose and draws the WebP over it, so transparent areas take that colour. Choose the colour of the place you will use the image.",
        ],
      },
      {
        heading: "What to expect from the file",
        paragraphs: [
          "If the WebP was lossy, this is a second lossy save, so a little more detail is discarded. At 92% that is usually hard to see for photos. The JPG is also likely to be larger than the WebP, since the same picture often takes more bytes in JPG.",
          "The tool keeps the pixel size. If the JPG is too large for a form, add it to the compress pages afterwards.",
        ],
      },
      {
        heading: "What this converter leaves out",
        list: [
          "No animation. Only a still is saved.",
          CONVERT_METADATA,
          "It can only open a WebP your browser can decode. If it cannot, the tool shows the message that this browser cannot read that image format.",
        ],
      },
      {
        heading: "Privacy",
        paragraphs: [CONVERT_NO_UPLOAD],
      },
    ],
    faq: [
      {
        q: "How do I convert WebP to JPG?",
        a: "Add the WebP files and download the JPGs. The conversion runs in your browser, so the images are not uploaded.",
      },
      {
        q: "Why did my image download as WebP?",
        a: "Many websites serve WebP because the files are smaller. Browsers save what the site sent, so you get a .webp file that some programs cannot open.",
      },
      {
        q: "Does it keep animation?",
        a: "No. JPG cannot be animated, so only a single still from an animated WebP is kept.",
      },
      {
        q: "What happens to transparency?",
        a: "JPG has no transparency, so transparent areas are filled with the background colour you pick, white by default.",
      },
      {
        q: "Will quality suffer?",
        a: "Some loss is possible because the picture is saved lossy a second time if the WebP was lossy. At about 90% quality it is usually hard to notice.",
      },
      {
        q: "Why is the JPG bigger than my WebP?",
        a: "WebP is a more efficient format, so the same picture often takes more bytes as a JPG. Lower the quality, or use the compress pages to reach a size limit.",
      },
      {
        q: "Which browsers can open WebP?",
        a: "MDN lists all versions of Chrome, Edge, Firefox, Opera and Safari. Safari on macOS needs version 14 or later on Big Sur or newer.",
      },
      {
        q: "Does the JPG keep the metadata?",
        a: "No. Only pixels are saved, so any metadata in the WebP is not in the JPG.",
      },
    ],
    related: ["image-to-jpg", "png-to-jpg", "image-compressor", "avif-to-jpg", "image-resizer"],
    sources: ["webp", "mdnTypes", "mdnToBlob", "htmlCanvas"],
  },
  {
    slug: "avif-to-jpg",
    from: "AVIF",
    to: "JPG",
    mime: "image/jpeg",
    hint: "AVIF images (other formats work too). Files stay on your device.",
    seoTitle: "AVIF to JPG Converter: Browser Support & No Upload",
    h1: "AVIF to JPG Converter",
    description:
      "Convert AVIF to JPG in your browser with no upload. Which browsers read AVIF, and what happens to HDR, transparency and animation.",
    blurb: "Convert AVIF images to JPG so every app and website accepts them.",
    lede: "Convert AVIF images to JPG in your browser. It works when your browser can read AVIF, which current Chrome, Edge, Firefox and Safari can.",
    steps: [
      "Add the .avif files. Your browser reads them and nothing is uploaded.",
      "If an AVIF has transparent areas, pick the background colour that replaces them.",
      "Keep the quality at 92%, or adjust it. Check the size shown against the original.",
      "Press Download on each result. If the tool says the browser cannot read the format, try a newer browser (see the table).",
    ],
    sections: [
      {
        heading: "What AVIF is",
        paragraphs: [
          "AVIF is an image format that stores AV1 video-codec data in a HEIF container. MDN says it supports lossy and lossless compression, transparency, animation, and 8, 10 and 12 bits per channel. It is royalty free. Support in editors, upload forms and older software is still patchy, so a .avif file is often rejected.",
        ],
      },
      {
        heading: "Which browsers can read AVIF",
        paragraphs: [
          "This tool does not decode AVIF itself. It asks your browser to read the file, so it works only where the browser supports AVIF. MDN lists these first versions with support:",
        ],
        table: {
          head: ["Browser", "First version with AVIF"],
          rows: [
            ["Chrome", "85"],
            ["Opera", "71"],
            ["Firefox", "93 (animated AVIF from 113)"],
            ["Safari", "16.1"],
            ["Edge", "121"],
          ],
        },
      },
      {
        heading: "What changes when you save as JPG",
        list: [
          "Colour precision: AVIF can hold 10 or 12 bits per channel, and a JPG holds 8, so extra precision is lost.",
          "Transparency: JPG has none, so transparent areas take the background colour you pick.",
          "Animation: only a single still is saved. A canvas draws an animated image as its default image or first frame.",
          "Size: MDN says lossy AVIF files are around 50 percent smaller than JPEG at visually similar quality, so your JPG is likely to be larger than the AVIF.",
          "Quality: this is a lossy save, so a little more detail may be discarded.",
        ],
      },
      {
        heading: "AVIF is not HEIC",
        paragraphs: [
          "iPhone photos are often HEIC, which is a different format, even though AVIF uses the same HEIF container. This tool reads only what your browser can decode, and HEIC is not among the formats MDN lists for the web, so a HEIC file is likely to fail with a message that the browser cannot read it. Switching the phone camera to save as JPG is the simplest fix.",
        ],
      },
      {
        heading: "What this converter leaves out",
        list: [
          "No animation, only a still.",
          CONVERT_METADATA,
          "No wide-gamut or HDR output: the JPG is an ordinary 8-bit file.",
          "It cannot read AVIF in a browser that does not support it.",
        ],
      },
      {
        heading: "Privacy",
        paragraphs: [CONVERT_NO_UPLOAD],
      },
    ],
    faq: [
      {
        q: "How do I convert AVIF to JPG?",
        a: "Add the AVIF files and download the JPGs. Your browser reads the AVIF and re-saves it as JPG, and nothing is uploaded.",
      },
      {
        q: "Why will it not open my AVIF file?",
        a: "Your browser may be too old to read AVIF. MDN lists Chrome 85, Edge 121, Opera 71, Firefox 93 and Safari 16.1 as the first versions with support. Try a current browser.",
      },
      {
        q: "Can it convert HEIC photos from an iPhone?",
        a: "Probably not. HEIC is a different format from AVIF, and this tool can only read what your browser can decode. Setting the camera to save JPG avoids the problem.",
      },
      {
        q: "What about transparency?",
        a: "JPG has no transparency, so transparent areas are filled with the background colour you choose, white by default.",
      },
      {
        q: "Does it convert animated AVIF?",
        a: "Only a single still is saved. JPG cannot be animated.",
      },
      {
        q: "Is the JPG larger than the AVIF?",
        a: "Usually yes. MDN says AVIF is much more efficient than JPEG, so the same picture takes more bytes as a JPG.",
      },
      {
        q: "Will I lose HDR or colour depth?",
        a: "Yes. AVIF can hold 10 or 12 bits per channel, but a JPG holds 8, so the result is a standard 8-bit picture.",
      },
      {
        q: "Is the image uploaded anywhere?",
        a: "No. Your browser decodes and re-saves it on your device.",
      },
    ],
    related: ["image-to-jpg", "webp-to-jpg", "image-compressor", "png-to-jpg", "image-resizer"],
    sources: ["mdnTypes", "mdnToBlob", "htmlCanvas"],
  },
  {
    slug: "image-to-jpg",
    from: "Image",
    to: "JPG",
    mime: "image/jpeg",
    hint: "PNG, WebP, AVIF, GIF or JPG images. Files stay on your device.",
    seoTitle: "Convert Image to JPG: PNG, WebP, AVIF, GIF (No Upload)",
    h1: "Image to JPG Converter",
    description:
      "Convert any image to JPG in your browser with no upload: PNG, WebP, AVIF, GIF and more. See what happens to each format and what the tool cannot read.",
    blurb: "Convert PNG, WebP, AVIF and other images to JPG in one step.",
    lede: "Convert almost any image to JPG in your browser. Drop in PNG, WebP, AVIF or other pictures, pick the quality, and download the JPGs.",
    steps: [
      "Add images of any kind, in one batch if you like. Each is converted on your device and never uploaded.",
      "Pick the background colour for transparent areas, and the quality. The defaults are white and 92%.",
      "Check each result line. A file the browser cannot read shows a message and the rest carry on.",
      "Press Download on each. Every file is named like original-converted.jpg.",
    ],
    sections: [
      {
        heading: "What happens to each kind of image",
        table: {
          head: ["You add", "What the JPG gets"],
          rows: [
            ["PNG", "Same pixels, transparent areas filled with your background colour"],
            ["WebP", "Same, and an animated WebP becomes one still"],
            ["AVIF", "Same, saved at 8 bits per channel, if your browser reads AVIF"],
            ["GIF", "A single still; animation is lost, and a transparent colour takes your background"],
            ["JPG", "Saved again at the quality you pick, which discards a little more detail"],
            ["HEIC and others", "Converted only if your browser can decode them; most cannot read HEIC"],
          ],
        },
        paragraphs: [
          "This converter does not read formats itself. Your browser decodes each file, so the list depends on the browser. The file chooser accepts any file marked as an image, and files ending in .avif, .webp, .jpg, .jpeg or .png.",
        ],
      },
      {
        heading: "Why convert to JPG",
        paragraphs: [
          "JPG is a lossy format that every major browser and nearly all software and upload forms accept. Screenshots, web downloads and phone photos often arrive as PNG, WebP or AVIF, which some forms reject.",
        ],
      },
      {
        heading: "Choosing the quality",
        list: [
          "92% is the starting point: a good balance for photos you may print or reuse.",
          "Around 75% to 85% makes a clearly smaller file for web pages and email.",
          "Below about 50%, blocky artefacts are easy to see.",
          "For a file under a set size, use the compress pages, which choose the quality for you.",
        ],
      },
      {
        heading: "Transparency, animation and metadata",
        paragraphs: [
          "JPG has no transparency, so the tool paints your background colour first and draws the picture over it. Semi-transparent edges blend with that colour. JPG also has no animation, so only a still is saved: a canvas draws an animated image as its default image or first frame.",
          CONVERT_METADATA,
        ],
      },
      {
        heading: "If you need a specific format",
        paragraphs: [
          "Each of these has its own page with detail on that format: PNG, WebP, AVIF. For the other direction, JPG to PNG makes a lossless copy.",
        ],
        list: [
          "PNG to JPG: background colour for logos with transparency.",
          "WebP to JPG: animated and transparent WebP, and browser support.",
          "AVIF to JPG: which browsers read AVIF, and what is lost.",
          "JPG to PNG: a lossless copy for editing.",
        ],
      },
      {
        heading: "What this converter leaves out",
        list: [
          "No resizing: the picture keeps its pixel size. Use the image resizer.",
          "No HEIC support in most browsers.",
          "Pictures over 120 million pixels are refused.",
          "No upload and no account, so nothing is stored for you to come back to.",
        ],
      },
      {
        heading: "Privacy",
        paragraphs: [CONVERT_NO_UPLOAD],
      },
    ],
    faq: [
      {
        q: "How do I convert an image to JPG?",
        a: "Add the images, choose the quality, and download the JPGs. The conversion runs in your browser, so nothing is uploaded.",
      },
      {
        q: "Which formats can I convert to JPG?",
        a: "Any format your browser can display, including PNG, WebP, GIF and JPG. AVIF works in browsers that support it, such as current Chrome, Edge, Firefox and Safari.",
      },
      {
        q: "Can I convert HEIC photos from an iPhone?",
        a: "Probably not. This tool can only read what your browser can decode, and most browsers cannot read HEIC. Setting the camera to save JPG avoids the problem.",
      },
      {
        q: "What quality should I choose?",
        a: "About 90% is a good default: files are much smaller than PNG and the difference is hard to see. Lower it for a smaller file, or raise it for photos you will print.",
      },
      {
        q: "What happens to transparent backgrounds?",
        a: "JPG cannot be transparent, so transparent pixels are painted with the background colour you pick, white by default.",
      },
      {
        q: "What happens to an animated GIF or WebP?",
        a: "Only a single still is saved, because JPG cannot be animated.",
      },
      {
        q: "Can I convert many files at once?",
        a: "Yes. Select several files and each is converted and listed with its own download button. A file that cannot be read shows an error without stopping the others.",
      },
      {
        q: "Does the JPG keep camera and location data?",
        a: "No. Only pixels are saved, so EXIF and GPS data are not in the result.",
      },
      {
        q: "Does it make the picture smaller in pixels?",
        a: "No. The pixel size stays the same. Use the image resizer to change it.",
      },
    ],
    related: ["png-to-jpg", "webp-to-jpg", "avif-to-jpg", "image-compressor", "image-resizer"],
    sources: ["mdnTypes", "mdnToBlob", "mdnBitmap", "htmlCanvas"],
  },
];

export const sizePageBySlug = (slug: string): SizePage => {
  const p = SIZE_PAGES.find((x) => x.slug === slug);
  if (!p) {
    throw new Error(`unknown size page ${slug}`);
  }
  return p;
};

export const convertPageBySlug = (slug: string): ConvertPage => {
  const p = CONVERT_PAGES.find((x) => x.slug === slug);
  if (!p) {
    throw new Error(`unknown convert page ${slug}`);
  }
  return p;
};
