/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,hbs}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark"],
  },
  plugins: [require("daisyui")],
}

