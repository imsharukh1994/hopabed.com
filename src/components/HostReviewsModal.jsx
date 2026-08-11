import React from 'react';
import { X, Star, ShieldCheck, ThumbsUp } from 'lucide-react';

export default function HostReviewsModal({ isOpen, onClose, listing }) {
  if (!isOpen || !listing) return null;

  const mockReviews = [
    {
      id: 1,
      name: 'Alex Rivera',
      country: 'Spain',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5.0,
      date: 'July 2026',
      comment: 'Unbelievable stay! Super clean, fast Wi-Fi, and the host was extremely helpful with local street food recommendations. Best $3/night ever spent!'
    },
    {
      id: 2,
      name: 'Liam Chen',
      country: 'Canada',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 4.8,
      date: 'June 2026',
      comment: 'Very quiet couch space in a great neighborhood near the metro. Felt 100% safe and welcomed.'
    },
    {
      id: 3,
      name: 'Sophie Martin',
      country: 'France',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      rating: 5.0,
      date: 'May 2026',
      comment: 'Host was so nice! Checked in smoothly using the digital pass. Highly recommended for solo backpackers.'
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2500,
      padding: '1rem'
    }} className="animate-fade-in">
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '24px',
        maxWidth: '580px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        color: 'var(--color-text-main)'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #f59e0b 0%, #f4845f 100%)',
          color: '#FFFFFF',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Star size={20} fill="#FFFFFF" color="#FFFFFF" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', margin: 0 }}>
              {listing.rating} Rating Breakdown & Reviews
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Rating Scores Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', backgroundColor: 'var(--color-bg)', padding: '1rem', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>Cleanliness</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--color-text-main)' }}>4.9 ★★★★★</div>
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>Location & Safety</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--color-text-main)' }}>4.8 ★★★★★</div>
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>Value for Money</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--color-teal)' }}>5.0 ★★★★★</div>
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>Host Communication</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--color-text-main)' }}>4.9 ★★★★★</div>
            </div>
          </div>

          {/* Verified Traveler Reviews List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 900, margin: 0 }}>
              Verified Backpacker Feedback ({listing.reviewsCount} reviews)
            </h4>

            {mockReviews.map((rev) => (
              <div key={rev.id} style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={rev.avatar} alt={rev.name} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <strong style={{ fontSize: '0.88rem' }}>{rev.name} ({rev.country})</strong>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{rev.date}</div>
                    </div>
                  </div>

                  <span style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--color-yellow)' }}>
                    {rev.rating} ★
                  </span>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', lineHeight: 1.5, margin: 0 }}>
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
