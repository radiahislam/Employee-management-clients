/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  themes: [
    {
      light: {
        primary: "#570DF8",

        secondary: "#F000B8",

        accent: "#37CDBE",

        neutral: "#3D4451",

        "base-100": "#FFFFFF",

        info: "#3ABFF8",

        success: "#36D399",

        warning: "#FBBD23",

        error: "#F87272",
      },
      dark: {
        primary: "#7965F1",

        secondary: "#D926AA",

        accent: "#20BFA9",

        neutral: "#00142C",

        "base-100": "#092749",

        info: "#57B5FD",

        success: "#69E864",

        warning: "#FDB959",

        error: "#EE786C",
      },
    },
  ],
  plugins: [require("daisyui")],
};
