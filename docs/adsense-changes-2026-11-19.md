# AdSense re-review: changes made on 19 Nov 2026

Follows `docs/adsense-changes-2026-11-16.md` and the research in `portfolio/docs/adsense-case-study-2026-11-19.md`
(tool sites are the most-rejected AdSense category; approved tool sites had a written explanation on every tool
plus a small blog). The owner lifted the page freeze on 19 Nov 2026. Ads stay OFF: `ADSENSE_CLIENT` is unset and no
ad code was added; a grep of all four builds finds 0 pages with `adsbygoogle` or `pagead2`.

## How the audit was done

All four apps were built from `main` (commit `79494f3`) and every tool page in `out/` was measured (60 pages:
tools 8, calc 26, images 11, math 15). Two numbers per page:

- **Main words:** all visible text inside `<main>` (scripts, styles, form controls and buttons removed).
- **Explanation words:** the lede, the written body under the tool and the FAQ answers, with tables, code blocks
  and the Sources list removed. This is the "real explanation" figure: it excludes the widget, computed tables,
  links and navigation.

Each page's body headings were also read to check for the expected parts: what the tool does, how it works or the
formula, a worked example, when to use it, limits, and an FAQ.

## Findings

- Every indexable English tool page already had at least 575 explanation words except one, and every page has an
  FAQ (also in FAQPage JSON-LD) and a "how it works / formula" section; all but math `/average-calculator/` and
  `/date-calculator/` have a limits heading (those two cover caveats in the body: outliers and weighted averages;
  month ends, holidays and weekends).
  The 16 Nov rebuild (commits `ca53ba5`, `e03406e`, `4b4a836`, `d9ef5cc`) had done this work.
- The weakest indexable page was **calc `/income-tax-calculator-india/`**: 487 explanation words, of which only 188
  were body text (two slab tables, two short paragraphs, a limits paragraph). It had no step-by-step method, no
  worked example and no guidance on choosing a regime. Deepened (below).
- Pages under about 400 explanation words: only calc `/percentage-calculator/` (311, noindexed on 16 Nov as a
  duplicate of math.streamerosai.com) and math `/zh/percentage-calculator/` (Chinese; the word counter counts runs
  of characters, so the figure is meaningless; about 400 characters). Both left as they are: the first stays
  noindex, the second is the owner's time-boxed experiment and no machine translation is added.
- The five minor currency pairs (`/eur-to-inr/`, `/gbp-to-inr/`, `/aud-to-inr/`, `/cad-to-inr/`, `/aed-to-inr/`)
  stay `noindex, follow` as decided on 16 Nov (near-duplicate template).
- Shortest indexable pages after the income tax page, all with the full set of sections: math `/date-calculator/`
  575, `/percentage-calculator/` 579, `/average-calculator/` 589, calc `/usd-to-inr/` 580, `/inr-to-usd/` 605. Not
  changed: each already explains the method, gives examples and states its limits.

## What changed

### calc `/income-tax-calculator-india/`

Main words 717 to 1,447; explanation words 487 to 1,161 (body 188 to 862). New sections:

- **How the calculator works it out:** the six steps in the order the code applies them (gross income, standard
  deduction, capped 80C and 80D in the old regime, slab rates per band, 87A rebate under the threshold, 4% cess).
- **Worked example, a 15 lakh salary in both regimes:** a table computed at build time by `incomeTax()` itself (the
  calculator's function), so the page cannot drift from the tool: new regime 14,25,000 taxable, 93,750 slab tax,
  3,750 cess, 97,500 total (6.5%); old regime with full 80C and 80D 12,75,000 taxable, 1,95,000 slab tax, 7,800
  cess, 2,02,800 total (13.5%). The slab-by-slab build-up is written out for both.
- **How much in deductions the old regime needs:** at 15 lakh the old regime matches the new one only at 9,06,250
  taxable income, which needs 5,43,750 of deductions beyond the 50,000 standard deduction, against a 1,75,000
  ceiling for 80C plus 80D.
- **Just above the 12 lakh line:** a 13 lakh salary gives 12,25,000 taxable, no rebate, 63,750 + 2,550 cess =
  66,300 in the calculator; the page says marginal relief (not modelled) makes the real tax lower, so the figure is
  an upper limit in that band.
- **When to use it:** choosing a regime for salary TDS, weighing a raise or offer, testing whether an 80C
  investment changes the tax.
- **Limits** gained two lines: 80D is capped at 25,000 (the under-60 self and family limit; senior and parents'
  limits not included), and age only matters in the old regime.

Every figure was checked by hand against `src/lib/incomeTaxIndia.ts` and is asserted by four new tests in
`src/lib/incomeTaxIndia.test.ts` (15 lakh new, 15 lakh old with deductions, the 9,06,250 break-even, 13 lakh). No new
statistics or sources; the existing PIB, Income Tax Department, ClearTax and Finance Bill sources cover every rule
used.

## Guides and blog per site

No site has a blog. Each has a reviewed `/guides/` section (written and deepened on 16 Nov, 650 to 840 words each):

| Site | Guides | Pages |
|---|---|---|
| tools.streamerosai.com | 2 | `/guides/json-parse-errors/`, `/guides/what-is-base64/` |
| calc.streamerosai.com | 3 | `/guides/how-exchange-rates-work/`, `/guides/how-overtime-pay-works/`, `/guides/salary-to-hourly/` |
| images.streamerosai.com | 2 | `/guides/image-size-limits-on-forms/`, `/guides/reduce-image-size/` |
| math.streamerosai.com | 2 | `/guides/counting-days-between-dates/`, `/guides/percentage-formulas/` |

The approved tool sites in the case study had a small blog. Nine guides across four sites is the thinnest part of
the set. The repo rule (at most two new guides a week, each reviewed) still applies, so none was added unreviewed
today.

## Checks

- calc: `next lint` (0 warnings), `tsc --noEmit`, `vitest run` (141 tests pass, 4 new), `prettier --check src
  ../../packages/shell/src` pass; `next build` passes, `llms-full.txt: 29 of 29 sitemap pages`.
- The other three apps were rebuilt for the audit (no source change): all `next build` runs pass.
- Built page: `robots` is `index, follow`, new sections render with the computed figures, no ad markup.

## Full audit (built output, 19 Nov 2026, after the change)

| App | Page | Main words | Explanation words | Robots |
|---|---|---|---|---|
| tools | `/base64-decode/` | 1485 | 1054 | index |
| tools | `/base64/` | 1329 | 1028 | index |
| tools | `/json-compare/` | 1318 | 945 | index |
| tools | `/json-formatter/` | 1336 | 1013 | index |
| tools | `/json-minifier/` | 1202 | 955 | index |
| tools | `/json-to-csv/` | 1556 | 1085 | index |
| tools | `/json-validator/` | 1640 | 1005 | index |
| tools | `/json-viewer/` | 1189 | 936 | index |
| calc | `/aed-to-inr/` | 616 | 502 | noindex |
| calc | `/aud-to-inr/` | 575 | 466 | noindex |
| calc | `/cad-to-inr/` | 594 | 485 | noindex |
| calc | `/car-loan-emi-calculator/` | 892 | 721 | index |
| calc | `/compound-interest-calculator/` | 975 | 782 | index |
| calc | `/currency-converter/` | 946 | 839 | index |
| calc | `/emi-calculator/` | 1090 | 920 | index |
| calc | `/eur-to-inr/` | 573 | 466 | noindex |
| calc | `/gbp-to-inr/` | 595 | 487 | noindex |
| calc | `/gst-calculator/` | 1160 | 973 | index |
| calc | `/home-loan-emi-calculator/` | 1142 | 882 | index |
| calc | `/hourly-paycheck-calculator/` | 1493 | 984 | index |
| calc | `/hourly-to-salary-calculator/` | 854 | 647 | index |
| calc | `/income-tax-calculator-india/` | 1447 | 1161 | index |
| calc | `/inr-to-usd/` | 711 | 605 | index |
| calc | `/loan-eligibility-calculator/` | 983 | 787 | index |
| calc | `/overtime-pay-calculator/` | 1529 | 1287 | index |
| calc | `/pay-raise-calculator/` | 948 | 700 | index |
| calc | `/paycheck-calculator/` | 1195 | 724 | index |
| calc | `/percentage-calculator/` | 354 | 311 | noindex |
| calc | `/salary-calculator/` | 969 | 628 | index |
| calc | `/salary-to-hourly-calculator/` | 971 | 741 | index |
| calc | `/sip-calculator/` | 1140 | 899 | index |
| calc | `/time-and-a-half-calculator/` | 1343 | 1052 | index |
| calc | `/usd-salary-to-inr-calculator/` | 1008 | 801 | index |
| calc | `/usd-to-inr/` | 690 | 580 | index |
| images | `/avif-to-jpg/` | 948 | 780 | index |
| images | `/compress-image-to-100kb/` | 1045 | 849 | index |
| images | `/compress-image-to-20kb/` | 1385 | 1185 | index |
| images | `/compress-image-to-50kb/` | 1244 | 1042 | index |
| images | `/image-compressor/` | 1307 | 977 | index |
| images | `/image-resizer/` | 1105 | 885 | index |
| images | `/image-to-jpg/` | 1083 | 831 | index |
| images | `/jpeg-compressor/` | 1113 | 909 | index |
| images | `/jpg-to-png/` | 954 | 776 | index |
| images | `/png-to-jpg/` | 1007 | 800 | index |
| images | `/webp-to-jpg/` | 975 | 779 | index |
| math | `/age-calculator/` | 1331 | 1091 | index |
| math | `/average-calculator/` | 704 | 589 | index |
| math | `/date-calculator/` | 661 | 575 | index |
| math | `/days-between-dates-calculator/` | 1118 | 886 | index |
| math | `/discount-calculator/` | 1149 | 907 | index |
| math | `/hours-calculator/` | 915 | 778 | index |
| math | `/percent-change-calculator/` | 833 | 647 | index |
| math | `/percentage-calculator/` | 755 | 579 | index |
| math | `/percentage-decrease-calculator/` | 1067 | 894 | index |
| math | `/percentage-difference-calculator/` | 1018 | 845 | index |
| math | `/percentage-increase-calculator/` | 895 | 651 | index |
| math | `/ratio-calculator/` | 1132 | 847 | index |
| math | `/standard-deviation-calculator/` | 1142 | 962 | index |
| math | `/time-calculator/` | 877 | 705 | index |
| math | `/zh/percentage-calculator/` | 196 | 118 | index |

## Owner to-dos

- Read the new income tax sections once (`/income-tax-calculator-india/` on calc).
- Plan one reviewed guide per site per week for the next few weeks; that is the clearest gap against approved tool
  sites.
- Keep `ADSENSE_CLIENT` unset until approval.