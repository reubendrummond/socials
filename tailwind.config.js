/** @type {import('tailwindcss').Config} */
const { fontFamily, spacing } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
// mouch yoinked from https://github.com/leerob/leerob.io/blob/main/tailwind.config.js

module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./layouts/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          light: "rgb(var(--primary-light) / <alpha-value>)",
          dark: "rgb(var(--primary-dark) / <alpha-value>)",
        },
        // gray: {
        //   0: "#fff",
        //   100: "#fafafa",
        //   200: "#eaeaea",
        //   300: "#999999",
        //   400: "#888888",
        //   500: "#666666",
        //   600: "#444444",
        //   700: "#333333",
        //   800: "#222222",
        //   900: "#111111",
        // },
      },
      fontFamily: {
        sans: ["Poppins"],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
            a: {
              color: theme("colors.indigo.500"),
              "&:hover": {
                color: theme("colors.indigo.700"),
              },
              code: { color: theme("colors.indigo.400") },
            },
            "h2,h3,h4": {
              "scroll-margin-top": spacing[32],
            },
            thead: {
              borderBottomColor: theme("colors.gray.200"),
            },
            code: { color: theme("colors.pink.500") },
            "blockquote p:first-of-type::before": false,
            "blockquote p:last-of-type::after": false,
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.200"),
            a: {
              color: theme("colors.indigo.400"),
              "&:hover": {
                color: theme("colors.indigo.600"),
              },
              code: { color: theme("colors.indigo.400") },
            },
            blockquote: {
              borderLeftColor: theme("colors.gray.700"),
              color: theme("colors.gray.300"),
            },
            "h2,h3,h4": {
              color: theme("colors.gray.100"),
              "scroll-margin-top": spacing[32],
            },
            hr: { borderColor: theme("colors.gray.700") },
            ol: {
              li: {
                "&:before": { color: theme("colors.gray.500") },
              },
            },
            ul: {
              li: {
                "&:before": { backgroundColor: theme("colors.gray.500") },
              },
            },
            strong: { color: theme("colors.gray.100") },
            thead: {
              th: {
                color: theme("colors.gray.100"),
              },
              borderBottomColor: theme("colors.gray.600"),
            },
            tbody: {
              tr: {
                borderBottomColor: theme("colors.gray.700"),
              },
            },
          },
        },
      }),
    },
    variants: {
      typography: ["dark"],
    },
  },
  plugins: [],
};
