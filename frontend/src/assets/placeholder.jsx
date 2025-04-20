import React from 'react';

const PlaceholderImage = () => (
  <svg 
    width="100%" 
    height="100%" 
    viewBox="0 0 400 400" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ backgroundColor: '#f5f5f5' }}
  >
    <rect width="100%" height="100%" fill="#f8f8f8" />
    <text 
      x="50%" 
      y="50%" 
      fontFamily="Arial" 
      fontSize="24" 
      textAnchor="middle" 
      dominantBaseline="middle"
      fill="#888888"
    >
      Imagen no disponible
    </text>
  </svg>
);

export default PlaceholderImage;
