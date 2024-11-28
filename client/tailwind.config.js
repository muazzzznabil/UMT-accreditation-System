/** @type {import('tailwindcss').Config} */

// const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Roboto", "Arial", "sans-serif"], // Set Poppins as the default sans-serif font
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    darkTheme: "light",
  },
};
