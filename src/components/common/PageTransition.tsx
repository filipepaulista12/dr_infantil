import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children, pageKey }) => {
  const variants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1], // Ease out cubic
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;

// Variante para transições mais rápidas (cards, modais)
export const FastTransition: React.FC<PageTransitionProps> = ({ children, pageKey }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Variante para slide horizontal (navegação entre tabs)
export const SlideTransition: React.FC<PageTransitionProps & { direction?: 'left' | 'right' }> = ({ 
  children, 
  pageKey,
  direction = 'right' 
}) => {
  const slideValue = direction === 'right' ? 30 : -30;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, x: slideValue }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -slideValue }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
