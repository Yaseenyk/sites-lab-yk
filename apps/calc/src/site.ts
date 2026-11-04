import type { IconName, SiteConfig } from "@sites/shell";
import { PAIRS } from "@/lib/pairs";

export const site: SiteConfig = {
  name: "StreamerOS Money Calculators",
  brand: { lead: "StreamerOS", accent: "Money Calculators", mark: "calc" },
  cta: { label: "Convert currency", href: "/currency-converter" },
  toolsHeading: "Calculators",
  tagline:
    "Free money calculators: pay raises, salary and hourly pay, overtime, and live currency conversion for any currency. Instant, with the formula shown.",
  url: "https://calc.streamerosai.com",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  nav: [
    { href: "/pay-raise-calculator", label: "Pay Raise" },
    { href: "/salary-calculator", label: "Salary" },
    { href: "/overtime-pay-calculator", label: "Overtime" },
    { href: "/currency-converter", label: "Currency" },
    { href: "/usd-to-inr", label: "USD to INR" },
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
  group: "pay" | "currency";
}

const payTools: Tool[] = [
  {
    slug: "pay-raise-calculator",
    path: "/pay-raise-calculator/",
    seoTitle: "Pay Raise Calculator: New Salary or Hourly Pay",
    h1: "Pay Raise Calculator",
    description:
      "Calculate your new pay after a raise by percent or dollar amount, or find the percentage raise between two pay rates. Free and instant.",
    blurb: "See your new pay after a raise, or find what percent raise you got.",
    icon: "trend",
    group: "pay",
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
    group: "pay",
  },
  {
    slug: "hourly-to-salary-calculator",
    path: "/hourly-to-salary-calculator/",
    seoTitle: "Hourly to Salary Calculator: Convert Wages to Annual Pay",
    h1: "Hourly to Salary Calculator",
    description:
      "Hourly salary calculator: convert wages to annual, monthly, bi-weekly and weekly pay. Uses a 2,080-hour year by default and lets you set your own hours.",
    blurb: "Turn an hourly wage into an annual salary and every other period.",
    icon: "dollar",
    group: "pay",
  },
  {
    slug: "salary-to-hourly-calculator",
    path: "/salary-to-hourly-calculator/",
    seoTitle: "Salary to Hourly Calculator: Convert Salary to Hourly Wage",
    h1: "Salary to Hourly Calculator",
    description:
      "Salary to hourly calculator: convert an annual or monthly salary to an hourly wage. Uses a 2,080-hour year by default; set your own hours and weeks.",
    blurb: "Find the hourly wage behind any annual or monthly salary.",
    icon: "clock",
    group: "pay",
  },
  {
    slug: "overtime-pay-calculator",
    path: "/overtime-pay-calculator/",
    seoTitle: "Overtime Pay Calculator: Weekly Pay with Overtime",
    h1: "Overtime Pay Calculator",
    description:
      "Overtime pay calculator: work out a week of pay with regular hours at your base rate and extra hours at time and a half, double time or your own multiplier.",
    blurb: "Work out a week of pay with overtime at 1.5x, 2x or your own multiplier.",
    icon: "clock",
    group: "pay",
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
    group: "pay",
  },
];

const currencyTools: Tool[] = [
  {
    slug: "currency-converter",
    path: "/currency-converter/",
    seoTitle: "Currency Converter: Convert Any Currency at Live Rates",
    h1: "Currency Converter",
    description:
      "Convert between any two currencies at live exchange rates, including USD, EUR, GBP, INR, AUD, CAD and AED. Free, instant, no sign-up.",
    blurb: "Convert between any two currencies at live mid-market rates.",
    icon: "dollar",
    group: "currency",
  },
  {
    slug: "usd-salary-to-inr-calculator",
    path: "/usd-salary-to-inr-calculator/",
    seoTitle: "USD Salary to INR Calculator: Annual, Monthly, Hourly",
    h1: "USD Salary to INR Calculator",
    description:
      "Convert a US dollar salary or hourly wage to Indian rupees: annual, monthly, weekly and hourly pay at live exchange rates.",
    blurb: "See a dollar salary or hourly wage as rupees, by year, month, week and hour.",
    icon: "calc",
    group: "currency",
  },
  ...PAIRS.map((p): Tool => ({
    slug: p.slug,
    path: `/${p.slug}/`,
    seoTitle: p.seoTitle,
    h1: p.h1,
    description: p.description,
    blurb: p.blurb,
    icon: "dollar",
    group: "currency",
  })),
];

export const tools: Tool[] = [...payTools, ...currencyTools];

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
  {
    slug: "how-exchange-rates-work",
    path: "/guides/how-exchange-rates-work/",
    title: "How exchange rates work: the mid-market rate vs the rate you get",
    description:
      "What an exchange rate is, what the mid-market rate means, why banks and transfer apps give you less, and how to compare what you will actually receive.",
    blurb: "What the mid-market rate is, and how to compare what you will really receive.",
    published: "2026-11-04",
  },
];
