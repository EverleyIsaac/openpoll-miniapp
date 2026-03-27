import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B1220',
        surface: '#131C2E',
        primary: '#2563EB',
        secondary: '#7C3AED',
        text: '#F8FAFC',
        muted: '#94A3B8',
        accent: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      borderRadius: {
        panel: '18px',
      },
      boxShadow: {
        soft: '0 14px 40px rgba(3, 8, 20, 0.28)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at top, rgba(37,99,235,0.16), transparent 34%), radial-gradient(circle at bottom right, rgba(124,58,237,0.12), transparent 28%)',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
