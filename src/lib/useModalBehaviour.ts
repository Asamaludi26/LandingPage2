import { useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Standard modal/overlay behaviour:
 * - closes on Escape,
 * - moves focus into the overlay on open and restores it on close,
 * - traps Tab navigation within the overlay.
 */
export function useModalBehaviour(isOpen: boolean, onClose: () => void) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement;
    const container = containerRef.current;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !container) return;

      const items = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((el) => el.offsetParent !== null);

      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || container === active || !container.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !container.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    const frame = requestAnimationFrame(() => {
      const focusable = container?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      focusable?.focus({ preventScroll: true });
    });

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
      const prev = previouslyFocusedRef.current;
      if (prev && prev instanceof HTMLElement) prev.focus();
    };
  }, [isOpen]);

  return { containerRef };
}