/**
 * resolveImageUrl
 * Resuelve URLs de imágenes de forma robusta
 */
export const resolveImageUrl = (url) => {
  if (!url) return '';
  const trimmed = url.trim();
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:')
  )
    return trimmed;
  if (
    trimmed.startsWith('/') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('../')
  )
    return trimmed;
  return trimmed;
};
