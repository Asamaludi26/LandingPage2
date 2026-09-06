import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { smoothScrollTo } from '../lib/scroll';
import {
  MessageSquareText,
  Ruler,
  Scissors,
  ShieldCheck,
  Check,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { LUXURY_EASE } from '../lib/animations';
import { SERVICES_PAGE, WORKFLOW_STEPS } from '../content';
import { Reveal, RevealImg, RevealGroup, RevealItem } from '../components/ui/Reveal';
import { MaskReveal } from '../components/ui/Editorial';
import { CtaButton } from '../components/ui/CtaButton';
import { PageHero } from '../components/layout/PageHero';
import { PageStaticSections } from '../components/layout/PageStaticSections';
import { ProjectGallery } from '../components/sections/ProjectGallery';
import { usePageActions } from '../components/layout/PageLayout';
import { buildWaLink, allowWaOpen } from '../lib/wa';

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'MessageSquareText':
      return <MessageSquareText className="w-5 h-5 text-[#5A5A40]" />;
    case 'Ruler':
      return <Ruler className="w-5 h-5 text-[#5A5A40]" />;
    case 'Scissors':
      return <Scissors className="w-5 h-5 text-[#5A5A40]" />;
    case 'ShieldCheck':
      return <ShieldCheck className="w-5 h-5 text-[#5A5A40]" />;
    default:
      return <MessageSquareText className="w-5 h-5 text-[#5A5A40]" />;
  }
};

export const ServicesPage: React.FC = () => {
  const { openReservation } = usePageActions();
  const location = useLocation();
  const { hero, overview, serviceLines, process, special, warranty, ctaBand } = SERVICES_PAGE;

  useEffect(() => {
    if (!location.hash) return;
    smoothScrollTo(location.hash);
  }, [location.hash]);

  return (
    <>
      {/* Page Hero */}
      <PageHero
        breadcrumbLabel={hero.breadcrumbLabel}
        kicker={hero.kicker}
        title={hero.title}
        accent={hero.accent}
        description={hero.description}
        image={hero.image}
        alt={hero.alt}
      />

      {/* Overview */}
      <section id="layanan-ikhtisar" className="py-20 lg:py-28 bg-[#F9F8F6] border-b border-[#E5E3DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6 text-[#6B6B5F] leading-relaxed font-light">
              <MaskReveal duration={0.7}>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-3">
                  {overview.kicker}
                </span>
              </MaskReveal>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
                <MaskReveal delay={0.12} duration={1}>{overview.title1} </MaskReveal>
                <MaskReveal delay={0.28} duration={1}>
                  <span className="italic text-[#5A5A40]">{overview.titleAccent}</span> {overview.title3}
                </MaskReveal>
              </h2>

              <Reveal className="space-y-5">
                {overview.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </Reveal>

              <RevealGroup className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E5E3DF]">
                {overview.stats.map((stat) => (
                  <RevealItem key={stat.label} direction="up">
                    <div className="bg-white border border-[#E5E3DF] p-4 sm:p-5 text-center h-full">
                      <div className="w-8 h-8 border border-[#E5E3DF] bg-[#F9F8F6] flex items-center justify-center mx-auto mb-3">
                        <stat.icon className="w-4 h-4 text-[#5A5A40]" />
                      </div>
                      <span className="font-serif text-xl sm:text-2xl font-normal text-[#1A1A1A] block leading-none">
                        {stat.value}
                      </span>
                      <span className="mt-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8276] block">
                        {stat.label}
                      </span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div className="lg:col-span-5">
              <RevealImg
                src={overview.image.src}
                alt={overview.image.alt}
                className="border border-[#E5E3DF] aspect-[4/5] bg-[#EBE9E4]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Lines */}
      <section id="layanan-ruang-lingkup" className="py-20 lg:py-28 bg-white border-b border-[#E5E3DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <MaskReveal duration={0.7}>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
                {serviceLines.kicker}
              </span>
            </MaskReveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
              <MaskReveal delay={0.12} duration={1}>{serviceLines.title1} </MaskReveal>
              <MaskReveal delay={0.28} duration={1}>
                <span className="italic text-[#5A5A40]">{serviceLines.titleAccent}</span>
              </MaskReveal>
            </h2>
            <div className="w-12 h-[1px] bg-[#5A5A40] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {serviceLines.lines.map((line, index) => (
              <Reveal key={line.title} delay={index * 0.08} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.4, ease: LUXURY_EASE }}
                  className="bg-[#F9F8F6] border border-[#E5E3DF] p-8 h-full hover:border-[#1A1A1A] transition-colors duration-300"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 border border-[#E5E3DF] bg-white flex items-center justify-center">
                      <line.icon className="w-5 h-5 text-[#5A5A40]" />
                    </div>
                    <span className="font-serif text-2xl font-normal text-[#D9D7D2]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-normal text-[#1A1A1A] mb-3 leading-snug">
                    {line.title}
                  </h3>
                  <p className="text-[#6B6B5F] text-xs sm:text-sm font-light leading-relaxed mb-5">
                    {line.desc}
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-[#E5E3DF]">
                    {line.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-xs text-[#4A4A3A]">
                        <Check className="w-4 h-4 text-[#5A5A40] mt-[1px] shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process Deep Dive */}
      <section id="layanan-proses" className="py-20 lg:py-28 bg-[#F9F8F6] border-b border-[#E5E3DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <MaskReveal duration={0.7}>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
                {process.kicker}
              </span>
            </MaskReveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
              <MaskReveal delay={0.12} duration={1}>{process.title1} </MaskReveal>
              <MaskReveal delay={0.28} duration={1}>
                <span className="italic text-[#5A5A40]">{process.titleAccent}</span> {process.title3}
              </MaskReveal>
            </h2>
            <div className="w-12 h-[1px] bg-[#5A5A40] mx-auto mt-4" />
          </div>

          <div className="space-y-16 lg:space-y-20">
            {WORKFLOW_STEPS.map((stepItem, index) => (
              <div
                key={stepItem.step}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
              >
                <div className={`lg:col-span-7 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <MaskReveal duration={0.7}>
                    <span className="font-serif text-5xl sm:text-6xl text-[#D9D7D2] block leading-none mb-4">
                      {stepItem.step}
                    </span>
                  </MaskReveal>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-11 h-11 border border-[#E5E3DF] bg-white flex items-center justify-center shrink-0">
                      {getIcon(stepItem.icon)}
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A]">
                      {stepItem.title}
                    </h3>
                  </div>

                  <p className="text-[#6B6B5F] text-sm sm:text-base font-light leading-relaxed mb-6">
                    {stepItem.description}
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-[#4A4A3A] border-l border-[#E5E3DF] pl-6">
                    {process.stages[index].map((detail, dIdx) => (
                      <Reveal key={detail} delay={dIdx * 0.05} direction="left">
                        <li className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-[#5A5A40] mt-[1px] shrink-0" />
                          <span>{detail}</span>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                </div>

                <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <RevealImg
                    src={process.images[index]}
                    alt={`Tahap ${stepItem.step} — ${stepItem.title}`}
                    className="border border-[#E5E3DF] aspect-[4/3] bg-[#EBE9E4]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Services */}
      <section id="layanan-khusus" className="py-20 lg:py-28 bg-white border-b border-[#E5E3DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <MaskReveal duration={0.7}>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
                {special.kicker}
              </span>
            </MaskReveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
              <MaskReveal delay={0.12} duration={1}>{special.title1} </MaskReveal>
              <MaskReveal delay={0.28} duration={1}>
                <span className="italic text-[#5A5A40]">{special.titleAccent}</span>
              </MaskReveal>
            </h2>
            <div className="w-12 h-[1px] bg-[#5A5A40] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {special.services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.08} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.4, ease: LUXURY_EASE }}
                  className="bg-[#F9F8F6] border border-[#E5E3DF] p-7 h-full flex flex-col hover:border-[#1A1A1A] transition-colors duration-300"
                >
                  <div className="w-11 h-11 border border-[#E5E3DF] bg-white flex items-center justify-center mb-5">
                    <service.icon className="w-5 h-5 text-[#5A5A40]" />
                  </div>
                  <h4 className="font-serif text-lg font-normal text-[#1A1A1A] mb-3 leading-snug">
                    {service.title}
                  </h4>
                  <p className="text-[#6B6B5F] text-xs font-light leading-relaxed mb-5">
                    {service.desc}
                  </p>
                  <ul className="space-y-2 mt-auto pt-4 border-t border-[#E5E3DF]">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-[11px] text-[#4A4A3A]">
                        <Check className="w-3.5 h-3.5 text-[#5A5A40] mt-[1px] shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 text-center">
            <p className="text-[#6B6B5F] text-sm font-light mb-6">
              {special.note}
            </p>
            <CtaButton
              variant="primary"
              onClick={openReservation}
            >
              <Calendar className="w-3.5 h-3.5 text-[#AEC0D4]" />
              <span>{special.ctaLabel}</span>
            </CtaButton>
          </Reveal>
        </div>
      </section>

      {/* Warranty & After Sales */}
      <section id="layanan-garansi" className="py-20 lg:py-28 bg-[#F9F8F6] border-b border-[#E5E3DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <MaskReveal duration={0.7}>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-3">
                  {warranty.kicker}
                </span>
              </MaskReveal>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight leading-tight mb-6">
                <MaskReveal delay={0.12} duration={1}>{warranty.title1} </MaskReveal>
                <MaskReveal delay={0.28} duration={1}>
                  <span className="italic text-[#5A5A40]">{warranty.titleAccent}</span> {warranty.title3}
                </MaskReveal>
              </h2>
              <Reveal>
                <p className="text-[#6B6B5F] text-sm sm:text-base font-light leading-relaxed">
                  {warranty.paragraph}
                </p>
              </Reveal>

              <Reveal delay={0.2} className="mt-8">
                <CtaButton
                  variant="secondary"
                  href={buildWaLink(warranty.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => {
                    if (!allowWaOpen()) {
                      event.preventDefault();
                    }
                  }}
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>{warranty.ctaLabel}</span>
                </CtaButton>
              </Reveal>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {warranty.items.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.08} className="h-full">
                  <div className="bg-white border border-[#E5E3DF] p-7 h-full hover:border-[#1A1A1A] transition-colors duration-300">
                    <div className="w-10 h-10 border border-[#E5E3DF] bg-[#F9F8F6] flex items-center justify-center mb-4">
                      <item.icon className="w-4 h-4 text-[#5A5A40]" />
                    </div>
                    <h4 className="font-serif text-lg font-normal text-[#1A1A1A] mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#6B6B5F] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProjectGallery />

      <PageStaticSections
        ctaBand={ctaBand}
      />
    </>
  );
};