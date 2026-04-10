import React, { useEffect, useRef } from 'react';


const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues if ever converted to Next.js
    import('gsap').then(({ gsap }) => {
        const tl = gsap.timeline();
        
        tl.fromTo(".hero-badge", 
          { y: -50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(".hero-title span", 
          { y: 100, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "back.out(1.7)" },
          "-=0.4"
        )
        .fromTo(".hero-desc", 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(".hero-btn", 
          { scale: 0.8, opacity: 0 }, 
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(2)" },
          "-=0.2"
        );

        // Ambient background animation
        gsap.to(".ambient-glow", {
            x: "10vw",
            y: "5vh",
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-16 overflow-hidden">
        {/* Ambient Effects - Scaled down for mobile */}
        <div className="absolute top-1/4 left-1/4 w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-primary/10 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen ambient-glow pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] md:w-[30vw] h-[50vw] md:h-[30vw] bg-secondary/10 rounded-full blur-[70px] md:blur-[100px] mix-blend-screen ambient-glow pointer-events-none" style={{ animationDelay: '-5s' }}></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            <div className="inline-block mb-6 px-3 md:px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-[10px] md:text-sm uppercase tracking-widest hero-badge backdrop-blur-sm shadow-[0_0_15px_rgba(0,242,255,0.1)]">
                Inteligencia Operacional para Industria
            </div>
            
            <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
                <span className="block mb-1 md:mb-2">Inteligencia Artificial</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary pb-1 md:pb-2">
                    Para tus Cámaras Actuales
                </span>
            </h1>
            
            <p className="hero-desc text-base md:text-xl text-gray-400 max-w-2xl md:max-w-3xl mx-auto mb-10 font-light leading-relaxed px-2 md:px-0">
                Convierte tu circuito cerrado pasivo (CCTV) en un sistema activo de detección, monitoreo y respuesta en tiempo real. Cero reemplazo de hardware.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">
                <button className="w-full sm:w-auto hero-btn group relative px-8 py-4 bg-primary text-background font-bold uppercase tracking-wider rounded-lg overflow-hidden transition-all hover:shadow-[0_0_25px_rgba(0,242,255,0.4)] text-sm md:text-base">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Solicitar Piloto
                        <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></div>
                </button>
                
                <button className="w-full sm:w-auto hero-btn px-8 py-4 bg-surface border border-white/10 text-white font-bold uppercase tracking-wider rounded-lg hover:bg-white/5 transition-colors text-sm md:text-base">
                    Ver Casos de Uso
                </button>
            </div>
        </div>

        {/* Tactical Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
    </section>
  );
};

export default Hero;
