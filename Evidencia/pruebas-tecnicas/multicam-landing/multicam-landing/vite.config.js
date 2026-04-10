import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detectar el base path para GitHub Pages
function getBasePath() {
  if (process.env.GITHUB_REPOSITORY) {
    const [username, repoName] = process.env.GITHUB_REPOSITORY.split('/')
    if (repoName === `${username}.github.io`) {
      return '/'
    }
    // Como se despliega en una subcarpeta 'multicam' dentro del repo
    return `/${repoName}/multicam/`
  }
  return '/'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
})
