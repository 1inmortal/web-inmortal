import React from 'react';

export default function Special() {
  return (
    <section id="special" className="relative py-[var(--space-xl)] lg:py-[var(--space-xxl)] px-[5vw] flex flex-col justify-start">
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[var(--space-xl)]">
        
        {/* Movimiento */}
        <div>
          <span className="font-mono text-xs uppercase tracking-[2px] text-[var(--accent-dim)] block mb-[var(--space-sm)]">
            09 / Movimiento
          </span>
          <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] leading-[1.15] mb-[var(--space-md)] text-[var(--text)]">
            Lenguaje de Movimiento
          </h2>
          <p className="font-body text-[1.1rem] leading-[1.75] opacity-80 font-light text-[var(--text)] mb-[var(--space-md)]">
            El movimiento se trata como arquitectura, no como decoración. Establece cadencia, revela información progresivamente y da lógica física a la interfaz.<br/><br/>
            Una experiencia digital premium nunca debe sentirse brusca. Debe desplegarse. El sistema de movimiento crea continuidad entre secciones, reduce fricción y le da a todo el sitio un ritmo cinematográfico compuesto.
          </p>
          <ul className="list-none border-t border-[var(--border)] pt-4">
            {['Revelaciones lentas sobre entradas llamativas', 'Profundidad sobre trucos baratos', 'Comportamiento del cursor como atmósfera', 'Scroll como dispositivo narrativo', 'Hover como confirmación, no como distracción'].map((item, i) => (
              <li key={i} className="font-mono text-xs py-4 border-b border-[var(--border)] tracking-[1px] opacity-70 flex items-center">
                <span className="text-[var(--accent)] mr-4">+</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Laboratorio Visual */}
        <div>
          <span className="font-mono text-xs uppercase tracking-[2px] text-[var(--accent-dim)] block mb-[var(--space-sm)]">
            10 / I&D
          </span>
          <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] leading-[1.15] mb-[var(--space-md)] text-[var(--text)]">
            Laboratorio Visual
          </h2>
          <p className="font-body text-[1.1rem] leading-[1.75] opacity-80 font-light text-[var(--text)] mb-[var(--space-md)]">
            Un espacio curado para exploraciones en partículas, movimiento tipográfico, simulaciones de profundidad, escultura de interfaces y atmósfera digital. Esta sección presenta experimentos selectos que demuestran rango más allá de la composición web convencional.
          </p>
          <ul className="list-none border-t border-[var(--border)] pt-4">
            {['Estudios de campos de partículas', 'Experimentos de deformación tipográfica', 'Composiciones de velocidad de scroll', 'Sistemas materiales de cristal', 'Pruebas de interacción de luz y profundidad', 'Fragmentos de interfaces editoriales'].map((item, i) => (
              <li key={i} className="font-mono text-xs py-4 border-b border-[var(--border)] tracking-[1px] opacity-70 flex items-center">
                <span className="text-[var(--accent)] mr-4">+</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
