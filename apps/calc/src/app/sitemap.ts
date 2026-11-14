import type { MetadataRoute } from "next";
import { UPDATED, guides, site, tools } from "@/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const at = (path: string, priority: number) => ({
    url: `${site.url}${path}`,
    lastModified: UPDATED,
    priority,
  });
  return [
    at("/", 1),
    // percentage-calculator is canonical to math.streamerosai.com, so it is not listed here.
    ...tools.filter((t) => t.slug !== "percentage-calculator").map((t) => at(t.path, 0.9)),
    at("/guides/", 0.7),
    ...guides.map((g) => at(g.path, 0.7)),
    at("/about/", 0.3),
    at("/privacy/", 0.2),
    at("/contact/", 0.3),
  ];
}
