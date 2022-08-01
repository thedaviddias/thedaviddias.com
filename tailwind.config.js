/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      body: ['Source Sans Pro'],
      title: ['Oswald', 'serif'],
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.indigo.600'),
              '&:hover': {
                underline: 'none',
                color: theme('colors.indigo.800'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}
