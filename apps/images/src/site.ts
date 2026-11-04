import type { IconName, SiteConfig } from "@sites/shell";
import { CONVERT_PAGES, SIZE_PAGES } from "@/lib/pages";

export const site: SiteConfig = {
  name: "StreamerOS Image Tools",
  brand: { lead: "StreamerOS", accent: "Image Tools", mark: "image" },
  cta: { label: "Compress an image", href: "/image-compressor" },
  toolsHeading: "Image tools",
  tagline:
    "Free image tools that run in your browser: compress to a target size, resize, and convert between formats. Your photos are never uploaded.",
  url: "https://images.streamerosai.com",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  nav: [
    { href: "/image-compressor", label: "Compressor" },
    { href: "/image-resizer", label: "Resizer" },
    { href: "/png-to-jpg", label: "PNG to JPG" },
    { href: "/webp-to-jpg", label: "WebP to JPG" },
    { href: "/guides", label: "Guides" },
  ],
};

export const author = { name: "Yaseen Khatib", url: "https://yk.streamerosai.com" };

/** Google Analytics 4 measurement id for this site; empty until the stream exists. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/** Google Search Console HTML-tag verification token; empty until the property exists. */
export const GSC_VERIFICATION = process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "";

/** AdSense ad unit id for in-content slots; empty until created in AdSense. */
export const AD_SLOT_CONTENT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT ?? "";

/** Date the content was last reviewed; used for dateModified and sitemap lastmod. */
export const UPDATED = "2026-11-04";

export interface Tool {
  slug: string;
  path: string;
  /** <title> text, kept under about 60 characters. */
  seoTitle: string;
  /** On-page H1. */
  h1: string;
  /** Meta description, kept under about 155 characters. */
  description: string;
  blurb: string;
  icon: IconName;
  group: "compress" | "resize" | "convert";
}

export const tools: Tool[] = [
  {
    slug: "image-compressor",
    path: "/image-compressor/",
    seoTitle: "Image Compressor: Reduce Image Size Online (Free)",
    h1: "Image Compressor",
    description:
      "Compress JPG, PNG and WebP images online. Set a quality or a target file size. Free, instant, and private: your photos are never uploaded.",
    blurb: "Compress photos by quality or to an exact file-size limit.",
    icon: "image",
    group: "compress",
  },
  {
    slug: "jpeg-compressor",
    path: "/jpeg-compressor/",
    seoTitle: "JPEG Compressor: Reduce JPG File Size Online (No Upload)",
    h1: "JPEG Compressor",
    description:
      "JPEG compressor online: reduce the file size of JPG photos by quality or to an exact KB limit. Free and instant, with no upload: photos stay on your device.",
    blurb: "Shrink JPG photos by quality or to an exact file-size limit.",
    icon: "image",
    group: "compress",
  },
  ...SIZE_PAGES.map((p): Tool => ({
    slug: p.slug,
    path: `/${p.slug}/`,
    seoTitle: p.seoTitle,
    h1: p.h1,
    description: p.description,
    blurb: p.blurb,
    icon: "download",
    group: "compress",
  })),
  {
    slug: "image-resizer",
    path: "/image-resizer/",
    seoTitle: "Image Resizer: Resize Photo by Pixels or Percent (No Upload)",
    h1: "Image Resizer",
    description:
      "Photo resizer online: resize images by width, height or percentage, keeping the aspect ratio. Free and instant, with no upload: photos stay on your device.",
    blurb: "Resize by pixels or percent, keeping the aspect ratio.",
    icon: "resize",
    group: "resize",
  },
  ...CONVERT_PAGES.map((p): Tool => ({
    slug: p.slug,
    path: `/${p.slug}/`,
    seoTitle: p.seoTitle,
    h1: p.h1,
    description: p.description,
    blurb: p.blurb,
    icon: "swap",
    group: "convert",
  })),
];

export const toolBySlug = (slug: string): Tool => {
  const t = tools.find((x) => x.slug === slug);
  if (!t) {
    throw new Error(`unknown tool ${slug}`);
  }
  return t;
};

export interface Guide {
  slug: string;
  path: string;
  title: string;
  description: string;
  blurb: string;
  published: string;
}

export const guides: Guide[] = [
  {
    slug: "reduce-image-size",
    path: "/guides/reduce-image-size/",
    title: "How to reduce image file size without ruining quality",
    description:
      "The four things that shrink an image: dimensions, format, quality and metadata, in the order that matters, with how to choose between JPG, PNG and WebP.",
    blurb: "Dimensions, format, quality and metadata, in the order that matters.",
    published: "2026-11-04",
  },
  {
    slug: "image-size-limits-on-forms",
    path: "/guides/image-size-limits-on-forms/",
    title: "Photo upload rejected? How to hit a 20 KB, 50 KB or 100 KB limit",
    description:
      "Why online forms reject photos, how to check the real requirements, and a step-by-step way to get a picture under a small file-size limit.",
    blurb: "A step-by-step way to get a photo under a small file-size limit.",
    published: "2026-11-04",
  },
];
