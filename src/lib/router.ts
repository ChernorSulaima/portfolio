import { useSyncExternalStore } from 'react';

/**
 * Minimal client-side routing for the two kinds of page this site has:
 * the home page ("/") and the case studies ("/work/<slug>").
 * vercel.json rewrites every path without a file extension to index.html.
 */

const subscribe = (onChange: () => void) => {
  window.addEventListener('popstate', onChange);
  return () => window.removeEventListener('popstate', onChange);
};

const getPathname = () => window.location.pathname;

export const usePathname = (): string => useSyncExternalStore(subscribe, getPathname);

export const scrollToHash = (hash: string, behavior: ScrollBehavior = 'auto') => {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return false;
  const target = document.getElementById(id);
  target?.scrollIntoView({ behavior, block: 'start' });
  return Boolean(target);
};

export const navigate = (to: string) => {
  const url = new URL(to, window.location.href);
  const samePage = url.pathname === window.location.pathname;

  window.history.pushState(null, '', url.pathname + url.search + url.hash);

  if (samePage && url.hash) {
    scrollToHash(url.hash, 'smooth');
    return;
  }

  window.dispatchEvent(new PopStateEvent('popstate'));
};
