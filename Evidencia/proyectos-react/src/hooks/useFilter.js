import { useState, useEffect, useMemo } from 'react';

/**
 * useFilter Hook
 * Maneja el filtrado de proyectos por categoría
 */
export const useFilter = (projects) => {
  const [currentFilter, setCurrentFilter] = useState('all');

  const filteredProjects = useMemo(() => {
    if (currentFilter === 'all') {
      return projects;
    }
    return projects.filter(
      (project) => project.categoryFilter === currentFilter
    );
  }, [projects, currentFilter]);

  const filterCounts = useMemo(() => {
    const counts = {
      all: projects.length,
      webs: 0,
      threejs: 0,
      gsap: 0,
    };

    projects.forEach((project) => {
      if (project.categoryFilter in counts) {
        counts[project.categoryFilter]++;
      }
    });

    return counts;
  }, [projects]);

  const updateCounts = () => {
    // Los contadores se calculan automáticamente con useMemo
    return filterCounts;
  };

  return {
    currentFilter,
    filteredProjects,
    filterCounts,
    setFilter: setCurrentFilter,
    updateCounts,
  };
};
