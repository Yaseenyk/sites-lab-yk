export interface SiteConfig {
  /** Display name, e.g. "Dev Tools" */
  name: string;
  /** One sentence used in meta description and the footer. */
  tagline: string;
  /** Canonical origin without trailing slash, e.g. https://tools.streamerosai.com */
  url: string;
  /** Contact address shown on the Contact page. Empty hides the mailto link. */
  contactEmail: string;
  nav: { href: string; label: string }[];
}

/** AdSense publisher id (ca-pub-...) from the environment; empty until approved. */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
