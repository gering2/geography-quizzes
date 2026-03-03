module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  variants: {
    extend: {
      opacity:['disabled'],
      backgroundColor:['disabled']
    }
  },
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
