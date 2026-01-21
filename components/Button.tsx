import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'text';
  fullWidth?: boolean;
  withArrow?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  withArrow = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors duration-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";
  
  const variants = {
    primary: "bg-white text-black border border-transparent hover:border-accent rounded-none",
    outline: "border border-white/30 text-white bg-transparent rounded-none",
    text: "text-white p-0 font-serif italic text-sm tracking-normal capitalize bg-transparent hover:text-accent"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  // Text Slide Animation Content
  const renderContent = () => {
      if (variant === 'text') {
          return (
              <span className="flex items-center gap-2">
                  <span className="relative">
                    {children}
                    <span className="absolute left-0 bottom-0 w-full h-px bg-accent origin-left scale-x-0 transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:scale-x-100"></span>
                  </span>
                  {withArrow && <ArrowRight className="w-3 h-3 transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-1" />}
              </span>
          );
      }
      
      return (
        <div className="relative overflow-hidden h-4 flex items-center">
            <motion.div
                variants={{
                    initial: { y: 0 },
                    hover: { y: "-150%" }
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
            <motion.div
                className="absolute inset-0 top-0 left-0 flex items-center justify-center"
                variants={{
                    initial: { y: "150%" },
                    hover: { y: 0 }
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                 {/* When primary (Black text on White), hover text is Accent. When outline, it's black (due to mix-blend). */}
                 {variant === 'primary' ? <span className="text-accent">{children}</span> : children}
            </motion.div>
        </div>
      );
  }

  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      initial="initial"
      whileHover="hover"
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`} 
      {...props}
    >
      {/* Background Fill Animation for Outline */}
      {variant === 'outline' && (
         <motion.div 
            variants={{
                initial: { scaleY: 0 },
                hover: { scaleY: 1 }
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-white origin-bottom z-0"
         />
      )}
      
      {/* Content wrapper */}
      <span className={`relative z-10 flex items-center ${variant === 'outline' ? 'mix-blend-exclusion' : ''}`}>
        {renderContent()}
        {withArrow && variant !== 'text' && (
            <ArrowRight className="w-3 h-3 ml-4 opacity-70" />
        )}
      </span>
    </motion.button>
  );
};

export default Button;