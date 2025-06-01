export const getImagePath = (path: string) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return new URL(`../assets/${cleanPath}`, import.meta.url).href;
}; 