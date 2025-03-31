// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,svg}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        primary: {
          DEFAULT: '#4F3C9E', // Deep indigo/purple for headings and key elements
          light: '#7B6CB0',   // Lighter version for hover states
          dark: '#3A2980',    // Darker version for active states
        },
        // Secondary colors - lighter purples
        secondary: {
          50: '#F5F3FA',  // Very light purple for subtle backgrounds
          100: '#E6E1F0', // Light lavender for main background
          200: '#D1C9E8', // Medium light for cards and containers
          300: '#B7AADC', // Medium for borders and separators
          400: '#9C8ACF', // Medium-dark for secondary elements
        },
        // Accent colors
        accent: {
          DEFAULT: '#FFD700', // Bright yellow for highlighted elements
          hover: '#F2C94C',   // Slightly darker for hover states
        },
        // Neutral colors
        neutral: {
          navy: '#003366',    // Navy blue for contrast items like the cap
          black: '#1A1A2E',   // Off-black for main text
          white: '#FFFFFF',   // White for text on dark backgrounds
        },
        // Override some base Tailwind colors to match our theme
        gray: {
          50: '#F5F3FA',      // Replacing gray with purple-tinted versions
          100: '#E6E1F0',
          200: '#D1C9E8',
          300: '#B7AADC',
          400: '#9C8ACF',
          500: '#7B6CB0',
          600: '#6A5C9E',
          700: '#4F3C9E',
          800: '#3A2980',
          900: '#2A1D66',
        },
        blue: {
          500: '#4F3C9E',     // Replacing primary blue with our purple
          600: '#4F3C9E',
          700: '#3A2980',
        },
      },
      // Wave pattern backgrounds - updated path
      backgroundImage: {
        // Changed to use a CSS gradient instead of an SVG file
        'wave-pattern': "linear-gradient(45deg, #D1C9E8 25%, #B7AADC 25%, #B7AADC 50%, #D1C9E8 50%, #D1C9E8 75%, #B7AADC 75%, #B7AADC 100%)",
      },
      // Fonts
      fontFamily: {
        // Playful serif for headings
        heading: ['Georgia', 'serif'],
        // Clean sans-serif for body text
        body: ['Inter', 'system-ui', 'sans-serif'], 
      },
      // Rounded design elements
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'full': '9999px',
      },
    },
  },
  // Ensure the font family is applied to appropriate elements
  plugins: [
    function({ addBase, theme }) {
      addBase({
        'h1, h2, h3, h4, h5, h6': { 
          fontFamily: theme('fontFamily.heading'),
          color: theme('colors.primary.DEFAULT'),
        },
        'body': { 
          fontFamily: theme('fontFamily.body'),
          backgroundColor: theme('colors.secondary.100'),
          color: theme('colors.neutral.black'),
        },
        'button': {
          borderRadius: theme('borderRadius.full'),
        }
      })
    },
  ],
};