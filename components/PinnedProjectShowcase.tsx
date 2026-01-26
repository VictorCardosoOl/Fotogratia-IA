import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface Project {
    id: string;
    title: string;
    category: string;
    imageBg: string;
    imageFg: string;
    year: string;
}

const PROJECTS: Project[] = [
    { 
        id: '1', 
        title: 'Ethereal Silence', 
        category: 'Editorial', 
        imageBg: 'https://picsum.photos/1920/1080?random=10', 
        imageFg: 'https://picsum.photos/600/800?random=11',
        year: '2024'
    },
    { 
        id: '2', 
        title: 'Raw Concrete', 
        category: 'Architecture', 
        imageBg: 'https://picsum.photos/1920/1080?random=12', 
        imageFg: 'https://picsum.photos/600/800?random=13',
        year: '2023'
    },
    { 
        id: '3', 
        title: 'Velvet Hour', 
        category: 'Commercial', 
        imageBg: 'https://picsum.photos/1920/1080?random=14', 
        imageFg: 'https://picsum.photos/600/800?random=15',
        year: '2024'
    }
];

const PinnedProjectShowcase: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    useGSAP(() => {
        if (!containerRef.current) return;

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: `+=${PROJECTS.length * 65}%`, 
            pin: true,
            scrub: true,
            onUpdate: (self) => {
                const idx = Math.min(
                    PROJECTS.length - 1,
                    Math.floor(self.progress * PROJECTS.length)
                );
                setActiveIndex(idx);
            }
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-background">
            {PROJECTS.map((project, index) => (
                <div 
                    key={project.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-[0.22,1,0.36,1] ${
                        index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img 
                            src={project.imageBg} 
                            alt="Background" 
                            className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${
                                index === activeIndex ? 'scale-105' : 'scale-110'
                            } opacity-60 grayscale-[30%]`}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    {/* Content Container */}
                    <div className="relative z-20 container h-full flex flex-col md:flex-row items-center justify-between px-6">
                        
                        {/* Text Content */}
                        <div className={`flex flex-col justify-center h-full max-w-xl transition-all duration-1000 delay-100 ${
                            index === activeIndex ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                        }`}>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-white/90 text-xs font-bold tracking-widest uppercase">{project.category}</span>
                                <div className="h-px w-12 bg-white/40" />
                                <span className="text-white/60 text-xs font-mono">{project.year}</span>
                            </div>
                            
                            <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif italic text-white leading-[1] md:leading-[0.9] mb-8 drop-shadow-lg">
                                {project.title}
                            </h2>
                            
                            <button 
                                onClick={() => navigate('/portfolio')}
                                className="group flex items-center gap-4 text-white text-xs uppercase tracking-[0.2em] hover:text-accent transition-colors"
                            >
                                View Case Study
                                <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent transition-all duration-300">
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                </span>
                            </button>
                        </div>

                        {/* Foreground Image - Hidden on mobile for space */}
                        <div className={`hidden lg:block w-[350px] xl:w-[400px] aspect-[4/5] relative transition-all duration-1000 ease-[0.22,1,0.36,1] ${
                            index === activeIndex ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
                        }`}>
                            <div className="absolute inset-0 bg-surface translate-x-4 translate-y-4 shadow-lg" />
                            <img 
                                src={project.imageFg} 
                                alt={project.title} 
                                className="relative w-full h-full object-cover shadow-2xl grayscale-[20%] transition-all duration-700 hover:grayscale-0"
                            />
                        </div>

                    </div>
                    
                    {/* Progress Indicator */}
                    <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 flex gap-2">
                         <span className="text-4xl md:text-6xl font-serif text-white/30">0{index + 1}</span>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default PinnedProjectShowcase;