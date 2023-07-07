/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          lightest: "#8AB6D6",
          lighter: "#418FB9",
          DEFAULT: "#05233D",
          darker: "#031B29",
          darkest: "#010E15",
        },
        secondary: {
          lightest: "#FFE7AA",
          lighter: "#FFD166",
          DEFAULT: "#EF6F00",
          darker: "#BF5400",
          darkest: "#8F3F00",
        },
        light: {
          DEFAULT: "#FDFDFD",
          darker: "#F1F1F1",
        },
        black: {
          lighter: "#1C1C1C",
          DEFAULT: "#121212",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
