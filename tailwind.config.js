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
      keyframes: {
        'chaos-opacity': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0.5 },
        },
        'chaos-rotate': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        wiggle: {
          'from': { transform: 'rotate(-3deg)' },
          'to': { transform: 'rotate(3deg)' },
        },
        // spin: {
        //   'from': { transform: 'rotate(0deg)', opacity: 1 },
        //   'to': { transform: 'rotate(0deg)', opacity: 0.5 }
        // }
        spin: {
          '0%, 100%': { transform: 'rotate(0deg)', opacity: 1 },
          '50%': { transform: 'rotate(0deg)', opacity: 0.0 }
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
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
