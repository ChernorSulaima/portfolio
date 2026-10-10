/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      // Design tokens live as CSS variables in src/index.css (light on :root, dark on .dark).
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        "line-2": "var(--line-2)",
        fg: "var(--fg)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-text": "var(--accent-text)",
        "accent-soft": "var(--accent-soft)",
        glass: "var(--glass)",
        danger: "var(--danger)",
      },
      borderColor: {
        DEFAULT: "var(--line)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
