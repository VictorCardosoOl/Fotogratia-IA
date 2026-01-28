import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }: { children?: React.ReactNode }) => {
  // Curva de Bezier personalizada para um efeito "Pesado" e luxuoso
  // Começa rápido, desacelera muito suavemente no final
  const HEAVY_EASE = [0.76, 0, 0.24, 1];

  const curtainVariants = {
    initial: {
      y: "0%", 
    },
    animate: {
      y: "-100%",
      transition: {
        duration: 1.1,
        ease: HEAVY_EASE,
        delay: 0.1 // Pequeno delay para garantir que a página carregou
      }
    },
    exit: {
      y: "0%",
      transition: {
        duration: 0.8,
        ease: HEAVY_EASE,
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.4 // Conteúdo aparece enquanto a cortina sobe
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <motion.div
        className="w-full h-full"
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>

      {/* The Curtain (Shutter) */}
      <motion.div
        className="fixed inset-0 bg-primary z-[9999] pointer-events-none"
        variants={curtainVariants}
        initial="exit" // Começa cobrindo a tela (estado de exit da página anterior)
        animate="animate" // Sobe revelando o conteúdo
        exit="exit" // Desce cobrindo o conteúdo ao sair
      />
      
      {/* Secondary Layer for depth (Accent color) */}
      <motion.div
        className="fixed inset-0 bg-surface z-[9998] pointer-events-none"
        initial={{ y: "0%" }}
        animate={{ 
            y: "-100%",
            transition: { duration: 1.2, ease: HEAVY_EASE } 
        }}
        exit={{ 
            y: "0%",
            transition: { duration: 0.9, ease: HEAVY_EASE, delay: 0.1 } 
        }}
      />
    </>
  );
};

export default PageTransition;