import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'span';
  delay?: number;
}

const SplitText: React.FC<SplitTextProps> = ({ 
  children, 
  className = "", 
  tag: Tag = 'div',
  delay = 0 
}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // 1. Split the text
    const text = new SplitType(elementRef.current, {
      types: 'lines, words, chars',
      tagName: 'span'
    });

    // 2. Set initial state for overflow masking on lines
    gsap.set(text.lines, { overflow: 'hidden' });
    
    // 3. Set initial state for characters (Physical "heavy" start)
    // Increased yPercent and rotation for more weight
    gsap.set(text.chars, { 
      yPercent: 130, 
      rotateZ: 10, 
      opacity: 0,
      transformOrigin: '0% 50%'
    });

    // 4. Animate
    const anim = gsap.to(text.chars, {
      yPercent: 0,
      rotateZ: 0,
      opacity: 1,
      duration: 1.5, // Slower duration for weight
      stagger: 0.03, // More distinct character separation
      delay: delay,
      ease: "power4.out", // Strong deceleration
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top 85%", 
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      anim.kill();
      text.revert();
    };
  }, [children, delay]);

  return (
    <Tag ref={elementRef} className={className}>
      {children}
    </Tag>
  );
};

export default SplitText;