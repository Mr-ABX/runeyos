/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        canvas: '#f8f9fa',
        runey: {
          sidebar: '#0a0a0c',
          card: '#ffffff',
          border: '#eaecf0',
          hover: '#f2f4f7',
          muted: '#667085',
          dark: '#101828',
          accent: '#10b981', // Runey green
          coral: '#f43f5e',
          blue: '#3b82f6',
          amber: '#f59e0b',
          purple: '#8b5cf6',
        }
      },
      boxShadow: {
        'runey-sm': '0 1px 2px rgba(16, 24, 40, 0.04)',
        'runey-card': '0 2px 8px -2px rgba(16, 24, 40, 0.04), 0 1px 4px -1px rgba(16, 24, 40, 0.02)',
        'runey-lg': '0 12px 32px -4px rgba(16, 24, 40, 0.08), 0 4px 12px -2px rgba(16, 24, 40, 0.03)',
        'pill': '0 4px 20px -2px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
