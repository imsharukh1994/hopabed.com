import React from 'react';
import Logo from './Logo';
import { Compass, Sparkles } from 'lucide-react';

export default function LoadingScreen({ message = "Connecting to global bed-share nodes..." }) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      backgroundColor: 'var(--color-bg, #0f172a)',
      color: 'var(--color-text-main, #f8fafc)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '2rem',
      padding: '2rem',
      transition: 'opacity 0.4s ease, visibility 0.4s ease'
    }}>
      {/* Animated Brand Logo Container */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Pulsing Outer Glow */}
        <div style={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(244, 132, 95, 0.4) 0%, rgba(13, 148, 136, 0) 70%)',
          animation: 'pulseGlow 2s infinite ease-in-out'
        }} />

        <div style={{ transform: 'scale(1.35)', position: 'relative', zIndex: 2 }}>
          <Logo size="large" />
        </div>
      </div>

      {/* Loading Progress Spinner & Message */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '3px solid var(--color-border, #334155)',
          borderTopColor: 'var(--color-primary, #f4845f)',
          borderRightColor: 'var(--color-teal, #0d9488)',
          animation: 'spin 0.8s linear infinite'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-text-main)' }}>
          <Sparkles size={16} color="var(--color-yellow, #f59e0b)" />
          <span>{message}</span>
        </div>

        <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
          hopabed.com • Open-Source Extreme-Budget Accommodation Protocol
        </span>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.4); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
