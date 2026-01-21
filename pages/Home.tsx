import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Aperture, Film, Frame, Star } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Layout from '../components/Layout';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import Reveal from '../components/Reveal';
import ParallaxImage from '../components/ParallaxImage';
import Magnetic from '../components/Magnetic';
import SplitText from '../components/SplitText';
import { PHOTOS, SERVICES, TESTIMONIALS } from '../constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const featuredPhotos = PHOTOS.slice(0, 3);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!heroBgRef.current || !heroTextRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial State - heavily zoomed in for the reveal
    gsap.set(heroBgRef.current, { scale: 1.4, filter: "blur(10px)" });
    
    // 2. Opening Sequence (Background) - settles to 1.15 to allow parallax room
    tl.to(heroBgRef.current, { 
      scale: 1.15, 
      filter: "blur(0px)", 
      duration: 2.5, 
      ease: "power2.inOut" 
    });

    // 3. Refined Parallax Physics
    // Background - Heavy and slow with noticeable delay
    gsap.to(heroBgRef.current, {
      yPercent: 15, // Movement range
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.2 // Distinct lag for depth
      }
    });

    // Text - Floatier and faster
    gsap.to(heroTextRef.current, {
      yPercent: 50,
      opacity: 0,
      ease: "power1.in",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "60% top",
        scrub: 0.5
      }
    });

    // 4. Staggered Feature Reveal
    const features = gsap.utils.toArray<HTMLElement>('.feature-card');
    if (features.length > 0) {
      gsap.fromTo(features, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.manifesto-grid',
            start: "top 90%",
          }
        }
      );
    }

  }, { scope: containerRef });

  return (
    <Layout>
      <div ref={containerRef}>
        
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div ref={heroBgRef} className="w-full h-full origin-center will-change-transform">
              <img 
                src="https://picsum.photos/1920/1080?grayscale&blur=2" 
                alt="Cinematic Mood" 
                className="w-full h-full object-cover grayscale contrast-125 opacity-60"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" /> 
            <div className="absolute inset-0 bg-vignette" />
          </div>

          <div 
              ref={heroTextRef}
              className="relative z-10 px-6 w-full max-w-7xl mx-auto flex flex-col items-center md:items-start mix-blend-screen will-change-transform"
          >
              <div className="text-center md:text-left">
                  <div className="mb-6 flex justify-center md:justify-start items-center gap-4 overflow-hidden">
                      <div className="h-px w-12 bg-white/50 origin-left"></div>
                      <span className="text-white/70 uppercase tracking-[0.4em] text-[10px] font-light">
                          Visual Narratives
                      </span>
                  </div>
                  
                  <div className="mb-8">
                     <SplitText tag="h1" delay={0.2} className="text-5xl md:text-8xl lg:text-9xl font-serif font-thin italic tracking-tighter text-white leading-[0.9]">
                        Shadow & Light
                     </SplitText>
                  </div>
                  
                  <p className="text-sm md:text-lg text-secondary mb-12 max-w-md font-light leading-relaxed tracking-wide opacity-80">
                     We don't just take photos. We curate moments of raw emotion, framing the unscripted beauty of existence.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-8 pointer-events-auto">
                    <Magnetic strength={50}>
                      <Button onClick={() => navigate('/portfolio')} className="border-b border-white hover:border-accent text-white pb-1 px-0 rounded-none bg-transparent hover:bg-transparent tracking-widest text-xs">
                          Enter Gallery
                      </Button>
                    </Magnetic>
                  </div>
              </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none">
              <span className="text-[9px] uppercase tracking-widest text-white/40">Scroll</span>
              <div className="h-[40px] w-px bg-white/20 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-line" />
              </div>
          </div>
        </section>

        {/* Minimalist Brand Bar */}
        <section className="bg-black py-16 border-b border-white/5 relative z-20">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-1000 hover:opacity-100">
               {['VOGUE', 'KINFOLK', 'CEREAL', 'AESTHETICA'].map(brand => (
                   <span key={brand} className="text-sm font-sans font-light tracking-[0.3em] text-white cursor-default hover:text-accent transition-colors duration-500">{brand}</span>
               ))}
            </div>
          </div>
        </section>

        {/* Manifesto Section */}
        <section className="py-32 bg-black relative z-20">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                  <SectionTitle subtitle="Manifesto" title="The Art of Observation" alignment="left" />
              </div>
              <div className="md:col-span-8 md:pl-12 pt-8">
                  <div className="text-xl md:text-3xl font-serif text-white/80 leading-relaxed font-light italic">
                      "In a world of noise, we seek the silence. The subtle glance, the texture of fabric, the way light falls on a shoulder."
                  </div>
                  
                  <div className="manifesto-grid grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
                      {[
                      { icon: Film, title: "Analog Soul", desc: "Embracing grain, blur, and imperfection." },
                      { icon: Aperture, title: "Natural Light", desc: "Sculpting with available illumination." },
                      { icon: Frame, title: "Composition", desc: "Drawing the eye to what matters." }
                      ].map((feature, idx) => (
                      <div 
                          key={idx} 
                          className="feature-card border-l border-white/10 pl-6 group hover:border-accent transition-colors duration-500"
                      >
                          <feature.icon className="w-5 h-5 text-secondary mb-4 group-hover:text-white transition-colors" />
                          <h3 className="text-white font-medium tracking-widest text-xs uppercase mb-2">{feature.title}</h3>
                          <p className="text-secondary text-sm font-light leading-relaxed">{feature.desc}</p>
                      </div>
                      ))}
                  </div>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Works */}
        <section className="py-32 bg-surface overflow-hidden relative z-20">
          <div className="container">
            <SectionTitle subtitle="Archive" title="Selected Works" alignment="left" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Featured Item 1 - Big */}
              <div className="md:col-span-8 relative group cursor-pointer" onClick={() => navigate('/portfolio')}>
                  <Magnetic strength={10}>
                      <ParallaxImage src={featuredPhotos[0].url} alt={featuredPhotos[0].title} aspectRatio="aspect-[4/3]" />
                  </Magnetic>
                  <div className="mt-4 flex justify-between items-end border-b border-white/10 pb-4">
                      <h3 className="text-2xl font-serif italic text-white">{featuredPhotos[0].title}</h3>
                      <span className="text-[10px] uppercase tracking-widest text-secondary">01 / {featuredPhotos[0].category}</span>
                  </div>
              </div>

              {/* Featured Item 2 - Vertical */}
              <div className="md:col-span-4 md:mt-24 relative group cursor-pointer" onClick={() => navigate('/portfolio')}>
                  <Magnetic strength={10}>
                      <ParallaxImage src={featuredPhotos[1].url} alt={featuredPhotos[1].title} aspectRatio="aspect-[3/4]" />
                  </Magnetic>
                  <div className="mt-4 flex justify-between items-end border-b border-white/10 pb-4">
                      <h3 className="text-xl font-serif italic text-white">{featuredPhotos[1].title}</h3>
                      <span className="text-[10px] uppercase tracking-widest text-secondary">02 / {featuredPhotos[1].category}</span>
                  </div>
              </div>
              
               {/* Featured Item 3 - Wide */}
               <div className="md:col-span-12 relative group cursor-pointer mt-8" onClick={() => navigate('/portfolio')}>
                   <Magnetic strength={10}>
                      <ParallaxImage src={featuredPhotos[2].url} alt={featuredPhotos[2].title} aspectRatio="aspect-[21/9]" />
                   </Magnetic>
                  <div className="mt-4 flex justify-between items-end border-b border-white/10 pb-4">
                      <h3 className="text-2xl font-serif italic text-white">{featuredPhotos[2].title}</h3>
                      <span className="text-[10px] uppercase tracking-widest text-secondary">03 / {featuredPhotos[2].category}</span>
                  </div>
              </div>
            </div>
            
            <div className="mt-20 text-center">
               <Button variant="outline" onClick={() => navigate('/portfolio')}>View Full Archive</Button>
            </div>
          </div>
        </section>

        {/* Services Teaser */}
        <section className="py-32 bg-black relative border-t border-white/5 z-20">
          <div className="container relative z-10">
              <div className="max-w-4xl mx-auto">
                  <SectionTitle subtitle="Offerings" title="Commission" />
                  
                  <div className="mt-16 space-y-12">
                      {SERVICES.map((s) => (
                          <div
                              key={s.id}
                              className="group border-b border-white/10 pb-12 cursor-pointer hover:border-white/40 transition-colors duration-500"
                              onClick={() => navigate('/services')}
                          >
                              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                                  <h3 className="text-3xl md:text-4xl font-serif italic text-white group-hover:text-accent transition-colors duration-300">{s.title}</h3>
                                  <span className="text-xs font-mono text-secondary mt-2 md:mt-0">{s.price}</span>
                              </div>
                              <p className="text-secondary font-light max-w-lg transition-opacity duration-300 opacity-60 group-hover:opacity-100">{s.description}</p>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
        </section>

        {/* Cinematic Quote */}
        <section className="py-40 bg-surface flex items-center justify-center relative overflow-hidden z-20">
          <div className="absolute inset-0 bg-noise opacity-20"></div>
          <div className="container max-w-3xl text-center relative z-10">
              <Star className="w-6 h-6 text-accent mx-auto mb-10" />
              <div className="text-2xl md:text-4xl font-serif italic text-white leading-relaxed">
                  "{TESTIMONIALS[0].text}"
              </div>
              <div className="mt-10 flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white">{TESTIMONIALS[0].name}</span>
              </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-black z-20 relative">
          <div className="container text-center max-w-2xl">
            <Reveal width="100%">
              <p className="text-secondary text-sm tracking-widest uppercase mb-6">Availability 2024 / 2025</p>
              <h2 className="text-5xl md:text-7xl font-serif italic mb-12 text-white">
                  Tell your story.
              </h2>
            </Reveal>
            <div className="flex justify-center">
              <Magnetic>
                  <Button onClick={() => navigate('/contact')} variant="outline" className="border-white/50 text-white hover:border-white">
                      Start Conversation
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