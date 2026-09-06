import React from 'react';
import { Link } from 'react-router-dom';
import { END_TO_END_SERVICE, WORKFLOW_STEPS } from '../../content';
import { MessageSquareText, Ruler, Scissors, ShieldCheck, CheckCircle2, PhoneCall, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { LUXURY_EASE } from '../../lib/animations';
import { MaskReveal } from '../ui/Editorial';
import { Reveal } from '../ui/Reveal';
import { buildWaLink, allowWaOpen } from '../../lib/wa';

interface EndToEndServiceProps {
  onOpenReservation: () => void;
}

export const EndToEndService: React.FC<EndToEndServiceProps> = ({ onOpenReservation }) => {
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
        return <CheckCircle2 className="w-5 h-5 text-[#5A5A40]" />;
    }
  };

  return (
    <section id="layanan" className="py-20 lg:py-28 bg-[#F9F8F6] border-b border-[#E5E3DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <MaskReveal duration={0.7}>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
              {END_TO_END_SERVICE.kicker}
            </span>
          </MaskReveal>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
            <MaskReveal delay={0.12} duration={1}>{END_TO_END_SERVICE.headingTop}</MaskReveal>
            <MaskReveal delay={0.28} duration={1}>
              <span className="italic text-[#5A5A40]">{END_TO_END_SERVICE.headingAccent}</span>
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
            {END_TO_END_SERVICE.paragraph}
          </motion.p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WORKFLOW_STEPS.map((stepItem, index) => (
            <Reveal key={stepItem.step} delay={index * 0.1} className="h-full">
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, ease: LUXURY_EASE }}
                className="bg-white p-7 border border-[#E5E3DF] relative flex flex-col justify-between h-full hover:border-[#1A1A1A] transition-colors duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 border border-[#E5E3DF] bg-[#F9F8F6] flex items-center justify-center">
                      {getIcon(stepItem.icon)}
                    </div>
                    <span className="font-serif text-2xl font-normal text-[#D9D7D2]">
                      {stepItem.step}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-normal text-[#1A1A1A] mb-3 leading-snug">
                    {stepItem.title}
                  </h3>

                  <p className="text-[#6B6B5F] text-xs sm:text-sm font-light leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5E3DF] flex items-center text-[10px] font-bold uppercase tracking-wider text-[#8C8276]">
                  <span className="w-1.5 h-1.5 bg-[#5A5A40] mr-2" />
                  <span>{END_TO_END_SERVICE.stageLabelPrefix}{index + 1}{END_TO_END_SERVICE.stageLabelSuffix}</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Specialized Service Callouts */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Reveal delay={0.05} className="h-full">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.4, ease: LUXURY_EASE }}
              className="bg-white p-8 border border-[#E5E3DF] flex flex-col justify-between h-full hover:border-[#1A1A1A] transition-colors duration-300"
            >
              <div>
                <span className="text-[10px] font-bold text-[#5A5A40] uppercase tracking-[0.25em] block mb-1">
                  {END_TO_END_SERVICE.residential.label}
                </span>
                <h4 className="font-serif text-2xl font-normal text-[#1A1A1A] mb-3">
                  {END_TO_END_SERVICE.residential.title}
                </h4>
                <p className="text-[#6B6B5F] text-xs sm:text-sm font-light leading-relaxed mb-5">
                  {END_TO_END_SERVICE.residential.body}
                </p>
                <ul className="space-y-2.5 text-xs text-[#4A4A3A]">
                  {END_TO_END_SERVICE.residential.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 bg-[#5A5A40] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-[#E5E3DF]">
                <button
                  onClick={onOpenReservation}
                  className="bg-[#26496C] hover:bg-[#1D3A58] text-white w-full sm:w-auto px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#AEC0D4]" />
                  <span>{END_TO_END_SERVICE.residential.ctaLabel}</span>
                </button>
              </div>
            </motion.div>
          </Reveal>

          <Reveal delay={0.15} className="h-full">
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.4, ease: LUXURY_EASE }}
              className="bg-white p-8 border border-[#E5E3DF] flex flex-col justify-between h-full hover:border-[#1A1A1A] transition-colors duration-300"
            >
              <div>
                <span className="text-[10px] font-bold text-[#5A5A40] uppercase tracking-[0.25em] block mb-1">
                  {END_TO_END_SERVICE.architect.label}
                </span>
                <h4 className="font-serif text-2xl font-normal text-[#1A1A1A] mb-3">
                  {END_TO_END_SERVICE.architect.title}
                </h4>
                <p className="text-[#6B6B5F] text-xs sm:text-sm font-light leading-relaxed mb-5">
                  {END_TO_END_SERVICE.architect.body}
                </p>
                <ul className="space-y-2.5 text-xs text-[#4A4A3A]">
                  {END_TO_END_SERVICE.architect.points.map((point) => (
                    <li key={point} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 bg-[#5A5A40] shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t border-[#E5E3DF]">
                <a
                  href={buildWaLink(END_TO_END_SERVICE.architect.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => {
                    if (!allowWaOpen()) {
                      event.preventDefault();
                    }
                  }}
                  className="bg-white hover:bg-[#F9F8F6] text-[#1A1A1A] w-full sm:w-auto border border-[#E5E3DF] hover:border-[#1A1A1A] px-5 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-[#5A5A40]" />
                  <span>{END_TO_END_SERVICE.architect.ctaLabel}</span>
                </a>
              </div>
            </motion.div>
          </Reveal>
        </div>

      {/* Detail CTA */}
        <Reveal className="mt-16 text-center">
          <Link
            to="/layanan"
            className="inline-flex items-center gap-2 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300"
          >
            <span>{END_TO_END_SERVICE.detailCtaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

