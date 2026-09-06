import React from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { EASE_EDITORIAL, EASE_CINEMATIC } from '../../lib/animations';

/**
 * Editorial "line reveal": content slides up out of a masked overflow-hidden
 * bar (like a magazine heading), not a plain opacity fade.
 * Two-way by default; pass once to settle.
 */
export const MaskReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}> = ({ children, className, delay = 0, duration = 0.9, once = false }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '0px 0px -30px 0px', amount: 0.1 });

  return (
    <span ref={ref} className={`block overflow-hidden ${className ?? ''}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: '112%' }}
        animate={isInView ? { y: '0%' } : { y: '112%' }}
        transition={{ duration, delay: isInView ? delay : 0, ease: EASE_EDITORIAL }}
      >
        {children}
      </motion.span>
    </span>
  );
};

/**
 * Cinematic image reveal: the inner image scales/pan from within its frame
 * while the frame fades in — feels like a printed editorial photograph.
 */
export const CinematicImg: React.FC<{
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
  duration?: number;
  pan?: 'none' | 'left' | 'right' | 'up';
  once?: boolean;
}> = ({
  src,
  alt,
  className,
  imgClassName,
  delay = 0,
  duration = 1.2,
  pan = 'none',
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '0px 0px -40px 0px', amount: 0.2 });

  const hidden = {
    opacity: 0,
    scale: 1.22,
    x: pan === 'left' ? -22 : pan === 'right' ? 22 : 0,
    y: pan === 'up' ? -22 : 0,
  };
  const visible = { opacity: 1, scale: 1, x: 0, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{ duration, delay: isInView ? delay : 0, ease: EASE_CINEMATIC }}
      className={`overflow-hidden will-change-transform ${className ?? ''}`}
    >
      <img src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName ?? ''}`} />
    </motion.div>
  );
};
