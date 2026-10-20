/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        pine: { 950: '#04211f', 900: '#0a3431', 800: '#104742', 700: '#1a5e57', 100: '#dcebe8' },
        lake: { 50: '#eaf3fb', 100: '#cfe3f5', 600: '#2b6cb0', 700: '#235a93', 800: '#1c4876' },
        coral: { 50: '#fff1ec', 100: '#ffdfd3', 400: '#ff8a6b', 500: '#f2653f', 600: '#d44a26' },
        cream: '#f7f5ef',
      },
      fontFamily: {
        display: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pop: { '0%': { opacity: 0, transform: 'translateY(12px) scale(.98)' }, '100%': { opacity: 1, transform: 'none' } },
      },
      animation: { marquee: 'marquee 60s linear infinite', pop: 'pop .22s ease-out' },
    },
  },
  plugins: [],
};
