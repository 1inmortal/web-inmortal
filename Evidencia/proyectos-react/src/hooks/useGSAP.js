import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

/**
 * useGSAP Hook
 * Verifica disponibilidad de GSAP y proporciona utilidades
 */
export const useGSAP = () => {
  const [gsapAvailable, setGsapAvailable] = useState(false);

  useEffect(() => {
    setGsapAvailable(typeof gsap !== 'undefined');
  }, []);

  const checkGSAPAvailability = () => {
    return typeof gsap !== 'undefined';
  };

  return {
    gsap,
    gsapAvailable,
    checkGSAPAvailability,
  };
};
