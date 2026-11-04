import type { IconName, SiteConfig } from "@sites/shell";

export const site: SiteConfig = {
  name: "StreamerOS Math Calculators",
  brand: { lead: "StreamerOS", accent: "Math Calculators", mark: "percent" },
  cta: { label: "Percentage calculator", href: "/percentage-calculator" },
  toolsHeading: "Calculators",
  tagline:
    "Free everyday math calculators: percentages, age, dates, hours, ratios and averages. Instant, with the formula shown.",
  url: "https://math.streamerosai.com",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  nav: [
    { href: "/percentage-calculator", label: "Percentage" },
    { href: "/percent-change-calculator", label: "Percent Change" },
    { href: "/age-calculator", label: "Age" },
    { href: "/days-between-dates-calculator", label: "Days Between Dates" },
    { href: "/hours-calculator", label: "Hours" },
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
  group: "percent" | "dates" | "numbers";
}

export const tools: Tool[] = [
  {
    slug: "percentage-calculator",
    path: "/percentage-calculator/",
    seoTitle: "Percentage Calculator: X% of Y, What % and More",
    h1: "Percentage Calculator",
    description:
      "Free percentage calculator: find X% of Y, what percent X is of Y, or the whole number from a part. Instant answers with the formula shown.",
    blurb: "Find X% of Y, what percent one number is of another, or the whole from a part.",
    icon: "percent",
    group: "percent",
  },
  {
    slug: "percentage-increase-calculator",
    path: "/percentage-increase-calculator/",
    seoTitle: "Percentage Increase Calculator: Find the % Increase",
    h1: "Percentage Increase Calculator",
    description:
      "Calculate a percentage increase between two numbers, or increase a number by a percentage. Free, instant, with the formula and worked examples.",
    blurb: "Find the percent increase between two numbers, or raise a number by a percentage.",
    icon: "trend",
    group: "percent",
  },
  {
    slug: "percentage-decrease-calculator",
    path: "/percentage-decrease-calculator/",
    seoTitle: "Percentage Decrease Calculator: Find the % Decrease",
    h1: "Percentage Decrease Calculator",
    description:
      "Calculate a percentage decrease between two numbers, or reduce a number by a percentage, such as a discount. Free and instant, with the formula.",
    blurb: "Find the percent decrease between two numbers, or reduce a number by a percentage.",
    icon: "diff",
    group: "percent",
  },
  {
    slug: "percent-change-calculator",
    path: "/percent-change-calculator/",
    seoTitle: "Percent Change Calculator: Increase, Decrease, Difference",
    h1: "Percent Change Calculator",
    description:
      "Calculate percent change from an old value to a new one, plus the absolute change and the percent difference. Free and instant, with the formulas.",
    blurb: "Percent change between two values, plus the symmetric percent difference.",
    icon: "trend",
    group: "percent",
  },
  {
    slug: "age-calculator",
    path: "/age-calculator/",
    seoTitle: "Age Calculator: Exact Age in Years, Months and Days",
    h1: "Age Calculator",
    description:
      "Calculate your exact age in years, months and days from your date of birth, plus total days, your next birthday and the weekday you were born.",
    blurb: "Exact age in years, months and days, with total days and your next birthday.",
    icon: "calendar",
    group: "dates",
  },
  {
    slug: "days-between-dates-calculator",
    path: "/days-between-dates-calculator/",
    seoTitle: "Days Between Dates Calculator (Calendar and Working Days)",
    h1: "Days Between Dates Calculator",
    description:
      "Count the days between two dates, with weeks, months and working days. Optionally count the end date too. Free and instant, with the method explained.",
    blurb: "Days, weeks, months and working days between any two dates.",
    icon: "calendar",
    group: "dates",
  },
  {
    slug: "date-calculator",
    path: "/date-calculator/",
    seoTitle: "Date Calculator: Add or Subtract Days, Months, Years",
    h1: "Date Calculator",
    description:
      "Add or subtract days, months and years from any date and get the resulting date and weekday. Free and instant, with end-of-month rules explained.",
    blurb: "Add or subtract days, months and years and see the date and weekday.",
    icon: "calendar",
    group: "dates",
  },
  {
    slug: "hours-calculator",
    path: "/hours-calculator/",
    seoTitle: "Hours Calculator: Time Worked Between Two Times",
    h1: "Hours Calculator",
    description:
      "Calculate hours worked between a start and end time with breaks, across several days, as hours and minutes and as decimal hours. Free and instant.",
    blurb: "Hours worked between start and end times, with breaks, in H:MM and decimal hours.",
    icon: "clock",
    group: "dates",
  },
  {
    slug: "ratio-calculator",
    path: "/ratio-calculator/",
    seoTitle: "Ratio Calculator: Simplify and Solve Ratios",
    h1: "Ratio Calculator",
    description:
      "Simplify a ratio to its lowest terms, or solve A:B = C:X for the missing value. Handles decimals. Free and instant, with worked examples.",
    blurb: "Simplify a ratio, or find the missing value in a proportion.",
    icon: "diff",
    group: "numbers",
  },
  {
    slug: "average-calculator",
    path: "/average-calculator/",
    seoTitle: "Average Calculator: Mean, Median, Mode and Range",
    h1: "Average Calculator",
    description:
      "Paste a list of numbers to get the mean, median, mode, sum, minimum, maximum and range instantly. Free, with each statistic explained.",
    blurb: "Mean, median, mode and range for any list of numbers.",
    icon: "list",
    group: "numbers",
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
    slug: "percentage-formulas",
    path: "/guides/percentage-formulas/",
    title: "Percentage formulas explained: of, is-what-percent and percent change",
    description:
      "The percentage formulas you need, with worked examples, plus common mistakes like percent versus percentage points and why +50% then -50% is not zero.",
    blurb: "The formulas, worked examples, and the mistakes that trip people up.",
    published: "2026-11-04",
  },
  {
    slug: "counting-days-between-dates",
    path: "/guides/counting-days-between-dates/",
    title: "How to count days between dates: inclusive, exclusive and working days",
    description:
      "Why two people can get different answers for the same two dates, and how inclusive counting, leap years, month lengths and working days are handled.",
    blurb: "Inclusive vs exclusive counting, month lengths, leap years and working days.",
    published: "2026-11-04",
  },
];
