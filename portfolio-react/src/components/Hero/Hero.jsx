import React from 'react';
import { ChevronRight, Download } from 'lucide-react';
import './Hero.module.css';

/**
 * Hero Component
 * Sección principal con título, subtítulo y CTAs
 */
const Hero = () => {
  const scrollToProjects = () => {
    const element = document.querySelector('#proyectos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = () => {
    // Aquí puedes agregar la lógica para descargar el CV
    window.open('/cv.pdf', '_blank');
  };

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center relative overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10">
        <div className="space-y-6 animate-fade-in-up">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-mono mb-4">
            Open to Work 2024
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Ingeniero y Técnico <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              en Tecnologías de la Información
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
            Especializado en desarrollo de software, infraestructura TI y soluciones tecnológicas integrales. 
            Combino conocimientos de <strong className="text-cyan-400">ingeniería</strong> y{' '}
            <strong className="text-cyan-400">técnica</strong> para diseñar e implementar sistemas robustos 
            que optimizan procesos y potencian la transformación digital.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={scrollToProjects}
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1 bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
            >
              Ver Portafolio
              <ChevronRight size={18} />
            </button>
            <button
              onClick={downloadCV}
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-1 border border-slate-600 text-slate-300 hover:border-cyan-400 hover:text-cyan-400 bg-transparent"
            >
              Descargar CV
              <Download size={18} />
            </button>
          </div>

          <div className="pt-8 flex gap-8 border-t border-white/5 mt-8">
            <div>
              <h4 className="text-3xl font-bold text-white">+20</h4>
              <span className="text-sm text-slate-500 uppercase tracking-wider">
                Proyectos
              </span>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-white">+3</h4>
              <span className="text-sm text-slate-500 uppercase tracking-wider">
                Años Exp.
              </span>
            </div>
            <div>
              <h4 className="text-3xl font-bold text-white">100%</h4>
              <span className="text-sm text-slate-500 uppercase tracking-wider">
                Enfoque
              </span>
            </div>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative hidden md:block animate-fade-in-left">
          <div className="relative z-10 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className="ml-auto text-xs text-slate-500 font-mono">
                app.tsx
              </div>
            </div>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex">
                <span className="text-purple-400">const</span>{' '}
                <span className="text-yellow-400 ml-2">Developer</span>{' '}
                <span className="text-white ml-2">=</span>{' '}
                <span className="text-white ml-2">{'{'}</span>
              </div>
              <div className="pl-4 text-slate-300">
                name: <span className="text-green-400">'Inmortal'</span>,
              </div>
              <div className="pl-4 text-slate-300">
                role: <span className="text-green-400">'Ingeniero y Técnico TI'</span>,
              </div>
              <div className="pl-4 text-slate-300">
                skills: [
                <span className="text-green-400">'Python'</span>,{' '}
                <span className="text-green-400">'React'</span>,{' '}
                <span className="text-green-400">'Node.js'</span>],
              </div>
              <div className="pl-4 text-slate-300">
                hardWorker: <span className="text-blue-400">true</span>
              </div>
              <div className="text-white">{'};'}</div>
            </div>
          </div>
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl -z-10 rounded-full transform translate-y-10" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
