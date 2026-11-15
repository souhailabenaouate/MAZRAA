/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        sage: 'rgb(var(--sage) / <alpha-value>)',
        cream: 'rgb(var(--cream) / <alpha-value>)',
        brown: 'rgb(var(--brown) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        good: 'rgb(var(--good) / <alpha-value>)',
        warn: 'rgb(var(--warn) / <alpha-value>)',
        bad: 'rgb(var(--bad) / <alpha-value>)'
      },
      fontFamily: { sans: ['Nunito', 'Cairo', 'system-ui', 'sans-serif'] },
      borderRadius: { '2xl': '1.25rem', '3xl': '1.75rem' },
      boxShadow: { soft: '0 6px 24px -10px rgb(58 34 16 / 0.25)' }
    }
  },
  plugins: []
}
