const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["Manrope", ...fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: "#33D985",
          hover: "#21bf6f",
          light: "#a2f5b2",
        },
        background: {
          primary: "#050e1d",
          secondary: "#ffffff",
        },
        text: {
          primary: "#ffffff",
          secondary: "#050e1d",
        },
      },
      borderRadius: {
        default: "0.75rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
