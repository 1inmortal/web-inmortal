import React from 'react';

export default function Profile() {
  return (
    <section id="profile" className="relative py-[var(--space-xl)] lg:py-[var(--space-xxl)] px-[5vw] flex flex-col justify-start">
      <div className="w-full max-w-[1400px] mx-auto">
        
        {/* Positioning */}
        <div className="mb-[var(--space-xxl)]">
          <span className="font-mono text-xs uppercase tracking-[2px] text-[var(--accent-dim)] block mb-[var(--space-sm)]">
            01 / Posicionamiento
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1.15] mb-[var(--space-md)] text-[var(--text)]">
            Lo que Construyo
          </h2>
          <p className="font-body text-[clamp(1.2rem,2vw,1.8rem)] leading-[1.75] max-w-[800px] text-[var(--text)] opacity-80 font-light mb-[var(--space-md)]">
            Creo entornos digitales premium para marcas y productos que necesitan más que usabilidad. Diseño interfaces que comunican estatus, claridad y confianza — desde comercio de lujo y páginas de aterrizaje inmersivas hasta paneles estratégicos y sistemas visuales para empresas de alto crecimiento.<br/><br/>
            Esto no es diseño de plantillas. Cada sistema se construye para alinear la identidad visual, el comportamiento de movimiento y la lógica estructural en una experiencia única y coherente.
          </p>
        </div>

        {/* Expertise / Principles */}
        <div>
          <span className="font-mono text-xs uppercase tracking-[2px] text-[var(--accent-dim)] block mb-[var(--space-sm)]">
            02 / Filosofía
          </span>
          <h2 className="font-display text-[clamp(2.5rem,5vw,5rem)] leading-[1.15] mb-[var(--space-md)] text-[var(--text)]">
            Principios de Diseño
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mt-[var(--space-md)]">
            <div>
              <h3 className="font-mono text-sm mb-[var(--space-sm)] text-[var(--accent)] uppercase tracking-[1px] leading-[1.15]">Precisión</h3>
              <p className="font-body text-base leading-[1.75] opacity-70 font-light text-[var(--text)]">
                Cada línea, desplazamiento, transición y superficie existe por una razón. La decoración sin intención estructural no tiene cabida aquí.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-sm mb-[var(--space-sm)] text-[var(--accent)] uppercase tracking-[1px] leading-[1.15]">Contención</h3>
              <p className="font-body text-base leading-[1.75] opacity-70 font-light text-[var(--text)]">
                El lujo es a menudo el resultado de la sustracción. La ausencia de ruido visual crea espacio para tensión, contraste y significado.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-sm mb-[var(--space-sm)] text-[var(--accent)] uppercase tracking-[1px] leading-[1.15]">Movimiento con Propósito</h3>
              <p className="font-body text-base leading-[1.75] opacity-70 font-light text-[var(--text)]">
                La animación no es espectáculo por defecto. Debe orientar, revelar, marcar ritmo y reforzar la jerarquía.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-sm mb-[var(--space-sm)] text-[var(--accent)] uppercase tracking-[1px] leading-[1.15]">Pensamiento Sistémico</h3>
              <p className="font-body text-base leading-[1.75] opacity-70 font-light text-[var(--text)]">
                El trabajo visual sólido no es solo composición. Es la capacidad de conectar tipografía, diseño, interactividad e ingeniería en un marco coherente.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
