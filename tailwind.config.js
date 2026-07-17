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
        beige: "var(--beige)",
        "beige-soft": "var(--beige-soft)",
        "beige-wash": "var(--beige-wash)",
        pos: "var(--pos)",
        "pos-wash": "var(--pos-wash)",
        neg: "var(--neg)",
      },
      fontFamily: {
        display: ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"General Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter: "-0.02em",
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "12px",
        xl: "12px",
      },
      maxWidth: {
        container: "1200px",
        prose: "40rem",
      },
    },
  },
  plugins: [],
};
