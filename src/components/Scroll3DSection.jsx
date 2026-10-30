import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Scroll3DSection
 * 
 * Wraps any section with dramatic 3D perspective scroll reveals.
 * As the user scrolls down, text and content enter from 3D depth with
 * smooth perspective rotation, scale, elevation, and cyan volumetric accents.
 */
export default function Scroll3DSection({ children, id, className = '', depth = 1 }) {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Calculate 3D transforms based on scroll position
  const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [14 * depth, 0, 0, -14 * depth]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0.92, 1, 1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.85, 1], [0.2, 1, 1, 0.3]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [60 * depth, 0, 0, -50 * depth]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative z-10 [perspective:1400px] will-change-transform ${className}`}
    >
      {/* Subtle Volumetric Cyan Depth Aura behind section */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[350px] bg-[#25BDF2]/5 rounded-full blur-[140px] pointer-events-none -z-10" 
        aria-hidden="true" 
      />

      <motion.div
        style={{
          rotateX,
          scale,
          opacity,
          y,
          transformStyle: 'preserve-3d'
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 90
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
