import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Clock, ShieldCheck, User, MapPin, Calendar, ArrowLeft, QrCode, RefreshCw } from 'lucide-react';
import { getPassByQrToken, confirmCheckIn, confirmCheckOut, formatPassDate, getPassStatusColor, isPassValid } from '../services/passService';

export default function PassVerificationPage({ qrToken, currentUser, onBack }) {
  const [pass, setPass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [checkOutLoading, setCheckOutLoading] = useState(false);
  const [actionResult, setActionResult] = useState(null);
  const [localStatus, setLocalStatus] = useState(null);

  useEffect(() => {
    if (qrToken) {
      loadPass(qrToken);
    } else {
      setLoading(false);
      setError('No verification token provided.');
    }
  }, [qrToken]);

  async function loadPass(token) {
    setLoading(true);
    setError(null);
    try {
      const result = await getPassByQrToken(token);
      if (!result) {
        setError('INVALID');
      } else {
        setPass(result);
        setLocalStatus(result.status);
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError('INVALID');
    } finally {
      setLoading(false);
    }
  }

  async function handleCheckIn() {
    if (!pass || !currentUser) return;
    setCheckInLoading(true);
    setActionResult(null);
    try {
      const result = await confirmCheckIn(pass.id, currentUser.id, currentUser.name);
      if (result.success) {
        setLocalStatus('CHECKED_IN');
        setActionResult({ type: 'success', message: result.demo ? 'Check-in confirmed (demo mode).' : `Check-in confirmed at ${new Date(result.checkedInAt).toLocaleTimeString()}.` });
      } else {
        setActionResult({ type: 'error', message: result.error || 'Check-in failed.' });
      }
    } catch {
      setActionResult({ type: 'error', message: 'Check-in failed. Please try again.' });
    } finally {
      setCheckInLoading(false);
    }
  }

  async function handleCheckOut() {
    if (!pass || !currentUser) return;
    setCheckOutLoading(true);
    setActionResult(null);
    try {
      const result = await confirmCheckOut(pass.id, currentUser.id, currentUser.name);
      if (result.success) {
        setLocalStatus('CHECKED_OUT');
        setActionResult({ type: 'success', message: 'Check-out confirmed. Stay completed!' });
      } else {
        setActionResult({ type: 'error', message: result.error || 'Check-out failed.' });
      }
    } catch {
      setActionResult({ type: 'error', message: 'Check-out failed. Please try again.' });
    } finally {
      setCheckOutLoading(false);
    }
  }

  const isHostOfBooking = currentUser && pass && (
    currentUser.id === pass.hostId ||
    currentUser.role === 'host' ||
    currentUser.role === 'both' ||
    currentUser.role === 'admin'
  );

  const displayStatus = localStatus || pass?.status;
  const isVerified = isPassValid({ ...pass, status: displayStatus });

  // ─── Loading ───
  if (loading) {
    return (
      <VerificationWrapper onBack={onBack}>
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <div style={{ width: 56, height: 56, border: '4px solid rgba(2,132,199,0.3)', borderTopColor: '#0284c7', borderRadius: '50%', margin: '0 auto 1.25rem', animation: 'spin 0.8s linear infinite' }} />
          <div style={{ color: 'var(--color-text-muted)', fontWeight: 700 }}>Verifying Pass…</div>
        </div>
      </VerificationWrapper>
    );
  }

  // ─── INVALID ───
  if (error === 'INVALID' || !pass) {
    return (
      <VerificationWrapper onBack={onBack}>
        <VerificationResult
          icon={<XCircle size={64} color="#ef4444" />}
          status="INVALID"
          title="✕ INVALID PASS"
          titleColor="#ef4444"
          message="This pass could not be verified. It may be expired, cancelled, or tampered with."
          details={[]}
        />
      </VerificationWrapper>
    );
  }

  // ─── CANCELLED ───
  if (displayStatus === 'CANCELLED') {
    return (
      <VerificationWrapper onBack={onBack}>
        <VerificationResult
          icon={<XCircle size={64} color="#ef4444" />}
          status="CANCELLED"
          title="✕ PASS CANCELLED"
          titleColor="#ef4444"
          message="This booking has been cancelled. The pass is no longer valid."
          details={buildDetails(pass)}
        />
      </VerificationWrapper>
    );
  }

  // ─── EXPIRED ───
  if (displayStatus === 'EXPIRED' || (pass.expiresAt && new Date() > new Date(pass.expiresAt) && displayStatus !== 'CHECKED_IN')) {
    return (
      <VerificationWrapper onBack={onBack}>
        <VerificationResult
          icon={<AlertCircle size={64} color="#f59e0b" />}
          status="EXPIRED"
          title="✕ PASS EXPIRED"
          titleColor="#f59e0b"
          message="This pass has expired. The check-out date has passed."
          details={buildDetails(pass)}
        />
      </VerificationWrapper>
    );
  }

  // ─── VERIFIED ───
  return (
    <VerificationWrapper onBack={onBack}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '24px' }}>🛏</span>
          <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-text-main)', fontFamily: 'Nunito, sans-serif' }}>HOPABED</span>
        </div>
        <div style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '3px', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          PASS VERIFICATION
        </div>

        {/* Verification icon */}
        <div style={{ marginBottom: '1rem' }}>
          {displayStatus === 'CHECKED_IN' ? (
            <CheckCircle2 size={72} color="#0284c7" style={{ filter: 'drop-shadow(0 4px 12px rgba(2,132,199,0.4))' }} />
          ) : displayStatus === 'CHECKED_OUT' ? (
            <CheckCircle2 size={72} color="#6366f1" style={{ filter: 'drop-shadow(0 4px 12px rgba(99,102,241,0.4))' }} />
          ) : (
            <CheckCircle2 size={72} color="#10b981" style={{ filter: 'drop-shadow(0 4px 12px rgba(16,185,129,0.4))' }} />
          )}
        </div>

        <div style={{
          fontSize: '1.6rem', fontWeight: 900,
          fontFamily: 'Nunito, sans-serif',
          color: displayStatus === 'CHECKED_IN' ? '#38bdf8' : displayStatus === 'CHECKED_OUT' ? '#a5b4fc' : '#10b981',
          marginBottom: '0.25rem',
          letterSpacing: '0.5px',
        }}>
          {displayStatus === 'CHECKED_IN' ? '✓ CHECKED IN' : displayStatus === 'CHECKED_OUT' ? '✓ STAY COMPLETED' : '✓ PASS VERIFIED'}
        </div>

        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
          {displayStatus === 'ACTIVE' ? 'This is a valid, active BedHopper pass.' :
           displayStatus === 'CHECKED_IN' ? 'Guest has checked in.' :
           displayStatus === 'CHECKED_OUT' ? 'Guest has checked out.' : ''}
        </div>
      </div>

      {/* Pass details card */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '20px',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
        marginBottom: '1.5rem',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #0284c7, #0d9488)',
          padding: '16px 20px',
          display: 'flex', alignItems: 'center', gap: '10px',
        }}>
          <ShieldCheck size={20} color="#fff" />
          <span style={{ fontWeight: 900, color: '#fff', fontSize: '14px', fontFamily: 'Nunito, sans-serif' }}>Pass Details</span>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {buildDetails(pass).map((row, i) => (
            <VerificationRow key={i} label={row.label} value={row.value} icon={row.icon} mono={row.mono} />
          ))}
          <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '4px 0' }} />
          <VerificationRow
            label="Status"
            value={
              <span style={{
                fontWeight: 900,
                color: getPassStatusColor(displayStatus),
                backgroundColor: `${getPassStatusColor(displayStatus)}18`,
                padding: '3px 10px',
                borderRadius: '10px',
                fontSize: '13px',
              }}>
                {displayStatus || 'ACTIVE'}
              </span>
            }
          />
        </div>
      </div>

      {/* Host check-in / check-out actions */}
      {isHostOfBooking && (
        <div style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: '20px',
          border: '1px solid var(--color-border)',
          padding: '20px',
          marginBottom: '1rem',
        }}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem' }}>
            Host Actions
          </div>

          {actionResult && (
            <div style={{
              padding: '10px 14px',
              borderRadius: '12px',
              marginBottom: '1rem',
              backgroundColor: actionResult.type === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
              color: actionResult.type === 'success' ? '#10b981' : '#ef4444',
              fontWeight: 700,
              fontSize: '13px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              {actionResult.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {actionResult.message}
            </div>
          )}

          {displayStatus === 'ACTIVE' && (
            <button
              onClick={handleCheckIn}
              disabled={checkInLoading}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                backgroundColor: '#10b981',
                color: '#fff',
                border: 'none',
                fontSize: '15px',
                fontWeight: 900,
                cursor: checkInLoading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                opacity: checkInLoading ? 0.7 : 1,
                fontFamily: 'Nunito, sans-serif',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => !checkInLoading && (e.currentTarget.style.backgroundColor = '#059669')}
              onMouseLeave={e => !checkInLoading && (e.currentTarget.style.backgroundColor = '#10b981')}
            >
              {checkInLoading ? <SpinIcon /> : <CheckCircle2 size={18} />}
              {checkInLoading ? 'Confirming…' : 'Confirm Check-in'}
            </button>
          )}

          {displayStatus === 'CHECKED_IN' && (
            <button
              onClick={handleCheckOut}
              disabled={checkOutLoading}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                backgroundColor: '#6366f1',
                color: '#fff',
                border: 'none',
                fontSize: '15px',
                fontWeight: 900,
                cursor: checkOutLoading ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                opacity: checkOutLoading ? 0.7 : 1,
                fontFamily: 'Nunito, sans-serif',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => !checkOutLoading && (e.currentTarget.style.backgroundColor = '#4f46e5')}
              onMouseLeave={e => !checkOutLoading && (e.currentTarget.style.backgroundColor = '#6366f1')}
            >
              {checkOutLoading ? <SpinIcon /> : <CheckCircle2 size={18} />}
              {checkOutLoading ? 'Confirming…' : 'Confirm Check-out'}
            </button>
          )}

          {displayStatus === 'CHECKED_OUT' && (
            <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontWeight: 700, fontSize: '14px', padding: '8px 0' }}>
              Stay completed. No further actions needed.
            </div>
          )}
        </div>
      )}

      {!currentUser && (
        <div style={{
          padding: '14px 18px',
          backgroundColor: 'rgba(245,158,11,0.08)',
          border: '1px solid rgba(245,158,11,0.15)',
          borderRadius: '14px',
          fontSize: '13px',
          color: '#fbbf24',
          fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          <AlertCircle size={16} />
          Log in as the verified host to confirm check-in.
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </VerificationWrapper>
  );
}

// ─── Helpers ───
function buildDetails(pass) {
  return [
    { label: 'Guest', value: pass.guestName, icon: <User size={15} /> },
    { label: 'Host', value: pass.hostName, icon: <User size={15} /> },
    { label: 'Property', value: pass.propertyName, icon: <MapPin size={15} /> },
    { label: 'Check-in', value: formatPassDate(pass.checkIn), icon: <Calendar size={15} /> },
    { label: 'Check-out', value: formatPassDate(pass.checkOut), icon: <Calendar size={15} /> },
    { label: 'Node Code', value: pass.nodeCode, icon: <MapPin size={15} />, mono: true },
    { label: 'Pass ID', value: pass.passCode, mono: true },
  ].filter(d => d.value);
}

function VerificationWrapper({ onBack, children }) {
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '5rem', maxWidth: '520px' }}>
      {onBack && (
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: 'var(--color-text-muted)',
            fontWeight: 700, fontSize: '0.88rem',
            background: 'none', border: 'none', cursor: 'pointer',
            marginBottom: '1.5rem', padding: '0',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-text-main)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}
        >
          <ArrowLeft size={17} /> Back
        </button>
      )}
      {children}
    </div>
  );
}

function VerificationResult({ icon, title, titleColor, message, details }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ marginBottom: '1rem' }}>{icon}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 900, color: titleColor, marginBottom: '0.75rem', fontFamily: 'Nunito, sans-serif' }}>
        {title}
      </div>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>{message}</p>
      {details.length > 0 && (
        <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-border)', padding: '16px', textAlign: 'left' }}>
          {details.map((row, i) => <VerificationRow key={i} label={row.label} value={row.value} icon={row.icon} mono={row.mono} />)}
        </div>
      )}
    </div>
  );
}

function VerificationRow({ label, value, icon, mono }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontSize: '13px', fontWeight: 600 }}>
        {icon} {label}
      </div>
      {typeof value === 'string' ? (
        <div style={{ fontWeight: 800, fontSize: '13px', color: 'var(--color-text-main)', fontFamily: mono ? 'monospace' : 'inherit' }}>
          {value || '—'}
        </div>
      ) : value}
    </div>
  );
}

function SpinIcon() {
  return <div style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />;
}
