/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1400px",
    },
    fontFamily: {
      mono: [
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace",
      ],
      sans: [
        "Inter",
        '"Noto Sans JP"',
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    extend: {
      spacing: {
        sidebar: "18rem",
        toc: "15rem",
        header: "3.2rem",
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
