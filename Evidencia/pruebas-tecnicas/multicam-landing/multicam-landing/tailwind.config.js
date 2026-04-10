/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#111111',
        primary: '#00f2ff', // Cyan
        secondary: '#f1104e', // Hot Pink
        text: '#f2f2f2'
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', 'monospace'],
        display: ['"Inter"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
