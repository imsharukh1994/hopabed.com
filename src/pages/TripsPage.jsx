import React, { useState } from 'react';
import { Calendar, MapPin, MessageSquare, ShieldCheck, Clock } from 'lucide-react';

export default function TripsPage({ bookings, onSelectListing, onOpenMessaging }) {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.25rem' }}>Your Trips</h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
        Manage your current, upcoming, and past stays on BedHopper.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
        {['upcoming', 'past', 'cancelled'].map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              padding: '0.65rem 1.25rem',
              fontWeight: 800,
              fontSize: '0.92rem',
              textTransform: 'capitalize',
              borderBottom: activeTab === t ? '3px solid var(--color-primary)' : '3px solid transparent',
              color: activeTab === t ? 'var(--color-primary)' : 'var(--color-text-muted)'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Trips List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {bookings.length === 0 ? (
          <div style={{ textIndent: 0, textAlign: 'center', padding: '3rem', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
            <Calendar size={40} color="var(--color-text-muted)" style={{ margin: '0 auto 1rem auto' }} />
            <h3>No upcoming trips yet</h3>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>Start exploring low-cost beds across 50+ cities.</p>
          </div>
        ) : (
          bookings.map(b => (
            <div 
              key={b.id}
              style={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--color-primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary)',
                  fontWeight: 900
                }}>
                  <Calendar size={32} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{b.listingTitle}</h3>
                    <span style={{
                      padding: '0.2rem 0.55rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      backgroundColor: b.status === 'Confirmed' ? 'var(--color-teal-light)' : 'var(--color-yellow-light)',
                      color: b.status === 'Confirmed' ? 'var(--color-teal)' : '#D97706'
                    }}>
                      {b.status}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    🗓️ <strong>{b.checkIn} - {b.checkOut}</strong> ({b.nights} nights)
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                    Host: <strong>{b.hostName}</strong> • {b.paymentStatus}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', width: 'fit-content' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                  ${b.totalPrice.toFixed(2)}
                </span>
                <button 
                  className="btn-secondary" 
                  style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                  onClick={onOpenMessaging}
                >
                  <MessageSquare size={14} /> Message Host
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
