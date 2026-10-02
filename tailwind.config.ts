import type { Config } from "tailwindcss";

// Silver and chrome: a pale silver ground, graphite, brushed aluminum, and
// polished chrome details (see the .chrome utilities in globals.css). The
// photos are the only real color on the page.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ground: "#E3E4E2",
        paper: "#EFF0EE",
        ink: "#141516",
        stone: "#585B5E",
        rule: "#C5C7C8",
        graphite: "#17181A",
        "graphite-rule": "#34363A",
        rice: "#ECEDEB",
        silver: "#A7ABAF",
        "chrome-light": "#C9CDD1",
        alu: "#D4D7DA",
        steel: "#4A4D50",
      },
      fontFamily: {
        display: ["'Shippori Mincho'", "'Hiragino Mincho ProN'", "Georgia", "serif"],
        sans: ["'Zen Kaku Gothic New'", "system-ui", "sans-serif"],
        mono: ["'Fragment Mono'", "ui-monospace", "monospace"],
      },
      maxWidth: { page: "84rem" },
    },
  },
  plugins: [],
};

export default config;
