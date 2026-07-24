import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  const text = "Creo en la precisión sobre el ruido. Diseño sistemas digitales donde el rendimiento, la elegancia y la lógica estructural crean estatus innegable.";
  const words = text.split(' ');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.manifesto-word',
        { opacity: 0, y: 50, rotateX: -20 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 1.2, 
          stagger: 0.05, 
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
    <section 
      ref={containerRef} 
      id="manifesto" 
      className="relative py-[var(--space-xxl)] px-[5vw] flex items-center min-h-[70vh] border-b border-[var(--border)]"
    >
      <div className="w-full max-w-[1200px] mx-auto text-center">
        <span className="font-mono text-xs uppercase tracking-[2px] text-[var(--accent-dim)] block mb-[var(--space-lg)]">
          00 / Core Directive
        </span>
        
        <div ref={textRef} className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-[1.25] text-[var(--text)] font-light">
          {words.map((word, i) => (
            <span 
              key={i} 
              className="manifesto-word inline-block mr-[clamp(0.5rem,1vw,1rem)] mb-[clamp(0.5rem,1vw,1rem)]"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
