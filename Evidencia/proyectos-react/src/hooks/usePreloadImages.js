import { useEffect } from 'react';
import { resolveImageUrl } from '../utils/resolveImageUrl';

/**
 * usePreloadImages Hook
 * Precarga imágenes de proyectos para mejor rendimiento
 */
export const usePreloadImages = (projects) => {
  useEffect(() => {
    const preloadImages = () => {
      projects.forEach((project) => {
        if (project.image) {
          const imageUrl = resolveImageUrl(project.image);
          if (imageUrl) {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onerror = () => {
              console.log(`No se pudo cargar la imagen: ${imageUrl}`);
            };
            img.src = imageUrl;
          }
        }
      });
    };

    // Precargar imágenes después de un pequeño delay
    const timeoutId = setTimeout(preloadImages, 1000);

    return () => clearTimeout(timeoutId);
  }, [projects]);
};
