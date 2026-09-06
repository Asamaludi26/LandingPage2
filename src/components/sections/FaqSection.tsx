import React, { useState } from 'react';
import { FAQS_DATA, FAQ_SECTION } from '../../content';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LUXURY_EASE } from '../../lib/animations';
import { MaskReveal } from '../ui/Editorial';
import { CtaButton } from '../ui/CtaButton';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { buildWaLink, allowWaOpen } from '../../lib/wa';
import { Reveal } from '../ui/Reveal';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F9F8F6] border-b border-[#E5E3DF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <MaskReveal duration={0.7}>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
              {FAQ_SECTION.kicker}
            </span>
          </MaskReveal>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
            <MaskReveal delay={0.12} duration={1}>{FAQ_SECTION.headingTop}</MaskReveal>
            <MaskReveal delay={0.28} duration={1}>
              <span className="italic text-[#5A5A40]">{FAQ_SECTION.headingAccent}</span>
            </MaskReveal>
          </h2>
          <div className="w-12 h-[1px] bg-[#5A5A40] mx-auto mt-4 mb-4" />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.7, delay: 0.4, ease: LUXURY_EASE }}
            className="text-[#6B6B5F] text-base font-light leading-relaxed"
          >
            {FAQ_SECTION.paragraph}
          </motion.p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={index} delay={index * 0.08}>
                <div
                  className={`bg-white border overflow-hidden shadow-xs transition-[border-color] duration-300 ${
                    isOpen ? 'border-[#1A1A1A]' : 'border-[#E5E3DF] hover:border-[#1A1A1A]'
                  }`}
                >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF9F7] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-4 h-4 transition-colors duration-300 ${isOpen ? 'text-[#5A5A40]' : 'text-[#8C8276]'}`} />
                    <span className={`font-serif text-base sm:text-lg font-normal transition-colors duration-300 ${isOpen ? 'text-[#1A1A1A]' : 'text-[#1A1A1A]'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                      isOpen ? 'rotate-180 text-[#1A1A1A]' : 'text-[#8C8276]'
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: LUXURY_EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-[#6B6B5F] text-xs sm:text-sm font-light leading-relaxed border-t border-[#E5E3DF] bg-[#FAF9F7]">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Still have questions? */}
        <Reveal delay={0.1}>
          <div
            className="mt-12 text-center bg-white p-8 border border-[#E5E3DF] border-l-4 border-l-[#5A5A40] shadow-xs"
          >
            <h4 className="font-serif text-xl font-normal text-[#1A1A1A] mb-2">
              {FAQ_SECTION.askBox.title}
            </h4>
            <p className="text-xs sm:text-sm text-[#6B6B5F] mb-6 font-light">
              {FAQ_SECTION.askBox.text}
            </p>
            <CtaButton
              variant="primary"
              href={buildWaLink(FAQ_SECTION.askBox.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                if (!allowWaOpen()) {
                  event.preventDefault();
                }
              }}
            >
              <WhatsAppIcon className="w-4 h-4 text-white shrink-0" />
              <span>{FAQ_SECTION.askBox.ctaLabel}</span>
            </CtaButton>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
