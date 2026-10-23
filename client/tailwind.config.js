/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy used for headings, buttons, hero cards and the footer.
        navy: {
          50: '#f4f7fc', 100: '#e6ecf7', 200: '#c9d5ec', 300: '#9fb2d9',
          500: '#2a56a8', 600: '#1b4290', 700: '#12337a', 800: '#0f2b69',
          900: '#0b2058', 950: '#08173f', ink: '#0e1b4d',
        },
        // Medical green used for accents, the CTA band and highlighted words.
        leaf: { 50: '#e9f6ee', 100: '#d3eddd', 300: '#7fd6a2', 400: '#3fbf73', 500: '#1fa75a', 600: '#15924d', 700: '#0f7a40' },
        mist: '#f3f6fb',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        pop: { '0%': { opacity: 0, transform: 'translateY(10px) scale(.985)' }, '100%': { opacity: 1, transform: 'none' } },
      },
      animation: { pop: 'pop .2s ease-out' },
    },
  },
  plugins: [],
};
