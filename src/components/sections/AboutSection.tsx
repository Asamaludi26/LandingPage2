import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LUXURY_EASE } from '../../lib/animations';
import { Reveal, RevealImg } from '../ui/Reveal';
import { MaskReveal, CinematicImg } from '../ui/Editorial';
import { ABOUT_SECTION } from '../../content';

const QUICK_FACTS = ABOUT_SECTION.quickFacts;

const TIMELINE = ABOUT_SECTION.heritage.timeline;

type TabKey = 'story' | 'workshop' | 'wholesale';

const TAB_LABELS = ABOUT_SECTION.tabs;

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('story');

  return (
    <section id="tentang-kami" className="py-20 lg:py-28 bg-[#F9F8F6] border-b border-[#E5E3DF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ============ 1. HEADER — editorial two-column ============ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-12 lg:mb-16">
          <div className="lg:col-span-8">
            <MaskReveal duration={0.7}>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-3">
                {ABOUT_SECTION.kicker}
              </span>
            </MaskReveal>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A] tracking-tight leading-[1.05]">
              <MaskReveal delay={0.12} duration={1}>
                {ABOUT_SECTION.headingTop}
              </MaskReveal>
              <MaskReveal delay={0.28} duration={1}>
                <span className="italic text-[#5A5A40]">{ABOUT_SECTION.headingAccent}</span>
              </MaskReveal>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pb-1.5">
            <Reveal delay={0.35} direction="up">
              <p className="text-[#6B6B5F] text-sm font-light leading-relaxed">
                {ABOUT_SECTION.introParagraph}
              </p>
              <div className="inline-flex items-center gap-2.5 mt-5 text-[10px] uppercase tracking-[0.25em] font-bold text-[#5A5A40]">
                <span className="w-4 h-[1px] bg-[#5A5A40]" />
                {ABOUT_SECTION.introTagline}
              </div>
            </Reveal>
          </div>
        </div>

        {/* ============ 2. QUICK FACTS STRIP ============ */}
        <div className="grid grid-cols-2 md:grid-cols-5 border-y border-[#E5E3DF] mb-16 lg:mb-24">
          {QUICK_FACTS.map((fact, i) => (
            <Reveal
              key={fact.label}
              direction="up"
              delay={i * 0.06}
              className={`h-full ${i % 2 === 1 ? 'border-l border-[#E5E3DF]' : ''} ${
                i > 0 ? 'md:border-l md:border-[#E5E3DF]' : ''
              }`}
            >
              <div className="py-7 md:py-9 px-4 text-center md:text-left h-full flex flex-col justify-center">
                <span className="font-serif text-3xl sm:text-4xl text-[#1A1A1A] leading-none block">
                  {fact.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C8276] font-bold mt-2 block">
                  {fact.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ============ 3. HERITAGE EDITORIAL — narrative + quote + timeline / collage ============ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16 lg:mb-24">
          <div className="lg:col-span-7">
            <Reveal direction="up">
              <p className="font-serif text-xl sm:text-2xl text-[#1A1A1A] leading-snug">
                {ABOUT_SECTION.heritage.intro}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <p className="text-[#6B6B5F] font-light leading-relaxed mt-5">
                {ABOUT_SECTION.heritage.paragraph}
              </p>
            </Reveal>

            <Reveal direction="up" delay={0.16}>
              <blockquote className="mt-7 border-l-2 border-[#E5C38E] pl-5">
                <p className="font-serif italic text-lg text-[#1A1A1A] leading-snug">
                  {ABOUT_SECTION.heritage.quote}
                </p>
                <footer className="mt-2 text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8276]">
                  {ABOUT_SECTION.heritage.quoteLabel}
                </footer>
              </blockquote>
            </Reveal>

            <div className="mt-8 pt-6 border-t border-[#E5E3DF]">
              <Reveal direction="up" delay={0.1}>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#8C8276] mb-5">
                  {ABOUT_SECTION.heritage.timelineLabel}
                </p>
              </Reveal>
              <div className="space-y-4">
                {TIMELINE.map((item, i) => (
                  <Reveal key={item.year} direction="left" delay={i * 0.05}>
                    <div className="flex items-baseline gap-5">
                      <span className="font-serif text-lg text-[#5A5A40] w-24 shrink-0">
                        {item.year}
                      </span>
                      <span className="text-xs text-[#6B6B5F] font-light leading-relaxed">
                        {item.text}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal direction="right" className="relative pb-6 pr-5 lg:pr-10">
              <div className="relative aspect-[4/5] border border-[#E5E3DF] bg-[#EBE9E4] overflow-hidden">
                <CinematicImg
                  src={ABOUT_SECTION.heritage.image.src}
                  alt={ABOUT_SECTION.heritage.image.alt}
                  pan="up"
                  className="block w-full h-full m-0"
                />
              </div>
              <div className="absolute right-0 -bottom-0 w-32 sm:w-40 aspect-[4/3] border-4 border-[#F9F8F6] bg-[#EBE9E4] overflow-hidden">
                <img
                  src={ABOUT_SECTION.heritage.imageDetail.src}
                  alt={ABOUT_SECTION.heritage.imageDetail.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* ============ 4. TABBED — Kisah / Workshop / Wholesale ============ */}
        <Reveal direction="down" delay={0.1} className="flex justify-start overflow-x-auto no-scrollbar mb-12 lg:mb-14 md:justify-center">
          <div className="inline-flex p-1 bg-white border border-[#E5E3DF] relative">
            {TAB_LABELS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-5 py-2.5 text-[11px] font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-200 cursor-pointer z-10 ${
                  activeTab === tab.key
                    ? 'text-white'
                    : 'text-[#6B6B5F] hover:text-[#1A1A1A]'
                }`}
              >
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="aboutTab"
                    className="absolute inset-0 bg-[#1A1A1A] shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          {activeTab === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              <div className="lg:col-span-6 space-y-5 text-[#6B6B5F] leading-relaxed font-light">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
                  {ABOUT_SECTION.story.title}
                </h3>
                {ABOUT_SECTION.story.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <ul className="space-y-3 pt-2 text-sm text-[#4A4A3A]">
                  {ABOUT_SECTION.story.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 border border-[#5A5A40] flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#5A5A40]" />
                      </span>
                      <span className="font-light">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-3 gap-3 pt-3">
                  {ABOUT_SECTION.story.chips.map((chip) => (
                    <div key={chip.label} className="border border-[#E5E3DF] bg-white px-3 py-3.5 text-center">
                      <span className="font-serif text-lg text-[#1A1A1A] block leading-none">{chip.value}</span>
                      <span className="text-[9px] uppercase tracking-[0.15em] text-[#8C8276] font-bold mt-1.5 block">
                        {chip.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                <RevealImg
                  src={ABOUT_SECTION.story.images[0].src}
                  alt={ABOUT_SECTION.story.images[0].alt}
                  className="border border-[#E5E3DF] aspect-[4/5] bg-[#EBE9E4]"
                />
                <div className="space-y-4">
                  <RevealImg
                    src={ABOUT_SECTION.story.images[1].src}
                    alt={ABOUT_SECTION.story.images[1].alt}
                    delay={0.1}
                    className="border border-[#E5E3DF] aspect-square bg-[#EBE9E4]"
                  />
                  <Reveal direction="fade" delay={0.2} className="bg-[#1A1A1A] text-white p-6 border border-[#2A2A2A]">
                    <span className="text-[10px] text-[#8C8276] uppercase font-bold tracking-[0.3em] block mb-2">{ABOUT_SECTION.story.philosophyLabel}</span>
                    <p className="font-serif text-base italic leading-snug text-[#F9F8F6]">
                      {ABOUT_SECTION.story.philosophyQuote}
                    </p>
                  </Reveal>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'workshop' && (
            <motion.div
              key="workshop"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              <div className="lg:col-span-6 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ABOUT_SECTION.workshop.features.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <Reveal key={feat.title} direction="left" delay={i * 0.06} className="h-full">
                      <div className="bg-white p-5 border border-[#E5E3DF] h-full">
                        <Icon className="w-5 h-5 text-[#5A5A40] mb-3" />
                        <p className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wider">{feat.title}</p>
                        <p className="text-xs text-[#6B6B5F] mt-1.5 font-light leading-relaxed">{feat.desc}</p>
                      </div>
                    </Reveal>
                  );
                })}
                <div className="sm:col-span-2 bg-[#1A1A1A] text-white p-5 border border-[#2A2A2A] flex items-center gap-4">
                  <Scissors className="w-5 h-5 text-[#E5C38E] shrink-0" />
                  <p className="text-xs font-light leading-relaxed">{ABOUT_SECTION.workshop.footerNote}</p>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 space-y-5 text-[#6B6B5F] leading-relaxed font-light">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
                  {ABOUT_SECTION.workshop.title}
                </h3>
                {ABOUT_SECTION.workshop.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="flex items-center gap-2.5 pt-1 text-[10px] uppercase tracking-[0.25em] font-bold text-[#5A5A40]">
                  <span className="w-4 h-[1px] bg-[#5A5A40]" />
                  {ABOUT_SECTION.workshop.tagline}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'wholesale' && (
            <motion.div
              key="wholesale"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              <div className="lg:col-span-6 space-y-5 text-[#6B6B5F] leading-relaxed font-light">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
                  {ABOUT_SECTION.wholesale.title}
                </h3>
                {ABOUT_SECTION.wholesale.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {ABOUT_SECTION.wholesale.cards.map((card) => {
                    const Icon = card.icon;
                    return (
                      <div key={card.title} className="bg-white p-5 border border-[#E5E3DF]">
                        <Icon className="w-6 h-6 text-[#5A5A40] mb-2" />
                        <p className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wider">{card.title}</p>
                        <p className="text-xs text-[#6B6B5F] mt-1 font-light">{card.desc}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {ABOUT_SECTION.wholesale.regions.map((region) => (
                    <span
                      key={region}
                      className="border border-[#E5E3DF] bg-white px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#5A5A40]"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 overflow-hidden border border-[#E5E3DF] aspect-[16/10] bg-[#EBE9E4]">
                <img
                  src="/assets/unsplash-1600585152220-90363fe7e115.jpg"
                  alt="Gudang Tekstil & Divisi Wholesale Nusa Atelier"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============ 5. THREE AUTHENTIC PILLARS ============ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-[#E5E3DF]">
          {ABOUT_SECTION.pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={index * 0.1} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.4, ease: LUXURY_EASE }}
                  className="bg-white p-7 border border-[#E5E3DF] h-full hover:border-[#1A1A1A] transition-colors duration-300 relative"
                >
                  <span className="absolute top-5 right-7 font-serif text-3xl text-[#E9E7E1] leading-none select-none">
                    {pillar.num}
                  </span>
                  <div className="w-10 h-10 border border-[#E5E3DF] bg-[#F9F8F6] flex items-center justify-center mb-5">
                    <Icon className="w-4 h-4 text-[#5A5A40]" />
                  </div>
                  <h4 className="font-serif text-lg font-normal text-[#1A1A1A] mb-2">{pillar.title}</h4>
                  <p className="text-xs text-[#6B6B5F] font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* ============ 6. CTA ============ */}
        <Reveal delay={0.1} className="mt-14 flex justify-center">
          <Link
            to="/tentang-kami"
            className="inline-flex items-center justify-center gap-2 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300"
          >
            <span>{ABOUT_SECTION.ctaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>

      </div>
    </section>
  );
};