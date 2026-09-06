import React from 'react';
import { motion, useInView } from 'motion/react';
import { useRef, useMemo } from 'react';
import { RevealDir, revealVariants, staggerContainer, revealTransition, LUXURY_EASE } from '../../lib/animations';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDir;
  as?: 'div' | 'span' | 'li' | 'section';
  delay?: number;
  duration?: number;
  once?: boolean;
}

/** per-element two-way reveal (in on scroll-in, out on scroll-out) */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  direction = 'up',
  as = 'div',
  delay = 0,
  duration = 0.6,
  once = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: '0px 0px -40px 0px',
    amount: 0.01,
  });

  const MotionTag = motion[as] as typeof motion.div;
  const variants = revealVariants[direction];

  return (
    <MotionTag
      ref={ref as never}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay: isInView ? delay : 0,
        ease: LUXURY_EASE,
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
}

/**
 * Wraps a set of sibling elements and staggers their entrance.
 * Children should be <RevealItem> (or motion elements) for staggered entry.
 */
export const RevealGroup: React.FC<RevealGroupProps> = ({
  children,
  className,
  stagger = 0.09,
  delayChildren = 0.05,
  once = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once,
    margin: '0px 0px -40px 0px',
    amount: 0.01,
  });

  const variants = useMemo(() => staggerContainer(stagger, delayChildren), [stagger, delayChildren]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  direction?: RevealDir;
  duration?: number;
}

/** Child variant for use inside a <RevealGroup>. */
export const RevealItem: React.FC<RevealItemProps> = ({
  children,
  className,
  direction = 'up',
  duration = 0.6,
}) => {
  const variants = revealVariants[direction];
  return (
    <motion.div
      variants={variants}
      transition={revealTransition(duration)}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface RevealImgProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  zoom?: boolean;
  delay?: number;
}

/** Cinematic image reveal: zoom/pan in while scrolling through. */
export const RevealImg: React.FC<RevealImgProps> = ({
  src,
  alt,
  className,
  imgClassName,
  zoom = true,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false,
    margin: '0px 0px -40px 0px',
    amount: 0.01,
  });

  return (
    <motion.figure
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={zoom ? { hidden: { scale: 1.15, opacity: 0.4 }, visible: { scale: 1, opacity: 1 } } : undefined}
      transition={{ delay: isInView ? delay : 0, duration: 1.1, ease: LUXURY_EASE }}
      className={`overflow-hidden ${className ?? ''}`}
    >
      <img src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName ?? ''}`} />
    </motion.figure>
  );
};
