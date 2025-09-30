'use client';

import React from 'react';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

const BorderBeam: React.FC<BorderBeamProps> = ({
  className = '',
  duration = 15,
  borderWidth = 2,
  colorFrom = '#ffaa40',
  colorTo = '#9c40ff',
  delay = 0,
}) => {
  return (
    <div
      style={
        {
          '--duration': duration,
          '--border-width': borderWidth,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          '--delay': `${delay}s`,
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden ${className}`}
    >
      {/* Top border beam */}
      <div 
        className="absolute top-0 left-0 h-[var(--border-width)] w-full bg-gradient-to-r from-transparent via-[var(--color-from)] to-transparent animate-border-beam-top"
        style={{
          animationDelay: `var(--delay)`,
          animationDuration: `calc(var(--duration) * 1s)`,
        }}
      />
      
      {/* Right border beam */}
      <div 
        className="absolute top-0 right-0 w-[var(--border-width)] h-full bg-gradient-to-b from-transparent via-[var(--color-to)] to-transparent animate-border-beam-right"
        style={{
          animationDelay: `calc(var(--delay) + var(--duration) * 0.25s)`,
          animationDuration: `calc(var(--duration) * 1s)`,
        }}
      />
      
      {/* Bottom border beam */}
      <div 
        className="absolute bottom-0 left-0 h-[var(--border-width)] w-full bg-gradient-to-r from-transparent via-[var(--color-from)] to-transparent animate-border-beam-bottom"
        style={{
          animationDelay: `calc(var(--delay) + var(--duration) * 0.5s)`,
          animationDuration: `calc(var(--duration) * 1s)`,
        }}
      />
      
      {/* Left border beam */}
      <div 
        className="absolute top-0 left-0 w-[var(--border-width)] h-full bg-gradient-to-b from-transparent via-[var(--color-to)] to-transparent animate-border-beam-left"
        style={{
          animationDelay: `calc(var(--delay) + var(--duration) * 0.75s)`,
          animationDuration: `calc(var(--duration) * 1s)`,
        }}
      />
    </div>
  );
};

export default BorderBeam;
