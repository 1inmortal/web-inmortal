import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const numRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    
    // Array de textos a mostrar
    const texts = [
      "INICIALIZANDO COMPOSICIÓN ESPACIAL",
      "CARGANDO SISTEMA DE MOVIMIENTO",
      "CALIBRANDO PROFUNDIDAD VISUAL",
      "PREPARANDO INTERFAZ INMERSIVA"
    ];

    let ctx = gsap.context(() => {
      // 1. Animación del contador de 0 a 100
      gsap.to({ val: 0 }, {
        val: 100,
        duration: 3,
        ease: "power2.inOut",
        onUpdate: function() {
          if (isMounted) setProgress(Math.floor(this.targets()[0].val));
        }
      });

      // 2. Animación de la barra de progreso
      gsap.to('.loader-bar-fill', {
        width: '100%',
        duration: 3,
        ease: "power2.inOut",
      });

      // 3. Rotación de textos
      const tl = gsap.timeline();
      texts.forEach((text, i) => {
        tl.to(textRef.current, {
          y: -i * 20, // Sube 20px (la altura de una línea) por cada texto
          duration: 0.5,
          delay: i === 0 ? 0 : 0.25, // Pausa breve entre cambios
          ease: "power3.inOut"
        });
      });

      // 4. Fade out total y desmontaje
      gsap.to(containerRef.current, {
        opacity: 0,
        y: '-100%', // Slide up estilo telón
        duration: 1,
        delay: 3.2,
        ease: "power4.inOut",
        onComplete: () => {
          if (isMounted && onComplete) onComplete();
        }
      });

    }, containerRef);

    return () => {
      isMounted = false;
      ctx.revert();
    };
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[1000] bg-[#050505] flex flex-col justify-center items-center font-mono"
    >
      {/* Número gigante */}
      <div 
        ref={numRef} 
        className="text-[clamp(4rem,8vw,8rem)] font-light tracking-[-2px] text-[var(--text)]"
      >
        {progress.toString().padStart(2, '0')}
      </div>

      {/* Textos rotativos */}
      <div className="h-[20px] overflow-hidden mt-4">
        <div ref={textRef} className="text-[10px] md:text-xs uppercase tracking-[2px] text-[var(--accent-dim)] text-center flex flex-col px-4">
          <span className="h-[20px] leading-[20px]">INICIALIZANDO COMPOSICIÓN ESPACIAL</span>
          <span className="h-[20px] leading-[20px]">CARGANDO SISTEMA DE MOVIMIENTO</span>
          <span className="h-[20px] leading-[20px]">CALIBRANDO PROFUNDIDAD VISUAL</span>
          <span className="h-[20px] leading-[20px]">PREPARANDO INTERFAZ INMERSIVA</span>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="w-[150px] md:w-[200px] h-[1px] bg-[rgba(255,255,255,0.1)] mt-8 overflow-hidden">
        <div className="loader-bar-fill h-full bg-white w-0"></div>
      </div>
    </div>
  );
}
