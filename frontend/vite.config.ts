import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // puedes cambiarlo si está ocupado
    open: true, // abre el navegador automáticamente
  },
});
