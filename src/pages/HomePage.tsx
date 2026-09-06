import React from 'react';
import { Hero } from '../components/sections/Hero';
import { AboutSection } from '../components/sections/AboutSection';
import { ProductCategories } from '../components/sections/ProductCategories';
import { EndToEndService } from '../components/sections/EndToEndService';
import { PageStaticSections } from '../components/layout/PageStaticSections';
import { usePageActions } from '../components/layout/PageLayout';
import { smoothScrollTo } from '../lib/scroll';

export const HomePage: React.FC = () => {
  const { openReservation } = usePageActions();

  const handleExploreProducts = () => {
    smoothScrollTo('#koleksi-produk', 1.2);
  };

  return (
    <>
      <Hero onExploreProducts={handleExploreProducts} />

      <AboutSection />

      <ProductCategories
        onOpenReservation={openReservation}
      />

      <EndToEndService onOpenReservation={openReservation} />

      {/* Tanpa CTABand di beranda — sudah ada CTA di EndToEndService */}
      <PageStaticSections ctaBand={null} />
    </>
  );
};