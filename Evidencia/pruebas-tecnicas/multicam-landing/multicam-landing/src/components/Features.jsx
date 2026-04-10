import React, { useEffect, useRef } from 'react';

const Features = () => {
    const features = [
        {
            title: "Monitoreo en Tiempo Real",
            desc: "Latencia sub-segundo para respuesta inmediata. Visualiza lo que sucede justo en este milisegundo, sin retrasos de NVRs tradicionales.",
            icon: "⚡",
            color: "text-primary",
            border: "hover:border-primary/50"
        },
        {
            title: "Operación Continua 24/7",
            desc: "Sistema supervisor autoreparable que garantiza el 99.9% de actividad de grabación frente a caídas de red local, cámara o cortes menores.",
            icon: "🛡️",
            color: "text-secondary",
            border: "hover:border-secondary/50"
        },
        {
            title: "Filtrado de Falsos Positivos",
            desc: "IA calibrada on-premise que identifica personas y vehículos de forma consistente, omitiendo eficientemente notificaciones por ramas, iluminación o ruido infrarrojo.",
            icon: "👁️",
            color: "text-blue-400",
            border: "hover:border-blue-400/50"
        },
        {
            title: "Acceso Remoto Protegido",
            desc: "Audita tu planta desde cualquier ubicación mediante túneles inversos. Sin abrir puertos ni exponer vulnerabilidades a ataques de red.",
            icon: "🌐",
            color: "text-orange-400",
            border: "hover:border-orange-400/50"
        },
        {
            title: "Retención Inteligente de Evidencia",
            desc: "El sistema organiza el disco autónomamente, purgando secuencias antiguas sin valor para preservar evidencias de seguridad en alta resolución.",
            icon: "📂",
            color: "text-green-400",
            border: "hover:border-green-400/50"
        },
        {
            title: "Centro de Comando Unificado",
            desc: "Dashboard de categoría Enterprise. Centraliza la búsqueda de eventos estructurados para agilizar el tiempo de respuesta de los equipos de seguridad.",
            icon: "⚙️",
            color: "text-purple-400",
            border: "hover:border-purple-400/50"
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-[#050505] relative z-10 w-full overflow-hidden">
             {/* Subtle background gradient line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Diseñado para la <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Operación</span></h2>
                    <p className="text-lg md:text-xl text-gray-500 font-mono tracking-tight uppercase">Resultados &gt; Especificaciones</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {features.map((feat, index) => (
                        <div 
                            key={index} 
                            className={`glass-panel p-8 transition-all duration-300 transform hover:-translate-y-2 border border-white/5 ${feat.border} group`}
                        >
                            <div className={`text-4xl mb-6 ${feat.color} drop-shadow-md`}>{feat.icon}</div>
                            <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-white transition-colors text-gray-200">{feat.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                {feat.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
