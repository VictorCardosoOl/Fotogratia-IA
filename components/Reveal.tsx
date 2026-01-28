import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface RevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, width = "fit-content", delay = 0.25, className = "" }) => {
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

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`} style={{ width }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 20 }, // Reduzido y de 40 para 20 para ser mais sutil
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 0.8, delay: delay + 0.3, ease: "easeOut" }} // Texto aparece logo após a cortina começar a sair
            >
                {children}
            </motion.div>
            
            {/* The curtain effect */}
            <motion.div
                variants={{
                    hidden: { left: 0 },
                    visible: { left: "100%" },
                }}
                initial="hidden"
                animate={slideControls}
                transition={{ duration: 0.8, delay: delay, ease: [0.76, 0, 0.24, 1] }} // Quintic ease para saída rápida
                className="absolute top-0 bottom-0 left-0 right-0 bg-accent z-20"
            />
        </div>
    );
};

export default Reveal;