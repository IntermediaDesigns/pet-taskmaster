/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#06234a",
        secondary: "#e5bf22",
        accent: "#d5f0c1",
        muted: "#f9f7c9",
        ltgreen: "#a1f8c3",
        error: "var(--error)",
        success: "var(--success)",
        warning: "var(--warning)",

      },
      fontFamily: {
        Jura: ["Jura", "sans-serif"],
        Marhey: ["Marhey", "sans-serif"],
        Philosopher: ["Philosopher", "sans-serif"],
        QuattrocentoSans: ["Quattrocento Sans", "sans-serif"],
        Sansita: ["Sansita", "sans-serif"],
        TenorSans: ["Tenor Sans", "sans-serif"],
        VarelaRound: ["Varela Round", "sans-serif"],
      },
      backgroundImage: {
        button1: 'linear-gradient(to right, #f9f7c9, #e5bf22)',
        hover1: 'linear-gradient(to right, #a1f8c3, #46b9c5)',
        button2: 'linear-gradient(to right, #d5f0c1, #a1f8c3)',
      }
    },
  },
  plugins: [],
};

export default config;
