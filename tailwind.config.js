const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ["Manrope", ...fontFamily.sans],
      },
      screens: {
        xs: "520px",
      },
      colors: {
        "base-content-neutral": "hsl(var(--bc) / 0.6)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          primary: "#33D985",
          "primary-content": "#050e1d",
          secondary: "#FFFFFF",
          "secondary-content": "#050e1d",
          "base-100": "#050e1d",
          "base-200": "#162031",
          "base-300": "#6b7280",
          "base-content": "#FFFFFF",
          neutral: "#777777",
          "--btn-text-case": "none",
          "--rounded-btn": "0.75rem",
        },
      },
    ],
  },
};
