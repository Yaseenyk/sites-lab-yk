/**
 * Brand mark on the cyan-to-violet gradient tile. "braces" is the Dev Tools mark (code around a dot);
 * "calc" is the calculator mark (an equals sign with a plus, as on a calculator keypad).
 */
export function LogoMark({
  size = 32,
  mark = "braces",
  label = "StreamerOS logo",
}: {
  size?: number;
  mark?: "braces" | "calc";
  label?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label={label}>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0891b2" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#lg)" />
      {mark === "braces" ? (
        <>
          <g fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M25 15c-6 0-7 3-7 8v4c0 3-2 5-5 5 3 0 5 2 5 5v4c0 5 1 8 7 8" />
            <path d="M39 15c6 0 7 3 7 8v4c0 3 2 5 5 5-3 0-5 2-5 5v4c0 5-1 8-7 8" />
          </g>
          <circle cx="32" cy="32" r="3.6" fill="#fff" />
        </>
      ) : (
        <g fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round">
          <path d="M16 24h14M23 17v14" />
          <path d="M36 24h13" />
          <path d="M16 42h33M16 51h33" />
        </g>
      )}
    </svg>
  );
}
