import React, { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LUXURY_EASE } from '../../lib/animations';
import { buildWaLink, allowWaOpen } from '../../lib/wa';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { WHATSAPP_FLOAT } from '../../content';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const quickMessages = WHATSAPP_FLOAT.quickMessages;

  const handleSendQuickMessage = (msg: string) => {
    if (!allowWaOpen()) return;
    window.open(buildWaLink(msg), '_blank', 'noopener');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.28, ease: LUXURY_EASE }}
            className="mb-3 w-[min(22rem,calc(100vw-3rem))] sm:w-88 max-h-[calc(100vh-6rem)] overflow-y-auto bg-[#F9F8F6] border border-[#E5E3DF] shadow-2xl"
            data-lenis-prevent
          >
            {/* Header */}
            <div className="bg-[#1A1A1A] p-4 text-white flex items-center justify-between border-b border-[#E5E3DF]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-white text-[#1A1A1A] font-serif font-normal flex items-center justify-center text-xs tracking-wider border border-[#E5E3DF]">
                    {WHATSAPP_FLOAT.iconMark}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#5A5A40] ring-2 ring-[#1A1A1A]" />
                </div>
                <div>
                  <p className="font-serif font-normal text-sm tracking-wide leading-none text-white">{WHATSAPP_FLOAT.iconBrand}</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#A69F94] mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5A5A40]" />
                    <span>{WHATSAPP_FLOAT.label}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-[#A69F94] hover:text-white p-1 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 bg-[#F9F8F6] space-y-3">
              <div className="bg-white p-3.5 border border-[#E5E3DF] text-xs text-[#1A1A1A]">
                <p className="font-medium text-[#1A1A1A] mb-1">
                  {WHATSAPP_FLOAT.chatHeading}
                </p>
                <p className="text-[#6B6B5F] font-light leading-relaxed">
                  {WHATSAPP_FLOAT.chatDescription}
                </p>
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8276] pt-1">
                {WHATSAPP_FLOAT.quickTitle}
              </p>

              <div className="space-y-1.5">
                {quickMessages.map((msg, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendQuickMessage(msg)}
                    className="w-full text-left p-2.5 bg-white hover:bg-[#F0EEEA] border border-[#E5E3DF] text-xs text-[#1A1A1A] transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <span className="line-clamp-1">{msg}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8C8276] group-hover:text-[#1A1A1A] shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-3 bg-white border-t border-[#E5E3DF] text-center">
              <a
                href={buildWaLink(WHATSAPP_FLOAT.defaultMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => {
                  if (!allowWaOpen()) {
                    event.preventDefault();
                  }
                }}
                className="w-full bg-[#25D366] hover:bg-[#1FBA5A] text-white py-2.5 px-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                <span>{WHATSAPP_FLOAT.openChatLabel}</span>
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] hover:bg-[#1FBA5A] text-white w-14 h-14 sm:w-15 sm:h-15 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center group cursor-pointer"
        aria-label={WHATSAPP_FLOAT.buttonAriaLabel}
        aria-expanded={isOpen}
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </button>
    </div>
  );
};
