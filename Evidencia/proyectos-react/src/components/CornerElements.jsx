import React, { useState, useEffect } from 'react';
import { useTimeDisplay } from '../hooks/useTimeDisplay';
import { useAudio } from '../hooks/useAudio';

/**
 * CornerElements Component
 * Elementos decorativos en las esquinas de la pantalla
 */
const CornerElements = () => {
  const currentTime = useTimeDisplay();
  const { audioEnabled, toggleAudio } = useAudio();

  return (
    <aside className="corner-elements">
      <div className="corner-item top-left">
        <div className="corner-square" aria-hidden="true"></div>
      </div>
      <nav className="corner-item top-right">
        <button
          id="audioToggle"
          className={`audio-toggle ${!audioEnabled ? 'muted' : ''}`}
          onClick={toggleAudio}
          aria-label="Alternar audio"
        >
          {audioEnabled ? '🔊' : '🔇'}
        </button>
        {' | '}
        <a
          href="https://x.com/filipz"
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>
      </nav>
      <div className="corner-item bottom-left">43.9250° N, 19.5530° E</div>
      <time
        className="corner-item bottom-right"
        id="current-time"
        dangerouslySetInnerHTML={{ __html: currentTime }}
      />
    </aside>
  );
};

export default CornerElements;
