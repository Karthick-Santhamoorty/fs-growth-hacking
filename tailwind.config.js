/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#60C0F6",
        secondary: '#FF480F',
        primaryBlue: "#213251",
        fsBlue:"#077fc0"
      }
    },
  },
  plugins: [],
}
