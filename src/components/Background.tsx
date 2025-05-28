import React from 'react';

interface BackgroundProps {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  imageUrl?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  pattern?: 'dots' | 'lines' | 'grid' | 'none';
}

export default function Background({
  children,
  className = '',
  color = 'bg-gradient-to-br from-white to-blue-100 dark:from-blue-950 dark:to-blue-900',
  imageUrl,
  overlay = false,
  overlayOpacity = 0.5,
  pattern = 'none',
}: BackgroundProps) {
  // Generate pattern styles
  let patternStyle = {};
  
  if (pattern === 'dots') {
    patternStyle = {
      backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
      backgroundSize: '24px 24px',
    };
  } else if (pattern === 'lines') {
    patternStyle = {
      backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
      backgroundSize: '24px 24px',
    };
  } else if (pattern === 'grid') {
    patternStyle = {
      backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
      backgroundSize: '24px 24px',
    };
  }

  return (
    <div 
      className={`relative w-full h-full ${color} ${className}`}
      style={{
        ...(imageUrl && { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }),
        ...(pattern !== 'none' && patternStyle),
      }}
    >
      {overlay && imageUrl && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
} 