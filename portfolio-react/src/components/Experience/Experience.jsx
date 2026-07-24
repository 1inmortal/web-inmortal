import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const phases = [
    {
      title: "Fase 01 — Lectura Estratégica",
      desc: "Analizando el contexto, posicionamiento, tipo de usuario y el nivel de sofisticación que la marca necesita proyectar."
    },
    {
      title: "Fase 02 — Dirección Visual",
      desc: "Definiendo el lenguaje tipográfico, contraste, espaciado, comportamiento de movimiento, capas y principios narrativos."
    },
    {
      title: "Fase 03 — Sistemas Estructurales",
      desc: "Construyendo arquitectura de secciones, cuadrículas, jerarquías, componentes y relaciones entre contenido y experiencia."
    },
    {
      title: "Fase 04 — Movimiento y Refinamiento",
      desc: "Pulir el tempo visual, micro-interacciones, profundidad y coherencia para que la experiencia se sienta premium de principio a fin."
    },
    {
      title: "Fase 05 — Entrega",
      desc: "Traducir dirección y diseño en una ejecución funcional y rápida, consistente con la ambición del proyecto."
    }
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animación de entrada para los elementos de la lista
      gsap.fromTo('.process-item', 
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
    <section ref={containerRef} id="process" className="relative py-32 lg:py-48 px-[5vw] flex flex-col justify-start">
      <div className="w-full max-w-[1400px] mx-auto">
        <span className="font-mono text-xs uppercase tracking-[2px] text-[var(--accent-dim)] block mb-8">
          05 / Metodología
        </span>
        <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1.15] mb-16 text-[var(--text)]">
          Arquitectura de Procesos
        </h2>
        
        <div className="mt-12 border-t border-[var(--border)]">
          {phases.map((phase, i) => (
            <div 
              key={i} 
              data-cursor="PROCESS"
              className="process-item group grid grid-cols-1 md:grid-cols-[minmax(220px,0.95fr)_minmax(0,2.05fr)] gap-8 md:gap-16 py-12 md:py-16 border-b border-[var(--border)] transition-all duration-500 ease-out hover:pl-8 hover:bg-gradient-to-r hover:from-[rgba(255,255,255,0.02)] hover:to-transparent"
            >
              <h3 className="font-display text-[2rem] md:text-[2.5rem] font-normal leading-[1.15] text-[var(--text)] group-hover:italic group-hover:text-[var(--accent)] transition-all duration-300">
                {phase.title}
              </h3>
              <p className="font-body text-[1.1rem] md:text-[1.25rem] leading-[1.8] opacity-80 font-light text-[var(--text)] pt-2">
                {phase.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
