import React from 'react';
import { CTABand } from '../ui/CTABand';
import { ShowroomsSection } from '../sections/ShowroomsSection';
import { Testimonials } from '../sections/Testimonials';
import { FaqSection } from '../sections/FaqSection';

export interface PageCtaBandContent {
  title: string;
  accent?: string;
  description: string;
}

interface PageStaticSectionsProps {
  /** Konten band CTA; `null`/tidak diisi untuk melewati CTABand (mis. beranda). */
  ctaBand?: PageCtaBandContent | null;
  showShowrooms?: boolean;
  showTestimonials?: boolean;
  showFaq?: boolean;
}

/**
 * Deretan penutup statis yang dipakai hampir semua halaman:
 * `CTABand` (opsional) → `ShowroomsSection` → `Testimonials` → `FaqSection`.
 *
 * Satu tempat untuk mengelola/menambah/mengurangi section statis tanpa
 * mengulang markup di tiap halaman. Konten CTA dikirim per-halaman lewat `ctaBand`.
 */
export const PageStaticSections: React.FC<PageStaticSectionsProps> = ({
  ctaBand = null,
  showShowrooms = true,
  showTestimonials = true,
  showFaq = true,
}) => {
  if (!ctaBand && !showShowrooms && !showTestimonials && !showFaq) {
    return null;
  }

  return (
    <>
      {ctaBand && (
        <CTABand
          title={ctaBand.title}
          accent={ctaBand.accent}
          description={ctaBand.description}
        />
      )}
      {showShowrooms && <ShowroomsSection />}
      {showTestimonials && <Testimonials />}
      {showFaq && <FaqSection />}
    </>
  );
};