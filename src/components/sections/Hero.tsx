import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { microButton, LUXURY_EASE, EASE_CINEMATIC } from '../../lib/animations';
import { MaskReveal } from '../ui/Editorial';
import { CtaButton } from '../ui/CtaButton';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { buildWaLink, allowWaOpen } from '../../lib/wa';
import { HERO_CTA, HERO_SLIDES } from '../../content';

interface HeroProps {
  onExploreProducts: () => void;
}

const AUTOPLAY_MS = 7000;

const slides = HERO_SLIDES;

const contentFade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: LUXURY_EASE },
});

export const Hero: React.FC<HeroProps> = ({ onExploreProducts }) => {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const startX = useRef(0);
  const inView = useInView(sectionRef, { amount: 0.2 });

  const slide = slides[index];
  const paused = hovered || dragging || !inView;

  const next = () => setIndex((p) => (p + 1) % slides.length);
  const prev = () => setIndex((p) => (p - 1 + slides.length) % slides.length);
  const goTo = (i: number) => setIndex(((i % slides.length) + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setIndex((p) => (p + 1) % slides.length), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, index]);

  useEffect(() => {
    const [nextImg, prevImg] = [
      slides[(index + 1) % slides.length].image,
      slides[(index - 1 + slides.length) % slides.length].image,
    ];
    [nextImg, prevImg].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [index]);

  const handlePointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    setDragging(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - startX.current;
    if (dx > 48) prev();
    else if (dx < -48) next();
    setDragging(false);
  };

  return (
    <section
      id="beranda"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#1A1A1A] border-b border-[#E5E3DF]"
      style={{ touchAction: 'pan-y' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => setDragging(false)}
    >
      {/* Background: crossfade + slow settle */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <motion.img
              src={slide.image}
              alt={slide.alt}
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.6, ease: EASE_CINEMATIC }}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Legibility overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#14140F]/90 via-[#14140F]/55 to-[#14140F]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#14140F]/75 via-transparent to-[#14140F]/25" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[600px] sm:min-h-[660px] lg:min-h-[720px] flex flex-col justify-center pt-16 pb-32 sm:pt-10 lg:pb-36">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            {/* Kicker */}
            <MaskReveal className="mb-6" delay={0.1} duration={0.7}>
              <div className="flex items-center gap-3">
                <span className="w-6 h-[1px] bg-[#D9D7D2]" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#D9D7D2]/90 font-bold block">
                  {slide.kicker}
                </span>
              </div>
            </MaskReveal>

            {/* Headline: masked lines, editorial stagger */}
            <MaskReveal delay={0.2} duration={0.8}>
              <h1 className="font-serif text-[34px] sm:text-5xl lg:text-[56px] font-normal tracking-tight text-white leading-[1.06]">
                <span className="block">{slide.headlineTop}</span>
              </h1>
            </MaskReveal>
            <MaskReveal delay={0.35} duration={0.8}>
              <span className="font-serif text-[34px] sm:text-5xl lg:text-[56px] font-normal tracking-tight italic text-[#D9D7D2] leading-[1.06] block">
                {slide.headlineAccent}
              </span>
            </MaskReveal>

            {/* Body: gentle cue, lightness of voice */}
            <motion.p {...contentFade(0.55)} className="text-[#BFBBB2] text-base sm:text-lg font-light leading-relaxed max-w-xl mt-6 mb-8">
              {slide.body}
            </motion.p>

            {/* Informative cues */}
            <motion.div {...contentFade(0.7)} className="flex flex-wrap gap-x-6 gap-y-2.5 mb-9">
              {slide.cues.map((cue) => (
                <div key={cue} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 bg-[#D9D7D2]/80 shrink-0" />
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-white/75 font-bold">{cue}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div {...contentFade(0.85)} className="flex flex-col sm:flex-row items-stretch gap-4">
              <CtaButton
                variant="onDark"
                className="flex-1"
                href={buildWaLink(HERO_CTA.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => {
                  if (!allowWaOpen()) {
                    event.preventDefault();
                  }
                }}
              >
                <WhatsAppIcon className="w-4 h-4 text-[#151515]" />
                <span>{HERO_CTA.waLabel}</span>
              </CtaButton>

              <CtaButton
                variant="onDarkOutline"
                className="flex-1"
                onClick={onExploreProducts}
              >
                <span>{HERO_CTA.exploreLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </CtaButton>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-6 inset-x-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="flex items-center gap-3">
            {slides.map((_, i) => (
              <motion.button
                key={i}
                {...microButton}
                onClick={() => goTo(i)}
                aria-label={`Menuju slide ${i + 1}`}
                className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  i === index ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};