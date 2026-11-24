// Inline the site's CSS into every exported HTML page, so the first paint does not wait for a second request.
// On a slow phone connection the stylesheet request queues behind the JavaScript chunks; with the CSS in the
// HTML the page can paint as soon as the HTML has arrived.
// The original <link> stays (React looks it up by href when it hydrates and on client navigation), but as
// media="print" with an onload swap, so it no longer blocks rendering. Its rules are the same as the inline ones.
// Usage: node scripts/inline-css.mjs [outDir]   (default ./out). NEXT_PUBLIC_BASE_PATH is stripped from hrefs.
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";

const OUT = path.resolve(process.argv[2] || "out");
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const MAX_INLINE = 120_000; // bytes of CSS per page; above this, leave the page alone

const cache = new Map();
function css(href) {
  if (cache.has(href)) return cache.get(href);
  let rel = href.split("?")[0];
  if (BASE && rel.startsWith(BASE + "/")) rel = rel.slice(BASE.length);
  const file = path.join(OUT, rel);
  let text = existsSync(file) ? readFileSync(file, "utf8") : null;
  if (text !== null) {
    // Relative url() references would resolve against the page instead of the CSS file; make them absolute.
    const dir = path.posix.dirname(href.split("?")[0]);
    text = text.replace(/url\((['"]?)(?!data:|https?:|\/|#)([^'")]+)\1\)/g, (_m, q, u) => `url(${q}${path.posix.join(dir, u)}${q})`);
    // A stray "</style" inside the CSS would end the inline block early.
    text = text.replace(/<\/style/gi, "<\\/style");
  }
  cache.set(href, text);
  return text;
}

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "_next") continue;
      yield* htmlFiles(p);
    } else if (name.endsWith(".html")) yield p;
  }
}

const LINK = /<link rel="stylesheet" href="([^"]+\.css)" data-precedence="([^"]*)"\/>/g;
let pages = 0;
let skipped = 0;
for (const file of htmlFiles(OUT)) {
  const html = readFileSync(file, "utf8");
  if (html.includes("data-inlined-css")) continue;
  let total = 0;
  let missing = false;
  const next = html.replace(LINK, (tag, href, prec) => {
    const text = css(href);
    if (text === null) {
      missing = true;
      return tag;
    }
    total += text.length;
    return `<style data-inlined-css="${href}">${text}</style><link rel="stylesheet" href="${href}" data-precedence="${prec}" media="print" onload="this.media='all'"/>`;
  });
  if (missing || total === 0 || total > MAX_INLINE) {
    if (missing || total > MAX_INLINE) skipped++;
    continue;
  }
  writeFileSync(file, next);
  pages++;
}
console.log(`inline-css: CSS inlined into ${pages} pages${skipped ? `, ${skipped} left with a <link>` : ""}.`);
