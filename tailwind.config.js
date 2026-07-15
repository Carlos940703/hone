/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--hairline)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        "accent-press": "var(--accent-press)",
        "accent-wash": "var(--accent-wash)",
        pos: "var(--pos)",
        "pos-wash": "var(--pos-wash)",
        neg: "var(--neg)",
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        sans: ['"General Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter: "-0.02em",
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "14px",
        xl: "18px",
      },
      maxWidth: {
        container: "1140px",
        prose: "42rem",
      },
    },
  },
  plugins: [],
};
