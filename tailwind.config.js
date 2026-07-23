/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        peakDeep: '#0f172a', // deep blue/slate
        peakGreen: '#166534', // forest green
        peakRed: '#991b1b', // soft red
        peakWhite: '#f8fafc', // snow white
        peakDark: '#020617', // dark mode background
        // Editorial reference palette
        creamBg: '#F4F0E8',
        creamCanvas: '#FAF8F3',
        creamCard: '#EFEBE4',
        slateTeal: '#355264',
        neonLime: '#CCFF00',
        darkSlate: '#1C2933',
        creamBorder: '#E0D9CC',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Bebas Neue"', 'sans-serif'],
        condensed: ['"Bebas Neue"', 'sans-serif'],
        syne: ['"Syne"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}