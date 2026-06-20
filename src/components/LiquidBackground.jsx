import React from 'react';
import { motion } from 'framer-motion';
import '../liquid-glass.css';

const LiquidBackground = ({ theme }) => {
  return (
    <div className="liquid-bg-container">
      {/* Background base color transition */}
      <div className={`liquid-bg-base ${theme}`} />

      {/* Dynamic Aurora Gradients */}
      <div className={`aurora-gradient aurora-1 ${theme}`} />
      <div className={`aurora-gradient aurora-2 ${theme}`} />
      <div className={`aurora-gradient aurora-3 ${theme}`} />

      {/* Floating Translucent Glass Blobs / Orbs */}
      <div className="glass-blobs-layer">
        <motion.div 
          className="glass-blob blob-1"
          animate={{
            y: [0, -60, 20, 0],
            x: [0, 40, -20, 0],
            rotate: [0, 90, 180, 360],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="glass-blob blob-2"
          animate={{
            y: [0, 80, -30, 0],
            x: [0, -50, 40, 0],
            rotate: [0, -90, -180, -360],
            scale: [1, 1.25, 0.95, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="glass-blob blob-3"
          animate={{
            y: [0, -50, 30, 0],
            x: [0, -70, 20, 0],
            rotate: [0, 45, -45, 0],
            scale: [1, 1.1, 0.85, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      
      {/* Heavy Blur Layer to create the 'liquid' feel */}
      <div className="liquid-blur-layer" />

      {/* Global Noise/Texture Overlay for realism */}
      <div className="liquid-noise-overlay" />
    </div>
  );
};

export default LiquidBackground;
