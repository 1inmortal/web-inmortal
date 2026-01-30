import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

/**
 * BackgroundImage Component
 * Imagen de fondo que aparece al hacer hover sobre proyectos
 */
const BackgroundImage = forwardRef(({ imageUrl }, ref) => {
  const imageRef = useRef(null);

  useImperativeHandle(ref, () => ({
    show: (url) => {
      if (imageRef.current) {
        imageRef.current.style.transition = 'none';
        imageRef.current.style.transform = 'translate(-50%, -50%) scale(1.2)';
        imageRef.current.style.backgroundImage = `url(${url})`;
        imageRef.current.style.opacity = '1';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (imageRef.current) {
              imageRef.current.style.transition =
                'opacity 0.6s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              imageRef.current.style.transform =
                'translate(-50%, -50%) scale(1.0)';
            }
          });
        });
      }
    },
    hide: () => {
      if (imageRef.current) {
        imageRef.current.style.opacity = '0';
      }
    },
  }));

  useEffect(() => {
    if (imageUrl && imageRef.current) {
      console.log('BackgroundImage: Setting image URL:', imageUrl);
      
      // La URL ya viene resuelta desde Portfolio, solo usarla directamente
      const finalUrl = imageUrl;
      
      imageRef.current.style.transition = 'none';
      imageRef.current.style.transform = 'translate(-50%, -50%) scale(1.2)';
      imageRef.current.style.backgroundImage = `url("${finalUrl}")`;
      imageRef.current.style.opacity = '1';
      
      // Verificar si la imagen se carga correctamente
      const img = new Image();
      img.onload = () => {
        console.log('BackgroundImage: Image loaded successfully:', finalUrl);
      };
      img.onerror = () => {
        console.error('BackgroundImage: Failed to load image:', finalUrl);
      };
      img.src = finalUrl;
      
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (imageRef.current) {
            imageRef.current.style.transition =
              'opacity 0.6s ease, transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            imageRef.current.style.transform =
              'translate(-50%, -50%) scale(1.0)';
          }
        });
      });
    } else if (imageRef.current) {
      imageRef.current.style.opacity = '0';
      imageRef.current.style.backgroundImage = '';
    }
  }, [imageUrl]);

  return (
    <div
      className="background-image"
      ref={imageRef}
      id="backgroundImage"
      role="img"
      aria-hidden="true"
    />
  );
});

BackgroundImage.displayName = 'BackgroundImage';

export default BackgroundImage;
