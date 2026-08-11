import React from 'react';
import { Flame, Clock, ArrowRight, Zap } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function FlashDealsBanner({ onSelectListing, listings = [], selectedCurrency = 'USD' }) {
  const flashDeals = [
    {
      id: 'l1',
      title: 'Bangkok Cozy Backpacker Couch',
      city: 'Bangkok',
      country: 'Thailand',
      price: 2,
      originalPrice: 5,
      timeLeft: '02h 45m',
      bedsLeft: 2
    },
    {
      id: 'l2',
      title: 'Tokyo Cyber Capsule Pod',
      city: 'Tokyo',
      country: 'Japan',
      price: 5,
      originalPrice: 12,
      timeLeft: '04h 12m',
      bedsLeft: 1
    },
    {
      id: 'l4',
      title: 'Lisbon Miradouro Dorm Bed',
      city: 'Lisbon',
      country: 'Portugal',
      price: 3,
      originalPrice: 8,
      timeLeft: '01h 18m',
      bedsLeft: 3
    }
  ];

  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '1.25rem 1.5rem',
      boxShadow: 'var(--shadow-md)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      margin: '1rem 0'
    }}>
      {/* Banner Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            color: '#ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Flame size={18} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-text-main)', margin: 0 }}>
            Tonight's Flash Deals (Up to 70% Off)
          </h3>
        </div>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 800, color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '4px 10px', borderRadius: '12px' }}>
          <Zap size={14} /> Flash Sale Refreshing Daily
        </div>
      </div>

      {/* Deals Grid Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1rem'
      }}>
        {flashDeals.map((deal) => (
          <div 
            key={deal.id}
            style={{
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              transition: 'var(--transition)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>
                  📍 {deal.city}, {deal.country}
                </span>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--color-text-main)', margin: '2px 0 0 0' }}>
                  {deal.title}
                </h4>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                  {formatPrice(deal.price, selectedCurrency)}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                  {formatPrice(deal.originalPrice, selectedCurrency)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#f59e0b', fontWeight: 700 }}>
                <Clock size={13} /> {deal.timeLeft} left • {deal.bedsLeft} bed left
              </div>

              <button
                onClick={() => {
                  const item = listings.find(l => l.id === deal.id);
                  if (item) onSelectListing(item);
                }}
                style={{
                  padding: '0.35rem 0.75rem',
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#fff',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Grab Bed <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
