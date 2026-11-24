import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        bengali: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
        heading: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
      },
      colors: {
        brand: {
          green: '#1E3A2B',
          darkGreen: '#14281E',
          emerald: '#2D6A4F',
          gold: '#F59E0B',
          amber: '#D97706',
          red: '#D32F2F',
          darkRed: '#B71C1C',
          navy: '#0F172A',
          blue: '#1E3A8A',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          text: '#1E293B',
          muted: '#64748B',
          border: '#E2E8F0',
        }
      }
    },
  },
  plugins: [
    typography,
  ],
};
