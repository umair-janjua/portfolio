import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      keyframes: {
        "packet-trail": {
          "0%": { transform: "translateX(-120px)", opacity: "0" },
          "15%": { opacity: "0.75" },
          "85%": { opacity: "0.75" },
          "100%": { transform: "translateX(105vw)", opacity: "0" },
        },
        "constellation-pulse": {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.85)" },
          "50%": { opacity: "0.95", transform: "scale(1.35)" },
        },
        "float-dot": {
          "0%": { opacity: "0", transform: "translateY(0) scale(0.9)" },
          "15%": { opacity: "0.8" },
          "85%": { opacity: "0.55" },
          "100%": { opacity: "0", transform: "translateY(-110vh) scale(1.15)" },
        },
        "services-scanline": {
          "0%": { top: "-5%", opacity: "0" },
          "10%": { opacity: "0.85" },
          "90%": { opacity: "0.85" },
          "100%": { top: "105%", opacity: "0" },
        },
        "dot-blink": {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.25)" },
        },
      },
      animation: {
        "packet-trail": "packet-trail 11s linear infinite",
        "constellation-pulse": "constellation-pulse 4.5s ease-in-out infinite",
        "float-dot": "float-dot 11s linear infinite",
        "services-scanline": "services-scanline 12s linear infinite",
        "dot-blink": "dot-blink 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

