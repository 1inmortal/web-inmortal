import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// Base path para GitHub Pages (ej: https://usuario.github.io/web-inmortal/mantenimiento/)
function getBasePath() {
  if (process.env.GITHUB_REPOSITORY) {
    const [username, repoName] = process.env.GITHUB_REPOSITORY.split('/');
    if (repoName === `${username}.github.io`) {
      return '/mantenimiento/';
    }
    return `/${repoName}/mantenimiento/`;
  }
  return '/web-inmortal/mantenimiento/';
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
});
