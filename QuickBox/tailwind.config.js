/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '100': '#212830',
        '200': '#263249',
        // Agrega más colores personalizados aquí si es necesario
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
