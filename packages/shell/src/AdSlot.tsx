import { ADSENSE_CLIENT, ADS_PREVIEW } from "./config";

/**
 * Where an ad sits on a page. Keep placements few and well spaced:
 * - "after-tool": below a tool's result, with a large gap so it cannot be clicked by accident
 * - "mid-content": between the explanation and the FAQ
 * - "in-article" / "article-end": inside a guide
 * - "home-mid": on the home page, between sections
 * Never place an ad above the fold, in the header or footer, or inside a tool card.
 */
export type AdPlacement = "after-tool" | "mid-content" | "in-article" | "article-end" | "home-mid";

/** Reserved heights. They match the common responsive display sizes so a late-loading ad cannot shift the layout. */
const HEIGHT: Record<AdPlacement, number> = {
  "after-tool": 280,
  "mid-content": 250,
  "in-article": 280,
  "article-end": 250,
  "home-mid": 250,
};

/**
 * A labelled ad container with a reserved height.
 * - Before AdSense is configured it renders nothing, so pages carry no empty boxes.
 * - Build with NEXT_PUBLIC_ADS_PREVIEW=1 to draw dashed placeholders and review the layout.
 */
export function AdSlot({ slot, placement }: { slot: string; placement: AdPlacement }) {
  const height = HEIGHT[placement];

  if (ADS_PREVIEW) {
    return (
      <aside
        className="my-10 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/30 p-4 text-center"
        style={{ minHeight: height }}
        aria-hidden="true"
        data-ad-placement={placement}
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Advertisement</p>
        <p className="mt-2 font-mono text-xs text-zinc-500">
          Ad space: {placement} ({height}px reserved)
        </p>
      </aside>
    );
  }

  if (!ADSENSE_CLIENT || !slot) {
    return null;
  }
  return (
    <aside className="my-10" aria-label="Advertisement" data-ad-placement={placement}>
      <p className="mb-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        Advertisement
      </p>
      <div style={{ minHeight: height }}>
        <ins
          className="adsbygoogle"
          style={{ display: "block", minHeight: height }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
        <script dangerouslySetInnerHTML={{ __html: "(adsbygoogle=window.adsbygoogle||[]).push({});" }} />
      </div>
    </aside>
  );
}

export function AdSenseScript() {
  if (!ADSENSE_CLIENT) {
    return null;
  }
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
