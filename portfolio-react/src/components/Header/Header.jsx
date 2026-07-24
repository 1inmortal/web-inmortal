import React from 'react';
import { useAudio } from '../../hooks/useAudio';

export default function Header() {
  const { audioEnabled, toggleAudio, playBeep } = useAudio();

  return (
    <header className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 pointer-events-auto mix-blend-difference font-mono text-xs text-[#c9d1d9] select-none">
      <div className="flex gap-2 items-center" data-cursor="HOME" onClick={() => playBeep(600, 0.1)}>
        <span className="text-[#58a6ff] font-bold">PSY</span>
        <span className="opacity-50">v2.0</span>
      </div>

      <nav className="hidden md:flex gap-8">
        <a href="#manifesto" className="hover:text-[#58a6ff] transition-colors" data-cursor="NAVIGATE" onClick={() => playBeep(800, 0.05)}>// DIRECTIVE</a>
        <a href="#categories" className="hover:text-[#58a6ff] transition-colors" data-cursor="NAVIGATE" onClick={() => playBeep(800, 0.05)}>// MODULES</a>
        <a href="#dashboard" className="hover:text-[#58a6ff] transition-colors" data-cursor="NAVIGATE" onClick={() => playBeep(800, 0.05)}>// SYSTEM</a>
      </nav>

      <div className="flex gap-4 items-center">
        <button 
          onClick={() => {
            toggleAudio();
            playBeep(400, 0.2);
          }}
          className={`px-3 py-1 border ${audioEnabled ? 'border-[#3fb950] text-[#3fb950]' : 'border-[#30363d] text-[#6e7681]'} hover:border-[#58a6ff] transition-colors`}
          data-cursor="TOGGLE"
        >
          {audioEnabled ? '[ AUDIO: ON ]' : '[ AUDIO: OFF ]'}
        </button>
        <div className="px-2 py-1 bg-[#c9d1d9] text-[#020304] font-bold cursor-pointer hover:bg-[#58a6ff] transition-colors" data-cursor="TRANSLATE" onClick={() => playBeep(1000, 0.1)}>
          EN
        </div>
      </div>
    </header>
  );
}
