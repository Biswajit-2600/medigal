import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#64748B",
        success: "#10B981",
        warning: "#F97316", 
        info: "#3B82F6",
        purple: "#8B5CF6",
        "bg-light": "#F8FAFC",
        "bg-dark": "#18181B",
        "card-light": "#FFFFFF", 
        "card-dark": "#27272A",
        "txt-light": "#18181B",
        "txt-dark": "#F8FAFC",
        "muted-light": "#64748B",
        "muted-dark": "#94A3B8",
      },
      fontFamily: {
        display: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;