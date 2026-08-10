import React from 'react';
import { Building2, DollarSign, CheckCircle, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import HostCalculator from '../components/HostCalculator';

export default function HostelPartnersPage({ onNavigate }) {
  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Hero Banner */}
      <section style={{
        backgroundColor: 'var(--color-teal)',
        color: '#FFFFFF',
        padding: '4rem 1.5rem',
        backgroundImage: 'linear-gradient(rgba(45, 106, 79, 0.9), rgba(45, 106, 79, 0.95)), url("https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="container" style={{ textIndent: 0, textAlign: 'center', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <span className="badge-price" style={{ margin: '0 auto', backgroundColor: 'var(--color-yellow)', color: 'var(--color-text-main)' }}>
            For Commercial Hostels & Guesthouses
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', fontWeight: 900 }}>
            Monetize Unsold Beds & Last-Minute Capacity
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#E8F5E9', lineHeight: 1.6 }}>
            Fill empty dorm beds with budget backpackers and digital nomads. Pay zero booking commission. Unlimited listings for a flat $20/month subscription.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
            <button className="btn-primary" onClick={() => onNavigate('wizard')}>
              <span>Register Your Property</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Host Earnings Calculator */}
      <section className="container" style={{ paddingTop: '3.5rem' }}>
        <HostCalculator onStartHosting={() => onNavigate('wizard')} />
      </section>

      {/* Benefits */}
      <section className="container" style={{ paddingTop: '3.5rem' }}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '2.5rem' }}>Why Commercial Hostels Partner With BedHopper</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <DollarSign size={32} color="var(--color-teal)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Zero Per-Booking Commission</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Unlike OTAs charging 15-25% per reservation, BedHopper never takes a cut of your nightly room rate. You keep 100% of guest payments.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <TrendingUp size={32} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Fill Last-Minute Unsold Capacity</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Turn otherwise empty dorm beds into incremental revenue by reaching high-intent budget travelers actively looking for low-cost stays.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <ShieldCheck size={32} color="#D97706" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Verified Travelers Only</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Every traveler on BedHopper undergoes phone/email verification or holds a Trust Passport, ensuring accountable, respectful guests for your property.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
