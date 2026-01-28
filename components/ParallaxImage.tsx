import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  speed?: number; // 1 = normal intensity
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ 
  src, 
  alt, 
  className = "",
  containerClassName = "aspect-[3/4]",
  speed = 1 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imgRef.current) return;

    // Calculate movement intensity
    // Increased base intensity for a more pronounced effect
    const movementStrength = 20 * speed; 

    gsap.fromTo(imgRef.current, 
      {
        yPercent: -movementStrength
      },
      {
        yPercent: movementStrength,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", 
          end: "bottom top",   
          scrub: true
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`relative overflow-hidden w-full bg-muted ${containerClassName}`}>
      {/* 
        Image Height increased to 140% to accommodate stronger parallax movement 
        without revealing background.
      */}
      <img 
        ref={imgRef}
        src={src} 
        alt={alt} 
        className={`absolute inset-0 w-full h-[140%] -top-[20%] object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 will-change-transform ${className}`}
        loading="lazy"
      />
    </div>
  );
};

export default ParallaxImage;