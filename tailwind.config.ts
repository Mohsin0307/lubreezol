import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          navy: "#2A3391",
          "navy-dark": "#1F2670",
          gold: "#FBC72E",
          "gold-dark": "#E8B31C",
          ink: "#1C1C1C",
          bg: "#FAFAF8",
          muted: "#4A4A55",
          subtle: "#8A8A94",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "brand-gold": "0 10px 30px -8px rgb(251 199 46 / 0.45)",
        card: "0 4px 20px -4px rgb(28 28 28 / 0.06)",
      },
      maxWidth: {
        container: "80rem",
      },
    },
  },
  plugins: [],
};

export default config;