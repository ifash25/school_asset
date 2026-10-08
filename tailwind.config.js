/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#003820',
        pcont: '#0f5132',
        terr: '#005049',
        second: '#904d00',
        scont: '#fe932c',
        err: '#ba1a1a',
        econt: '#ffdad6',
        bg: '#f9f9ff',
        low: '#f0f3ff',
        cont: '#e7eeff',
        high: '#dee8ff',
        mut: '#404942',
        out: '#707971',
      },
      fontFamily: { jakarta: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'] },
    },
  },
  plugins: [],
}
