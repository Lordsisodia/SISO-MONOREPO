import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at bottom center, var(--tw-gradient-stops))",
      },
      colors: {
        siso: {
          black: "var(--siso-black)",
          orange: "rgb(var(--siso-orange-rgb) / <alpha-value>)",
          red: "rgb(var(--siso-red-rgb) / <alpha-value>)",
          // backgrounds
          "bg-primary": "rgb(var(--siso-bg-primary-rgb) / <alpha-value>)",
          "bg-secondary": "rgb(var(--siso-bg-secondary-rgb) / <alpha-value>)",
          "bg-tertiary": "rgb(var(--siso-bg-tertiary-rgb) / <alpha-value>)",
          "bg-hover": "rgb(var(--siso-bg-hover-rgb) / <alpha-value>)",
          "bg-active": "rgb(var(--siso-bg-active-rgb) / <alpha-value>)",
          // text
          "text-primary": "rgb(var(--siso-text-primary-rgb) / <alpha-value>)",
          "text-secondary": "rgb(var(--siso-text-secondary-rgb) / <alpha-value>)",
          "text-muted": "rgb(var(--siso-text-muted-rgb) / <alpha-value>)",
          "text-disabled": "rgb(var(--siso-text-disabled-rgb) / <alpha-value>)",
          // borders
          border: "rgb(var(--siso-border-primary-rgb) / <alpha-value>)",
          "border-secondary": "rgb(var(--siso-border-secondary-rgb) / <alpha-value>)",
          "border-hover": "rgb(var(--siso-border-hover-rgb) / <alpha-value>)",
          "border-active": "rgb(var(--siso-border-active-rgb) / <alpha-value>)",
          // status (solid colors; rarely need /opacity)
          success: "var(--siso-success)",
          warning: "var(--siso-warning)",
          error: "var(--siso-error)",
          info: "var(--siso-info)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "drawer-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "drawer-out": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "sheet-up": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "sheet-down": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(100%)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "var(--siso-glow-orange)" },
          "50%": { boxShadow: "var(--siso-glow-red)" },
        },
      },
      animation: {
        "drawer-in": "drawer-in 0.25s ease-out",
        "drawer-out": "drawer-out 0.25s ease-in",
        "sheet-up": "sheet-up 0.25s ease-out",
        "sheet-down": "sheet-down 0.25s ease-in",
        glow: "glow 3s ease-in-out infinite",
        "spin-slow": "spin 4s linear infinite",
      },
      boxShadow: {
        siso: "var(--siso-shadow-md)",
      },
    },
  },
  plugins: [],
};

export default config;
