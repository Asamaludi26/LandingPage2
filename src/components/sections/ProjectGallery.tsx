import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EASE_CINEMATIC, LUXURY_EASE } from '../../lib/animations';
import { MaskReveal } from '../ui/Editorial';
import { Reveal } from '../ui/Reveal';
import { SERVICES_PAGE } from '../../content';

export const ProjectGallery: React.FC = () => {
  const { gallery } = SERVICES_PAGE;
  const items = gallery.items;
  const count = items.length;

  const [index, setIndex] = useState(0);
  const startX = useRef(0);
  const dragging = useRef(false);

  const item = items[index];

  const next = () => setIndex((current) => (current + 1) % count);
  const prev = () => setIndex((current) => (current - 1 + count) % count);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    startX.current = event.clientX;
    dragging.current = true;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) {
      return;
    }
    const deltaX = event.clientX - startX.current;
    if (deltaX > 48) {
      prev();
    } else if (deltaX < -48) {
      next();
    }
    dragging.current = false;
  };

  return (
    <section id="layanan-galeri" className="py-20 lg:py-28 bg-white border-b border-[#E5E3DF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <MaskReveal duration={0.7}>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
              {gallery.kicker}
            </span>
          </MaskReveal>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
            <MaskReveal delay={0.12} duration={1}>{gallery.title1} </MaskReveal>
            <MaskReveal delay={0.28} duration={1}>
              <span className="italic text-[#5A5A40]">{gallery.titleAccent}</span>
            </MaskReveal>
          </h2>
          <div className="w-12 h-[1px] bg-[#5A5A40] mx-auto mt-4" />
          <Reveal delay={0.4}>
            <p className="mt-6 text-sm text-[#6B6B5F] font-light leading-relaxed max-w-xl mx-auto">
              {gallery.note}
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div
            className="relative border border-[#E5E3DF] bg-[#EBE9E4] overflow-hidden"
            style={{ touchAction: 'pan-y' }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              dragging.current = false;
            }}
          >
            <div className="relative aspect-[16/9] lg:aspect-[21/10]">
              <AnimatePresence>
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <motion.img
                    src={item.image}
                    alt={item.alt}
                    initial={{ scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2.4, ease: EASE_CINEMATIC }}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#8C8276] font-bold">
                {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </p>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1A1A1A] mt-1.5">
                {item.project}
              </h3>
              <p className="text-xs text-[#6B6B5F] font-light mt-1">{item.location}</p>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                type="button"
                onClick={prev}
                aria-label="Foto sebelumnya"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.4, ease: LUXURY_EASE }}
                className="w-11 h-11 bg-[#F9F8F6] border border-[#E5E3DF] flex items-center justify-center text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                type="button"
                onClick={next}
                aria-label="Foto berikutnya"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.4, ease: LUXURY_EASE }}
                className="w-11 h-11 bg-[#F9F8F6] border border-[#E5E3DF] flex items-center justify-center text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors duration-300 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-3 sm:grid-cols-6 gap-3">
          {items.map((thumb, thumbIndex) => (
            <button
              key={thumb.image}
              type="button"
              onClick={() => setIndex(thumbIndex)}
              aria-label={`Lihat foto ${thumbIndex + 1}`}
              className={`relative aspect-[4/3] border overflow-hidden transition-all duration-300 cursor-pointer focus:outline-none ${
                thumbIndex === index
                  ? 'border-[#1A1A1A] opacity-100'
                  : 'border-[#E5E3DF] opacity-60 hover:opacity-100 hover:border-[#8C8276]'
              }`}
            >
              <img
                src={thumb.image}
                alt={thumb.alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};