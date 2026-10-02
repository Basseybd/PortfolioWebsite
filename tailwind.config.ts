import type { Config } from "tailwindcss";

// Palette sampled from the portrait: wall, night window, globe lamp.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F1E8DC",
        paper: "#F8F3EA",
        ink: "#1E1916",
        stone: "#695C51",
        rule: "#CDBFAE",
        charcoal: "#201B18",
        "charcoal-rule": "#3B332E",
        bone: "#F4EDE3",
        smoke: "#B3A797",
        ember: "#A9481C",
        "ember-light": "#E2834E",
      },
      fontFamily: {
        display: ["'Libre Caslon Display'", "Georgia", "serif"],
        serif: ["'Libre Caslon Text'", "Georgia", "serif"],
        mono: ["'Fragment Mono'", "ui-monospace", "monospace"],
      },
      maxWidth: { page: "84rem" },
    },
  },
  plugins: [],
};

export default config;
