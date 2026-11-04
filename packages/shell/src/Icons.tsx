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
  | "percent"
  | "calendar"
  | "list"
  | "image"
  | "resize"
  | "swap"
  | "download"
  | "upload"
  | "braces"
  | "calc"
  | "clock"
  | "dollar"
  | "trend"
  | "check"
  | "minify"
  | "lock"
  | "diff"
  | "table"
  | "zap"
  | "shield"
  | "user"
  | "arrow";

const paths: Record<IconName, ReactNode> = {
  percent: (
    <>
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
      <path d="M18 5L6 19" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  list: <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />,
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 16l5-5 4 4 3-3 5 5" />
      <circle cx="16.5" cy="9" r="1.2" />
    </>
  ),
  resize: <path d="M4 14v6h6M20 10V4h-6M4 20l7-7M20 4l-7 7" />,
  swap: <path d="M4 8h13l-3-3M20 16H7l3 3" />,
  download: <path d="M12 4v11M7.5 11l4.5 4.5 4.5-4.5M5 20h14" />,
  upload: <path d="M12 16V5M7.5 9L12 4.500 16.500 9M5 20h14" />,
  calc: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M8.5 8h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  dollar: (
    <path d="M12 3.5v17M16.5 7.5c-.8-1.200-2.400-2-4.500-2-2.600 0-4.200 1.200-4.200 3 0 4.400 8.900 2 8.900 6.200 0 1.900-1.800 3.300-4.700 3.300-2.200 0-4-.9-4.800-2.400" />
  ),
  trend: <path d="M3.500 17l5.500-5.500 4 4 7.500-8M15.500 7.500h5v5" />,
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
