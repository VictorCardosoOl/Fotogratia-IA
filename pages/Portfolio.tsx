import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import Button from '../components/Button';
import Reveal from '../components/Reveal';
import SplitText from '../components/SplitText';
import { PHOTOS } from '../constants';

const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const categories = ['wedding', 'portrait', 'commercial', 'editorial'];

  const toggleCategory = (cat: string) => {
    setActiveCategories(prev => {
      if (prev.includes(cat)) {
        return prev.filter(c => c !== cat);
      } else {
        return [...prev, cat];
      }
    });
  };

  const clearFilters = () => setActiveCategories([]);

  const filteredPhotos = activeCategories.length === 0
    ? PHOTOS 
    : PHOTOS.filter(photo => activeCategories.includes(photo.category));

  return (
    <Layout>
      {/* Minimal Header */}
      <div className="bg-black text-white pt-40 pb-20 relative border-b border-white/5">
        <div className="container flex flex-col md:flex-row justify-between items-end relative z-10 px-6">
          <div>
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] uppercase tracking-[0.4em] text-secondary block mb-4"
              >
                  Curated Works
              </motion.span>
              <div className="overflow-hidden">
                <SplitText tag="h1" className="text-6xl md:text-8xl font-serif italic text-white tracking-tighter">
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

      <div className="min-h-screen bg-black pt-16 pb-24">
        <div className="container px-6">
            
          {/* Filters - Minimal Text */}
          <div className="flex flex-wrap gap-8 mb-20 items-center">
            <span className="text-white/30 text-[10px] uppercase tracking-widest mr-4">Filter By:</span>
            <button
                onClick={clearFilters}
                className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 border-b border-transparent ${
                activeCategories.length === 0
                    ? 'text-white border-accent'
                    : 'text-secondary hover:text-white'
                }`}
            >
                All
            </button>

            {categories.map((cat) => {
                const isActive = activeCategories.includes(cat);
                return (
                <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`text-[10px] uppercase tracking-[0.2em] transition-all duration-300 border-b border-transparent ${
                    isActive
                        ? 'text-white border-accent'
                        : 'text-secondary hover:text-white'
                    }`}
                >
                    {cat}
                </button>
                );
            })}
          </div>

          {/* Artistic Grid */}
          <motion.div 
            layout
            className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredPhotos.map((photo) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, filter: 'blur(5px)', scale: 0.95, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  key={photo.id} 
                  className="break-inside-avoid group relative cursor-pointer"
                >
                  <div className="overflow-hidden relative bg-surface">
                      {/* Interaction: Scale and Grayscale removal on hover */}
                      <img 
                        src={photo.url} 
                        alt={photo.title} 
                        className="w-full h-auto object-cover grayscale-[80%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-[1s] ease-[0.22,1,0.36,1]"
                        loading="lazy"
                      />
                      
                      {/* Slight darkened overlay that lifts on hover for clarity */}
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                  </div>

                  {/* Interaction: Slide UP from bottom and fade in text */}
                  {/* Using translate-y-full to start from bottom, animating to 0 */}
                  <div className="mt-4 flex justify-between items-start overflow-hidden">
                    <div className="transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-[0.22,1,0.36,1]">
                         <h3 className="text-xl font-serif italic text-white">{photo.title}</h3>
                    </div>
                    
                    <div className="transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-75 ease-[0.22,1,0.36,1]">
                        <span className="text-[9px] uppercase tracking-widest text-secondary border border-white/20 px-2 py-1 rounded-full">
                            {photo.category}
                        </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-40 text-center border-t border-white/5 pt-20"
          >
            <h3 className="text-3xl font-serif italic text-white mb-6">Create with us.</h3>
            <Button variant="text" onClick={() => navigate('/contact')} className="text-lg">Start Project</Button>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;