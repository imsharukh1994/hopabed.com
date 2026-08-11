import React, { useRef, useState } from 'react';
import { ShieldCheck, Star, Award, CreditCard, Settings, LogOut, CheckCircle, ShieldAlert, Camera, Upload } from 'lucide-react';
import { uploadToSupabaseStorage } from '../services/storageService';

export default function ProfilePage({ currentUser, onOpenTrustModal, onOpenSOSModal, onLogout, onUpdateUser }) {
  const user = currentUser || {
    name: 'Shaharukh',
    email: 'shaharukh@hopabed.com',
    avatar: '',
    trustPassport: true,
    bio: 'hopabed.com Traveler & Community Member'
  };

  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // Instant local FileReader preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const localUrl = event.target.result;
      if (onUpdateUser) {
        onUpdateUser({ ...user, avatar: localUrl });
      }
    };
    reader.readAsDataURL(file);

    // Async cloud upload to Supabase Storage
    try {
      const cloudUrl = await uploadToSupabaseStorage(file, 'hopabed.bucket');
      if (cloudUrl && onUpdateUser) {
        onUpdateUser({ ...user, avatar: cloudUrl });
      }
    } catch (err) {
      console.warn('Avatar upload note:', err);
    }

    setIsUploading(false);
  };

  // Helper to get initials if no avatar is set
  const initials = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '720px', color: 'var(--color-text-main)' }}>
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleAvatarChange} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />

      {/* Profile Header Card */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '24px',
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
        {/* Avatar Container with Upload Camera Badge */}
        <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => fileInputRef.current?.click()} title="Click to upload your profile photo">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name} 
              style={{ width: '104px', height: '104px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--color-primary)' }}
            />
          ) : (
            <div style={{
              width: '104px',
              height: '104px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-primary)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              fontWeight: 900,
              border: '3px solid var(--color-primary)'
            }}>
              {initials}
            </div>
          )}

          {/* Camera Upload Badge */}
          <div style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid var(--color-surface)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
          }}>
            <Camera size={16} />
          </div>
        </div>

        <button 
          onClick={() => fileInputRef.current?.click()}
          style={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: '4px 12px',
            fontSize: '0.78rem',
            fontWeight: 800,
            color: 'var(--color-primary)',
            cursor: 'pointer'
          }}
        >
          {isUploading ? 'Uploading Photo...' : '📷 Upload Your Photo'}
        </button>

        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-text-main)', margin: 0 }}>{user.name}</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>{user.bio || 'hopabed.com Community Member'}</p>
        </div>

        {/* Badges & Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={onOpenTrustModal}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              backgroundColor: user.trustPassport ? 'rgba(16, 185, 129, 0.15)' : 'var(--color-primary)',
              border: `1px solid ${user.trustPassport ? '#10b981' : 'var(--color-primary)'}`,
              color: user.trustPassport ? '#10b981' : '#fff',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ShieldCheck size={16} /> {user.trustPassport ? 'Trust Passport Active (Verified)' : 'Verify Trust Passport'}
          </button>

          <button
            onClick={onOpenSOSModal}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #ef4444',
              color: '#ef4444',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ShieldAlert size={16} /> Emergency SOS Setup
          </button>
        </div>
      </div>

      {/* Trust & Identity Details Card */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '24px',
        padding: '1.75rem',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginTop: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 900, margin: 0 }}>Decentralized Trust Passport</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', margin: 0, lineHeight: 1.5 }}>
          Your Trust Passport allows your verified identity and reputation score to travel seamlessly across any hopabed.com stay worldwide.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#10b981', fontWeight: 700 }}>
            <CheckCircle size={16} /> Govt ID Verified (Passport/Driver's License)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#10b981', fontWeight: 700 }}>
            <CheckCircle size={16} /> Biometric Selfie Match Verified
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', color: '#10b981', fontWeight: 700 }}>
            <CheckCircle size={16} /> Zero serious safety incidents logged
          </div>
        </div>
      </div>

      {/* Settings & Logout Controls */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '24px',
        padding: '1.5rem',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-sm)',
        marginTop: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
      }}>
        <button
          onClick={onOpenTrustModal}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '16px',
            backgroundColor: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-main)',
            fontSize: '0.9rem',
            fontWeight: 800,
            textAlign: 'left',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Settings size={18} color="var(--color-primary)" /> Re-verify Identity & Documents
        </button>

        <button
          onClick={onLogout}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '16px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#ef4444',
            fontSize: '0.9rem',
            fontWeight: 800,
            textAlign: 'left',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </div>
  );
}
