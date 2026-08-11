import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { Globe, User, ShieldCheck, Heart, Sparkles, Building2, Cpu, Compass, Menu, LogOut, Briefcase, Sun, Moon, Flame } from 'lucide-react';
import { CURRENCIES } from '../utils/currency';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  selectedCurrency = 'USD', 
  setSelectedCurrency,
  currentUser,
  onOpenAuth,
  onLogout,
  theme = 'dark',
  onToggleTheme,
  onRefreshHome
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  const handleFlashDealsClick = () => {
    if (activeTab !== 'landing') {
      setActiveTab('landing');
      setTimeout(() => {
        document.getElementById('flash-deals')?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      document.getElementById('flash-deals')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header style={{
      backgroundColor: 'var(--color-header-bg)',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: 'var(--shadow-sm)',
      color: 'var(--color-text-main)',
      transition: 'background-color 0.3s, border-color 0.3s'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px'
      }}>
        {/* LEFT: Brand Logo & Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <button 
            onClick={onRefreshHome || (() => setActiveTab('landing'))} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
            title="hopabed.com Home"
          >
            <Logo size="medium" />
          </button>

          {/* Clean Navigation Bar */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
            <button 
              onClick={() => setActiveTab('search')} 
              style={{ 
                color: activeTab === 'search' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: activeTab === 'search' ? 800 : 600,
                fontSize: '0.9rem',
                borderBottom: activeTab === 'search' ? '2px solid var(--color-primary)' : '2px solid transparent',
                padding: '0.4rem 0',
                background: 'none', border: 'none', cursor: 'pointer'
              }}
            >
              Explore Stays
            </button>

            <button 
              onClick={handleFlashDealsClick} 
              style={{ 
                color: '#ef4444',
                fontWeight: 800,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                borderBottom: '2px solid transparent',
                padding: '0.4rem 0',
                background: 'none', border: 'none', cursor: 'pointer'
              }}
            >
              <Flame size={16} color="#ef4444" />
              <span>Flash Deals</span>
            </button>

            <button 
              onClick={() => setActiveTab('hostel-partners')} 
              style={{ 
                color: activeTab === 'hostel-partners' ? 'var(--color-accent)' : 'var(--color-text-muted)',
                fontWeight: activeTab === 'hostel-partners' ? 800 : 600,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                borderBottom: activeTab === 'hostel-partners' ? '2px solid var(--color-accent)' : '2px solid transparent',
                padding: '0.4rem 0',
                background: 'none', border: 'none', cursor: 'pointer'
              }}
            >
              <Building2 size={15} color="var(--color-accent)" />
              <span>Hostel Partners</span>
            </button>

            <button 
              onClick={() => setActiveTab('travel-guides')} 
              style={{ 
                color: activeTab === 'travel-guides' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: activeTab === 'travel-guides' ? 800 : 600,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                borderBottom: activeTab === 'travel-guides' ? '2px solid var(--color-primary)' : '2px solid transparent',
                padding: '0.4rem 0',
                background: 'none', border: 'none', cursor: 'pointer'
              }}
            >
              <Compass size={15} color="var(--color-primary)" />
              <span>Travel Guides</span>
            </button>
          </nav>
        </div>

        {/* RIGHT: Theme Switcher, Currency & Auth Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

          {/* Theme Toggle Button (Light ☀️ / Dark 🌙) */}
          <button
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: theme === 'dark' ? '#fbbf24' : '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Multi-Currency Dropdown */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            <Globe size={15} />
            <select 
              value={selectedCurrency} 
              onChange={(e) => setSelectedCurrency(e.target.value)}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                backgroundColor: 'var(--color-surface)',
                fontWeight: 700,
                color: 'var(--color-text-main)',
                cursor: 'pointer',
                outline: 'none',
                fontSize: '0.82rem',
                padding: '5px 8px'
              }}
            >
              {Object.keys(CURRENCIES).map(code => (
                <option key={code} value={code}>
                  {CURRENCIES[code].flag} {code} ({CURRENCIES[code].symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Host Button */}
          <button 
            onClick={() => setActiveTab('wizard')}
            style={{ 
              padding: '0.5rem 1rem', 
              fontSize: '0.85rem',
              fontWeight: 800,
              borderRadius: '14px',
              backgroundColor: 'var(--color-teal)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={15} />
            <span>Host</span>
          </button>

          {/* Log In / User Menu Button */}
          {!currentUser ? (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => onOpenAuth('login')}
                style={{
                  padding: '0.5rem 1.1rem',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  borderRadius: '12px',
                  backgroundColor: 'var(--color-accent)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Log In
              </button>
            </div>
          ) : (
            <div style={{ position: 'relative' }} ref={userMenuRef}>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0.35rem 0.7rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '24px',
                  backgroundColor: 'var(--color-surface)',
                  cursor: 'pointer'
                }}
              >
                <Menu size={18} color="var(--color-text-muted)" />
                <img 
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'} 
                  alt={currentUser.name} 
                  style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                />
              </button>

              {/* Dropdown Popup Menu */}
              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '240px',
                  backgroundColor: 'var(--color-surface)',
                  borderRadius: '16px',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid var(--color-border)',
                  padding: '0.5rem 0',
                  zIndex: 2000,
                  display: 'flex',
                  flexDirection: 'column',
                  color: 'var(--color-text-main)'
                }}>
                  <div style={{ padding: '0.65rem 1.25rem', borderBottom: '1px solid var(--color-border)' }}>
                    <strong style={{ fontSize: '0.92rem', color: 'var(--color-text-main)' }}>{currentUser.name}</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-green)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <ShieldCheck size={13} /> Trust Passport Active
                    </div>
                  </div>

                  <button 
                    onClick={() => { setActiveTab('trips'); setShowUserMenu(false); }}
                    style={{ padding: '0.65rem 1.25rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', fontWeight: 700, textAlign: 'left', backgroundColor: 'transparent', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer' }}
                  >
                    <Compass size={16} />
                    <span>My Trips & Pass</span>
                  </button>

                  <button 
                    onClick={() => { setActiveTab('profile'); setShowUserMenu(false); }}
                    style={{ padding: '0.65rem 1.25rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', fontWeight: 700, textAlign: 'left', backgroundColor: 'transparent', border: 'none', color: 'var(--color-text-main)', cursor: 'pointer' }}
                  >
                    <User size={16} />
                    <span>My Profile</span>
                  </button>

                  <button 
                    onClick={() => { setActiveTab('host-dashboard'); setShowUserMenu(false); }}
                    style={{ padding: '0.65rem 1.25rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-accent)', textAlign: 'left', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    <Building2 size={16} />
                    <span>Host Dashboard</span>
                  </button>

                  <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '0.35rem 0' }}></div>

                  <button 
                    onClick={() => { onLogout(); setShowUserMenu(false); }}
                    style={{ padding: '0.65rem 1.25rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-red)', textAlign: 'left', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
