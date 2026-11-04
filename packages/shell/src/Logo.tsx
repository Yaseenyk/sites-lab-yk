/** Brand mark: curly braces around a dot (code + a single stream of data). */
export function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="StreamerOS Dev Tools logo">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0891b2" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#lg)" />
      <g fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M25 15c-6 0-7 3-7 8v4c0 3-2 5-5 5 3 0 5 2 5 5v4c0 5 1 8 7 8" />
        <path d="M39 15c6 0 7 3 7 8v4c0 3 2 5 5 5-3 0-5 2-5 5v4c0 5-1 8-7 8" />
      </g>
      <circle cx="32" cy="32" r="3.6" fill="#fff" />
    </svg>
  );
}
