import Link from "next/link";
import type { ReactNode } from "react";
import type { SiteConfig } from "./config";
import { LogoMark } from "./Logo";

function Brand({ size }: { size: number }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5 whitespace-nowrap"
      aria-label="StreamerOS Dev Tools home"
    >
      <LogoMark size={size} />
      <span className="text-sm font-bold tracking-tight text-zinc-50">
        StreamerOS <span className="text-gradient">Dev Tools</span>
      </span>
    </Link>
  );
}

export function SiteShell({ site, children }: { site: SiteConfig; children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="absolute left-2 top-2 z-50 -translate-y-20 rounded-lg bg-cyan px-3 py-2 text-sm font-semibold text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-zinc-800/60 bg-ink/60 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-6 md:px-10">
          <Brand size={30} />
          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
            {site.nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/json-formatter"
            className="whitespace-nowrap rounded-full bg-cyan px-3.5 py-1.5 text-sm font-semibold text-ink transition-shadow hover:shadow-[0_0_18px_-2px_rgba(34,211,238,0.7)]"
          >
            Open a tool
          </Link>
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-8 md:px-10">
        {children}
      </main>

      <footer className="relative z-10 mt-12 border-t border-zinc-800/60 bg-ink/60 backdrop-blur-md">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-12 md:px-10">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Brand size={26} />
              <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-zinc-400">{site.tagline}</p>
            </div>
            <nav aria-label="Tools">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Tools</h2>
              <ul className="mt-3 space-y-2">
                {site.nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="text-sm text-zinc-400 transition-colors hover:text-cyan">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Site">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Site</h2>
              <ul className="mt-3 space-y-2">
                {[
                  ["/about", "About"],
                  ["/privacy", "Privacy"],
                  ["/contact", "Contact"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href as string}
                      className="text-sm text-zinc-400 transition-colors hover:text-cyan"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <p className="mt-10 border-t border-zinc-800/60 pt-6 font-mono text-xs text-zinc-600">
            © {new Date().getFullYear()} {site.name}. Your input never leaves your browser.
          </p>
        </div>
      </footer>
    </>
  );
}
