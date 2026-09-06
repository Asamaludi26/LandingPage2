import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { LUXURY_EASE, fadeInUp, viewportConfig } from '../../lib/animations';
import { setSectionHash, smoothScrollTo } from '../../lib/scroll';
import { FOOTER } from '../../content';

interface FooterProps {
  onOpenReservation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (location.pathname === '/') {
      smoothScrollTo(href);
      setSectionHash(href);
    } else {
      navigate('/', { state: { scrollTo: href } });
    }
  };
  return (
    <footer className="bg-[#141414] text-[#F9F8F6] pt-16 pb-12 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand Grid */}
        <motion.div
          {...fadeInUp}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#262626]"
        >
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#5A5A40] flex items-center justify-center bg-[#1A1A1A] text-white">
                <span className="font-serif text-lg tracking-wider text-white">{FOOTER.brandMark}</span>
              </div>
              <div>
                <span className="font-serif text-lg tracking-[0.15em] leading-none uppercase block text-white font-normal">
                  {FOOTER.brand}
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#8C8276] uppercase font-bold">
                  {FOOTER.brandSub}
                </span>
              </div>
            </div>

            <p className="text-[#9C9A92] text-xs sm:text-sm font-light leading-relaxed pr-4">
              {FOOTER.description}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#8C8276]">
              <ShieldCheck className="w-4 h-4 text-[#8C8276]" />
              <span>{FOOTER.guaranteeLabel}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#A69F94]">
              {FOOTER.quickLinksTitle}
            </p>
            <ul className="space-y-2 text-xs text-[#9C9A92] font-light">
              {FOOTER.quickLinks.map((link) =>
                link.type === 'anchor' ? (
                  <li key={link.label}>
                    <a
                      href={link.target}
                      onClick={(e) => handleAnchor(e, link.target)}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.label}>
                    <Link to={link.target} className="hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Product Categories */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#A69F94]">
              {FOOTER.categoriesTitle}
            </p>
            <ul className="space-y-2 text-xs text-[#9C9A92] font-light">
              {FOOTER.categories.map((link) => (
                <li key={link.label}>
                  <Link to={link.target} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom Contacts */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#A69F94]">
              {FOOTER.showroomsTitle}
            </p>
            
            <div className="space-y-3 text-xs text-[#9C9A92] font-light">
              {FOOTER.showrooms.map((showroom) => (
                <div key={showroom.name} className="border-l border-[#333333] pl-3">
                  <p className="font-medium text-white">{showroom.name}</p>
                  <p className="text-[#8C8276] mt-0.5">{showroom.address}</p>
                  <p className="text-[#8C8276] text-[11px] mt-0.5">{showroom.phone}</p>
                </div>
              ))}

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={onOpenReservation}
                  className="bg-white hover:bg-[#EBE9E4] text-[#1A1A1A] font-bold py-2.5 px-3 text-[11px] uppercase tracking-[0.2em] transition-colors text-center cursor-pointer"
                >
                  {FOOTER.reserveLabel}
                </button>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373] font-light">
          <p>{FOOTER.copyrightLine(new Date().getFullYear())}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER.legal.map((item) => (
              <span key={item} className="hover:text-white cursor-pointer transition-colors">
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
