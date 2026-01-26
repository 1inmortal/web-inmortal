import { useState, useRef, useEffect } from 'react';

/**
 * useAudio Hook
 * Maneja audio de fondo y efectos de hover
 */
export const useAudio = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const ambientSoundRef = useRef(null);
  const hoverSoundRef = useRef(null);

  useEffect(() => {
    // Crear elementos de audio
    ambientSoundRef.current = new Audio();
    ambientSoundRef.current.loop = true;
    ambientSoundRef.current.volume = 0.1;
    ambientSoundRef.current.preload = 'auto';

    hoverSoundRef.current = new Audio();
    hoverSoundRef.current.volume = 0.6;
    hoverSoundRef.current.preload = 'auto';

    // Intentar cargar audio de fondo
    const ambientSource = document.createElement('source');
    ambientSource.src = 'mp3/AMBIENT SUNDAY [34] Cinematic Ambient + Glitch Beat - keinseier.mp3';
    ambientSource.type = 'audio/mpeg';
    ambientSoundRef.current.appendChild(ambientSource);

    if (audioEnabled) {
      ambientSoundRef.current.play().catch((error) => {
        console.log('No se pudo reproducir el audio de fondo:', error);
      });
    }

    return () => {
      if (ambientSoundRef.current) {
        ambientSoundRef.current.pause();
        ambientSoundRef.current = null;
      }
      if (hoverSoundRef.current) {
        hoverSoundRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (ambientSoundRef.current) {
      if (audioEnabled) {
        ambientSoundRef.current.play().catch(() => {});
      } else {
        ambientSoundRef.current.pause();
      }
    }
  }, [audioEnabled]);

  const playHoverSound = (soundUrl) => {
    if (!audioEnabled || !hoverSoundRef.current || !soundUrl) return;

    try {
      if (soundUrl && soundUrl.trim() !== '') {
        hoverSoundRef.current.src = soundUrl;
        hoverSoundRef.current.currentTime = 0;
        hoverSoundRef.current.play().catch((error) => {
          if (error.name !== 'AbortError') {
            console.log('No se pudo reproducir el sonido de hover:', error);
          }
        });
      }
    } catch (error) {
      console.log('Error al reproducir sonido:', error);
    }
  };

  const toggleAudio = () => {
    setAudioEnabled((prev) => !prev);
    return !audioEnabled;
  };

  return {
    audioEnabled,
    playHoverSound,
    toggleAudio,
  };
};
