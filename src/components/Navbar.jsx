import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { Globe, User, ShieldCheck, Heart, Sparkles, Building2, Cpu, Compass, ChevronDown, Menu, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, selectedCurrency, setSelectedCurrency }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        height: '76px'
      }}>
        {/* LEFT: Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <button 
            onClick={() => setActiveTab('landing')} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
          >
            <Logo size="medium" />
          </button>

          {/* CENTER: Desktop Web Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
            <button 
              onClick={() => setActiveTab('search')} 
              style={{ 
                color: activeTab === 'search' ? 'var(--color-primary)' : 'var(--color-text-main)',
                fontWeight: activeTab === 'search' ? 800 : 600,
                fontSize: '0.92rem',
                display: 'inline-flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                borderBottom: activeTab === 'search' ? '2px solid var(--color-primary)' : '2px solid transparent',
                padding: '0.4rem 0'
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
                gap: '5px',
                whiteSpace: 'nowrap',
                borderBottom: activeTab === 'hostel-partners' ? '2px solid var(--color-primary)' : '2px solid transparent',
                padding: '0.4rem 0'
              }}
            >
              <Building2 size={15} color="var(--color-teal)" />
              <span>Hostel Partners</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('service-share')} 
              style={{ 
                color: activeTab === 'service-share' ? 'var(--color-teal)' : 'var(--color-text-muted)',
                fontWeight: activeTab === 'service-share' ? 800 : 600,
                fontSize: '0.92rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap',
                borderBottom: activeTab === 'service-share' ? '2px solid var(--color-teal)' : '2px solid transparent',
                padding: '0.4rem 0'
              }}
            >
              <Heart size={15} color="var(--color-teal)" />
              <span>Service-Share</span>
            </button>

            <button 
              onClick={() => setActiveTab('protocol')} 
              style={{ 
                color: activeTab === 'protocol' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: activeTab === 'protocol' ? 800 : 600,
                fontSize: '0.92rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap',
                borderBottom: activeTab === 'protocol' ? '2px solid var(--color-primary)' : '2px solid transparent',
                padding: '0.4rem 0'
              }}
            >
              <Cpu size={15} color="var(--color-primary)" />
              <span>Open Protocol</span>
            </button>

            <button 
              onClick={() => setActiveTab('travel-guides')} 
              style={{ 
                color: activeTab === 'travel-guides' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: activeTab === 'travel-guides' ? 800 : 600,
                fontSize: '0.92rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap',
                borderBottom: activeTab === 'travel-guides' ? '2px solid var(--color-primary)' : '2px solid transparent',
                padding: '0.4rem 0'
              }}
            >
              <Compass size={15} color="var(--color-yellow)" />
              <span>Travel Guides</span>
            </button>
          </nav>
        </div>

        {/* RIGHT: Clean Utility Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Currency Selector Dropdown */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.88rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
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
                outline: 'none',
                fontSize: '0.88rem'
              }}
            >
              <option value="$">USD ($)</option>
              <option value="฿">THB (฿)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
              <option value="₹">INR (₹)</option>
              <option value="¥">JPY (¥)</option>
            </select>
          </div>

          {/* Become a Host Primary Button */}
          <button 
            className="btn-primary"
            onClick={() => setActiveTab('wizard')}
            style={{ 
              padding: '0.6rem 1.25rem', 
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles size={16} />
            <span>Become a Host</span>
          </button>

          {/* Combined User Menu Dropdown Button (Airbnb Style) */}
          <div style={{ position: 'relative' }} ref={menuRef}>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.45rem 0.85rem',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-pill)',
                backgroundColor: 'var(--color-surface)',
                boxShadow: showMenu ? 'var(--shadow-md)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              <Menu size={18} color="var(--color-text-muted)" />
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-teal)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 800
              }}>
                A
              </div>
            </button>

            {/* Dropdown Popup Menu */}
            {showMenu && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '220px',
                backgroundColor: 'var(--color-surface)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.15)',
                border: '1px solid var(--color-border)',
                padding: '0.5rem 0',
                zIndex: 2000,
                display: 'flex',
                flexDirection: 'column'
              }} className="animate-fade-in">
                <button 
                  onClick={() => { setActiveTab('profile'); setShowMenu(false); }}
                  style={{
                    padding: '0.7rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: 'var(--color-text-main)',
                    textAlign: 'left'
                  }}
                >
                  <User size={16} />
                  <span>My Profile & Trust Passport</span>
                </button>

                <button 
                  onClick={() => { setActiveTab('trips'); setShowMenu(false); }}
                  style={{
                    padding: '0.7rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: 'var(--color-text-main)',
                    textAlign: 'left'
                  }}
                >
                  <Compass size={16} />
                  <span>My Trips & Stays</span>
                </button>

                <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '0.35rem 0' }}></div>

                <button 
                  onClick={() => { setActiveTab('host-dashboard'); setShowMenu(false); }}
                  style={{
                    padding: '0.7rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    textAlign: 'left'
                  }}
                >
                  <Building2 size={16} />
                  <span>Host Dashboard</span>
                </button>

                <button 
                  onClick={() => { setActiveTab('admin'); setShowMenu(false); }}
                  style={{
                    padding: '0.7rem 1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    color: 'var(--color-teal)',
                    textAlign: 'left'
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>Admin Control Center</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
