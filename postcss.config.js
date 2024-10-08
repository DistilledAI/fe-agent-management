export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.VITE_NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
}
