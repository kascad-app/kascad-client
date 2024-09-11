/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "connexion-background":
          "url('/views/connexion/connexionBackground.png')",
        "footer-background": "url('/views/footer/footerBackground.png')",
      },
      colors: {
        "common-green": "#A0C446",
        "dark-green": "#1B4C4E",
        "dark-green-hover": "#0B2526",
        "blue-950": "#141D52",
        "blue-900": "#22348D",
        "blue-800": "2035B3",
        "blue-700": "243CDE",
        "blue-600": "#2B4AFB",
        "blue-500": "#4F77FF",
        "blue-400": "#709CFF",
        "blue-300": "#99C1FF",
        "blue-200": "#BFDAFF",
        "blue-100": "#DCECFF",
      },
      fontFamily: {
        michroma: ['"Michroma"', "sans-serif"],
        figtree: ['"Figtree"', "sans-serif"],
      },
      fontSize: {
        sm: "0.8rem",
        base: "24px",
        xl: "32px",
        "2xl": "40px",
      },
      spacing: {
        "50vw": "50vw",
      },
    },
  },
  plugins: [],
};
