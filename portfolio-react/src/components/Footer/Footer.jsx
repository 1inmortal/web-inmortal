import React from 'react';
import {
  Terminal,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Code2,
  Heart,
  ArrowUp,
  ExternalLink,
  Zap,
  Globe,
} from 'lucide-react';
import './Footer.module.css';

/**
 * Footer Component
 * Pie de página mejorado con máximo detalle
 * Incluye: información de contacto, redes sociales, enlaces, newsletter y más
 */
const Footer = () => {
  const scrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Acerca de', href: '#acerca' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const legalLinks = [
    { name: 'Términos de Servicio', href: '#' },
    { name: 'Política de Privacidad', href: '#' },
    { name: 'Cookies', href: '#' },
    { name: 'Aviso Legal', href: '#' },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/1inmortal',
      color: 'hover:text-white hover:bg-slate-800',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: '#',
      color: 'hover:text-blue-400 hover:bg-blue-500/10',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: '#',
      color: 'hover:text-blue-500 hover:bg-blue-500/10',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:contacto@inmortal.dev',
      color: 'hover:text-cyan-400 hover:bg-cyan-500/10',
    },
  ];

  const techStack = [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Three.js',
    'Solidity',
    'Python',
  ];

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-white/10 pt-20 pb-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Terminal size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tighter text-white">
                  INMORTAL_<span className="text-cyan-400">OS</span>
                </h3>
                <p className="text-xs text-slate-500 font-mono">v3.0.0 // SYSTEM ONLINE</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Ingeniero Full-Stack especializado en Web3, IA y experiencias 3D.
              Construyendo el futuro del desarrollo web.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <Zap size={14} className="text-green-400" />
              <span>Disponible para proyectos</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Code2 size={18} className="text-cyan-400" />
              Navegación
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-slate-400 hover:text-cyan-400 transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-cyan-400 transition-all duration-300" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Mail size={18} className="text-cyan-400" />
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Mail size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
                <a
                  href="mailto:contacto@inmortal.dev"
                  className="hover:text-cyan-400 transition-colors"
                >
                  contacto@inmortal.dev
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
                <span>Remoto • Disponible Globalmente</span>
              </li>
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <Globe size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
                <span>Español • English</span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Zap size={18} className="text-cyan-400" />
              Conecta
            </h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700 flex items-center justify-center text-slate-400 transition-all duration-300 ${social.color} group relative overflow-hidden`}
                    aria-label={social.name}
                  >
                    <Icon size={18} className="relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-2 font-mono">NEWSLETTER</p>
              <p className="text-sm text-slate-400 mb-3">
                Recibe actualizaciones sobre nuevos proyectos
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                />
                <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-sm font-medium transition-colors flex items-center gap-1">
                  <ArrowUp size={14} className="rotate-45" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Badge */}
        <div className="mb-12 pt-8 border-t border-white/5">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-xs text-slate-500 font-mono uppercase tracking-wider">
              Stack:
            </span>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-slate-900/50 border border-slate-800 rounded-full text-xs text-slate-400 font-mono hover:border-cyan-500/50 hover:text-cyan-400 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-600">
              <p>
                &copy; {currentYear} INMORTAL_OS. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-4">
                {legalLinks.map((link, index) => (
                  <React.Fragment key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-cyan-400 transition-colors text-xs"
                    >
                      {link.name}
                    </a>
                    {index < legalLinks.length - 1 && (
                      <span className="text-slate-700">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Back to Top & Made With */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-600 text-sm">
                <span>Hecho con</span>
                <Heart
                  size={16}
                  className="text-red-500 fill-red-500 animate-pulse"
                />
                <span>y</span>
                <span className="text-cyan-400 font-mono">React</span>
              </div>
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500 hover:bg-slate-900 transition-all duration-300 group"
                aria-label="Volver arriba"
              >
                <ArrowUp
                  size={18}
                  className="group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-slate-700">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono">SYSTEM STATUS: ONLINE</span>
          <span className="text-slate-600">•</span>
          <span>Última actualización: {new Date().toLocaleDateString('es-ES')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
