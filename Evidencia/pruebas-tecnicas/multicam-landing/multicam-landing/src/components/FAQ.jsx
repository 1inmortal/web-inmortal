import React, { useState } from 'react';

const FAQ = () => {
    const questions = [
        { 
            q: "¿El sistema obliga a cambiar las cámaras analógicas e IP actuales?", 
            a: "No es necesario. El gran diferenciador de MultiCam OS es su naturaleza agnóstica. Si tu DVR o NVR actual permite exportar flujos de red (RTSP/ONVIF), nuestro sistema las procesa y añade la capa de Inteligencia Artificial directamente sobre tus activos ya instalados, protegiendo tu inversión previa." 
        },
        { 
            q: "¿El video se envía a alguna nube externa para ser analizado?", 
            a: "Bajo ningún concepto. El diseño de la plataforma prioriza la privacidad B2B: es 100% On-Premise. El modelo de detección YOLOv8 reside exclusivamente en tu centro de datos local, brindándote soberanía completa sobre tus flujos de biometría visual." 
        },
        { 
            q: "¿Qué ocurre con la plataforma de vigilancia si nos quedamos sin Internet?", 
            a: "A diferencia de arquitecturas dependientes de nube pública, MultiCam OS cuenta con un robusto procesamiento local. Computa biometría y almacena registros forenses en el disco local ininterrumpidamente, disponibles para su auditoría inmediata al recuperar la conexión LAN." 
        },
        { 
            q: "¿Cuál es el modelo comercial y licenciamiento del software base?", 
            a: "Proveemos un licenciamiento anual corporativo que incluye la plataforma, actualizaciones regulares de modelos de IA y soporte técnico especializado. Se instala sobre infraestructura de servidor propio (CAPEX único en hardware) sin cobros ocultos por usuario conectado." 
        }
    ];

    return (
        <section className="py-24 bg-[#0a0a0a] border-t border-white/5 relative">
             <div className="absolute top-0 right-1/4 w-[500px] h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
             
             <div className="container mx-auto px-6 max-w-4xl relative z-10">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Despejemos tus Dudas Antes del Despliegue</h2>
                    <p className="text-gray-400">Respuestas rápidas para Comités de Tecnología y Operación Física.</p>
                 </div>
                 
                 <div className="space-y-5">
                     {questions.map((faq, idx) => (
                         <div key={idx} className="bg-surface border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all">
                             <div className="p-6 md:p-8 flex gap-4 md:gap-6">
                                 <div className="shrink-0 pt-1 text-primary font-mono font-bold text-xl opacity-80 mt-[-2px]">
                                     Q{idx + 1}.
                                 </div>
                                 <div>
                                     <h3 className="font-bold text-lg md:text-xl mb-3 text-white leading-tight">
                                         {faq.q}
                                     </h3>
                                     <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                         {faq.a}
                                     </p>
                                 </div>
                             </div>
                         </div>
                     ))}
                 </div>
             </div>
        </section>
    );
};
export default FAQ;
