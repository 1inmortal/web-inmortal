import { useState, useEffect, useCallback, useRef } from 'react';

export function useAudio() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Inicializar audio de fondo (drone de baja frecuencia)
  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
      
      oscillatorRef.current = audioCtxRef.current.createOscillator();
      gainNodeRef.current = audioCtxRef.current.createGain();

      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.setValueAtTime(40, audioCtxRef.current.currentTime); // Frecuencia muy baja

      gainNodeRef.current.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
      
      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioCtxRef.current.destination);
      
      oscillatorRef.current.start();
    }
  }, []);

  const toggleAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      initAudio();
    }
    
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    if (!audioEnabled) {
      // Fade In
      gainNodeRef.current.gain.linearRampToValueAtTime(0.1, audioCtxRef.current.currentTime + 2);
      setAudioEnabled(true);
    } else {
      // Fade Out
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 1);
      setAudioEnabled(false);
    }
  }, [audioEnabled, initAudio]);

  // Reproducir un pitido al interactuar
  const playBeep = useCallback((freq = 800, duration = 0.1) => {
    if (!audioEnabled || !audioCtxRef.current) return;
    
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
    
    gain.gain.setValueAtTime(0.05, audioCtxRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(audioCtxRef.current.destination);
    
    osc.start();
    osc.stop(audioCtxRef.current.currentTime + duration);
  }, [audioEnabled]);

  return { audioEnabled, toggleAudio, playBeep };
}
