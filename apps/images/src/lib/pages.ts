/** Data for the target-size pages and the format-converter pages. Each entry has its own copy. */
export interface Faq {
  q: string;
  a: string;
}

export interface SizePage {
  slug: string;
  kb: number;
  seoTitle: string;
  h1: string;
  description: string;
  blurb: string;
  lede: string;
  about: string[];
  tips: string[];
  faq: Faq[];
}

export const SIZE_PAGES: SizePage[] = [
  {
    slug: "compress-image-to-20kb",
    kb: 20,
    seoTitle: "Compress Image to 20KB or Less Online (No Upload)",
    h1: "Compress Image to 20KB",
    description:
      "Compress a JPG or PNG to 20 KB or less online, with no upload. Free and instant: your photo never leaves your device. Download the result in one click.",
    blurb: "Shrink a photo or signature scan to under 20 KB for upload forms.",
    lede: "Drop in a photo or a signature scan and get a JPEG under 20 KB. The tool lowers quality first and shrinks the dimensions only if it has to.",
    about: [
      "20 KB is a very small file, about the size of a short text document. Online application forms often set a limit this low for a photo or a scanned signature, so a normal phone photo, which is typically megabytes, has to be reduced a long way.",
      "The tool tries the best quality that still fits. If the picture cannot reach 20 KB at its current dimensions, it makes the image smaller in steps until it fits, and it tells you if even the smallest result is over the limit.",
    ],
    tips: [
      "Crop the photo to just the face or signature first. Less area means a smaller file at the same quality.",
      "If the form states a pixel size, resize to that size with the image resizer first, then compress.",
      "Signatures and line drawings on white compress far better than photos.",
      "Save as JPEG when the form says JPG. Renaming a PNG to .jpg does not make it a JPEG.",
    ],
    faq: [
      {
        q: "How do I compress an image to 20 KB?",
        a: "Add the image, make sure the maximum file size is 20 KB, and download the result. The tool finds the highest quality that fits, and reduces the pixel dimensions if quality alone is not enough.",
      },
      {
        q: "Will the photo still look good at 20 KB?",
        a: "At this size you trade detail for file size. A small face photo or a signature stays clear; a large landscape will look soft. Cropping before compressing helps a lot.",
      },
      {
        q: "Is my photo uploaded to a server?",
        a: "No. The image is decoded and re-encoded in your browser. It never leaves your device, which matters for ID-style photos.",
      },
      {
        q: "How is 20 KB counted, 1,000 or 1,024 bytes?",
        a: "Forms differ, so the tool counts 1 KB as 1,000 bytes. A file under 20,000 bytes is also under 20 KB when a form counts 1,024 bytes per KB.",
      },
      {
        q: "Why is the result under 20 KB but the form still rejects it?",
        a: "Check the other requirements: the exact pixel size, the format (JPG vs PNG) and whether the limit is a maximum or a range. Some forms also set a minimum size.",
      },
      {
        q: "Can I compress several images at once?",
        a: "Yes. Select multiple files and each is compressed to the limit and listed with its own download button.",
      },
    ],
  },
  {
    slug: "compress-image-to-50kb",
    kb: 50,
    seoTitle: "Compress Image to 50KB or Less Online (No Upload)",
    h1: "Compress Image to 50KB",
    description:
      "Compress a JPG or PNG to 50 KB or less online, with no upload. Free and instant: your picture never leaves your device. Download the result in one click.",
    blurb: "Get a photo under 50 KB for application forms and profile uploads.",
    lede: "Add a picture and download a JPEG under 50 KB. Quality is set automatically to the best value that fits.",
    about: [
      "50 KB is a common ceiling for profile photos and ID-style pictures on application portals. It leaves room for a clear, small portrait, but a full-size camera photo is many times larger and needs compressing.",
      "The tool searches for the highest JPEG quality that stays under 50 KB, so you keep as much detail as the limit allows, instead of guessing at a quality slider.",
    ],
    tips: [
      "Use a head-and-shoulders crop. Backgrounds with plain colour compress well.",
      "If the result is just under 50 KB, you are already at the best quality that fits.",
      "Limit the maximum width (for example to 600 px) if the file is still too large.",
      "Keep the original. Compression is lossy, so always work from the untouched file.",
    ],
    faq: [
      {
        q: "How do I reduce an image to 50 KB?",
        a: "Add the image with the maximum file size set to 50 KB. The tool lowers the quality until the file fits, then shrinks the dimensions if it still does not.",
      },
      {
        q: "Is 50 KB enough for a passport-style photo?",
        a: "For a small portrait, usually yes, provided the pixel dimensions are modest. Very large pixel dimensions will force a lower quality to hit 50 KB.",
      },
      {
        q: "Does the image get uploaded anywhere?",
        a: "No. Everything happens in your browser, and the files never leave your device.",
      },
      {
        q: "Which format should I choose?",
        a: "Use JPEG for photos and for any form that asks for a JPG. WebP gives smaller files at the same quality but is not accepted everywhere.",
      },
      {
        q: "Can I compress a PNG to 50 KB?",
        a: "Yes. The PNG is converted to JPEG (or WebP) to reach the size. Transparent areas are filled with white, because JPEG has no transparency.",
      },
    ],
  },
  {
    slug: "compress-image-to-100kb",
    kb: 100,
    seoTitle: "Compress Image to 100KB or Less Online (No Upload)",
    h1: "Compress Image to 100KB",
    description:
      "Compress a JPG or PNG to 100 KB or less online, with no upload. Free and instant: your picture never leaves your device. Download the result in one click.",
    blurb: "Reduce a photo to under 100 KB with the best quality that fits.",
    lede: "Add an image and get a JPEG under 100 KB. Handy for forms, email attachments and websites with upload limits.",
    about: [
      "100 KB is a roomy limit for a web photo. A modest-sized picture usually keeps good quality at this size, while a full camera photo still has to be reduced a long way.",
      "Because the tool searches for the highest quality that fits, you get the best-looking file under 100 KB rather than a fixed preset quality that may be far below the limit.",
    ],
    tips: [
      "For web pages, a maximum width of about 1200 px is plenty for most layouts.",
      "Screenshots and graphics with flat colours often compress better as WebP.",
      "If you need an exact pixel size too, resize first, then compress.",
      "Compare the result to the original before you delete anything.",
    ],
    faq: [
      {
        q: "How do I compress an image to under 100 KB?",
        a: "Add the image, keep the maximum file size at 100 KB, and download the result. The tool picks the highest quality that fits and shrinks the dimensions only if needed.",
      },
      {
        q: "Will quality drop a lot at 100 KB?",
        a: "For a web-sized picture, usually not noticeably. A very large, detailed photo will lose more because it has to be reduced further.",
      },
      {
        q: "Is it safe for private photos?",
        a: "Yes. The processing happens on your device and nothing is uploaded.",
      },
      {
        q: "What if the tool says it could not reach 100 KB?",
        a: "The picture is very large or very detailed. Set a smaller maximum width and try again; the message shows the smallest result it managed.",
      },
      {
        q: "Does it remove the photo's location data?",
        a: "Re-encoding on a canvas drops metadata such as EXIF, including GPS location, from the output file.",
      },
    ],
  },
];

export interface ConvertPage {
  slug: string;
  from: string;
  to: string;
  mime: "image/jpeg" | "image/png" | "image/webp";
  hint: string;
  seoTitle: string;
  h1: string;
  description: string;
  blurb: string;
  lede: string;
  about: string[];
  faq: Faq[];
}

export const CONVERT_PAGES: ConvertPage[] = [
  {
    slug: "png-to-jpg",
    from: "PNG",
    to: "JPG",
    mime: "image/jpeg",
    hint: "PNG images (other formats work too). Files stay on your device.",
    seoTitle: "PNG to JPG Converter Online (Free, No Upload)",
    h1: "PNG to JPG Converter",
    description:
      "Convert PNG to JPG online in your browser. Free and private: no upload. Choose the quality and the background colour for transparent areas.",
    blurb: "Convert PNG images to smaller JPG files, with a background for transparency.",
    lede: "Convert PNG images to JPG in your browser. Pick the quality and the background colour that replaces transparent areas.",
    about: [
      "PNG is lossless and supports transparency, which makes files large for photos and screenshots. JPG is lossy and has no transparency, but a photo is often a fraction of the size, and almost every site and program accepts it.",
      "Because JPG cannot be transparent, any see-through area in your PNG is filled with the background colour you choose (white by default). Choose the colour of the page the image will sit on if it matters.",
    ],
    faq: [
      {
        q: "How do I convert PNG to JPG?",
        a: "Add the PNG files, adjust the quality if you want, and download the JPGs. The conversion runs in your browser, so nothing is uploaded.",
      },
      {
        q: "What happens to transparent areas?",
        a: "JPG has no transparency, so transparent pixels are painted with the background colour you pick. It is white by default.",
      },
      {
        q: "Will converting reduce quality?",
        a: "JPG is lossy, so some detail is discarded. At a quality of about 90% the difference is usually hard to see, and the file is much smaller for photos. Keep the PNG if you may edit it again.",
      },
      {
        q: "Is a JPG always smaller than a PNG?",
        a: "For photos, almost always. For flat graphics, logos and text, a PNG can be as small or smaller, and sharper, so check the sizes shown.",
      },
      {
        q: "Can I convert many files at once?",
        a: "Yes. Select several files and each is converted and listed with its own download button.",
      },
    ],
  },
  {
    slug: "jpg-to-png",
    from: "JPG",
    to: "PNG",
    mime: "image/png",
    hint: "JPG images (other formats work too). Files stay on your device.",
    seoTitle: "JPG to PNG Converter Online (Free, No Upload)",
    h1: "JPG to PNG Converter",
    description:
      "Convert JPG to PNG online in your browser. Free and private: no upload. Get a lossless PNG copy of any JPG in one click.",
    blurb: "Convert JPG images to lossless PNG files in your browser.",
    lede: "Convert JPG images to PNG in your browser. The PNG is lossless, so it will not lose any more detail when you edit and save it again.",
    about: [
      "A PNG copy of a JPG does not bring back detail the JPG already discarded, and it does not add transparency. What it gives you is a lossless file: you can edit and save it repeatedly without the quality dropping a little more each time.",
      "Expect the PNG to be larger than the JPG, often several times larger for photos. That is normal, because PNG stores every pixel exactly.",
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
        a: "No. A JPG has no transparency, so the PNG will have the same solid background. Removing a background needs an editing tool.",
      },
      {
        q: "Why is the PNG so much bigger?",
        a: "PNG is lossless and stores pixels exactly, while JPG throws away detail to save space. For photos the PNG is usually much larger.",
      },
      {
        q: "When should I use PNG instead of JPG?",
        a: "For graphics, logos, text and screenshots with sharp edges, or for an image you will edit many times. Use JPG for photos you only need to share.",
      },
    ],
  },
  {
    slug: "webp-to-jpg",
    from: "WebP",
    to: "JPG",
    mime: "image/jpeg",
    hint: "WebP images (other formats work too). Files stay on your device.",
    seoTitle: "WebP to JPG Converter Online (Free, No Upload)",
    h1: "WebP to JPG Converter",
    description:
      "Convert WebP to JPG online in your browser. Free and private: no upload. Make a WebP image work in any app, form or website.",
    blurb: "Convert WebP images to widely supported JPG files.",
    lede: "Convert WebP images to JPG in your browser, so they open in any program and upload to any form.",
    about: [
      "WebP is a modern image format that makes smaller files than JPG, and many websites now serve it. When you save such an image you often get a .webp file that older editors, some forms and many email or document tools will not accept.",
      "Converting to JPG gives you a file that works everywhere. If the WebP is animated, the JPG will contain only the first frame, and transparent areas are filled with the background colour you choose.",
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
        a: "No. JPG cannot be animated, so only the first frame of an animated WebP is kept.",
      },
      {
        q: "What happens to transparency?",
        a: "JPG has no transparency, so transparent areas are filled with the background colour you pick, white by default.",
      },
      {
        q: "Will quality suffer?",
        a: "Some loss is possible because both formats are lossy and the image is re-encoded. At about 90% quality it is usually hard to notice.",
      },
    ],
  },
  {
    slug: "avif-to-jpg",
    from: "AVIF",
    to: "JPG",
    mime: "image/jpeg",
    hint: "AVIF images (other formats work too). Files stay on your device.",
    seoTitle: "AVIF to JPG Converter Online (Free, No Upload)",
    h1: "AVIF to JPG Converter",
    description:
      "Convert AVIF to JPG online in your browser. Free and private: no upload. Turn AVIF files into JPGs that open in any app.",
    blurb: "Convert AVIF images to JPG so every app and website accepts them.",
    lede: "Convert AVIF images to JPG in your browser. Works when your browser can display AVIF, which current Chrome, Edge, Firefox and Safari can.",
    about: [
      "AVIF is a newer image format, built on the AV1 video codec, that can make very small files at good quality. Support in editors, upload forms and older software is still patchy, so a .avif file is often rejected.",
      "This tool uses your browser to read the AVIF and saves a JPG, which almost everything accepts. If your browser cannot display AVIF, it cannot convert it either, and the tool tells you so.",
    ],
    faq: [
      {
        q: "How do I convert AVIF to JPG?",
        a: "Add the AVIF files and download the JPGs. Your browser reads the AVIF and re-saves it as JPG, and nothing is uploaded.",
      },
      {
        q: "Why will it not open my AVIF file?",
        a: "Your browser may be too old to read AVIF. Current versions of Chrome, Edge, Firefox and Safari can. Try one of those.",
      },
      {
        q: "Can it convert HEIC photos from an iPhone?",
        a: "No. HEIC is a different format that most browsers cannot read, so this tool cannot convert it. Safari on Apple devices can open HEIC, but not every other browser can.",
      },
      {
        q: "What about transparency?",
        a: "JPG has no transparency, so transparent areas are filled with the background colour you choose, white by default.",
      },
      {
        q: "Is the JPG larger than the AVIF?",
        a: "Usually yes. AVIF is more efficient than JPG, so the same picture takes more bytes as a JPG.",
      },
    ],
  },
  {
    slug: "image-to-jpg",
    from: "Image",
    to: "JPG",
    mime: "image/jpeg",
    hint: "PNG, WebP, AVIF or JPG images. Files stay on your device.",
    seoTitle: "Convert Image to JPG Online: PNG, WebP, AVIF to JPG",
    h1: "Image to JPG Converter",
    description:
      "Convert any image to JPG online: PNG, WebP, AVIF and more. Free and private, with no upload. Set the quality and the background for transparent areas.",
    blurb: "Convert PNG, WebP, AVIF and other images to JPG in one step.",
    lede: "Convert almost any image to JPG in your browser. Drop in PNG, WebP, AVIF or other pictures, pick the quality, and download the JPGs.",
    about: [
      "JPG is the format almost every website, form and program accepts, which is why people convert other formats to it. Phones, screenshots and web downloads often produce PNG or WebP files that a form refuses, and a JPG solves that.",
      "This converter reads the image with your browser, so it can convert any format your browser can display, which includes PNG, WebP, AVIF and JPG. HEIC photos from an iPhone are the main format it cannot read. JPG has no transparency, so transparent areas are filled with the colour you choose.",
    ],
    faq: [
      {
        q: "How do I convert an image to JPG?",
        a: "Add the images, choose the quality, and download the JPGs. The conversion runs in your browser, so nothing is uploaded.",
      },
      {
        q: "Which formats can I convert to JPG?",
        a: "Any format your browser can display, including PNG, WebP, AVIF and other JPGs. Current Chrome, Edge, Firefox and Safari all read these.",
      },
      {
        q: "Can I convert HEIC photos from an iPhone?",
        a: "No. Most browsers cannot read HEIC, so this tool cannot convert it. On an iPhone you can switch the camera to save as Most Compatible, or share the photo as a JPG.",
      },
      {
        q: "What quality should I choose?",
        a: "About 90% is a good default: files are much smaller than PNG and the difference is hard to see. Lower the quality to shrink the file further, or raise it for photos you will print.",
      },
      {
        q: "What happens to transparent backgrounds?",
        a: "JPG cannot be transparent, so transparent pixels are painted with the background colour you pick, white by default.",
      },
    ],
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
