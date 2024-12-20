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
      fontSize: {
        "footer-font": "0.9375rem",
      },
      colors: {
        // Light theme colors
        primary: "#4768fa",
        "primary-focus": "#153ff9",
        "primary-content": "#161827",

        secondary: "#7b92b2",
        "secondary-focus": "#5b769a",
        "secondary-content": "#161827",

        accent: "#67cba0",
        "accent-focus": "#41be88",
        "accent-content": "#161827",

        neutral: "#161827",
        "neutral-focus": "#06060a",
        "neutral-content": "#eaf0f6",

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

        // Dark theme colors - use dark class variants
        dark: {
          primary: "#ffffff",
          "primary-focus": "#ffffff",
          "primary-content": "#000000",

          secondary: "#ffffff",
          "secondary-focus": "#ffffff",
          "secondary-content": "#000000",

          accent: "#ffffff",
          "accent-focus": "#ffffff",
          "accent-content": "#000000",

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