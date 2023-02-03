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
            animation: {
                wiggle: "wiggle 1s ease-in-out infinite",
                noop: "noop 1ms",
            },
            keyframes: {
                noop: {
                    "0%, 100%": { transform: "rotateZ(0deg)" },
                },
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
            },
        },
    },
    plugins: [require("@shrutibalasa/tailwind-grid-auto-fit")],
};
