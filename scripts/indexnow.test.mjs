import assert from "node:assert/strict";
import { test } from "node:test";
import { selectUrls } from "./indexnow.mjs";

const site = "https://math.streamerosai.com";
const all = ["/", "/percentage-calculator/", "/date-calculator/", "/guides/", "/guides/percentage-formulas/"].map((p) => site + p);

test("a changed page file selects only its URL", () => {
  const urls = selectUrls({ app: "math", site, all, changed: ["apps/math/src/app/date-calculator/page.tsx"] });
  assert.deepEqual(urls, [`${site}/date-calculator/`]);
});
test("another app's change selects nothing", () => {
  assert.deepEqual(selectUrls({ app: "math", site, all, changed: ["apps/calc/src/site.ts"] }), []);
});
test("shared shell change selects the whole sitemap", () => {
  assert.equal(selectUrls({ app: "math", site, all, changed: ["packages/shell/src/seo.tsx"] }).length, all.length);
});
test("urls not in the sitemap are dropped", () => {
  assert.deepEqual(selectUrls({ app: "math", site, all, changed: ["apps/math/src/app/zzz/page.tsx"] }), []);
});
