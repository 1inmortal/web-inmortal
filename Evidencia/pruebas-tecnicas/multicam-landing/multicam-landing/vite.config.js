import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detectar el base path para GitHub Pages
function getBasePath() {
  if (process.env.GITHUB_REPOSITORY) {
    const [username, repoName] = process.env.GITHUB_REPOSITORY.split('/')
    if (repoName === `${username}.github.io`) {
      return '/'
    }
    return `/${repoName}/`
  }
  return '/'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
})
