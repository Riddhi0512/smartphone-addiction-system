/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Cabinet Grotesk"', '"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        petal: {
          50: '#fdf8ff',
          100: '#f5ecff',
          200: '#ead9ff',
          300: '#d4b3ff',
          400: '#b880ff',
          500: '#9b4dff',
        },
        blush: {
          50: '#fff7f9',
          100: '#ffe8ee',
          200: '#ffccd8',
          300: '#ffa3b8',
          400: '#ff6b8a',
          500: '#ff3d6a',
        },
        sage: {
          50: '#f3fbf7',
          100: '#e0f5ea',
          200: '#bbebd3',
          300: '#86d9b0',
          400: '#4dc48a',
          500: '#27a86c',
        },
        sky: {
          50: '#f0f8ff',
          100: '#ddeeff',
          200: '#b8dcff',
          300: '#7fc2ff',
          400: '#3da3ff',
          500: '#0a85ff',
        },
        sand: {
          50: '#fffdf7',
          100: '#fff8e6',
          200: '#ffefc5',
          300: '#ffe09a',
          400: '#ffcc5c',
          500: '#ffb81c',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fadeIn 0.5s ease both',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'slide-right': 'slideRight 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.85)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
