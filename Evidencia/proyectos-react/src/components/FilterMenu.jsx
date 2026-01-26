import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * FilterMenu Component
 * Menú de navegación con filtros y controles de vista
 */
const FilterMenu = ({
  currentFilter,
  filterCounts,
  onFilterChange,
  viewMode,
  onViewModeChange,
}) => {
  const indicatorRef = useRef(null);
  const menuRef = useRef(null);

  const filters = [
    { id: 'all', label: 'TODOS' },
    { id: 'webs', label: 'WEBS' },
    { id: 'threejs', label: 'THREE.JS' },
    { id: 'gsap', label: 'GSAP' },
  ];

  // Función para obtener la URL de Las Flores según el entorno
  const getLasFloresUrl = () => {
    // Si está en desarrollo local (localhost)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5176'; // Puerto diferente para cenaduria
    }
    
    // Para producción en GitHub Pages - siempre usar URL absoluta fija
    // La app de cenaduria está en: https://1inmortal.github.io/web-inmortal/cenaduria/index.html
    return 'https://1inmortal.github.io/web-inmortal/cenaduria/index.html';
  };

  useEffect(() => {
    // Mover indicador visual al filtro activo con animación GSAP
    if (indicatorRef.current && menuRef.current) {
      const activeButton = menuRef.current.querySelector(
        `[data-filter="${currentFilter}"]`
      );
      if (activeButton) {
        const buttonRect = activeButton.getBoundingClientRect();
        const navRect = menuRef.current.getBoundingClientRect();
        const left = buttonRect.left - navRect.left;
        const width = buttonRect.width;

        if (typeof gsap !== 'undefined') {
          gsap.to(indicatorRef.current, {
            left: `${left}px`,
            width: `${width}px`,
            duration: 0.3,
            ease: 'power2.out',
          });
        } else {
          indicatorRef.current.style.left = `${left}px`;
          indicatorRef.current.style.width = `${width}px`;
        }
      }
    }
  }, [currentFilter]);

  return (
    <nav
      className="navigation-menu"
      ref={menuRef}
      role="navigation"
      aria-label="Filtros de proyectos"
    >
      <div className="filter-indicator" ref={indicatorRef}></div>
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`filter-button ${
            currentFilter === filter.id ? 'active' : ''
          }`}
          data-filter={filter.id}
          onClick={() => onFilterChange(filter.id)}
          role="tab"
          aria-selected={currentFilter === filter.id}
          aria-label={`Filtro: ${filter.label}`}
        >
          {filter.label}
          <span
            className={`count ${
              currentFilter === 'threejs' && filter.id === 'threejs'
                ? 'threejs-active'
                : ''
            }`}
            id={`count-${filter.id}`}
          >
            {filterCounts[filter.id] || 0}
          </span>
        </button>
      ))}
      <a
        href={getLasFloresUrl()}
        className="filter-button external-link"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = getLasFloresUrl();
        }}
        aria-label="Las Flores Restaurante"
        title="Las Flores Restaurante"
      >
        LAS FLORES RESTAURANTE
      </a>
      <div className="view-controls">
        <button
          className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
          data-view="list"
          onClick={() => onViewModeChange('list')}
          aria-label="Vista de lista"
          title="Vista de lista"
        >
          ☰
        </button>
        <button
          className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
          data-view="grid"
          onClick={() => onViewModeChange('grid')}
          aria-label="Vista de cuadrícula"
          title="Vista de cuadrícula"
        >
          ⊞
        </button>
      </div>
    </nav>
  );
};

export default FilterMenu;
