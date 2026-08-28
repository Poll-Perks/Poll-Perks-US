import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172136",
        paper: "#eceef1",
        raised: "#f7f8f9",
        line: "#d3d7de",
        maroon: {
          DEFAULT: "#8c2f39",
          deep: "#6f2029",
          light: "#e2818a",
          tint: "#f2dade",
        },
        amber: {
          bg: "#f0e6d0",
          text: "#8a6224",
        },
        good: {
          bg: "#dcebe1",
          text: "#2c6144",
        },
        bad: {
          bg: "#f0dad2",
          text: "#a5501f",
        },
      },
      fontFamily: {
        display: ["var(--font-caslon)", "Georgia", "serif"],
        sans: ["var(--font-plex-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
