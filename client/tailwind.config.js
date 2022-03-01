module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        appear: {
          "0%": { filter: "opacity(0)" },
          "100%": { filter: "opacity(100)" },
        },
      },
    },
  },
  plugins: [],
};
