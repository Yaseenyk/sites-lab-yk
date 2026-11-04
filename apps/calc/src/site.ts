import type { IconName, SiteConfig } from "@sites/shell";

export const site: SiteConfig = {
  name: "StreamerOS Pay Calculators",
  brand: { lead: "StreamerOS", accent: "Pay Calculators", mark: "calc" },
  cta: { label: "Calculate pay", href: "/salary-calculator" },
  toolsHeading: "Calculators",
  tagline:
    "Free pay calculators: raises, salary and hourly pay, overtime and time and a half. Instant, with the formula shown.",
  url: "https://calc.streamerosai.com",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  nav: [
    { href: "/pay-raise-calculator", label: "Pay Raise" },
    { href: "/salary-calculator", label: "Salary" },
    { href: "/overtime-pay-calculator", label: "Overtime" },
    { href: "/time-and-a-half-calculator", label: "Time and a Half" },
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
}

export const tools: Tool[] = [
  {
    slug: "pay-raise-calculator",
    path: "/pay-raise-calculator/",
    seoTitle: "Pay Raise Calculator: New Salary or Hourly Pay",
    h1: "Pay Raise Calculator",
    description:
      "Calculate your new pay after a raise by percent or dollar amount, or find the percentage raise between two pay rates. Free and instant.",
    blurb: "See your new pay after a raise, or find what percent raise you got.",
    icon: "trend",
  },
  {
    slug: "salary-calculator",
    path: "/salary-calculator/",
    seoTitle: "Salary Calculator: Hourly, Weekly, Monthly, Annual",
    h1: "Salary Calculator",
    description:
      "Convert any pay figure between hourly, daily, weekly, bi-weekly, monthly and annual salary. Set your own hours and weeks. Free and instant.",
    blurb: "Turn any pay figure into every other pay period in one step.",
    icon: "calc",
  },
  {
    slug: "hourly-to-salary-calculator",
    path: "/hourly-to-salary-calculator/",
    seoTitle: "Hourly to Salary Calculator (Annual, Monthly, Weekly)",
    h1: "Hourly to Salary Calculator",
    description:
      "Convert an hourly wage to annual, monthly, bi-weekly and weekly salary. Uses a 2,080-hour year by default and lets you set your own hours.",
    blurb: "Turn an hourly wage into an annual salary and every other period.",
    icon: "dollar",
  },
  {
    slug: "salary-to-hourly-calculator",
    path: "/salary-to-hourly-calculator/",
    seoTitle: "Salary to Hourly Calculator: What Is My Hourly Pay?",
    h1: "Salary to Hourly Calculator",
    description:
      "Convert an annual salary to an hourly wage. Uses a 2,080-hour year by default, and you can set your own hours and weeks worked.",
    blurb: "Find the hourly wage behind any annual or monthly salary.",
    icon: "clock",
  },
  {
    slug: "overtime-pay-calculator",
    path: "/overtime-pay-calculator/",
    seoTitle: "Overtime Pay Calculator: Weekly Pay with Overtime",
    h1: "Overtime Pay Calculator",
    description:
      "Calculate overtime pay for a week: regular hours at your base rate and extra hours at time and a half, double time or your own multiplier.",
    blurb: "Work out a week of pay with overtime at 1.5x, 2x or your own multiplier.",
    icon: "clock",
  },
  {
    slug: "time-and-a-half-calculator",
    path: "/time-and-a-half-calculator/",
    seoTitle: "Time and a Half Calculator: Your Overtime Rate",
    h1: "Time and a Half Calculator",
    description:
      "Find your time-and-a-half rate from your hourly wage, plus double time and pay for the overtime hours you worked. Free and instant.",
    blurb: "Your hourly rate at time and a half and double time, and pay for your hours.",
    icon: "dollar",
  },
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
    slug: "salary-to-hourly",
    path: "/guides/salary-to-hourly/",
    title: "How to convert salary to hourly pay (the 2,080-hour rule)",
    description:
      "How to turn an annual salary into an hourly wage and back, why 2,080 hours is the standard, and when to use a different number.",
    blurb: "The formula, the 2,080-hour year, and when your own schedule changes the answer.",
    published: "2026-11-04",
  },
  {
    slug: "how-overtime-pay-works",
    path: "/guides/how-overtime-pay-works/",
    title: "How overtime pay works in the US: time and a half explained",
    description:
      "What the federal overtime rule requires, how time and a half is calculated, who is exempt, and why some states add daily overtime.",
    blurb: "The federal rule, the calculation, and the exceptions that change your pay.",
    published: "2026-11-04",
  },
];
