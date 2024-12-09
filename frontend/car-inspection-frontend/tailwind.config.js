/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  // Active dark mode on class basis
  darkMode: "class",
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  purge: {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}",],
    safelist: [
      'text-red-500', 'text-yellow-500', 'text-blue-900', 'text-gray-500',
      'bg-red-500', 'bg-yellow-500', 'bg-blue-900', 'bg-gray-500',
    ],
    // These options are passed through directly to PurgeCSS
  },
  // content: ["./src/**/*.{html,js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        check: "url('/public/check.svg')",
        landscape: "url('/images/landscape/2.jpg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
      inset: ["checked"],
      zIndex: ["hover", "active"],
    },
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
  },
}

