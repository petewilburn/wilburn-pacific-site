import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  // critical: ensures assets are loaded from root
  base: "/", 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  // Tell Vite your source code lives in the 'client' folder
  root: path.resolve(__dirname, "client"),
  build: {
    // Output the build to a 'dist' folder in the project ROOT
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
});