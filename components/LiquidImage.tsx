import React, { useRef, useId } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface LiquidImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

const LiquidImage: React.FC<LiquidImageProps> = ({ 
  src, 
  alt, 
  className = "",
  containerClassName = ""
}) => {
  const id = useId().replace(/:/g, ""); // Ensure valid ID for SVG
  const filterId = `liquid-filter-${id}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !displacementMapRef.current || !turbulenceRef.current) return;

    const tl = gsap.timeline({ paused: true });

    // Animation: Increase distortion scale and move turbulence
    tl.to(displacementMapRef.current, {
      attr: { scale: 30 }, // Distortion intensity
      duration: 0.8,
      ease: "power2.out"
    })
    .to(turbulenceRef.current, {
      attr: { baseFrequency: "0.02 0.03" }, // Move the ripples
      duration: 0.8,
      ease: "power2.out"
    }, 0);

    const onMouseEnter = () => {
      tl.play();
      // Glass Glare Effect
      if (glareRef.current) {
        gsap.to(glareRef.current, { opacity: 1, duration: 0.5 });
      }
    };

    const onMouseLeave = () => {
      tl.reverse();
      if (glareRef.current) {
        gsap.to(glareRef.current, { opacity: 0, duration: 0.5 });
      }
    };
    
    // Parallax Glass Glare Movement based on mouse position
    const onMouseMove = (e: MouseEvent) => {
        if (!glareRef.current) return;
        const { left, top, width, height } = containerRef.current!.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        gsap.to(glareRef.current, {
            x: (x - 0.5) * 50,
            y: (y - 0.5) * 50,
            duration: 1,
            ease: "power2.out"
        });
    };

    const container = containerRef.current;
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mousemove', onMouseMove);

    return () => {
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mousemove', onMouseMove);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${containerClassName}`}>
      {/* The Image with CSS Filter applied */}
      <img 
        src={src} 
        alt={alt} 
        className={`block w-full h-full object-cover relative z-10 transition-transform duration-700 ease-out hover:scale-105 ${className}`}
        style={{ filter: `url(#${filterId})` }}
        loading="lazy"
      />

      {/* Glass Glare Overlay */}
      <div 
        ref={glareRef}
        className="absolute inset-0 z-20 pointer-events-none opacity-0 mix-blend-overlay"
        style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 70%)',
            transform: 'scale(1.5)'
        }}
      />

      {/* SVG Filter Definition (Hidden) */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feTurbulence 
                ref={turbulenceRef}
                type="fractalNoise" 
                baseFrequency="0.005 0.005" 
                numOctaves="1" 
                seed="1" 
                result="turbulence" 
            />
            <feDisplacementMap 
                ref={displacementMapRef}
                in="SourceGraphic" 
                in2="turbulence" 
                scale="0" 
                xChannelSelector="R" 
                yChannelSelector="B" 
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default LiquidImage;