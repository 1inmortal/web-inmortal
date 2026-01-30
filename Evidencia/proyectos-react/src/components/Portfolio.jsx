import React, { useState, useEffect, useRef } from 'react';
import FilterMenu from './FilterMenu';
import ProjectList from './ProjectList';
import CornerElements from './CornerElements';
import BackgroundImage from './BackgroundImage';
import ParticlesContainer from './ParticlesContainer';
import PerformanceWarning from './PerformanceWarning';
import RecommendationsSection from './RecommendationsSection';
import { useFilter } from '../hooks/useFilter';
import { useAnimation } from '../hooks/useAnimation';
import { useGSAP } from '../hooks/useGSAP';
import { useLazyLoad } from '../hooks/useLazyLoad';
import { useIdleAnimation } from '../hooks/useIdleAnimation';
import { useAudio } from '../hooks/useAudio';
import { usePreloadImages } from '../hooks/usePreloadImages';
import { throttle } from '../utils/throttle';
import { resolveImageUrl } from '../utils/resolveImageUrl';
import projectsData from '../data/projects.json';

/**
 * Portfolio Component
 * Componente principal del portfolio con filtros y vista lista/grid
 */
const Portfolio = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' o 'grid'
  const [activeProjectIndex, setActiveProjectIndex] = useState(-1);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const containerRef = useRef(null);
  const backgroundImageRef = useRef(null);

  const {
    currentFilter,
    filteredProjects,
    filterCounts,
    setFilter,
  } = useFilter(projectsData);

  const { createParticles } = useAnimation();
  const { gsap, checkGSAPAvailability } = useGSAP();
  const { updateObservers } = useLazyLoad();
  const { playHoverSound, audioEnabled } = useAudio();
  
  // Precargar imágenes
  usePreloadImages(projectsData);
  
  // Idle animation - obtener proyectos visibles del DOM
  const visibleProjectsRef = useRef([]);
  useEffect(() => {
    visibleProjectsRef.current = Array.from(
      document.querySelectorAll('.project-item:not(.hidden)')
    );
  }, [filteredProjects, viewMode]);
  
  useIdleAnimation(visibleProjectsRef.current, activeProjectIndex);

  // Manejar resize con throttle
  useEffect(() => {
    const handleResize = throttle(() => {
      updateObservers();
    }, 250);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateObservers]);

  const handleProjectHover = (project, index) => {
    console.log('handleProjectHover called:', { artist: project.artist, image: project.image, index });
    setActiveProjectIndex(index);
    if (project.image) {
      // Resolver la URL de la imagen con el base path
      let resolvedUrl = resolveImageUrl(project.image);
      
      // Si la URL no es absoluta (http/https) y no empieza con /, agregar el base path
      if (!resolvedUrl.startsWith('http') && !resolvedUrl.startsWith('data:')) {
        if (!resolvedUrl.startsWith('/')) {
          const baseUrl = import.meta.env.BASE_URL || '/web-inmortal/proyectos/';
          resolvedUrl = `${baseUrl}${resolvedUrl}`.replace(/\/+/g, '/');
        }
      }
      
      // Usar encodeURI para codificar la URL completa (maneja espacios correctamente)
      const finalUrl = encodeURI(resolvedUrl).replace(/#/g, '%23');
      
      console.log('Setting background image:', {
        project: project.artist,
        original: project.image,
        resolved: resolvedUrl,
        final: finalUrl
      });
      setBackgroundImageUrl(finalUrl);
    } else {
      console.log('No image for project:', project.artist);
      setBackgroundImageUrl('');
    }
    
    // Agregar clase has-active al contenedor
    if (containerRef.current) {
      containerRef.current.classList.add('has-active');
    }
  };

  const handleProjectLeave = () => {
    setActiveProjectIndex(-1);
    setBackgroundImageUrl('');
    
    // Remover clase has-active del contenedor
    if (containerRef.current) {
      containerRef.current.classList.remove('has-active');
    }
  };

  const handleProjectClick = (project) => {
    if (project.link) {
      // Registrar interacción para recomendaciones
      try {
        const stored = localStorage.getItem('portfolio_interactions');
        const interactions = stored ? JSON.parse(stored) : {};
        const key = project.link;
        
        if (!interactions[key]) {
          interactions[key] = {
            count: 0,
            totalDuration: 0,
            category: project.categoryFilter,
            lastVisit: Date.now(),
          };
        }
        
        interactions[key].count++;
        interactions[key].lastVisit = Date.now();
        localStorage.setItem('portfolio_interactions', JSON.stringify(interactions));
      } catch (error) {
        console.log('Error al registrar interacción:', error);
      }

      // Resolver ruta destino
      let targetHref;
      try {
        const isAbsolute = /^(https?:)?\/\//.test(project.link);
        if (isAbsolute) {
          targetHref = project.link;
        } else {
          targetHref = new URL(project.link, window.location.href).href;
        }
      } catch (e) {
        targetHref = project.link;
      }

      // Usar View Transitions API si está disponible
      if ('startViewTransition' in document) {
        document.startViewTransition(() => {
          window.open(targetHref, '_blank');
        });
      } else {
        window.open(targetHref, '_blank');
      }
    }
  };

  const handleFilterChange = (filter) => {
    // Mostrar advertencia si es threejs y es móvil
    if (filter === 'threejs' && isMobileDevice()) {
      setShowWarning(true);
    } else {
      // Agregar clase filtering para mostrar estado de carga
      if (containerRef.current) {
        containerRef.current.classList.add('filtering');
      }
      
      setFilter(filter);
      setShowWarning(false);
      
      // Animar proyectos con GSAP
      setTimeout(() => {
        const items = document.querySelectorAll('.project-item');
        if (checkGSAPAvailability && checkGSAPAvailability() && gsap) {
          items.forEach((item, index) => {
            const isVisible = !item.classList.contains('hidden');
            if (isVisible) {
              gsap.set(item, { opacity: 0, y: -20 });
              gsap.to(item, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                delay: index * 0.05,
                ease: 'power2.out',
              });
            } else {
              gsap.to(item, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                  item.classList.add('hidden');
                },
              });
            }
          });
        }
        
        // Remover estado de carga
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.classList.remove('filtering');
          }
        }, 300);
      }, 150);
    }
  };

  const handleContinueAnyway = () => {
    setShowWarning(false);
    setFilter('threejs');
  };

  const handleGoBack = () => {
    setShowWarning(false);
    setFilter('all');
  };

  const isMobileDevice = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = [
      'android',
      'webos',
      'iphone',
      'ipad',
      'ipod',
      'blackberry',
      'iemobile',
      'opera mini',
      'mobile',
    ];
    const isMobileUA = mobileKeywords.some((keyword) =>
      userAgent.includes(keyword)
    );
    const isMobileScreen = window.innerWidth <= 768;
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    return isMobileUA || (isMobileScreen && isTouchDevice);
  };

  return (
    <main className="portfolio-container" ref={containerRef}>
      <button
        className="back-button"
        onClick={() => (window.location.href = '../index.html')}
        aria-label="Volver al inicio"
      >
        ← PROYECTOS
      </button>

      <FilterMenu
        currentFilter={currentFilter}
        filterCounts={filterCounts}
        onFilterChange={handleFilterChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="project-counter">
        <span id="current-count">{filteredProjects.length}</span> de{' '}
        <span id="total-count">{projectsData.length}</span> proyectos
      </div>

      <ProjectList
        projects={filteredProjects}
        viewMode={viewMode}
        activeIndex={activeProjectIndex}
        onProjectHover={handleProjectHover}
        onProjectLeave={handleProjectLeave}
        onProjectClick={handleProjectClick}
        createParticles={createParticles}
        playHoverSound={playHoverSound}
        gsap={gsap}
        checkGSAPAvailability={checkGSAPAvailability}
      />

      <RecommendationsSection projects={projectsData} />

      <BackgroundImage
        ref={backgroundImageRef}
        imageUrl={backgroundImageUrl}
      />

      <ParticlesContainer />

      <CornerElements />

      <PerformanceWarning
        show={showWarning}
        onContinue={handleContinueAnyway}
        onGoBack={handleGoBack}
      />
    </main>
  );
};

export default Portfolio;
