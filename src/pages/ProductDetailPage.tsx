import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Tag,
  Sparkles,
  Check,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import { PRODUCT_CATEGORIES, PRODUCTS_DATA, PRODUCT_DETAIL_PAGE } from '../content';
import { buildWaLink, allowWaOpen } from '../lib/wa';
import { CtaButton } from '../components/ui/CtaButton';
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon';
import { Reveal } from '../components/ui/Reveal';
import { MaskReveal, CinematicImg } from '../components/ui/Editorial';
import { PageStaticSections } from '../components/layout/PageStaticSections';
import { usePageActions } from '../components/layout/PageLayout';

const QUICK_FACTS = PRODUCT_DETAIL_PAGE.quickFacts;

const ORDER_STEPS = PRODUCT_DETAIL_PAGE.order.steps;

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { openReservation } = usePageActions();

  const N = PRODUCTS_DATA.length;
  const sliderRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const draggedRef = useRef(false);
  const indexRef = useRef(0);
  const [slide, setSlide] = useState(0);
  const [smooth, setSmooth] = useState(true);
  const [cardW, setCardW] = useState(300);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setActiveImg(0);
  }, [productId]);

  useLayoutEffect(() => {
    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      const raw = el.clientWidth;
      const cols = raw >= 900 ? 3 : raw >= 600 ? 2 : 1;
      setCardW((raw - 24 * (cols - 1)) / cols);
    };
    measure();
    setSmooth(false);
    const id = requestAnimationFrame(() => setSmooth(true));
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const animateTo = (i: number) => {
    indexRef.current = i;
    setSlide(i);
  };

  const goNext = () => {
    const current = indexRef.current;
    if (current >= 2 * N - 1) {
      const base = current - N;
      indexRef.current = base;
      setSmooth(false);
      setSlide(base);
      requestAnimationFrame(() => {
        setSmooth(true);
        animateTo(base + 1);
      });
    } else {
      animateTo(current + 1);
    }
  };

  const goPrev = () => {
    const current = indexRef.current;
    if (current <= N) {
      const base = current + N;
      indexRef.current = base;
      setSmooth(false);
      setSlide(base);
      requestAnimationFrame(() => {
        setSmooth(true);
        animateTo(base - 1);
      });
    } else {
      animateTo(current - 1);
    }
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    draggedRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 8) draggedRef.current = true;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) >= 40) {
      if (dx < 0) goNext();
      else goPrev();
    }
  };

  const handlePointerCancel = () => {
    dragStartX.current = null;
  };

  const product = PRODUCTS_DATA.find((p) => p.id === productId);

  if (!product) {
    return <Navigate to="/koleksi-produk" replace />;
  }

  const categoryLabel =
    PRODUCT_CATEGORIES.find((c) => c.id === product.category)?.label ?? 'Produk';

  const waSample = buildWaLink(
    `Halo Nusa Atelier, saya tertarik dengan produk ${product.name}. Mohon informasi ketersediaan sampel kain dan jadwal survei pengukuran.`,
  );

  const allImages = [product.image, ...product.galleryImages];

  const renderCard = (p: (typeof PRODUCTS_DATA)[number], idx: number) => {
    const label = PRODUCT_CATEGORIES.find((c) => c.id === p.category)?.label ?? '';
    return (
      <div
        key={`${p.id}-${idx}`}
        data-slide
        className="shrink-0"
        style={{ width: `${cardW}px` }}
      >
        <Link
          to={`/koleksi-produk/${p.id}`}
          className="group flex h-full flex-col bg-[#F9F8F6] border border-[#E5E3DF] overflow-hidden hover:border-[#1A1A1A] transition-colors duration-300"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-[#EBE9E4]">
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
          </div>
          <div className="p-5 flex flex-col flex-1">
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#8C8276]">
              {label}
            </span>
            <h3 className="font-serif text-lg font-normal text-[#1A1A1A] mt-1 mb-1 leading-snug">
              {p.name}
            </h3>
            <p className="font-serif text-xs italic text-[#5A5A40] line-clamp-1">
              {p.subtitle}
            </p>
            <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] group-hover:text-[#5A5A40] transition-colors">
              {PRODUCT_DETAIL_PAGE.explore.detailLabel}
              <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-[#F9F8F6] border-b border-[#E5E3DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-bold text-[#8C8276] overflow-x-auto no-scrollbar whitespace-nowrap">
            <Link to="/" className="hover:text-[#1A1A1A] transition-colors">
              {PRODUCT_DETAIL_PAGE.homeLabel}
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link to="/koleksi-produk" className="hover:text-[#1A1A1A] transition-colors">
              {PRODUCT_DETAIL_PAGE.catalogLabel}
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-[#1A1A1A]">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-[#F9F8F6] py-14 lg:py-20 border-b border-[#E5E3DF] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <Reveal direction="zoom" duration={0.9}>
                <div className="relative border border-[#E5E3DF] bg-[#EBE9E4] overflow-hidden">
                  <div className="aspect-[4/3]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal direction="fade" duration={0.5}>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#5A5A40] font-bold block mb-3">
                  {categoryLabel}
                </span>
              </Reveal>
              <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-[1.05]">
                <MaskReveal>{product.name}</MaskReveal>
              </h1>
              <Reveal delay={0.15}>
                <p className="font-serif text-base sm:text-lg italic text-[#5A5A40] mt-3">
                  {product.subtitle}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="w-12 h-[1px] bg-[#26496C] mt-6 mb-6" />
                <p className="text-[#6B6B5F] text-sm sm:text-base font-light leading-relaxed max-w-xl">
                  {product.description}
                </p>
              </Reveal>

              <Reveal delay={0.45}>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <CtaButton variant="primary" onClick={openReservation}>
                    <Calendar className="w-3.5 h-3.5 text-[#AEC0D4]" />
                    <span>{PRODUCT_DETAIL_PAGE.hero.reserveLabel}</span>
                  </CtaButton>
                  <CtaButton
                    variant="secondary"
                    href={waSample}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => {
                      if (!allowWaOpen()) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#5A5A40]" />
                    <span>{PRODUCT_DETAIL_PAGE.hero.sampleLabel}</span>
                  </CtaButton>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Galeri Produk */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E3DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <MaskReveal duration={0.7}>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
                {PRODUCT_DETAIL_PAGE.gallery.kicker}
              </span>
            </MaskReveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight">
              <MaskReveal delay={0.12} duration={1}>{PRODUCT_DETAIL_PAGE.gallery.title1} </MaskReveal>
              <MaskReveal delay={0.28} duration={1}>
                <span className="italic text-[#5A5A40]">{PRODUCT_DETAIL_PAGE.gallery.titleAccent}</span>
              </MaskReveal>
            </h2>
          </div>

          <div className="relative overflow-hidden border border-[#E5E3DF]">
            <CinematicImg
              key={activeImg}
              src={allImages[activeImg]}
              alt={`${product.name} — Foto ${activeImg + 1} dari ${allImages.length}`}
              className="aspect-[16/10] lg:aspect-[21/10]"
              duration={0.9}
              pan="none"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() =>
                  setActiveImg((activeImg - 1 + allImages.length) % allImages.length)
                }
                aria-label="Foto sebelumnya"
                className="w-10 h-10 bg-white/90 backdrop-blur-xs border border-white/60 text-[#1A1A1A] flex items-center justify-center hover:bg-white transition-colors cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setActiveImg((activeImg + 1) % allImages.length)}
                aria-label="Foto berikutnya"
                className="w-10 h-10 bg-white/90 backdrop-blur-xs border border-white/60 text-[#1A1A1A] flex items-center justify-center hover:bg-white transition-colors cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Thumbnail grid — desktop */}
          <div className="mt-3 hidden lg:grid grid-cols-6 gap-3">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                aria-label={`Lihat foto ${i + 1}`}
                aria-current={activeImg === i}
                className={`group relative aspect-[16/9] overflow-hidden border transition-colors duration-300 cursor-pointer ${
                  activeImg === i ? 'border-[#26496C]' : 'border-[#E5E3DF] hover:border-[#1A1A1A]'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} — Thumbnail ${i + 1}`}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-all duration-300 ${
                    activeImg === i ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Thumbnail strip geser — mobile & tablet */}
          <div className="mt-3 lg:hidden flex gap-3 overflow-x-auto no-scrollbar touch-pan-x -mx-4 px-4 sm:-mx-6 sm:px-6">
            {allImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                aria-label={`Lihat foto ${i + 1}`}
                aria-current={activeImg === i}
                className={`group relative w-24 sm:w-32 shrink-0 aspect-[16/9] overflow-hidden border transition-colors duration-300 cursor-pointer ${
                  activeImg === i ? 'border-[#26496C]' : 'border-[#E5E3DF]'
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} — Thumbnail ${i + 1}`}
                  loading="lazy"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    activeImg === i ? 'opacity-100' : 'opacity-50'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Spesifikasi & Detail Teknis */}
      <section className="py-20 lg:py-24 bg-[#F9F8F6] border-b border-[#E5E3DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <MaskReveal duration={0.7}>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
                  {PRODUCT_DETAIL_PAGE.specs.kicker}
                </span>
              </MaskReveal>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight mb-8">
                <MaskReveal delay={0.12} duration={1}>{PRODUCT_DETAIL_PAGE.specs.title1} </MaskReveal>
                <MaskReveal delay={0.28} duration={1}>
                  <span className="italic text-[#5A5A40]">{PRODUCT_DETAIL_PAGE.specs.titleAccent}</span>
                </MaskReveal>
              </h2>

              <dl className="bg-white border border-[#E5E3DF]">
                {product.specs.map((spec, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 px-6 py-4 border-b border-[#E5E3DF] last:border-b-0">
                      <dt className="sm:col-span-5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8276] pt-0.5">
                        {spec.label}
                      </dt>
                      <dd className="sm:col-span-7 text-sm text-[#1A1A1A] font-light leading-relaxed">
                        {spec.value}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>

              <p className="mt-5 text-xs text-[#6B6B5F] font-light leading-relaxed">
                {PRODUCT_DETAIL_PAGE.specs.note}
              </p>
            </div>

            <div className="lg:col-span-5">
              <Reveal direction="fade" delay={0.1}>
                <h3 className="font-serif text-2xl font-normal text-[#1A1A1A] mb-6">
                  {PRODUCT_DETAIL_PAGE.needToKnowTitle1} <span className="italic text-[#5A5A40]">{PRODUCT_DETAIL_PAGE.needToKnowAccent}</span>
                </h3>
              </Reveal>
              <div className="space-y-4">
                {QUICK_FACTS.map((fact, i) => (
                  <Reveal key={fact.title} delay={0.15 + i * 0.08}>
                    <div className="bg-white border border-[#E5E3DF] p-5 flex items-start gap-4 hover:border-[#1A1A1A] transition-colors duration-300">
                      <span className="w-10 h-10 border border-[#E5E3DF] bg-[#F9F8F6] flex items-center justify-center shrink-0">
                        <fact.icon className="w-4 h-4 text-[#5A5A40]" />
                      </span>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C8276] mb-1">
                          {fact.title}
                        </p>
                        <p className="text-sm text-[#4A4A3A] font-light leading-relaxed">
                          {fact.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Komposisi Bahan & Komponen */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E3DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <MaskReveal duration={0.7}>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
                {PRODUCT_DETAIL_PAGE.materials.kicker}
              </span>
            </MaskReveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight">
              <MaskReveal delay={0.12} duration={1}>{PRODUCT_DETAIL_PAGE.materials.title1} </MaskReveal>
              <MaskReveal delay={0.28} duration={1}>
                <span className="italic text-[#5A5A40]">{PRODUCT_DETAIL_PAGE.materials.titleAccent}</span>
              </MaskReveal>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {product.materials.map((mat, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="h-full bg-[#F9F8F6] border border-[#E5E3DF] p-6 hover:border-[#1A1A1A] transition-colors duration-300">
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-xs text-[#8C8276]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="w-1 h-1 bg-[#5A5A40]" />
                  </div>
                  <div className="flex items-start gap-3">
                    <Tag className="w-4 h-4 text-[#5A5A40] mt-0.5 shrink-0" />
                    <p className="text-sm font-medium text-[#1A1A1A] leading-relaxed">{mat}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fitur Utama + Callouts */}
      <section className="py-20 lg:py-24 bg-[#F9F8F6] border-b border-[#E5E3DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal direction="fade" duration={0.5}>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
                  {PRODUCT_DETAIL_PAGE.features.kicker}
                </span>
              </Reveal>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight mb-8">
                <MaskReveal delay={0.12} duration={1}>{PRODUCT_DETAIL_PAGE.features.title1} </MaskReveal>
                <MaskReveal delay={0.28} duration={1}>
                  <span className="italic text-[#5A5A40]">{PRODUCT_DETAIL_PAGE.features.titleAccent}</span>
                </MaskReveal>
              </h2>
              <ul className="space-y-4">
                {product.features.map((feat, i) => (
                  <Reveal key={i} delay={i * 0.06} as="li">
                    <div className="bg-white border border-[#E5E3DF] p-5 flex items-start gap-4 hover:border-[#1A1A1A] transition-colors duration-300">
                      <span className="w-8 h-8 border border-[#E5E3DF] bg-[#F9F8F6] flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-[#5A5A40]" />
                      </span>
                      <p className="text-sm text-[#4A4A3A] font-light leading-relaxed">{feat}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.15}>
                <div className="bg-white border border-[#E5E3DF] border-l-4 border-l-[#26496C] p-6 mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-[#26496C]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8276]">
                      {PRODUCT_DETAIL_PAGE.callouts.placementTitle}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#1A1A1A] leading-relaxed">
                    {product.popularFor}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="bg-white border border-[#E5E3DF] border-l-4 border-l-[#5A5A40] p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-[#5A5A40]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C8276]">
                      {PRODUCT_DETAIL_PAGE.callouts.craftsmanshipTitle}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6B5F] font-light leading-relaxed">
                    {PRODUCT_DETAIL_PAGE.callouts.craftsmanshipDesc}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Jelajahi Lebih Lanjut */}
      <section className="py-20 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
            <div>
              <MaskReveal duration={0.7}>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
                  {PRODUCT_DETAIL_PAGE.explore.kicker}
                </span>
              </MaskReveal>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight">
                <MaskReveal delay={0.12} duration={1}>{PRODUCT_DETAIL_PAGE.explore.title1} </MaskReveal>
                <MaskReveal delay={0.28} duration={1}>
                  <span className="italic text-[#5A5A40]">{PRODUCT_DETAIL_PAGE.explore.titleAccent}</span>
                </MaskReveal>
              </h2>
            </div>

            {/* Manual Slider Controls */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goPrev}
                aria-label="Geser ke kiri"
                className="w-11 h-11 border border-[#E5E3DF] bg-white hover:border-[#1A1A1A] text-[#1A1A1A] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goNext}
                aria-label="Geser ke kanan"
                className="w-11 h-11 border border-[#E5E3DF] bg-white hover:border-[#1A1A1A] text-[#1A1A1A] flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Manual Slider (Semua Produk, Infinite Loop) */}
          <div
            ref={sliderRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onClickCapture={(e) => {
              if (draggedRef.current) {
                e.preventDefault();
                e.stopPropagation();
                draggedRef.current = false;
              }
            }}
            className="pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 overflow-hidden touch-pan-y select-none"
          >
            <div
              ref={trackRef}
              className="flex gap-6 will-change-transform cursor-grab active:cursor-grabbing"
              style={{
                transform: `translateX(${-slide * (cardW + 24)}px)`,
                transition: smooth
                  ? 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)'
                  : 'none',
              }}
            >
              {[...PRODUCTS_DATA, ...PRODUCTS_DATA, ...PRODUCTS_DATA].map((p, idx) =>
                renderCard(p, idx),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Cara Memesan */}
      <section className="py-20 lg:py-24 bg-white border-b border-[#E5E3DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <MaskReveal duration={0.7}>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
                {PRODUCT_DETAIL_PAGE.order.kicker}
              </span>
            </MaskReveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#1A1A1A] tracking-tight">
              <MaskReveal delay={0.12} duration={1}>{PRODUCT_DETAIL_PAGE.order.title1} </MaskReveal>
              <MaskReveal delay={0.28} duration={1}>
                <span className="italic text-[#5A5A40]">{PRODUCT_DETAIL_PAGE.order.titleAccent}</span>
              </MaskReveal>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ORDER_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.08}>
                <div className="relative h-full bg-[#F9F8F6] border border-[#E5E3DF] p-6 hover:border-[#1A1A1A] transition-colors duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-10 h-10 border border-[#E5E3DF] bg-white flex items-center justify-center">
                      <step.icon className="w-4 h-4 text-[#5A5A40]" />
                    </span>
                    <span className="font-mono text-xs text-[#8C8276]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-normal text-[#1A1A1A] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6B6B5F] font-light leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageStaticSections
        ctaBand={{
          title: PRODUCT_DETAIL_PAGE.ctaBand.title,
          accent: PRODUCT_DETAIL_PAGE.ctaBand.accent,
          description: PRODUCT_DETAIL_PAGE.ctaBand.description.replace(
            '{product}',
            product.name.toLowerCase(),
          ),
        }}
      />
    </>
  );
};