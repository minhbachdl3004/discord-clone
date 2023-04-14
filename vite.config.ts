import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
