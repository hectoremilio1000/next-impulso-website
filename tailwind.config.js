/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //If you're using the src/ directory
    "./src/**/*.{js,ts,jsx,tsx}",

    //If you're using the default paths:
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontSize: {
      h1: { fontWeight: "800", letterSpacing: "-0.02em" },
      h2: { fontWeight: "700", letterSpacing: "-0.01em" },
      p: { lineHeight: "1.7" },
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.463rem",
      "3xl": "1.553rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      colors: {
        principal: "#a78b21", // Reemplaza '#ffd700' con el código hexadecimal de tu color dorado
        secundario: "#b8a1482e", // Reemplaza '#ffd700' con el código hexadecimal de tu color dorado
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
