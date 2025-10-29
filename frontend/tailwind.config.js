/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#FFF4EC",
        nav: "#181716",
        accent: "#FF9900",
        price: "#28A745",
        panel: "#FFFFFF",
        available: "#34C759",
        badge: "#FF3366",
        hover: "#FFC300",
        text: "#656565",
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],

};
