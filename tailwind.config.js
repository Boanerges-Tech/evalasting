/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          600: "#F15A24",
          700: "#D9480F",
        },
        ink: "#111827",
        muted: "#6b7280",
        line: "rgba(17,24,39,.10)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui"],
        display: ["Playfair Display", "serif"],
      },
      boxShadow: {
        soft: "0 18px 45px rgba(17,24,39,.08)",
        soft2: "0 10px 25px rgba(17,24,39,.06)",
      }
    },
  },
  plugins: [],
}