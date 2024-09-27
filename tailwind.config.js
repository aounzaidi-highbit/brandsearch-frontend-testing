/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
    },
    extend: {
      screens: {
        xsm: { max: '639px' },
      },
      backgroundImage: {
        "footer-image": "url('/src/assets/images/bottom.png')",
        "contact-image": "url('/src/assets/images/contact-image.png')",
        "categories-image": "url('/src/assets/images/bg-categories.png')",
        "blogs-image": "url('/src/assets/images/bg-blog.png')",
        "blogs-card-image": "url('/src/assets/images/blog-card.png')",
        "hero-background": "url('/src/assets/images/bg-hero.png')",
        "shimmer": 'linear-gradient(90deg, #f3f3f3 25%, #ecebeb 50%, #f3f3f3 75%)',
      },
      boxShadow: {
        "box-shadow": "rgba(0, 0, 0, 0.07) 0px 0px 10px 3px",
        "light-shadow": "#EAF7FF 0px 0px 10px 3px",
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
        'shimmer-size': '200% 100%', // Ensure the shimmer gradient covers the element properly
      },
      borderColor: {
        "background": "linear-gradient(111.08deg, #F4293E 0.67%, #FF8B49 100%)",
      },
      // backgroundImage: {
      //   shimmer: 'linear-gradient(90deg, #f3f3f3 25%, #ecebeb 50%, #f3f3f3 75%)',
      // },
      borderGradient: {
        "border-gradient": "#287BB7",
      },
      colors: {
        autofill: 'white',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['autofill'],
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    function ({ addVariant }) {
      addVariant('autofill', '&:-webkit-autofill');
    }
  ],
};
