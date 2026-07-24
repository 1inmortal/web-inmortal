import React from 'react';

export default function Stack() {
  const arsenal = [
    {
      name: "01 / THREE.JS",
      desc: "Composición espacial, shaders, partículas, profundidad procedural y capas de escena inmersiva para entornos digitales premium."
    },
    {
      name: "02 / GSAP",
      desc: "Coreografía de líneas de tiempo de alta precisión, sistemas de transición, narración por scroll y ritmo de interacción."
    },
    {
      name: "03 / SCROLLTRIGGER",
      desc: "Progresión narrativa basada en escenas, mecánicas de fijación (pinning) y secuencias visuales horizontales sincronizadas con el scroll."
    },
    {
      name: "04 / LENIS",
      desc: "Infraestructura de movimiento suave para una navegación fluida y un ritmo controlado a lo largo de experiencias largas."
    },
    {
      name: "05 / REACT / ANGULAR",
      desc: "Sistemas de interfaz escalables para productos y plataformas que necesitan una arquitectura más allá de la presentación estática."
    },
    {
      name: "06 / PYTHON",
      desc: "Soporte para herramientas computacionales, automatización, flujos de trabajo visuales y entornos técnicamente exigentes."
    },
    {
      name: "07 / WEB PERFORMANCE",
      desc: "Optimización, equilibrio de renderizado y fluidez perceptiva para experiencias que deben sentirse costosas y veloces."
    },
    {
      name: "08 / CREATIVE SYSTEMS",
      desc: "No solo herramientas, sino orquestación: cómo tipografía, código, sincronización y atmósfera trabajan juntos."
    }
  ];

  return (
    <section id="arsenal" className="relative py-[var(--space-xl)] lg:py-[var(--space-xxl)] px-[5vw] flex flex-col justify-start">
      <div className="w-full max-w-[1400px] mx-auto">
        <span className="font-mono text-xs uppercase tracking-[2px] text-[var(--accent-dim)] block mb-[var(--space-sm)]">
          06 / Stack
        </span>
        <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1.15] mb-[var(--space-md)] text-[var(--text)]">
          El Arsenal
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 mt-16 md:mt-24">
          {arsenal.map((tech, i) => {
            const [num, title] = tech.name.split(' / ');
            
            // Lógica de Bento Grid
            let spanClasses = "col-span-1";
            if (num === "01") spanClasses = "md:col-span-2 md:row-span-2"; // THREE.JS (Grande)
            else if (num === "02") spanClasses = "md:col-span-2"; // GSAP (Ancho)
            else if (num === "05") spanClasses = "md:col-span-2"; // REACT (Ancho)
            else if (num === "08") spanClasses = "md:col-span-4"; // CREATIVE SYSTEMS (Hero bottom)
            
            return (
              <div 
                key={i} 
                data-cursor="CORE"
                className={`p-8 md:p-10 border border-[var(--border)] bg-[rgba(255,255,255,0.01)] backdrop-blur-md transition-all duration-500 hover:bg-white hover:text-black hover:-translate-y-1 flex flex-col ${spanClasses}`}
              >
                <div className="flex items-start mb-6 md:mb-12">
                  <span className="font-mono text-[12px] tracking-[1px] uppercase text-[var(--accent-dim)] group-hover:text-black/50 mr-6 font-variant-numeric-tabular-nums">
                    {num}
                  </span>
                  <h3 className={`font-mono tracking-[1px] uppercase group-hover:text-black ${num === '01' ? 'text-2xl md:text-3xl font-light' : 'text-[12px]'}`}>
                    {title}
                  </h3>
                </div>
                <p className={`font-body leading-[1.75] opacity-80 group-hover:opacity-100 font-light mt-auto ${num === '01' || num === '08' ? 'text-lg md:text-xl max-w-2xl' : 'text-[0.95rem]'}`}>
                  {tech.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
