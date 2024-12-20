import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      zIndex: {
        header: "50",
        drawer: "100",
        footer: "10",
        backToTop: "90",
      },
      fontFamily: {
        gothic: ['Zen Kaku Gothic New', 'Zen Kaku Gothic Antique', 'sans-serif'],
        mincho: ['Zen Old Mincho', 'serif'],
      },
      fontSize: {
        "footer-font": "0.9375rem",
      },
      colors: {
        primary: {
          DEFAULT: "#4768fa",
          focus: "#153ff9",
          content: "#161827",
        },
        secondary: {
          DEFAULT: "#7b92b2",
          focus: "#5b769a",
          content: "#161827",
        },
        accent: {
          DEFAULT: "#67cba0",
          focus: "#41be88",
          content: "#161827",
        },
        neutral: {
          DEFAULT: "#161827",
          focus: "#06060a",
          content: "#eaf0f6",
        },
        base: {
          100: "#ffffff",
          200: "#f7fafd",
          300: "#eaf0f6",
          content: "#161827",
        },
        info: "#1c92f2",
        success: "#009485",
        warning: "#ff9900",
        error: "#ff5724",
        dark: {
          primary: "#ffffff",
          focus: "#ffffff",
          content: "#000000",
          neutral: "#333333",
          "neutral-focus": "#4d4d4d",
          "neutral-content": "#ffffff",
          base: {
            100: "#000000",
            200: "#333333",
            300: "#4d4d4d",
            content: "#ffffff",
          },
          info: "#4A8FB1",
          success: "#4CAF50",
          warning: "#FFEB3B",
          error: "#F44336",
        },
      },
    },
  },
  plugins: [typography, daisyui],
  daisyui: {
    themes: false,
    base: false,
    styled: true,
    utils: true,
    prefix: "daisy-",
    logs: true,
    themeRoot: ":root",
  },
} satisfies Config;