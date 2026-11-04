export interface SiteConfig {
  /** Display name, e.g. "StreamerOS Dev Tools". */
  name: string;
  /** Wordmark: plain lead word(s) and the gradient accent word(s), e.g. "StreamerOS" + "Dev Tools". */
  brand: { lead: string; accent: string; mark: "braces" | "calc" | "image" | "percent" };
  /** One sentence used in meta description and the footer. */
  tagline: string;
  /** Canonical origin without trailing slash, e.g. https://tools.streamerosai.com */
  url: string;
  /** Contact address shown on the Contact page. Empty hides the mailto link. */
  contactEmail: string;
  /** Primary call to action in the header. */
  cta: { label: string; href: string };
  /** Heading above the tool links in the footer. */
  toolsHeading: string;
  nav: { href: string; label: string }[];
}

/** AdSense publisher id (ca-pub-...) from the environment; empty until approved. */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";

/** Draw dashed placeholders where ads will go. For reviewing the layout before AdSense is approved. */
export const ADS_PREVIEW = process.env.NEXT_PUBLIC_ADS_PREVIEW === "1";

/** Microsoft Clarity project id; empty means Clarity is off. */
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID ?? "";
