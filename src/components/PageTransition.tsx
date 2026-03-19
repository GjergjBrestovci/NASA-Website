import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
}

const easing = [0.25, 0.46, 0.45, 0.94] as const;

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easing },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.3, ease: easing },
  },
} as const;

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    style={{ position: 'relative', zIndex: 1 }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
