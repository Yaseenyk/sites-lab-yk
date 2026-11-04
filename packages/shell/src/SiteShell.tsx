import Link from "next/link";
import type { ReactNode } from "react";
import type { SiteConfig } from "./config";
import { LogoMark } from "./Logo";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

function Brand({ site, size }: { site: SiteConfig; size: number }) {
  return (
    <Link
      href="/"
      className="group inline-flex min-w-0 items-center gap-2.5"
      aria-label={`${site.name} home`}
    >
      <LogoMark size={size} mark={site.brand.mark} label={`${site.name} logo`} />
      <span className="truncate text-sm font-bold tracking-tight text-zinc-50">
        {site.brand.lead} <span className="text-gradient">{site.brand.accent}</span>
      </span>
    </Link>
  );
}

export function SiteShell({ site, children }: { site: SiteConfig; children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="absolute left-2 top-2 z-50 -translate-y-20 rounded-lg bg-cyan px-3 py-2 text-sm font-semibold text-on-accent focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-30 border-b border-zinc-800/60 bg-ink/60 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6 md:px-10">
          <div className="min-w-0 flex-1 lg:flex-none">
            <Brand site={site} size={30} />
          </div>
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
            href={site.cta.href}
            className="hidden whitespace-nowrap rounded-full bg-cyan px-3.5 py-1.5 text-sm font-semibold text-on-accent transition-shadow hover:shadow-[0_0_18px_-2px_rgba(34,211,238,0.7)] sm:inline-block"
          >
            {site.cta.label}
          </Link>
          <ThemeToggle />
          <MobileNav nav={site.nav} cta={site.cta} />
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-[1200px] px-4 pb-20 pt-6 sm:px-6 sm:pt-8 md:px-10">
        {children}
      </main>

      <footer className="relative z-10 mt-12 border-t border-zinc-800/60 bg-ink/60 backdrop-blur-md">
        <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Brand site={site} size={26} />
              <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-zinc-400">{site.tagline}</p>
            </div>
            <nav aria-label={site.toolsHeading}>
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {site.toolsHeading}
              </h2>
              <ul className="mt-3 space-y-1">
                {site.nav.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className="inline-block py-1.5 text-sm text-zinc-400 transition-colors hover:text-accent"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Site">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Site</h2>
              <ul className="mt-3 space-y-1">
                {[
                  ["/about", "About"],
                  ["/privacy", "Privacy"],
                  ["/contact", "Contact"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href as string}
                      className="inline-block py-1.5 text-sm text-zinc-400 transition-colors hover:text-accent"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <p className="mt-10 border-t border-zinc-800/60 pt-6 font-mono text-xs text-zinc-500">
            © {new Date().getFullYear()} {site.name}.
          </p>
        </div>
      </footer>
    </>
  );
}
