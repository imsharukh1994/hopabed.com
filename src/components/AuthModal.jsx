import React, { useState } from 'react';
import { X, Mail, Lock, User, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase, isCloudConnected } from '../lib/supabaseClient';

export default function AuthModal({ initialMode = 'login', onClose, onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('traveler');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isCloudConnected()) {
        if (mode === 'signup') {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { name, role }
            }
          });
          if (error) throw error;
          onLoginSuccess({
            id: data.user?.id || 'usr-cloud',
            name: name || email.split('@')[0],
            email: email,
            role: role,
            isVerified: true,
            trustPassport: true,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
          });
        } else {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (error) throw error;
          onLoginSuccess({
            id: data.user?.id || 'usr-cloud',
            name: data.user?.user_metadata?.name || email.split('@')[0],
            email: email,
            role: data.user?.user_metadata?.role || 'traveler',
            isVerified: true,
            trustPassport: true,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
          });
        }
      } else {
        // Local state simulation
        setTimeout(() => {
          onLoginSuccess({
            id: `usr-${Date.now()}`,
            name: name || email.split('@')[0] || 'John Doe',
            email: email || 'user@bedhopper.org',
            role: role,
            isVerified: true,
            trustPassport: true,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
          });
        }, 800);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check credentials.');
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoUser) => {
    onLoginSuccess(demoUser);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '1rem'
    }} className="animate-fade-in">
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '460px',
        width: '100%',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--color-bg-alt)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={22} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 900 }}>
              {mode === 'login' ? 'Welcome Back to BedHopper' : 'Create BedHopper Account'}
            </h3>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Mode Switcher Pills */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--color-bg-alt)',
            padding: '4px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--color-border)'
          }}>
            <button
              onClick={() => setMode('login')}
              style={{
                flex: 1,
                padding: '0.45rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.88rem',
                fontWeight: 800,
                backgroundColor: mode === 'login' ? '#FFFFFF' : 'transparent',
                color: mode === 'login' ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                boxShadow: mode === 'login' ? 'var(--shadow-sm)' : 'none'
              }}
            >
              Log In
            </button>
            <button
              onClick={() => setMode('signup')}
              style={{
                flex: 1,
                padding: '0.45rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.88rem',
                fontWeight: 800,
                backgroundColor: mode === 'signup' ? 'var(--color-primary)' : 'transparent',
                color: mode === 'signup' ? '#FFFFFF' : 'var(--color-text-muted)'
              }}
            >
              Sign Up
            </button>
          </div>

          {errorMsg && (
            <div style={{ backgroundColor: '#FEE2E2', border: '1px solid #EF4444', padding: '0.75rem', borderRadius: 'var(--radius-sm)', color: '#991B1B', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {mode === 'signup' && (
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>FULL NAME</label>
                <div style={{ position: 'relative', marginTop: '4px' }}>
                  <User size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    style={{ width: '100%', padding: '0.7rem 0.8rem 0.7rem 2.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontWeight: 700, fontSize: '0.9rem' }}
                  />
                </div>
              </div>
            )}

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>EMAIL ADDRESS</label>
              <div style={{ position: 'relative', marginTop: '4px' }}>
                <Mail size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@example.com"
                  required
                  style={{ width: '100%', padding: '0.7rem 0.8rem 0.7rem 2.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontWeight: 700, fontSize: '0.9rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>PASSWORD</label>
              <div style={{ position: 'relative', marginTop: '4px' }}>
                <Lock size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{ width: '100%', padding: '0.7rem 0.8rem 0.7rem 2.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontWeight: 700, fontSize: '0.9rem' }}
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>ACCOUNT ROLE</label>
                <select 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ width: '100%', padding: '0.7rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '4px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  <option value="traveler">Backpacker / Traveler</option>
                  <option value="host">Individual Host (Spare Couch/Room)</option>
                  <option value="hostel">Commercial Hostel Manager</option>
                </select>
              </div>
            )}

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}
            >
              <span>{loading ? 'Authenticating...' : mode === 'login' ? 'Log In to Account' : 'Create Free Account'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Demo Login Preset Buttons */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-text-muted)', textTransform: 'uppercase', textAlign: 'center' }}>QUICK DEMO ONE-CLICK LOGIN</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <button 
                type="button"
                className="btn-outline"
                onClick={() => handleDemoLogin({
                  id: 'usr-anna',
                  name: 'Anna Schmidt',
                  email: 'anna@bedhopper.org',
                  role: 'host',
                  isVerified: true,
                  trustPassport: true,
                  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'
                })}
                style={{ fontSize: '0.78rem', padding: '0.5rem' }}
              >
                Anna Schmidt (Host)
              </button>

              <button 
                type="button"
                className="btn-outline"
                onClick={() => handleDemoLogin({
                  id: 'usr-john',
                  name: 'John Doe',
                  email: 'john@traveler.com',
                  role: 'traveler',
                  isVerified: true,
                  trustPassport: true,
                  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
                })}
                style={{ fontSize: '0.78rem', padding: '0.5rem' }}
              >
                John Doe (Guest)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
