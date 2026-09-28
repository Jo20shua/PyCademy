/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx}",
    "./landing-page/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ['"Space Grotesk"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          bright: "var(--primary-bright)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        border: "var(--border)",
        "border-strong": "var(--border-strong)",
        surface: {
          subtle: "var(--surface-subtle)",
          raised: "var(--surface-raised)",
          hover: "var(--surface-hover)",
        },
        terminal: {
          DEFAULT: "var(--terminal)",
          foreground: "var(--terminal-foreground)",
        },
        ai: "var(--ai)",
        security: "var(--security)",
        data: "var(--data)",
        project: "var(--project)",
      },
    },
  },
  plugins: [],
};
