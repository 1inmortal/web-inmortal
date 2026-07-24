import React, { useEffect, Suspense } from 'react';
import Lenis from 'lenis';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Manifesto from './components/Manifesto/Manifesto';
import Profile from './components/Profile/Profile';
import Experience from './components/Experience/Experience';
import Stack from './components/Stack/Stack';
import Services from './components/Services/Services';
import Projects from './components/Projects/Projects';
import Special from './components/Special/Special';
import Dashboard from './components/Dashboard/Dashboard';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor';
import ThreeScene from './components/ThreeScene/ThreeScene';
import Preloader from './components/Preloader';

import './styles/index.css';

export default function App() {
  const [loading, setLoading] = React.useState(true);
  
  useEffect(() => {
    // Inicializar Lenis para smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Ocultar el cursor por defecto globalmente si estamos usando el custom cursor
    document.body.style.cursor = 'none';
    const interactives = document.querySelectorAll('a, button, input, textarea, select');
    interactives.forEach(el => el.style.cursor = 'none');

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      <CustomCursor />
      
      {/* Three.js Background with Suspense fallback */}
      <Suspense fallback={<div className="fixed inset-0 bg-[#020304] z-[-1]"></div>}>
        <ThreeScene />
      </Suspense>

      <div className="relative z-0 text-[#c9d1d9] selection:bg-[#58a6ff] selection:text-[#020304]">
        <Header />
        
        <main>
          <Hero />
          <Manifesto />
          <Profile />
          <Experience />
          <Stack />
          <Services />
          <Projects />
          <Special />
          <Dashboard />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
