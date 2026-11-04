import Link from "next/link";
import type { ReactNode } from "react";
import type { SiteConfig } from "./config";

export function SiteShell({ site, children }: { site: SiteConfig; children: ReactNode }) {
  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link href="/" className="brand">
            {site.name}
          </Link>
          <nav aria-label="Main">
            {site.nav.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="wrap main">{children}</main>
      <footer className="site-footer">
        <div className="wrap footer-inner">
          <p>{site.tagline}</p>
          <nav aria-label="Footer">
            <Link href="/about">About</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <p className="muted">© {new Date().getFullYear()} {site.name}</p>
        </div>
      </footer>
    </>
  );
}
