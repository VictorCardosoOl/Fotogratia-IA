import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }: { children?: React.ReactNode }) => {
  const shutterVariants = {
    initial: {
      scaleY: 1,
      transformOrigin: 'bottom',
    },
    animate: {
      scaleY: 0,
      transformOrigin: 'bottom',
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1], // Quartic ease
      }
    },
    exit: {
      scaleY: 1,
      transformOrigin: 'top',
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      }
    }
  };

  return (
    <>
      {/* The Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }} // Slight delay to let shutter cover first
        className="w-full h-full"
      >
        {children}
      </motion.div>

      {/* The Shutter (Curtain) */}
      <motion.div
        className="fixed inset-0 bg-background z-[9999] pointer-events-none"
        variants={shutterVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />
    </>
  );
};

export default PageTransition;