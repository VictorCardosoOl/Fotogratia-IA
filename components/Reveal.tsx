import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
    variant?: "curtain" | "fade"; // New prop to choose animation style
}

export const Reveal: React.FC<RevealProps> = ({ 
    children, 
    width = "fit-content", 
    delay = 0.25, 
    className = "",
    variant = "curtain"
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const mainControls = useAnimation();
    const slideControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start("visible");
            slideControls.start("visible");
        }
    }, [isInView, mainControls, slideControls]);

    const fadeVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: delay }
        },
    };

    const curtainContentVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, delay: delay + 0.3, ease: "easeOut" }
        },
    };

    const curtainOverlayVariants: Variants = {
        hidden: { left: 0 },
        visible: { 
            left: "100%",
            transition: { duration: 0.8, delay: delay, ease: [0.76, 0, 0.24, 1] }
        },
    };

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ width }}>
            <motion.div
                variants={variant === "fade" ? fadeVariants : curtainContentVariants}
                initial="hidden"
                animate={mainControls}
            >
                {children}
            </motion.div>
            
            {/* The curtain effect - only render if variant is curtain */}
            {variant === "curtain" && (
                <motion.div
                    variants={curtainOverlayVariants}
                    initial="hidden"
                    animate={slideControls}
                    className="absolute top-0 bottom-0 left-0 right-0 bg-accent z-20"
                />
            )}
        </div>
    );
};

export default Reveal;