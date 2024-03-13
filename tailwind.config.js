/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '0 2px 4px rgba(0, 0, 0, 0.2)',
      },
      colors: {
        'custom-blue': '#d6ebed',
        gray: {
          '125': '#f8f9fa',
          '150': '#eceef0',
          '175': '#e2e3e5',
        },
      },
      screens: {
        'mlg': '1050px'
      },
    },
  },
  plugins: [],
}

