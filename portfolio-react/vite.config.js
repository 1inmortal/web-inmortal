import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración para GitHub Pages
  // Si el repositorio no está en la raíz, descomenta y ajusta el base:
  // base: process.env.NODE_ENV === 'production' ? '/web-inmortal/' : '/',
  base: '/',
})
