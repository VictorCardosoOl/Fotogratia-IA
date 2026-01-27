import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Layout from '../components/Layout';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import { SERVICES } from '../constants';

const HEAVY_EASE = [0.22, 1, 0.36, 1];

const CARD_VARIANTS: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 40 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: {
      duration: 1.2,
      ease: HEAVY_EASE
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.3 } 
  },
  hover: { 
    scale: 1.03,
    y: -10,
    borderColor: "#8C7D6E",
    boxShadow: "0px 25px 50px -12px rgba(140, 125, 110, 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 20, mass: 0.8 } 
  }
};

const TEXT_GROUP_VARIANTS: Variants = {
  hover: { transition: { staggerChildren: 0.05 } },
  idle: {}
};

const CONTENT_VARIANTS: Variants = {
  hover: { 
    y: -2, 
    x: 4,
    transition: { type: "spring", stiffness: 400, damping: 15 } 
  },
  idle: { y: 0, x: 0, transition: { type: "spring", stiffness: 400, damping: 15 } }
};

const WORKFLOW_STEPS = [
    { step: '01', title: 'Conexão', desc: 'Formulário inicial e consulta.' },
    { step: '02', title: 'Planejamento', desc: 'Mood board e lista de fotos.' },
    { step: '03', title: 'Criação', desc: 'A experiência do dia do ensaio.' },
    { step: '04', title: 'Entrega', desc: 'Retoque e entrega final.' }
];

const CATEGORIES = ['all', 'wedding', 'portrait', 'commercial'];

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>('all');

  const filteredServices = useMemo(() => {
    return filter === 'all' 
        ? SERVICES 
        : SERVICES.filter(service => service.id === filter);
  }, [filter]);

  return (
    <Layout>
      <div className="pt-32 md:pt-40 pb-16 md:pb-20 bg-background relative">
        <div className="container relative z-10 text-center">
          <SectionTitle subtitle="Investimento" title="Serviços & Preços" />
          <p className="text-center text-secondary max-w-2xl mx-auto -mt-6 md:-mt-10 mb-10 md:mb-16 text-base md:text-lg font-light">
            Preços transparentes para memórias atemporais.
          </p>
        </div>
      </div>

      <div className="container pb-24 bg-background">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16 md:mb-20">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative px-4 py-2 text-micro uppercase tracking-widest font-bold transition-colors duration-500 z-10 ${
                filter === cat ? 'text-primary' : 'text-secondary hover:text-primary'
              }`}
            >
              {cat === 'all' ? 'Todos' : cat}
              {filter === cat && (
                <motion.div
                  layoutId="activeFilterService"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => {
               const isFeatured = service.id === 'portrait';
               
               return (
                <motion.div 
                  layout
                  key={service.id}
                  variants={CARD_VARIANTS}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover="hover"
                  transition={{ 
                      layout: { duration: 0.8, ease: HEAVY_EASE },
                      delay: index * 0.1
                  }}
                  className={`relative flex flex-col p-8 md:p-10 transition-colors duration-300 group h-full rounded-sm border ${
                      isFeatured 
                      ? 'bg-primary text-white border-primary z-10' 
                      : 'bg-surface text-primary border-primary/10'
                  }`}
                >
                  <motion.div variants={TEXT_GROUP_VARIANTS}>
                    <motion.h3 
                      variants={CONTENT_VARIANTS} 
                      className="text-xl md:text-2xl font-serif font-medium mb-4"
                    >
                      {service.title}
                    </motion.h3>
                    
                    <motion.p 
                      variants={CONTENT_VARIANTS} 
                      className={`text-3xl font-light mb-8 flex items-baseline ${isFeatured ? 'text-white' : 'text-primary'}`}
                    >
                        {service.price}
                    </motion.p>
                    
                    <motion.p 
                      variants={CONTENT_VARIANTS} 
                      className={`text-sm mb-10 leading-relaxed font-light ${isFeatured ? 'text-white/80' : 'text-secondary'}`}
                    >
                        {service.description}
                    </motion.p>

                    <ul className="mb-12 space-y-5 flex-grow">
                        {service.features.map((feature, idx) => (
                        <motion.li 
                          key={idx} 
                          variants={CONTENT_VARIANTS}
                          className="flex items-start"
                        >
                            <Check className={`w-4 h-4 mr-4 flex-shrink-0 ${isFeatured ? 'text-white/70' : 'text-secondary'}`} />
                            <span className="text-sm tracking-wide">{feature}</span>
                        </motion.li>
                        ))}
                    </ul>
                  </motion.div>

                  <Button 
                      variant={isFeatured ? 'outline' : 'primary'} 
                      fullWidth
                      className={isFeatured ? 'border-white/30 text-white hover:bg-white hover:text-primary' : 'bg-primary text-white hover:border-accent hover:bg-transparent hover:text-primary'}
                      onClick={() => navigate('/contact')}
                  >
                      {service.cta}
                  </Button>
                </motion.div>
            );
          })}
          </AnimatePresence>
        </motion.div>

        <div className="mt-24 md:mt-40">
            <SectionTitle subtitle="Workflow" title="O Processo" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-12 md:mt-20">
                {WORKFLOW_STEPS.map((item, idx) => (
                    <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15, duration: 1.2, ease: HEAVY_EASE }}
                        className="text-center group cursor-default"
                    >
                        <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center mx-auto mb-6 text-serif font-serif italic text-xl text-secondary group-hover:border-primary group-hover:text-primary transition-colors duration-500 bg-transparent group-hover:bg-accent/10">
                            {item.step}
                        </div>
                        <h4 className="text-lg font-bold mb-3 text-primary group-hover:translate-y-[-2px] transition-transform duration-300">{item.title}</h4>
                        <p className="text-secondary text-sm leading-relaxed font-light">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;