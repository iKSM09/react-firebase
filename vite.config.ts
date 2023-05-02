import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // postcss: "./postcss.config.js",
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[local]__[hash:base64:2]",
    },
  },
});
