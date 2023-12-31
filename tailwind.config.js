/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["caprasimoregular", ...defaultTheme.fontFamily.serif]
      },
      keyframes: {
        fadeout: {
          "0%": { opacity: 0.6 },
          "50%": { opacity: 0.2 },
          "100%": { opacity: 0 }
        },
        fadein: {
          "0%": { opacity: 0.2 },
          "50%": { opacity: 0.6 },
          "100%": { opacity: 1 }
        },
        dance: {
          "0%": { transform: "rotate(-10deg) scale(1.1)" },
          "50%": { transform: "rotate(0deg) scale(1)" },
          "100%": { transform: "rotate(10deg) scale(1.1)" }
        }
      },
      animation: {
        show: "fadein .5s ease-in-out forwards",
        hide: "fadeout .5s ease-in-out forwards",
        dance: "dance 1.5s ease-in-out infinite alternate"
      }
    }
  },
  plugins: []
}
