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
      },
    },
  },
  plugins: [],
}

