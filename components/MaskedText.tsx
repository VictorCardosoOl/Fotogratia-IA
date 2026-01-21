import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface MaskedTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const MaskedText: React.FC<MaskedTextProps> = ({ children, className = "", delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  // If children is a string, we treat it as text. If it's React nodes, we wrap them.
  // For this implementation, we assume simple text strings or breaks usually.
  
  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0",
      transition: { 
        duration: 1.2, // Increased duration for weight
        ease: [0.22, 1, 0.36, 1], // Custom "Heavy" cubic-bezier for a sophisticated settle
        delay: delay + (i * 0.05) // Tighter stagger
      }
    })
  };

  // Simple implementation: If string, split by words. 
  // For complex HTML structures, this would need a recursive parser, 
  // but for Titles/Headings, word splitting is standard.
  const renderWords = () => {
    if (typeof children !== 'string') return children; // Fallback for complex nodes
    
    return children.split(" ").map((word, index) => (
      <div key={index} className="overflow-hidden inline-block align-top mr-[0.2em] relative">
        <motion.span
          variants={animation}
          initial="initial"
          animate={isInView ? "enter" : "initial"}
          custom={index}
          className="inline-block"
        >
          {word}
        </motion.span>
      </div>
    ));
  };

  return (
    <div ref={ref} className={`${className} leading-[1.1]`}>
      {renderWords()}
    </div>
  );
};

export default MaskedText;