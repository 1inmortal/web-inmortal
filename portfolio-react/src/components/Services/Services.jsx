import React, { useEffect, useRef } from 'react';
import { Globe, Brain, Box, Code2 } from 'lucide-react';
import servicesData from '../../data/services.json';
import './Services.module.css';

/**
 * Services Component
 * Muestra los servicios ofrecidos con íconos y descripciones
 */
const Services = () => {
  const sectionRef = useRef(null);

  const iconMap = {
    blockchain: Globe,
    brain: Brain,
    cube: Box,
    globe: Globe,
  };

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

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-24 bg-slate-900/30"
    >
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center animate-fade-in-up">
          <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase block mb-2">
            Servicios
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white relative inline-block">
            Lo que ofrezco
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-transparent rounded-full"></span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => {
            const IconComponent =
              iconMap[service.icon] || Code2;
            return (
              <div
                key={service.id}
                className="scroll-reveal bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/30 transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                  <IconComponent size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {service.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-slate-800/50 border border-slate-700 rounded text-xs text-slate-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
