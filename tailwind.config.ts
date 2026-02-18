import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "ui-sans-serif", "system-ui"],
      },
      colors: {
        banana: {
          100: "#FFF9C4",
          500: "#FFEB3B", // Main brand yellow
          600: "#FDD835",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "product-gradient": "var(--product-gradient, linear-gradient(to bottom, #fff, #f3f4f6))",
      },
    },
  },
  plugins: [],
};
export default config;
