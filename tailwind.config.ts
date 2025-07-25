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
        
        // Professional Enterprise Color Utilities
        "professional-blue": "#2563eb",
        "professional-red": "#dc2626", 
        "professional-green": "#22c55e",
        "professional-amber": "#f59e0b",
        "navy-background": "#0f172a",
        "slate-card": "#1e293b",
        "slate-border": "#475569",
        "slate-muted": "#94a3b8",
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