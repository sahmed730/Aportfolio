import React from 'react';

const PerspectiveCard = ({ children, style, className = '', tabIndex = 0 }) => {
  return (
    <div 
      className={`perspective-card ${className}`} 
      style={style}
      tabIndex={tabIndex} // For focus visibility
    >
      {children}
    </div>
  );
};

export default PerspectiveCard;
