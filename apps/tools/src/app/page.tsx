import Link from "next/link";
import { guides, site, tools } from "@/site";

export default function Home() {
  return (
    <>
      <h1>Developer tools that run in your browser</h1>
      <p className="lede">{site.tagline} Nothing here needs an account.</p>
      <h2>Tools</h2>
      <div className="card-grid">
        {tools.map((t) => (
          <Link key={t.href} href={t.href} className="card">
            <h3>{t.title}</h3>
            <p>{t.blurb}</p>
          </Link>
        ))}
      </div>
      <h2>Guides</h2>
      <div className="card-grid">
        {guides.map((g) => (
          <Link key={g.href} href={g.href} className="card">
            <h3>{g.title}</h3>
            <p>{g.blurb}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
