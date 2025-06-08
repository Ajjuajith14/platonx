/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        platinum: {
          DEFAULT: "#E5E7EB",
          light: "#F9FAFB",
          dark: "#D1D5DB",
        },
        charcoal: {
          DEFAULT: "#1E1E1E",
          light: "#2A2A2A",
        },
        graphite: {
          DEFAULT: "#595959",
          light: "#6B6B6B",
        },
        silver: {
          DEFAULT: "#A6A6A6",
          light: "#B8B8B8",
        },
        pearl: {
          DEFAULT: "#D0D0D0",
          light: "#DCDCDC",
        },
        ivory: {
          DEFAULT: "#F1EFEF",
          pure: "#FFFFFF",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
        normal: "-0.01em",
        wide: "0.02em",
      },
    },
  },
  plugins: [],
}