import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Boshqa kompyuter va telefonlardan (Local Network orqali) kirishga ruxsat
    port: 5173,
  },
})
