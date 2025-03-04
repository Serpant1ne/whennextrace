/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        background: "#0a0a0a",
      },
      fontFamily: {
        sans: ["Exo-2", ...defaultTheme.fontFamily.sans],
        mono: ["JetBrainsMono", ...defaultTheme.fontFamily.mono],
      },
      keyframes: {
        fadeInFromTop: {
          from: { opacity: 0, transform: "translateY(-2px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        fadeOutToTop: {
          from: { opacity: 1, transform: "translateY(0)" },
          to: { opacity: 0, transform: "translateY(-2px)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        enterFromRight: {
          from: { opacity: 0, transform: "translateX(200px)" },
          to: { opacity: 1, transform: "translateX(0)" },
        },
        exitToRight: {
          from: { opacity: 1, transform: "translateX(0)" },
          to: { opacity: 0, transform: "translateX(200px)" },
        },
      },
      animation: {
        "fade-in-from-top": "fadeInFromTop 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-out-to-top": "fadeOutToTop 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fadeIn 200ms ease",
        "fade-out": "fadeOut 200ms ease",
        "enter-from-right": "enterFromRight 250ms ease",
        "exit-to-right": "exitToRight 250ms ease",
      },
    },
  },
  plugins: [],
};
