import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ShieldAlert, X } from 'lucide-react';
import { LUXURY_EASE } from '../../lib/animations';
import { watchWaLimit, WaLimitPayload, WA_DISPLAY } from '../../lib/wa';
import { WhatsAppIcon } from './WhatsAppIcon';

export const WaLimitToast: React.FC = () => {
  const [payload, setPayload] = useState<WaLimitPayload | null>(null);
  const [dismissedId, setDismissedId] = useState(0);
  const dismissTimer = useRef<number | null>(null);

  useEffect(() => {
    const unsubscribe = watchWaLimit((next) => {
      setPayload(next);
      setDismissedId((v) => v + 1);
      if (dismissTimer.current) window.clearTimeout(dismissTimer.current);
      dismissTimer.current = window.setTimeout(() => {
        setPayload(null);
      }, 6000);
    });
    return () => {
      unsubscribe();
      if (dismissTimer.current) window.clearTimeout(dismissTimer.current);
    };
  }, []);

  const isCooldown = payload?.reason === 'cooldown';

  return (
    <AnimatePresence>
      {payload && (
        <motion.div
          key={dismissedId}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.3, ease: LUXURY_EASE }}
          role="status"
          aria-live="polite"
          className="fixed bottom-24 right-6 left-6 sm:left-auto sm:w-[min(24rem,calc(100vw-3rem))] z-50 bg-[#1A1A1A] text-white border border-[#2A2A2A] shadow-2xl"
        >
          <div className="flex items-start gap-3.5 p-4">
            <div className="w-10 h-10 bg-[#25D366] flex items-center justify-center shrink-0">
              <WhatsAppIcon className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-sm tracking-wide text-white flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 text-[#E5C38E] shrink-0" />
                Batas Chat WhatsApp
              </p>
              <p className="text-xs text-[#A69F94] font-light leading-relaxed mt-1.5">
                {isCooldown
                  ? 'Mohon tunggu sesaat sebelum membuka chat berikutnya agar layanan kami tetap prima.'
                  : `Anda telah membuka chat sebanyak ${payload?.maxOpens ?? 5} kali pada sesi ini. Hubungi kami langsung di ${WA_DISPLAY} — tim kami siap membantu.`}
              </p>
            </div>
            <button
              onClick={() => setPayload(null)}
              aria-label="Tutup pemberitahuan"
              className="text-[#A69F94] hover:text-white p-1 shrink-0 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};