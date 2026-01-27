import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aperture, Film, Frame, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Layout from '../components/Layout';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import Reveal from '../components/Reveal';
import Magnetic from '../components/Magnetic';
import SplitText from '../components/SplitText';
import PinnedProjectShowcase from '../components/PinnedProjectShowcase';
import HorizontalGallery from '../components/HorizontalGallery';
import { SERVICES } from '../constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroBgRef.current || !heroTextRef.current) return;

    gsap.set(heroBgRef.current, { scale: 1.3, filter: "blur(8px)" });
    
    gsap.to(heroBgRef.current, { 
      scale: 1.1, 
      filter: "blur(0px)", 
      duration: 2.2, 
      ease: "power2.inOut" 
    });

    gsap.to(heroBgRef.current, {
      yPercent: 25, 
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5 
      }
    });

    gsap.to(heroTextRef.current, {
      yPercent: 50,
      opacity: 0,
      ease: "power1.in",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "60% top",
        scrub: 1
      }
    });

  }, { scope: containerRef });

  return (
    <Layout>
      <div ref={containerRef} className="bg-background w-full overflow-hidden">
        
        {/* Hero Section - Using dvh for real mobile height */}
        <section ref={heroRef} className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-dark">
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div ref={heroBgRef} className="w-full h-full will-change-transform">
              <img 
                src="https://picsum.photos/1920/1080?grayscale&blur=2" 
                alt="Cinematic Mood" 
                className="w-full h-full object-cover grayscale opacity-60"
                loading="eager"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark/90" /> 
            <div className="absolute inset-0 bg-vignette mix-blend-multiply" />
          </div>

          <div 
              ref={heroTextRef}
              className="relative z-10 px-4 md:px-6 w-full max-w-7xl mx-auto flex flex-col items-center md:items-start will-change-transform"
          >
              <div className="text-center md:text-left text-white">
                  <div className="mb-6 md:mb-8 flex justify-center md:justify-start items-center gap-4 overflow-hidden">
                      <div className="h-px w-8 md:w-12 bg-white/50 origin-left" />
                      <span className="text-white/80 uppercase tracking-[0.4em] text-micro font-semibold">
                          Narrativas Visuais
                      </span>
                  </div>
                  
                  <div className="mb-8 md:mb-10 mix-blend-screen overflow-hidden">
                     <SplitText tag="h1" delay={0.3} className="text-fluid-h1 font-serif font-thin italic tracking-tighter text-white leading-[0.9]">
                        Luz & Sombra
                     </SplitText>
                  </div>
                  
                  <p className="text-sm md:text-lg text-white/70 mb-10 md:mb-12 max-w-md font-light leading-relaxed tracking-wide mx-auto md:mx-0">
                     Não apenas tiramos fotos. Curamos momentos de emoção crua, enquadrando a beleza não roteirizada da existência.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-8 pointer-events-auto">
                    <Magnetic strength={40}>
                      <Button onClick={() => navigate('/portfolio')} className="border-b border-white hover:border-accent text-white pb-1 px-0 rounded-none bg-transparent hover:bg-transparent tracking-widest text-xs">
                          Acessar Galeria
                      </Button>
                    </Magnetic>
                  </div>
              </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
             <ArrowDown className="text-white w-6 h-6" />
          </div>
        </section>

        {/* Brand Bar */}
        <section className="bg-background py-16 border-b border-muted relative z-20">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-40 hover:opacity-100 transition-opacity duration-700">
               {['VOGUE', 'KINFOLK', 'CEREAL', 'AESTHETICA'].map(brand => (
                   <span key={brand} className="text-xs font-sans font-medium tracking-[0.3em] text-primary cursor-default hover:text-accent transition-colors duration-500">{brand}</span>
               ))}
            </div>
          </div>
        </section>

        {/* Pinned Project Showcase */}
        <PinnedProjectShowcase />

        {/* Manifesto Section */}
        <section className="py-24 md:py-32 bg-background relative z-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-4">
                  <SectionTitle subtitle="Manifesto" title="A Arte da Observação" alignment="left" />
              </div>
              <div className="lg:col-span-8 lg:pl-12 pt-8">
                  <div className="text-xl md:text-3xl font-serif text-primary/80 leading-relaxed font-light italic">
                      "Em um mundo de ruído, buscamos o silêncio. O olhar sutil, a textura do tecido, a forma como a luz cai sobre um ombro."
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 md:mt-20">
                      {[
                      { icon: Film, title: "Alma Analógica", desc: "Abraçando o grão, o desfoque e a imperfeição." },
                      { icon: Aperture, title: "Luz Natural", desc: "Esculpindo com a iluminação disponível." },
                      { icon: Frame, title: "Composição", desc: "Guiando o olhar para o que importa." }
                      ].map((feature, idx) => (
                      <div 
                          key={idx} 
                          className="border-l border-muted pl-6 group hover:border-accent transition-colors duration-500"
                      >
                          <feature.icon className="w-5 h-5 text-secondary mb-4 group-hover:text-primary transition-colors" />
                          <h3 className="text-primary font-semibold tracking-widest text-micro uppercase mb-2">{feature.title}</h3>
                          <p className="text-secondary text-sm font-light leading-relaxed">{feature.desc}</p>
                      </div>
                      ))}
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Gallery */}
        <HorizontalGallery />

        {/* Services Teaser */}
        <section className="py-24 md:py-32 bg-surface relative border-t border-muted z-20">
          <div className="container relative z-10">
              <div className="max-w-4xl mx-auto">
                  <SectionTitle subtitle="Ofertas" title="Comissões" />
                  
                  <div className="mt-16 space-y-12">
                      {SERVICES.map((s) => (
                          <div
                              key={s.id}
                              className="group border-b border-muted pb-8 md:pb-12 cursor-pointer hover:border-primary/30 transition-colors duration-500"
                              onClick={() => navigate('/services')}
                          >
                              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                                  <h3 className="text-3xl md:text-4xl font-serif italic text-primary group-hover:text-accent transition-colors duration-300">{s.title}</h3>
                                  <span className="text-xs font-mono text-secondary mt-2 md:mt-0">{s.price}</span>
                              </div>
                              <p className="text-secondary font-light max-w-lg transition-opacity duration-300 opacity-60 group-hover:opacity-100">{s.description}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-background z-20 relative">
          <div className="container text-center max-w-2xl">
            <Reveal width="100%">
              <p className="text-secondary text-micro tracking-widest uppercase mb-6">Agenda 2024 / 2025</p>
              <h2 className="text-fluid-h2 font-serif italic mb-12 text-primary">
                  Conte sua história.
              </h2>
            </Reveal>
            <div className="flex justify-center">
              <Magnetic>
                  <Button onClick={() => navigate('/contact')} variant="outline" className="border-primary/30 text-primary hover:border-primary hover:bg-primary hover:text-white">
                      Iniciar Conversa
                  </Button>
              </Magnetic>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Home;