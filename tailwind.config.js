/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#60C0F6",
        secondary: '#fa3d70',
        primaryBlue: "#213251",
        fsBlue:"#077fc0",
        grayDeep:"#7E7E7E",
        textDisabled:"#eef2ff",
        bgDisabled:"#9ca3af",
        grayLight: "#E5E5E5",
        floralWhite: "#FFFAF3",
        aliceBlue: "#F5FBFF",
      }
    },
  },
  plugins: [],
}
