import React, { useState, useCallback, useRef } from 'react';

// Import colorful brand logos
import pythonLogo from '../assets/logos/python.svg';
import reactLogo from '../assets/logos/react.svg';
import dockerLogo from '../assets/logos/docker.svg';
import sqlLogo from '../assets/logos/sql.svg';
import powerbiLogo from '../assets/logos/powerbi.svg';
import excelLogo from '../assets/logos/excel.svg';
import snowflakeLogo from '../assets/logos/snowflake.svg';
import sapLogo from '../assets/logos/sap.svg';
import gcpLogo from '../assets/logos/gcp.svg';
import githubLogo from '../assets/logos/github.svg';

const LOGOS = [
  {
    name: 'Python',
    position: { top: '15%', left: '5%' },
    floatY: 18, floatR: 4, duration: 7, delay: 0,
    src: pythonLogo,
    glow: 'rgba(55, 118, 171, 0.6)'
  },
  {
    name: 'SQL',
    position: { top: '30%', left: '88%' },
    floatY: 12, floatR: 3, duration: 8, delay: 1,
    src: sqlLogo,
    glow: 'rgba(51, 103, 145, 0.6)'
  },
  {
    name: 'Power BI',
    position: { top: '55%', left: '3%' },
    floatY: 16, floatR: 5, duration: 6.5, delay: 2,
    src: powerbiLogo,
    glow: 'rgba(242, 200, 17, 0.6)'
  },
  {
    name: 'Excel',
    position: { top: '70%', left: '90%' },
    floatY: 14, floatR: 2, duration: 9, delay: 3,
    src: excelLogo,
    glow: 'rgba(16, 124, 65, 0.6)'
  },
  {
    name: 'Snowflake',
    position: { top: '20%', left: '45%' },
    floatY: 20, floatR: 6, duration: 7.5, delay: 1.5,
    src: snowflakeLogo,
    glow: 'rgba(41, 181, 232, 0.6)'
  },
  {
    name: 'Docker',
    position: { top: '80%', left: '40%' },
    floatY: 15, floatR: 3, duration: 8.5, delay: 4,
    src: dockerLogo,
    glow: 'rgba(36, 150, 237, 0.6)'
  },
  {
    name: 'React',
    position: { top: '45%', left: '92%' },
    floatY: 22, floatR: 4, duration: 6, delay: 0.5,
    src: reactLogo,
    glow: 'rgba(97, 218, 251, 0.6)'
  },
  {
    name: 'SAP',
    position: { top: '10%', left: '72%' },
    floatY: 13, floatR: 2, duration: 10, delay: 2.5,
    src: sapLogo,
    glow: 'rgba(0, 143, 211, 0.6)'
  },
  {
    name: 'GCP',
    position: { top: '60%', left: '18%' },
    floatY: 17, floatR: 5, duration: 7, delay: 3.5,
    src: gcpLogo,
    glow: 'rgba(66, 133, 244, 0.6)'
  },
  {
    name: 'GitHub',
    position: { top: '85%', left: '65%' },
    floatY: 11, floatR: 3, duration: 8, delay: 1.2,
    src: githubLogo,
    glow: 'rgba(128, 128, 128, 0.6)'
  }
];

const FloatingLogo = ({ logo }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const logoRef = useRef(null);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  }, [offset]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Spring back to original position
    setOffset({ x: 0, y: 0 });
  }, []);

  // Touch support
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });
  }, [offset]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setOffset({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  }, [isDragging, dragStart]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={logoRef}
      className="floating-logo"
      title={logo.name}
      style={{
        top: logo.position.top,
        left: logo.position.left,
        '--float-y': `${logo.floatY}px`,
        '--float-r': `${logo.floatR}deg`,
        '--brand-glow': logo.glow,
        animation: isDragging ? 'none' : `float-logo ${logo.duration}s ease-in-out infinite`,
        animationDelay: `${logo.delay}s`,
        transform: isDragging
          ? `translate(${offset.x}px, ${offset.y}px) scale(1.15)`
          : `translate(${offset.x}px, ${offset.y}px)`,
        transition: isDragging
          ? 'box-shadow 0.2s ease'
          : 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease, background 0.6s ease',
        zIndex: isDragging ? 200 : 'auto'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img src={logo.src} alt={logo.name} className="floating-logo-img" />
    </div>
  );
};

const FloatingLogos = () => {
  return (
    <div className="floating-logos-layer">
      {LOGOS.map((logo) => (
        <FloatingLogo key={logo.name} logo={logo} />
      ))}
    </div>
  );
};

export default FloatingLogos;
