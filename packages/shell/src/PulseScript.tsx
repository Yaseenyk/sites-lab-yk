/**
 * First-party visit tracker (Cloudflare Worker "pulse"). Records page views, referrer, clicks, scroll and a
 * human-or-bot signal. No cookies, never reads typed text or input values, off on localhost and when Do Not Track
 * or Global Privacy Control is on. Must stay a plain script element: the script reads document.currentScript.
 */
export function PulseScript({ host }: { host: string }) {
  return <script defer src="https://pulse.yaseenyk.workers.dev/p.js" data-site={host} />;
}
