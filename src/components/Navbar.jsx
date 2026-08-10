import React from 'react';
import Logo from './Logo';
import { Globe, User, ShieldCheck, Heart, Sparkles, Building2, Cpu, Compass } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, selectedCurrency, setSelectedCurrency }) {
  return (
    <header style={{
      backgroundColor: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '72px'
      }}>
        {/* Brand Logo */}
        <button 
          onClick={() => setActiveTab('landing')} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
        >
          <Logo size="medium" />
        </button>

        {/* Desktop Web Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
          <button 
            onClick={() => setActiveTab('search')} 
            style={{ 
              color: activeTab === 'search' ? 'var(--color-primary)' : 'var(--color-text-main)',
              fontWeight: activeTab === 'search' ? 800 : 600,
              fontSize: '0.92rem',
              display: 'inline-flex',
              alignItems: 'center',
              whiteSpace: 'nowrap'
            }}
          >
            Explore Stays
          </button>

          <button 
            onClick={() => setActiveTab('hostel-partners')} 
            style={{ 
              color: activeTab === 'hostel-partners' ? 'var(--color-primary)' : 'var(--color-text-main)',
              fontWeight: activeTab === 'hostel-partners' ? 800 : 600,
              fontSize: '0.92rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Building2 size={16} color="var(--color-teal)" />
            <span>Hostel Partners</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('service-share')} 
            style={{ 
              color: activeTab === 'service-share' ? 'var(--color-teal)' : 'var(--color-text-muted)',
              fontWeight: 600,
              fontSize: '0.92rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Heart size={16} color="var(--color-teal)" />
            <span>Service-Share</span>
          </button>

          <button 
            onClick={() => setActiveTab('protocol')} 
            style={{ 
              color: activeTab === 'protocol' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontWeight: 600,
              fontSize: '0.92rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Cpu size={16} color="var(--color-primary)" />
            <span>Open Protocol</span>
          </button>

          <button 
            onClick={() => setActiveTab('travel-guides')} 
            style={{ 
              color: activeTab === 'travel-guides' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontWeight: 600,
              fontSize: '0.92rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Compass size={16} color="var(--color-yellow)" />
            <span>Travel Guides</span>
          </button>
        </nav>

        {/* Right Utility Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Currency Selector */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            <Globe size={16} />
            <select 
              value={selectedCurrency} 
              onChange={(e) => setSelectedCurrency(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                fontWeight: 700,
                color: 'var(--color-text-main)',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="$">USD ($)</option>
              <option value="฿">THB (฿)</option>
              <option value="€">EUR (€)</option>
            </select>
          </div>

          {/* Become a Host CTA */}
          <button 
            className="btn-primary"
            onClick={() => setActiveTab('wizard')}
            style={{ 
              padding: '0.55rem 1.1rem', 
              fontSize: '0.88rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles size={15} />
            <span>Become a Host</span>
          </button>

          {/* Portal Switcher Pill */}
          <div style={{ 
            backgroundColor: 'var(--color-bg)', 
            borderRadius: 'var(--radius-pill)', 
            padding: '3px', 
            border: '1px solid var(--color-border)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            <button 
              onClick={() => setActiveTab('host-dashboard')}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.78rem',
                fontWeight: 700,
                backgroundColor: activeTab === 'host-dashboard' ? 'var(--color-primary)' : 'transparent',
                color: activeTab === 'host-dashboard' ? '#FFFFFF' : 'var(--color-text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <Building2 size={13} />
              <span>Host Panel</span>
            </button>

            <button 
              onClick={() => setActiveTab('admin')}
              style={{
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.78rem',
                fontWeight: 700,
                backgroundColor: activeTab === 'admin' ? 'var(--color-teal)' : 'transparent',
                color: activeTab === 'admin' ? '#FFFFFF' : 'var(--color-text-muted)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              <ShieldCheck size={13} />
              <span>Admin</span>
            </button>
          </div>

          {/* User Profile Trigger */}
          <button 
            onClick={() => setActiveTab('profile')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.4rem 0.8rem',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-pill)',
              backgroundColor: 'var(--color-surface)',
              whiteSpace: 'nowrap'
            }}
          >
            <User size={18} color="var(--color-text-muted)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}
