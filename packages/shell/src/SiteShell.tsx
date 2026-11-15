import Link from "next/link";
import type { ReactNode } from "react";
import type { NavLink, SiteConfig } from "./config";
import { HeaderNav } from "./HeaderNav";
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

const SITE_LINKS: NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

function FooterList({ heading, links }: { heading: string; links: NavLink[] }) {
  return (
    <nav aria-label={heading}>
      <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{heading}</h2>
      <ul className="mt-3 space-y-1">
        {links.map((n) => (
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
  );
}

export function SiteShell({ site, children }: { site: SiteConfig; children: ReactNode }) {
  const groups = site.nav.filter((n) => n.items?.length);
  const plain: NavLink[] = site.nav.flatMap((n) =>
    !n.items && n.href ? [{ href: n.href, label: n.label }] : [],
  );
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
          <HeaderNav nav={site.nav} />
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
          <div
            className={`grid gap-10 ${groups.length ? "lg:grid-cols-[1.2fr_3fr]" : "md:grid-cols-[1.4fr_1fr_1fr]"}`}
          >
            <div>
              <Brand site={site} size={26} />
              <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-zinc-400">{site.tagline}</p>
            </div>
            {groups.length ? (
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
                {groups.map((g) => (
                  <FooterList key={g.label} heading={g.label} links={g.items ?? []} />
                ))}
                <FooterList heading="Site" links={[...plain, ...SITE_LINKS]} />
              </div>
            ) : (
              <>
                <FooterList heading={site.toolsHeading} links={plain} />
                <FooterList heading="Site" links={SITE_LINKS} />
              </>
            )}
          </div>
          <p className="mt-10 border-t border-zinc-800/60 pt-6 font-mono text-xs text-zinc-500">
            © {new Date().getFullYear()} {site.name}.
          </p>
        </div>
      </footer>
    </>
  );
}
