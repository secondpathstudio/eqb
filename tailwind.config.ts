import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "eqb-card-bg": "#003049",
        "eqb-bg-dark": "#D62828",
        "eqb-bg-light": "#F77F00",
        "eqb-accent": "#FCBF49",
        "eqb-text": "#EAE2B7",
      }
    },
  },
  plugins: [],
} satisfies Config;
