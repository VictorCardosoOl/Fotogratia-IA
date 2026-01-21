import React, { useState, useEffect } from 'react';
import { NavLink as RouterNavLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Mail } from 'lucide-react';
import { NAV_LINKS, CONTACT_INFO } from '../constants';
import Button from './Button';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  
  const isTransparent = isHome && !isScrolled;
  
  const headerTextColor = isTransparent ? 'text-white' : 'text-primary';
  const headerLogoColor = isTransparent ? 'text-white' : 'text-primary';
  const navLinkClass = isTransparent 
    ? 'text-white/80 hover:text-white' 
    : 'text-muted hover:text-primary';
  const activeLinkClass = isTransparent ? 'text-white font-medium' : 'text-primary font-medium';
  const underlineClass = isTransparent ? 'bg-white' : 'bg-primary';
  const mobileToggleColor = isTransparent ? 'text-white' : 'text-primary';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-primary selection:bg-secondary/20 selection:text-primary">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[0.16,1,0.3,1] ${
          isScrolled ? 'bg-background/95 backdrop-blur-sm py-4 md:py-5 border-b border-primary/5' : 'bg-transparent py-6 md:py-8'
        }`}
      >
        <div className="container flex items-center justify-between">
          <RouterNavLink to="/" className={`text-2xl font-serif font-semibold tracking-tight z-50 transition-colors duration-500 ${headerLogoColor}`}>
            LUMINA
          </RouterNavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {NAV_LINKS.map((link) => (
              <RouterNavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs lg:text-sm tracking-widest uppercase transition-colors relative group ${
                    isActive ? activeLinkClass : navLinkClass
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-px transition-all duration-500 ease-out ${underlineClass} ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </>
                )}
              </RouterNavLink>
            ))}
          </nav>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Button 
                variant={isTransparent ? 'outline' : 'primary'} 
                onClick={() => navigate('/contact')}
                className={`
                  ${isTransparent ? 'border-white text-white hover:bg-white hover:text-primary' : ''}
                `}
              >
                Book Now
              </Button>
            </div>
            
            <button 
              className={`md:hidden z-50 p-2 focus:outline-none transition-colors duration-300 ${mobileToggleColor}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-background z-40 transition-transform duration-700 ease-[0.22,1,0.36,1] transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden flex flex-col justify-center items-center space-y-8 ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {NAV_LINKS.map((link) => (
          <RouterNavLink
            key={link.path}
            to={link.path}
            onClick={handleMobileNavClick}
            className="text-3xl font-serif text-primary hover:text-secondary transition-colors"
          >
            {link.label}
          </RouterNavLink>
        ))}
        <Button onClick={() => { handleMobileNavClick(); navigate('/contact'); }}>Book a Session</Button>
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-0 w-full relative">
        {children}
      </main>

      {/* Footer - Warm Stone Aesthetic */}
      <footer className="bg-surface text-primary py-16 md:py-20 w-full relative overflow-hidden border-t border-primary/5">
        <div className="container grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
          <div className="md:col-span-6 lg:col-span-5">
            <h3 className="text-3xl font-serif font-bold mb-6 text-primary">LUMINA</h3>
            <p className="text-muted text-sm leading-relaxed max-w-sm font-light">
              Crafting visual legacies with a focus on light, composition, and authentic emotion. We believe in the power of print and the eternity of a captured moment.
            </p>
          </div>
          
          <div className="md:col-span-3 lg:col-span-3 md:col-start-8 lg:col-start-8">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-primary/80">Contact</h4>
            <div className="space-y-4 text-muted text-sm font-light">
              <p>{CONTACT_INFO.location}</p>
              <a href={`mailto:${CONTACT_INFO.email}`} className="block hover:text-primary transition-colors">{CONTACT_INFO.email}</a>
              <a href={`tel:${CONTACT_INFO.phone}`} className="block hover:text-primary transition-colors">{CONTACT_INFO.phone}</a>
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-primary/80">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white border border-primary/5 rounded-full hover:bg-primary hover:text-white transition-all duration-500 ease-out" 
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white border border-primary/5 rounded-full hover:bg-primary hover:text-white transition-all duration-500 ease-out" 
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={`mailto:${CONTACT_INFO.email}`}
                className="p-3 bg-white border border-primary/5 rounded-full hover:bg-primary hover:text-white transition-all duration-500 ease-out" 
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="container mt-20 pt-8 border-t border-primary/5 text-center md:text-left text-xs text-muted/60 flex flex-col md:flex-row justify-between items-center relative z-10 gap-4">
          <p>&copy; {new Date().getFullYear()} Lumina Photography. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;