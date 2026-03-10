/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        authority: ['"IBM Plex Serif"', '"Palatino Linotype"', 'Georgia', 'serif'],
        interface: ['"IBM Plex Sans"', '"Segoe UI"', '"Helvetica Neue"', 'sans-serif'],
      },
      colors: {
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
        metis: {
          midnight: 'hsl(var(--metis-midnight))',
          ink: 'hsl(var(--metis-ink))',
          gold: 'hsl(var(--metis-gold))',
          goldSoft: 'hsl(var(--metis-gold-soft))',
          cyan: 'hsl(var(--metis-cyan))',
          orange: 'hsl(var(--metis-orange))',
          lime: 'hsl(var(--metis-lime))',
          rose: 'hsl(var(--metis-rose))',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        panel: '0 6px 20px rgba(0, 0, 0, 0.35)',
        hover: '0 8px 26px rgba(0, 0, 0, 0.45)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.04)',
      },
      backgroundImage: {
        'metis-grid': 'linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
