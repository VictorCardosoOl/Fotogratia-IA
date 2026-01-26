import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import Button from '../components/Button';
import SplitText from '../components/SplitText';
import { PHOTOS } from '../constants';

const CATEGORIES = ['wedding', 'portrait', 'commercial', 'editorial'];

const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  const toggleCategory = useCallback((cat: string) => {
    setActiveCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  }, []);

  const clearFilters = useCallback(() => setActiveCategories([]), []);

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
      {/* Padded for fixed header (approx 120px) */}
      <div className="bg-background text-primary pt-32 md:pt-40 pb-16 md:pb-20 relative border-b border-primary/5">
        <div className="container flex flex-col md:flex-row justify-between items-end relative z-10">
          <div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-micro uppercase tracking-[0.4em] text-secondary block mb-4"
              >
                  Curated Works
              </motion.span>
              <div className="overflow-hidden">
                <SplitText tag="h1" className="text-fluid-h1 font-serif italic text-primary tracking-tighter">
                    Archive
                </SplitText>
              </div>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-secondary max-w-xs text-sm font-light mt-8 md:mt-0 text-right"
          >
            A collection of visual memories, processed with care and cinematic intent.
          </motion.p>
        </div>
      </div>

      <div className="min-h-screen bg-background pt-16 pb-24">
        <div className="container">
            
          <div className="flex flex-wrap gap-x-8 gap-y-4 mb-20 items-center">
            <span className="text-secondary/50 text-micro uppercase tracking-widest mr-4">Filter By:</span>
            <button
                onClick={clearFilters}
                className={`text-micro uppercase tracking-[0.2em] transition-all duration-300 border-b border-transparent ${
                activeCategories.length === 0
                    ? 'text-primary border-accent font-bold'
                    : 'text-secondary hover:text-primary'
                }`}
            >
                All
            </button>

            {CATEGORIES.map((cat) => {
                const isActive = activeCategories.includes(cat);
                return (
                <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`text-micro uppercase tracking-[0.2em] transition-all duration-300 border-b border-transparent ${
                    isActive
                        ? 'text-primary border-accent font-bold'
                        : 'text-secondary hover:text-primary'
                    }`}
                >
                    {cat}
                </button>
                );
            })}
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo, index) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(5px)', scale: 0.95, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  key={photo.id} 
                  className={`break-inside-avoid group relative cursor-pointer ${getGridClass(index)}`}
                >
                  <div className="w-full h-full overflow-hidden relative bg-surface shadow-md">
                      <img 
                        src={photo.url} 
                        alt={photo.title} 
                        className="w-full h-full object-cover grayscale-[80%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-[1s] ease-[0.22,1,0.36,1]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end overflow-hidden pointer-events-none">
                    <div className="transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.22,1,0.36,1]">
                         <h3 className="text-xl md:text-2xl font-serif italic text-white drop-shadow-md">{photo.title}</h3>
                    </div>
                    
                    <div className="transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-75 ease-[0.22,1,0.36,1]">
                        <span className="text-[9px] uppercase tracking-widest text-white border border-white/50 px-2 py-1 rounded-full backdrop-blur-sm bg-black/20">
                            {photo.category}
                        </span>
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
            className="mt-32 md:mt-40 text-center border-t border-primary/5 pt-20"
          >
            <h3 className="text-fluid-h3 font-serif italic text-primary mb-6">Create with us.</h3>
            <Button variant="text" onClick={() => navigate('/contact')} className="text-lg text-primary hover:text-accent">Start Project</Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;