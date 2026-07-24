import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrada elegante (Algorithmic Luxury fade-in)
      gsap.fromTo('.reveal-line', 
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.5, stagger: 0.15, ease: 'power4.out', delay: 0.2 }
      );
      
      gsap.fromTo('.fade-in-element',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: 'power3.out', delay: 0.8 }
      );

      // Parallax sutil al hacer scroll
      gsap.to('.hero-content', {
        y: '20%',
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="boot-sequence"
      className="relative h-screen min-h-[800px] flex flex-col justify-end pb-[var(--space-xl)] px-[5vw] overflow-hidden"
    >
      
      <div className="hero-content relative z-10 w-full max-w-[1400px] mx-auto flex flex-col justify-end h-full pt-[var(--space-xxl)]">
        
        {/* Títulos gigantes (Algorithmic Luxury) */}
        <div className="flex flex-col mb-[var(--space-xl)]">
          <div className="overflow-hidden">
            <h1 className="reveal-line font-display text-[clamp(4rem,14vw,12rem)] leading-[0.85] font-light text-[var(--text)]">
              Inmersivo
            </h1>
          </div>
          <div className="overflow-hidden pl-[5vw]">
            <h1 className="reveal-line font-display text-[clamp(4rem,14vw,12rem)] leading-[0.85] font-light italic text-[var(--text)]">
              Digital
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="reveal-line font-display text-[clamp(4rem,14vw,12rem)] leading-[0.85] font-light text-[var(--text)]">
              Arquitectura
            </h1>
          </div>
        </div>

        {/* Subtítulo */}
        <p className="fade-in-element font-body text-[clamp(1rem,1.5vw,1.25rem)] font-light leading-[1.75] text-[var(--text-muted)] max-w-2xl mb-[var(--space-md)]">
          Construyendo experiencias digitales de alto rendimiento para marcas de lujo, fundadores ambiciosos y productos futuristas que exigen elegancia, velocidad y precisión.
        </p>

        {/* Firma / Tags */}
        <div className="fade-in-element font-mono text-[10px] tracking-[3px] text-[var(--accent-dim)] uppercase mt-[var(--space-lg)] md:absolute md:bottom-0 md:right-12 md:mt-0">
          [ SISTEMAS CREATIVOS / DIRECCIÓN / EXPERIENCIA ]
        </div>
        
      </div>
      
    </section>
  );
}
