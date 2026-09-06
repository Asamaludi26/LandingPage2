import { useEffect } from 'react';

type LenisLike = {
  stop: () => void;
  start: () => void;
  isStopped?: boolean;
};

function getLenis(): LenisLike | undefined {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

/**
 * Locks background page scroll while an overlay (modal / mobile drawer) is open.
 * Uses Lenis' official stop/start API when available (adds `.lenis-stopped`),
 * and falls back to `body { overflow: hidden }` for native scrolling.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const lenis = getLenis();
    const body = document.body;

    if (lenis && !lenis.isStopped) {
      lenis.stop();
      body.style.overflow = '';
      return () => {
        lenis.start();
      };
    }

    body.style.overflow = 'hidden';
    return () => {
      body.style.overflow = '';
    };
  }, [active]);
}