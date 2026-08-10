import React, { useState } from 'react';
import { LayoutDashboard, List, Calendar, MessageSquare, DollarSign, Star, Plus, Edit, Check, X, ShieldCheck, Sparkles } from 'lucide-react';

export default function HostDashboard({ listings, bookings, onCreateNewListing, onOpenMessaging }) {
  const [activeTab, setActiveTab] = useState('overview');

  const hostListings = listings.filter(l => l.host?.id === 'host-anna' || l.host?.id === 'host-tom' || true);

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
            { id: 'bookings', label: 'Bookings & Requests', icon: Calendar },
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
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 800 : 600,
                  backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-main)',
                  textAlign: 'left'
                }}
              >
                <Icon size={18} color={isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
                <span>{item.label}</span>
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
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>Welcome back, Anna Schmidt! Manage your sleeping spaces and bookings.</p>
            </div>
            <button className="btn-primary" onClick={onCreateNewListing} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={18} />
              <span>Create New Listing</span>
            </button>
          </div>

          {/* Stats Bar Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
            <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 800 }}>EARNINGS THIS MONTH</span>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--color-teal)', fontWeight: 900, marginTop: '4px' }}>$120.00</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-green)', fontWeight: 700 }}>+12% from last month</span>
            </div>

            <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 800 }}>RESPONSE RATE</span>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--color-text-main)', fontWeight: 900, marginTop: '4px' }}>98%</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Average response 12m</span>
            </div>

            <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 800 }}>ACCEPTANCE RATE</span>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--color-text-main)', fontWeight: 900, marginTop: '4px' }}>95%</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>High host rank</span>
            </div>

            <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 800 }}>HOST RATING</span>
              <h3 style={{ fontSize: '1.6rem', color: 'var(--color-primary)', fontWeight: 900, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                4.8 <Star size={20} fill="var(--color-yellow)" color="var(--color-yellow)" />
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>23 guest reviews</span>
            </div>
          </div>

          {/* Active Listings Section */}
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
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className="badge-verified"><ShieldCheck size={13} /> Active</span>
                    <button className="btn-outline" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Edit size={14} /> Edit Listing
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Bookings Queue */}
          <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Upcoming Booking Requests</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {bookings.map(b => (
                <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', flexWrap: 'wrap', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <img src={b.guestAvatar} alt={b.guestName} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 800 }}>{b.guestName}</h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                        {b.listingTitle} • {b.checkIn} to {b.checkOut} ({b.guests} guest)
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      padding: '0.25rem 0.6rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      backgroundColor: b.status === 'Confirmed' ? 'var(--color-teal-light)' : 'var(--color-yellow-light)',
                      color: b.status === 'Confirmed' ? 'var(--color-teal)' : '#D97706'
                    }}>
                      {b.status}
                    </span>

                    <button className="btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }} onClick={onOpenMessaging}>
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
