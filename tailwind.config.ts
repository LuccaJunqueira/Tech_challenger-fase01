import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        accent: "hsl(var(--accent))",

        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      spacing: {
        'space-xs': 'var(--space-xs)',
        'space-sm': 'var(--space-sm)',
        'space-md': 'var(--space-md)',
        'space-lg': 'var(--space-lg)',
        'space-xl': 'var(--space-xl)',
        'space-2xl': 'var(--space-2xl)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
    },
  },
  plugins: [],
} satisfies Config;