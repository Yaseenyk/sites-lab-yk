"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavItem } from "./config";

const same = (a: string, b: string) => a.replace(/\/+$/, "") === b.replace(/\/+$/, "");

/**
 * The inline header menu for `lg` screens and up. A plain entry is a link; an entry with `items` is a button that
 * opens a small panel of links. One panel is open at a time; it closes on Escape, on a click elsewhere and when the
 * page changes. The entry for the page being viewed is marked, so a visitor who lands from search can see where they are.
 */
export function HeaderNav({ nav }: { nav: NavItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const pathname = usePathname() ?? "";
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) {
        setOpen(null);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const base = "whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors";
  const idle = "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100";
  const current = "bg-zinc-900 text-zinc-100";

  return (
    <nav ref={root} aria-label="Main" className="hidden items-center gap-1 lg:flex">
      {nav.map((n, i) => {
        if (!n.items) {
          const here = same(pathname, n.href ?? "");
          return (
            <Link
              key={n.label}
              href={n.href ?? "/"}
              aria-current={here ? "page" : undefined}
              className={`${base} ${here ? current : idle}`}
            >
              {n.label}
            </Link>
          );
        }
        const id = `nav-menu-${i}`;
        const isOpen = open === n.label;
        const holdsPage = n.items.some((x) => same(pathname, x.href));
        return (
          <div key={n.label} className="relative">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={id}
              onClick={() => setOpen(isOpen ? null : n.label)}
              className={`${base} inline-flex items-center gap-1 ${isOpen || holdsPage ? current : idle}`}
            >
              {n.label}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {isOpen && (
              <ul
                id={id}
                className="absolute left-0 top-full z-40 mt-2 min-w-[15rem] rounded-2xl border border-zinc-800 bg-ink p-2 shadow-2xl"
              >
                {n.items.map((x) => {
                  const here = same(pathname, x.href);
                  return (
                    <li key={x.href}>
                      <Link
                        href={x.href}
                        aria-current={here ? "page" : undefined}
                        className={`block rounded-xl px-3 py-2 text-sm transition-colors ${
                          here
                            ? "bg-zinc-900 text-accent"
                            : "text-zinc-300 hover:bg-zinc-900 hover:text-zinc-100"
                        }`}
                      >
                        {x.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </nav>
  );
}
