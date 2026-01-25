import React, { useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import projectsData from '../../data/projects.json';
import './Projects.module.css';

/**
 * Projects Component
 * Muestra una grilla de proyectos con imágenes y descripciones
 */
const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.scroll-reveal');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      LIVE: 'bg-green-500/20 text-green-400 border-green-500/30',
      BETA: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      STABLE: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      INTERACTIVE: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    };
    return colors[status] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="py-24 bg-slate-950"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center animate-fade-in-up">
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase block mb-2">
            Proyectos
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white relative inline-block">
            Portafolio
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              className="scroll-reveal group relative rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-3 right-3 z-20">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold border ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                  {project.title}
                  <ExternalLink
                    size={16}
                    className="text-slate-500 group-hover:text-cyan-400 transition-colors"
                  />
                </h3>
                <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-slate-800/50 border border-slate-700 rounded text-xs text-slate-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  className="text-white text-sm font-medium border-b border-cyan-500 pb-0.5 hover:text-cyan-400 transition-colors inline-block"
                >
                  Ver Detalles
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/1inmortal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 bg-transparent"
          >
            Ver más en GitHub
            <Github size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
