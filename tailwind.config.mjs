/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#E1EBEF",
                    100: "#D4DEE7",
                    200: "#B7C7D7",
                    300: "#99B0C7",
                    400: "#7C99B6",
                    500: "#5E82A6",
                    600: "#4C6B8A",
                    700: "#3C546C",
                    800: "#2C3D4F",
                    900: "#1B2631",
                    950: "#141C24",
                },
                accent: {
                    50: "#FAF5F0",
                    100: "#F4ECE1",
                    200: "#E8D6BF",
                    300: "#DDC2A2",
                    400: "#D2AF84",
                    500: "#C69963",
                    600: "#B78343",
                    700: "#926835",
                    800: "#6C4D28",
                    900: "#4B351B",
                    950: "#382814",
                },
            },
            height: {
                "13": "3.25rem",
                "15": "3.75rem",
                "17": "4.25rem",
                "18": "4.5rem",
                "19": "4.75rem",
            },
            width: {
                "21": "5.25rem",
                "22": "5.5rem",
                "23": "5.75rem",
                "25": "6.25rem",
                "26": "6.5rem",
                "27": "6.75rem",
                "29": "7.25rem",
                "30": "7.5rem",
                "3/2": "150%",
            },
        },
    },
    plugins: [],
};