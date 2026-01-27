import React, { useState, useEffect } from 'react';
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NAV_LINKS, CONTACT_INFO, SOCIAL_LINKS } from '../constants';
import Button from './Button';

const NAV_LINK_CLASS = 'text-secondary hover:text-primary transition-colors duration-500 tracking-widest text-micro uppercase font-semibold';
const ACTIVE_LINK_CLASS = 'text-primary font-bold';
const UNDERLINE_CLASS = 'bg-accent';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  
  // Parallax Footer Animations
  const { scrollYProgress } = useScroll();
  const footerOpacity = useTransform(scrollYProgress, [0.9, 1], [0.5, 1]);
  const footerScale = useTransform(scrollYProgress, [0.9, 1], [0.95, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) setIsScrolled(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  const handleMobileNavClick = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <header 
        className={`fixed top-0 left-0 right-0 z-header transition-all duration-700 ease-out ${
          isScrolled ? 'bg-background/90 backdrop-blur-md py-4 border-b border-muted shadow-sm' : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="container flex items-center justify-between">
          <RouterNavLink to="/" className={`text-2xl md:text-3xl font-serif italic font-medium tracking-tight z-50 transition-colors duration-500 ${isScrolled ? 'text-primary' : 'text-white md:text-primary'}`}>
            LUMINA
          </RouterNavLink>

          <nav className="hidden md:flex items-center space-x-12">
            {NAV_LINKS.map((link) => (
              <RouterNavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative group py-2 ${isActive ? ACTIVE_LINK_CLASS : NAV_LINK_CLASS} ${!isScrolled && 'md:text-primary'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className={`absolute -bottom-1 left-0 h-[1px] transition-all duration-500 ease-out ${UNDERLINE_CLASS} ${isActive ? 'w-full' : 'w-0 group-hover:w-full opacity-50'}`} />
                  </>
                )}
              </RouterNavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-6">
            <div className="hidden md:block">
              <Button 
                variant="text" 
                onClick={() => navigate('/contact')}
                className={`${isScrolled ? 'text-primary' : 'text-primary'} hover:text-accent font-serif italic text-base capitalize`}
              >
                Contato
              </Button>
            </div>
            
            <button 
              className={`md:hidden z-50 p-2 focus:outline-none transition-colors ${isMobileMenuOpen ? 'text-white' : (isScrolled ? 'text-primary' : 'text-white')}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-dark z-modal transition-transform duration-[0.8s] ease-[0.16,1,0.3,1] transform ${
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
            Iniciar Projeto
        </Button>
      </div>

      {/* Main Content - Z-Index 10 ensures it slides OVER the footer */}
      <main className="relative z-10 w-full bg-background shadow-2xl">
        {children}
      </main>

      {/* Sticky Footer - Z-Index 0 stays BEHIND the main content */}
      <footer 
        className="sticky bottom-0 left-0 right-0 z-0 bg-surface text-secondary flex items-center min-h-[50vh] md:min-h-[60vh]"
      >
        <motion.div 
          style={{ opacity: footerOpacity, scale: footerScale }}
          className="w-full h-full flex flex-col justify-between py-12 md:py-20"
        >
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10 h-full flex-grow">
            <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between">
              <div>
                  <h3 className="text-5xl md:text-9xl font-serif italic font-light mb-8 text-primary/10 select-none">LUMINA</h3>
                  <p className="text-secondary text-sm leading-relaxed max-w-sm font-light tracking-wide">
                  Um estúdio de narrativa visual. Baseado na luz, enraizado na emoção. Documentamos o não roteirizado e o profundo.
                  </p>
              </div>
            </div>
            
            <div className="md:col-span-3 lg:col-span-3 md:col-start-8 lg:col-start-8 flex flex-col justify-center">
              <h4 className="text-micro font-bold uppercase mb-8 text-primary/40">Estúdio</h4>
              <div className="space-y-6 text-sm font-light tracking-wide flex flex-col items-start">
                <p className="text-primary">{CONTACT_INFO.location}</p>
                <a href={`mailto:${CONTACT_INFO.email}`} className="block text-primary hover:text-accent transition-colors">{CONTACT_INFO.email}</a>
                <a href={`tel:${CONTACT_INFO.phone}`} className="block text-primary hover:text-accent transition-colors">{CONTACT_INFO.phone}</a>
              </div>
            </div>

            <div className="md:col-span-3 lg:col-span-2 flex flex-col justify-center">
              <h4 className="text-micro font-bold uppercase mb-8 text-primary/40">Social</h4>
              <div className="flex flex-col space-y-4 items-start">
                {SOCIAL_LINKS.map((social) => (
                  <a 
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="text-secondary opacity-80 hover:opacity-100 text-sm block hover:translate-x-1 transition-transform duration-300"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="container mt-12 pt-8 border-t border-muted/50 flex flex-col md:flex-row justify-between items-center relative z-10 gap-4 opacity-60">
            <p className="text-micro uppercase text-secondary">&copy; {new Date().getFullYear()} Lumina. Est. 2024</p>
            <div className="flex space-x-8 text-micro uppercase text-secondary">
              <button className="hover:text-primary transition-colors">Privacidade</button>
              <button className="hover:text-primary transition-colors">Termos</button>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
};

export default Layout;