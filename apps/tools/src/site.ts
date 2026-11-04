import type { SiteConfig } from "@sites/shell";

export const site: SiteConfig = {
  name: "StreamerOS Dev Tools",
  tagline: "Free developer tools that run in your browser. Your input is never uploaded.",
  url: "https://tools.streamerosai.com",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  nav: [
    { href: "/json-formatter", label: "JSON Formatter" },
    { href: "/base64", label: "Base64" },
    { href: "/guides", label: "Guides" },
  ],
};

export const tools = [
  { href: "/json-formatter", title: "JSON Formatter & Validator", blurb: "Format, minify and validate JSON, with the line and column of any error." },
  { href: "/base64", title: "Base64 Encode / Decode", blurb: "Encode or decode text as Base64, with UTF-8 and URL-safe support." },
];

/** AdSense ad unit id for in-content slots; empty until created in AdSense. */
export const AD_SLOT_CONTENT = process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT ?? "";

export const guides = [
  { href: "/guides/json-parse-errors", title: "Why JSON.parse fails: the 6 errors behind most invalid JSON", blurb: "Trailing commas, single quotes, comments and the other mistakes, with a fix for each." },
  { href: "/guides/what-is-base64", title: "What Base64 is and when to use it", blurb: "How the encoding works, why it grows data by a third, and why it is not encryption." },
];
