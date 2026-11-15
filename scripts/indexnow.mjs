// Tells IndexNow search engines (Bing, Yandex and others; Google does not use it) which pages are new or changed.
// Usage: node scripts/indexnow.mjs <math|calc|tools|images>   (run after the deploy step; needs fetch-depth: 2)
// DRY_RUN=1 prints the URLs without sending. FORCE=1 submits the whole sitemap (capped at 10000, IndexNow's limit).
// The key is public by design: it is published at /<key>.txt so the engines can check that the site is ours.
import { execSync } from "node:child_process";
import fs from "node:fs";
import { pathToFileURL } from "node:url";

const SITES = {
  math: "https://math.streamerosai.com",
  calc: "https://calc.streamerosai.com",
  tools: "https://tools.streamerosai.com",
  images: "https://images.streamerosai.com",
};
export const LIMIT = 10000;

/** Pure: which sitemap URLs a commit touched. `changed` is the list of repo-relative paths. */
export function selectUrls({ app, site, changed, all }) {
  const own = `apps/${app}/`;
  const files = changed.map((f) => f.split("\\").join("/"));
  // Shared shell or lockfile changes can alter every page of every app.
  if (files.some((f) => f.startsWith("packages/shell/"))) return all.slice(0, LIMIT);
  const set = new Set();
  for (const f of files) {
    if (!f.startsWith(own)) continue;
    const rel = f.slice(own.length);
    if (rel === "src/site.ts" || rel.startsWith("src/components/") || rel.startsWith("src/lib/")) {
      all.forEach((u) => set.add(u)); // shared data, widgets and logic feed many pages
      continue;
    }
    const m = /^src\/app\/(.+)\/page\.tsx$/.exec(rel);
    if (m) set.add(`${site}/${m[1]}/`);
    else if (rel === "src/app/page.tsx") set.add(`${site}/`);
  }
  return [...set].filter((u) => all.includes(u)).slice(0, LIMIT);
}

async function main() {
  const app = process.argv[2];
  const site = SITES[app];
  if (!site) throw new Error(`Unknown app "${app}". Use one of: ${Object.keys(SITES).join(", ")}`);
  const publicDir = `apps/${app}/public`;
  const keyFile = fs.readdirSync(publicDir).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (!keyFile) { console.log(`No IndexNow key file in ${publicDir}; nothing to do.`); return; }
  const key = keyFile.replace(".txt", "");

  // The site is published by another repo's Pages build, so wait (up to 5 minutes) until the key file is live.
  if (process.env.DRY_RUN !== "1") {
    let live = false;
    for (let i = 0; i < 30 && !live; i++) {
      try { live = (await (await fetch(`${site}/${keyFile}`)).text()).trim() === key; } catch { /* retry */ }
      if (!live) await new Promise((r) => setTimeout(r, 10000));
    }
    if (!live) { console.log("Key file is not live yet; skipping the ping."); return; }
  }

  // The live sitemap, because this runs after the deploy.
  const xml = await (await fetch(`${site}/sitemap.xml`)).text();
  const all = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  let urls;
  if (process.env.FORCE === "1") urls = all.slice(0, LIMIT);
  else {
    let changed = [];
    try { changed = execSync("git diff --name-only HEAD^ HEAD", { encoding: "utf8" }).split("\n").filter(Boolean); } catch { changed = []; }
    urls = selectUrls({ app, site, changed, all });
  }
  if (!urls.length) { console.log("No indexable pages changed in this commit."); return; }
  console.log(`${process.env.DRY_RUN === "1" ? "Would submit" : "Submitting"} ${urls.length} URL(s) to IndexNow:\n  ${urls.join("\n  ")}`);
  if (process.env.DRY_RUN === "1") return;
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST", headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${key}.txt`, urlList: urls }),
  });
  console.log(`IndexNow answered HTTP ${res.status}`); // 200 or 202 means accepted
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) await main();
