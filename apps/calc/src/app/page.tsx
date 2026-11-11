import Link from "next/link";
import { AdSlot, Icon } from "@sites/shell";
import { AD_SLOT_CONTENT, guides, tools, type Tool } from "@/site";

const features = [
  {
    icon: "calc" as const,
    title: "The formula is always shown",
    body: "Every page states the arithmetic it uses, with a worked example, so you can check the answer yourself.",
  },
  {
    icon: "dollar" as const,
    title: "Any currency",
    body: "Pay figures and conversions work in every currency your browser knows, with live mid-market rates and the rupee in lakh and crore style.",
  },
  {
    icon: "lock" as const,
    title: "Private",
    body: "Everything is calculated in your browser. The figures you type are never uploaded or stored.",
  },
];

function Cards({ items, more }: { items: Tool[]; more: string }) {
  return (
    <div className="card-grid">
      {items.map((t) => (
        <Link key={t.slug} href={t.path} className="card group">
          <span className="ico">
            <Icon name={t.icon} />
          </span>
          <h3>{t.h1}</h3>
          <p>{t.blurb}</p>
          <span className="more">{more} →</span>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  const pay = tools.filter((t) => t.group === "pay");
  const finance = tools.filter((t) => t.group === "finance");
  const currency = tools.filter((t) => t.group === "currency");
  return (
    <>
      <section className="pb-6 pt-10 sm:pt-16">
        <ul className="mb-6 flex flex-wrap gap-2" aria-label="Highlights">
          <li className="chip">
            <Icon name="zap" size={14} /> Instant
          </li>
          <li className="chip">
            <Icon name="dollar" size={14} /> Any currency
          </li>
          <li className="chip">
            <Icon name="lock" size={14} /> Private
          </li>
        </ul>
        <h1 className="max-w-[20ch] text-[clamp(2.4rem,7vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-zinc-50">
          Money calculators that <span className="text-gradient">show the math</span>
        </h1>
        <p className="lede mt-5">
          Work out your take-home pay, a raise, convert salary to hourly pay, add up overtime, or convert
          between currencies such as USD to INR. Every answer comes with the formula behind it.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/paycheck-calculator" className="btn">
            Paycheck calculator <Icon name="arrow" size={16} />
          </Link>
          <Link href="/usd-to-inr" className="btn ghost">
            USD to INR
          </Link>
        </div>
      </section>

      <section className="pt-12" aria-labelledby="pay-h">
        <p className="eyebrow">Pay</p>
        <h2 id="pay-h" className="page-h2 !mt-2">
          Pay and salary calculators
        </h2>
        <Cards items={pay} more="Open calculator" />
      </section>

      <section className="pt-12" aria-labelledby="fin-h">
        <p className="eyebrow">Finance</p>
        <h2 id="fin-h" className="page-h2 !mt-2">
          EMI, SIP, GST and India tax calculators
        </h2>
        <Cards items={finance} more="Open calculator" />
      </section>

      <section className="pt-12" aria-labelledby="cur-h">
        <p className="eyebrow">Currency</p>
        <h2 id="cur-h" className="page-h2 !mt-2">
          Currency converters
        </h2>
        <Cards items={currency} more="Convert" />
      </section>

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
          Understand how the numbers are made
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
