import config from "./src/config/config";

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "380px",
        s: "410px",
      },
      colors: {
        progressBar: config.progressBarColor,
      },
    },
  },
  plugins: [],
};
