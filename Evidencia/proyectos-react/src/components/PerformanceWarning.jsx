import React from 'react';

/**
 * PerformanceWarning Component
 * Modal de advertencia para proyectos THREE.JS en móviles
 */
const PerformanceWarning = ({ show, onContinue, onGoBack }) => {
  if (!show) return null;

  return (
    <>
      <div
        className={`warning-overlay ${show ? 'show' : ''}`}
        onClick={onGoBack}
      />
      <div className={`performance-warning ${show ? 'show' : ''}`}>
        <div className="warning-icon">⚠️</div>
        <div className="warning-title">ADVERTENCIA DE RENDIMIENTO</div>
        <div className="warning-text">
          Los proyectos THREE.JS pueden consumir más batería y recursos en
          dispositivos móviles. Se recomienda usar en PC para mejor experiencia.
        </div>
        <div className="warning-actions">
          <button className="warning-button" onClick={onContinue}>
            CONTINUAR
          </button>
          <button className="warning-button primary" onClick={onGoBack}>
            VOLVER
          </button>
        </div>
      </div>
    </>
  );
};

export default PerformanceWarning;
