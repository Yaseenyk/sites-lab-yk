"use client";

import { useEffect, useState } from "react";

const KEY = "theme";

/**
 * Runs in <head> before first paint, so a visitor who chose a theme never sees a flash of the other one.
 * With no saved choice the CSS follows the system setting (prefers-color-scheme).
 */
export function ThemeScript() {
  const code = `try{var t=localStorage.getItem("${KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

function currentTheme(): "light" | "dark" {
  const set = document.documentElement.getAttribute("data-theme");
  if (set === "light" || set === "dark") {
    return set;
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

/** Switches between light and dark and remembers the choice in this browser. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  function toggle() {
    const next = (theme ?? currentTheme()) === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // storage can be blocked; the choice then lasts for this page view only
    }
    setTheme(next);
  }

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === null ? "Switch color theme" : isDark ? "Switch to light mode" : "Switch to dark mode"
      }
      title={theme === null ? "Switch color theme" : isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-zinc-800 text-zinc-300 transition-colors hover:border-cyan/50 hover:text-accent sm:h-9 sm:w-9"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {isDark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        )}
      </svg>
    </button>
  );
}
