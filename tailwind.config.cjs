/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.{html,jsx,css}"],
    theme: {
        extend: {
            colors: {
                primary: colors.indigo,
            },
            screens: {
                xs: "270px",
                ss: "480px", // "sidebar shown" breakpoint
            },
        },
    },
    plugins: [require("@shrutibalasa/tailwind-grid-auto-fit")],
};
