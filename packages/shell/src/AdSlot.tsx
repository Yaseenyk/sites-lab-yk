import { ADSENSE_CLIENT } from "./config";

/**
 * A fixed-height ad container. The height is reserved so a late-loading ad
 * cannot shift the layout (Core Web Vitals). Renders nothing until an AdSense
 * client id is configured, so pre-approval pages carry no ad markup at all.
 */
export function AdSlot({ slot, height = 280 }: { slot: string; height?: number }) {
  if (!ADSENSE_CLIENT || !slot) return null;
  return (
    <aside className="ad-slot" style={{ minHeight: height }} aria-label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: height }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script
        dangerouslySetInnerHTML={{ __html: "(adsbygoogle=window.adsbygoogle||[]).push({});" }}
      />
    </aside>
  );
}

export function AdSenseScript() {
  if (!ADSENSE_CLIENT) return null;
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
