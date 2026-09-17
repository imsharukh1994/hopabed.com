import React, { useState } from 'react';
import { LayoutDashboard, List, Calendar, MessageSquare, DollarSign, Star, Plus, Edit, Check, X, ShieldCheck, Sparkles, QrCode, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { approveBookingAndGeneratePass, rejectBooking } from '../services/passService';

export default function HostDashboard({ listings, bookings, onCreateNewListing, onOpenMessaging, currentUser, onBookingApproved, onBookingRejected }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [localBookings, setLocalBookings] = useState(bookings);
  const [approvalLoading, setApprovalLoading] = useState({});
  const [actionMessages, setActionMessages] = useState({});

  const hostListings = listings.filter(() => true);

  const pendingBookings = localBookings.filter(b =>
    b.bookingStatus === 'PENDING_HOST_APPROVAL' || b.status === 'Pending'
  );

  const activeBookings = localBookings.filter(b =>
    b.bookingStatus === 'PASS_ACTIVE' ||
    b.bookingStatus === 'CHECKED_IN' ||
    b.status === 'Confirmed'
  );

  async function handleApprove(booking) {
    setApprovalLoading(prev => ({ ...prev, [booking.id]: 'approving' }));
    setActionMessages(prev => ({ ...prev, [booking.id]: null }));

    try {
      const listing = listings.find(l => l.id === booking.listingId) || null;
      const guest = { id: booking.guestId || booking.id, name: booking.guestName };
      const host = currentUser || { id: 'host', name: booking.hostName || 'Host' };

      const { pass } = await approveBookingAndGeneratePass(booking, listing, guest, host);

      const updated = localBookings.map(b =>
        b.id === booking.id
          ? {
              ...b,
              bookingStatus: 'PASS_ACTIVE',
              status: 'Confirmed',
              nodeCode: pass.nodeCode,
              digitalPass: pass,
              passCode: pass.passCode,
              qrToken: pass.qrToken,
            }
          : b
      );
      setLocalBookings(updated);
      setActionMessages(prev => ({ ...prev, [booking.id]: { type: 'success', text: `✓ Pass generated: ${pass.passCode}` } }));

      // Propagate to App state
      if (onBookingApproved) {
        onBookingApproved(booking.id, pass);
      }
    } catch (err) {
      setActionMessages(prev => ({ ...prev, [booking.id]: { type: 'error', text: 'Failed to approve booking.' } }));
    } finally {
      setApprovalLoading(prev => ({ ...prev, [booking.id]: null }));
    }
  }

  async function handleReject(booking) {
    setApprovalLoading(prev => ({ ...prev, [booking.id]: 'rejecting' }));
    try {
      await rejectBooking(booking.id, currentUser?.id);
      const updated = localBookings.map(b =>
        b.id === booking.id ? { ...b, bookingStatus: 'REJECTED', status: 'Cancelled' } : b
      );
      setLocalBookings(updated);
      if (onBookingRejected) onBookingRejected(booking.id);
    } catch {
      /* non-critical */
    } finally {
      setApprovalLoading(prev => ({ ...prev, [booking.id]: null }));
    }
  }

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem' }} className="dashboard-layout">
        {/* Sidebar Nav */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 0.75rem',
          border: '1px solid var(--color-border)',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem'
        }}>
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'listings', label: 'Your Listings', icon: List },
            { id: 'bookings', label: 'Bookings & Requests', icon: Calendar, badge: pendingBookings.length },
            { id: 'messages', label: 'Guest Messages', icon: MessageSquare },
            { id: 'earnings', label: 'Earnings & Payouts', icon: DollarSign }
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9rem', fontWeight: isActive ? 800 : 600,
                  backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
                  textAlign: 'left', position: 'relative',
                  fontFamily: 'Nunito, sans-serif',
                }}
              >
                <Icon size={18} color={isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span style={{
                    marginLeft: 'auto', minWidth: '20px', height: '20px',
                    backgroundColor: '#ef4444', color: '#fff',
                    borderRadius: '10px', fontSize: '11px', fontWeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Dashboard Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Host Dashboard</h1>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
                Welcome back, {currentUser?.name || 'Host'}! Manage your sleeping spaces and bookings.
              </p>
            </div>
            <button className="btn-primary" onClick={onCreateNewListing} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={18} /><span>Create New Listing</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
            <StatCard label="EARNINGS THIS MONTH" value="$120.00" color="var(--color-teal)" sub="+12% from last month" subColor="var(--color-green)" />
            <StatCard label="PENDING BOOKINGS" value={String(pendingBookings.length)} color="var(--color-primary)" sub="Need your approval" />
            <StatCard label="ACTIVE STAYS" value={String(activeBookings.length)} color="var(--color-text-main)" sub="Current guests" />
            <StatCard label="HOST RATING" value="4.8 ⭐" color="var(--color-primary)" sub="23 guest reviews" />
          </div>

          {/* Pending Approval Queue */}
          {pendingBookings.length > 0 && (
            <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid rgba(245,158,11,0.2)', boxShadow: '0 0 0 1px rgba(245,158,11,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
                <Clock size={20} color="#fbbf24" />
                <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', margin: 0 }}>
                  Pending Approval ({pendingBookings.length})
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 600 }}>— Approve to auto-generate digital pass</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pendingBookings.map(b => {
                  const isApproving = approvalLoading[b.id] === 'approving';
                  const isRejecting = approvalLoading[b.id] === 'rejecting';
                  const msg = actionMessages[b.id];

                  return (
                    <div key={b.id} style={{
                      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                      padding: '1rem 1.1rem',
                      backgroundColor: 'var(--color-bg)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      flexWrap: 'wrap', gap: '1rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img
                          src={b.guestAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                          alt={b.guestName}
                          style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                        />
                        <div>
                          <h4 style={{ fontSize: '0.98rem', fontWeight: 800, margin: 0 }}>{b.guestName}</h4>
                          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: '2px 0' }}>
                            {b.listingTitle} • {b.checkIn} → {b.checkOut}
                          </p>
                          {msg && (
                            <p style={{ fontSize: '12px', color: msg.type === 'success' ? '#10b981' : '#ef4444', margin: '3px 0 0', fontWeight: 700 }}>
                              {msg.text}
                            </p>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                        <button
                          onClick={() => handleApprove(b)}
                          disabled={isApproving || isRejecting}
                          style={{
                            padding: '0.4rem 0.9rem', borderRadius: '12px',
                            backgroundColor: isApproving ? 'rgba(16,185,129,0.3)' : '#10b981',
                            color: '#fff', border: 'none', fontSize: '0.85rem', fontWeight: 800,
                            cursor: isApproving || isRejecting ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', gap: '5px',
                            opacity: isApproving || isRejecting ? 0.7 : 1,
                            fontFamily: 'Nunito, sans-serif',
                          }}
                        >
                          {isApproving ? <SpinIcon /> : <Check size={14} />}
                          {isApproving ? 'Generating Pass…' : 'Approve & Generate Pass'}
                        </button>
                        <button
                          onClick={() => handleReject(b)}
                          disabled={isApproving || isRejecting}
                          style={{
                            padding: '0.4rem 0.75rem', borderRadius: '12px',
                            backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444',
                            border: '1px solid rgba(239,68,68,0.2)', fontSize: '0.85rem', fontWeight: 800,
                            cursor: isApproving || isRejecting ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', gap: '5px',
                            fontFamily: 'Nunito, sans-serif',
                          }}
                        >
                          {isRejecting ? <SpinIcon color="#ef4444" /> : <X size={14} />}
                          Reject
                        </button>
                        <button className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }} onClick={onOpenMessaging}>
                          Message
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Listings */}
          <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.2rem' }}>Your Active Listings ({hostListings.length})</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {hostListings.map(listing => (
                <div key={listing.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={listing.images[0]} alt={listing.title} style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>{listing.title}</h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                        {listing.isServiceShare ? 'Free Stay (Service-Share)' : `${listing.currency}${listing.pricePerNight} / night`} • {listing.city}
                      </p>
                      {listing.nodeCode && (
                        <p style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--color-text-light)', fontWeight: 700, marginTop: '2px' }}>
                          Node: {listing.nodeCode}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: 800, backgroundColor: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <ShieldCheck size={13} /> Active
                    </span>
                    <button className="btn-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Edit size={14} /> Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Confirmed Bookings Queue */}
          <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Confirmed Bookings & Active Guests</h3>

            {activeBookings.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>No active confirmed bookings.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {activeBookings.map(b => (
                  <div key={b.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '1rem', backgroundColor: 'var(--color-bg)',
                    borderRadius: 'var(--radius-sm)', flexWrap: 'wrap', gap: '1rem',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img
                        src={b.guestAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                        alt={b.guestName}
                        style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <h4 style={{ fontSize: '0.98rem', fontWeight: 800 }}>{b.guestName}</h4>
                        <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                          {b.listingTitle} • {b.checkIn} → {b.checkOut}
                        </p>
                        {b.nodeCode && (
                          <p style={{ fontSize: '11px', fontFamily: 'monospace', color: 'var(--color-text-light)', fontWeight: 700 }}>
                            Node: {b.nodeCode} {b.passCode && `• ${b.passCode}`}
                          </p>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-pill)',
                        fontSize: '0.78rem', fontWeight: 800,
                        backgroundColor: b.bookingStatus === 'CHECKED_IN' ? 'rgba(2,132,199,0.15)' : 'rgba(13,148,136,0.15)',
                        color: b.bookingStatus === 'CHECKED_IN' ? '#38bdf8' : 'var(--color-teal)',
                      }}>
                        {b.bookingStatus === 'CHECKED_IN' ? '✓ Checked In' : '✓ Pass Active'}
                      </span>
                      <button className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }} onClick={onOpenMessaging}>
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function StatCard({ label, value, color, sub, subColor }) {
  return (
    <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 800 }}>{label}</span>
      <h3 style={{ fontSize: '1.6rem', color, fontWeight: 900, marginTop: '4px' }}>{value}</h3>
      <span style={{ fontSize: '0.75rem', color: subColor || 'var(--color-text-muted)', fontWeight: 700 }}>{sub}</span>
    </div>
  );
}

function SpinIcon({ color = '#fff' }) {
  return <div style={{ width: 14, height: 14, border: `2px solid ${color}44`, borderTopColor: color, borderRadius: '50%', animation: 'spin 0.7s linear infinite', flexShrink: 0 }} />;
}
