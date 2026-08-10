import React from 'react';
import { Star, ShieldCheck, Heart, MapPin, Sparkles } from 'lucide-react';

export default function ListingCard({ listing, onClick, onFavoriteToggle, isFavorite = false }) {
  return (
    <div 
      onClick={() => onClick(listing)}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'var(--transition)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
      className="listing-card animate-fade-in"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      {/* Photo Container */}
      <div style={{ position: 'relative', width: '100%', height: '190px', backgroundColor: '#E2E8F0' }}>
        <img 
          src={listing.images[0]} 
          alt={listing.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onFavoriteToggle) onFavoriteToggle(listing.id);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(4px)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none'
          }}
        >
          <Heart size={18} fill={isFavorite ? 'var(--color-primary)' : 'none'} color={isFavorite ? 'var(--color-primary)' : '#475569'} />
        </button>

        {/* Type Badge */}
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {listing.isServiceShare ? (
            <span className="badge-service-share">
              <Sparkles size={12} /> Service-Share
            </span>
          ) : (
            <span style={{
              backgroundColor: 'rgba(30, 41, 59, 0.85)',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.2rem 0.55rem',
              borderRadius: 'var(--radius-pill)',
              backdropFilter: 'blur(4px)'
            }}>
              {listing.typeLabel}
            </span>
          )}
        </div>
      </div>

      {/* Details Container */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--color-text-main)', lineHeight: 1.3 }}>
            {listing.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.85rem', fontWeight: 700 }}>
            <Star size={14} fill="var(--color-yellow)" color="var(--color-yellow)" />
            <span>{listing.rating}</span>
            <span style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>({listing.reviewsCount})</span>
          </div>
        </div>

        {/* Location & Host Verification */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <MapPin size={13} color="var(--color-text-muted)" />
            <span>{listing.distFromCenter} from center • {listing.city}</span>
          </div>
        </div>

        {/* Verified Host Tag */}
        {listing.host?.isVerified && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="badge-verified">
              <ShieldCheck size={13} /> Verified Host
            </span>
            {listing.host?.trustPassport && (
              <span style={{ fontSize: '0.75rem', color: 'var(--color-teal)', fontWeight: 700 }}>
                • Trust Passport
              </span>
            )}
          </div>
        )}

        {/* Footer Price Section */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px dashed var(--color-border)' }}>
          <div>
            {listing.isServiceShare ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-teal)' }}>FREE</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{listing.serviceShareDetails?.hoursPerDay} assistance</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                  {listing.currency}{listing.pricePerNight}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>/ night</span>
              </div>
            )}
          </div>

          <button 
            className="btn-primary" 
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
