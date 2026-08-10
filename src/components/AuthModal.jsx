import React, { useState } from 'react';
import { X, Mail, Lock, User, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, AlertCircle, Github } from 'lucide-react';
import { supabase, isCloudConnected } from '../lib/supabaseClient';

export default function AuthModal({ initialMode = 'login', onClose, onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('traveler');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOAuthLogin = async (provider) => {
    setErrorMsg('');
    try {
      if (isCloudConnected()) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) throw error;
      } else {
        // Local simulation of OAuth provider sign-in
        onLoginSuccess({
          id: `usr-${provider}-${Date.now()}`,
          name: provider === 'google' ? 'Alex Rivera (Google)' : 'Alex Rivera (GitHub)',
          email: `alex.${provider}@example.com`,
          role: 'traveler',
          isVerified: true,
          trustPassport: true,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
        });
      }
    } catch (err) {
      setErrorMsg(err.message || `Failed to sign in with ${provider}.`);
    }
  };

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
        maxWidth: '480px',
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

          {/* SOCIAL OAUTH BUTTONS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button 
              type="button"
              className="btn-outline"
              onClick={() => handleOAuthLogin('google')}
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <button 
              type="button"
              className="btn-outline"
              onClick={() => handleOAuthLogin('github')}
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.92rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
            >
              <Github size={18} color="#0F172A" />
              <span>Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '0.25rem 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }}></div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>OR WITH EMAIL</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }}></div>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
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
              style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '0.25rem' }}
            >
              <span>{loading ? 'Authenticating...' : mode === 'login' ? 'Log In to Account' : 'Create Free Account'}</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Demo Login Preset Buttons */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 900, color: 'var(--color-text-muted)', textTransform: 'uppercase', textAlign: 'center' }}>QUICK DEMO PRESETS</span>
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
                style={{ fontSize: '0.78rem', padding: '0.45rem' }}
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
                style={{ fontSize: '0.78rem', padding: '0.45rem' }}
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
