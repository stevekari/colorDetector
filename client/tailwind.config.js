/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      colors: {
        industrial: {
          950: '#070b12',
          900: '#0b111c',
          850: '#101826',
          800: '#162235',
          700: '#1e2f47',
          600: '#2c4263',
          500: '#3e5c8a',
          400: '#5c80b5',
          gold: '#eab308',
          crimson: '#c82030',
          cyan: '#00acc1',
        }
      },
      boxShadow: {
        'bezel': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15), 0 10px 25px -5px rgba(0, 0, 0, 0.7)',
        'bezel-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)',
        'glow-green': '0 0 15px rgba(34, 197, 94, 0.4)',
        'glow-red': '0 0 15px rgba(239, 68, 68, 0.4)',
        'glow-blue': '0 0 15px rgba(59, 130, 246, 0.4)',
        'glow-yellow': '0 0 15px rgba(234, 179, 8, 0.4)',
      }
    },
  },
  plugins: [],
}
