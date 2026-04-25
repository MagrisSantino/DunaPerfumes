import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // DUNA brand palette — warm sand, gold, deep espresso
        sand: {
          50: '#FBF7F0',
          100: '#F5EFE6',
          200: '#EFE7DC',
          300: '#E5D9C6',
          400: '#D4C4A8',
          500: '#BFA982',
          600: '#A08C64',
          700: '#7D6B4A',
          800: '#5A4D36',
          900: '#3B3224',
        },
        gold: {
          DEFAULT: '#B8935C',
          light: '#C9A877',
          dark: '#8B6F3E',
          darker: '#6B5530',
        },
        espresso: {
          DEFAULT: '#2D2521',
          light: '#4A3F37',
          lighter: '#6B5D4F',
        },
        cream: '#FBF7F0',
        ivory: '#F8F2E7',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      letterSpacing: {
        widest2: '0.24em',
        widest3: '0.32em',
      },
      boxShadow: {
        soft: '0 2px 20px -8px rgba(45, 37, 33, 0.08)',
        elegant: '0 10px 40px -20px rgba(45, 37, 33, 0.2)',
        gold: '0 4px 20px -8px rgba(184, 147, 92, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.7s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'gradient-sand': 'linear-gradient(135deg, #F5EFE6 0%, #E5D9C6 100%)',
        'gradient-gold': 'linear-gradient(135deg, #B8935C 0%, #8B6F3E 100%)',
        'gradient-ivory': 'linear-gradient(180deg, #FBF7F0 0%, #F5EFE6 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
