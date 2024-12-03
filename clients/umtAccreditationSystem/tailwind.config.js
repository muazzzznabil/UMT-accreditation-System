/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";

export default {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Roboto", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [typography, daisyui],
  daisyui: {
    darkTheme: "light",
  },
};
