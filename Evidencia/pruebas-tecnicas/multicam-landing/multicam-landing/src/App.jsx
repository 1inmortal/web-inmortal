import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import Features from './components/Features';
import UseCases from './components/UseCases';
import DemoMockup from './components/DemoMockup';
import Compatibility from './components/Compatibility';
import FAQ from './components/FAQ';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add a subtle spotlight effect following the mouse for the entire page
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="bg-background min-h-screen text-text relative selection:bg-primary/30 overflow-x-hidden">
      {/* Global Mouse Spotlight - Hidden on mobile for performance */}
      <div 
        className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0,242,255,0.03), transparent 40%)`
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center border border-primary/50">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
            </div>
            <span className="font-bold text-lg md:text-xl font-mono tracking-wider">MultiCam<span className="text-primary">.ai</span></span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-sm font-mono text-gray-400">
            <a href="#casos" className="hover:text-primary transition-colors">CASOS DE USO</a>
            <a href="#seguridad" className="hover:text-primary transition-colors">SEGURIDAD</a>
            <a href="#como-funciona" className="hover:text-primary transition-colors">CÓMO FUNCIONA</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden sm:block px-5 py-2 text-xs md:text-sm font-bold bg-white text-black hover:bg-gray-200 transition-colors uppercase tracking-wider">
              Contactar Ventas
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu overlay */}
        <div className={`fixed inset-0 top-16 bg-[#0a0a0a] z-[90] transition-transform duration-300 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col p-8 gap-8 items-center text-center">
            <a href="#casos" onClick={() => setIsMenuOpen(false)} className="text-xl font-mono text-gray-300 hover:text-primary transition-colors">CASOS DE USO</a>
            <a href="#seguridad" onClick={() => setIsMenuOpen(false)} className="text-xl font-mono text-gray-300 hover:text-primary transition-colors">SEGURIDAD</a>
            <a href="#como-funciona" onClick={() => setIsMenuOpen(false)} className="text-xl font-mono text-gray-300 hover:text-primary transition-colors">CÓMO FUNCIONA</a>
            <hr className="w-full border-white/10" />
            <button className="w-full px-5 py-4 text-base font-bold bg-white text-black hover:bg-gray-200 transition-colors uppercase tracking-wider">
              Contactar Ventas
            </button>
          </div>
        </div>
      </nav>

      {/* Main Sections */}
      <main>
        <Hero />
        <Features />
        
        {/* Banner de Confianza - Proof of capability */}
        <section className="py-12 md:py-8 bg-surface border-y border-white/5 opacity-80 overflow-hidden">
            <div className="container mx-auto px-6">
                <p className="text-center text-[10px] md:text-xs text-gray-500 font-mono tracking-[0.2em] uppercase mb-8 md:mb-6">Arquitectura validada para operar entornos críticos</p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-20 opacity-50 grayscale">
                    <div className="text-sm md:text-lg font-bold font-mono tracking-tighter mix-blend-screen">LOGISTICS // CORP</div>
                    <div className="text-sm md:text-lg font-bold font-mono tracking-tighter mix-blend-screen">AERO • TECH</div>
                    <div className="text-sm md:text-lg font-bold font-mono tracking-tighter mix-blend-screen">GLOBAL_MANUFACTURING</div>
                    <div className="text-sm md:text-lg font-bold font-mono tracking-tighter mix-blend-screen">C.E.D.I.S 24/7</div>
                </div>
            </div>
        </section>

        <DemoMockup />
        
        {/* Caso de Éxito / Prueba Social */}
        <section className="py-16 md:py-24 bg-surface border-t border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] pointer-events-none"></div>
            <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
                    <div className="md:col-span-1 border-l-2 border-primary pl-4 md:pl-6">
                        <h3 className="text-[10px] font-bold font-mono text-gray-500 mb-2 uppercase tracking-widest">Caso de Éxito: Logística</h3>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white leading-tight">Centro de Distribución Nacional</h2>
                        <ul className="space-y-3 text-gray-400 text-sm font-mono mt-6">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> 45 Cámaras RTSP Analizadas</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Falsos positivos: -92%</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary"></div> Despliegue en 48 horas</li>
                        </ul>
                    </div>
                    <div className="md:col-span-2">
                        <div className="relative p-6 md:p-10 bg-white/5 border border-white/10 rounded-2xl italic text-base md:text-xl text-gray-300 leading-relaxed">
                            <span className="absolute -top-3 md:-top-6 -left-2 md:-left-4 text-4xl md:text-6xl text-primary/20 font-black font-mono">"</span>
                            <p className="relative z-10">
                              Antes, nuestro equipo revisaba 200 alertas por noche causadas por montacargas o fauna, sufriendo fatiga severa. Con MultiCam OS integrado sobre nuestra propia granja de NVRs, ahora solo reaccionamos ante intrusiones verificadas. Esto cambió nuestra postura pasiva a una respuesta 100% estratégica.
                            </p>
                            <div className="mt-6 md:mt-8 not-italic">
                                <p className="font-bold text-white text-sm md:text-base">— Director de Seguridad Patrimonial</p>
                                <p className="text-xs text-gray-500 font-mono">Cadena de Suministro Retail</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <UseCases />
        
        {/* How it Works Section */}
        <section id="como-funciona" className="py-16 md:py-24 bg-[#0a0a0a] relative border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">El flujo operativo, simplificado</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">Desde la captura pasiva hasta la resolución del incidente. No reinventamos tus cámaras, las dotamos de un cerebro táctico en 4 pasos.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {[
                        { step: "01", title: "Conecta", desc: "Añadimos tus cámaras IP/RTSP existentes al núcleo del sistema. Sin hardware propietario nuevo." },
                        { step: "02", title: "Analiza", desc: "La IA procesa el video on-premise en tiempo real, descartando viento, sombras y ruido ambiental." },
                        { step: "03", title: "Alerta", desc: "Detecciones confirmadas activan grabación y se listan en tu centro de monitoreo instantáneamente." },
                        { step: "04", title: "Responde", desc: "El monitorista verifica la evidencia visual filtrada y coordina respuesta eliminando el 95% de falsos positivos." }
                    ].map((s, i) => (
                        <div key={i} className="p-6 border border-white/10 rounded-xl bg-white/5 relative overflow-hidden group">
                            <div className="text-6xl font-black text-white/5 absolute -top-4 -right-4 group-hover:text-primary/10 transition-colors">{s.step}</div>
                            <h3 className="text-xl font-bold mb-2 text-white relative z-10">{s.title}</h3>
                            <p className="text-xs md:text-sm text-gray-400 relative z-10 leading-relaxed font-light">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Security & Trust Section */}
        <section id="seguridad" className="py-16 md:py-24 bg-[#050505] relative border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold mb-6 leading-tight">Seguridad Lógica para Entornos Industriales</h2>
                        <p className="text-gray-400 mb-8 leading-relaxed text-sm md:text-base">MultiCam OS está diseñado bajo el principio de soberanía de datos. Tu operación no puede depender del internet ni exponer tu red IT corporativa a terceros.</p>
                        <ul className="space-y-4">
                            {[
                                "Procesamiento y Retención 100% On-Premise",
                                "Resiliencia Offline (La IA y grabación operan sin internet)",
                                "Auditoría táctica de accesos bajo enfoque Zero-Trust",
                                "Migración fluida desde y hacia infraestructura Legacy (DVRs/NVRs)"
                            ].map((li, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300 text-sm md:text-base">
                                    <span className="text-primary font-bold">✓</span> {li}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative border border-white/10 rounded-xl p-6 md:p-8 bg-surface overflow-hidden glass-panel">
                        <div className="absolute inset-0 bg-secondary/10 blur-[100px]"></div>
                        <div className="relative z-10 text-center space-y-6">
                            <div className="w-16 md:w-20 h-16 md:h-20 mx-auto border-2 border-dashed border-gray-600 rounded-full flex items-center justify-center text-3xl md:text-4xl">
                                🔒
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold">Cero Vulnerabilidades Innecesarias</h3>
                            <p className="text-gray-400 leading-relaxed text-sm md:text-base font-light">
                                Sin necesidad de abrir puertos en el firewall (Port-Forwarding) ni exponer IPs estáticas. Acceso remoto gestionado por túneles encriptados inversos.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Compatibility />
        <FAQ />

        {/* Call to Action Section */}
        <section className="py-16 md:py-24 relative overflow-hidden border-t border-white/5 bg-[#03080A]">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
           <div className="container mx-auto px-6 text-center relative z-10">
               <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono mb-6 text-gray-400">PASO 1: EVALUACIÓN DE INFRAESTRUCTURA GRATUITA</span>
               <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">¿Listo para la Inteligencia Operativa?</h2>
               <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-base md:text-lg font-light">Comienza con una cámara. Escala a tu propio ritmo. Despliega seguridad proactiva optimizando la rentabilidad de los equipos de CCTV que ya funcionan hoy.</p>
               
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                   <button className="w-full sm:w-auto px-10 py-5 bg-white text-black font-extrabold text-sm md:text-lg uppercase tracking-widest hover:bg-gray-200 transition-colors rounded">
                       Agendar Piloto In-Situ
                   </button>
                   <button className="w-full sm:w-auto px-8 py-5 border border-white/20 hover:border-white/50 text-white font-bold text-sm md:text-lg uppercase tracking-widest transition-colors rounded bg-white/5">
                       Ver Documentación API
                   </button>
               </div>
               <p className="mt-8 text-[10px] text-gray-500 font-mono tracking-wide uppercase">Sin compromisos iniciales. Coordinaremos una videollamada para ver la factibilidad técnica.</p>
           </div>
        </section>
      </main>

      {/* Expanded Commercial Footer */}
      <footer className="py-16 border-t border-white/10 bg-[#020202]">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                <div className="md:col-span-2">
                    <span className="font-bold text-xl md:text-2xl font-mono tracking-wider text-white mb-6 block">MultiCam<span className="text-primary">.ai</span></span>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed max-w-sm mb-6 font-light">Transformando infraestructura de circuito cerrado legacy en plataformas tácticas de inteligencia en el borde. Arquitectura Zero-Trust, 100% On-Premise.</p>
                    <div className="flex items-center gap-4 text-gray-400">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-[10px] font-mono uppercase tracking-widest">Sistemas Despliegue Operativos</span>
                    </div>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Empresa</h4>
                    <ul className="space-y-4 text-xs md:text-sm text-gray-500">
                        <li><a href="#" className="hover:text-primary transition-colors">Implementaciones</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Seguridad Zero-Trust</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Documentación de Red</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Contáctanos Hoy</h4>
                    <ul className="space-y-4 text-xs md:text-sm text-gray-500 font-mono">
                        <li className="flex items-center gap-3"><span>✉</span> ventas@multicam-ai.com</li>
                        <li className="flex items-center gap-3"><span>☏</span> +52 (55) 1234-5678</li>
                        <li className="flex items-center gap-3"><span>📍</span> Centro Corporativo Industrial</li>
                    </ul>
                </div>
            </div>
            
            <div className="pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center text-gray-600 text-[10px] font-mono tracking-tight gap-4">
                <p>© {new Date().getFullYear()} MultiCam Industrial OS. Todos los derechos reservados.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Licenciamiento</a>
                    <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
