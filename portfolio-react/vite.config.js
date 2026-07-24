import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Detectar el base path para GitHub Pages
function getBasePath() {
  // En GitHub Actions, detectar si es sitio de usuario o proyecto
  if (process.env.GITHUB_REPOSITORY) {
    const [username, repoName] = process.env.GITHUB_REPOSITORY.split('/')

    // Si el repositorio es username.github.io, usar raíz
    // Si es un repositorio de proyecto, usar /repositorio/
    if (repoName === `${username}.github.io`) {
      return '/'
    }
    // Repositorio de proyecto
    return `/${repoName}/`
  }
  // Para desarrollo local, usar raíz
  return '/'
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Extraer SOLAMENTE librerías puras que no dependen de React
            if (id.includes('node_modules/three/')) return 'vendor-three-core';
            if (id.includes('node_modules/gsap/')) return 'vendor-gsap';
            // Dejamos que Vite agrupe React y @react-three automáticamente para evitar errores de contexto
          }
        }
      }
    },
    // Opcional: Aumentar sutilmente el límite si algún chunk sigue siendo grande
    chunkSizeWarningLimit: 600
  }
})
