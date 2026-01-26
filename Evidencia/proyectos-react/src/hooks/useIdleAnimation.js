import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * useIdleAnimation Hook
 * Maneja animaciones cuando el usuario está inactivo
 */
export const useIdleAnimation = (visibleProjects, isActive) => {
  const idleAnimationRef = useRef(null);
  const idleTimerRef = useRef(null);

  const checkGSAPAvailability = () => {
    return typeof gsap !== 'undefined';
  };

  useEffect(() => {
    if (isActive !== -1) {
      stopIdleAnimation();
      stopIdleTimer();
      return;
    }

    startIdleTimer();

    return () => {
      stopIdleAnimation();
      stopIdleTimer();
    };
  }, [isActive, visibleProjects]);

  const startIdleTimer = () => {
    stopIdleTimer();
    idleTimerRef.current = setTimeout(() => {
      if (isActive === -1) {
        startIdleAnimation();
      }
    }, 3000);
  };

  const stopIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
  };

  const startIdleAnimation = () => {
    if (idleAnimationRef.current) return;

    if (!checkGSAPAvailability()) {
      return;
    }

    if (!visibleProjects || visibleProjects.length === 0) return;

    // Obtener elementos del DOM
    const projectItems = Array.from(document.querySelectorAll('.project-item:not(.hidden)'));
    if (projectItems.length === 0) return;

    const columnElements = {
      artists: projectItems
        .map((item) => item.querySelector?.('.artist'))
        .filter((el) => el !== null),
      albums: projectItems
        .map((item) => item.querySelector?.('.album'))
        .filter((el) => el !== null),
      categories: projectItems
        .map((item) => item.querySelector?.('.category'))
        .filter((el) => el !== null),
      labels: projectItems
        .map((item) => item.querySelector?.('.label'))
        .filter((el) => el !== null),
      years: projectItems
        .map((item) => item.querySelector?.('.year'))
        .filter((el) => el !== null),
    };

    const totalRows = projectItems.length;
    const columnStartDelay = 0.25;
    const rowDelay = 0.05;
    const hideShowGap = totalRows * rowDelay * 0.5;

    idleAnimationRef.current = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
    });

    projectItems.forEach((item, rowIndex) => {
      const hideTime = 0 + rowIndex * rowDelay;
      const showTime = 0 + hideShowGap + rowIndex * rowDelay;

      idleAnimationRef.current.call(
        () => {
          item.classList?.add('counter-hidden');
        },
        [],
        hideTime
      );

      idleAnimationRef.current.call(
        () => {
          item.classList?.remove('counter-hidden');
        },
        [],
        showTime
      );
    });

    Object.keys(columnElements).forEach((columnName, columnIndex) => {
      const elements = columnElements[columnName].filter((el) => el !== null);
      const columnStart = (columnIndex + 1) * columnStartDelay;

      elements.forEach((element, rowIndex) => {
        if (element) {
          const hideTime = columnStart + rowIndex * rowDelay;
          idleAnimationRef.current.to(
            element,
            {
              duration: 0.1,
              opacity: 0.05,
              ease: 'power2.inOut',
            },
            hideTime
          );
        }
      });

      elements.forEach((element, rowIndex) => {
        if (element) {
          const showTime = columnStart + hideShowGap + rowIndex * rowDelay;
          idleAnimationRef.current.to(
            element,
            {
              duration: 0.1,
              opacity: 1,
              ease: 'power2.inOut',
            },
            showTime
          );
        }
      });
    });
  };

  const stopIdleAnimation = () => {
    if (idleAnimationRef.current) {
      idleAnimationRef.current.kill();
      idleAnimationRef.current = null;

      if (checkGSAPAvailability()) {
        gsap.set([...document.querySelectorAll('.project-data')], {
          opacity: 1,
        });
      } else {
        document.querySelectorAll('.project-data').forEach((el) => {
          el.style.opacity = '1';
        });
      }

      const projectItems = document.querySelectorAll('.project-item');
      projectItems.forEach((item) => {
        item.classList?.remove('counter-hidden');
      });
    }
  };

  return {
    startIdleAnimation,
    stopIdleAnimation,
  };
};
