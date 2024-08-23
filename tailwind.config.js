/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: { max: "480px" },
      tablet: { max: "768px" },
    },
    extend: {
      spacing: {
        100: "25rem" /* 400px */,
        160: "40rem" /* 640px */,
        300: "75rem" /* 1200px */,
      },
      colors: {
        primary: "#007bff",
        "primary-hover": "#0056b3",
        navbar: "#333",
        background: "#f0f2f5",
        text: "#333",
        "text-alternative": "white",
      },
    },
  },
  plugins: [],
};
