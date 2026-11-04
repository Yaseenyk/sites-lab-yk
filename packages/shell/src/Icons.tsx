import type { ReactNode } from "react";

const base = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export type IconName =
  "braces" | "check" | "minify" | "lock" | "diff" | "table" | "zap" | "shield" | "user" | "arrow";

const paths: Record<IconName, ReactNode> = {
  braces: (
    <g transform="scale(0.375)" strokeWidth="4.8">
      <path d="M25 15c-6 0-7 3-7 8v4c0 3-2 5-5 5 3 0 5 2 5 5v4c0 5 1 8 7 8" />
      <path d="M39 15c6 0 7 3 7 8v4c0 3 2 5 5 5-3 0-5 2-5 5v4c0 5-1 8-7 8" />
    </g>
  ),
  check: <path d="M5 12.500l4.500 4.500L19 7.500" />,
  minify: <path d="M4 8h16M4 12h10M4 16h16" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </>
  ),
  diff: (
    <>
      <path d="M8 4v10M4 8l4-4 4 4" />
      <path d="M16 20V10M12 16l4 4 4-4" />
    </>
  ),
  table: (
    <>
      <rect x="3.500" y="5" width="17" height="14" rx="2" />
      <path d="M3.500 10h17M10 10v9" />
    </>
  ),
  zap: <path d="M13 3L5 13.500h6L10 21l8-10.500h-6L13 3z" />,
  shield: <path d="M12 3l7 3v5c0 4.500-3 8-7 10-4-2-7-5.500-7-10V6l7-3zM9 12l2 2 4-4" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.500-6 8-6s8 2 8 6" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
};

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return (
    <svg {...base} width={size} height={size}>
      {paths[name]}
    </svg>
  );
}
