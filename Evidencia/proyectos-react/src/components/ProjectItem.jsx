import React, { useState, useEffect, useRef } from 'react';
import { scrambleText } from '../utils/scrambleText';
import { resolveImageUrl } from '../utils/resolveImageUrl';

/**
 * ProjectItem Component
 * Item individual de proyecto con animaciones y efectos hover
 */
const ProjectItem = ({
  project,
  index,
  isActive,
  viewMode,
  onHover,
  onLeave,
  onClick,
  createParticles,
  playHoverSound,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const itemRef = useRef(null);
  const previewRef = useRef(null);
  const textElementsRef = useRef([]);
  const scrambleIntervalsRef = useRef(new Map());
  const originalTextsRef = useRef([]);

  useEffect(() => {
    // Guardar textos originales
    if (itemRef.current) {
      const textElements = itemRef.current.querySelectorAll('.hover-text');
      textElementsRef.current = Array.from(textElements);
      originalTextsRef.current = textElementsRef.current.map((el) => el.textContent);
    }
  }, []);

  useEffect(() => {
    // Lazy load de imagen
    if (project.image && previewRef.current) {
      const imageUrl = resolveImageUrl(project.image);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        setImageLoaded(true);
        if (previewRef.current) {
          previewRef.current.style.backgroundImage = `url(${imageUrl})`;
          previewRef.current.classList.remove('lazy-load-placeholder');
        }
      };
      img.onerror = () => {
        console.log(`No se pudo cargar la imagen: ${imageUrl}`);
        if (previewRef.current) {
          previewRef.current.classList.remove('lazy-load-placeholder');
        }
      };
      img.src = imageUrl;
    }
  }, [project.image]);

  const handleMouseEnter = (e) => {
    onHover();
    if (createParticles) {
      createParticles(e);
    }
    
    // Reproducir sonido
    if (playHoverSound && project.sound) {
      playHoverSound(project.sound);
    }

    // Aplicar efecto scramble a los textos
    textElementsRef.current.forEach((element, i) => {
      // Limpiar intervalos anteriores
      if (scrambleIntervalsRef.current.has(element)) {
        clearInterval(scrambleIntervalsRef.current.get(element));
      }
      
      // Aplicar efecto de desorden
      const interval = scrambleText(element, originalTextsRef.current[i], 800);
      scrambleIntervalsRef.current.set(element, interval);
    });
  };

  const handleMouseLeave = () => {
    // Limpiar intervalos de scramble
    textElementsRef.current.forEach((element, i) => {
      if (scrambleIntervalsRef.current.has(element)) {
        clearInterval(scrambleIntervalsRef.current.get(element));
        scrambleIntervalsRef.current.delete(element);
      }
      // Restaurar texto original
      element.textContent = originalTextsRef.current[i];
    });
    
    onLeave();
  };

  const handleClick = () => {
    // Reproducir sonido de clic
    if (playHoverSound && project.sound) {
      playHoverSound(project.sound);
    }
    
    onClick();
  };

  return (
    <li
      ref={itemRef}
      className={`project-item ${isActive ? 'active' : ''} ${
        project.categoryFilter === 'threejs' ? 'threejs-project' : ''
      }`}
      data-image={project.image}
      data-sound={project.sound}
      data-link={project.link}
      data-category={project.categoryFilter}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${project.artist} - ${project.album}`}
    >
      {viewMode === 'grid' && (
        <div
          ref={previewRef}
          className={`project-preview ${
            !imageLoaded ? 'lazy-load-placeholder' : ''
          }`}
          data-lazy-image={project.image}
        />
      )}
      <span className="project-data artist hover-text">{project.artist}</span>
      <span className="project-data album hover-text">{project.album}</span>
      <span className="project-data category hover-text">{project.category}</span>
      <span className="project-data label hover-text">{project.label}</span>
      <span className="project-data year hover-text">{project.year}</span>
      {viewMode === 'grid' && (
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
      )}
    </li>
  );
};

export default ProjectItem;
