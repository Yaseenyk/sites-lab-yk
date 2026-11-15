/**
 * Post-build, run from an app folder: node ../../scripts/generate-llms-full.mjs <math|calc|tools|images>
 * Writes out/llms-full.txt, the whole site as one plain-text file for AI crawlers (llmstxt.org). llms.txt is the map;
 * this is the territory. Reads the built HTML of every URL in the sitemap, keeps the <main> text (headings as
 * markdown, links dropped to text), and skips pages that are noindex. No dependencies.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const NAMES = { math: "StreamerOS Math Calculators", calc: "StreamerOS Money Calculators", tools: "StreamerOS Dev Tools", images: "StreamerOS Image Tools" };
const app = process.argv[2];
if (!NAMES[app]) throw new Error(`Usage: generate-llms-full.mjs <${Object.keys(NAMES).join("|")}>`);
const OUT = join(process.cwd(), "out");
const SITE = `https://${app}.streamerosai.com`;
const HEADER = `# ${NAMES[app]}: full site text

> The readable text of every public page on ${SITE}, built by Yaseen Khatib, Full Stack AI Developer, Hyderabad, India
> (https://yk.streamerosai.com/). The short map is at ${SITE}/llms.txt.
`;

const entities = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " ", "&rsquo;": "’", "&lsquo;": "‘", "&mdash;": "—", "&ndash;": "–", "&hellip;": "…" };
const decode = (s) => s.replace(/&(#\d+|[a-z]+);/gi, (m, g) => entities[m] ?? (g[0] === "#" ? String.fromCodePoint(+g.slice(1)) : m));

function pageFile(url) {
  const path = url.replace(SITE, "").replace(/^\/|\/$/g, "");
  const candidates = path ? [join(OUT, path, "index.html"), join(OUT, `${path}.html`)] : [join(OUT, "index.html")];
  return candidates.find(existsSync);
}

function toText(html) {
  const robots = /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i.exec(html)?.[1] ?? "";
  if (/noindex/i.test(robots)) return null;
  const title = decode(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1]?.trim() ?? "");
  let body = /<main[\s\S]*?<\/main>/i.exec(html)?.[0] ?? /<article[\s\S]*?<\/article>/i.exec(html)?.[0] ?? "";
  body = body
    .replace(/<(script|style|noscript|svg|form|button|nav|footer)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, t) => `\n\n${"#".repeat(+n + 1)} ${t.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()}\n\n`)
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<\/(p|div|section|tr|ul|ol|details|summary)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ");
  body = decode(body).replace(/\s+([.,;:!?)])/g, "$1").replace(/[ \t]+/g, " ").replace(/ *\n */g, "\n").replace(/\n{3,}/g, "\n\n").trim();
  return body.split(/\s+/).length < 40 ? null : { title, body };
}

const sitemap = readFileSync(join(OUT, "sitemap.xml"), "utf-8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
const parts = [HEADER];
let kept = 0;
for (const url of urls) {
  const file = pageFile(url);
  if (!file) continue;
  const t = toText(readFileSync(file, "utf-8"));
  if (!t) continue;
  kept += 1;
  parts.push(`\n---\n\n# ${t.title}\n\nURL: ${url}\n\n${t.body}\n`);
}
writeFileSync(join(OUT, "llms-full.txt"), parts.join("\n"));
console.log(`llms-full.txt: ${kept} of ${urls.length} sitemap pages, ${(parts.join("").length / 1024).toFixed(0)} KB`);
