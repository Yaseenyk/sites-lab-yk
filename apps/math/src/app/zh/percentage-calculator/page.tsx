import Link from "next/link";
import { JsonLd, pageMetadata } from "@sites/shell";
import PercentCalculatorZh from "@/components/PercentCalculatorZh";
import { UPDATED, site } from "@/site";

/*
 * Chinese (simplified) version of the percentage calculator: an experiment, not a rewrite of the site.
 * Why this page: in Search Console, Chinese-character queries were 69% of the visible impressions on this site and all of them
 * landed on the percentage calculator, but with no clicks, because the page was English. This tests whether a Chinese page
 * turns any of that into clicks. It is a separate URL joined to the English page by hreflang; it is never reached by
 * redirecting on IP address. If it earns no clicks in about four weeks, remove it.
 */
const PATH = "/zh/percentage-calculator/";
const EN_PATH = "/percentage-calculator/";
const TITLE = "百分比计算器：求百分之几、占比和总数（免费在线）";
const DESCRIPTION =
  "免费在线百分比计算器：X 的 Y% 是多少、X 占 Y 的百分之几、已知部分和百分比求总数。输入数字即时出结果，无需注册。";

export const metadata = pageMetadata(site, {
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
  languages: {
    "zh-CN": `${site.url}${PATH}`,
    en: `${site.url}${EN_PATH}`,
    "x-default": `${site.url}${EN_PATH}`,
  },
});

const faq = [
  { q: "怎样计算一个数的 X%？", a: "把百分比除以 100，再乘以这个数。80 的 15% 就是 15 ÷ 100 × 80 = 12。" },
  {
    q: "怎样求一个数占另一个数的百分之几？",
    a: "用第一个数除以第二个数，再乘以 100。12 占 80 的 12 ÷ 80 × 100 = 15%。",
  },
  {
    q: "已知部分和百分比，怎样求总数？",
    a: "用部分除以百分比（写成小数）。如果 12 是某个数的 15%，这个数就是 12 ÷ 0.15 = 80。",
  },
  {
    q: "怎样计算一个百分数的百分之几？",
    a: "把两个百分数都写成小数再相乘。50% 的 20% 就是 0.20 × 0.50 = 0.10，也就是 10%。在第一个计算器里把百分比填 20、数字填 50 即可。",
  },
  { q: "怎样把百分数换成小数？", a: "除以 100，也就是把小数点向左移两位。15% 是 0.15，7.5% 是 0.075。" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${site.url}${PATH}#app`,
      name: "百分比计算器",
      description: DESCRIPTION,
      url: `${site.url}${PATH}`,
      inLanguage: "zh-CN",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any (web browser)",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      dateModified: UPDATED,
      publisher: { "@id": `${site.url}/#author` },
      isPartOf: { "@id": `${site.url}/#website` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首页", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "百分比计算器", item: `${site.url}${PATH}` },
      ],
    },
    {
      "@type": "FAQPage",
      inLanguage: "zh-CN",
      mainEntity: faq.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    },
  ],
};

export default function Page() {
  return (
    <div lang="zh-CN">
      <JsonLd data={jsonLd} />
      <nav aria-label="面包屑" className="mb-3 text-sm">
        <Link href="/">首页</Link> / <span>百分比计算器</span>
      </nav>
      <p className="eyebrow mb-3 hidden sm:block">免费 · 即时出结果 · 在浏览器中运行</p>
      <h1 className="page-h1">百分比计算器</h1>
      <p className="lede">
        三种常见问题一次解决：X 的 Y% 是多少，X 占 Y 的百分之几，已知 X 是总数的 Y%
        时总数是多少。在任意输入框中输入数字，结果会立即更新。
      </p>
      <PercentCalculatorZh />
      <p className="mt-4 text-sm">
        <Link href={EN_PATH} hrefLang="en" lang="en">
          English version
        </Link>
      </p>

      <div className="doc mt-10">
        <h2>三个基本公式</h2>
        <table>
          <thead>
            <tr>
              <th>问题</th>
              <th>公式</th>
              <th>例子</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>求 Y 的 X%</td>
              <td>X ÷ 100 × Y</td>
              <td>80 的 15% = 12</td>
            </tr>
            <tr>
              <td>X 占 Y 的百分之几</td>
              <td>X ÷ Y × 100</td>
              <td>12 占 80 的 15%</td>
            </tr>
            <tr>
              <td>X 是总数的 Y%，求总数</td>
              <td>X ÷ (Y ÷ 100)</td>
              <td>12 是 80 的 15%</td>
            </tr>
          </tbody>
        </table>

        <h2>心算小技巧</h2>
        <p>
          一个数的 10% 就是把小数点向左移一位：80 的 10% 是 8。5% 是它的一半，也就是 4。所以 80 的 15% 就是 8
          + 4 = 12。1% 则是把小数点向左移两位。
        </p>
        <p>
          如果要计算涨幅或降幅，可以使用英文版的{" "}
          <Link href="/percentage-increase-calculator/" hrefLang="en" lang="en">
            percentage increase
          </Link>{" "}
          和{" "}
          <Link href="/percentage-decrease-calculator/" hrefLang="en" lang="en">
            percentage decrease
          </Link>{" "}
          计算器。
        </p>
      </div>

      <section aria-labelledby="faq-h">
        <h2 id="faq-h" className="page-h2">
          常见问题
        </h2>
        <div className="faq">
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
