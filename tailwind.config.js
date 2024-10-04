/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // container: {
    //   center: true,
    //   padding: {
    //     DEFAULT: "1rem",
    //     sm: "1rem",
    //     lg: "2rem",
    //     xl: "3rem",
    //     "2xl": "4rem",
    //   },
    // },
    extend: {
      screens: {
        xsm: { max: '639px' },
      },
      backgroundImage: {
        "footer-image": "url('/src/assets/images/bottom.png')",
        "blogs-card-image": "url('/src/assets/images/blog-card.png')",
        "hero-background": "url('/src/assets/images/bg-hero.png')",
        "shimmer": 'linear-gradient(90deg, #f3f3f3 25%, #ecebeb 50%, #f3f3f3 75%)',
      },
      boxShadow: {
        "box-shadow": "rgba(0, 0, 0, 0.07) 0px 0px 10px 3px",
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
      },
      animation: {
        grow: 'grow 0.3s ease-in-out forwards',
        shimmer: 'shimmer 1.5s infinite linear',
      },
      backgroundSize: {
        'shimmer-size': '200% 100%',
      },
      colors: {
        Primary: '#287BB7',
      },
      filter: {
        'Primary': 'invert(40%) sepia(95%) saturate(736%) hue-rotate(173deg) brightness(81%) contrast(81%)',
      },
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    require('tailwindcss-filters'),
  ],
}