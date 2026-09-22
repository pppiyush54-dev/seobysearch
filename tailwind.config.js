/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,mdx}',
    './components/**/*.{js,jsx,ts,tsx,mdx}',
    './pages/**/*.{js,jsx,ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#08111F',
        'brand-blue': '#246BFE',
        purple: '#6C63FF',
        cyan: '#00B8D9',
        'off-white': '#F7F8FC',
        'light-grey': '#EEF0F6',
        'mid-grey': '#8A93A8',
        'dark-grey': '#3D4559',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        'xl2': '20px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(8,17,31,0.08)',
        'card-lg': '0 12px 48px rgba(8,17,31,0.14)',
      },
    },
  },
  plugins: [],
}
