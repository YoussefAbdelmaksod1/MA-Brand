/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        'game-black': '#000000',
        'game-white': '#ffffff',
        'game-blue': '#00a3ff',
        'game-red': '#ff0000',
        'game-gold': '#ffd700',
      },
      fontFamily: {
        'gaming': ['Orbitron', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { filter: 'brightness(100%) blur(0)' },
          '50%': { filter: 'brightness(150%) blur(3px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      scale: {
        '98': '.98',
      },
      boxShadow: {
        'game': '0 0 15px rgba(0,163,255,0.5)',
        'game-hover': '0 0 30px rgba(0,163,255,0.8)',
        'game-red': '0 0 15px rgba(255,0,0,0.5)',
        'game-red-hover': '0 0 30px rgba(255,0,0,0.8)',
      },
    },
  },
  plugins: [],
} 