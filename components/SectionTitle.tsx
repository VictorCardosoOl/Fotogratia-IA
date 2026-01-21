import React from 'react';
import { motion } from 'framer-motion';
import SplitText from './SplitText';

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
    <div className={`mb-16 md:mb-24 ${alignClass} ${className} flex flex-col ${alignItem}`}>
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
        variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
        }}
        className="flex items-center gap-4 mb-6"
      >
         <motion.span 
            variants={{ hidden: { width: 0 }, visible: { width: 32 } }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={`h-px bg-accent ${alignment === 'center' ? 'hidden md:block' : 'block'}`}
         />
         <motion.span 
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-secondary uppercase tracking-[0.3em] text-[9px] font-medium"
         >
            {subtitle}
         </motion.span>
         <motion.span 
            variants={{ hidden: { width: 0 }, visible: { width: 32 } }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className={`h-px bg-accent ${alignment === 'center' ? 'hidden md:block' : 'hidden'}`}
         />
      </motion.div>
      
      <div className="relative">
        <SplitText 
            tag="h2" 
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-light italic leading-[1.1]"
        >
            {title}
        </SplitText>
      </div>
    </div>
  );
};

export default SectionTitle;