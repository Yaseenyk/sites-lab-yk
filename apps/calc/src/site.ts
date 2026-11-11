import type { IconName, SiteConfig } from "@sites/shell";
import { PAIRS } from "@/lib/pairs";

export const site: SiteConfig = {
  name: "StreamerOS Money Calculators",
  brand: { lead: "StreamerOS", accent: "Money Calculators", mark: "calc" },
  cta: { label: "Convert currency", href: "/currency-converter" },
  toolsHeading: "Calculators",
  tagline:
    "Free money calculators: take-home pay, pay raises, salary and hourly pay, overtime, EMI, SIP, GST, India income tax, and live currency conversion for any currency. Instant, with the formula shown.",
  url: "https://calc.streamerosai.com",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  nav: [
    { href: "/paycheck-calculator", label: "Paycheck" },
    { href: "/pay-raise-calculator", label: "Pay Raise" },
    { href: "/salary-calculator", label: "Salary" },
    { href: "/overtime-pay-calculator", label: "Overtime" },
    { href: "/emi-calculator", label: "EMI" },
    { href: "/sip-calculator", label: "SIP" },
    { href: "/income-tax-calculator-india", label: "India Tax" },
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
export const UPDATED = "2026-11-12";

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
  group: "pay" | "currency" | "finance";
}

const payTools: Tool[] = [
  {
    slug: "paycheck-calculator",
    path: "/paycheck-calculator/",
    seoTitle: "Paycheck Calculator: Take-Home Pay After Tax (2026)",
    h1: "Paycheck Calculator",
    description:
      "Paycheck calculator for 2026: see your take-home pay after federal tax, Social Security, Medicare and state tax, for any pay frequency and filing status.",
    blurb: "Take-home pay after federal tax, FICA and state tax, per paycheck and per year.",
    icon: "dollar",
    group: "pay",
  },
  {
    slug: "hourly-paycheck-calculator",
    path: "/hourly-paycheck-calculator/",
    seoTitle: "Hourly Paycheck Calculator: Take-Home Pay (2026)",
    h1: "Hourly Paycheck Calculator",
    description:
      "Hourly paycheck calculator for 2026: enter your hourly rate and weekly hours to see take-home pay after federal tax, Social Security, Medicare and state tax.",
    blurb: "Your hourly rate and hours as take-home pay after tax.",
    icon: "clock",
    group: "pay",
  },
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

const financeTools: Tool[] = [
  {
    slug: "emi-calculator",
    path: "/emi-calculator/",
    seoTitle: "EMI Calculator: Monthly Loan EMI with Amortization Table",
    h1: "EMI Calculator",
    description:
      "Calculate the monthly EMI for any loan from the amount, interest rate and term, with total interest and a year-by-year amortization table.",
    blurb: "Monthly EMI for any loan, with total interest and a full amortization table.",
    icon: "calc",
    group: "finance",
  },
  {
    slug: "home-loan-emi-calculator",
    path: "/home-loan-emi-calculator/",
    seoTitle: "Home Loan EMI Calculator: Monthly Payment & Interest",
    h1: "Home Loan EMI Calculator",
    description:
      "Calculate your home loan EMI from the loan amount, interest rate and tenure, with total interest payable and a year-by-year breakdown.",
    blurb: "Monthly EMI for a home loan, with the full repayment breakdown.",
    icon: "dollar",
    group: "finance",
  },
  {
    slug: "car-loan-emi-calculator",
    path: "/car-loan-emi-calculator/",
    seoTitle: "Car Loan EMI Calculator: Monthly Payment & Interest",
    h1: "Car Loan EMI Calculator",
    description:
      "Calculate your car or two-wheeler loan EMI from the loan amount, interest rate and tenure, with total interest payable and a repayment breakdown.",
    blurb: "Monthly EMI for a car or bike loan, with the full repayment breakdown.",
    icon: "trend",
    group: "finance",
  },
  {
    slug: "sip-calculator",
    path: "/sip-calculator/",
    seoTitle: "SIP Calculator: Mutual Fund SIP Returns",
    h1: "SIP Calculator",
    description:
      "Project the future value of a monthly SIP (systematic investment plan) from the amount, expected return and duration, with a year-by-year growth table.",
    blurb: "Project what a monthly SIP could grow to, year by year.",
    icon: "trend",
    group: "finance",
  },
  {
    slug: "loan-eligibility-calculator",
    path: "/loan-eligibility-calculator/",
    seoTitle: "Loan Eligibility Calculator: Max Loan from Income",
    h1: "Loan Eligibility Calculator",
    description:
      "Estimate the loan amount your income can support from your monthly income, existing EMIs, interest rate and tenure, using the FOIR lenders typically apply.",
    blurb: "See roughly how large a loan your income could support.",
    icon: "shield",
    group: "finance",
  },
  {
    slug: "gst-calculator",
    path: "/gst-calculator/",
    seoTitle: "GST Calculator: Add or Remove GST, with CGST/SGST",
    h1: "GST Calculator",
    description:
      "Add GST to a price or extract it from a GST-inclusive price, at 5%, 12%, 18%, 28% or any rate, with the CGST and SGST split shown.",
    blurb: "Add or remove GST at any rate, with the CGST/SGST split.",
    icon: "percent",
    group: "finance",
  },
  {
    slug: "compound-interest-calculator",
    path: "/compound-interest-calculator/",
    seoTitle: "Compound Interest Calculator: Maturity Value by Year",
    h1: "Compound Interest Calculator",
    description:
      "Calculate compound interest on a principal amount at any compounding frequency, with the maturity value and a year-by-year growth table.",
    blurb: "Maturity value of a principal at compound interest, year by year.",
    icon: "calc",
    group: "finance",
  },
  {
    slug: "percentage-calculator",
    path: "/percentage-calculator/",
    seoTitle: "Percentage Calculator: X% of Y and the Reverse",
    h1: "Percentage Calculator",
    description:
      "Find X percent of Y, what percent one number is of another, or the original value before a percent change. Three calculators in one, free and instant.",
    blurb: "X% of Y, what percent one number is of another, and the reverse.",
    icon: "percent",
    group: "finance",
  },
  {
    slug: "income-tax-calculator-india",
    path: "/income-tax-calculator-india/",
    seoTitle: "Income Tax Calculator India: New vs Old Regime (FY 2026-27)",
    h1: "Income Tax Calculator (India)",
    description:
      "Calculate India income tax for FY 2026-27 under the new or old regime, with the standard deduction, Section 87A rebate and 4% cess shown in the working.",
    blurb: "India income tax for FY 2026-27, new regime vs old, with the full working.",
    icon: "dollar",
    group: "finance",
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

export const tools: Tool[] = [...payTools, ...financeTools, ...currencyTools];

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
