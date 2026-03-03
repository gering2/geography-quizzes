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
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
}
