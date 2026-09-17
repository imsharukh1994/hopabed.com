import React, { useState, useEffect } from 'react';
import { Wallet, Calendar, MapPin, ChevronRight, Clock, CheckCircle2, XCircle, AlertCircle, QrCode, RefreshCw } from 'lucide-react';
import { getMyPasses, cachePassOffline, formatPassDate, getPassStatusColor } from '../services/passService';
import { getAllCachedPasses } from '../services/passService';

export default function MyPassesPage({ currentUser, bookings = [], onOpenDigitalPass, onNavigate }) {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | active | past

  useEffect(() => {
    loadPasses();
  }, [currentUser]);

  async function loadPasses() {
    setLoading(true);
    try {
      // Try cloud first, fall back to cached local passes + synthetic from bookings
      let cloudPasses = [];
      if (currentUser?.id) {
        cloudPasses = await getMyPasses(currentUser.id);
      }

      if (cloudPasses.length > 0) {
        setPasses(cloudPasses);
      } else {
        // Build passes from bookings that have digital passes
        const bookingPasses = bookings
          .filter(b => b.digitalPass || b.passCode || b.bookingStatus === 'PASS_ACTIVE' || b.bookingStatus === 'CHECKED_IN')
          .map(b => ({
            passCode: b.passCode || b.digitalPass?.passCode || `BH-PASS-${(b.id || '').substring(0, 8).toUpperCase()}`,
            passHash: b.digitalPass?.passHash || '—',
            qrToken: b.qrToken || b.digitalPass?.qrToken || b.id,
            nodeCode: b.nodeCode || b.digitalPass?.nodeCode || 'BH-DEMO01',
            guestName: b.guestName || currentUser?.name,
            hostName: b.hostName,
            propertyName: b.listingTitle,
            checkIn: b.checkIn,
            checkOut: b.checkOut,
            status: b.bookingStatus === 'CHECKED_IN' ? 'CHECKED_IN' :
                    b.bookingStatus === 'CHECKED_OUT' ? 'CHECKED_OUT' :
                    b.bookingStatus === 'CANCELLED' ? 'CANCELLED' : 'ACTIVE',
            issuedAt: b.createdDate || b.digitalPass?.issuedAt,
            bookingId: b.id,
            _booking: b,
          }));

        // Merge with locally cached passes
        const cachedPasses = getAllCachedPasses();
        const merged = [...bookingPasses];
        cachedPasses.forEach(cp => {
          if (!merged.find(p => p.passCode === cp.passCode)) {
            merged.push(cp);
          }
        });

        setPasses(merged);
      }
    } catch (err) {
      console.warn('Error loading passes:', err);
      setPasses([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredPasses = passes.filter(p => {
    if (filter === 'active') return p.status === 'ACTIVE' || p.status === 'CHECKED_IN';
    if (filter === 'past') return p.status === 'CHECKED_OUT' || p.status === 'CANCELLED' || p.status === 'EXPIRED';
    return true;
  });

  const activeCount = passes.filter(p => p.status === 'ACTIVE' || p.status === 'CHECKED_IN').length;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '5rem', maxWidth: '820px' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
          <div style={{
            width: '48px', height: '48px',
            background: 'linear-gradient(135deg, #0284c7, #0d9488)',
            borderRadius: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Wallet size={24} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 900, color: 'var(--color-text-main)', margin: 0 }}>
              My Digital Passes
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Your BedHopper offline check-in wallet passes
            </p>
          </div>
        </div>

        {activeCount > 0 && (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            backgroundColor: 'rgba(16,185,129,0.12)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: '20px',
            fontSize: '13px',
            color: '#10b981',
            fontWeight: 800,
            marginTop: '0.75rem',
          }}>
            <CheckCircle2 size={14} />
            {activeCount} Active {activeCount === 1 ? 'Pass' : 'Passes'}
          </div>
        )}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0' }}>
        {[
          { id: 'all', label: `All (${passes.length})` },
          { id: 'active', label: `Active (${passes.filter(p => p.status === 'ACTIVE' || p.status === 'CHECKED_IN').length})` },
          { id: 'past', label: `Past (${passes.filter(p => ['CHECKED_OUT','CANCELLED','EXPIRED'].includes(p.status)).length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            style={{
              padding: '0.6rem 1.1rem',
              fontWeight: 800,
              fontSize: '0.88rem',
              borderBottom: filter === tab.id ? '2px solid var(--color-accent)' : '2px solid transparent',
              color: filter === tab.id ? 'var(--color-accent)' : 'var(--color-text-muted)',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: filter === tab.id ? '2px solid #0284c7' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'Nunito, sans-serif',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pass cards */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[1, 2].map(i => (
            <div key={i} style={{
              height: '120px',
              backgroundColor: 'var(--color-surface)',
              borderRadius: '20px',
              border: '1px solid var(--color-border)',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
          ))}
        </div>
      ) : filteredPasses.length === 0 ? (
        <EmptyState filter={filter} onNavigate={onNavigate} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredPasses.map((pass, idx) => (
            <PassCard
              key={pass.passCode || idx}
              pass={pass}
              onView={() => {
                // Find the matching booking to open the pass modal
                const matchingBooking = bookings.find(b =>
                  b.id === pass.bookingId ||
                  b.passCode === pass.passCode ||
                  b.digitalPass?.passCode === pass.passCode
                ) || pass._booking || {
                  id: pass.bookingId,
                  listingTitle: pass.propertyName,
                  hostName: pass.hostName,
                  guestName: pass.guestName,
                  checkIn: pass.checkIn,
                  checkOut: pass.checkOut,
                  bookingStatus: pass.status === 'ACTIVE' ? 'PASS_ACTIVE' : pass.status,
                  passCode: pass.passCode,
                  nodeCode: pass.nodeCode,
                  qrToken: pass.qrToken,
                  digitalPass: pass,
                };
                onOpenDigitalPass(matchingBooking);
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}

function PassCard({ pass, onView }) {
  const [hovered, setHovered] = useState(false);
  const statusColor = getPassStatusColor(pass.status);

  const statusLabel = {
    ACTIVE: '✓ Active',
    CHECKED_IN: '✓ Checked In',
    CHECKED_OUT: '✓ Completed',
    CANCELLED: '✕ Cancelled',
    EXPIRED: '✕ Expired',
  }[pass.status] || pass.status;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '20px',
        border: `1px solid ${hovered ? 'var(--color-border-dark)' : 'var(--color-border)'}`,
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap',
        transition: 'all 0.25s',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {/* Left: icon + info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{
          width: '56px', height: '56px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #0284c7, #0d9488)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <QrCode size={26} color="#fff" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            BedHopper Digital Pass
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--color-text-main)', fontFamily: 'Nunito, sans-serif' }}>
            {pass.propertyName || 'Stay Pass'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--color-text-muted)' }}>
            <Calendar size={12} />
            <span style={{ fontWeight: 700 }}>
              {formatPassDate(pass.checkIn)} → {formatPassDate(pass.checkOut)}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 800,
              color: statusColor,
              backgroundColor: `${statusColor}18`,
              padding: '2px 8px',
              borderRadius: '10px',
            }}>
              {statusLabel}
            </span>
            <span style={{ fontSize: '10px', fontFamily: 'monospace', color: 'var(--color-text-light)', fontWeight: 700 }}>
              {pass.nodeCode}
            </span>
          </div>
        </div>
      </div>

      {/* Right: View button */}
      <button
        onClick={onView}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0284c7',
          color: '#fff',
          border: 'none',
          borderRadius: '14px',
          fontSize: '13px',
          fontWeight: 800,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          transition: 'all 0.2s',
          fontFamily: 'Nunito, sans-serif',
          flexShrink: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0369a1'}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = '#0284c7'}
      >
        View Pass <ChevronRight size={15} />
      </button>
    </div>
  );
}

function EmptyState({ filter, onNavigate }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '4rem 2rem',
      backgroundColor: 'var(--color-surface)',
      borderRadius: '20px',
      border: '1px solid var(--color-border)',
    }}>
      <div style={{
        width: '72px', height: '72px',
        background: 'linear-gradient(135deg, rgba(2,132,199,0.15), rgba(13,148,136,0.15))',
        borderRadius: '20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1.25rem',
      }}>
        <Wallet size={36} color="#0284c7" />
      </div>
      <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
        {filter === 'active' ? 'No active passes' : filter === 'past' ? 'No past passes' : 'No digital passes yet'}
      </h3>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '320px', margin: '0 auto 1.5rem' }}>
        {filter === 'all'
          ? 'Once a host approves your booking, your digital wallet pass will appear here.'
          : 'No passes found for this filter.'}
      </p>
      {filter === 'all' && onNavigate && (
        <button
          onClick={() => onNavigate('search')}
          className="btn-primary"
          style={{ fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          Explore Stays
        </button>
      )}
    </div>
  );
}
