/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1.75rem',
    },
    extend: {
      colors: {
        "brand-blue-light": "#0D96D5",

        'background': "#081028",
        "background-1": "#071329",
        "background-2": "#0A1B2E",

        'accent': "#5ae9ff",
        "accent-2": "#0876d6",
        "accent-3": "#A78BFA",

        primary: "#E6EDF8",
        secondary: "#94A3B8",
        // General Colors
        'general-primary': 'var(--general-primary)',
        'general-secondary': 'var(--general-secondary)',
        'general-background': 'var(--general-background)',
        'general-container': 'var(--general-container)',
        'general-highlight': 'var(--general-highlight)',
        'general-icon': 'var(--general-icon)',
        'general-label': 'var(--general-label)',
        'general-text': 'var(--general-text)',
        'general-link': 'var(--general-link)',
        'general-border': 'var(--general-border)',

        // Header Colors
        'header-primary': 'var(--header-primary)',
        'header-secondary': 'var(--header-secondary)',
        'header-text': 'var(--header-text)',
        'header-hover': 'var(--header-hover)',
        'header-decoration': 'var(--header-decoration)',

        // Footer Colors
        'footer-primary': 'var(--footer-primary)',
        'footer-secondary': 'var(--footer-secondary)',
        'footer-banner': 'var(--footer-banner)',
        'footer-text': 'var(--footer-text)',
        'footer-hover': 'var(--footer-hover)',
        'footer-decoration': 'var(--footer-decoration)',

        // Buttons Colors
        'button-primary-background': 'var(--button-primary-background)',
        'button-primary-color': 'var(--button-primary-color)',
        'button-primary-hoverbackground': 'var(--button-primary-hoverbackground)',
        'button-primary-hovercolor': 'var(--button-primary-hovercolor)',

        'button-secondary-background': 'var(--button-secondary-background)',
        'button-secondary-color': 'var(--button-secondary-color)',
        'button-secondary-hoverbackground': 'var(--button-secondary-hoverbackground)',
        'button-secondary-hovercolor': 'var(--button-secondary-hovercolor)',

        'button-selected-background': 'var(--button-selected-background)',
        'button-selected-color': 'var(--button-selected-color)',
        'button-selected-hoverbackground': 'var(--button-selected-hoverbackground)',
        'button-selected-hovercolor': 'var(--button-selected-hovercolor)',

        'button-unselected-background': 'var(--button-unselected-background)',
        'button-unselected-color': 'var(--button-unselected-color)',
        'button-unselected-hoverbackground': 'var(--button-unselected-hoverbackground)',
        'button-unselected-hovercolor': 'var(--button-unselected-hovercolor)',

        'button-shop-background': 'var(--button-shop-background)',
        'button-shop-color': 'var(--button-shop-color)',
        'button-shop-hoverbackground': 'var(--button-shop-hoverbackground)',
        'button-shop-hovercolor': 'var(--button-shop-hovercolor)',
      },
      maxHeight: {
        'xs': '20rem',
        'sm': '24rem',
        'md': '28rem',
        'lg': '32rem',
        'xl': '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
      },
    },
  },
  variants: {
    lineClamp: [
      'responsive',
      'hover'
    ],
    extend: { visibility: [ 'group-hover' ] }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({ strategy: "class" }),
    // require("@tailwindcss/line-clamp"),
  ],
}