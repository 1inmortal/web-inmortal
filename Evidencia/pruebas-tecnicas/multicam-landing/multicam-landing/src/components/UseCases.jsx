import React from 'react';

const UseCases = () => {
    const cases = [
        {
            title: "Protección Perimetral Activa",
            tag: "Industria / Plantas",
            problem: "Detección tardía de intrusos. Demasiado ruido por animales o vegetación.",
            solution: "La IA discrimina el movimiento no humano y alerta solo cuando una persona cruza el límite.",
            result: "90% de reducción en falsas alarmas. Respuesta de guardias en segundos."
        },
        {
            title: "Merodeo Fuera de Horario",
            tag: "CEDIS / Logística",
            problem: "Robo hormiga y vehículos sospechosos en áreas de carga durante la noche.",
            solution: "Monitoreo inteligente con visión nocturna optimizada. Activación de alertas por persistencia en zona.",
            result: "Prevención de pérdidas y registro automatizado de placas o vehículos sospechosos."
        },
        {
            title: "Validación Visual Remota",
            tag: "Multi-Sucursal",
            problem: "Personal remoto ciego ante activaciones de sensores tradicionales. Falsos envíos de patrullas.",
            solution: "Dashboard centralizado unifica múltiples sedes con latencia sub-segundo real.",
            result: "0 despachos de emergencia innecesarios. Verificación visual al instante del evento."
        }
    ];

    return (
        <section id="casos" className="py-20 md:py-24 bg-[#0a0a0a] border-t border-white/5 relative">
            <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 px-2">Casos de Uso Comprobados</h2>
                    <p className="text-gray-400 text-sm md:text-base px-4">Escenarios reales donde convertimos cámaras pasivas en acción preventiva operativa.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {cases.map((c, i) => (
                        <div key={i} className="bg-surface border border-white/10 rounded-xl p-8 hover:border-primary/30 transition-colors group">
                            <span className="text-xs font-mono text-primary px-2 py-1 bg-primary/10 rounded border border-primary/20 mb-4 inline-block">{c.tag}</span>
                            <h3 className="text-xl font-bold mb-6 text-gray-100">{c.title}</h3>
                            <div className="space-y-5">
                                <div>
                                    <h4 className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div> El Problema
                                    </h4>
                                    <p className="text-sm text-gray-400">{c.problem}</p>
                                </div>
                                <div className="pl-3 border-l-2 border-white/5">
                                    <h4 className="text-[10px] uppercase text-primary font-bold tracking-wider mb-1">La Solución MultiCam</h4>
                                    <p className="text-sm text-gray-300">{c.solution}</p>
                                </div>
                                <div className="pt-4 border-t border-white/10 bg-green-900/10 -mx-8 -mb-8 p-6 rounded-b-xl border-t-green-500/20 group-hover:bg-green-900/20 transition-colors">
                                    <h4 className="text-[10px] uppercase text-green-400 font-bold tracking-wider mb-1">Impacto Verificado</h4>
                                    <p className="text-sm font-bold text-green-50">{c.result}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default UseCases;
