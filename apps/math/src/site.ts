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
export const UPDATED = "2026-11-15";

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
    seoTitle: "Percentage Calculator: What Is X% of Y? (15% of 80 = 12)",
    h1: "Percentage Calculator",
    description:
      "Type two numbers: get X% of Y, what percent X is of Y, or the whole from a part. 15% of 80 is 12. Free, with the formula and worked examples.",
    blurb: "Find X% of Y, what percent one number is of another, or the whole from a part.",
    icon: "percent",
    group: "percent",
  },
  {
    slug: "percentage-increase-calculator",
    path: "/percentage-increase-calculator/",
    seoTitle: "Percentage Increase Calculator: 50 to 65 Is +30%",
    h1: "Percentage Increase Calculator",
    description:
      "Find the percent increase between two numbers, or raise a number by a percentage. 50 to 65 is +30%; 80 up 25% is 100. Formula and examples.",
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
    seoTitle: "Percent Change Calculator: 40 to 50 Is +25%",
    h1: "Percent Change Calculator",
    description:
      "Enter an old and a new value for percent change, absolute change and percent difference. 40 to 50 is +25%, but 50 to 40 is -20%. Free.",
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
      "Date duration calculator: count the days between two dates, with weeks, months and working days. Optionally count the end date too. Free and instant.",
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
      "Add or subtract days, months or years and see the date and weekday. 30 days after 4 Nov 2026 is Friday 4 Dec 2026. Month-end rules explained.",
    blurb: "Add or subtract days, months and years and see the date and weekday.",
    icon: "calendar",
    group: "dates",
  },
  {
    slug: "hours-calculator",
    path: "/hours-calculator/",
    seoTitle: "Hours Calculator: 9:00 to 17:30 Is 8 Hours",
    h1: "Hours Calculator",
    description:
      "Enter start, end and break for each day. 09:00 to 17:00 with 30 minutes off is 7:30, or 7.5 decimal hours. Handles night shifts and a full week.",
    blurb: "Hours worked between start and end times, with breaks, in H:MM and decimal hours.",
    icon: "clock",
    group: "dates",
  },
  {
    slug: "time-calculator",
    path: "/time-calculator/",
    seoTitle: "Time Calculator: 2 h 30 min + 1 h 45 min = 4 h 15 min",
    h1: "Time Calculator",
    description:
      "Add or subtract lengths of time in days, hours, minutes and seconds. 2 h 30 min plus 1 h 45 min is 4 h 15 min. Carries over correctly.",
    blurb: "Add or subtract days, hours, minutes and seconds.",
    icon: "clock",
    group: "dates",
  },
  {
    slug: "percentage-difference-calculator",
    path: "/percentage-difference-calculator/",
    seoTitle: "Percentage Difference Calculator: Compare Two Numbers",
    h1: "Percentage Difference Calculator",
    description:
      "Calculate the percentage difference between two numbers using their average as the base. Free and instant, with the formula and worked examples.",
    blurb: "The percentage difference between two values, the same in either direction.",
    icon: "diff",
    group: "percent",
  },
  {
    slug: "discount-calculator",
    path: "/discount-calculator/",
    seoTitle: "Discount Calculator: Sale Price and Percentage Off",
    h1: "Discount Calculator",
    description:
      "Discount calculator and percentage off calculator: find the sale price and savings, stack a second discount, or work out the percent off from two prices.",
    blurb: "Sale price, savings and stacked discounts, or the percent off from two prices.",
    icon: "percent",
    group: "percent",
  },
  {
    slug: "standard-deviation-calculator",
    path: "/standard-deviation-calculator/",
    seoTitle: "Standard Deviation Calculator: Sample and Population",
    h1: "Standard Deviation Calculator",
    description:
      "Paste a list of numbers to get the sample and population standard deviation, variance and mean. Free and instant, with the formulas and a worked example.",
    blurb: "Sample and population standard deviation, variance and mean.",
    icon: "list",
    group: "numbers",
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
      "Paste your numbers for mean, median, mode, sum and range. For 4, 8, 8, 10, 15 the mean is 9 and the median and mode are 8. Free.",
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
