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
      "Every tool runs in your browser on a canvas. Your pictures are not uploaded.",
      "To reach a target size the compressor lowers JPEG quality first (a search for the highest quality that still fits, never below a set minimum) and shrinks the dimensions only if the target cannot be reached by quality alone.",
      "The size-search logic is a plain function covered by unit tests (Vitest). No claim is made beyond what those tests check.",
    ],
  });
  return new Response(md, { headers: llmsHeaders });
}
