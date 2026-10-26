/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#25BDF2",
          hover: "#1DA3D2",
          dark: "#0E84B0",
          light: "#E0F7FE",
        },
        navy: {
          950: "#041626",
          900: "#081E30",
          850: "#0C253B",
          800: "#102F4A",
          750: "#153B5C",
          700: "#1A466E",
        },
        surface: {
          DEFAULT: "#041626",
          dim: "#020D17",
          bright: "#102F4A",
          container: "#081E30",
          "container-low": "#0C253B",
          "container-lowest": "#041626",
          "container-high": "#102F4A",
          "container-highest": "#153B5C",
          variant: "#081E30"
        },
        outline: {
          DEFAULT: "#1E3A56",
          variant: "#152E46",
          light: "#3A6185"
        },
        ice: "#F0F9FF"
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        "headline-xl": ["Anton", "sans-serif"],
        "headline-lg": ["Anton", "sans-serif"],
        "headline-md": ["Anton", "sans-serif"],
        "headline-sm": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"]
      },
      spacing: {
        "space-xs": "4px",
        "space-sm": "8px",
        "space-md": "16px",
        "space-lg": "24px",
        "space-xl": "48px",
        "space-2xl": "80px",
        gutter: "24px",
        margin: "32px"
      }
    },
  },
  plugins: [],
}
