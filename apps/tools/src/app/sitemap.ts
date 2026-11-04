import type { MetadataRoute } from "next";
import { guides, site, tools } from "@/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/guides", ...tools.map((t) => t.href), ...guides.map((g) => g.href), "/about", "/privacy", "/contact"];
  return paths.map((p) => ({ url: `${site.url}${p === "/" ? "/" : p + "/"}` }));
}
