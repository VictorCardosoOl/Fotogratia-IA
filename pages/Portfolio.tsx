import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { PHOTOS } from '../constants';

const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');
  const categories = ['all', 'wedding', 'portrait', 'commercial', 'editorial'];

  const filteredPhotos = filter === 'all' 
    ? PHOTOS 
    : PHOTOS.filter(photo => photo.category === filter);

  return (
    <Layout>
      {/* Responsive top padding: pt-32 on mobile, pt-40 on desktop */}
      <div className="bg-background text-primary pt-32 md:pt-40 pb-16 md:pb-24 relative">
        <div className="container text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="text-fluid-h1 font-serif mb-6 md:mb-8 text-primary tracking-tight"
          >
            Portfolio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.1 }}
            className="text-muted max-w-xl mx-auto text-base md:text-lg leading-relaxed font-light px-4"
          >
            A curated collection of our finest work, showcasing the emotion, detail, and artistry.
          </motion.p>
        </div>
      </div>

      <div className="container pb-24 bg-background">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16 md:mb-20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-4 py-2 text-[10px] md:text-xs uppercase tracking-widest font-medium transition-colors duration-500 z-10 ${
                filter === cat ? 'text-primary' : 'text-muted hover:text-primary'
              }`}
            >
              {cat}
              {filter === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ type: "spring", stiffness: 50, damping: 15 }} // Heavy physics
                key={photo.id} 
                className="break-inside-avoid group relative overflow-hidden bg-surface cursor-pointer mb-8"
              >
                <img 
                  src={photo.url} 
                  alt={photo.title} 
                  className="w-full h-auto object-cover transition-transform duration-[1.2s] ease-[0.16,1,0.3,1] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="text-center text-white p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-xl font-serif italic">{photo.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
          className="mt-20 md:mt-32 text-center border-t border-primary/5 pt-16 md:pt-20"
        >
          <h3 className="text-2xl md:text-3xl font-serif mb-6 text-primary">See something you like?</h3>
          <p className="text-muted mb-10 max-w-lg mx-auto text-sm md:text-base">Let's discuss how we can bring a similar aesthetic to your project.</p>
          <Button onClick={() => navigate('/contact')}>Book Consultation</Button>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Portfolio;