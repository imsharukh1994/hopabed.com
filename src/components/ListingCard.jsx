import React, { useState } from 'react';
import { Star, ShieldCheck, Heart, MapPin, Sparkles, Award } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function ListingCard({ listing, onClick, onFavoriteToggle, isFavorite = false, selectedCurrency = 'USD' }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isHeartFocused, setIsHeartFocused] = useState(false);

  const handleKeyDown = (e) => {
    // Activate on Enter or Space keys
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(listing);
    }
  };

  const ariaLabelText = `${listing.title}. Rating: ${listing.rating} stars from ${listing.reviewsCount} reviews. ${
    listing.isServiceShare
      ? `Service-Share stay, requiring ${listing.serviceShareDetails?.hoursPerDay} daily assistance`
      : `Price: ${formatPrice(listing.pricePerNight, selectedCurrency)} per night`
  }. Location: ${listing.city}, ${listing.country}. Press Enter or Space to view details.`;

  return (
    <div 
      onClick={() => onClick(listing)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={ariaLabelText}
      style={{
        backgroundColor: 'var(--color-surface, #1e293b)',
        borderRadius: '16px',
        overflow: 'hidden',
        border: isFocused ? '1px solid var(--color-primary, #38bdf8)' : '1px solid #334155',
        boxShadow: isFocused
          ? '0 0 0 2px var(--color-primary, #38bdf8), 0 15px 30px rgba(0,0,0,0.3)'
          : isHovered
            ? '0 15px 30px rgba(0,0,0,0.3)'
            : '0 10px 25px rgba(0,0,0,0.2)',
        transform: (isFocused || isHovered) ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        outline: 'none'
      }}
      className="listing-card animate-fade-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* Photo Container */}
      <div style={{ position: 'relative', width: '100%', height: '190px', backgroundColor: '#0f172a' }}>
        <img 
          src={listing.images[0]} 
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />

        {/* Favorite Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onFavoriteToggle) onFavoriteToggle(listing.id);
          }}
          onFocus={() => setIsHeartFocused(true)}
          onBlur={() => setIsHeartFocused(false)}
          aria-label={isFavorite ? `Remove ${listing.title} from favorites` : `Add ${listing.title} to favorites`}
          aria-pressed={isFavorite}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            outline: isHeartFocused ? '2px solid var(--color-primary, #38bdf8)' : 'none',
            outlineOffset: '2px',
            zIndex: 10
          }}
        >
          <Heart size={18} fill={isFavorite ? '#ef4444' : 'none'} color={isFavorite ? '#ef4444' : '#fff'} />
        </button>

        {/* Type Badge */}
        <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {listing.isServiceShare ? (
            <span style={{
              backgroundColor: '#059669',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '0.2rem 0.6rem',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Sparkles size={12} /> Service-Share
            </span>
          ) : (
            <span style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.2rem 0.55rem',
              borderRadius: '20px',
              backdropFilter: 'blur(4px)'
            }}>
              {listing.typeLabel}
            </span>
          )}
        </div>
      </div>

      {/* Details Container */}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, color: '#f8fafc' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', lineHeight: 1.3, margin: 0 }}>
            {listing.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24' }} aria-hidden="true">
            <Star size={14} fill="#fbbf24" color="#fbbf24" />
            <span>{listing.rating}</span>
            <span style={{ color: '#94a3b8', fontWeight: 500 }}>({listing.reviewsCount})</span>
          </div>
        </div>

        {/* Location & Host Verification */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            <MapPin size={13} color="#94a3b8" />
            <span>{listing.distFromCenter} from center • {listing.city}</span>
          </div>
        </div>

        {/* Verified Host Tag */}
        {listing.host?.isVerified && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              color: '#10b981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              padding: '2px 8px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <ShieldCheck size={13} /> Verified Host
            </span>
            {listing.host?.trustPassport && (
              <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                <Award size={12} /> Trust Passport
              </span>
            )}
          </div>
        )}

        {/* Footer Price Section */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px dashed #334155' }}>
          <div>
            {listing.isServiceShare ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#10b981' }}>FREE</span>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{listing.serviceShareDetails?.hoursPerDay} assistance</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#38bdf8' }}>
                  {formatPrice(listing.pricePerNight, selectedCurrency)}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>/ night</span>
              </div>
            )}
          </div>

          <button 
            tabIndex={-1}
            aria-hidden="true"
            style={{
              padding: '0.45rem 0.95rem',
              fontSize: '0.85rem',
              fontWeight: 800,
              borderRadius: '12px',
              backgroundColor: '#0284c7',
              color: '#fff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
