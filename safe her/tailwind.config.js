/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        safety: {
          purple: {
            50: '#FEF2F2',  // Soft red cream
            100: '#FEE2E2', // Warm red highlight
            200: '#FECACA',
            300: '#FCA5A5',
            500: '#EF4444', // Vibrant Red
            600: '#DC2626', // Deep Red
            700: '#B91C1C', // Shakti Crimson
            800: '#991B1B', // Dark Crimson
            900: '#1E1B4B', // Peacock Indigo
          },
          pink: {
            50: '#FFF1F2',  // Warm rose cream
            100: '#FFE4E6',
            200: '#FECDD3',
            500: '#FF1493', // Vibrant Gulabi Pink
            600: '#DB2777', // Deep Gulabi
            700: '#9D174D', // Plum Crimson
          },
          red: {
            DEFAULT: '#DC2626',
            hover: '#B91C1C',
            ring: '#FCA5A5',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
}
