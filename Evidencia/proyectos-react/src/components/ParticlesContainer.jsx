import React, { useRef } from 'react';

/**
 * ParticlesContainer Component
 * Contenedor para partículas de microinteracción
 */
const ParticlesContainer = () => {
  const containerRef = useRef(null);

  return (
    <div
      className="particles-container"
      ref={containerRef}
      id="particlesContainer"
    />
  );
};

export default ParticlesContainer;
