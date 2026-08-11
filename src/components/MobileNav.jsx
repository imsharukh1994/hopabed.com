import React from 'react';
import { Compass, Calendar, MessageSquare, User, PlusCircle } from 'lucide-react';

export default function MobileNav({ activeTab, setActiveTab, unreadCount = 1 }) {
  const navItems = [
    { id: 'search', label: 'Explore', icon: Compass },
    { id: 'trips', label: 'Trips', icon: Calendar },
    { id: 'messaging', label: 'Messages', icon: MessageSquare, badge: unreadCount },
    { id: 'host-dashboard', label: 'Host', icon: PlusCircle },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav 
      className="mobile-nav-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        padding: '0.5rem 0.5rem calc(0.5rem + env(safe-area-inset-bottom)) 0.5rem',
        justifySpace: 'space-around',
        alignItems: 'center',
        zIndex: 999,
        boxShadow: '0 -4px 15px rgba(0,0,0,0.1)'
      }}
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontSize: '0.72rem',
              fontWeight: isActive ? 800 : 600,
              padding: '0.25rem',
              position: 'relative',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} color={isActive ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
            <span>{item.label}</span>

            {item.badge > 0 && (
              <span style={{
                position: 'absolute',
                top: '0',
                right: '25%',
                backgroundColor: 'var(--color-red)',
                color: '#FFFFFF',
                fontSize: '0.65rem',
                fontWeight: 900,
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
