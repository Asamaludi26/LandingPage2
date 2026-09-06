import React, { useState } from 'react';
import { SHOWROOMS_DATA, SHOWROOMS_SECTION, Showroom } from '../../content';
import { MapPin, Phone, Clock, Navigation, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LUXURY_EASE, microButton } from '../../lib/animations';
import { MaskReveal } from '../ui/Editorial';
import { ShowroomReservationModal } from '../modals/ShowroomReservationModal';

export const ShowroomsSection: React.FC = () => {
  const [selectedShowroom, setSelectedShowroom] = useState<Showroom>(SHOWROOMS_DATA[0]);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <section id="showroom" className="py-20 lg:py-28 bg-[#F9F8F6] border-b border-[#E5E3DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <MaskReveal duration={0.7}>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#8C8276] font-bold block mb-2">
              {SHOWROOMS_SECTION.kicker}
            </span>
          </MaskReveal>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1A1A] tracking-tight leading-tight">
            <MaskReveal delay={0.12} duration={1}>{SHOWROOMS_SECTION.headingTop}</MaskReveal>
            <MaskReveal delay={0.28} duration={1}>
              <span className="italic text-[#5A5A40]">{SHOWROOMS_SECTION.headingAccent}</span>
              {SHOWROOMS_SECTION.headingTail}
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
            {SHOWROOMS_SECTION.paragraph}
          </motion.p>
        </div>

        {/* Location Select Buttons */}
        <div className="flex justify-start overflow-x-auto no-scrollbar mb-12 md:justify-center">
          <div className="inline-flex p-1 bg-white border border-[#E5E3DF] relative">
            {SHOWROOMS_DATA.map((sr) => (
              <button
                key={sr.id}
                onClick={() => setSelectedShowroom(sr)}
                className={`relative px-5 py-2.5 text-[11px] font-bold tracking-[0.2em] uppercase whitespace-nowrap transition-colors cursor-pointer z-10 ${
                  selectedShowroom.id === sr.id
                    ? 'text-white'
                    : 'text-[#6B6B5F] hover:text-[#1A1A1A]'
                }`}
              >
                {selectedShowroom.id === sr.id && (
                  <motion.div
                    layoutId="showroomTab"
                    className="absolute inset-0 bg-[#1A1A1A] shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{sr.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Showroom Display with Smooth Content Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedShowroom.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: LUXURY_EASE }}
            className="bg-white border border-[#E5E3DF] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xs"
          >
            
            {/* Information Column */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-[#5A5A40] text-[10px] font-bold uppercase tracking-[0.25em] mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#26496C]" />
                  <span>{selectedShowroom.district}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1A1A1A] mb-4 leading-snug">
                  {selectedShowroom.name}
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-[#4A4A3A] font-light mb-8">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#8C8276] mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">{SHOWROOMS_SECTION.infoLabels.address}</p>
                      <p className="text-[#6B6B5F]">{selectedShowroom.address}</p>
                      <p className="text-[#8C8276] text-xs mt-0.5">{selectedShowroom.city}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#8C8276] mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">{SHOWROOMS_SECTION.infoLabels.hours}</p>
                      <p className="text-[#6B6B5F]">{selectedShowroom.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#8C8276] mt-1 shrink-0" />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">{SHOWROOMS_SECTION.infoLabels.phone}</p>
                      <a
                        href={`tel:${selectedShowroom.phone}`}
                        className="text-[#1A1A1A] hover:text-[#26496C] font-medium underline decoration-[#E5E3DF]"
                      >
                        {selectedShowroom.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div className="border-t border-[#E5E3DF] pt-6 mb-8">
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#8C8276] mb-3">
                    {SHOWROOMS_SECTION.infoLabels.facilities}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedShowroom.facilities.map((fac, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4A4A3A]">
                        <span className="w-1.5 h-1.5 bg-[#5A5A40] shrink-0 mt-1.5" />
                        <span>{fac}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-5 border-t border-[#E5E3DF]">
                <motion.a
                  {...microButton}
                  href={selectedShowroom.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{SHOWROOMS_SECTION.actionLabels.maps}</span>
                </motion.a>

                <motion.button
                  {...microButton}
                  onClick={() => setIsReservationOpen(true)}
                  className="w-full sm:w-auto bg-[#26496C] hover:bg-[#1D3A58] text-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#AEC0D4]" />
                  <span>{SHOWROOMS_SECTION.actionLabels.reserve}</span>
                </motion.button>
              </div>
            </div>

            {/* Visual Showcase / Map Column */}
            <div className="lg:col-span-6 bg-[#EBE9E4] relative min-h-[380px] flex flex-col">
              <div className="relative flex-1 aspect-[16/10] lg:aspect-auto overflow-hidden">
                <iframe
                  src={selectedShowroom.mapEmbedUrl}
                  title={`Peta ${selectedShowroom.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              {/* Embed Map Preview Link Bar */}
              <div className="p-4 bg-white border-t border-[#E5E3DF] text-[#1A1A1A] text-xs flex items-center justify-between">
                <span className="flex items-center gap-2 text-[#6B6B5F]">
                  <MapPin className="w-3.5 h-3.5 text-[#26496C]" />
                  {selectedShowroom.address}
                </span>
                <a
                  href={selectedShowroom.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1A1A1A] hover:text-[#26496C] font-bold text-[10px] uppercase tracking-[0.2em]"
                >
                  {SHOWROOMS_SECTION.actionLabels.openMap} &rarr;
                </a>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      <ShowroomReservationModal
        isOpen={isReservationOpen}
        showroom={selectedShowroom}
        onClose={() => setIsReservationOpen(false)}
      />
    </section>
  );
};
