/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.{html,jsx,css}"],
    theme: {
        extend: {
            colors: {
                primary: colors.indigo,
            },
        },
    },
    plugins: [],
};
