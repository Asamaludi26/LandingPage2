import React, { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { PRODUCT_CATEGORIES, PRODUCTS_DATA, PRODUCTS_PAGE } from '../content';
import { ArrowUpRight, Tag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LUXURY_EASE } from '../lib/animations';
import { Reveal, RevealImg } from '../components/ui/Reveal';
import { MaskReveal } from '../components/ui/Editorial';
import { PageHero } from '../components/layout/PageHero';
import { PageStaticSections } from '../components/layout/PageStaticSections';
import { usePageActions } from '../components/layout/PageLayout';
import { smoothScrollTo } from '../lib/scroll';

const ADVANTAGES = PRODUCTS_PAGE.advantages;

const CATALOG_DETAILS = PRODUCTS_PAGE.catalogDetails;

export const ProductsPage: React.FC = () => {
  const { openReservation } = usePageActions();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    const initial = searchParams.get('kategori');
    return initial && PRODUCT_CATEGORIES.some((c) => c.id === initial) ? initial : 'all';
  });
  const skipCatalogScrollRef = useRef(false);
  const prevScanKeyRef = useRef('');

  const kategoriFromUrl = searchParams.get('kategori');
  const validKategori =
    kategoriFromUrl && PRODUCT_CATEGORIES.some((c) => c.id === kategoriFromUrl)
      ? kategoriFromUrl
      : null;

  useEffect(() => {
    const currentKey = location.search + location.hash;
    const changed = prevScanKeyRef.current !== currentKey;
    prevScanKeyRef.current = currentKey;
    if (!changed) return;

    setSelectedCategory(validKategori ?? 'all');

    const suppressScroll = skipCatalogScrollRef.current;
    skipCatalogScrollRef.current = false;
    if (suppressScroll) return;

    const timeout = window.setTimeout(() => {
      if (location.hash) {
        smoothScrollTo(location.hash, 1.15);
      } else if (validKategori) {
        smoothScrollTo('#katalog-lengkap', 1.15);
      }
    }, 80);
    return () => window.clearTimeout(timeout);
  }, [location.search, location.hash]);

  const handleCategoryChange = (id: string) => {
    setSelectedCategory(id);
    skipCatalogScrollRef.current = true;
    if (id === 'all') {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ kategori: id }, { replace: true });
    }
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <>
      <PageHero
        breadcrumbLabel={PRODUCTS_PAGE.hero.breadcrumbLabel}
        kicker={PRODUCTS_PAGE.hero.kicker}
        title={PRODUCTS_PAGE.hero.title}
        accent={PRODUCTS_PAGE.hero.accent}
        description={PRODUCTS_PAGE.hero.description}
        image={PRODUCTS_PAGE.hero.image}
        alt={PRODUCTS_PAGE.hero.alt}
      />

      {/* Keunggulan Strip */}
      <section className="py-16 lg:py-20 bg-white border-b border-[#E5E3DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((adv, i) => {
              const Icon = adv.icon;
              return (
                <Reveal key={adv.title} delay={i * 0.08} className="p-6 bg-[#F9F8F6] border border-[#E5E3DF] h-full">
                  <div className="w-10 h-10 border border-[#E5E3DF] bg-white flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#5A5A40]" />
                  </div>
                  <h3 className="font-serif text-lg font-normal text-[#1A1A1A] mb-2">{adv.title}</h3>
                  <p className="text-xs text-[#6B6B5F] font-light leading-relaxed">{adv.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Category Spotlights */}
      {CATALOG_DETAILS.map((cat, idx) => (
        <section
          key={cat.id}
          id={idx === 0 ? 'koleksi-spesialisasi' : undefined}
          className="py-20 lg:py-28 bg-[#F9F8F6] border-b border-[#E5E3DF] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'order-1 lg:order-2' : ''}`}>
                <MaskReveal duration={0.7}>
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-3">
                    Spesialisasi Kami
                  </span>
                </MaskReveal>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight leading-tight mb-2">
                  <MaskReveal delay={0.12} duration={1}>{cat.name}</MaskReveal>
                </h2>
                <MaskReveal delay={0.28} duration={0.9}>
                  <span className="font-serif text-base sm:text-lg italic text-[#5A5A40] block mb-5">{cat.tagline}</span>
                </MaskReveal>
                <Reveal className="space-y-4">
                  <p className="text-[#6B6B5F] text-sm font-light leading-relaxed">{cat.desc}</p>
                  <ul className="space-y-2.5 pt-2">
                    {cat.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#4A4A3A]">
                        <span className="w-1.5 h-1.5 bg-[#5A5A40] mt-1.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.3}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      smoothScrollTo('#katalog-lengkap');
                    }}
                    className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#5A5A40] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Lihat Produk {cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Reveal>
              </div>
              <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'order-2 lg:order-1' : ''}`}>
                <RevealImg
                  src={cat.image}
                  alt={cat.alt}
                  className="border border-[#E5E3DF] aspect-[16/10] bg-[#EBE9E4]"
                />
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Full Catalog */}
      <section id="katalog-lengkap" className="py-20 lg:py-28 bg-white border-b border-[#E5E3DF] overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <MaskReveal duration={0.7}>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
                {PRODUCTS_PAGE.fullCatalog.kicker}
              </span>
            </MaskReveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight">
              <MaskReveal delay={0.12} duration={1}>{PRODUCTS_PAGE.fullCatalog.title1} </MaskReveal>
              <MaskReveal delay={0.28} duration={1}>
                <span className="italic text-[#5A5A40]">{PRODUCTS_PAGE.fullCatalog.titleAccent}</span> {PRODUCTS_PAGE.fullCatalog.title3}
              </MaskReveal>
            </h2>
            <div className="w-12 h-[1px] bg-[#5A5A40] mx-auto mt-4" />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar scroll-smooth">
            <div className="inline-flex p-1 bg-white border border-[#E5E3DF]">
              {PRODUCT_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`relative px-4 py-2 text-[11px] font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                      isActive ? 'text-white' : 'text-[#6B6B5F] hover:text-[#1A1A1A]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="productCatalogPill"
                        className="absolute inset-0 bg-[#1A1A1A] shadow-xs"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.4, ease: LUXURY_EASE }}
                  className="bg-white border border-[#E5E3DF] overflow-hidden hover:border-[#1A1A1A] transition-colors duration-300 flex flex-col group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#EBE9E4]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#5A5A40] uppercase tracking-[0.25em] block mb-1">
                        {product.subtitle}
                      </span>
                      <h3 className="font-serif text-xl font-normal text-[#1A1A1A] mb-2.5 leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-[#6B6B5F] text-xs sm:text-sm line-clamp-3 font-light leading-relaxed mb-4">
                        {product.description}
                      </p>
                      <div className="pt-3 border-t border-[#E5E3DF] mb-4">
                        <p className="text-[10px] font-bold text-[#8C8276] uppercase tracking-[0.2em] mb-1.5">
                          {PRODUCTS_PAGE.fullCatalog.specTitle}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {product.materials.map((mat, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center text-[10px] uppercase tracking-wider text-[#4A4A3A] bg-[#F9F8F6] border border-[#E5E3DF] px-2 py-0.5"
                            >
                              <Tag className="w-2.5 h-2.5 mr-1 text-[#8C8276]" />
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[#E5E3DF] flex items-center justify-between gap-3">
                      <Link
                        to={`/koleksi-produk/${product.id}`}
                        className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#5A5A40] transition-colors flex items-center gap-1.5"
                      >
                        <span>{PRODUCTS_PAGE.fullCatalog.detailLabel}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.025, y: -1.5 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2, ease: LUXURY_EASE }}
                        onClick={openReservation}
                        className="text-[10px] font-bold uppercase tracking-[0.2em] bg-[#26496C] hover:bg-[#1D3A58] text-white px-3.5 py-2 transition-colors cursor-pointer shadow-xs"
                      >
                        {PRODUCTS_PAGE.fullCatalog.reserveLabel}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <PageStaticSections ctaBand={PRODUCTS_PAGE.ctaBand} />
    </>
  );
};