/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-black': '#000000',
        'game-white': '#FFFFFF',
        'game-blue': '#00A3FF',
        'game-red': '#FF0000',
      },
      fontFamily: {
        'gaming': ['Orbitron', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-blue': 'pulseBlue 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-red': 'pulseRed 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseBlue: {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(0, 163, 255, 0.4)'
          },
          '50%': { 
            boxShadow: '0 0 0 15px rgba(0, 163, 255, 0)'
          },
        },
        pulseRed: {
          '0%, 100%': { 
            boxShadow: '0 0 0 0 rgba(255, 0, 0, 0.4)'
          },
          '50%': { 
            boxShadow: '0 0 0 15px rgba(255, 0, 0, 0)'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 