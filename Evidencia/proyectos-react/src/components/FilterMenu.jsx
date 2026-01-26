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
    
    // Para producción en GitHub Pages
    const GITHUB_USER = '1inmortal';
    const REPO_NAME = 'web-inmortal';
    
    // Ruta donde está la app de cenaduria
    const CENADURIA_PATH = 'cenaduria';
    
    const hostname = window.location.hostname;
    
    // Si está en GitHub Pages, construir la URL
    if (hostname.includes('github.io')) {
      const parts = hostname.split('.');
      if (parts.length >= 2) {
        const githubUser = parts[0];
        // Obtener el repositorio desde el pathname
        // El pathname puede ser: /web-inmortal/proyectos/ o /web-inmortal/
        const pathname = window.location.pathname;
        const pathSegments = pathname.split('/').filter(p => p);
        // El primer segmento siempre es el nombre del repositorio
        const currentRepo = pathSegments[0] || REPO_NAME;
        
        // Construir URL absoluta: usuario.github.io/repositorio/cenaduria/index.html
        return `https://${githubUser}.github.io/${currentRepo}/${CENADURIA_PATH}/index.html`;
      }
    }
    
    // Fallback: URL por defecto
    return `https://${GITHUB_USER}.github.io/${REPO_NAME}/${CENADURIA_PATH}/index.html`;
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
          const url = getLasFloresUrl();
          // Asegurar que la URL sea absoluta
          if (url.startsWith('http://') || url.startsWith('https://')) {
            window.location.href = url;
          } else {
            // Si por alguna razón no es absoluta, construirla
            window.location.href = `https://1inmortal.github.io/web-inmortal/cenaduria/index.html`;
          }
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
