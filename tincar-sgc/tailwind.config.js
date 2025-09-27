// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tincar: {
          gold: "#FFB300",   // Amarillo dorado (principal)
          gray: "#2C2C2C",   // Gris oscuro (fondos neutros)
          black: "#1A1919",  // Negro profundo
          beige: "#FFEFCA",  // Beige claro
          orange: "#E88E2E", // Naranja acento
        },
      },
    },
  },
  plugins: [],
};
