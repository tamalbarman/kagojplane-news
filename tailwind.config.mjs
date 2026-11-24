import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        bengali: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
        heading: ['"Hind Siliguri"', '"Noto Sans Bengali"', 'sans-serif'],
      },
      colors: {
        brand: {
          red: '#D32F2F',
          darkRed: '#B71C1C',
          navy: '#0F172A',
          blue: '#1E3A8A',
          gold: '#D97706',
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
