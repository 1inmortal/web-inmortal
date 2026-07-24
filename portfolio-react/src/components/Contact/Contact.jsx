import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="relative h-screen flex flex-col justify-center items-center text-center px-6">
      <a 
        href="mailto:contact@example.com" 
        className="font-display text-[clamp(3rem,8vw,10rem)] leading-[1] text-[var(--text)] transition-all duration-500 hover:italic hover:tracking-[-2px] hover:scale-105 inline-block"
      >
        HABLEMOS
      </a>
      <p className="font-body text-[1.2rem] opacity-60 mt-8 max-w-[400px] mx-auto text-[var(--text)] font-light">
        Actualmente aceptando proyectos selectos y roles de liderazgo técnico para Q4 2026.
      </p>
    </section>
  );
}
