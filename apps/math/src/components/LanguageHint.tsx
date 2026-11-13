"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * A quiet "中文版" link for visitors whose BROWSER language is Chinese. It reads navigator.languages, which the visitor chose,
 * and never their IP address: no lookup, no third party, no personal data, and it works on a static site. It never redirects.
 * Search engines see both pages as separate URLs joined by hreflang, which is how Google asks for translated pages.
 */
export default function LanguageHint({ href, text, to }: { href: string; text: string; to: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
      setShow(langs.some((l) => l.toLowerCase().startsWith(to)));
    } catch {
      /* no navigator: show nothing */
    }
  }, [to]);
  if (!show) {
    return null;
  }
  return (
    <p className="mb-3 text-sm">
      <Link href={href} hrefLang={to === "zh" ? "zh-CN" : to} lang={to === "zh" ? "zh-CN" : to}>
        {text}
      </Link>
    </p>
  );
}
