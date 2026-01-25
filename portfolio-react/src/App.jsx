import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './styles/index.css';

/**
 * Main App Component
 * SPA (Single Page Application) con navegación anclada
 * 
 * Secciones:
 * - Hero: Sección principal con título y CTAs
 * - About: Sobre mí y línea de tiempo
 * - Services: Servicios ofrecidos
 * - Projects: Portafolio de proyectos
 * - Contact: Formulario de contacto
 */
function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
