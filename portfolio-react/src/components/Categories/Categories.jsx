import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categoriesData = [
  { id: '01', title: 'FRONTEND ARCHITECTURE', desc: 'React, Vue, WebGL, Complex UIs.' },
  { id: '02', title: 'SYSTEMS BACKEND', desc: 'Node.js, Python, Rust, Microservices.' },
  { id: '03', title: 'AI & DATA PIPELINES', desc: 'TensorFlow, LLM Integration, Data Engineering.' },
  { id: '04', title: 'CREATIVE CODING', desc: 'Three.js, GLSL Shaders, Interactive Experiences.' },
];

export default function Categories() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    
    // Calcular cuánto debe moverse (ancho total del track menos ancho de la ventana)
    const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

    const tween = gsap.to(track, {
      x: getScrollAmount,
      ease: "none"
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full overflow-hidden bg-[#020304] relative flex items-center">
      
      {/* Background decorations */}
      <div className="absolute top-10 left-10 font-mono text-xs text-[#30363d] uppercase">
        MODULES_LOADED
      </div>

      <div ref={trackRef} className="flex gap-20 px-20 items-center w-[max-content]">
        {categoriesData.map((cat, index) => (
          <div key={index} className="w-[60vw] md:w-[40vw] flex-shrink-0 relative group" data-cursor="EXPLORE">
            {/* Outline Box */}
            <div className="border border-[#30363d] bg-[#0d1117]/50 backdrop-blur aspect-video p-8 flex flex-col justify-between transition-all duration-500 group-hover:border-[#58a6ff]">
              
              {/* Header */}
              <div className="flex justify-between items-start font-mono text-xs">
                <span className="text-[#6e7681]">VOL.{cat.id}</span>
                <span className="text-[#3fb950] opacity-0 group-hover:opacity-100 transition-opacity">ACTIVE</span>
              </div>
              
              {/* Content */}
              <div>
                <h3 className="font-display text-3xl md:text-5xl text-[#c9d1d9] mb-4 group-hover:text-white transition-colors">
                  {cat.title}
                </h3>
                <p className="font-mono text-sm text-[#6e7681]">
                  {cat.desc}
                </p>
              </div>
            </div>
            
            {/* Visual connecting lines */}
            <div className="absolute top-1/2 -right-20 w-20 h-px bg-[#30363d] hidden md:block"></div>
          </div>
        ))}
      </div>
      
    </section>
  );
}
