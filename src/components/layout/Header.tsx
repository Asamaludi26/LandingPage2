import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { DRAWER, HEADER_CTA, LOGO, NAV_LINKS, SITE_INFO, TOPBAR, NavChild, NavLink } from '../../content';
import { buildWaLink, WA_DISPLAY, allowWaOpen } from '../../lib/wa';
import { motion, AnimatePresence } from 'motion/react';
import { LUXURY_EASE, EASE_CINEMATIC, navMenuPanel, navMenuChild, navDrawerVariants, navBackdropVariants, navItemStagger, microButton } from '../../lib/animations';
import { setSectionHash, smoothScrollTo } from '../../lib/scroll';
import { useScrollLock } from '../../lib/useScrollLock';

interface HeaderProps {
  onOpenReservation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const drawerRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<Element | null>(null);
  const closeTimer = useRef<number | null>(null);
  const headerBarRef = useRef<HTMLDivElement | null>(null);

  useScrollLock(mobileMenuOpen);

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 160);
  };

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!openMenu) return;
    const handleScrollClose = () => setOpenMenu(null);
    window.addEventListener('scroll', handleScrollClose, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollClose);
  }, [openMenu]);

  // Close the desktop mega menu when clicking outside the header bar
  useEffect(() => {
    if (!openMenu) return;
    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (headerBarRef.current && !headerBarRef.current.contains(target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [openMenu]);

  // Move focus into the drawer when opened, restore when closed
  useEffect(() => {
    if (!mobileMenuOpen) return;

    previouslyFocusedRef.current = document.activeElement;

    const drawer = drawerRef.current;
    const closeButton = drawer?.querySelector<HTMLButtonElement>('button[aria-label="Tutup Menu"]');
    closeButton?.focus();

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !drawer) return;
      const items = Array.from(
        drawer.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])'),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !drawer.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !drawer.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      const prev = previouslyFocusedRef.current;
      if (prev && prev instanceof HTMLElement) prev.focus();
    };
  }, [mobileMenuOpen]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = NAV_LINKS;

  const goToSection = (href: string) => {
    setOpenMenu(null);
    setMobileMenuOpen(false);

    if (location.pathname === '/') {
      smoothScrollTo(href, 1.15);
      setSectionHash(href);
      return;
    }

    navigate('/', { state: { scrollTo: href } });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    goToSection(href);
  };

  const handleChildClick = (e: React.MouseEvent<HTMLAnchorElement>, child: NavChild) => {
    e.preventDefault();
    cancelClose();
    setMobileMenuOpen(false);
    setOpenMenu(null);

    if (child.type === 'anchor') {
      if (location.pathname === '/') {
        smoothScrollTo(child.href, 1.15);
        setSectionHash(child.href);
      } else {
        navigate('/', { state: { scrollTo: child.href } });
      }
      return;
    }

    navigate(child.href);
  };

  const handleDesktopLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    if (link.menu) {
      event.preventDefault();
      cancelClose();
      setOpenMenu(openMenu === link.href ? null : link.href);
      return;
    }
    handleNavClick(event, link.href);
  };

  const openLink = navLinks.find((link) => link.href === openMenu) ?? null;

  const renderMegaContent = () => {
    if (!openLink || !openLink.menu) return null;

    const children = openLink.children ?? [];
    const isCollection = openLink.href === '#koleksi-produk';

    return (
      <motion.div variants={navMenuChild}>
        <div className="flex items-baseline justify-between gap-6 mb-7">
          <h4 className="font-serif text-xl text-[#1A1A1A]">
            Jelajahi <span className="italic text-[#5A5A40]">{openLink.label}</span>
          </h4>
          <div className="flex items-center gap-6">
            {openLink.menuSubtitle && (
              <p className="text-xs text-[#6B6B5F] font-light text-right max-w-md hidden sm:block">
                {openLink.menuSubtitle}
              </p>
            )}
            <a
              href={isCollection ? '/koleksi-produk' : '/layanan'}
              onClick={(e) =>
                handleChildClick(e, {
                  label: 'Semua',
                  href: isCollection ? '/koleksi-produk' : '/layanan',
                  type: 'route',
                })
              }
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#26496C] hover:text-[#1D3A58] transition-colors cursor-pointer"
            >
              Lihat Semua
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-1.5">
          {children.map((child, index) => (
            <motion.a
              key={child.href + child.label}
              href={child.href}
              custom={index}
              variants={navMenuChild}
              onClick={(e) => handleChildClick(e, child)}
              className="group flex items-start justify-between gap-4 px-4 py-4 border border-transparent hover:bg-[#F5F3EE] hover:border-[#E5E3DF] transition-colors duration-200 cursor-pointer"
            >
              <span className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1A1A1A] group-hover:text-[#26496C] transition-colors">
                  {child.label}
                </span>
                {child.description && (
                  <span className="text-xs text-[#6B6B5F] font-light leading-relaxed">
                    {child.description}
                  </span>
                )}
              </span>
              {child.type === 'anchor' ? (
                <ArrowRight className="w-4 h-4 text-[#8C8276] group-hover:text-[#26496C] group-hover:translate-x-0.5 transition-all duration-200 shrink-0 mt-0.5" />
              ) : (
                <ArrowUpRight className="w-4 h-4 text-[#8C8276] group-hover:text-[#26496C] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200 shrink-0 mt-0.5" />
              )}
            </motion.a>
          ))}
        </div>
      </motion.div>
    );
  };

  const renderMobileMenuItems = () => {
    return navLinks.map((link, idx) => {
      const hasMenu = Boolean(link.menu && link.children);
      const isExpanded = expandedItem === link.href;

      if (!hasMenu) {
        return (
          <motion.a
            key={link.href}
            custom={idx}
            variants={navItemStagger}
            initial="closed"
            animate="open"
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="flex items-center justify-between py-3 px-3 border-b border-[#EBE8E2] text-xs uppercase tracking-[0.2em] font-semibold text-[#55554B] hover:text-[#1A1A1A] hover:bg-[#EFECE6] transition-all cursor-pointer group"
          >
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              {link.label}
            </span>
            <ChevronRight className="w-4 h-4 text-[#8C8276] group-hover:text-[#1A1A1A] group-hover:translate-x-1 transition-all duration-200" />
          </motion.a>
        );
      }

      return (
        <motion.div
          key={link.href}
          custom={idx}
          variants={navItemStagger}
          initial="closed"
          animate="open"
          className="border-b border-[#EBE8E2]"
        >
          <button
            type="button"
            onClick={() => setExpandedItem(isExpanded ? null : link.href)}
            aria-expanded={isExpanded}
            className="w-full flex items-center justify-between py-3 px-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#55554B] hover:text-[#1A1A1A] hover:bg-[#EFECE6] transition-all cursor-pointer group"
          >
            <span className="group-hover:translate-x-1 transition-transform duration-200">
              {link.label}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#8C8276] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                key="submenu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: LUXURY_EASE }}
                className="overflow-hidden"
              >
                <div className="py-2 pl-3">
                  {(link.children ?? []).map((child) => (
                    <a
                      key={child.href + child.label}
                      href={child.href}
                      onClick={(e) => handleChildClick(e, child)}
                      className="flex items-start justify-between gap-3 py-2.5 px-3 text-[11px] text-[#55554B] hover:text-[#1A1A1A] hover:bg-[#EFECE6] transition-colors cursor-pointer"
                    >
                      <span>
                        <span className="block font-semibold uppercase tracking-[0.14em] leading-snug">
                          {child.label}
                        </span>
                        {child.description && (
                          <span className="block mt-0.5 font-light text-[#8C8276] normal-case">
                            {child.description}
                          </span>
                        )}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#8C8276] shrink-0 mt-0.5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#1A1A1A] text-[#F9F8F6] text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-[#2A2A2A] hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] tracking-wide">
          
          {/* Left utility items */}
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2 text-[#8C8276]">
              <MapPin className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
              <span className="text-[#D9D7D2] font-normal leading-none">{TOPBAR.showroomLine}</span>
            </span>

            <span className="inline-flex items-center gap-2 text-[#8C8276]">
              <Clock className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
              <span className="text-[#D9D7D2] font-normal leading-none">{SITE_INFO.operationalHours}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 text-[#E5E3DF] text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#262626] px-2.5 py-1 border border-[#3A3A3A] leading-none">
              <Sparkles className="w-3 h-3 text-[#5A5A40] shrink-0" />
              <span>{TOPBAR.freeSurveyLabel}</span>
            </span>
          </div>

          {/* Right utility items */}
          <div className="flex items-center gap-5 text-[11px] tracking-wider uppercase font-medium">
            <a
              href={`tel:${SITE_INFO.phoneGeneral}`}
              className="inline-flex items-center gap-1.5 text-[#8C8276] hover:text-white transition-colors leading-none"
            >
              <Phone className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
              <span>{SITE_INFO.phoneGeneral}</span>
            </a>

            <span className="text-[#3A3A3A]">•</span>

            <a
              href={buildWaLink(TOPBAR.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                if (!allowWaOpen()) {
                  event.preventDefault();
                }
              }}
              className="inline-flex items-center gap-1.5 text-[#D9D7D2] hover:text-white transition-colors leading-none"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
              <span>WA: {WA_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - State Transition (Sticky Background, Padding & Blur) */}
      <motion.div
        ref={headerBarRef}
        className={`relative transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F9F8F6]/95 backdrop-blur-md shadow-sm py-2.5 border-b border-[#E5E3DF]'
            : 'bg-[#F9F8F6] py-4 border-b border-[#E5E3DF]/70'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Logo / Brand Mark with Micro-interaction */}
          <motion.a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              if (location.pathname === '/') {
                smoothScrollTo('#beranda', 1.15);
                setSectionHash('#beranda');
              } else {
                navigate('/');
              }
            }}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            className="flex items-center gap-3.5 group shrink-0"
          >
            <div className="w-9 h-9 border border-[#1A1A1A] flex items-center justify-center bg-[#1A1A1A] text-white transition-all duration-300 group-hover:bg-[#2A2A2A] shrink-0">
              <span className="font-serif font-bold text-sm tracking-wider text-[#F9F8F6]">{LOGO.mark}</span>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-1 leading-tight">
                <span className="text-xl sm:text-2xl font-serif tracking-tight font-bold uppercase text-[#1A1A1A]">
                  {LOGO.brand}
                </span>
                <span className="text-lg sm:text-xl font-serif font-light italic lowercase text-[#5A5A40]">
                  {LOGO.brandSuffix}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 leading-none">
                <span className="text-[9px] tracking-[0.28em] text-[#8C8276] font-bold uppercase">
                  {LOGO.brandSub}
                </span>
                <span className="text-[8px] text-[#5A5A40] tracking-widest uppercase font-semibold">
                  • {LOGO.estLabel}
                </span>
              </div>
            </div>
          </motion.a>

          {/* Desktop Nav Links with Elegant Dropdown Menus */}
          <nav
            onMouseLeave={scheduleClose}
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[11px] uppercase tracking-[0.18em] font-semibold text-[#6B6B5F] relative py-1"
          >
            {navLinks.map((link) => {
              const hasMenu = Boolean(link.menu && link.children);
              const isOpen = openMenu === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenMenu(hasMenu ? link.href : null);
                  }}
                  onFocus={() => {
                    if (hasMenu) setOpenMenu(link.href);
                  }}
                  onClick={(e) => handleDesktopLinkClick(e, link)}
                  aria-haspopup={hasMenu ? 'true' : undefined}
                  aria-expanded={hasMenu ? isOpen : undefined}
                  className="relative px-3 py-1.5 transition-colors text-[#55554B] hover:text-[#1A1A1A] whitespace-nowrap cursor-pointer z-10"
                >
                  <span className="flex items-center gap-1.5">
                    <span>{link.label}</span>
                    {hasMenu && (
                      <ChevronDown
                        className={`w-3 h-3 text-[#8C8276] transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-[#26496C]' : ''
                        }`}
                      />
                    )}
                  </span>
                  {isOpen && (
                    <motion.span
                      layoutId="desktopNavUnderline"
                      className="absolute left-3 right-3 -bottom-[2px] h-[2px] bg-[#26496C]"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.35 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs with Micro-interaction */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <motion.button
              onClick={onOpenReservation}
              {...microButton}
              className="text-[11px] uppercase tracking-[0.18em] font-bold bg-[#26496C] hover:bg-[#1D3A58] text-white px-4.5 py-2.5 shadow-xs transition-colors flex items-center gap-2 group whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#AEC0D4] group-hover:text-white shrink-0 transition-colors" />
              <span>{HEADER_CTA.showroomLabel}</span>
            </motion.button>
          </div>

          {/* Mobile Menu Trigger with Micro-interaction */}
          <div className="lg:hidden flex items-center gap-2">
            <motion.button
              onClick={onOpenReservation}
              {...microButton}
              className="text-[10px] uppercase tracking-wider font-bold bg-[#26496C] text-white px-3 py-1.5 sm:hidden cursor-pointer"
            >
              {HEADER_CTA.mobileShowroomLabel}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-[#1A1A1A] hover:text-[#5A5A40] focus:outline-none cursor-pointer"
              aria-label="Buka Menu Navigasi"
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Desktop Mega Menu Panel */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              key={openMenu}
              variants={navMenuPanel}
              initial="hidden"
              animate="visible"
              exit="exit"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className="absolute left-0 right-0 top-full z-50 hidden lg:block"
            >
              <div className="bg-white border-b border-[#E5E3DF] shadow-[0_28px_48px_-24px_rgba(0,0,0,0.22)]">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.65, ease: EASE_CINEMATIC }}
                  className="h-[2px] bg-[#26496C] origin-left"
                />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
                  {renderMegaContent()}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mobile Navigation Drawer (Slide-out Sidebar Transition) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              key="nav-backdrop"
              variants={navBackdropVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"
            />

            {/* Sliding Sidebar Drawer */}
            <motion.div
              key="nav-drawer"
              ref={drawerRef}
              variants={navDrawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[#F9F8F6] border-l border-[#E5E3DF] shadow-2xl flex flex-col justify-between overflow-y-auto lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu Navigasi"
              data-lenis-prevent
            >
              {/* Drawer Top Header */}
              <div>
                <div className="p-6 border-b border-[#E5E3DF] flex items-center justify-between bg-white">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-[#1A1A1A] text-white flex items-center justify-center font-serif font-bold text-xs">
                      {LOGO.mark}
                    </div>
                    <div>
                      <p className="font-serif font-bold text-sm tracking-tight text-[#1A1A1A] uppercase leading-none">
                        {LOGO.drawerBrand}
                      </p>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#8C8276] mt-0.5">
                        {LOGO.drawerSub}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#6B6B5F] hover:text-[#1A1A1A] hover:bg-[#F0EEEA] border border-transparent hover:border-[#E5E3DF] transition-colors cursor-pointer"
                    aria-label="Tutup Menu"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                {/* Staggered Navigation Links */}
                <div className="p-6 space-y-1">
                  {renderMobileMenuItems()}
                </div>
              </div>

              {/* Drawer Bottom Actions & Contacts */}
              <div className="p-6 border-t border-[#E5E3DF] bg-white space-y-3">
                <motion.button
                  {...microButton}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full bg-[#26496C] text-white py-3.5 text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#1D3A58] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-[#AEC0D4]" />
                  <span>{DRAWER.reserveLabel}</span>
                </motion.button>

                <div className="pt-4 space-y-2.5 text-xs text-[#6B6B5F]">
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#8C8276]">
                    {DRAWER.contactsTitle}
                  </p>
                  <p className="flex items-center gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                    <span className="font-light">{DRAWER.showroomLine}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Clock className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                    <span className="font-light">{SITE_INFO.operationalHours}</span>
                  </p>
                  <a
                    href={`tel:${SITE_INFO.phoneGeneral}`}
                    className="flex items-center gap-2.5 text-[#1A1A1A] font-medium hover:text-[#5A5A40] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                    <span>{SITE_INFO.phoneGeneral}</span>
                  </a>
                  <a
                    href={buildWaLink(DRAWER.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => {
                      if (!allowWaOpen()) {
                        event.preventDefault();
                      }
                    }}
                    className="flex items-center gap-2.5 text-[#1A1A1A] font-medium hover:text-[#5A5A40] transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#5A5A40] shrink-0" />
                    <span>WhatsApp: {WA_DISPLAY}</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};


