/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00f3ff',
        'neon-purple': '#b026ff',
        'dark-bg': '#030014',
      }
    },
  },
  plugins: [],
};
