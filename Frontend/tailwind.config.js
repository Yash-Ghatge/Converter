/** @type {import('tailwindcss').Config} */
export const content = [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
    extend: {
        animation: {
            fadeIn: 'fadeIn 0.8s ease-in',
            slideIn: 'slideIn 0.6s ease-out',
        },
        keyframes: {
            fadeIn: {
                '0%': { opacity: 0 },
                '100%': { opacity: 1 }
            },
            slideIn: {
                '0%': { transform: 'translateY(-10px)', opacity: 0 },
                '100%': { transform: 'translateY(0)', opacity: 1 }
            }
        }
    },
};
export const plugins = [];
