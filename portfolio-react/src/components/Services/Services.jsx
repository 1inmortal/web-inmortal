import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const services = [
    {
      title: "Dirección Creativa",
      desc: "Definición del tono visual, narrativa digital, principios de composición y dirección estética para experiencias web premium."
    },
    {
      title: "Arquitectura de Interfaces",
      desc: "Diseño de estructuras, jerarquías, cuadrículas, patrones de UI y sistemas visuales para productos con altos estándares de claridad y rendimiento."
    },
    {
      title: "Sistemas de Diseño de Movimiento",
      desc: "Construcción de transiciones, narración mediante scroll, secuencias de entrada y micro-interacciones que convierten las interfaces en experiencias coreografiadas."
    },
    {
      title: "WebGL / Capas Espaciales",
      desc: "Integración de escenas 3D, partículas, profundidad visual y recursos inmersivos para elevar la presencia de la marca y la sensación tecnológica."
    },
    {
      title: "Ejecución Frontend Premium",
      desc: "Implementación de experiencias avanzadas con énfasis en la fluidez, el detalle tipográfico, el comportamiento interactivo y la coherencia visual."
    }
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animación de entrada para los elementos de la lista
      gsap.fromTo('.service-item', 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="services" className="relative py-32 lg:py-48 px-[5vw] flex flex-col justify-start">
      <div className="w-full max-w-[1400px] mx-auto">
        <span className="font-mono text-xs uppercase tracking-[2px] text-[var(--accent-dim)] block mb-8">
          03 / Capacidad
        </span>
        <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1.15] mb-16 text-[var(--text)]">
          Servicios Selectos
        </h2>
        
        <div className="mt-12 border-t border-[var(--border)]">
          {services.map((srv, i) => (
            <div 
              key={i} 
              data-cursor="CAPACITY"
              className="service-item group grid grid-cols-1 md:grid-cols-[minmax(220px,0.95fr)_minmax(0,2.05fr)] gap-8 md:gap-16 py-12 md:py-16 border-b border-[var(--border)] transition-all duration-500 ease-out hover:pl-8 hover:bg-gradient-to-r hover:from-[rgba(255,255,255,0.02)] hover:to-transparent"
            >
              <h3 className="font-display text-[2rem] md:text-[2.5rem] font-normal leading-[1.15] text-[var(--text)] group-hover:italic group-hover:text-[var(--accent)] transition-all duration-300">
                {srv.title}
              </h3>
              <p className="font-body text-[1.1rem] md:text-[1.25rem] leading-[1.8] opacity-80 font-light text-[var(--text)] pt-2">
                {srv.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
