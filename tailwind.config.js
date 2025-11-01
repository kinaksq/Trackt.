/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Stitch Dashboard Theme - Sustainable Sage Palette
        primary: '#6EAD6E',
        secondary: '#2D5F3F',
        accent: '#E07856',
        income: '#4CAF50',
        expense: '#D84315',
        // Light Mode Palette
        'background-light': '#F7FBF7',
        'text-light': '#0D1F12',
        'text-secondary-light': 'rgba(13, 31, 18, 0.6)',
        'surface-linen': '#FAF7F0',
        'surface-light': '#FAF7F0',
        'light-surface-contrast': '#F5F0E5',
        'text-brown': '#3E2723',
        'text-muted': 'rgba(62, 39, 35, 0.6)',
        'text-brown-secondary': '#795548',
        'glass-bg-light': 'rgba(250, 247, 240, 0.5)',
        'glass-border-light': 'rgba(62, 39, 35, 0.1)',
        'border-light': '#E0D8CE',
        'surface-sage-light': '#E8F5E9',
        'border-forest-light': '#9CB8A5',
        'brand-sage': '#6EAD6E',
        'secondary-forest': '#2D5F3F',
        'accent-terracotta': '#E07856',
        'income-green': '#4CAF50',
        'expense-red': '#D84315',
        // Dark Mode Palette
        'background-dark': '#0D1F12',
        'dark-background': '#0D1F12',
        'dark-surface': '#1A2E1F',
        'dark-text-primary': '#E8F5E9',
        'dark-text-secondary': '#9CB8A5',
        'dark-border': '#2D5F3F',
        'surface-dark': '#1A2E1F',
        'text-dark': '#E8F5E9',
        'text-secondary-dark': 'rgba(232, 245, 233, 0.6)',
        'glass-bg-dark': 'rgba(26, 46, 31, 0.5)',
        'glass-border-dark': 'rgba(232, 245, 233, 0.1)',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        full: '9999px',
      },
      backdropBlur: {
        xl: '20px',
      },
      boxShadow: {
        'glass': '0 4px 6px -1px rgba(45, 95, 63, 0.1), 0 2px 4px -1px rgba(45, 95, 63, 0.06)',
        'glass-lg': '0 10px 15px -3px rgba(45, 95, 63, 0.1), 0 4px 6px -2px rgba(45, 95, 63, 0.05)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
