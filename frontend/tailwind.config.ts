import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-green": {
          50: "#EAF3ED",
          100: "#C9E2D2",
          200: "#9CC9AB",
          300: "#6DAB6C",
          400: "#3F8851",
          500: "#296F3B",
          600: "#1B5C2D",
          700: "#0B4D25",
          800: "#07381A",
          900: "#03200E",
        },
        "accent-orange": {
          50: "#FDF0EB",
          100: "#FADAD0",
          200: "#F5B09A",
          300: "#F18563",
          400: "#EE6A3B",
          500: "#F15A24",
          600: "#CE4312",
          700: "#A2310B",
          800: "#762105",
          900: "#4B1201",
        },
        "neutral-purple": {
          50: "#F8F7FA",
          100: "#F0EEF4",
          200: "#E2DFEA",
          300: "#C7C1D7",
          400: "#ABA0C0",
          500: "#887FA6",
          600: "#685E8A",
          700: "#484368",
          800: "#2F2A43",
          900: "#161321",
        },
        status: {
          success: {
            bg: "#EAF3ED",
            text: "#0B4D25",
          },
          warning: {
            bg: "#FDF5E6",
            text: "#7A4D05",
          },
          error: {
            bg: "#FDF0ED",
            text: "#7A1C18",
          },
          info: {
            bg: "#EEF4F8",
            text: "#0B4D25",
          },
        },
      },
      fontFamily: {
        sans: [
          "var(--font-google-sans)",
          "Google Sans",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;

