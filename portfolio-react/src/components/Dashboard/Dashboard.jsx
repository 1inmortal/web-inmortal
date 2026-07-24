import React, { useState } from 'react';

export default function Dashboard() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "¿Qué tipo de proyectos asumes?",
      a: "Me centro en experiencias digitales premium donde la presencia visual, la calidad del movimiento y la claridad estructural importan tanto como la funcionalidad."
    },
    {
      q: "¿Trabajas solo con marcas de lujo?",
      a: "No. Trabajo con cualquier marca, fundador o equipo que valore una ejecución digital elevada y comprenda el poder de una presentación refinada."
    },
    {
      q: "¿Esto es solo diseño o ejecución completa?",
      a: "Ambos. El diseño sin ejecución es solo una teoría. La ejecución sin dirección es ruido. Yo proporciono la visión estética y la ingeniería frontend para construirla."
    }
  ];

  return (
    <section id="faq" className="relative py-[var(--space-xl)] lg:py-[var(--space-xxl)] px-[5vw] flex flex-col justify-start">
      <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-[var(--space-xl)]">
        
        {/* Audiencia */}
        <div>
          <span className="font-mono text-xs uppercase tracking-[2px] text-[var(--accent-dim)] block mb-[var(--space-sm)]">
            11 / Audiencia
          </span>
          <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] leading-[1.15] mb-[var(--space-md)] text-[var(--text)]">
            Creado Para
          </h2>
          <p className="font-body text-[1.1rem] leading-[1.75] opacity-80 font-light text-[var(--text)] mb-[var(--space-md)]">
            Para marcas de lujo, startups ambiciosas, fundadores estratégicos, firmas creativas y equipos de producto que entienden que la presencia digital ya no es un envoltorio — es parte de la marca en sí misma.
          </p>
          <ul className="list-none border-t border-[var(--border)] pt-4">
            {['Marcas de lujo y moda', 'Comercio de alta gama', 'SaaS guiados por el diseño', 'Compañías dirigidas por fundadores', 'Estudios creativos', 'Lanzamientos de productos y campañas'].map((item, i) => (
              <li key={i} className="font-mono text-xs py-4 border-b border-[var(--border)] tracking-[1px] opacity-70 flex items-center">
                <span className="text-[var(--accent)] mr-4">+</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <span className="font-mono text-xs uppercase tracking-[2px] text-[var(--accent-dim)] block mb-[var(--space-sm)]">
            12 / Consultas
          </span>
          <h2 className="font-display text-[clamp(2.5rem,4vw,4rem)] leading-[1.15] mb-[var(--space-md)] text-[var(--text)]">
            FAQ Estratégico
          </h2>
          
          <div className="mt-[var(--space-md)]">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[var(--border)] cursor-pointer" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <div className="py-8 flex justify-between items-center transition-colors hover:text-[var(--accent-dim)]">
                  <span className="font-display text-[1.8rem] text-[var(--text)]">{faq.q}</span>
                  <span className={`font-mono text-xl font-light transition-transform duration-500 ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
                </div>
                <div 
                  className="overflow-hidden transition-all duration-500 ease-in-out" 
                  style={{ maxHeight: openIndex === i ? '600px' : '0' }}
                >
                  <p className="font-body text-[1.1rem] leading-[1.6] opacity-80 font-light pb-8 max-w-2xl text-[var(--text)]">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
