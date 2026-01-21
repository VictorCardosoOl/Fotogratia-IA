import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');
  const categories = ['all', 'wedding', 'portrait', 'commercial'];

  const filteredServices = filter === 'all' 
    ? SERVICES 
    : SERVICES.filter(service => service.id === filter);

  return (
    <Layout>
      <div className="pt-32 md:pt-40 pb-16 md:pb-20 bg-background relative">
        <div className="container relative z-10 text-center">
          <SectionTitle subtitle="Investment" title="Services & Pricing" />
          <p className="text-center text-muted max-w-2xl mx-auto -mt-6 md:-mt-10 mb-10 md:mb-16 text-base md:text-lg font-light">
            Transparent pricing for timeless memories.
          </p>
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
                  layoutId="activeFilterService"
                  className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div 
            layout
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
                <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ 
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                }}
                key={service.id} 
                className={`relative flex flex-col p-8 md:p-10 transition-all duration-500 group h-full rounded-sm ${
                    service.id === 'portrait' // Highlight middle item logic if displayed in grid, otherwise standard
                    ? 'bg-primary text-white shadow-2xl shadow-primary/10' 
                    : 'bg-surface text-primary hover:bg-white hover:shadow-xl hover:shadow-primary/5'
                }`}
                >
                <h3 className="text-2xl font-serif font-medium mb-4">{service.title}</h3>
                <p className={`text-3xl font-light mb-8 flex items-baseline ${service.id === 'portrait' ? 'text-white' : 'text-primary'}`}>
                    {service.price}
                </p>
                <p className={`text-sm mb-10 leading-relaxed font-light ${service.id === 'portrait' ? 'text-white/70' : 'text-muted'}`}>
                    {service.description}
                </p>

                <ul className="mb-12 space-y-5 flex-grow">
                    {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                        <Check className={`w-4 h-4 mr-4 flex-shrink-0 ${service.id === 'portrait' ? 'text-white/50' : 'text-secondary'}`} />
                        <span className="text-sm tracking-wide">{feature}</span>
                    </li>
                    ))}
                </ul>

                <Button 
                    variant={service.id === 'portrait' ? 'outline' : 'primary'} 
                    fullWidth
                    className={service.id === 'portrait' ? 'border-white/30 text-white hover:bg-white hover:text-primary' : ''}
                    onClick={() => navigate('/contact')}
                >
                    {service.cta}
                </Button>
                </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Process Section */}
        <div className="mt-24 md:mt-40">
            <SectionTitle subtitle="Workflow" title="The Process" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-12 md:mt-20">
                {[
                    { step: '01', title: 'Connect', desc: 'Inquiry form & consultation.' },
                    { step: '02', title: 'Plan', desc: 'Mood board & shot list creation.' },
                    { step: '03', title: 'Create', desc: 'The shoot day experience.' },
                    { step: '04', title: 'Deliver', desc: 'Retouching & final delivery.' }
                ].map((item, idx) => (
                    <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15, duration: 0.8, ease: "easeOut" }}
                        className="text-center group"
                    >
                        <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center mx-auto mb-6 text-serif font-serif italic text-xl text-primary/50 group-hover:border-primary group-hover:text-primary transition-colors duration-500">
                            {item.step}
                        </div>
                        <h4 className="text-lg font-medium mb-3 text-primary">{item.title}</h4>
                        <p className="text-muted text-sm leading-relaxed font-light">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;