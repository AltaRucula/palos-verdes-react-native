import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    darkMode: 'selector', // Enable selector strategy for dark mode
    theme: {
        extend: {
            colors: {
                primary: {
                    light: colors.gray['100'],
                    dark: colors.gray['950'],
                },
                secondary: {
                    light: colors.gray['200'],
                    dark: colors.gray['900'],
                },
                tertiary: {
                    light: colors.gray['300'],
                    dark: colors.gray['700'],
                },
                highlight: {
                    light: colors.red['300'],
                    dark: colors.red['700'],
                    hover: {
                        light: colors.red['200'],
                        dark: colors.red['800'],
                    },
                },
                error: {
                    light: colors.red['500'],
                    dark: colors.red['300'],
                },
            },
        },
    },
    plugins: [],
};
