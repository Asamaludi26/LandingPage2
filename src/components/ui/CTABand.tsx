import React from 'react';
import { ArrowRight } from 'lucide-react';
import { MaskReveal } from './Editorial';
import { Reveal } from './Reveal';
import { CtaButton } from './CtaButton';
import { WhatsAppIcon } from './WhatsAppIcon';
import { usePageActions } from '../layout/PageLayout';
import { buildWaLink, allowWaOpen } from '../../lib/wa';
import { CTABAND } from '../../content';

interface CTABandProps {
  title: string;
  accent?: string;
  description: string;
}

export const CTABand: React.FC<CTABandProps> = ({ title, accent, description }) => {
  const { openReservation } = usePageActions();

  return (
    <section className="relative bg-[#151515] text-[#F4F1EC] border-y border-[#2A2A2A] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(900px_circle_at_88%_18%,rgba(229,195,142,0.09),transparent_62%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-[1.15] tracking-tight text-balance">
              <MaskReveal once duration={0.9}>
                {title}
              </MaskReveal>
            </h2>

            {accent && (
              <div className="mt-3">
                <MaskReveal once delay={0.16} duration={0.9}>
                  <span className="italic text-[#E5C38E]">{accent}</span>
                </MaskReveal>
              </div>
            )}

            <div className="flex items-center gap-2.5 mt-7 mb-7">
              <span className="w-10 h-px bg-[#E5C38E]/70" />
              <span className="inline-block w-1.5 h-1.5 rotate-45 bg-[#E5C38E]/70" />
            </div>

            <Reveal once delay={0.26}>
              <p className="text-[#A2A098] text-sm sm:text-base font-light leading-relaxed max-w-xl text-pretty">
                {description}
              </p>
            </Reveal>
          </div>

<Reveal once delay={0.36} className="lg:col-span-4">
            <div className="flex flex-col gap-3">
              <CtaButton variant="onDark" fullWidth onClick={openReservation}>
                <span>{CTABAND.reserveLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </CtaButton>

              <CtaButton
                variant="onDark"
                fullWidth
                href={buildWaLink(CTABAND.waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => {
                  if (!allowWaOpen()) {
                    event.preventDefault();
                  }
                }}
              >
                <WhatsAppIcon className="w-4 h-4 text-[#151515]" />
                <span>{CTABAND.waLabel}</span>
              </CtaButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};