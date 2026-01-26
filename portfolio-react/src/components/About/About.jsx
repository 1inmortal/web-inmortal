import React, { useEffect, useRef } from 'react';
import { Cpu } from 'lucide-react';
import timelineData from '../../data/timeline.json';
import './About.module.css';

/**
 * About Component
 * Sección sobre mí con descripción profesional y línea de tiempo
 */
const About = () => {
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

  const techStack = [
    'JavaScript (ES6+)',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'TailwindCSS',
    'PostgreSQL',
    'Docker',
    'Git',
    'Solidity',
    'Three.js',
    'Python',
  ];

  return (
    <section
      id="acerca"
      ref={sectionRef}
      className="py-24 bg-slate-950 relative"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center animate-fade-in-up">
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase block mb-2">
            Sobre Mí
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white relative inline-block">
            Trayectoria Profesional
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="scroll-reveal">
            <h3 className="text-2xl font-bold text-white mb-6">
              Más allá del código
            </h3>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Más que escribir <strong className="text-cyan-400">código</strong>
              , construyo <strong className="text-cyan-400">ecosistemas</strong>
              . Mi pasión reside en la intersección entre el{' '}
              <strong className="text-cyan-400">diseño minimalista</strong> y la{' '}
              <strong className="text-cyan-400">ingeniería robusta</strong>.
            </p>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Actualmente enfocado en desarrollar{' '}
              <strong className="text-cyan-400">
                experiencias 3D interactivas
              </strong>{' '}
              con Three.js, Python y tecnologías modernas para crear productos
              memorables.
            </p>

            <div id="stack" className="mb-8">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Cpu size={20} className="text-cyan-400" /> Stack Técnico
              </h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline - Sección Experiencia */}
          <div id="experiencia" className="space-y-8 relative pl-8 border-l border-slate-800 scroll-reveal">
            <div className="text-cyan-400 font-mono text-sm mb-4">
              // SYSTEM_LOGS
            </div>
            {timelineData.map((item, index) => (
              <div key={item.id} className="relative">
                <span className="absolute -left-[39px] top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-cyan-500" />
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-cyan-500 text-sm font-bold tracking-wider">
                    {item.year}
                  </span>
                  <span className="text-slate-600 text-xs">●</span>
                  <span className="text-slate-500 text-xs uppercase">
                    {item.status}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-white">{item.role}</h4>
                <p className="text-slate-500 text-sm mb-2">{item.company}</p>
                <p className="text-slate-400 text-sm mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-slate-900/50 border border-slate-800 rounded text-xs text-slate-400 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
