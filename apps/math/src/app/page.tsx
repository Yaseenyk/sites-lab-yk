import Link from "next/link";
import { AdSlot, Icon } from "@sites/shell";
import { AD_SLOT_CONTENT, guides, tools, type Tool } from "@/site";

const features = [
  {
    icon: "calc" as const,
    title: "The formula is always shown",
    body: "Every page states the arithmetic it uses, with worked examples, so you can check the answer yourself.",
  },
  {
    icon: "zap" as const,
    title: "Instant answers",
    body: "Results update as you type. No button to press, no sign-up, no ads in the way of the result.",
  },
  {
    icon: "lock" as const,
    title: "Private",
    body: "Everything is calculated in your browser. Dates of birth and other figures are never uploaded.",
  },
];

const sections: { id: string; eyebrow: string; title: string; group: Tool["group"] }[] = [
  { id: "p", eyebrow: "Percentages", title: "Percentage calculators", group: "percent" },
  { id: "d", eyebrow: "Dates and time", title: "Age, date and hours calculators", group: "dates" },
  { id: "n", eyebrow: "Numbers", title: "Ratios and averages", group: "numbers" },
];

export default function Home() {
  return (
    <>
      <section className="pb-6 pt-10 sm:pt-16">
        <ul className="mb-6 flex flex-wrap gap-2" aria-label="Highlights">
          <li className="chip">
            <Icon name="zap" size={14} /> Instant
          </li>
          <li className="chip">
            <Icon name="lock" size={14} /> Private
          </li>
          <li className="chip">
            <Icon name="check" size={14} /> Free
          </li>
        </ul>
        <h1 className="max-w-[20ch] text-[clamp(2.4rem,7vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-zinc-50">
          Everyday math, <span className="text-gradient">shown step by step</span>
        </h1>
        <p className="lede mt-5">
          Percentages, age, dates, hours, ratios and averages. Type your numbers and the answer appears, with
          the formula behind it.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/percentage-calculator" className="btn">
            Percentage calculator <Icon name="arrow" size={16} />
          </Link>
          <Link href="/age-calculator" className="btn ghost">
            Age calculator
          </Link>
        </div>
      </section>

      {sections.map((s) => (
        <section key={s.id} className="pt-12" aria-labelledby={`${s.id}-h`}>
          <p className="eyebrow">{s.eyebrow}</p>
          <h2 id={`${s.id}-h`} className="page-h2 !mt-2">
            {s.title}
          </h2>
          <div className="card-grid">
            {tools
              .filter((t) => t.group === s.group)
              .map((t) => (
                <Link key={t.slug} href={t.path} className="card group">
                  <span className="ico">
                    <Icon name={t.icon} />
                  </span>
                  <h3>{t.h1}</h3>
                  <p>{t.blurb}</p>
                  <span className="more">Open calculator →</span>
                </Link>
              ))}
          </div>
        </section>
      ))}

      <AdSlot slot={AD_SLOT_CONTENT} placement="home-mid" />

      <section className="pt-12" aria-labelledby="why-h">
        <p className="eyebrow">Why these</p>
        <h2 id="why-h" className="page-h2 !mt-2">
          Numbers you can check
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
          Understand the formulas
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
