import React, { useState, useEffect } from 'react';
import { NavLink as RouterNavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS, CONTACT_INFO, SOCIAL_LINKS } from '../constants';
import Button from './Button';

const NAV_LINK_CLASS = 'text-secondary/80 hover:text-primary transition-colors duration-300 tracking-[0.2em] text-[11px] uppercase font-medium relative';
const ACTIVE_LINK_CLASS = 'text-primary font-bold';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) setIsScrolled(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    // Outer wrapper set to surface color to prevent black gaps if overscroll happens
    <div className="flex flex-col min-h-screen font-sans bg-surface">
      <header 
        className={`fixed top-0 left-0 right-0 z-header transition-all duration-500 ease-[0.22,1,0.36,1] ${
          isScrolled 
            ? 'bg-background/90 backdrop-blur-md py-4 border-b border-muted/50' 
            : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="container flex items-center justify-between">
          <RouterNavLink to="/" className="group relative z-50">
             <span className={`text-2xl md:text-3xl font-serif italic font-medium tracking-tight transition-colors duration-500 ${isScrolled || isMobileMenuOpen ? 'text-primary' : 'text-white md:text-primary'}`}>
                LUMINA
             </span>
          </RouterNavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-12">
            {NAV_LINKS.map((link) => (
              <RouterNavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `group py-2 ${isActive ? ACTIVE_LINK_CLASS : NAV_LINK_CLASS} ${!isScrolled && location.pathname === '/' ? 'text-primary' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-primary transition-all duration-500 ease-out ${isActive ? 'w-full' : 'w-0 group-hover:w-full opacity-40'}`} />
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
              className={`md:hidden z-50 p-2 focus:outline-none transition-colors duration-300 ${isMobileMenuOpen ? 'text-primary' : (isScrolled ? 'text-primary' : 'text-white')}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                animate={{ opacity: 1, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                exit={{ opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-0 bg-background z-modal md:hidden flex flex-col justify-center items-center"
            >
                <div className="flex flex-col items-center space-y-8">
                    {NAV_LINKS.map((link, i) => (
                    <motion.div
                        key={link.path}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                    >
                        <RouterNavLink
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-4xl font-serif italic text-primary hover:text-accent transition-colors duration-300"
                        >
                            {link.label}
                        </RouterNavLink>
                    </motion.div>
                    ))}
                </div>
                
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.6 }}
                    className="mt-12"
                >
                    <Button variant="outline" onClick={() => { setIsMobileMenuOpen(false); navigate('/contact'); }} className="border-primary text-primary">
                        Iniciar Projeto
                    </Button>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* 
        Main Content 
        - Mobile: Normal relative positioning, no margin bottom.
        - Desktop (md): Relative z-10 with margin-bottom to reveal footer.
        - Shadow: Very subtle to avoid black artifacts.
      */}
      <main className="relative z-10 w-full bg-background mb-0 md:mb-[45vh] rounded-b-none md:rounded-b-[3rem] shadow-none md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] overflow-hidden">
        {children}
      </main>

      {/* 
        Footer
        - Mobile: Relative (flows naturally).
        - Desktop (md): Fixed at bottom z-0.
      */}
      <footer 
        className="relative md:fixed bottom-0 left-0 right-0 z-0 bg-surface text-secondary h-auto md:h-[45vh] flex flex-col justify-between overflow-hidden"
      >
        {/* Giant Watermark Background - Hidden on mobile to save space/performance */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden opacity-50">
           <h1 className="text-[25vw] font-serif italic text-primary/5 leading-none tracking-tighter whitespace-nowrap">
              LUMINA
           </h1>
        </div>

        <div className="w-full h-full flex flex-col py-section-sm md:py-12 relative z-10">
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-12 flex-grow">
            
            {/* Column 1: Brand & Desc */}
            <div className="md:col-span-5 flex flex-col justify-start pt-4">
              <span className="text-2xl font-serif italic font-medium text-primary mb-6">LUMINA</span>
              <p className="text-secondary text-body font-light leading-relaxed max-w-sm">
                Narrativas visuais que capturam a essência do momento. Fotografia com alma, luz e propósito.
              </p>
            </div>
            
            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 md:col-start-7 pt-4">
               <h4 className="text-micro font-bold uppercase mb-6 text-primary tracking-widest">Menu</h4>
               <ul className="space-y-3">
                  {NAV_LINKS.map(link => (
                      <li key={link.path}>
                          <RouterNavLink to={link.path} className="text-small text-secondary hover:text-primary transition-colors flex items-center group w-fit">
                             {link.label}
                             <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                          </RouterNavLink>
                      </li>
                  ))}
               </ul>
            </div>

            {/* Column 3: Contact & Social */}
            <div className="md:col-span-3 pt-4">
              <h4 className="text-micro font-bold uppercase mb-6 text-primary tracking-widest">Contato</h4>
              <div className="space-y-4 mb-8">
                 <p className="text-small text-secondary">{CONTACT_INFO.location}</p>
                 <a href={`mailto:${CONTACT_INFO.email}`} className="block text-small text-primary font-medium hover:text-accent transition-colors">{CONTACT_INFO.email}</a>
              </div>
              
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a 
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="w-10 h-10 border border-secondary/20 rounded-full flex items-center justify-center text-secondary hover:text-primary hover:border-primary transition-all duration-300 hover:scale-105 bg-transparent"
                  >
                     <span className="sr-only">{social.label}</span>
                     <span className="text-[10px] font-bold uppercase">{social.id}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="container mt-12 md:mt-auto">
             <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-micro uppercase text-secondary/60 tracking-widest">&copy; {new Date().getFullYear()} Lumina Studio.</p>
                <div className="flex gap-6">
                    <button className="text-micro uppercase text-secondary/60 hover:text-primary tracking-widest transition-colors">Privacidade</button>
                    <button className="text-micro uppercase text-secondary/60 hover:text-primary tracking-widest transition-colors">Termos</button>
                </div>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;