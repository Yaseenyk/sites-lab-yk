import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { site } from "@/site";
import { GET } from "./route";

describe("llms.txt", () => {
  it("is plain text and names the maker, the sitemap and the author site", async () => {
    const res = GET();
    expect(res.headers.get("Content-Type")).toMatch(/^text\/plain/);
    const body = await res.text();
    expect(body.startsWith(`# ${site.name}`)).toBe(true);
    expect(body).toContain(
      "Yaseen Khatib, Full Stack AI Developer, Hyderabad, India (https://yk.streamerosai.com/)",
    );
    expect(body).toContain(`${site.url}/sitemap.xml`);
  });

  it("lists every tool and guide page the sitemap lists", async () => {
    const body = await GET().text();
    const skip = ["/", "/about/", "/privacy/", "/terms/", "/contact/", "/guides/"];
    for (const entry of sitemap()) {
      const path = entry.url.slice(site.url.length);
      if (skip.includes(path) || path.startsWith("/zh/")) {
        continue;
      }
      expect(body, path).toContain(`(${entry.url})`);
    }
  });
});
