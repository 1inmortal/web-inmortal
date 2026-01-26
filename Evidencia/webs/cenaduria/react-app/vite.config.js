import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
function getBasePath() {
  // En GitHub Actions, usar la variable de entorno
  if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    // Repositorio de proyecto - los archivos están en /repositorio/cenaduria/
    return `/${repoName}/cenaduria/`;
  }
  // Para desarrollo local, usar el base path de producción para que coincida
  // Esto asegura que el dist funcione correctamente en GitHub Pages
  return '/web-inmortal/cenaduria/';
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
