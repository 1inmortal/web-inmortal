/**
 * scrambleText
 * Crea efecto de desorden de texto al hacer hover
 */
export const scrambleText = (element, originalText, duration = 800) => {
  if (!element) return null;

  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?qwertyuiopasdfghjklzxcvbnm1234567890";
  const finalText = originalText;
  let currentText = "";
  let currentIndex = 0;

  const interval = setInterval(() => {
    if (currentIndex < finalText.length) {
      // Generar texto aleatorio para los caracteres restantes
      const remainingLength = finalText.length - currentIndex;
      const randomChars = Array.from({ length: remainingLength }, () =>
        chars[Math.floor(Math.random() * chars.length)]
      ).join("");

      currentText = finalText.substring(0, currentIndex) + randomChars;
      element.textContent = currentText;
      currentIndex++;
    } else {
      // Mostrar texto final
      element.textContent = finalText;
      clearInterval(interval);
    }
  }, duration / finalText.length);

  return interval;
};
