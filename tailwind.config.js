/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'home-banner': "url('./public/images/instructors.png')"
      },
      fontFamily: {
        nunito: ['Nunito'],
        bebas: ['Bebas Neue']
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake", "dark"],
  },
}

