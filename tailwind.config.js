/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B2545',
          'navy-deep': '#06172C',
          blue: '#1E4B82',
          'blue-hover': '#163B67',
          amber: '#F59E0B',
          'amber-hover': '#C2620A',
          ice: '#EEF3FA',
          page: '#FAFBFD',
          text: '#0F172A',
          muted: '#475569',
          subtle: '#64748B',
          border: '#E2E8F0',
          'border-navy': '#1B355A',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['Raleway', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(2.5rem, 6vw, 4.75rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-xl': ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.3', letterSpacing: '-0.015em' }],
        'label-kicker': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.14em' }],
      },
      borderRadius: {
        btn: '11px',
        panel: '16px',
        card: '12px',
      },
      boxShadow: {
        editorial: '0 1px 3px 0 rgba(11, 37, 69, 0.04), 0 1px 2px -1px rgba(11, 37, 69, 0.04)',
        panel: '0 8px 30px -4px rgba(11, 37, 69, 0.06), 0 2px 8px -2px rgba(11, 37, 69, 0.04)',
        modal: '0 25px 60px -12px rgba(11, 37, 69, 0.35)',
        'amber-glow': '0 8px 24px -4px rgba(245, 158, 11, 0.35)',
      },
      maxWidth: {
        reading: '720px',
      },
    },
  },
  plugins: [],
}
