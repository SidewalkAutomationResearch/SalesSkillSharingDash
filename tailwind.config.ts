import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sales Dashboard Theme - Gray, Green, Yellow
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))", // Emerald Green
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Light Muted
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // Medium Gray
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Golden Yellow
          foreground: "hsl(var(--accent-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))", // Emerald Green
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))", // Golden Yellow
          foreground: "hsl(var(--warning-foreground))",
        },
        "deep-green": {
          DEFAULT: "hsl(var(--deep-green))", // Deep Green for buttons
          foreground: "hsl(var(--deep-green-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        
        // GitHub-inspired chart colors
        "github-green": "#238636",
        "github-blue": "#58a6ff", 
        "github-purple": "#8b5cf6",
        "github-orange": "#fb8500",
        "github-red": "#f85149",
        
        // Professional accent colors for creative touches
        "accent-blue": "#1e40af", // Deep professional blue
        "accent-blue-light": "#3b82f6", // Lighter blue for highlights
        "accent-red": "#dc2626", // Professional red
        "accent-red-light": "#ef4444", // Lighter red for alerts
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config;