import React from 'react';
import { motion } from 'motion/react';
import { microButton } from '../../lib/animations';

type CtaVariant = 'primary' | 'secondary' | 'onDark' | 'onDarkOutline';

interface CtaButtonProps {
  variant?: CtaVariant;
  href?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  children: React.ReactNode;
}

const BASE =
  'inline-flex items-center justify-center gap-2.5 font-bold uppercase tracking-[0.2em] text-[11px] px-6 py-3.5 transition-colors cursor-pointer select-none';

const VARIANTS: Record<CtaVariant, string> = {
  primary: 'bg-[#26496C] hover:bg-[#1D3A58] text-white shadow-xs',
  secondary:
    'bg-white hover:bg-[#F9F8F6] border border-[#E5E3DF] hover:border-[#1A1A1A] text-[#1A1A1A]',
  onDark: 'bg-white hover:bg-[#EBE9E4] text-[#151515] shadow-sm',
  onDarkOutline: 'border border-white/20 hover:border-white/60 text-white',
};

export const CtaButton: React.FC<CtaButtonProps> = ({
  variant = 'primary',
  href,
  target,
  rel,
  fullWidth = false,
  className,
  onClick,
  children,
}) => {
  const cls = [BASE, VARIANTS[variant], fullWidth ? 'w-full' : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <motion.a
        {...microButton}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={cls}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...microButton} type="button" onClick={onClick} className={cls}>
      {children}
    </motion.button>
  );
};