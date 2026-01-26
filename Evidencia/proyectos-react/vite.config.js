import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Configurar base path para GitHub Pages
// Como se despliega en /proyectos/, usar rutas relativas
function getBasePath() {
  // En GitHub Actions, detectar si es sitio de usuario o proyecto
  if (process.env.GITHUB_REPOSITORY) {
    const [username, repoName] = process.env.GITHUB_REPOSITORY.split('/')
    
    // Si el repositorio es username.github.io, usar raíz
    // Si es un repositorio de proyecto, usar /repositorio/proyectos/
    if (repoName === `${username}.github.io`) {
      return '/proyectos/'
    }
    // Repositorio de proyecto - los archivos están en /repositorio/proyectos/
    return `/${repoName}/proyectos/`
  }
  // Para desarrollo local, usar el base path de producción para que coincida
  // Esto asegura que el dist funcione correctamente en GitHub Pages
  // En desarrollo local, usar el mismo base path que en producción
  return '/web-inmortal/proyectos/'
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
})
