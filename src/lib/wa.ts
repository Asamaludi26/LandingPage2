const ENC_DIRECT = '3958901234567';
const ENC_DISPLAY = '+39 589-0123-4567';

const SESSION_KEY = 'na_wa_open';

export const WA_DIRECT = ENC_DIRECT.replace(/\d/g, (d) => String((Number(d) + 3) % 10));
export const WA_DISPLAY = ENC_DISPLAY.replace(/\d/g, (d) => String((Number(d) + 3) % 10));

export const buildWaLink = (message: string) =>
  `https://wa.me/${WA_DIRECT}?text=${encodeURIComponent(message)}`;

const CLICK_WINDOW_MS = 3000;
const MAX_OPENS_PER_SESSION = 5;

const readSessionOpens = (): number => {
  try {
    return Number(sessionStorage.getItem(SESSION_KEY) || '0');
  } catch {
    return 0;
  }
};

const writeSessionOpens = (count: number) => {
  try {
    sessionStorage.setItem(SESSION_KEY, String(count));
  } catch {
    // sessionStorage may be unavailable (private mode / blocked); ignore
  }
};

let lastOpenedAt = 0;

/**
 * Kirim event feedback global agar UI menampilkan pesan alih-alih "bisu".
 * Komponen apa pun (toast global, dsb.) bisa mendengarkan via `watchWaLimit`.
 */
export const WA_LIMIT_EVENT = 'na:wa-limit';

export interface WaLimitPayload {
  reason: 'cooldown' | 'exhausted';
  maxOpens: number;
}

const emitLimit = (reason: WaLimitPayload['reason']) => {
  try {
    window.dispatchEvent(
      new CustomEvent<WaLimitPayload>(WA_LIMIT_EVENT, {
        detail: { reason, maxOpens: MAX_OPENS_PER_SESSION },
      }),
    );
  } catch {
    // event dispatch not available in some environments; ignore
  }
};

/**
 * Ketat — membatasi spam (cooldown 3s antar klik + maks 5 buka per sesi).
 * Saat klik ditahan (return false), fungsi ini TIDAK lagi "bisu":
 * ia mengirim event `WA_LIMIT_EVENT` agar UI menampilkan feedback,
 * sehingga user tahu mengapa tautan tidak terbuka.
 */
export const allowWaOpen = (): boolean => {
  const now = Date.now();

  if (now - lastOpenedAt < CLICK_WINDOW_MS) {
    emitLimit('cooldown');
    return false;
  }

  const count = readSessionOpens();
  if (count >= MAX_OPENS_PER_SESSION) {
    emitLimit('exhausted');
    return false;
  }

  lastOpenedAt = now;
  writeSessionOpens(count + 1);
  return true;
};

/**
 * Suscriber untuk event limit — dipakai toast global (atau komponen lain)
 * agar bisa menampilkan umpan balik saat klik WhatsApp ditahan.
 * Mengembalikan fungsi pembersih (unsubscribe).
 */
export const watchWaLimit = (handler: (payload: WaLimitPayload) => void): (() => void) => {
  const listener = (e: Event) => {
    handler((e as CustomEvent<WaLimitPayload>).detail);
  };
  window.addEventListener(WA_LIMIT_EVENT, listener);
  return () => window.removeEventListener(WA_LIMIT_EVENT, listener);
};