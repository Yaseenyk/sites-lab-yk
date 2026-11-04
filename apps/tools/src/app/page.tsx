import Link from "next/link";
import { Icon } from "@sites/shell";
import { guides, tools } from "@/site";

const features = [
  {
    icon: "lock" as const,
    title: "Private by design",
    body: "Every tool runs in your browser. What you paste is never uploaded, logged or stored.",
  },
  {
    icon: "zap" as const,
    title: "Instant",
    body: "No sign-up, no queue and no server round trip. Results appear as you work.",
  },
  {
    icon: "shield" as const,
    title: "Errors you can act on",
    body: "Invalid input points to the exact line and column, and each guide explains the fix.",
  },
];

export default function Home() {
  return (
    <>
      <section className="pb-6 pt-10 sm:pt-16">
        <ul className="mb-6 flex flex-wrap gap-2" aria-label="Highlights">
          <li className="chip">
            <Icon name="lock" size={14} /> 100% in-browser
          </li>
          <li className="chip">
            <Icon name="zap" size={14} /> No sign-up
          </li>
          <li className="chip">
            <Icon name="check" size={14} /> Free
          </li>
        </ul>
        <h1 className="max-w-[18ch] text-[clamp(2.4rem,7vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-zinc-50">
          Developer tools that run in <span className="text-gradient">your browser</span>
        </h1>
        <p className="lede mt-5">
          Format, validate, compare and convert JSON, and encode Base64, without sending your data anywhere.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/json-formatter" className="btn">
            Open JSON Formatter <Icon name="arrow" size={16} />
          </Link>
          <Link href="/guides" className="btn ghost">
            Read the guides
          </Link>
        </div>
      </section>

      <section className="pt-12" aria-labelledby="tools-h">
        <p className="eyebrow">Tools</p>
        <h2 id="tools-h" className="page-h2 !mt-2">
          Everything you need for JSON and Base64
        </h2>
        <div className="card-grid">
          {tools.map((t) => (
            <Link key={t.slug} href={t.path} className="card group">
              <span className="ico">
                <Icon name={t.icon} />
              </span>
              <h3>{t.h1}</h3>
              <p>{t.blurb}</p>
              <span className="more">Open tool →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="pt-12" aria-labelledby="why-h">
        <p className="eyebrow">Why these</p>
        <h2 id="why-h" className="page-h2 !mt-2">
          Built to be trusted with real data
        </h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="feature">
              <span className="ico block">
                <Icon name={f.icon} size={26} />
              </span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-12" aria-labelledby="guides-h">
        <p className="eyebrow">Guides</p>
        <h2 id="guides-h" className="page-h2 !mt-2">
          Understand the formats behind the tools
        </h2>
        <div className="card-grid">
          {guides.map((g) => (
            <Link key={g.slug} href={g.path} className="card group">
              <h3>{g.title}</h3>
              <p>{g.blurb}</p>
              <span className="more">Read guide →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
