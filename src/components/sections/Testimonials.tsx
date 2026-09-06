import React from 'react';
import { TESTIMONIALS_DATA, TESTIMONIALS_SECTION } from '../../content';
import { Star, Quote, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { LUXURY_EASE } from '../../lib/animations';
import { MaskReveal } from '../ui/Editorial';
import { Reveal } from '../ui/Reveal';
import { buildWaLink, allowWaOpen } from '../../lib/wa';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F9F8F6] border-b border-[#E5E3DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <MaskReveal duration={0.7}>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
              {TESTIMONIALS_SECTION.kicker}
            </span>
          </MaskReveal>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
            <MaskReveal delay={0.12} duration={1}>{TESTIMONIALS_SECTION.headingTop}</MaskReveal>
            <MaskReveal delay={0.28} duration={1}>
              <span className="italic text-[#5A5A40]">{TESTIMONIALS_SECTION.headingAccent}</span>
            </MaskReveal>
          </h2>
          <div className="w-12 h-[1px] bg-[#5A5A40] mx-auto mt-4 mb-4" />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.7, delay: 0.4, ease: LUXURY_EASE }}
            className="text-[#6B6B5F] text-base sm:text-lg font-light leading-relaxed"
          >
            {TESTIMONIALS_SECTION.paragraph}
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.12} className="h-full">
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, ease: LUXURY_EASE }}
                className="bg-white p-8 border border-[#E5E3DF] shadow-xs flex flex-col justify-between h-full relative hover:border-[#1A1A1A] transition-colors duration-300"
              >
                <div>
                  <Quote className="w-6 h-6 text-[#5A5A40]/40 mb-4" />
                  
                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#5A5A40] text-[#5A5A40]" />
                    ))}
                  </div>

                  <p className="text-[#4A4A3A] text-sm font-light leading-relaxed italic mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-5 border-t border-[#E5E3DF] flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-11 h-11 rounded-full object-cover border border-[#E5E3DF] shrink-0"
                  />
                  <div>
                    <h4 className="font-serif text-[#1A1A1A] text-base font-normal leading-snug">
                      {item.author}
                    </h4>
                    <p className="text-xs text-[#8C8276] font-medium">
                      {item.role}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-[#5A5A40] font-bold flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{item.location}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Architect Partner Banner */}
        <Reveal delay={0.05} className="mt-14">
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.4, ease: LUXURY_EASE }} className="p-6 bg-white border border-[#E5E3DF] border-l-4 border-l-[#5A5A40] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#5A5A40] shrink-0" />
              <p className="text-xs sm:text-sm text-[#4A4A3A] font-light">
                <strong className="text-[#1A1A1A] font-medium">{TESTIMONIALS_SECTION.bannerTitle}</strong> {TESTIMONIALS_SECTION.bannerText}
              </p>
            </div>
            <a
              href={buildWaLink(TESTIMONIALS_SECTION.bannerWaMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                if (!allowWaOpen()) {
                  event.preventDefault();
                }
              }}
              className="text-xs uppercase font-bold tracking-[0.2em] text-[#1A1A1A] hover:text-[#5A5A40] whitespace-nowrap"
            >
              {TESTIMONIALS_SECTION.bannerCtaLabel} &rarr;
            </a>
          </motion.div>
        </Reveal>

      </div>
    </section>
  );
};