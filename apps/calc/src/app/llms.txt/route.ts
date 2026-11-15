import { author, guides, isIndexable, site, tools } from "@/site";
import { buildLlmsTxt, llmsHeaders } from "@sites/shell";

export const dynamic = "force-static";

/** The same lists the sitemap uses, so this map cannot drift from the pages. */
export function GET() {
  const md = buildLlmsTxt({
    name: site.name,
    url: site.url,
    tagline: site.tagline,
    author,
    toolsHeading: site.toolsHeading,
    tools: tools
      .filter((t) => isIndexable(t.slug))
      .map((t) => ({ path: t.path, title: t.h1, description: t.description })),
    guides: guides.map((g) => ({ path: g.path, title: g.title, description: g.description })),
    howItWorks: [
      "Calculations run in your browser. Numbers you type are not uploaded.",
      "The formula is shown on each page. These are estimates for planning, not tax, legal or financial advice.",
      "Currency conversion uses public exchange-rate feeds fetched by your browser (currency-api via jsDelivr or Cloudflare Pages, then open.er-api.com as a fallback). The page shows the date the feed reports for its rates; rates are not live to the second.",
      "The percentage calculator lives on math.streamerosai.com, which is why it is not listed here. The minor currency pairs (EUR, GBP, AUD, CAD, AED to INR) work but are kept out of the index; use the currency converter for them.",
      "The calculation functions are covered by unit tests (Vitest). No claim is made beyond what those tests check.",
    ],
  });
  return new Response(md, { headers: llmsHeaders });
}
