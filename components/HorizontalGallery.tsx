import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PHOTOS } from '../constants';

gsap.registerPlugin(ScrollTrigger);

const HorizontalGallery: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const galleryPhotos = PHOTOS.slice(0, 6);

    useGSAP(() => {
        if (!sectionRef.current || !triggerRef.current) return;

        ScrollTrigger.refresh();

        const totalWidth = sectionRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        const xMovement = -(totalWidth - viewportWidth);

        gsap.fromTo(sectionRef.current, 
            { x: 0 },
            {
                x: xMovement,
                ease: "none",
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: "top top",
                    end: `+=${totalWidth}`, 
                    pin: true,
                    scrub: 1, 
                    invalidateOnRefresh: true,
                }
            }
        );

    }, { scope: triggerRef });

    return (
        <div ref={triggerRef} className="overflow-hidden bg-background relative w-full">
            <div className="absolute top-8 left-6 md:top-10 md:left-20 z-20 pointer-events-none mix-blend-difference">
                <span className="text-secondary text-micro tracking-[0.3em] uppercase block mb-2">Continuum</span>
                <h3 className="text-3xl md:text-4xl font-serif italic text-white">Fluxo Visual</h3>
            </div>

            <div 
                ref={sectionRef} 
                className="flex items-center h-[100dvh] w-fit px-8 md:px-[10vw] gap-8 md:gap-[5vw] will-change-transform"
            >
                {galleryPhotos.map((photo, index) => (
                    <div 
                        key={photo.id} 
                        className={`relative flex-shrink-0 group overflow-hidden shadow-xl ${
                            index % 2 === 0 
                                ? 'w-[70vw] md:w-[40vh] aspect-[3/4] md:mt-20' 
                                : 'w-[80vw] md:w-[50vh] aspect-[4/5] md:mb-20'
                        }`}
                    >
                        <img 
                            src={photo.url} 
                            alt={photo.title}
                            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
                            loading="lazy"
                        />
                        <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-primary/80 to-transparent w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                             <p className="text-white font-serif italic text-lg">{photo.title}</p>
                        </div>
                    </div>
                ))}
                
                <div className="w-[80vw] md:w-[30vw] h-[50vh] flex items-center justify-center flex-shrink-0">
                    <div className="text-center">
                        <p className="text-secondary text-sm mb-4">Explorar Arquivo Completo</p>
                        <div className="h-px w-20 bg-accent mx-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HorizontalGallery;