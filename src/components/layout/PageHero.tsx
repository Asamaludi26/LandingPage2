import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { CtaButton } from '../ui/CtaButton';
import { MaskReveal, CinematicImg } from '../ui/Editorial';
import { Reveal } from '../ui/Reveal';
import { usePageActions } from './PageLayout';
import { PAGE_HERO } from '../../content';

interface PageHeroProps {
  breadcrumbLabel: string;
  kicker: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  alt: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  breadcrumbLabel,
  kicker,
  title,
  accent,
  description,
  image,
  alt,
}) => {
  const { openReservation } = usePageActions();

  return (
    <section className="bg-[#F9F8F6] border-b border-[#E5E3DF] pt-14 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7">
            <Reveal direction="fade" duration={0.5}>
              <nav className="flex items-center gap-2.5 text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8276] mb-7">
                <Link to="/" className="hover:text-[#1A1A1A] transition-colors">
                  {PAGE_HERO.breadcrumbHome}
                </Link>
                <span className="w-1 h-1 bg-[#5A5A40] inline-block" />
                <span className="text-[#1A1A1A]">{breadcrumbLabel}</span>
              </nav>
            </Reveal>

            <MaskReveal duration={0.7}>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#5A5A40] font-bold block mb-3">
                {kicker}
              </span>
            </MaskReveal>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1A1A1A] tracking-tight leading-[1.05]">
              <MaskReveal delay={0.12} duration={1}>
                {title}
              </MaskReveal>
              <MaskReveal delay={0.3} duration={1}>
                <span className="italic text-[#5A5A40]">{accent}</span>
              </MaskReveal>
            </h1>

            <Reveal delay={0.45} className="max-w-xl">
              <div className="w-12 h-[1px] bg-[#26496C] mt-6 mb-6" />
              <p className="text-[#6B6B5F] text-base sm:text-lg font-light leading-relaxed">
                {description}
              </p>
            </Reveal>

            <Reveal delay={0.55}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8">
                <CtaButton variant="primary" onClick={openReservation}>
                  <Calendar className="w-3.5 h-3.5 text-[#AEC0D4]" />
                  <span>{PAGE_HERO.reserveCtaLabel}</span>
                </CtaButton>
              </div>
            </Reveal>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-5">
            <Reveal direction="zoom" duration={0.9}>
              <div className="relative">
                <div className="aspect-[4/5] border border-[#E5E3DF] bg-[#EBE9E4] overflow-hidden">
                  <CinematicImg
                    src={image}
                    alt={alt}
                    pan="up"
                    once={false}
                    className="block w-full h-full m-0"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};