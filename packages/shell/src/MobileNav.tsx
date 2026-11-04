"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * The main menu for screens below `lg`, where the inline nav is hidden. It closes when the page changes and on Escape,
 * and the panel hangs from the sticky header so it always sits right under it.
 */
export function MobileNav({
  nav,
  cta,
}: {
  nav: { href: string; label: string }[];
  cta: { label: string; href: string };
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="grid h-11 w-11 place-items-center rounded-full border border-zinc-800 text-zinc-300 transition-colors hover:border-cyan/50 hover:text-accent"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="absolute inset-x-0 top-full border-b border-zinc-800/60 bg-ink/95 px-6 pb-5 pt-3 shadow-2xl backdrop-blur-md"
        >
          <ul className="grid gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="block rounded-xl px-3 py-3 text-base text-zinc-200 hover:bg-zinc-900 hover:text-accent"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={cta.href}
            className="mt-3 block rounded-full bg-cyan px-4 py-3 text-center text-base font-semibold text-on-accent"
          >
            {cta.label}
          </Link>
        </nav>
      )}
    </div>
  );
}
