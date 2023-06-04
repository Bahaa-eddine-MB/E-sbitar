
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
        backgroundImage: {
         'hero-pattern': "url('/src/assets/Landing page/herooo.svg')",
         'footer-texture': "url('/src/assets/Landing page/footer.svg')",
        },
      borderRadius: {
        custom: "0.5rem",
      },
      colors: {
        primaryColor: "rgb(var(--color-primary) / <alpha-value>)", //blue
        secondaryColor: "rgb(var(--color-secondary) / <alpha-value>)", //dark blue
        thirdColor: "rgb(var(--color-third) / <alpha-value>)", //text grey
        bgColor: "rgb(var(--color-bg) / <alpha-value>)", // close to white
        secondBgColor: "rgb(var(--color-second-bg) / <alpha-value>)", //input bg
        grey: "rgb(var(--color-grey) / <alpha-value>)",
        white: "rgb(var(--color-white) / <alpha-value>)",
        mainRed: "#B80000",
        lightRed: "#FFDDDD",
        mainGreen: "#397B1A",
        lightGreen: "#DFFFE2",
        mainPending: "#B4B800",
        lightPending: "#F9FFD3",
        mainRecourse: "#B86300",
        lightRecourse: "#FFE6D3",
      },
      fontSize: {
        "fs-800": "2.438rem", //39px
        "fs-700": "1.875rem", //30px
        "fs-600": "1.562rem", //25px
        "fs-500": "1.250rem", //20px
        "fs-400": "1rem", //16px
        "fs-300": "0.875rem", //14px
        "fs-200": "0.75rem", //12px
      },
      fontFamily: {
        mainFont: ["Golos Text", "sans-serif"],
      },
      boxShadow: {
        custom: "0 0 4px 0 rgba(180, 180, 180, 0.25)",
      },
      padding: {
        layout: "30px",
      },
    },
  },

  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
