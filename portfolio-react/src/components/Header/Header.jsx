import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Github, Twitter, Linkedin } from 'lucide-react';
import './Header.module.css';

/**
 * Header Component
 * Navegación principal con menú responsive y enlaces de anclaje
 */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Acerca', href: '#acerca' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Contacto', href: '#contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-lg border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2 cursor-pointer"
          onClick={() => scrollTo('#inicio')}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded flex items-center justify-center text-white">
            <Terminal size={18} />
          </div>
          INMORTAL_<span className="text-cyan-400">OS</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-slate-300 hover:text-cyan-400 text-sm font-medium transition-colors uppercase tracking-wide"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Social / CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/1inmortal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 py-4 px-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollTo(link.href)}
              className="text-left text-slate-300 hover:text-cyan-400 py-2 transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
