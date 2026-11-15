import { author, guides, site, tools } from "@/site";
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
    tools: tools.map((t) => ({ path: t.path, title: t.h1, description: t.description })),
    guides: guides.map((g) => ({ path: g.path, title: g.title, description: g.description })),
    howItWorks: [
      "Every calculation runs in your browser. Numbers you type are not uploaded.",
      "The formula is shown on each page. Results drop trailing zeros and show up to 6 decimal places by default; counts of days, weeks and months are whole numbers, and decimal hours show 2 or 4 places.",
      "Percent difference is the gap relative to the average of the two values, so it is symmetric; percent change is relative to the old value, so it is not.",
      "The calculation functions are covered by unit tests (Vitest). No claim is made beyond what those tests check.",
    ],
  });
  return new Response(md, { headers: llmsHeaders });
}
