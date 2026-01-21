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
                    hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
                    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                }}
                initial="hidden"
                animate={mainControls}
                transition={{ duration: 1.2, delay: delay, ease: [0.22, 1, 0.36, 1] }}
            >
                {children}
            </motion.div>
            {/* The curtain effect - simulates a shutter or developing film */}
            <motion.div
                variants={{
                    hidden: { top: 0, bottom: 0 },
                    visible: { top: "100%", bottom: 0 },
                }}
                initial="hidden"
                animate={slideControls}
                transition={{ duration: 0.8, delay: delay * 0.5, ease: [0.83, 0, 0.17, 1] }}
                className="absolute left-0 right-0 bg-accent z-20"
            />
        </div>
    );
};

export default Reveal;