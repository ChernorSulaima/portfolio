/**
 * App screenshots live in /public/images/apps at two widths each, so the browser can pick the
 * sharpest one for the screen: phone screens at 603 and 1206 pixels (a real iPhone 16 Pro
 * screenshot is 1206 x 2622), browser screens at 1200 and 1920.
 */
const BASE = '/images/apps';

export const phoneShot = (name: string) => ({
  src: `${BASE}/${name}-603.webp`,
  srcSet: `${BASE}/${name}-603.webp 603w, ${BASE}/${name}-1206.webp 1206w`,
});

export const browserShot = (name: string) => ({
  src: `${BASE}/${name}-1200.webp`,
  srcSet: `${BASE}/${name}-1200.webp 1200w, ${BASE}/${name}-1920.webp 1920w`,
});
