/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#545a7a',
        'secondary': '#30344a',
        'blue': '#3e4259'
      },
    },
  },
  plugins: [],
}