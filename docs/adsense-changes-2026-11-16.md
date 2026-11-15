# AdSense re-review: changes made on 16 Nov 2026

Context: the parent domain streamerosai.com was rejected for "Low-value content". The review is of the
domain, so tools., calc., images. and math.streamerosai.com count with it. This log follows
`portfolio/docs/adsense-readiness-2026-11-16.md`. Ads stay OFF.

Word counts are the visible text inside `<main>` of the built output (scripts, styles, form controls and
buttons excluded), so the widget itself adds almost nothing. "Before" is the build of commit `d9ef5cc` taken at
the start of this session. That commit already contained the earlier same-day rebuild of every tool page
(commits `ca53ba5`, `e03406e`, `4b4a836`, `d9ef5cc`), so the tool pages were already 900 to 1,500 words and
are listed as "unchanged (audited, kept)". The state before those rebuilds was not measured.

## What was audited

All indexable pages of the four apps (about 100 pages): body text, uniqueness against sibling pages, FAQ,
worked examples, formulas and sources, and whether ad markup rendered. Findings that drove the work:

1. Every page rendered an empty labelled "Advertisement" box (`data-ad-state="reserved"`, 250 to 280 px
   high, two per tool page). That is a screen area without content. Fixed in `packages/shell/src/AdSlot.tsx`:
   with no AdSense client configured the component now renders nothing. The preview mode
   (`NEXT_PUBLIC_ADS_PREVIEW=1`) and the live ad markup are unchanged, and no AdSense script is emitted.
2. No Terms page on any site. Added to all four, linked from every footer, in every sitemap and in llms.txt.
3. The privacy policy did not mention the first-party pulse counter and said ads "may" run. Rewritten.
4. The 9 guides were 340 to 420 words, the 4 guide indexes 70 to 100 words, contact pages 31 words.
5. calc `/percentage-calculator/` duplicated math.streamerosai.com (cross-domain canonical only).
6. calc had seven currency-pair pages on one template, 550 to 690 words each.

## What was changed

- **Deepened (9 guides):** each gained worked examples that were computed and checked, a mistakes list, a
  sources and limits section, and links to the tools. Sources used: RFC 8259, RFC 4648, RFC 2045, RFC 7617,
  RFC 7519, RFC 3339, US Department of Labor Fact Sheets 23 and 56A, the US OPM 2,087-hour divisor fact sheet,
  the California DLSE overtime FAQ, MDN `canvas.toBlob`. Guides are now 650 to 840 words.
- **Deepened (2 tool pages):** math `/date-calculator/` and `/average-calculator/` (the two thinnest).
- **Home, About, Contact, guide indexes:** each home gained a plain explanatory section, About gained "who is
  behind it" and "how pages are kept accurate" and now says the site does not show ads yet.
- **Trust pages (shell):** Privacy (cookies, GA4, Clarity, first-party counter, AdSense after approval with the
  opt-out links, children, choices), new Terms, richer Contact. Footer on every page: tool groups, Guides, About,
  Privacy, Terms, Contact.
- **Noindexed and removed from sitemap and llms.txt (6 pages, calc):** `/percentage-calculator/` (duplicate of
  math), `/eur-to-inr/`, `/gbp-to-inr/`, `/aud-to-inr/`, `/cad-to-inr/`, `/aed-to-inr/` (templated minor pairs).
  The pages still work and are linked; they carry `noindex, follow`. To restore a pair, remove its slug from
  `NOINDEX_SLUGS` in `apps/calc/src/site.ts` after deepening it. New `noindex` option in `pageMetadata`.
- **Merged:** none (no page was deleted, so no redirects were needed).
- **Not changed on purpose:** math `/zh/percentage-calculator/` (about 400 Chinese characters, a four-week
  experiment the owner started on 14 Nov, hreflang-linked). It is the thinnest indexed page; the owner should
  decide whether to keep it during the review (see weaknesses).
- **ads.txt:** the tool sites return 404 for `/ads.txt`. Per Google's ads.txt guidance the file at the root
  domain (streamerosai.com/ads.txt, which holds the publisher line) applies to its subdomains, so nothing was
  added to the tool repos. This repo has no `verify-no-ads` tripwire (that lives in the portfolio repo); the
  equivalent here is that `ADSENSE_CLIENT` is unset, which keeps both the ad script and every slot out of the
  output. Verified by grepping the build: 0 pages with `adsbygoogle` or `data-ad-placement`.

## Page by page

### tools.streamerosai.com

| Page | Words before | Words after | Action |
|---|---|---|---|
| `/` | 314 | 429 | added an explanatory section |
| `/about/` | 170 | 351 | expanded (who runs it, how pages are kept accurate, funding stated truthfully) |
| `/base64-decode/` | 1482 | 1482 | unchanged (audited, kept) |
| `/base64/` | 1320 | 1320 | unchanged (audited, kept) |
| `/contact/` | 31 | 166 | expanded (what helps, what we cannot do) |
| `/guides/` | 76 | 112 | added a note on how the guides are written |
| `/guides/json-parse-errors/` | 353 | 727 | deepened (worked examples, sources, limits) |
| `/guides/what-is-base64/` | 344 | 692 | deepened (worked examples, sources, limits) |
| `/json-compare/` | 1310 | 1310 | unchanged (audited, kept) |
| `/json-formatter/` | 1318 | 1318 | unchanged (audited, kept) |
| `/json-minifier/` | 1188 | 1188 | unchanged (audited, kept) |
| `/json-to-csv/` | 1543 | 1543 | unchanged (audited, kept) |
| `/json-validator/` | 1621 | 1621 | unchanged (audited, kept) |
| `/json-viewer/` | 1177 | 1177 | unchanged (audited, kept) |
| `/privacy/` | 203 | 558 | rewritten (pulse counter, cookies, AdSense opt-out, Terms link) |
| `/terms/` | - | 441 | added (new Terms page) |

### calc.streamerosai.com

| Page | Words before | Words after | Action |
|---|---|---|---|
| `/` | 682 | 782 | added an explanatory section |
| `/about/` | 291 | 472 | expanded (who runs it, how pages are kept accurate, funding stated truthfully) |
| `/aed-to-inr/` | 592 | 592 | noindexed, left out of sitemap and llms.txt |
| `/aud-to-inr/` | 561 | 561 | noindexed, left out of sitemap and llms.txt |
| `/cad-to-inr/` | 580 | 580 | noindexed, left out of sitemap and llms.txt |
| `/car-loan-emi-calculator/` | 891 | 891 | unchanged (audited, kept) |
| `/compound-interest-calculator/` | 974 | 974 | unchanged (audited, kept) |
| `/contact/` | 31 | 166 | expanded (what helps, what we cannot do) |
| `/currency-converter/` | 921 | 921 | unchanged (audited, kept) |
| `/emi-calculator/` | 1087 | 1087 | unchanged (audited, kept) |
| `/eur-to-inr/` | 549 | 549 | noindexed, left out of sitemap and llms.txt |
| `/gbp-to-inr/` | 571 | 571 | noindexed, left out of sitemap and llms.txt |
| `/gst-calculator/` | 1134 | 1134 | unchanged (audited, kept) |
| `/guides/` | 102 | 151 | added a note on how the guides are written |
| `/guides/how-exchange-rates-work/` | 381 | 678 | deepened (worked examples, sources, limits) |
| `/guides/how-overtime-pay-works/` | 417 | 841 | deepened (worked examples, sources, limits) |
| `/guides/salary-to-hourly/` | 388 | 647 | deepened (worked examples, sources, limits) |
| `/home-loan-emi-calculator/` | 1138 | 1138 | unchanged (audited, kept) |
| `/hourly-paycheck-calculator/` | 1384 | 1384 | unchanged (audited, kept) |
| `/hourly-to-salary-calculator/` | 817 | 817 | unchanged (audited, kept) |
| `/income-tax-calculator-india/` | 699 | 699 | unchanged (audited, kept) |
| `/inr-to-usd/` | 686 | 686 | unchanged (audited, kept) |
| `/loan-eligibility-calculator/` | 979 | 979 | unchanged (audited, kept) |
| `/overtime-pay-calculator/` | 1500 | 1500 | unchanged (audited, kept) |
| `/pay-raise-calculator/` | 920 | 920 | unchanged (audited, kept) |
| `/paycheck-calculator/` | 1087 | 1087 | unchanged (audited, kept) |
| `/percentage-calculator/` | 342 | 342 | noindexed, left out of sitemap and llms.txt |
| `/privacy/` | 239 | 594 | rewritten (pulse counter, cookies, AdSense opt-out, Terms link) |
| `/salary-calculator/` | 932 | 932 | unchanged (audited, kept) |
| `/salary-to-hourly-calculator/` | 934 | 934 | unchanged (audited, kept) |
| `/sip-calculator/` | 1138 | 1138 | unchanged (audited, kept) |
| `/terms/` | - | 468 | added (new Terms page) |
| `/time-and-a-half-calculator/` | 1317 | 1317 | unchanged (audited, kept) |
| `/usd-salary-to-inr-calculator/` | 969 | 969 | unchanged (audited, kept) |
| `/usd-to-inr/` | 663 | 663 | unchanged (audited, kept) |

### images.streamerosai.com

| Page | Words before | Words after | Action |
|---|---|---|---|
| `/` | 374 | 471 | added an explanatory section |
| `/about/` | 253 | 434 | expanded (who runs it, how pages are kept accurate, funding stated truthfully) |
| `/avif-to-jpg/` | 947 | 947 | unchanged (audited, kept) |
| `/compress-image-to-100kb/` | 1035 | 1035 | unchanged (audited, kept) |
| `/compress-image-to-20kb/` | 1374 | 1374 | unchanged (audited, kept) |
| `/compress-image-to-50kb/` | 1233 | 1233 | unchanged (audited, kept) |
| `/contact/` | 31 | 166 | expanded (what helps, what we cannot do) |
| `/guides/` | 74 | 117 | added a note on how the guides are written |
| `/guides/image-size-limits-on-forms/` | 367 | 726 | deepened (worked examples, sources, limits) |
| `/guides/reduce-image-size/` | 391 | 720 | deepened (worked examples, sources, limits) |
| `/image-compressor/` | 1297 | 1297 | unchanged (audited, kept) |
| `/image-resizer/` | 1102 | 1102 | unchanged (audited, kept) |
| `/image-to-jpg/` | 1082 | 1082 | unchanged (audited, kept) |
| `/jpeg-compressor/` | 1102 | 1102 | unchanged (audited, kept) |
| `/jpg-to-png/` | 952 | 952 | unchanged (audited, kept) |
| `/png-to-jpg/` | 1005 | 1005 | unchanged (audited, kept) |
| `/privacy/` | 219 | 574 | rewritten (pulse counter, cookies, AdSense opt-out, Terms link) |
| `/terms/` | - | 445 | added (new Terms page) |
| `/webp-to-jpg/` | 974 | 974 | unchanged (audited, kept) |

### math.streamerosai.com

| Page | Words before | Words after | Action |
|---|---|---|---|
| `/` | 393 | 490 | added an explanatory section |
| `/about/` | 251 | 432 | expanded (who runs it, how pages are kept accurate, funding stated truthfully) |
| `/age-calculator/` | 1329 | 1329 | unchanged (audited, kept) |
| `/average-calculator/` | 514 | 699 | deepened (worked examples, sources, limits) |
| `/contact/` | 31 | 166 | expanded (what helps, what we cannot do) |
| `/date-calculator/` | 492 | 659 | deepened (worked examples, sources, limits) |
| `/days-between-dates-calculator/` | 1118 | 1118 | unchanged (audited, kept) |
| `/discount-calculator/` | 1147 | 1147 | unchanged (audited, kept) |
| `/guides/` | 68 | 97 | added a note on how the guides are written |
| `/guides/counting-days-between-dates/` | 399 | 768 | deepened (worked examples, sources, limits) |
| `/guides/percentage-formulas/` | 358 | 729 | deepened (worked examples, sources, limits) |
| `/hours-calculator/` | 912 | 912 | unchanged (audited, kept) |
| `/percent-change-calculator/` | 831 | 831 | unchanged (audited, kept) |
| `/percentage-calculator/` | 761 | 761 | unchanged (audited, kept) |
| `/percentage-decrease-calculator/` | 1066 | 1066 | unchanged (audited, kept) |
| `/percentage-difference-calculator/` | 1018 | 1018 | unchanged (audited, kept) |
| `/percentage-increase-calculator/` | 894 | 894 | unchanged (audited, kept) |
| `/privacy/` | 202 | 557 | rewritten (pulse counter, cookies, AdSense opt-out, Terms link) |
| `/ratio-calculator/` | 1136 | 1136 | unchanged (audited, kept) |
| `/standard-deviation-calculator/` | 1137 | 1137 | unchanged (audited, kept) |
| `/terms/` | - | 449 | added (new Terms page) |
| `/time-calculator/` | 875 | 875 | unchanged (audited, kept) |
| `/zh/percentage-calculator/` | 196 | 196 | unchanged, flagged: Chinese page, about 400 characters (word count meaningless); kept as the owner's time-boxed experiment |

## Verification

- `npm run lint`, `typecheck`, `test` and `prettier --check src ../../packages/shell/src` pass for all four
  apps, plus `lint:shell`. (`prettier --check .` also reports config files such as `package.json` on this
  Windows checkout because of CRLF line endings; CI on Linux is unaffected and those files were not touched.)
- `next build` passes for all four apps; each sitemap contains `/terms/`; calc's sitemap omits the six
  noindexed pages.

## What is still weak (honest assessment)

- **Genuine user interest is unproven.** These are small generic calculator sites competing with large
  incumbents, with little traffic. On-page text does not create an audience, and Google's third requirement
  ("generate and sustain genuine user interest") is about that.
- **Shared page skeleton.** Every tool page follows the same layout (lede, tool, worked example, table, FAQ,
  related). The text is specific to each page, but families remain close: math has five percentage pages
  (calculator, increase, decrease, difference, change), images has three near-identical size pages (20, 50,
  100 KB), calc has three EMI pages and several salary and hourly conversions. If the review fails again,
  merge or noindex within these families before adding words.
- **Only 2 guides per site.** Enough to show editorial intent, thin as a content base. The repo rules cap
  guides at two a week and require review; none was published unreviewed here.
- **The zh page** is short and a translation of a tool page; consider noindex until it earns clicks.
- **Some source links were not fetched.** The DOL fact-sheet pages block automated requests (HTTP 403), so
  those two are cited by title and number, not linked. The ECB reference-rate page did not respond and was
  not cited. The other links returned 200. The statements about California daily overtime and the 2,087
  divisor follow those agencies' published rules and should be spot-checked by the owner.
- **Before-numbers** exist only for pages whose text changed this session (see the note at the top).
- **Contact** is one shared mailbox, contact@streamerosai.com, set through repo variables. A named person and
  a physical or regional detail on the About pages would help trust; only what is already public (name,
  city) was used.
- **Domain level.** The review also covers the other subdomains (esports, spotai, solar, exams, campus,
  fitrank, yk). Thin pages there can still sink the domain; this log covers only these four sites.

## Owner to-dos

- Spot check the live pages after the deploy, then request the AdSense review.
- Decide about the zh page and the minor currency pairs (restore after deepening, or leave noindexed).
- Keep `ADSENSE_CLIENT` unset until approval. After approval set it and the slot variables, and update the
  sentence "does not show ads at the moment" in `packages/shell/src/LegalPages.tsx` and the About pages.
- Prefer one real, reviewed guide per site per week (within the two-a-week cap) over more tool pages.

## Incident note

While measuring "before" word counts, a temporary git worktree with node_modules junctions was removed with
`git worktree remove --force`. The removal followed the junctions and deleted tracked source and
`node_modules` in this checkout. Everything was restored from git (`git restore` of the deleted files; the
tree had no uncommitted changes at that moment) and `npm ci` reinstalled the dependencies. The guide edits
that were in progress were re-applied. No commit was affected and nothing was lost.
