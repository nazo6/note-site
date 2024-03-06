/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: require("./tailwind-screens"),
    fontFamily: {
      mono: ["BIZ UDGothic", "monospace"],
    },
    extend: {
      spacing: {
        sidebar: "18rem",
        toc: "15rem",
        header: "3.5rem",
        article: "70rem",
        main: "calc(100vh - 3.5rem)",
      },
      screens: {
        touch: {
          raw: "screen and (max-width: 640px) and (hover: none) and (pointer: coarse)",
        },
      },
    },
  },
  plugins: [],
};
