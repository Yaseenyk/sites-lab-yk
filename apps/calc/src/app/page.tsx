import Link from "next/link";
import { Icon } from "@sites/shell";
import { guides, tools } from "@/site";

const features = [
  {
    icon: "calc" as const,
    title: "The formula is always shown",
    body: "Every page states the arithmetic it uses, with a worked example, so you can check the answer yourself.",
  },
  {
    icon: "clock" as const,
    title: "Built around real schedules",
    body: "Change hours per week, days per week and weeks per year. Part-time and unpaid time off are not an afterthought.",
  },
  {
    icon: "lock" as const,
    title: "Private",
    body: "Everything is calculated in your browser. The pay figures you type are never uploaded or stored.",
  },
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
          Pay calculators that <span className="text-gradient">show the math</span>
        </h1>
        <p className="lede mt-5">
          Work out a raise, convert salary to hourly pay, or add up overtime. Every answer comes with the
          formula behind it.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/pay-raise-calculator" className="btn">
            Pay raise calculator <Icon name="arrow" size={16} />
          </Link>
          <Link href="/salary-calculator" className="btn ghost">
            Salary calculator
          </Link>
        </div>
      </section>

      <section className="pt-12" aria-labelledby="tools-h">
        <p className="eyebrow">Calculators</p>
        <h2 id="tools-h" className="page-h2 !mt-2">
          Pick the question you are asking
        </h2>
        <div className="card-grid">
          {tools.map((t) => (
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
          Understand how pay is calculated
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
