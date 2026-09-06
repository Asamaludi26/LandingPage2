import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PRODUCT_CATEGORIES,
  PRODUCTS_DATA,
  PRODUCT_CATEGORIES_SECTION,
} from "../../content";
import { ArrowRight, ArrowUpRight, Sparkles, Tag } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  LUXURY_EASE,
  microButton,
} from "../../lib/animations";
import { MaskReveal } from "../ui/Editorial";
import { CtaButton } from "../ui/CtaButton";

interface ProductCategoriesProps {
  onOpenReservation: () => void;
}

export const ProductCategories: React.FC<ProductCategoriesProps> = ({
  onOpenReservation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredProducts =
    selectedCategory === "all"
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="koleksi-produk"
      className="py-20 lg:py-28 bg-[#F9F8F6] border-b border-[#E5E3DF]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <MaskReveal duration={0.7}>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
                {PRODUCT_CATEGORIES_SECTION.kicker}
              </span>
            </MaskReveal>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-tight">
              <MaskReveal delay={0.12} duration={1}>{PRODUCT_CATEGORIES_SECTION.headingTop}</MaskReveal>
              <MaskReveal delay={0.28} duration={1}>
                <span className="italic text-[#5A5A40]">{PRODUCT_CATEGORIES_SECTION.headingAccent}</span>
                {PRODUCT_CATEGORIES_SECTION.headingTail}
              </MaskReveal>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.7, delay: 0.4, ease: LUXURY_EASE }}
            className="mt-4 md:mt-0 md:text-right"
          >
            <p className="text-[#6B6B5F] text-xs sm:text-sm max-w-xs font-light">
              {PRODUCT_CATEGORIES_SECTION.paragraph}
            </p>
          </motion.div>
        </div>

        {/* Category Filter Pills - Sliding Active Indicator (State Transition) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5, margin: '0px 0px -40px 0px' }}
          transition={{ duration: 0.6, delay: 0.45, ease: LUXURY_EASE }}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar scroll-smooth"
        >
          <div className="inline-flex p-1 bg-white border border-[#E5E3DF]">
            {PRODUCT_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative px-4 py-2 text-[11px] font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "text-white"
                      : "text-[#6B6B5F] hover:text-[#1A1A1A]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="categoryActivePill"
                      className="absolute inset-0 bg-[#1A1A1A] shadow-xs"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Products Grid with Animated Entrance on Category Switch */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product, index) => {
              const categoryLabel =
                PRODUCT_CATEGORIES.find((c) => c.id === product.category)?.label ?? '';
              return (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.4, ease: LUXURY_EASE }}
                className="group bg-white border border-[#E5E3DF] overflow-hidden shadow-xs hover:border-[#1A1A1A] transition-colors duration-300 flex flex-col"
              >
                {/* Image with Tag */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EBE9E4]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="w-1 h-1 bg-[#5A5A40] shrink-0" />
                      <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#8C8276]">
                        {categoryLabel}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-normal text-[#1A1A1A] leading-snug mb-1.5">
                      {product.name}
                    </h3>
                    <p className="font-serif text-sm italic text-[#5A5A40] line-clamp-1 mb-3">
                      {product.subtitle}
                    </p>
                    <p className="text-[#6B6B5F] text-xs sm:text-sm line-clamp-2 font-light leading-relaxed">
                      {product.description}
                    </p>

                    {/* Materials Tag List */}
                    <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-[#E5E3DF]">
                      {product.materials.slice(0, 2).map((mat, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center text-[9px] uppercase tracking-wider text-[#6B6B5F] bg-[#F9F8F6] border border-[#E5E3DF] px-2 py-1"
                        >
                          <Tag className="w-2.5 h-2.5 mr-1 text-[#8C8276]" />
                          {mat}
                        </span>
                      ))}
                      {product.materials.length > 2 && (
                        <span className="inline-flex items-center text-[9px] uppercase tracking-wider text-[#8C8276] border border-dashed border-[#D9D7D2] px-2 py-1">
                          +{product.materials.length - 2}{PRODUCT_CATEGORIES_SECTION.extraMaterialsLabel}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="pt-5 mt-5 border-t border-[#E5E3DF] flex items-center justify-between gap-3">
                    <Link
                      to={`/koleksi-produk/${product.id}`}
                      className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] hover:text-[#5A5A40] transition-colors flex items-center gap-1.5 group/link"
                    >
                      <span>{PRODUCT_CATEGORIES_SECTION.detailLabel}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </Link>

                    <motion.button
                      {...microButton}
                      onClick={onOpenReservation}
                      className="text-[10px] font-bold uppercase tracking-[0.2em] bg-[#26496C] hover:bg-[#1D3A58] text-white px-3.5 py-2 transition-colors cursor-pointer shadow-xs"
                    >
{PRODUCT_CATEGORIES_SECTION.reserveCardLabel}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner Notice with Micro-interactions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, margin: '0px 0px -40px 0px' }}
          transition={{ duration: 0.65, delay: 0.05, ease: LUXURY_EASE }}
          className="mt-14 bg-white text-[#1A1A1A] p-6 sm:p-8 border border-[#E5E3DF] border-l-4 border-l-[#5A5A40] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 border border-[#E5E3DF] bg-[#F9F8F6] flex items-center justify-center shrink-0 text-[#5A5A40]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-normal text-[#1A1A1A]">
                {PRODUCT_CATEGORIES_SECTION.banner.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#6B6B5F] font-light mt-0.5">
                {PRODUCT_CATEGORIES_SECTION.banner.text}
              </p>
            </div>
          </div>
          <CtaButton
            variant="primary"
            onClick={onOpenReservation}
            className="whitespace-nowrap w-full sm:w-auto"
          >
            {PRODUCT_CATEGORIES_SECTION.banner.ctaLabel}
          </CtaButton>
        </motion.div>

        {/* Detail CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/koleksi-produk"
            className="inline-flex items-center gap-2 border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300"
          >
            <span>{PRODUCT_CATEGORIES_SECTION.detailCtaLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
