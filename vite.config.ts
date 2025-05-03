import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // 👇 You can include this line if you want to be explicit, or omit it
  base: "/",
  build: {
    outDir: "docs", // GitHub Pages can serve from /docs folder
  }
}));
