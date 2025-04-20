/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#030014",
        secondary: "#151312",
        light: {
          100: '#d6c6ff',
          200: '#b9a8ff',
          300: '#9c90ff',
        },
        dark: {
          100: '#221f3d',
          200: '#0f0d23',
          300: '#0a0806',
        }
      },
    },
  },
  plugins: [],
}

