import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import Button from '../components/Button';
import SplitText from '../components/SplitText';
import LiquidImage from '../components/LiquidImage';
import { PHOTOS } from '../constants';

const CATEGORIES = ['wedding', 'portrait', 'commercial', 'editorial'];

const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const activeCategoriesState = useState<string[]>([]);
  const activeCategories = activeCategoriesState[0];
  const setActiveCategories = activeCategoriesState[1];

  const toggleCategory = useCallback((cat: string) => {
    setActiveCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }, [setActiveCategories]);

  const clearFilters = useCallback(() => setActiveCategories([]), [setActiveCategories]);

  const filteredPhotos = useMemo(() => {
    if (activeCategories.length === 0) return PHOTOS;
    return PHOTOS.filter(photo => activeCategories.includes(photo.category));
  }, [activeCategories]);

  // Robust grid logic handling index math safely
  const getGridClass = useCallback((index: number) => {
     // Every 3rd item spans 2 columns on desktop
     return (index + 1) % 3 === 0 ? "md:col-span-2 aspect-[16/9]" : "md:col-span-1 aspect-[3/4]";
  }, []);

  return (
    <Layout>
      {/* Padded for fixed header */}
      <div className="bg-background text-primary pt-32 md:pt-40 pb-section-sm relative border-b border-muted/50">
        <div className="container flex flex-col md:flex-row justify-between items-end relative z-10">
          <div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-micro uppercase tracking-[0.4em] text-secondary block mb-4"
              >
                  Trabalhos Curados
              </motion.span>
              <div className="overflow-hidden">
                <SplitText tag="h1" className="text-display font-serif italic text-primary tracking-tighter" delay={0.6}>
                    Arquivo
                </SplitText>
              </div>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-secondary max-w-xs text-body font-light mt-8 md:mt-0 text-right"
          >
            Uma coleção de memórias visuais, processadas com cuidado e intenção cinematográfica.
          </motion.p>
        </div>
      </div>

      <div className="min-h-screen bg-background pt-16 pb-section">
        <div className="container">
            
          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-20 items-center justify-center md:justify-start">
            <span className="text-secondary/50 text-micro uppercase tracking-widest mr-4">Filtrar Por:</span>
            <button
                onClick={clearFilters}
                className={`text-micro uppercase tracking-[0.2em] transition-all duration-300 relative px-2 py-1 ${
                activeCategories.length === 0
                    ? 'text-primary font-bold'
                    : 'text-secondary hover:text-primary'
                }`}
            >
                Todos
                {activeCategories.length === 0 && (
                    <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-px bg-primary" />
                )}
            </button>

            {CATEGORIES.map((cat) => {
                const isActive = activeCategories.includes(cat);
                return (
                <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`text-micro uppercase tracking-[0.2em] transition-all duration-300 relative px-2 py-1 ${
                    isActive
                        ? 'text-primary font-bold'
                        : 'text-secondary hover:text-primary'
                    }`}
                >
                    {cat}
                    {isActive && (
                        <motion.div layoutId={`underline-${cat}`} className="absolute bottom-0 left-0 w-full h-px bg-primary" />
                    )}
                </button>
                );
            })}
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gap-grid"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 100, scale: 0.95 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: {
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1], // Heavy ease
                        delay: index * 0.1 // Stagger effect based on index
                    }
                  }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
                  key={photo.id} 
                  className={`break-inside-avoid group relative cursor-pointer ${getGridClass(index)}`}
                >
                  {/* Container for Image & Overlay */}
                  <div className="w-full h-full relative bg-muted overflow-hidden">
                      <LiquidImage
                        src={photo.url}
                        alt={photo.title}
                        className="grayscale-[20%] group-hover:grayscale-0"
                        containerClassName="w-full h-full"
                      />
                      
                      {/* Premium Overlay: Gradient only at bottom, fading in properly */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out pointer-events-none z-30" />
                      
                      {/* Content positioned absolutely */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 z-40 pointer-events-none">
                           <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[0.22,1,0.36,1]">
                                <span className="text-[10px] uppercase tracking-[0.25em] text-white/80 block mb-2">{photo.category}</span>
                                <h3 className="text-h3 font-serif italic text-white font-light">{photo.title}</h3>
                           </div>
                      </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-section text-center border-t border-muted/50 pt-section-sm"
          >
            <h3 className="text-h2 font-serif italic text-primary mb-6">Crie conosco.</h3>
            <Button variant="text" onClick={() => navigate('/contact')} className="text-body-lg text-primary hover:text-accent">Iniciar Projeto</Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;