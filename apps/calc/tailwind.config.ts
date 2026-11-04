import type { Config } from "tailwindcss";
import preset from "@sites/shell/tailwind-preset";

const config: Config = {
  presets: [preset as Config],
  content: ["./src/**/*.{ts,tsx}", "../../packages/shell/src/**/*.{ts,tsx}"],
};

export default config;
