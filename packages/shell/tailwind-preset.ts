import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const rgb = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

/** Shared Tailwind preset: theme-aware colors (see src/theme.css), fonts and the typography plugin. */
const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: {
        ink: rgb("--ink"),
        // Fixed bright fills (buttons, rings, borders). Text uses `accent`, which darkens in light mode.
        cyan: { DEFAULT: "#22D3EE", 400: "#22D3EE", 500: "#22D3EE", 900: "#164e63" },
        purple: { DEFAULT: "#A855F7", 400: "#A855F7", 500: "#A855F7" },
        accent: { DEFAULT: rgb("--accent"), 2: rgb("--accent-2") },
        "on-accent": rgb("--on-accent"),
        ok: rgb("--ok"),
        warn: rgb("--warn"),
        err: rgb("--err"),
        zinc: {
          50: rgb("--z-50"),
          100: rgb("--z-100"),
          200: rgb("--z-200"),
          300: rgb("--z-300"),
          400: rgb("--z-400"),
          500: rgb("--z-500"),
          600: rgb("--z-600"),
          700: rgb("--z-700"),
          800: rgb("--z-800"),
          900: rgb("--z-900"),
          950: rgb("--z-950"),
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [typography],
};

export default preset;
