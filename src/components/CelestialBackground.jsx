import React, { useMemo } from 'react';
import darkBg from '../assets/futuristic_dark_bg.png';
import lightBg from '../assets/futuristic_light_bg.png';

const CelestialBackground = ({ theme }) => {
  // Generate random particles for depth effect and motion
  const particles = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${1 + Math.random() * 2}px`,
      duration: `${3 + Math.random() * 5}s`,
      delay: `${Math.random() * 5}s`
    }));
  }, []);

  return (
    <div className="futuristic-bg-container">
      {/* Background Image Layers */}
      <div 
        className={`futuristic-bg dark-bg ${theme === 'moon' ? 'active' : ''}`}
        style={{ backgroundImage: `url(${darkBg})` }}
      />
      <div 
        className={`futuristic-bg light-bg ${theme === 'sun' ? 'active' : ''}`}
        style={{ backgroundImage: `url(${lightBg})` }}
      />
      
      {/* Particles Layer */}
      <div className="particles-layer">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              '--twinkle-duration': particle.duration,
              '--twinkle-delay': particle.delay
            }}
          />
        ))}
      </div>
      
      {/* Overlay gradient for depth integration with content below */}
      <div className="futuristic-overlay" />
    </div>
  );
};

export default CelestialBackground;

