import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string; // e.g., "aspect-[4/3]"
  parallaxStrength?: number; // 0 to 1 range generally
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  aspectRatio = "aspect-[3/4]",
  parallaxStrength = 0.15 // Not used directly in GSAP implementation logic below, hardcoded for consistency
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !imageRef.current) return;

    // Create a timeline that is scrubbed by scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom", // Start when top of container hits bottom of viewport
        end: "bottom top",   // End when bottom of container hits top of viewport
        scrub: 1.2,          // 1.2s lag (inertia) creates the "weight"
      }
    });

    // The Parallax Math:
    // Move the image from -15% y to +15% y relative to its container.
    // This requires the image to be larger than the container (handled by h-[130%])
    tl.fromTo(imageRef.current, 
      { yPercent: -15, scale: 1.2 }, 
      { yPercent: 15, scale: 1.1, ease: "none" } // Linear movement, smoothed by scrub
    );

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden w-full ${aspectRatio} ${className} bg-surface group`}
    >
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 ease-out"
          loading="lazy"
        />
      </div>
      
      {/* Cinematic Grain Overlay specific to image */}
      <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay"></div>
    </div>
  );
};

export default ParallaxImage;