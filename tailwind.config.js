/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      body: ['Source Sans Pro', 'sans-serif'],
      title: ['Oswald', 'serif'],
    },
    // extend: {
    //   typography: (theme) => ({
    //     dark: {
    //       css: {
    //         a: {
    //           color: theme('colors.blue.100'),
    //         },
    //       },
    //     },
    //     DEFAULT: {
    //       css: {
    //         a: {
    //           color: theme('colors.blue.700'),
    //           '&:hover': {
    //             color: '#2c5282',
    //           },
    //         },
    //       },
    //     },
    //   }),
    // },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
