import Link from "next/link";
import { AdSlot, Icon } from "@sites/shell";
import { AD_SLOT_CONTENT, guides, tools, type Tool } from "@/site";

const features = [
  {
    icon: "lock" as const,
    title: "Your photos stay yours",
    body: "Images are processed in your browser. They are never uploaded, which matters for ID photos and private pictures.",
  },
  {
    icon: "download" as const,
    title: "Hit an exact size",
    body: "Type a limit like 50 KB and the tool finds the best quality that fits, shrinking the picture only if it has to.",
  },
  {
    icon: "zap" as const,
    title: "No sign-up, no watermark",
    body: "Drop in files, download the results. Several images at once are fine.",
  },
];

function Cards({ items }: { items: Tool[] }) {
  return (
    <div className="card-grid">
      {items.map((t) => (
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
  );
}

export default function Home() {
  return (
    <>
      <section className="pb-6 pt-10 sm:pt-16">
        <ul className="mb-6 flex flex-wrap gap-2" aria-label="Highlights">
          <li className="chip">
            <Icon name="lock" size={14} /> Nothing uploaded
          </li>
          <li className="chip">
            <Icon name="zap" size={14} /> Instant
          </li>
          <li className="chip">
            <Icon name="check" size={14} /> Free
          </li>
        </ul>
        <h1 className="max-w-[20ch] text-[clamp(2.4rem,7vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-zinc-50">
          Image tools that <span className="text-gradient">never upload</span> your photos
        </h1>
        <p className="lede mt-5">
          Compress an image to 20 KB or 100 KB, resize it, or convert PNG, JPG, WebP and AVIF. It all happens
          in your browser.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/image-compressor" className="btn">
            Compress an image <Icon name="arrow" size={16} />
          </Link>
          <Link href="/compress-image-to-50kb" className="btn ghost">
            Compress to 50 KB
          </Link>
        </div>
      </section>

      <section className="pt-12" aria-labelledby="c-h">
        <p className="eyebrow">Compress</p>
        <h2 id="c-h" className="page-h2 !mt-2">
          Make images smaller
        </h2>
        <Cards items={tools.filter((t) => t.group === "compress")} />
      </section>

      <section className="pt-12" aria-labelledby="r-h">
        <p className="eyebrow">Resize and convert</p>
        <h2 id="r-h" className="page-h2 !mt-2">
          Change the size or the format
        </h2>
        <Cards items={tools.filter((t) => t.group !== "compress")} />
      </section>

      <AdSlot slot={AD_SLOT_CONTENT} placement="home-mid" />

      <section className="pt-12" aria-labelledby="why-h">
        <p className="eyebrow">Why these</p>
        <h2 id="why-h" className="page-h2 !mt-2">
          Built for private, practical jobs
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
          Understand what happens to the file
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
