import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const scrollContainerRef = useRef(null);
  const trackRef = useRef(null);
  
  const categories = [
    { area: "Area 01", title: "Elegancia Corporativa", tags: "[ ARQUITECTURA / CONFIANZA / ESCALA ]", desc: "Sistemas digitales para firmas, consultorías y marcas que proyectan sofisticación institucional.", visual: "_STRUCTURE.01" },
    { area: "Area 02", title: "Comercio de Lujo", tags: "[ SENSORIAL / RITMO / VENTAS ]", desc: "Experiencias premium de e-commerce donde la presentación eleva el valor del producto.", visual: "_AESTHETICS.02" },
    { area: "Area 03", title: "Paneles SaaS", tags: "[ UTILIDAD / PRECISIÓN / DATOS ]", desc: "Interfaces para plataformas complejas donde la utilidad se encuentra con la personalidad visual.", visual: "_LOGIC.03" },
    { area: "Area 04", title: "Presencia de Fundador", tags: "[ AUTORIDAD / IDENTIDAD / VISIÓN ]", desc: "Sitios personales para ejecutivos y estrategas que requieren autoridad estética.", visual: "_PERSONA.04" },
    { area: "Area 05", title: "Branding Experimental", tags: "[ SORPRESA / NARRATIVA / INTERACCIÓN ]", desc: "Micrositios y lanzamientos que requieren sorpresa, sofisticación y narrativas distintivas.", visual: "_CONCEPT.05" },
    { area: "Area 06", title: "Interfaces Espaciales", tags: "[ PROFUNDIDAD / PARTÍCULAS / CINÉTICO ]", desc: "Experiencias con profundidad 3D y sistemas de partículas donde el espacio es un lenguaje.", visual: "_SPATIAL.06" },
    { area: "Area 07", title: "Productos Narrativos", tags: "[ STORYTELLING / RENDIMIENTO / CONVERSIÓN ]", desc: "Páginas de productos que mezclan narración, demostración y conversión coreografiada.", visual: "_NARRATIVE.07" }
  ];

  const studies = [
    { title: "Maison Noire", role: "Arquitectura / Confianza", desc: "Un concepto para una firma digital de lujo donde la navegación se comporta como una revista viva. Tipografía editorial y profundidad sutil." },
    { title: "Atlas Capital", role: "Escala / Visión Estratégica", desc: "Presencia corporativa de alto nivel construida para transmitir rigor visual. Énfasis en estructura y ritmo." },
    { title: "Opaline Commerce", role: "Sensorial / Ventas", desc: "Boutique de e-commerce donde los productos se presentan como una campaña de moda. Conversión por atmósfera, no por ruido." },
    { title: "Vector OS", role: "Utilidad / Datos", desc: "Panel premium donde los datos muestran jerarquía impecable. Un lenguaje visual que hace deseable lo técnico." },
    { title: "Founder Atelier", role: "Identidad / Autoridad", desc: "Presencia personal para ejecutivos que proyectan criterio y una identidad más refinada que un portafolio tradicional." },
    { title: "Kinetic Launch", role: "Narrativa / Descubrimiento", desc: "Micrositio donde el movimiento guía el descubrimiento. Cada scroll funciona como una escena coreografiada." }
  ];

  useEffect(() => {
    // Media query manual para deshabilitar GSAP horizontal en mobile si se desea, 
    // pero Lenis/ScrollTrigger lo manejan bien.
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      const amountToScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: "top top",
          end: `+=${amountToScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      // Animación de entrada para las tarjetas de estudios
      gsap.fromTo('.study-card', 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#studies',
            start: 'top 75%',
          }
        }
      );
    }, scrollContainerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 1. Categorías (Scroll Horizontal) */}
      <section ref={scrollContainerRef} className="relative h-screen bg-[var(--bg)] overflow-hidden flex flex-col justify-center">
        <div className="absolute top-12 left-6 md:left-12 z-10">
          <span className="font-mono text-xs uppercase tracking-[2px] text-[var(--accent-dim)] block mb-2">
            07 / Áreas de Dominio
          </span>
        </div>
        
        <div ref={trackRef} className="flex flex-nowrap w-max px-[5vw] md:px-[10vw] gap-[12vw] md:gap-[24vw] items-center h-full">
          {categories.map((cat, i) => (
            <div key={i} className="w-[85vw] md:w-[60vw] max-w-[900px] shrink-0 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-[var(--space-md)] lg:gap-[var(--space-lg)] items-center">
              <div>
                <span className="font-mono text-xs uppercase tracking-[2px] text-[var(--accent-dim)] block mb-[var(--space-sm)]">
                  {cat.area}
                </span>
                <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[1.15] mb-[var(--space-sm)] text-[var(--text)]">
                  {cat.title}
                </h2>
                <p className="font-mono text-[10px] uppercase tracking-[1px] opacity-50 mb-[var(--space-sm)] text-[var(--accent)]">
                  {cat.tags}
                </p>
                <p className="font-body text-[1.1rem] leading-[1.75] opacity-80 font-light text-[var(--text)] max-w-sm">
                  {cat.desc}
                </p>
              </div>
              
              <div className="w-full h-[40vh] min-h-[300px] border border-[var(--border)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[20px] flex items-center justify-center font-mono text-xs tracking-[5px] text-[var(--text-muted)] group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-radial from-[rgba(255,255,255,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:text-[var(--accent)]">
                  {cat.visual}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Estudios de Presentación (Lista Vertical) */}
      <section id="studies" className="relative py-[var(--space-xl)] lg:py-[var(--space-xxl)] px-[5vw] flex flex-col justify-start">
        <div className="w-full max-w-[1400px] mx-auto">
          <span className="font-mono text-xs uppercase tracking-[2px] text-[var(--accent-dim)] block mb-[var(--space-sm)]">
            08 / Trabajo
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1.15] mb-[var(--space-md)] text-[var(--text)]">
            Estudios de Presentación
          </h2>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
            {studies.map((study, i) => (
              <div 
                key={i} 
                data-cursor="VIEW"
                className="study-card flex flex-col gap-6 p-8 border-l border-[var(--border)] transition-transform duration-500 ease-out hover:-translate-y-2 hover:bg-[rgba(255,255,255,0.02)]"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-[2rem] font-normal leading-[1.15] text-[var(--text)] m-0">
                    {study.title}
                  </h3>
                  <span className="font-mono text-[0.85rem] uppercase text-[var(--accent-dim)] tracking-[0.05em]">
                    {study.role}
                  </span>
                </div>
                <p className="font-body text-[1.1rem] leading-[1.6] opacity-80 font-light text-[var(--text)] m-0">
                  {study.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
