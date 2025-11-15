import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at bottom center, var(--tw-gradient-stops))',
      },
      colors: {
        siso: {
          // Core colors
          black: "var(--siso-black)",
          orange: "rgb(var(--siso-orange-rgb) / <alpha-value>)",
          red: "rgb(var(--siso-red-rgb) / <alpha-value>)",
          
          // Backgrounds
          "bg-primary": "var(--siso-bg-primary)",
          "bg-secondary": "var(--siso-bg-secondary)", 
          "bg-tertiary": "var(--siso-bg-tertiary)",
          "bg-alt": "var(--siso-bg-secondary)", // Alias for bg-secondary
          bg: "var(--siso-bg-secondary)", // Legacy alias
          "bg-hover": "var(--siso-bg-hover)",
          "bg-active": "var(--siso-bg-active)",
          
          // Text
          "text-primary": "var(--siso-text-primary)",
          "text-secondary": "var(--siso-text-secondary)",
          "text-muted": "var(--siso-text-muted)",
          "text-disabled": "var(--siso-text-disabled)",
          "text-bold": "var(--siso-text-primary)", // Alias for text-primary
          text: "var(--siso-text-secondary)", // Legacy alias
          
          // Borders  
          border: "var(--siso-border-primary)",
          "border-hover": "var(--siso-border-secondary)",
          "border-active": "var(--siso-border-active)",
          
          // Status
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
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 15px rgba(255, 87, 34, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 25px rgba(255, 167, 38, 0.5)",
          },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "float-slower": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "loadingBar": {
          "0%": { width: "0%" },
          "50%": { width: "70%" },
          "70%": { width: "90%" },
          "100%": { width: "95%" }
        },
        "spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: "gradient var(--animation-duration, 8s) linear infinite",
        glow: "glow 3s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-slower": "float-slower 8s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "loadingBar": "loadingBar 2s ease-in-out infinite",
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
