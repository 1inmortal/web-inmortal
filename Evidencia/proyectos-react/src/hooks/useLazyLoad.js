import { useEffect, useRef } from 'react';
import { resolveImageUrl } from '../utils/resolveImageUrl';

/**
 * useLazyLoad Hook
 * Maneja la carga perezosa de imágenes usando IntersectionObserver
 */
export const useLazyLoad = () => {
  const imageObserverRef = useRef(null);
  const loadedImagesRef = useRef(new Set());

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      // Fallback: cargar todas las imágenes
      loadAllImages();
      return;
    }

    // Observer para imágenes lazy
    imageObserverRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage(entry.target);
            imageObserverRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '200px',
        threshold: 0.01,
      }
    );

    // Observar todas las imágenes lazy al inicio
    observeImages();

    return () => {
      if (imageObserverRef.current) {
        imageObserverRef.current.disconnect();
      }
    };
  }, []);


  const loadImage = (element) => {
    const imageUrl = element.dataset?.lazyImage;
    if (!imageUrl || loadedImagesRef.current.has(imageUrl)) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const resolvedUrl = resolveImageUrl(imageUrl);
      if (element.style) {
        element.style.backgroundImage = `url(${resolvedUrl})`;
      }
      element.classList?.remove('lazy-load-placeholder');
      element.classList?.add('loaded');
      loadedImagesRef.current.add(imageUrl);
    };
    img.onerror = () => {
      console.log(`Error al cargar imagen: ${imageUrl}`);
      element.classList?.remove('lazy-load-placeholder');
    };
    img.src = resolveImageUrl(imageUrl);
  };

  const loadAllImages = () => {
    document.querySelectorAll('[data-lazy-image]').forEach((img) => {
      loadImage(img);
    });
  };

  const observeImages = () => {
    document.querySelectorAll('[data-lazy-image]').forEach((img) => {
      imageObserverRef.current?.observe(img);
    });
  };

  const updateObservers = () => {
    observeImages();
  };

  return {
    updateObservers,
  };
};
