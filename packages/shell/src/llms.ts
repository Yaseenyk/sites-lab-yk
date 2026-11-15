/**
 * /llms.txt (llmstxt.org): a short markdown map of a site for LLM crawlers. One generator for every app;
 * each app passes the same `tools` and `guides` arrays its sitemap and pages use, so the file cannot drift.
 */
export interface LlmsPage {
  path: string;
  /** Link text, e.g. the tool's H1. */
  title: string;
  /** One line from the page's own meta description. */
  description?: string;
}

export interface LlmsInput {
  name: string;
  /** Canonical origin without a trailing slash. */
  url: string;
  /** What the site is, taken from the site's own tagline. */
  tagline: string;
  author: { name: string; url: string };
  toolsHeading: string;
  tools: LlmsPage[];
  guides: LlmsPage[];
  /** Plain statements about how results are produced; each must be checkable in the code. */
  howItWorks: string[];
}

const MAKER = "Full Stack AI Developer, Hyderabad, India";

const line = (url: string, p: LlmsPage): string =>
  `- [${p.title}](${url}${p.path})${p.description ? `: ${p.description}` : ""}`;

export function buildLlmsTxt(i: LlmsInput): string {
  const parts = [
    `# ${i.name}`,
    `> ${i.tagline}`,
    `Built and maintained by ${i.author.name}, ${MAKER} (${i.author.url}/).`,
    `## ${i.toolsHeading}\n\n${i.tools.map((t) => line(i.url, t)).join("\n")}`,
    `## Guides\n\n${[line(i.url, { path: "/guides/", title: "All guides" }), ...i.guides.map((g) => line(i.url, g))].join("\n")}`,
    `## How it works\n\n${i.howItWorks.map((h) => `- ${h}`).join("\n")}`,
    `## About\n\n${[
      { path: "/about/", title: "About" },
      { path: "/privacy/", title: "Privacy" },
      { path: "/contact/", title: "Contact" },
    ]
      .map((p) => line(i.url, p))
      .join(
        "\n",
      )}\n- [Full text of every page, one file](${i.url}/llms-full.txt)\n- [Sitemap](${i.url}/sitemap.xml)`,
  ];
  return `${parts.join("\n\n")}\n`;
}

export const llmsHeaders = { "Content-Type": "text/plain; charset=utf-8" };
