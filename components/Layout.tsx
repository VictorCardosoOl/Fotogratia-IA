import React, { useState, useEffect, useRef } from 'react';
import { NavLink as RouterNavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NAV_LINKS, CONTACT_INFO } from '../constants';
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinkClass = 'text-secondary hover:text-white transition-colors duration-500 tracking-widest text-[10px] uppercase font-light';
  const activeLinkClass = 'text-white font-normal';
  const underlineClass = 'bg-accent';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Footer Scroll Animation
  useGSAP(() => {
    if (!footerRef.current) return;

    gsap.fromTo(footerRef.current, 
      { opacity: 0.5, scale: 0.95, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom", // When top of footer hits bottom of viewport
          end: "bottom bottom", // When bottom of footer hits bottom of viewport
          scrub: 1, // Smooth interaction
        }
      }
    );
  }, { scope: footerRef });

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-primary selection:bg-accent selection:text-white font-sans">
      {/* Cinematic Header - Always Overlay */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isScrolled ? 'bg-background/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'
        }`}
      >
        <div className="container flex items-center justify-between">
          <RouterNavLink to="/" className="text-2xl md:text-3xl font-serif italic font-medium tracking-tight z-50 text-white hover:text-secondary transition-colors duration-500">
            LUMINA
          </RouterNavLink>

          {/* Desktop Nav - Minimal & Widescreen */}
          <nav className="hidden md:flex items-center space-x-12">
            {NAV_LINKS.map((link) => (
              <RouterNavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative group py-2 ${isActive ? activeLinkClass : navLinkClass}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-500 ease-out ${underlineClass} ${isActive ? 'w-full' : 'w-0 group-hover:w-full opacity-50'}`}></span>
                  </>
                )}
              </RouterNavLink>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:block">
              <Button 
                variant="text" 
                onClick={() => navigate('/contact')}
                className="text-white hover:text-accent font-serif italic text-base capitalize"
              >
                Inquire
              </Button>
            </div>
            
            <button 
              className="md:hidden z-50 p-2 focus:outline-none text-white hover:text-secondary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Deep Black */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-transform duration-[0.8s] ease-[0.16,1,0.3,1] transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col justify-center items-center space-y-10 ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {NAV_LINKS.map((link) => (
          <RouterNavLink
            key={link.path}
            to={link.path}
            onClick={handleMobileNavClick}
            className="text-4xl font-serif italic text-white hover:text-accent transition-colors duration-300"
          >
            {link.label}
          </RouterNavLink>
        ))}
        <Button variant="outline" onClick={() => { handleMobileNavClick(); navigate('/contact'); }} className="mt-8 border-white text-white">
            Start Project
        </Button>
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-0 w-full relative">
        {children}
      </main>

      {/* Footer - "Movie Credits" Style */}
      <footer 
        ref={footerRef}
        className="bg-black text-secondary py-24 w-full relative overflow-hidden border-t border-white/5 opacity-0"
      >
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between h-full">
            <div>
                <h3 className="text-5xl font-serif italic font-light mb-8 text-white">LUMINA</h3>
                <p className="text-muted text-sm leading-relaxed max-w-sm font-light tracking-wide">
                A visual storytelling studio. Based in light, rooted in emotion. We document the unscripted and the profound.
                </p>
            </div>
          </div>
          
          <div className="md:col-span-3 lg:col-span-3 md:col-start-8 lg:col-start-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] mb-8 text-white/50">Studio</h4>
            <div className="space-y-6 text-sm font-light tracking-wide flex flex-col items-start">
              <p className="text-white">{CONTACT_INFO.location}</p>
              <motion.a 
                href={`mailto:${CONTACT_INFO.email}`} 
                className="block hover:text-accent transition-colors duration-300 origin-left"
                whileHover={{ scale: 1.05, x: 5 }}
              >
                {CONTACT_INFO.email}
              </motion.a>
              <motion.a 
                href={`tel:${CONTACT_INFO.phone}`} 
                className="block hover:text-accent transition-colors duration-300 origin-left"
                whileHover={{ scale: 1.05, x: 5 }}
              >
                {CONTACT_INFO.phone}
              </motion.a>
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] mb-8 text-white/50">Social</h4>
            <div className="flex flex-col space-y-4 items-start">
              {['Instagram', 'Vimeo', 'Pinterest'].map((social) => (
                <motion.a 
                  key={social}
                  href="#" 
                  className="hover:text-accent opacity-60 hover:opacity-100 text-sm block transition-colors duration-300 origin-left"
                  whileHover={{ scale: 1.1, x: 5 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="container mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center relative z-10 gap-4 opacity-40 hover:opacity-80 transition-opacity duration-700">
          <p className="text-[10px] uppercase tracking-widest">&copy; {new Date().getFullYear()} Lumina. Est. 2024</p>
          <div className="flex space-x-8 text-[10px] uppercase tracking-widest">
            <a href="#" className="hover:text-white hover:scale-105 transition-all duration-300">Privacy</a>
            <a href="#" className="hover:text-white hover:scale-105 transition-all duration-300">Imprint</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;