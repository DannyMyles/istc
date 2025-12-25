import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          DEFAULT: '#039AC5', // Your new accent color
          light: '#4AC1E8',
          dark: '#02749C',
          50: '#E6F7FC',
          100: '#CCEFF9',
          200: '#99DFF2',
          300: '#66CFEC',
          400: '#33BFE5',
          500: '#039AC5',
          600: '#037BA0',
          700: '#035C7A',
          800: '#023D55',
          900: '#011E2A',
          950: '#010F15',
        },
        secondary: {
          DEFAULT: '#059669',
          light: '#34d399',
          dark: '#065f46',
        },
        adventure: {
          sun: '#039AC5', // Updated
          forest: '#059669',
          river: '#039AC5', // Updated
          earth: '#92400e',
          sky: '#4AC1E8', // Updated
          fire: '#dc2626',
          grass: '#22c55e',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shine': 'shine 2s linear infinite',
        'flicker': 'flicker 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            opacity: '1',
            boxShadow: '0 0 5px rgba(3, 154, 197, 0.5)' // Updated
          },
          '50%': { 
            opacity: '0.8',
            boxShadow: '0 0 20px rgba(3, 154, 197, 0.8)' // Updated
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shine': {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'gradient-adventure': 'linear-gradient(135deg, #039AC5 0%, #4AC1E8 50%, #059669 100%)', // Updated
        'gradient-sunset': 'linear-gradient(to right, #039AC5, #02749C, #023D55)', // Updated
        'gradient-forest': 'linear-gradient(to bottom, #065f46, #059669, #34d399)',
        'gradient-sunrise': 'linear-gradient(to right, #039AC5, #4AC1E8, #99DFF2)', // Updated
      },
      boxShadow: {
        'adventure': '0 10px 30px -3px rgba(3, 154, 197, 0.3), 0 4px 6px -2px rgba(3, 154, 197, 0.1)', // Updated
        'adventure-lg': '0 20px 60px -10px rgba(3, 154, 197, 0.4), 0 10px 20px -5px rgba(3, 154, 197, 0.2)', // Updated
        'glow-accent': '0 0 20px rgba(3, 154, 197, 0.5)', // Updated
      },
    },
  },
  plugins: [],
}

export default config