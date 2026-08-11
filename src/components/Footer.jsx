import React from 'react';
import Logo from './Logo';
import { Globe, Heart, ShieldCheck, Github, Twitter, Mail, ArrowRight } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer style={{
      backgroundColor: '#0F172A',
      color: '#94A3B8',
      paddingTop: '4rem',
      paddingBottom: '2.5rem',
      borderTop: '1px solid #1E293B',
      marginTop: 'auto'
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {/* Top Newsletter & Brand Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', borderBottom: '1px solid #1E293B', paddingBottom: '2.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Logo size="medium" textColor="#FFFFFF" />
            <p style={{ fontSize: '0.92rem', color: '#94A3B8', lineHeight: 1.6, maxWidth: '380px' }}>
              hopabed.com is the open-source, ultra-low-cost accommodation protocol. Connecting budget travelers with verified couches, dorms, and service-share stays worldwide.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <a href="https://github.com/imsharukh1994/bedhopper" target="_blank" rel="noreferrer" style={{ color: '#F8FAFC', backgroundColor: '#1E293B', padding: '0.5rem', borderRadius: '50%' }}>
                <Github size={18} />
              </a>
              <a href="#" style={{ color: '#F8FAFC', backgroundColor: '#1E293B', padding: '0.5rem', borderRadius: '50%' }}>
                <Twitter size={18} />
              </a>
              <a href="#" style={{ color: '#F8FAFC', backgroundColor: '#1E293B', padding: '0.5rem', borderRadius: '50%' }}>
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription Box */}
          <div style={{ backgroundColor: '#1E293B', padding: '1.75rem', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ color: '#F8FAFC', fontSize: '1.1rem', fontWeight: 800 }}>Subscribe to Extreme-Budget Stays</h4>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>Get weekly alerts on $1–$5/night stays and new pilot city node launches on hopabed.com.</p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to hopabed.com alerts!'); }} style={{ display: 'flex', gap: '8px', marginTop: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required 
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid #334155',
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}>
                Join <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* 4 Column Navigation Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem' }}>
          {/* Col 1: Stays */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ color: '#F8FAFC', fontSize: '0.95rem', fontWeight: 800 }}>Explore Stays</h4>
            <button onClick={() => onNavigate('search')} style={{ textIndent: 0, textAlign: 'left', color: '#94A3B8', fontSize: '0.88rem' }}>Bangkok Beds ($2/night)</button>
            <button onClick={() => onNavigate('search')} style={{ textIndent: 0, textAlign: 'left', color: '#94A3B8', fontSize: '0.88rem' }}>Mexico City Stays ($5/night)</button>
            <button onClick={() => onNavigate('search')} style={{ textIndent: 0, textAlign: 'left', color: '#94A3B8', fontSize: '0.88rem' }}>Lisbon Backpackers ($4/night)</button>
            <button onClick={() => onNavigate('search')} style={{ textIndent: 0, textAlign: 'left', color: '#94A3B8', fontSize: '0.88rem' }}>Verified Backpacker Stays</button>
          </div>

          {/* Col 2: For Hosts & Hostels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ color: '#F8FAFC', fontSize: '0.95rem', fontWeight: 800 }}>Hosts & Hostels</h4>
            <button onClick={() => onNavigate('wizard')} style={{ textIndent: 0, textAlign: 'left', color: '#94A3B8', fontSize: '0.88rem' }}>Become a Bed Host</button>
            <button onClick={() => onNavigate('hostel-partners')} style={{ textIndent: 0, textAlign: 'left', color: '#94A3B8', fontSize: '0.88rem' }}>Commercial Hostel Portal</button>
            <button onClick={() => onNavigate('host-dashboard')} style={{ textIndent: 0, textAlign: 'left', color: '#94A3B8', fontSize: '0.88rem' }}>Host Dashboard</button>
            <button onClick={() => onNavigate('search')} style={{ textIndent: 0, textAlign: 'left', color: '#94A3B8', fontSize: '0.88rem' }}>Extreme-Budget Guarantee</button>
          </div>

          {/* Col 3: Travel Guides & Perks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ color: '#F8FAFC', fontSize: '0.95rem', fontWeight: 800 }}>Community & Guides</h4>
            <button onClick={() => onNavigate('travel-guides')} style={{ textIndent: 0, textAlign: 'left', color: '#94A3B8', fontSize: '0.88rem' }}>Budget Travel Guides</button>
            <button onClick={() => onNavigate('search')} style={{ textIndent: 0, textAlign: 'left', color: '#94A3B8', fontSize: '0.88rem' }}>Top Backpacker Hubs</button>
            <button onClick={() => onNavigate('profile')} style={{ textIndent: 0, textAlign: 'left', color: 'var(--color-teal-light)', fontSize: '0.88rem', fontWeight: 700 }}>Portable Trust Passport</button>
          </div>

          {/* Col 4: Trust & Legal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <h4 style={{ color: '#F8FAFC', fontSize: '0.95rem', fontWeight: 800 }}>Trust & Safety</h4>
            <button onClick={() => onNavigate('admin')} style={{ textIndent: 0, textAlign: 'left', color: '#94A3B8', fontSize: '0.88rem' }}>Safety Center & Moderation</button>
            <span style={{ fontSize: '0.88rem' }}>Terms of Service</span>
            <span style={{ fontSize: '0.88rem' }}>Privacy Policy</span>
            <span style={{ fontSize: '0.88rem' }}>Community Guidelines</span>
          </div>
        </div>

        {/* Bottom Banner Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid #1E293B', paddingTop: '1.5rem', fontSize: '0.82rem' }}>
          <span>© 2026 hopabed.com Protocol. Open Infrastructure under MIT License.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-green)' }}>
              <ShieldCheck size={14} /> 100% Zero Host Commission Guaranteed
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
