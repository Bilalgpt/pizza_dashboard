/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // WhatsApp-inspired brand
        wa: {
          green: "#25D366",
          deep: "#075E54",
          teal: "#128C7E",
          mint: "#4ADE80",
        },
        // Validated chart categorical slots (dark-surface steps)
        series: {
          1: "#3987e5", // blue
          2: "#d95926", // orange
          3: "#199e70", // aqua
          4: "#c98500", // yellow
          5: "#d55181", // magenta
          6: "#008300", // green
          7: "#9085e9", // violet
          8: "#e66767", // red
        },
        ink: {
          primary: "#ffffff",
          secondary: "#c3c2b7",
          muted: "#898781",
        },
        surface: {
          base: "#0a0f0d",
          panel: "#0f1613",
          raised: "#141d19",
        },
      },
      fontFamily: {
        sans: ["var(--font-ui)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(37,211,102,0.18), 0 10px 40px -12px rgba(37,211,102,0.35)",
        card: "0 24px 60px -24px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "mesh": "radial-gradient(60% 70% at 15% 10%, rgba(37,211,102,0.18) 0%, transparent 60%), radial-gradient(50% 60% at 90% 0%, rgba(18,140,126,0.22) 0%, transparent 55%), radial-gradient(60% 80% at 80% 100%, rgba(74,222,128,0.10) 0%, transparent 60%)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.2s infinite",
      },
    },
  },
  plugins: [],
};
