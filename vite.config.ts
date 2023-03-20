import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "#assets": resolve(__dirname, "./src/assets/"),
      "#components": resolve(__dirname, "./src/components/"),
      "#routes": resolve(__dirname, "./src/routes/"),
      "#store": resolve(__dirname, "./src/store/"),
    },
  },
  plugins: [react()],
})
