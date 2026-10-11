import { useEffect, useState } from 'react';

/**
 * True once the element has scrolled into view (it stays true afterwards).
 * Returns a callback ref, so it also works for elements that mount later (e.g. after data loads).
 */
export const useInView = <T extends Element>(rootMargin = '0px 0px -60px 0px') => {
  const [node, setNode] = useState<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!node || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [node, inView, rootMargin]);

  return [setNode, inView] as const;
};
