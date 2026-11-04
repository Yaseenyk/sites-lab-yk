import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

// Tokens mirror the streamerOS portfolio (Signal Kit) so the sites read as one family.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "../../packages/shell/src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#05070A",
        cyan: { DEFAULT: "#22D3EE", 400: "#22D3EE", 500: "#22D3EE", 900: "#164e63" },
        purple: { DEFAULT: "#A855F7", 400: "#A855F7", 500: "#A855F7" },
        ice: { DEFAULT: "#67E8F9", 400: "#67E8F9", 500: "#67E8F9" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      keyframes: {
        gradient: { to: { backgroundPosition: "200% center" } },
      },
      animation: { gradient: "gradient 4s linear infinite" },
    },
  },
  plugins: [typography],
};

export default config;
