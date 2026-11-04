"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="py-20">
      <p className="eyebrow mb-3">Something went wrong</p>
      <h1 className="page-h1">This page hit an error</h1>
      <p className="lede">Nothing you entered was sent anywhere. Try again, or head back to the tools.</p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn">
          Try again
        </button>
        <a href="/" className="btn ghost">
          All tools
        </a>
      </div>
    </div>
  );
}
