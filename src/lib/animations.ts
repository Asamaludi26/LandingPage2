// Luxury Editorial Animation Presets
// Designed specifically for high-end interior and architectural ateliers
// Utilizes smooth cubic-bezier curve [0.16, 1, 0.3, 1] with subtle micro-distance
// Pre-triggers before entering visible frame so user never encounters blank or jumping content

export const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

// Editorial line-reveal ease: decelerate to a confident stop (magazine feel)
export const EASE_EDITORIAL = [0.77, 0, 0.175, 1] as const;
// Cinematic image ease: slow organic settle
export const EASE_CINEMATIC = [0.65, 0, 0.35, 1] as const;

export const viewportConfig = {
  once: true,
  // Anticipatory trigger: Starts animating 80px BEFORE the element reaches the bottom of the viewport
  // This eliminates empty gaps, pop-ins, or sudden jerks while scrolling
  margin: '0px 0px 80px 0px',
  amount: 0.05,
};

export const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportConfig,
  transition: {
    duration: 0.65,
    ease: LUXURY_EASE,
  },
};

// Route-level page transition: content fades/rises after navigation, old page
// lifts out quickly so the swap never feels abrupt (used with AnimatePresence mode="wait")
export const pageTransition = {
  initial: { opacity: 0, y: 22 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: LUXURY_EASE },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.22, ease: LUXURY_EASE },
  },
};

// Micro-interaction presets for buttons, icons, and interactive divs
export const microButton = {
  whileHover: { scale: 1.025, y: -1.5 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.2, ease: LUXURY_EASE },
};

// Navigation Drawer transitions (Slide-in from right with backdrop blur)
export const navDrawerVariants = {
  closed: {
    x: '100%',
    transition: {
      duration: 0.38,
      ease: [0.32, 0, 0.67, 0] as const, // Fast exit ease
    },
  },
  open: {
    x: '0%',
    transition: {
      duration: 0.45,
      ease: LUXURY_EASE,
    },
  },
};

export const navBackdropVariants = {
  closed: { opacity: 0, transition: { duration: 0.3 } },
  open: { opacity: 1, transition: { duration: 0.35 } },
};

export const navItemStagger = {
  closed: { opacity: 0, x: 15 },
  open: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.1 + custom * 0.04,
      duration: 0.4,
      ease: LUXURY_EASE,
    },
  }),
};

// Mega-Menu panel: cinematic fade + rise, children stagger for a refined cascade
export const navMenuPanel = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: LUXURY_EASE,
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: 6,
    transition: { duration: 0.2, ease: LUXURY_EASE },
  },
};

export const navMenuChild = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: LUXURY_EASE },
  },
};

// ============================================================================
// Per-element reveal directions (two-way: in on scroll, out on reverse scroll)
// Each returns a variant pair for use with motion variants (container/child).
// ============================================================================

export type RevealDir = 'up' | 'down' | 'left' | 'right' | 'fade' | 'zoom' | 'blur';

export const revealVariants: Record<RevealDir, { hidden: Record<string, number | string>; visible: Record<string, number | string> }> = {
  up: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -16 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -18 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 18 },
    visible: { opacity: 1, x: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(6px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
};

// Container variant that staggers its direct children on view
export const staggerContainer = (stagger = 0.09, delayChildren = 0.05) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

// Shared child transition timing per reveal
export const revealTransition = (duration = 0.6) => ({
  duration,
  ease: LUXURY_EASE,
});


