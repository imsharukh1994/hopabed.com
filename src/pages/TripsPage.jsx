import React, { useState } from 'react';
import { Calendar, MapPin, MessageSquare, ShieldCheck, QrCode, Camera, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function TripsPage({ bookings = [], onSelectListing, onOpenMessaging, onOpenDigitalPass, onOpenProofOfWork, selectedCurrency = 'USD' }) {
  const [activeTab, setActiveTab] = useState('upcoming');

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '840px', color: '#f8fafc' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.25rem', color: '#fff' }}>Your Trips & Passes</h1>
      <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
        Access your offline check-in wallet passes, host messages, and proof-of-work escrow refunds.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid #334155', marginBottom: '1.5rem' }}>
        {['upcoming', 'past'].map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              padding: '0.65rem 1.25rem',
              fontWeight: 800,
              fontSize: '0.92rem',
              textTransform: 'capitalize',
              borderBottom: activeTab === t ? '3px solid #38bdf8' : '3px solid transparent',
              color: activeTab === t ? '#38bdf8' : '#94a3b8',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {t} Stays
          </button>
        ))}
      </div>

      {/* Trips List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#1e293b', borderRadius: '16px', border: '1px solid #334155' }}>
            <Calendar size={40} color="#94a3b8" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ color: '#fff' }}>No active trips found</h3>
            <p style={{ color: '#94a3b8', marginTop: '0.25rem', fontSize: '14px' }}>Explore low-cost rooms or zero-dollar Service-Share stays!</p>
          </div>
        ) : (
          bookings.map(b => (
            <div 
              key={b.id}
              style={{
                backgroundColor: '#1e293b',
                borderRadius: '20px',
                padding: '1.5rem',
                border: '1px solid #334155',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
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
                  borderRadius: '16px',
                  backgroundColor: 'rgba(2, 132, 199, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38bdf8',
                  fontWeight: 900
                }}>
                  <QrCode size={34} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: 0 }}>{b.listingTitle}</h3>
                    <span style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      backgroundColor: 'rgba(16, 185, 129, 0.15)',
                      color: '#10b981'
                    }}>
                      {b.status || 'Confirmed'}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
                    🗓️ <strong>{b.checkIn} - {b.checkOut}</strong> ({b.nights} nights)
                  </p>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>
                    Host: <strong>{b.hostName}</strong> • {b.paymentStatus}
                  </p>
                </div>
              </div>

              {/* Action Buttons Column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#38bdf8' }}>
                  {formatPrice(b.totalPrice, selectedCurrency)}
                </span>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button 
                    style={{
                      padding: '0.45rem 0.9rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      borderRadius: '12px',
                      backgroundColor: '#0284c7',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onClick={() => onOpenDigitalPass(b)}
                  >
                    <QrCode size={14} /> Pass & QR
                  </button>

                  {b.isServiceShare && (
                    <button 
                      style={{
                        padding: '0.45rem 0.9rem',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        borderRadius: '12px',
                        backgroundColor: '#059669',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onClick={() => onOpenProofOfWork(b)}
                    >
                      <Camera size={14} /> Submit Task Proof
                    </button>
                  )}

                  <button 
                    style={{
                      padding: '0.45rem 0.9rem',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      borderRadius: '12px',
                      backgroundColor: '#334155',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    onClick={onOpenMessaging}
                  >
                    <MessageSquare size={14} /> Message
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
