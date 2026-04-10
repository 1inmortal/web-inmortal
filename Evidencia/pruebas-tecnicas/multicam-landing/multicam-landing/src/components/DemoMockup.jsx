import React, { useEffect, useRef } from 'react';

const DemoMockup = () => {
    const mockupRef = useRef(null);

    useEffect(() => {
        Promise.all([
            import('gsap'),
            import('gsap/ScrollTrigger')
        ]).then(([{ gsap }, { default: ScrollTrigger }]) => {
            gsap.registerPlugin(ScrollTrigger);

            gsap.fromTo(mockupRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: mockupRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }).catch(err => console.error("GSAP load error", err));
    }, []);

    return (
        <section id="como-funciona" className="py-20 md:py-24 relative bg-[#03080a] overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6 relative z-10" ref={mockupRef}>
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 px-4">De Grabación Pasiva a Inteligencia Activa</h2>
                    <p className="text-gray-400 text-sm md:text-lg px-6 leading-relaxed">La diferencia real entre revisar horas de video vacío buscando un incidente, y recibir una notificación táctica en el milisegundo exacto en que la cámara detecta a un intruso.</p>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8 items-stretch max-w-6xl mx-auto">
                    {/* Before */}
                    <div className="flex-1 rounded-xl border border-white/10 bg-[#050505] overflow-hidden flex flex-col relative opacity-90 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="absolute top-4 left-4 bg-gray-800 text-gray-300 text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded border border-gray-600 z-20">Antes: CCTV Tradicional</div>
                        <div className="grid grid-cols-2 gap-1 p-2 flex-1 bg-black opacity-60 min-h-[300px]">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="bg-gray-900 border border-white/5 relative flex items-center justify-center">
                                    <span className="text-gray-700 font-mono text-[10px]">NO_EVENT REC_0{i}</span>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 md:p-8 bg-[#0a0a0a] border-t border-white/5">
                            <ul className="space-y-4 text-sm text-gray-500 font-mono">
                                <li className="flex gap-3"><span className="text-red-900 font-bold">✕</span> Monitoreo humano 100% propenso a fatiga visual</li>
                                <li className="flex gap-3"><span className="text-red-900 font-bold">✕</span> Falsas alarmas por movimiento de sombras o viento</li>
                                <li className="flex gap-3"><span className="text-red-900 font-bold">✕</span> Búsqueda forense lenta (revisar horas de video)</li>
                            </ul>
                        </div>
                    </div>

                    {/* After */}
                    <div className="flex-1 rounded-xl border border-primary/50 bg-[#000a12] overflow-hidden flex flex-col relative shadow-[0_0_40px_rgba(0,242,255,0.15)] transform lg:-translate-y-4 z-10 ring-1 ring-white/10">
                        <div className="absolute top-4 left-4 bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded border border-primary/50 z-20 shadow-[0_0_10px_rgba(0,242,255,0.5)]">Después: MultiCam AI</div>
                        <div className="p-2 flex-1 relative bg-black min-h-[300px]">
                            {/* Fake Stream with Detections */}
                            <div className="h-full w-full border border-primary/20 relative overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 to-black">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
                                
                                {/* Bounding Box Intruso */}
                                <div className="absolute top-1/4 left-1/3 w-32 h-48 border border-secondary shadow-[inset_0_0_20px_rgba(241,16,78,0.2)] bg-secondary/5 flex flex-col justify-start items-start">
                                    <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-secondary"></div>
                                    <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-secondary"></div>
                                    <span className="bg-secondary text-white text-[9px] font-bold px-1 m-[-1px] tracking-wider whitespace-nowrap shadow-lg">PERSONA: 98%</span>
                                </div>
                                
                                {/* Bounding Box Vehiculo */}
                                <div className="absolute bottom-1/4 right-1/4 w-32 h-24 border border-primary shadow-[inset_0_0_20px_rgba(0,242,255,0.2)] bg-primary/5 flex flex-col justify-start items-start transition-all opacity-80 hover:opacity-100">
                                    <span className="bg-primary text-black text-[9px] font-bold px-1 m-[-1px] tracking-wider whitespace-nowrap shadow-lg">VEHÍCULO: 85%</span>
                                </div>

                                {/* OSD Info */}
                                <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                                    <span className="px-2 py-1 bg-red-600/90 text-white text-[9px] font-bold rounded flex items-center gap-1.5 backdrop-blur-sm border border-red-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div> INTRUSIÓN COMPROBADA
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 md:p-8 bg-[#00141e] border-t border-primary/30 relative overflow-hidden">
                            <div className="absolute inset-0 bg-primary/5 blur-2xl"></div>
                            <ul className="space-y-4 text-sm text-gray-200 font-mono relative z-10">
                                <li className="flex gap-3 text-primary"><span className="text-primary font-bold">✓</span> Auditoría en segundos con filtros de IA On-Premise</li>
                                <li className="flex gap-3 text-primary"><span className="text-primary font-bold">✓</span> Reducción drástica del ruido visual, notificaciones priorizadas</li>
                                <li className="flex gap-3 text-primary"><span className="text-primary font-bold">✓</span> Dashboard unificado para reacción técnica instantánea</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DemoMockup;
