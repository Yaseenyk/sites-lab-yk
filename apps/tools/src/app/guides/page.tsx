import Link from "next/link";
import { pageMetadata } from "@sites/shell";
import { guides, site } from "@/site";

export const metadata = pageMetadata(site, {
  title: "Guides",
  description: "Short guides that go with the tools: why JSON fails to parse, what Base64 is, and more.",
  path: "/guides/",
});

export default function Page() {
  return (
    <>
      <h1>Guides</h1>
      <p className="lede">Short explanations that go with the tools.</p>
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
