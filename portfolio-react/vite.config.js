import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Detectar el base path para GitHub Pages
function getBasePath() {
  // En GitHub Actions, usar el nombre del repositorio
  // GITHUB_REPOSITORY tiene formato: usuario/repositorio
  if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1]
    return `/${repoName}/`
  }
  // Para desarrollo local, usar raíz
  return '/'
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
})
