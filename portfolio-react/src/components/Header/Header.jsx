import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import './Header.module.css';

/**
 * NavLink Component
 * Enlace de navegación con efecto hover y línea animada (diseño de certificados)
 */
const NavLink = ({ href, children, onClick, isExternal = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };
  
  if (isExternal) {
    return (
      <a
        href={href}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          fontSize: '0.9rem',
          fontWeight: 500,
          color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
          position: 'relative',
          textDecoration: 'none',
          transition: 'color 0.3s',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        {children}
        <ExternalLink size={14} style={{ opacity: 0.7 }} />
        <span style={{
          position: 'absolute',
          width: isHovered ? '100%' : '0',
          height: '1px',
          bottom: '-4px',
          left: 0,
          background: '#8b5cf6',
          transition: 'width 0.3s'
        }} />
      </a>
    );
  }
  
  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        fontSize: '0.9rem',
        fontWeight: 500,
        color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
        position: 'relative',
        textDecoration: 'none',
        transition: 'color 0.3s',
        cursor: 'pointer',
        background: 'transparent',
        border: 'none',
        padding: 0
      }}
    >
      {children}
      <span style={{
        position: 'absolute',
        width: isHovered ? '100%' : '0',
        height: '1px',
        bottom: '-4px',
        left: 0,
        background: '#8b5cf6',
        transition: 'width 0.3s'
      }} />
    </button>
  );
};

/**
 * Header Component
 * Navegación principal con menú responsive y enlaces de anclaje
 * Soporta enlaces internos (anclas) y externos (otras aplicaciones React)
 * Diseño aplicado del menú de certificados
 */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Función para obtener la URL de Certificados según el entorno
  const getCertificatesUrl = () => {
    // Si está en desarrollo local (localhost)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5174';
    }
    
    // Para producción en GitHub Pages
    // ⚠️ CONFIGURACIÓN: Actualiza la ruta según donde esté desplegada la app de certificados
    const GITHUB_USER = '1inmortal';
    const REPO_NAME = 'web-inmortal';
    
    // Ruta donde está la app de certificados
    // Los certificados se copian a portfolio-react/dist/certificados/ durante el build
    const CERTIFICATES_PATH = 'certificados';
    
    const hostname = window.location.hostname;
    
    // Si está en GitHub Pages, construir la URL
    if (hostname.includes('github.io')) {
      const parts = hostname.split('.');
      if (parts.length >= 2) {
        const githubUser = parts[0];
        // Obtener el repositorio desde el pathname o usar el configurado
        const pathname = window.location.pathname;
        const pathSegments = pathname.split('/').filter(p => p);
        const currentRepo = pathSegments[0] || REPO_NAME;
        
        // Construir URL: usuario.github.io/repositorio/certificados/index.html
        return `https://${githubUser}.github.io/${currentRepo}/${CERTIFICATES_PATH}/index.html`;
      }
    }
    
    // Fallback: URL por defecto
    return `https://${GITHUB_USER}.github.io/${REPO_NAME}/${CERTIFICATES_PATH}/index.html`;
  };

  // Enlaces de navegación
  // Para enlaces externos, usa la URL completa (ej: 'https://otra-app.com')
  // Para enlaces internos, usa anclas (ej: '#inicio')
  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Acerca', href: '#acerca' },
    { name: 'Experiencia', href: '#experiencia' }, // Timeline dentro de About
    { name: 'Stack', href: '#stack' }, // Stack técnico dentro de About
    { name: 'Servicios', href: '#servicios' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Certificados', href: getCertificatesUrl() },
    { name: 'Contacto', href: '#contacto' },
  ];

  // Función para detectar si un enlace es externo
  const isExternalLink = (href) => {
    return href.startsWith('http://') || href.startsWith('https://');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: scrolled ? '12px 0' : '20px 0',
        background: scrolled ? 'rgba(5,5,5,0.95)' : 'rgba(5,5,5,0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 100,
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'all 0.3s'
      }}
    >
      <div
        className="container mx-auto px-4 sm:px-6"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px'
        }}
      >
        {/* Logo */}
        <div
          onClick={() => scrollTo('#inicio')}
          style={{
            fontWeight: 800,
            fontSize: '1.2rem',
            letterSpacing: '-0.05em',
            color: '#f5f5f5',
            textDecoration: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(to bottom right, #06b6d4, #2563eb)',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Terminal size={18} color="#ffffff" />
          </div>
          INMORTAL<span style={{ color: '#8b5cf6' }}>_OS</span>
        </div>

        {/* Desktop Nav */}
        <nav
          style={{
            display: isMobile ? 'none' : 'flex',
            gap: '30px',
            alignItems: 'center'
          }}
        >
          {navLinks.map((link) => {
            const isExternal = isExternalLink(link.href);
            
            if (isExternal) {
              return (
                <NavLink
                  key={link.name}
                  href={link.href}
                  isExternal={true}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = link.href;
                  }}
                >
                  {link.name}
                </NavLink>
              );
            }
            
            return (
              <NavLink
                key={link.name}
                href={link.href}
                onClick={() => scrollTo(link.href)}
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Social / CTA */}
        <div
          style={{
            display: isMobile ? 'none' : 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <a
            href="https://github.com/1inmortal"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(255, 255, 255, 0.4)',
              transition: 'color 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.color = '#ffffff'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.4)'}
          >
            <Github size={20} />
          </a>
          <a
            href="#"
            style={{
              color: 'rgba(255, 255, 255, 0.4)',
              transition: 'color 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.color = '#ffffff'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.4)'}
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            style={{
              color: 'rgba(255, 255, 255, 0.4)',
              transition: 'color 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.target.style.color = '#ffffff'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.4)'}
          >
            <Linkedin size={20} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: isMobile ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '4px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}
          aria-label="Toggle menu"
        >
          <span style={{
            width: '24px',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.6)',
            transition: 'all 0.3s',
            transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }} />
          <span style={{
            width: '24px',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.6)',
            transition: 'all 0.3s',
            opacity: mobileMenuOpen ? 0 : 1
          }} />
          <span style={{
            width: '24px',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.6)',
            transition: 'all 0.3s',
            transform: mobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
          }} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'rgba(5,5,5,0.95)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          {navLinks.map((link) => {
            const isExternal = isExternalLink(link.href);
            
            if (isExternal) {
              return (
                <NavLink
                  key={link.name}
                  href={link.href}
                  isExternal={true}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    window.location.href = link.href;
                  }}
                >
                  {link.name}
                </NavLink>
              );
            }
            
            return (
              <NavLink
                key={link.name}
                href={link.href}
                onClick={() => {
                  scrollTo(link.href);
                  setMobileMenuOpen(false);
                }}
              >
                {link.name}
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
};

export default Header;
