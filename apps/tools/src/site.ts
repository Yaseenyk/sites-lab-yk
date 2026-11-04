import type { IconName, SiteConfig } from "@sites/shell";

export const site: SiteConfig = {
  name: "StreamerOS Dev Tools",
  tagline: "Free developer tools that run in your browser. Your input is never uploaded.",
  url: "https://tools.streamerosai.com",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  nav: [
    { href: "/json-formatter", label: "JSON Formatter" },
    { href: "/json-compare", label: "JSON Compare" },
    { href: "/json-to-csv", label: "JSON to CSV" },
    { href: "/base64", label: "Base64" },
    { href: "/guides", label: "Guides" },
  ],
};

export const author = { name: "Yaseen Khatib", url: "https://yk.streamerosai.com" };

/** Google Analytics 4 measurement id. */
export const GA_ID = "G-0LQBXBREE0";

/** Google Search Console HTML-tag verification token. */
export const GSC_VERIFICATION = "OG5PRiRPw3I5jB5p-G7nDzf_mlxdiZzrpLaFYCZ0p1M";

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
}

export const tools: Tool[] = [
  {
    slug: "json-formatter",
    path: "/json-formatter/",
    seoTitle: "JSON Formatter & Beautifier Online (Free, Private)",
    h1: "JSON Formatter & Beautifier",
    description:
      "Format and beautify JSON online. Free, instant and private: it runs in your browser and shows the exact line and column of any error.",
    blurb: "Pretty-print JSON with 2 or 4 spaces or tabs, sort keys, and see errors with line and column.",
    icon: "braces",
  },
  {
    slug: "json-validator",
    path: "/json-validator/",
    seoTitle: "JSON Validator: Check JSON Syntax Online",
    h1: "JSON Validator",
    description:
      "Validate JSON online and find the exact line and column of the error. Free, instant and checked in your browser, with no upload.",
    blurb: "Know instantly whether your JSON is valid, and where it breaks if it is not.",
    icon: "check",
  },
  {
    slug: "json-minifier",
    path: "/json-minifier/",
    seoTitle: "JSON Minifier: Minify & Compress JSON Online",
    h1: "JSON Minifier",
    description:
      "Minify JSON online by stripping whitespace to cut file size. Free, instant, and it runs in your browser, so your data stays private.",
    blurb: "Strip whitespace to make JSON smaller for APIs, config and storage.",
    icon: "minify",
  },
  {
    slug: "json-compare",
    path: "/json-compare/",
    seoTitle: "JSON Compare: Diff Two JSON Documents Online",
    h1: "JSON Compare (JSON Diff)",
    description:
      "Compare two JSON documents online and see every added, removed and changed value by path. Key order is ignored. Runs in your browser.",
    blurb: "Paste two JSON documents and see every added, removed and changed value by path.",
    icon: "diff",
  },
  {
    slug: "json-to-csv",
    path: "/json-to-csv/",
    seoTitle: "JSON to CSV Converter Online (Free, In-Browser)",
    h1: "JSON to CSV Converter",
    description:
      "Convert a JSON array to CSV online. Flattens nested objects, picks the delimiter and downloads a .csv file. Nothing is uploaded.",
    blurb: "Turn a JSON array of objects into a CSV you can open in Excel or Google Sheets.",
    icon: "table",
  },
  {
    slug: "base64",
    path: "/base64/",
    seoTitle: "Base64 Encode and Decode Online (UTF-8, URL-safe)",
    h1: "Base64 Encode & Decode",
    description:
      "Encode text to Base64 or decode Base64 back to text online. UTF-8 and URL-safe supported, and everything runs in your browser.",
    blurb: "Encode or decode Base64 with full UTF-8 and URL-safe support.",
    icon: "lock",
  },
  {
    slug: "base64-decode",
    path: "/base64-decode/",
    seoTitle: "Base64 Decode Online: Decode Base64 to Text",
    h1: "Base64 Decode",
    description:
      "Decode Base64 to text online, including URL-safe Base64 and missing padding. Free, instant, and it runs in your browser.",
    blurb: "Paste a Base64 string and get the text back, with padding and URL-safe input handled.",
    icon: "lock",
  },
];

export const toolBySlug = (slug: string): Tool => {
  const t = tools.find((x) => x.slug === slug);
  if (!t) throw new Error(`unknown tool ${slug}`);
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
    slug: "json-parse-errors",
    path: "/guides/json-parse-errors/",
    title: "Why JSON.parse fails: the 6 errors behind most invalid JSON",
    description:
      "Trailing commas, single quotes, comments, unquoted keys, undefined and unescaped characters: what each error looks like and how to fix it.",
    blurb: "Trailing commas, single quotes, comments and the other mistakes, with a fix for each.",
    published: "2026-11-04",
  },
  {
    slug: "what-is-base64",
    path: "/guides/what-is-base64/",
    title: "What Base64 is and when to use it",
    description:
      "How Base64 turns bytes into text, why it makes data a third bigger, what the URL-safe variant is, and why it is not encryption.",
    blurb: "How the encoding works, why it grows data by a third, and why it is not encryption.",
    published: "2026-11-04",
  },
];
