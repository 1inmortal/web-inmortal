import { useRef } from 'react';

/**
 * useAnimation Hook
 * Maneja animaciones y efectos visuales
 */
export const useAnimation = () => {
  const particlesContainerRef = useRef(null);

  const createParticles = (event) => {
    if (!particlesContainerRef.current) {
      particlesContainerRef.current = document.getElementById(
        'particlesContainer'
      );
    }

    if (!particlesContainerRef.current) return;

    const container = particlesContainerRef.current;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Crear 5-8 partículas
    const particleCount = Math.floor(Math.random() * 4) + 5;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 30 + Math.random() * 50;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 100;

      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);

      container.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1000);
    }
  };

  return {
    createParticles,
  };
};
