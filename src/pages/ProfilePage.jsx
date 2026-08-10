import React from 'react';
import { ShieldCheck, Star, Award, CreditCard, Settings, LogOut, CheckCircle } from 'lucide-react';

export default function ProfilePage({ user }) {
  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem', maxWidth: '720px' }}>
      {/* Profile Header Card */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1rem',
        position: 'relative'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" 
          alt="Anna Schmidt" 
          style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-primary)' }}
        />

        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900 }}>Anna Schmidt</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Digital Nomad & Verified Host • Joined Feb 2022</p>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="badge-verified" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
            <ShieldCheck size={16} /> ID Verified Host
          </span>
          <span className="badge-price" style={{ backgroundColor: 'var(--color-teal-light)', color: 'var(--color-teal)', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
            <Award size={16} /> Trust Passport Active
          </span>
        </div>
      </div>

      {/* Trust Passport Details Section */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginTop: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Traveler & Host Trust Passport</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Your Trust Passport allows your verified identity and 4.8 star reputation to travel seamlessly across any BedHopper node worldwide.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
            <CheckCircle size={18} color="var(--color-teal)" />
            <span>Govt ID Verified (Passport/Driver's License)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
            <CheckCircle size={18} color="var(--color-teal)" />
            <span>Phone & Email Verified</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
            <CheckCircle size={18} color="var(--color-teal)" />
            <span>Zero serious safety incidents logged</span>
          </div>
        </div>
      </div>

      {/* Settings Menu List */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        marginTop: '1.5rem',
        overflow: 'hidden'
      }}>
        {[
          { label: 'Payment & Payout Methods (Stripe)', icon: CreditCard },
          { label: 'Account Settings & Security', icon: Settings },
          { label: 'Log Out', icon: LogOut, danger: true }
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              style={{
                width: '100%',
                padding: '1rem 1.25rem',
                borderBottom: idx < 2 ? '1px solid var(--color-border)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: item.danger ? 'var(--color-red)' : 'var(--color-text-main)',
                fontSize: '0.95rem',
                fontWeight: 700
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Icon size={18} />
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
