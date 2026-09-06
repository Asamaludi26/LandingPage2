import React from 'react';
import { Check, Calendar, Scissors } from 'lucide-react';
import { motion } from 'motion/react';
import { LUXURY_EASE } from '../lib/animations';
import { ABOUT_PAGE } from '../content';
import { Reveal, RevealImg, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { MaskReveal } from '../components/ui/Editorial';
import { CtaButton } from '../components/ui/CtaButton';
import { PageHero } from '../components/layout/PageHero';
import { PageStaticSections } from '../components/layout/PageStaticSections';
import { usePageActions } from '../components/layout/PageLayout';

const STAT_METRICS = ABOUT_PAGE.metrics;

const MILESTONES = ABOUT_PAGE.journey.milestones;

const CRAFT_PROCESS = ABOUT_PAGE.craft.steps;

const WORKSHOP_FEATURES = ABOUT_PAGE.workshop.features;

const QUALITY_CHECKS = ABOUT_PAGE.quality.checks;

const WARRANTY_ITEMS = ABOUT_PAGE.quality.warrantyItems;

const PILLARS = ABOUT_PAGE.pillars.items;

export const AboutPage: React.FC = () => {
  const { openReservation } = usePageActions();

  return (
    <>
      {/* Page Hero */}
      <PageHero
        breadcrumbLabel={ABOUT_PAGE.hero.breadcrumbLabel}
        kicker={ABOUT_PAGE.hero.kicker}
        title={ABOUT_PAGE.hero.title}
        accent={ABOUT_PAGE.hero.accent}
        description={ABOUT_PAGE.hero.description}
        image={ABOUT_PAGE.hero.image}
        alt={ABOUT_PAGE.hero.alt}
      />

      {/* Metrics Row */}
      <section className="py-16 lg:py-20 bg-[#F9F8F6] border-b border-[#E5E3DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            {STAT_METRICS.map((metric, i) => (
              <Reveal key={metric.label} delay={i * 0.08} className="p-6 bg-white border border-[#E5E3DF]">
                <span className="font-serif text-4xl sm:text-5xl font-normal text-[#1A1A1A] leading-none block">
                  {metric.value}
                </span>
                <span className="mt-3 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold text-[#8C8276] block">
                  {metric.label}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage & Story */}
      <section className="py-20 lg:py-28 bg-[#F9F8F6] border-b border-[#E5E3DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6 text-[#6B6B5F] leading-relaxed font-light">
              <MaskReveal duration={0.7}>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-3">
                  {ABOUT_PAGE.heritage.kicker}
                </span>
              </MaskReveal>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
                <MaskReveal delay={0.12} duration={1}>{ABOUT_PAGE.heritage.title1} </MaskReveal>
                <MaskReveal delay={0.28} duration={1}>
                  <span className="italic text-[#5A5A40]">{ABOUT_PAGE.heritage.titleAccent}</span> {ABOUT_PAGE.heritage.title3}
                </MaskReveal>
              </h2>

              <Reveal className="space-y-5">
                {ABOUT_PAGE.heritage.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Reveal>

              <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E5E3DF]">
                <RevealItem direction="up">
                  <div className="bg-white border border-[#E5E3DF] p-6 h-full">
                    <span className="font-bold text-[#1A1A1A] block text-xs uppercase tracking-wider mb-2">{ABOUT_PAGE.heritage.qualityCard.title}</span>
                    <span className="text-xs text-[#6B6B5F] font-light leading-relaxed">
                      {ABOUT_PAGE.heritage.qualityCard.text}
                    </span>
                  </div>
                </RevealItem>
                <RevealItem direction="up">
                  <div className="bg-white border border-[#E5E3DF] p-6 h-full">
                    <span className="font-bold text-[#1A1A1A] block text-xs uppercase tracking-wider mb-2">{ABOUT_PAGE.heritage.relationshipCard.title}</span>
                    <span className="text-xs text-[#6B6B5F] font-light leading-relaxed">
                      {ABOUT_PAGE.heritage.relationshipCard.text}
                    </span>
                  </div>
                </RevealItem>
              </RevealGroup>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <RevealImg
                src={ABOUT_PAGE.heritage.images[0].src}
                alt={ABOUT_PAGE.heritage.images[0].alt}
                className="border border-[#E5E3DF] aspect-[4/5] bg-[#EBE9E4]"
              />
              <div className="space-y-4">
                <RevealImg
                  src={ABOUT_PAGE.heritage.images[1].src}
                  alt={ABOUT_PAGE.heritage.images[1].alt}
                  delay={0.1}
                  className="border border-[#E5E3DF] aspect-square bg-[#EBE9E4]"
                />
                <Reveal direction="fade" delay={0.2} className="bg-[#1A1A1A] text-white p-6 border border-[#2A2A2A]">
                  <span className="text-[10px] text-[#8C8276] uppercase font-bold tracking-[0.3em] block mb-2">Filosofi</span>
                  <p className="font-serif text-base italic leading-snug text-[#F9F8F6]">
                    {ABOUT_PAGE.heritage.philosophyQuote}
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 lg:py-28 bg-[#151515] border-b border-[#232323] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-16">
            <div className="lg:col-span-8">
              <MaskReveal duration={0.7}>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#9C9A92] font-bold block mb-3">
                  {ABOUT_PAGE.journey.kicker}
                </span>
              </MaskReveal>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#F9F8F6] tracking-tight leading-tight">
                <MaskReveal delay={0.12} duration={1}>{ABOUT_PAGE.journey.title1} </MaskReveal>
                <MaskReveal delay={0.28} duration={1}>
                  <span className="italic text-[#E5C38E]">{ABOUT_PAGE.journey.titleAccent}</span> {ABOUT_PAGE.journey.title3}
                </MaskReveal>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <Reveal direction="up" delay={0.2}>
                <p className="text-[#9C9A92] text-sm font-light leading-relaxed">
                  {ABOUT_PAGE.journey.intro}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[#2A2A2A] border border-[#2A2A2A]">
            {MILESTONES.map((milestone, i) => (
              <Reveal key={milestone.year} delay={i * 0.08} className="h-full">
                <div className="bg-[#151515] p-6 lg:p-7 h-full">
                  <span className="font-serif text-3xl text-[#E5C38E] block leading-none">
                    {milestone.year}
                  </span>
                  <div className="w-8 h-[1px] bg-[#3A3A3A] my-4" />
                  <h4 className="font-serif text-base text-[#F9F8F6] mb-2">{milestone.title}</h4>
                  <p className="text-xs text-[#9C9A92] font-light leading-relaxed">{milestone.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop & Atelier */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#E5E3DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 order-2 lg:order-1">
              <RevealImg
                src={ABOUT_PAGE.workshop.images[0].src}
                alt={ABOUT_PAGE.workshop.images[0].alt}
                className="border border-[#E5E3DF] aspect-square bg-[#EBE9E4]"
              />
              <RevealImg
                src={ABOUT_PAGE.workshop.images[1].src}
                alt={ABOUT_PAGE.workshop.images[1].alt}
                delay={0.1}
                className="border border-[#E5E3DF] aspect-square bg-[#EBE9E4]"
              />
              <Reveal direction="left" delay={0.2} className="col-span-2 bg-[#F9F8F6] p-5 border border-[#E5E3DF]">
                <div className="flex items-center gap-3 text-[#1A1A1A] text-sm font-semibold">
                  <Scissors className="w-5 h-5 text-[#5A5A40]" />
                  <span className="uppercase tracking-wider text-xs font-bold">{ABOUT_PAGE.workshop.noteTitle}</span>
                </div>
                <p className="text-xs text-[#6B6B5F] mt-2 font-light">
                  {ABOUT_PAGE.workshop.noteDesc}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7 space-y-6 text-[#6B6B5F] leading-relaxed font-light order-1 lg:order-2">
              <MaskReveal duration={0.7}>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-3">
                  {ABOUT_PAGE.workshop.kicker}
                </span>
              </MaskReveal>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
                <MaskReveal delay={0.12} duration={1}>{ABOUT_PAGE.workshop.title1} </MaskReveal>
                <MaskReveal delay={0.28} duration={1}>
                  <span className="italic text-[#5A5A40]">{ABOUT_PAGE.workshop.titleAccent}</span> {ABOUT_PAGE.workshop.title3}
                </MaskReveal>
              </h2>

              <Reveal className="space-y-5">
                {ABOUT_PAGE.workshop.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {WORKSHOP_FEATURES.map((feat, i) => {
                  const Icon = feat.icon;
                  return (
                    <Reveal key={feat.title} direction="left" delay={i * 0.06} className="h-full">
                      <div className="bg-white border border-[#E5E3DF] p-5 h-full">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-[#5A5A40]" />
                          <p className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wider">{feat.title}</p>
                        </div>
                        <p className="text-xs text-[#6B6B5F] font-light leading-relaxed mt-2.5">{feat.desc}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>

              <Reveal delay={0.3}>
                <CtaButton variant="primary" onClick={openReservation} className="mt-4">
                  <Calendar className="w-3.5 h-3.5 text-[#AEC0D4]" />
                  <span>{ABOUT_PAGE.workshop.ctaLabel}</span>
                </CtaButton>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Craft Process */}
      <section className="py-20 lg:py-28 bg-[#F9F8F6] border-b border-[#E5E3DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <MaskReveal duration={0.7}>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
                {ABOUT_PAGE.craft.kicker}
              </span>
            </MaskReveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight">
              <MaskReveal delay={0.12} duration={1}>{ABOUT_PAGE.craft.title1} </MaskReveal>
              <MaskReveal delay={0.28} duration={1}>
                <span className="italic text-[#5A5A40]">{ABOUT_PAGE.craft.titleAccent}</span> {ABOUT_PAGE.craft.title3}
              </MaskReveal>
            </h2>
            <div className="w-12 h-[1px] bg-[#5A5A40] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CRAFT_PROCESS.map((proc, i) => {
              const Icon = proc.icon;
              return (
                <Reveal key={proc.step} direction="up" delay={i * 0.08} className="h-full">
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.4, ease: LUXURY_EASE }}
                    className="bg-white border border-[#E5E3DF] p-7 h-full relative hover:border-[#1A1A1A] transition-colors duration-300"
                  >
                    <span className="absolute top-5 right-6 font-serif text-4xl text-[#E9E7E1] leading-none select-none">
                      {proc.step}
                    </span>
                    <div className="w-11 h-11 border border-[#E5E3DF] bg-[#F9F8F6] flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5 text-[#5A5A40]" />
                    </div>
                    <h4 className="font-serif text-lg font-normal text-[#1A1A1A] mb-3 pr-8">{proc.title}</h4>
                    <p className="text-xs text-[#6B6B5F] font-light leading-relaxed">{proc.desc}</p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mt-12 text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8276]">
              {ABOUT_PAGE.craft.note}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quality & Warranty */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#E5E3DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6 text-[#6B6B5F] leading-relaxed font-light">
              <MaskReveal duration={0.7}>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-3">
                  {ABOUT_PAGE.quality.kicker}
                </span>
              </MaskReveal>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
                <MaskReveal delay={0.12} duration={1}>{ABOUT_PAGE.quality.title1} </MaskReveal>
                <MaskReveal delay={0.28} duration={1}>
                  <span className="italic text-[#5A5A40]">{ABOUT_PAGE.quality.titleAccent}</span> {ABOUT_PAGE.quality.title3}
                </MaskReveal>
              </h2>

              <Reveal className="space-y-5">
                <p>{ABOUT_PAGE.quality.paragraph}</p>
              </Reveal>

              <ul className="space-y-3 pt-2 text-sm text-[#4A4A3A]">
                {QUALITY_CHECKS.map((point) => (
                  <Reveal key={point} direction="left">
                    <li className="flex items-start gap-2.5">
                      <span className="w-4 h-4 border border-[#5A5A40] flex items-center justify-center mt-0.5 shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#5A5A40]" />
                      </span>
                      <span className="font-light">{point}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6">
              <RevealImg
                src={ABOUT_PAGE.quality.image.src}
                alt={ABOUT_PAGE.quality.image.alt}
                className="border border-[#E5E3DF] aspect-[16/10] bg-[#EBE9E4]"
              />

              <div className="grid grid-cols-2 gap-px bg-[#E5E3DF] border border-[#E5E3DF] mt-4">
                {WARRANTY_ITEMS.map((item, i) => (
                  <Reveal key={item.label} direction="up" delay={i * 0.06} className="h-full">
                    <div className="bg-[#F9F8F6] p-5 h-full">
                      <span className="font-serif text-3xl text-[#1A1A1A] block leading-none">{item.value}</span>
                      <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#8C8276] mt-2 block">
                        {item.label}
                      </span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Distributor & Wholesale */}
      <section className="py-20 lg:py-28 bg-[#F9F8F6] border-b border-[#E5E3DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6 text-[#6B6B5F] leading-relaxed font-light">
              <MaskReveal duration={0.7}>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-3">
                  {ABOUT_PAGE.wholesale.kicker}
                </span>
              </MaskReveal>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
                <MaskReveal delay={0.12} duration={1}>{ABOUT_PAGE.wholesale.title1} </MaskReveal>
                <MaskReveal delay={0.28} duration={1}>
                  <span className="italic text-[#5A5A40]">{ABOUT_PAGE.wholesale.titleAccent}</span> {ABOUT_PAGE.wholesale.title3}
                </MaskReveal>
              </h2>

              <Reveal className="space-y-5">
                {ABOUT_PAGE.wholesale.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Reveal>

              <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {ABOUT_PAGE.wholesale.cards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <RevealItem key={card.title} direction="up">
                      <div className="bg-white p-6 border border-[#E5E3DF] h-full">
                        <Icon className="w-6 h-6 text-[#5A5A40] mb-3" />
                        <p className="font-bold text-[#1A1A1A] text-xs uppercase tracking-wider mb-1">{card.title}</p>
                        <p className="text-xs text-[#6B6B5F] font-light">{card.desc}</p>
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealGroup>

              <div className="flex flex-wrap gap-2 pt-1">
                {ABOUT_PAGE.wholesale.regions.map((region) => (
                  <span
                    key={region}
                    className="border border-[#E5E3DF] bg-white px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#5A5A40]"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <RevealImg
                src={ABOUT_PAGE.wholesale.image.src}
                alt={ABOUT_PAGE.wholesale.image.alt}
                className="border border-[#E5E3DF] aspect-[16/10] bg-[#EBE9E4]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Authentic Pillars */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#E5E3DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <MaskReveal duration={0.7}>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
                {ABOUT_PAGE.pillars.kicker}
              </span>
            </MaskReveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight">
              <MaskReveal delay={0.12} duration={1}>{ABOUT_PAGE.pillars.title1} </MaskReveal>
              <MaskReveal delay={0.28} duration={1}>
                <span className="italic text-[#5A5A40]">{ABOUT_PAGE.pillars.titleAccent}</span> {ABOUT_PAGE.pillars.title3}
              </MaskReveal>
            </h2>
            <div className="w-12 h-[1px] bg-[#5A5A40] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={index * 0.1} className="h-full">
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.4, ease: LUXURY_EASE }}
                    className="bg-[#F9F8F6] p-8 border border-[#E5E3DF] h-full hover:border-[#1A1A1A] transition-colors duration-300 relative"
                  >
                    <span className="absolute top-6 right-8 font-serif text-3xl text-[#E9E7E1] leading-none select-none">
                      {pillar.num}
                    </span>
                    <div className="w-10 h-10 border border-[#E5E3DF] bg-white flex items-center justify-center mb-5">
                      <Icon className="w-4 h-4 text-[#5A5A40]" />
                    </div>
                    <h4 className="font-serif text-lg font-normal text-[#1A1A1A] mb-3">{pillar.title}</h4>
                    <p className="text-xs text-[#6B6B5F] font-light leading-relaxed">
                      {pillar.desc}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <PageStaticSections ctaBand={ABOUT_PAGE.ctaBand} />
    </>
  );
};