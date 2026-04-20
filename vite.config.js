import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://localhost:7124",
        changeOrigin: true,
        secure: false,
      },
      "/hubs": {
        target: "https://localhost:7124",
        changeOrigin: true,
        secure: false,
        ws: true, // ← WebSocket 支援
      },
    },
  },
});
