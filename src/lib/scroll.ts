type LenisLike = { scrollTo: (target: string | number, opts?: Record<string, unknown>) => void };

function getLenis(): LenisLike | undefined {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

/**
 * Tinggi sticky header (topbar + bar navigasi) agar section target tidak
 * tertutup. Dipakai sebagai offset negatif saat smooth-scroll ke anchor.
 */
export const HEADER_OFFSET = 108;

export function smoothScrollTo(target: string, duration = 1.15) {
  const el = document.querySelector(target);
  if (!el) return;

  const top = Math.max(el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET, 0);

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(top, { duration });
  } else {
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/**
 * Sinkronkan hash section ke address bar tanpa menambah riwayat navigasi,
 * agar "lokasi tab" mencerminkan section yang sedang dilihat.
 */
export function setSectionHash(hash: string) {
  if (window.location.hash === hash) return;
  window.history.replaceState(null, '', hash);
}

export function scrollToTop(immediate = true) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, { immediate });
  } else {
    window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
  }
}