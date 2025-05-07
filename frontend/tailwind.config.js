// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx,svg}",
//     "./public/index.html",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         // Primary colors
//         primary: {
//           DEFAULT: '#4F3C9E', // Deep indigo/purple for headings and key elements
//           light: '#7B6CB0',   // Lighter version for hover states
//           dark: '#3A2980',    // Darker version for active states
//         },
//         // Secondary colors - lighter purples
//         secondary: {
//           50: '#F5F3FA',  // Very light purple for subtle backgrounds
//           100: '#E6E1F0', // Light lavender for main background
//           200: '#D1C9E8', // Medium light for cards and containers
//           300: '#B7AADC', // Medium for borders and separators
//           400: '#9C8ACF', // Medium-dark for secondary elements
//         },
//         // Accent colors
//         accent: {
//           DEFAULT: '#FFD700', // Bright yellow for highlighted elements
//           hover: '#F2C94C',   // Slightly darker for hover states
//         },
//         // Neutral colors
//         neutral: {
//           navy: '#003366',    // Navy blue for contrast items like the cap
//           black: '#1A1A2E',   // Off-black for main text
//           white: '#FFFFFF',   // White for text on dark backgrounds
//         },
//         // Override some base Tailwind colors to match our theme
//         gray: {
//           50: '#F5F3FA',      // Replacing gray with purple-tinted versions
//           100: '#E6E1F0',
//           200: '#D1C9E8',
//           300: '#B7AADC',
//           400: '#9C8ACF',
//           500: '#7B6CB0',
//           600: '#6A5C9E',
//           700: '#4F3C9E',
//           800: '#3A2980',
//           900: '#2A1D66',
//         },
//         blue: {
//           500: '#4F3C9E',     // Replacing primary blue with our purple
//           600: '#4F3C9E',
//           700: '#3A2980',
//         },
//       },
//       // Wave pattern backgrounds - updated path
//       backgroundImage: {
//         // Changed to use a CSS gradient instead of an SVG file
//         'wave-pattern': "linear-gradient(45deg, #D1C9E8 25%, #B7AADC 25%, #B7AADC 50%, #D1C9E8 50%, #D1C9E8 75%, #B7AADC 75%, #B7AADC 100%)",
//       },
//       // Fonts
//       fontFamily: {
//         // Playful serif for headings
//         heading: ['Georgia', 'serif'],
//         // Clean sans-serif for body text
//         body: ['Inter', 'system-ui', 'sans-serif'], 
//       },
//       // Rounded design elements
//       borderRadius: {
//         'xl': '1rem',
//         '2xl': '1.5rem',
//         '3xl': '2rem',
//         'full': '9999px',
//       },
//     },
//   },
//   // Ensure the font family is applied to appropriate elements
//   plugins: [
//     function({ addBase, theme }) {
//       addBase({
//         'h1, h2, h3, h4, h5, h6': { 
//           fontFamily: theme('fontFamily.heading'),
//           color: theme('colors.primary.DEFAULT'),
//         },
//         'body': { 
//           fontFamily: theme('fontFamily.body'),
//           backgroundColor: theme('colors.secondary.100'),
//           color: theme('colors.neutral.black'),
//         },
//         'button': {
//           borderRadius: theme('borderRadius.full'),
//         }
//       })
//     },
//   ],
// };

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
        // Primary colors - from the crypto design
        primary: {
          DEFAULT: '#8B5CF6', // Bright medium purple for primary elements
          light: '#A78BFA',   // Lighter purple for hover states
          dark: '#6D28D9',    // Slightly darker purple for active states
        },
        // Secondary colors - softer purples
        secondary: {
          50: '#F8F5FF',  // Very light purple for subtle backgrounds
          100: '#EDE9FE', // Light lavender for backgrounds
          200: '#DDD6FE', // Medium light for cards
          300: '#C4B5FD', // Medium for borders
          400: '#A78BFA', // Medium-dark for accents
        },
        // Accent colors - Teal to break up the purple
        accent: {
          DEFAULT: '#2DD4BF', // Teal for buttons and highlights
          hover: '#2C9A94',   // Darker teal for hover states
          light: '#81E6D9',   // Lighter teal for subtle accents
        },
        // Neutral colors
        neutral: {
          navy: '#4C1D95',    // Deep purple/navy
          black: '#2E1065',   // Dark purple for text
          white: '#FFFFFF',   // Pure white for text on dark backgrounds
        },
        // Override some base Tailwind colors
        gray: {
          50: '#F8F5FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        blue: {
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        teal: {
          300: '#81E6D9',
          400: '#4FD1C5',
          500: '#38B2AC', // Our accent color
          600: '#2C9A94',
          700: '#285E61',
        },
      },
      backgroundImage: {
        'wave-pattern': "linear-gradient(45deg, #DDD6FE 25%, #C4B5FD 25%, #C4B5FD 50%, #DDD6FE 50%, #DDD6FE 75%, #C4B5FD 75%, #C4B5FD 100%)",
        'purple-gradient': "linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)",
      },
      // Fonts
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Mulish', 'system-ui', 'sans-serif'],
      },
      // Rounded design elements
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        'full': '9999px',
      },
      // Card shadows
      boxShadow: {
        'card': '0 10px 15px rgba(124, 58, 237, 0.1)',
        'card-hover': '0 15px 30px rgba(124, 58, 237, 0.15)',
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
        // Update buttons to use the teal accent color
        'button.btn-primary, .btn-primary': {
          backgroundColor: theme('colors.accent.DEFAULT'),
          color: theme('colors.neutral.white'),
          borderRadius: theme('borderRadius.full'),
          '&:hover': {
            backgroundColor: theme('colors.accent.hover'),
          }
        },
        // Keep some buttons purple with a teal accent class
        'button.btn-accent, .btn-accent': {
          backgroundColor: theme('colors.accent.DEFAULT'),
          color: theme('colors.neutral.white'),
          borderRadius: theme('borderRadius.full'),
          '&:hover': {
            backgroundColor: theme('colors.accent.hover'),
          }
        },
        'button.btn-outline, .btn-outline': {
          borderColor: theme('colors.accent.DEFAULT'),
          color: theme('colors.accent.DEFAULT'),
          backgroundColor: 'transparent',
          borderRadius: theme('borderRadius.full'),
          '&:hover': {
            backgroundColor: theme('colors.accent.DEFAULT'),
            color: theme('colors.neutral.white'),
          }
        },
        // Code styling with accent color for placeholders
        'code': {
          backgroundColor: theme('colors.secondary.200'),
          padding: '0.2rem 0.4rem',
          borderRadius: '0.25rem',
          fontSize: '0.875rem',
          fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
        },
        // Style for placeholder text in code blocks
        'code .placeholder, pre .placeholder, code .variable, pre .variable': {
          color: theme('colors.accent.DEFAULT'),
          fontStyle: 'italic',
        }
      })
    },
  ],
};