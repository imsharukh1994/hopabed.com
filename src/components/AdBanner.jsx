import React from 'react';

export default function AdBanner({ slot = 1 }) {
  // GOOGLE ADS SLOT 1: Horizontal Leaderboard Banner (e.g. 728x90)
  if (slot === 1) {
    return (
      <div style={{
        margin: '2rem 0',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.68rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          <span>Ads by Google</span>
          <span style={{ fontSize: '10px' }}>ⓘ</span>
        </div>

        <div style={{
          width: '100%',
          maxWidth: '728px',
          minHeight: '90px',
          backgroundColor: 'var(--color-surface)',
          border: '1px dashed var(--color-border)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          boxShadow: 'var(--shadow-sm)',
          color: 'var(--color-text-main)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              backgroundColor: '#4285F4',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '18px'
            }}>
              G
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#4285F4', textTransform: 'uppercase' }}>Google AdSense</div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '2px 0 0 0', color: 'var(--color-text-main)' }}>
                Compare Cheap Flights & Backpacking Hotels Worldwide
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Sponsored by Google Ads Display Network • www.google.com/ads
              </p>
            </div>
          </div>

          <a 
            href="https://ads.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              padding: '0.5rem 1.1rem',
              backgroundColor: '#1a73e8',
              color: '#FFFFFF',
              borderRadius: '20px',
              fontSize: '0.82rem',
              fontWeight: 700,
              textDecoration: 'none',
              whiteSpace: 'nowrap'
            }}
          >
            Visit Site
          </a>
        </div>
      </div>
    );
  }

  // GOOGLE ADS SLOT 2: Medium Rectangle Sidebar Ad (e.g. 300x250)
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '4px',
      margin: '1rem 0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.68rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        <span>Ads by Google</span>
        <span style={{ fontSize: '10px' }}>ⓘ</span>
      </div>

      <div style={{
        width: '100%',
        minHeight: '220px',
        backgroundColor: 'var(--color-surface)',
        border: '1px dashed var(--color-border)',
        borderRadius: '16px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)',
        color: 'var(--color-text-main)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: 900, color: '#34A853', textTransform: 'uppercase' }}>
            Google Ad
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>Ad #2</span>
        </div>

        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: '#EA4335',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: '22px',
            margin: '0 auto 0.75rem auto'
          }}>
            G
          </div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: '0 0 4px 0', color: 'var(--color-text-main)' }}>
            Travel Insurance & Global Nomad Cover
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.4 }}>
            Instant medical & luggage coverage starting from $1.50/day.
          </p>
        </div>

        <a 
          href="https://ads.google.com" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            width: '100%',
            padding: '0.6rem',
            backgroundColor: '#1a73e8',
            color: '#FFFFFF',
            borderRadius: '12px',
            fontSize: '0.85rem',
            fontWeight: 700,
            textAlign: 'center',
            textDecoration: 'none'
          }}
        >
          Learn More
        </a>
      </div>
    </div>
  );
}
