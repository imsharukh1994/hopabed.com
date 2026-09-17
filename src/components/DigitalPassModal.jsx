import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Printer, Download, Share2, ShieldCheck, Calendar, User, MapPin, Wifi, WifiOff, Copy, Check, Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import {
  cachePassOffline,
  loadCachedPass,
  generateDigitalPass,
  formatPassDate,
  getPassStatusColor,
  isPassValid,
} from '../services/passService';

// ─────────────────────────────────────────────────────────────
// Status Badge
// ─────────────────────────────────────────────────────────────
function StatusBadge({ status, bookingStatus }) {
  const resolvedStatus = bookingStatus || status;

  if (resolvedStatus === 'PENDING_HOST_APPROVAL' || resolvedStatus === 'Pending') {
    return (
      <span style={{
        padding: '5px 12px',
        borderRadius: '20px',
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        color: '#fbbf24',
        fontSize: '11px',
        fontWeight: 800,
        border: '1px solid rgba(245, 158, 11, 0.3)',
        letterSpacing: '0.3px',
        whiteSpace: 'nowrap',
      }}>
        ⏳ Pending Host Approval
      </span>
    );
  }
  if (resolvedStatus === 'REJECTED') {
    return (
      <span style={{ padding: '5px 12px', borderRadius: '20px', backgroundColor: 'rgba(239,68,68,0.2)', color: '#f87171', fontSize: '11px', fontWeight: 800 }}>
        ✕ Rejected
      </span>
    );
  }
  if (resolvedStatus === 'CANCELLED' || resolvedStatus === 'Cancelled') {
    return (
      <span style={{ padding: '5px 12px', borderRadius: '20px', backgroundColor: 'rgba(239,68,68,0.15)', color: '#f87171', fontSize: '11px', fontWeight: 800 }}>
        ✕ Pass Cancelled
      </span>
    );
  }
  if (resolvedStatus === 'CHECKED_IN') {
    return (
      <span style={{ padding: '5px 12px', borderRadius: '20px', backgroundColor: 'rgba(2,132,199,0.2)', color: '#38bdf8', fontSize: '11px', fontWeight: 800 }}>
        ✓ Checked In
      </span>
    );
  }
  if (resolvedStatus === 'CHECKED_OUT') {
    return (
      <span style={{ padding: '5px 12px', borderRadius: '20px', backgroundColor: 'rgba(99,102,241,0.2)', color: '#a5b4fc', fontSize: '11px', fontWeight: 800 }}>
        ✓ Checked Out
      </span>
    );
  }
  // Default: ACTIVE / Confirmed / PASS_ACTIVE
  return (
    <span style={{ padding: '5px 12px', borderRadius: '20px', backgroundColor: 'rgba(16,185,129,0.2)', color: '#34d399', fontSize: '11px', fontWeight: 800 }}>
      ✓ Host Approved
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────
export default function DigitalPassModal({ isOpen, onClose, booking, currentUser }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastSynced, setLastSynced] = useState(null);
  const [offlineCached, setOfflineCached] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activePass, setActivePass] = useState(null);
  const passCardRef = useRef(null);

  // ─── Network status listeners ───
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // ─── Resolve pass data ───
  useEffect(() => {
    if (!isOpen || !booking) return;

    // Use the booking's digitalPass if it has one, else construct a display pass
    const pass = booking.digitalPass || null;

    if (pass) {
      setActivePass(pass);
      // Check offline cache
      const cached = loadCachedPass(pass.passCode);
      if (cached) {
        setOfflineCached(true);
        setLastSynced(cached.lastSynced);
      }
    } else {
      // Build a synthetic pass object from booking data for display
      setActivePass({
        passCode: booking.passCode || `BH-PASS-${booking.id?.substring(0, 8).toUpperCase() || 'DEMO0001'}`,
        passHash: booking.passHash || 'DEMOHASH01',
        qrToken: booking.qrToken || booking.id || 'demo-token',
        nodeCode: booking.nodeCode || booking.listingNodeCode || 'BH-DEMO01',
        guestName: booking.guestName || currentUser?.name || 'Guest',
        hostName: booking.hostName || 'Host',
        propertyName: booking.listingTitle || booking.propertyName || 'BedHopper Stay',
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        status: booking.bookingStatus === 'PENDING_HOST_APPROVAL' ? 'PENDING' : 'ACTIVE',
        issuedAt: booking.createdDate || new Date().toISOString(),
        bookingId: booking.id,
      });
    }
  }, [isOpen, booking, currentUser]);

  // ─── Generate QR code ───
  useEffect(() => {
    if (!activePass) return;

    const isPending = activePass.status === 'PENDING' ||
      booking?.bookingStatus === 'PENDING_HOST_APPROVAL';

    if (isPending) {
      setQrDataUrl('');
      return;
    }

    const verifyUrl = `${window.location.origin}${window.location.pathname}#verify/${activePass.qrToken}`;

    QRCode.toDataURL(verifyUrl, {
      width: 200,
      margin: 2,
      color: { dark: '#0f172a', light: '#ffffff' },
      errorCorrectionLevel: 'M',
    }).then(url => {
      setQrDataUrl(url);
      // Cache pass for offline use
      if (activePass.passCode) {
        const cached = cachePassOffline({
          ...activePass,
          qrToken: activePass.qrToken,
        });
        if (cached) {
          setOfflineCached(true);
          setLastSynced(new Date().toISOString());
        }
      }
    }).catch(err => {
      console.warn('QR generation failed:', err);
    });
  }, [activePass, booking]);

  // ─── Actions ───
  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleDownloadPng = useCallback(async () => {
    if (!passCardRef.current || isDownloading) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(passCardRef.current, {
        backgroundColor: '#1e293b',
        scale: 3,
        useCORS: true,
        logging: false,
        allowTaint: false,
      });
      const link = document.createElement('a');
      const passCode = activePass?.passCode || 'BH-PASS';
      link.download = `HopaBed-BedHopper-Pass-${passCode}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (err) {
      console.error('PNG download failed:', err);
      alert('PNG download failed. Please try printing instead.');
    } finally {
      setIsDownloading(false);
    }
  }, [activePass, isDownloading]);

  const handleShare = useCallback(async () => {
    const verifyUrl = activePass?.qrToken
      ? `${window.location.origin}${window.location.pathname}#verify/${activePass.qrToken}`
      : window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'BedHopper Digital Pass',
          text: `My HopaBed stay pass — ${activePass?.propertyName || 'BedHopper Stay'}`,
          url: verifyUrl,
        });
      } catch { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(verifyUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      } catch {
        prompt('Copy this verification link:', verifyUrl);
      }
    }
  }, [activePass]);

  if (!isOpen || !booking) return null;

  const isPending = booking?.bookingStatus === 'PENDING_HOST_APPROVAL' || activePass?.status === 'PENDING';
  const isCancelled = booking?.bookingStatus === 'CANCELLED' || booking?.status === 'Cancelled' || activePass?.status === 'CANCELLED';
  const isCheckedIn = activePass?.status === 'CHECKED_IN';
  const isCheckedOut = activePass?.status === 'CHECKED_OUT';

  const passGradient = isCancelled
    ? 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
    : isPending
      ? 'linear-gradient(135deg, #1d4ed8 0%, #1e3a5f 100%)'
      : 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)';

  return (
    <>
      {/* Print-only wrapper */}
      <style>{`
        @media print {
          body > * { display: none !important; }
          .digital-pass-print-area { display: block !important; position: fixed; top: 0; left: 0; width: 100%; z-index: 99999; background: white; padding: 20px; }
          .no-print { display: none !important; }
        }
        @media screen {
          .digital-pass-print-area { display: contents; }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10000, padding: '20px',
          animation: 'fadeIn 0.2s ease',
        }}
      >
        {/* Modal container */}
        <div
          onClick={e => e.stopPropagation()}
          style={{
            width: '100%', maxWidth: '460px',
            backgroundColor: '#0f172a',
            borderRadius: '28px',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.7)',
            overflow: 'hidden',
            color: '#f8fafc',
            animation: 'slideUpFade 0.3s cubic-bezier(0.16,1,0.3,1)',
            maxHeight: '95vh',
            overflowY: 'auto',
          }}
        >
          {/* ── Modal Top Bar ── */}
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #1e293b, #0f172a)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>🛏</span>
              <div>
                <div style={{ fontWeight: 900, fontSize: '15px', color: '#fff', fontFamily: 'Nunito, sans-serif' }}>
                  BedHopper Digital Wallet Pass
                </div>
                {!isOnline && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#fbbf24', fontWeight: 700, marginTop: '2px' }}>
                    <WifiOff size={10} />
                    OFFLINE MODE — Last synced: {lastSynced ? new Date(lastSynced).toLocaleTimeString() : 'Unknown'}
                  </div>
                )}
              </div>
            </div>
            <button onClick={onClose} className="no-print" style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#94a3b8', cursor: 'pointer', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <X size={18} />
            </button>
          </div>

          {/* ── Pass Card Body ── */}
          <div style={{ padding: '20px' }}>
            <div className="digital-pass-print-area" ref={passCardRef} style={{
              background: passGradient,
              borderRadius: '20px',
              padding: '22px',
              color: '#fff',
              boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Background pattern dots */}
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-40px', left: '-20px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

              {/* Pass type + Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.75, fontWeight: 800 }}>
                    OFFLINE CHECK-IN PASS
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: 900, marginTop: '4px', lineHeight: 1.2, maxWidth: '240px', fontFamily: 'Nunito, sans-serif' }}>
                    {activePass?.propertyName || booking.listingTitle || 'BedHopper Stay'}
                  </div>
                </div>
                <StatusBadge status={activePass?.status} bookingStatus={booking.bookingStatus} />
              </div>

              {/* Dates */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '10px', marginBottom: '16px',
                backgroundColor: 'rgba(0,0,0,0.25)',
                padding: '14px', borderRadius: '14px',
              }}>
                <div>
                  <div style={{ fontSize: '9px', opacity: 0.75, display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <Calendar size={10} /> CHECK-IN
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 900, marginTop: '4px', fontFamily: 'Nunito, sans-serif' }}>
                    {formatPassDate(booking.checkIn)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '9px', opacity: 0.75, display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <Calendar size={10} /> CHECK-OUT
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 900, marginTop: '4px', fontFamily: 'Nunito, sans-serif' }}>
                    {formatPassDate(booking.checkOut)}
                  </div>
                </div>
              </div>

              {/* Info rows */}
              <div style={{ fontSize: '12px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <InfoRow icon={<User size={13} />} label="Guest" value={activePass?.guestName || booking.guestName || currentUser?.name} />
                <InfoRow icon={<User size={13} />} label="Host" value={activePass?.hostName || booking.hostName} />
                <InfoRow icon={<MapPin size={13} />} label="Property" value={activePass?.propertyName || booking.listingTitle} />
                <InfoRow icon={<MapPin size={13} />} label="Node Code" value={activePass?.nodeCode || booking.nodeCode || 'BH-DEMO01'} mono />
              </div>

              {/* QR Code or Pending State */}
              <div style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '18px',
                textAlign: 'center',
                color: '#0f172a',
              }}>
                {isPending ? (
                  <div style={{ padding: '20px 0' }}>
                    <Clock size={40} color="#fbbf24" style={{ margin: '0 auto 12px' }} />
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px' }}>Awaiting Host Approval</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>QR code will appear once your host approves the booking.</div>
                  </div>
                ) : isCancelled ? (
                  <div style={{ padding: '20px 0' }}>
                    <XCircle size={40} color="#ef4444" style={{ margin: '0 auto 12px' }} />
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '14px' }}>Pass Cancelled</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>This booking has been cancelled.</div>
                  </div>
                ) : qrDataUrl ? (
                  <>
                    <div style={{ display: 'inline-block', padding: '8px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                      <img src={qrDataUrl} alt="Pass QR Code" style={{ width: 160, height: 160, display: 'block', imageRendering: 'pixelated' }} />
                    </div>
                    <div style={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 700, marginTop: '8px', color: '#475569', letterSpacing: '1px' }}>
                      PASS ID: {activePass?.passCode}
                    </div>
                    <div style={{ fontSize: '10px', fontFamily: 'monospace', color: '#94a3b8', marginTop: '2px' }}>
                      HASH: {activePass?.passHash}
                    </div>
                    <div style={{ fontSize: '10px', color: '#047857', fontWeight: 700, marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <ShieldCheck size={11} />
                      {offlineCached ? '✓ Offline Pass Available' : 'Offline Verification Ready (No Wifi Needed)'}
                    </div>
                  </>
                ) : (
                  <div style={{ padding: '20px 0' }}>
                    <div style={{ width: 40, height: 40, border: '3px solid #0284c7', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 12px', animation: 'spin 0.8s linear infinite' }} />
                    <div style={{ fontSize: '13px', color: '#64748b' }}>Generating QR code…</div>
                  </div>
                )}
              </div>

              {/* Status bar */}
              {isCheckedIn && (
                <div style={{ marginTop: '12px', padding: '10px 14px', backgroundColor: 'rgba(2,132,199,0.25)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700 }}>
                  <CheckCircle2 size={14} color="#38bdf8" />
                  <span>Checked in at {activePass?.checkedInAt ? new Date(activePass.checkedInAt).toLocaleString() : 'recorded'}</span>
                </div>
              )}
              {isCheckedOut && (
                <div style={{ marginTop: '12px', padding: '10px 14px', backgroundColor: 'rgba(99,102,241,0.25)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: 700 }}>
                  <CheckCircle2 size={14} color="#a5b4fc" />
                  <span>Checked out. Stay completed.</span>
                </div>
              )}
            </div>

            {/* ── Action Buttons ── */}
            {!isPending && !isCancelled && (
              <div className="no-print" style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <ActionButton onClick={handlePrint} icon={<Printer size={15} />} label="Print Pass" variant="secondary" />
                  <ActionButton
                    onClick={handleDownloadPng}
                    icon={isDownloading ? <SpinIcon /> : <Download size={15} />}
                    label={isDownloading ? 'Generating…' : 'Save Pass (PNG)'}
                    variant="primary"
                    disabled={isDownloading}
                  />
                </div>
                <ActionButton
                  onClick={handleShare}
                  icon={isCopied ? <Check size={15} /> : <Share2 size={15} />}
                  label={isCopied ? 'Link Copied!' : 'Share Verification Link'}
                  variant="outline"
                  fullWidth
                />
              </div>
            )}

            {/* Offline notice */}
            {!isOnline && offlineCached && (
              <div className="no-print" style={{ marginTop: '10px', padding: '10px 14px', backgroundColor: 'rgba(245,158,11,0.1)', borderRadius: '12px', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#fbbf24', fontWeight: 700 }}>
                <WifiOff size={14} />
                <div>
                  <div>OFFLINE MODE</div>
                  <div style={{ fontWeight: 600, opacity: 0.8 }}>Last synchronized: {lastSynced ? new Date(lastSynced).toLocaleString() : 'Unknown'}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────
function InfoRow({ icon, label, value, mono }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', opacity: 0.92 }}>
      <span style={{ opacity: 0.7, flexShrink: 0 }}>{icon}</span>
      <span style={{ opacity: 0.8, fontSize: '11px' }}>{label}:</span>
      <span style={{ fontWeight: 800, fontFamily: mono ? 'monospace' : 'inherit', fontSize: mono ? '12px' : '12px', letterSpacing: mono ? '0.5px' : 0 }}>
        {value || '—'}
      </span>
    </div>
  );
}

function ActionButton({ onClick, icon, label, variant, disabled, fullWidth }) {
  const [hovered, setHovered] = useState(false);
  const base = {
    flex: fullWidth ? undefined : 1,
    width: fullWidth ? '100%' : undefined,
    padding: '12px 16px',
    borderRadius: '14px',
    border: 'none',
    fontSize: '13px',
    fontWeight: 800,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '7px',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s',
    fontFamily: 'Nunito, sans-serif',
  };
  const variants = {
    primary: { backgroundColor: hovered ? '#0369a1' : '#0284c7', color: '#fff' },
    secondary: { backgroundColor: hovered ? '#475569' : '#334155', color: '#fff' },
    outline: { backgroundColor: hovered ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.12)' },
  };
  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{ ...base, ...variants[variant] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon} {label}
    </button>
  );
}

function SpinIcon() {
  return <div style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />;
}
