import React, { useEffect } from 'react';
import ProjectItem from './ProjectItem';

/**
 * ProjectList Component
 * Lista de proyectos con soporte para vista lista y grid
 */
const ProjectList = ({
  projects,
  viewMode,
  activeIndex,
  onProjectHover,
  onProjectLeave,
  onProjectClick,
  createParticles,
  playHoverSound,
  gsap,
  checkGSAPAvailability,
}) => {
  useEffect(() => {
    // Animar entrada de proyectos con GSAP si está disponible
    if (checkGSAPAvailability && checkGSAPAvailability() && gsap) {
      const items = document.querySelectorAll('.project-item:not(.hidden)');
      if (items.length > 0) {
        gsap.set(items, { opacity: 0, y: -20 });
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power2.out',
        });
      }
    }
  }, [projects, viewMode, gsap, checkGSAPAvailability]);

  return (
    <ul
      className={`project-list ${viewMode === 'grid' ? 'grid-view' : 'list-view'}`}
      role="list"
      id="projectList"
    >
      {projects.map((project, index) => (
        <ProjectItem
          key={project.id}
          project={project}
          index={index}
          isActive={activeIndex === index}
          viewMode={viewMode}
          onHover={() => onProjectHover(project, index)}
          onLeave={onProjectLeave}
          onClick={() => onProjectClick(project)}
          createParticles={createParticles}
          playHoverSound={playHoverSound}
        />
      ))}
    </ul>
  );
};

export default ProjectList;
