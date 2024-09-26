const { nextui } = require("@nextui-org/react")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
      },
      fontFamily: {
        "sf-pro-display": ["SF Pro Display", "sans-serif"],
      },
      fontSize: {
        12: [
          "0.75rem",
          {
            lineHeight: "150%",
          },
        ],
        14: [
          "0.875rem",
          {
            lineHeight: "150%",
          },
        ],
        16: [
          "1rem",
          {
            lineHeight: "150%",
          },
        ],
        18: [
          "1.125rem",
          {
            lineHeight: "150%",
          },
        ],
        20: [
          "1.25rem",
          {
            lineHeight: "150%",
          },
        ],
        24: [
          "1.5rem",
          {
            lineHeight: "150%",
          },
        ],
        28: [
          "1.75rem",
          {
            lineHeight: "150%",
          },
        ],
        32: [
          "2rem",
          {
            lineHeight: "150%",
          },
        ],
        44: [
          "2.75rem",
          {
            lineHeight: "150%",
          },
        ],
      },
      fontWeight: {
        600: 600,
      },
      colors: {
        primary: {
          green: "#57803E",
          green_dark: "#D3F4BD",
          surface: "#91D366",
          subtle: "#E1F8D3",
          default: "#9FE870",
        },
        gray: {
          neutral: "#7B7B7B",
          10: "#F8F9FD",
          20: "#F0F2FA",
          30: "#DEE1EB",
          40: "#CCD1E0",
          50: "#9DA3B5",
          60: "#777E90",
          70: "#616879",
          80: "#505665",
          90: "#2C3038",
          100: "#1B1E25",
          767: "#767676",
          "dark-charcoal": "#2C2D2F",
          "dark-slate": "#3A3A3A",
          "light-blue": "#F2F4F7",
          pale: "#F4F4F4",
          "pale-blue": "#E4E7EC",
        },
        green: {
          lime: "#90B51B",
          "light-lime": "#9FE870",
          "448D14": "#448D14",
        },
        "light-blue": {
          10: "#DAFBF9",
          20: "#BEF5F2",
          40: "#5EC2D4",
          80: "#0285A3",
          90: "#25CCF5",
          "90-0": "#0A8DB7",
          "90-1": "#006A82",
        },
        neutral: {
          suface: "#F5F5F7",
          "suface-input": "#F7F7F7",
          error: "#E01600",
          "border-default": "#EFEFEF",
          "text-default": "#C7C8C6",
          title: "#31332E",
          body_dark: "#909298",
          body_light: "#6A6B71",
          action: "#312E33",
          "text-body": "#686A66",
        },
        highlight: {
          surface: "#E1F8D3",
          title: "#43612F",
          title_dark: "#B2ED8D",
        },
        black: {
          bg_card: "#232521",
        },
      },
      boxShadow: {
        1: "0px 18px 60px 0px rgba(7, 12, 52, 0.15)",
        2: "0px 0px 0px 0px rgba(95, 104, 123, 0.10), 0px 5px 10px 0px rgba(95, 104, 123, 0.09), 0px 19px 19px 0px rgba(95, 104, 123, 0.08), 0px 42px 25px 0px rgba(95, 104, 123, 0.05), 0px 74px 30px 0px rgba(95, 104, 123, 0.01), 0px 116px 32px 0px rgba(95, 104, 123, 0.00)",
        3: "0px 5px 11px 0px rgba(95, 104, 123, 0.12)",
        4: "0px 12px 25px 0px rgba(42, 80, 44, 0.25)",
      },
      animation: {
        "fade-text": "fadeOut 3s linear infinite",
      },
      keyframes: {
        fadeOut: {
          "0%": { color: "#3A3A3A" },
          "50%": { color: "#9FE870" },
          "100%": { color: "#9FE870" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            success: "#9FE870",
          },
        },
      },
    }),
  ],
}
