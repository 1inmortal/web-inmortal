import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [text, setText] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });

      // Crear trail de cursor aleatoriamente para efecto glitchy
      if (Math.random() > 0.8) {
        createTrail(e.clientX, e.clientY);
      }
    };

    const handleMouseOver = (e) => {
      // Detección mejorada: reacciona a atributos, enlaces, botones y elementos interactivos
      const target = e.target.closest('[data-cursor], a, button, .interactive');
      if (target) {
        setIsActive(true);
        setText(target.getAttribute('data-cursor') || '');
        cursor.classList.add('caret');
      } else {
        setIsActive(false);
        setText('');
        cursor.classList.remove('caret');
      }
    };

    const createTrail = (x, y) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail absolute w-[2px] h-[2px] bg-[var(--text-muted)] rounded-full pointer-events-none z-[9997]';
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      document.body.appendChild(trail);

      gsap.to(trail, {
        opacity: 0,
        y: y + 20,
        x: x + (Math.random() - 0.5) * 20, // Movimiento sutil orgánico
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => {
          if (trail.parentNode) {
            trail.parentNode.removeChild(trail); // Limpieza explícita estricta
          }
        }
      });
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        id="custom-cursor" 
        className={`fixed w-1.5 h-1.5 bg-[var(--accent)] rounded-full pointer-events-none z-[9999] top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-[opacity,transform] duration-500 ease-out ${isActive ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
      ></div>
      <div 
        ref={followerRef} 
        id="cursor-follower" 
        className={`fixed w-10 h-10 border border-[rgba(255,255,255,0.2)] rounded-full pointer-events-none z-[9998] top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono text-[8px] text-[var(--accent)] uppercase whitespace-nowrap transition-all duration-500 ease-out ${isActive ? 'opacity-100 !border-[var(--accent)] w-16 h-16 bg-[rgba(255,255,255,0.05)] backdrop-blur-sm' : 'opacity-60'}`}
      >
        {text && <span className="absolute -top-6 text-[10px] tracking-[1px]">{text}</span>}
      </div>
    </>
  );
}
