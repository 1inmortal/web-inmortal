import React from 'react';

const Compatibility = () => {
    return (
        <section className="py-20 md:py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
             <div className="absolute top-1/2 left-0 w-full h-[500px] bg-secondary/5 blur-[150px] -translate-y-1/2 pointer-events-none"></div>
             <div className="container mx-auto px-4 md:px-6 relative z-10">
                 <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Integración Agnostica, Despliegue Inmediato</h2>
                        <p className="text-gray-400 mb-8 leading-relaxed text-sm md:text-base">MultiCam OS está diseñado para superponerse a tu infraestructura de seguridad actual. Si tu cámara transmite por red local, nosotros la volvemos extremadamente inteligente en menos de 24 horas.</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <div className="p-5 bg-white/5 border border-white/10 rounded-lg transform hover:-translate-y-1 transition-transform">
                                <h4 className="font-bold text-base md:text-lg mb-3 flex items-center gap-2 tracking-tight"><span className="text-primary">⚡</span> Protocolos Base</h4>
                                <ul className="text-xs md:text-sm text-gray-500 space-y-2 list-disc pl-4 marker:text-gray-700">
                                    <li>Streams RTSP / RTMP</li>
                                    <li>Estandar ONVIF Perfil S/T</li>
                                    <li>Conexión HTTP/S Directa</li>
                                </ul>
                            </div>
                            <div className="p-5 bg-white/5 border border-white/10 rounded-lg transform hover:-translate-y-1 transition-transform">
                                <h4 className="font-bold text-base md:text-lg mb-3 flex items-center gap-2 tracking-tight"><span className="text-secondary">🔌</span> Hardware Soportado</h4>
                                <ul className="text-xs md:text-sm text-gray-500 space-y-2 list-disc pl-4 marker:text-gray-700">
                                    <li>DVRs Analógicos (vía Red)</li>
                                    <li>NVRs Comerciales/Legacy</li>
                                    <li>Cámaras IP Autónomas</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="lg:w-1/2 w-full">
                        <div className="glass-panel p-6 md:p-10 border-t-2 border-t-primary/50">
                            <h3 className="text-xl font-bold mb-8 border-b border-white/10 pb-4 text-white">Cronograma del Piloto</h3>
                            <div className="space-y-8 relative">
                                {/* Timeline line */}
                                <div className="absolute left-4 top-4 bottom-4 w-px bg-white/10"></div>
                                
                                <div className="flex gap-4 md:gap-6 relative z-10">
                                    <div className="w-8 h-8 rounded-full bg-surface border border-primary/50 text-primary flex items-center justify-center font-bold shrink-0 shadow-[0_0_15px_rgba(0,242,255,0.3)] text-sm">1</div>
                                    <div>
                                        <h4 className="font-bold text-gray-200 text-sm md:text-base">Auditoría (Día 1)</h4>
                                        <p className="text-xs md:text-sm text-gray-500 mt-1 leading-relaxed">Evaluación de accesos RTSP, anchos de banda y viabilidad técnica local.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 md:gap-6 relative z-10">
                                    <div className="w-8 h-8 rounded-full bg-surface border border-primary/50 text-primary flex items-center justify-center font-bold shrink-0 shadow-[0_0_15px_rgba(0,242,255,0.3)] text-sm">2</div>
                                    <div>
                                        <h4 className="font-bold text-gray-200 text-sm md:text-base">Arranque Núcleo (Día 2)</h4>
                                        <p className="text-xs md:text-sm text-gray-500 mt-1 leading-relaxed">Enlace estricto con cámaras. <span className="text-primary font-bold">Sin Downtime operativo.</span></p>
                                    </div>
                                </div>
                                <div className="flex gap-4 md:gap-6 relative z-10">
                                    <div className="w-8 h-8 rounded-full bg-primary text-background flex items-center justify-center font-bold shrink-0 shadow-[0_0_20px_rgba(0,242,255,0.6)] text-sm">3</div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm md:text-base">Calibración (Días 3-5)</h4>
                                        <p className="text-xs md:text-sm text-gray-500 mt-1 leading-relaxed">Ajuste in situ de la IA y entrega de tablero operativo demostrando valor inmediato.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
             </div>
        </section>
    );
};
export default Compatibility;
