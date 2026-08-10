import React from 'react';

export default function Logo({ size = 'medium', showText = true, className = '' }) {
  const heights = {
    small: 28,
    medium: 36,
    large: 48
  };

  const h = heights[size] || 36;
  const pinSize = Math.round(h * 0.9);

  return (
    <div className={`flex-center gap-2 ${className}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      {/* BedHopper Vector Logo Pin */}
      <svg width={pinSize} height={pinSize} viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow */}
        <ellipse cx="50" cy="112" rx="28" ry="7" fill="#1F4B37" fillOpacity="0.25" />
        
        {/* Outer Pin Body */}
        <path d="M50 0C22.3858 0 0 22.3858 0 50C0 76.5 42 110 50 115C58 110 100 76.5 100 50C100 22.3858 77.6142 0 50 0Z" fill="url(#pinGradient)" />
        
        {/* Bed Headboard */}
        <rect x="25" y="24" width="50" height="34" rx="8" fill="#2D6A4F" />
        
        {/* Pillow */}
        <rect x="32" y="28" width="36" height="12" rx="5" fill="#FFFFFF" />
        
        {/* Blanket/Duvet */}
        <rect x="22" y="42" width="56" height="24" rx="7" fill="#F4D35E" />
        <path d="M22 47C22 44.2386 24.2386 42 27 42H73C75.7614 42 78 44.2386 78 47V50H22V47Z" fill="#FFFFFF" fillOpacity="0.6" />

        {/* Gradients */}
        <defs>
          <linearGradient id="pinGradient" x1="0" y1="0" x2="100" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6B4A" />
            <stop offset="1" stopColor="#E0532C" />
          </linearGradient>
        </defs>
      </svg>

      {/* Wordmark */}
      {showText && (
        <span style={{ 
          fontFamily: 'var(--font-family-heading)', 
          fontWeight: 900, 
          fontSize: `${h * 0.75}px`, 
          letterSpacing: '-0.5px',
          lineHeight: 1
        }}>
          <span style={{ color: '#1E293B' }}>bed</span>
          <span style={{ color: '#F4845F' }}>hopper</span>
        </span>
      )}
    </div>
  );
}
