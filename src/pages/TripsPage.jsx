import React, { useState } from 'react';
import { Calendar, MapPin, MessageSquare, ShieldCheck, QrCode, Camera, CheckCircle2, Clock, XCircle, AlertCircle, Wallet } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function TripsPage({ bookings = [], onSelectListing, onOpenMessaging, onOpenDigitalPass, onOpenProofOfWork, selectedCurrency = 'USD' }) {
  const [activeTab, setActiveTab] = useState('upcoming');

  const tabBookings = activeTab === 'upcoming'
    ? bookings.filter(b => !['CHECKED_OUT', 'CANCELLED', 'Cancelled'].includes(b.bookingStatus || b.status))
    : bookings.filter(b => ['CHECKED_OUT', 'CANCELLED', 'Cancelled', 'Completed'].includes(b.bookingStatus || b.status));

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '840px', color: 'var(--color-text-main)' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.25rem', color: 'var(--color-text-main)' }}>Your Trips & Passes</h1>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
        Access your offline check-in wallet passes, host messages, and proof-of-work escrow refunds.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
        {['upcoming', 'past'].map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              padding: '0.65rem 1.25rem',
              fontWeight: 800,
              fontSize: '0.92rem',
              textTransform: 'capitalize',
              color: activeTab === t ? '#38bdf8' : 'var(--color-text-muted)',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: activeTab === t ? '3px solid #38bdf8' : '3px solid transparent',
              cursor: 'pointer',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            {t} Stays
          </button>
        ))}
      </div>

      {/* Trips List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
            <Calendar size={40} color="var(--color-text-muted)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ color: 'var(--color-text-main)' }}>No active trips found</h3>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.25rem', fontSize: '14px' }}>Explore low-cost rooms or zero-dollar Service-Share stays!</p>
          </div>
        ) : tabBookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
            <Calendar size={40} color="var(--color-text-muted)" style={{ margin: '0 auto 1rem auto' }} />
            <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>No {activeTab} stays.</p>
          </div>
        ) : (
          tabBookings.map(b => (
            <BookingCard
              key={b.id}
              booking={b}
              selectedCurrency={selectedCurrency}
              onOpenDigitalPass={onOpenDigitalPass}
              onOpenProofOfWork={onOpenProofOfWork}
              onOpenMessaging={onOpenMessaging}
            />
          ))
        )}
      </div>
    </div>
  );
}

function BookingCard({ booking: b, selectedCurrency, onOpenDigitalPass, onOpenProofOfWork, onOpenMessaging }) {
  const [hovered, setHovered] = useState(false);

  const bookingStatus = b.bookingStatus || (b.status === 'Confirmed' ? 'PASS_ACTIVE' : b.status === 'Pending' ? 'PENDING_HOST_APPROVAL' : b.status);
  const hasActivePass = ['PASS_ACTIVE', 'CHECKED_IN', 'CHECKED_OUT'].includes(bookingStatus);
  const isPending = bookingStatus === 'PENDING_HOST_APPROVAL';
  const isRejected = bookingStatus === 'REJECTED';
  const isCancelled = bookingStatus === 'CANCELLED' || b.status === 'Cancelled';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '20px',
        padding: '1.5rem',
        border: `1px solid ${hovered ? 'var(--color-border-dark)' : 'var(--color-border)'}`,
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.25rem',
        transition: 'all 0.25s',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {/* Left: Info */}
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flex: 1 }}>
        {/* Status icon */}
        <div style={{
          width: '72px', height: '72px',
          borderRadius: '16px',
          background: isCancelled || isRejected
            ? 'rgba(239,68,68,0.1)'
            : isPending
              ? 'rgba(245,158,11,0.1)'
              : 'rgba(2, 132, 199, 0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          color: isCancelled || isRejected ? '#ef4444' : isPending ? '#fbbf24' : '#38bdf8',
        }}>
          {isCancelled || isRejected ? <XCircle size={34} /> : isPending ? <Clock size={34} /> : <QrCode size={34} />}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: 'var(--color-text-main)', margin: 0 }}>{b.listingTitle}</h3>
            <BookingStatusBadge status={bookingStatus} />
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
            🗓️ <strong>{b.checkIn} – {b.checkOut}</strong> ({b.nights} nights)
          </p>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0 }}>
            Host: <strong>{b.hostName}</strong> • {b.paymentStatus}
          </p>

          {/* Booking status message */}
          <div style={{ marginTop: '6px' }}>
            {isPending && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#fbbf24', fontWeight: 700 }}>
                <Clock size={14} />
                ⏳ Waiting for Host Approval — pass will be generated upon approval.
              </div>
            )}
            {hasActivePass && !isCancelled && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#10b981', fontWeight: 700 }}>
                <CheckCircle2 size={14} />
                ✓ Booking Confirmed — Digital Pass Ready
              </div>
            )}
            {isRejected && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#ef4444', fontWeight: 700 }}>
                <XCircle size={14} />
                Booking Rejected by Host
              </div>
            )}
            {isCancelled && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#ef4444', fontWeight: 700 }}>
                <XCircle size={14} />
                Booking Cancelled
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: Price + Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.2rem', fontWeight: 900, color: '#38bdf8' }}>
          {formatPrice(b.totalPrice, selectedCurrency)}
        </span>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {/* Digital Pass button — only when approved */}
          {hasActivePass && !isCancelled && (
            <button
              style={{
                padding: '0.45rem 0.9rem', fontSize: '0.82rem', fontWeight: 700,
                borderRadius: '12px', backgroundColor: '#0284c7', color: '#fff',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '4px',
                fontFamily: 'Nunito, sans-serif',
              }}
              onClick={() => onOpenDigitalPass(b)}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0369a1'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0284c7'}
            >
              <QrCode size={14} /> View Digital Pass
            </button>
          )}

          {b.isServiceShare && (
            <button
              style={{
                padding: '0.45rem 0.9rem', fontSize: '0.82rem', fontWeight: 700,
                borderRadius: '12px', backgroundColor: '#059669', color: '#fff',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '4px',
                fontFamily: 'Nunito, sans-serif',
              }}
              onClick={() => onOpenProofOfWork(b)}
            >
              <Camera size={14} /> Submit Task Proof
            </button>
          )}

          <button
            style={{
              padding: '0.45rem 0.9rem', fontSize: '0.82rem', fontWeight: 700,
              borderRadius: '12px', backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '4px',
              fontFamily: 'Nunito, sans-serif',
            }}
            onClick={onOpenMessaging}
          >
            <MessageSquare size={14} /> Message
          </button>
        </div>
      </div>
    </div>
  );
}

function BookingStatusBadge({ status }) {
  const config = {
    PENDING_HOST_APPROVAL: { color: '#fbbf24', bg: 'rgba(245,158,11,0.12)', label: '⏳ Pending Approval' },
    PASS_ACTIVE: { color: '#10b981', bg: 'rgba(16,185,129,0.12)', label: '✓ Pass Active' },
    CHECKED_IN: { color: '#38bdf8', bg: 'rgba(2,132,199,0.12)', label: '✓ Checked In' },
    CHECKED_OUT: { color: '#a5b4fc', bg: 'rgba(99,102,241,0.12)', label: '✓ Completed' },
    REJECTED: { color: '#f87171', bg: 'rgba(239,68,68,0.1)', label: '✕ Rejected' },
    CANCELLED: { color: '#f87171', bg: 'rgba(239,68,68,0.1)', label: '✕ Cancelled' },
    Confirmed: { color: '#10b981', bg: 'rgba(16,185,129,0.12)', label: '✓ Confirmed' },
    Pending: { color: '#fbbf24', bg: 'rgba(245,158,11,0.12)', label: '⏳ Pending' },
    Cancelled: { color: '#f87171', bg: 'rgba(239,68,68,0.1)', label: '✕ Cancelled' },
  };
  const cfg = config[status] || { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', label: status };
  return (
    <span style={{ padding: '0.2rem 0.65rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800, backgroundColor: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  );
}
