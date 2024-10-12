/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],  // Add Poppins font
      },
      fontSize: {
        'hero-title': ['6rem', { lineHeight: '1.1' }],  // Custom font size for Hero title (6rem)
        'hero-subtitle': ['4rem', { lineHeight: '1.2' }],  // Custom font size for Hero subtitle (4rem)
        'lg-text': ['3rem', { lineHeight: '1.3' }],  // Another custom size for large text (3rem)
        'md-text': ['2rem', { lineHeight: '1.4' }],  // Custom font size for medium text (2rem)
        'sm-text': ['1.5rem', { lineHeight: '1.5' }],  // Custom font size for smaller text (1.5rem)
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
