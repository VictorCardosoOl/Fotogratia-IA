import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  subtitle: string;
  title: string;
  alignment?: 'left' | 'center';
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  subtitle, 
  title, 
  alignment = 'center',
  className = ''
}) => {
  const alignClass = alignment === 'center' ? 'text-center' : 'text-left';
  const alignItem = alignment === 'center' ? 'items-center' : 'items-start';

  return (
    <div className={`mb-12 md:mb-16 ${alignClass} ${className} flex flex-col ${alignItem}`}>
      <motion.span 
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-accent uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold mb-3 block"
      >
        {subtitle}
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        // Using fluid typography logic: text-3xl on mobile, scaling to 5xl on desktop
        className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary font-medium leading-tight"
      >
        {title}
      </motion.h2>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "circOut" }}
        className={`h-1 w-20 bg-accent mt-4 ${alignment === 'center' ? 'mx-auto' : ''} rounded-full opacity-60`}
      />
    </div>
  );
};

export default SectionTitle;