/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        tincar: {
          gold: "#D4AF37",       // dorado
          dark: "#0B1724",       // azul oscuro / negro
          blue: "#0B63A5"        // acento azul
        }
      },
      boxShadow: {
        "soft-md": "0 8px 24px rgba(11,23,36,0.12)"
      }
    },
  },
  plugins: [],
};
