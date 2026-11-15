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
      "Every tool runs in your browser. What you paste is not uploaded, and the site makes no network request that carries it.",
      "The logic is plain functions in the site source, covered by unit tests (Vitest). No claim is made beyond what those tests check.",
    ],
  });
  return new Response(md, { headers: llmsHeaders });
}
