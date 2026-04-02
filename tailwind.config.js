/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta extraída de design_docs/paleta_colores.png + claude.md
        primary: '#D4F27A',       // Verde lima — CTA, acentos
        background: '#000000',    // Fondo de página (negro puro)
        surface: '#1A1A1A',       // Cards, inputs, navbar
        'surface-dark': '#111111', // Variante oscura de surface
        foreground: '#FFFFFF',    // Texto primario
        muted: '#94a3b8',         // Texto secundario (slate-400)
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
