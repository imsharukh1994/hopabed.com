import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, Phone, MapPin, X, CheckCircle, Radio } from 'lucide-react';

export default function EmergencySOSModal({ isOpen, onClose }) {
  const [countdown, setCountdown] = useState(10);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [userLocation, setUserLocation] = useState('13.7563° N, 100.5018° E (Bangkok Central Node)');

  useEffect(() => {
    let timer;
    if (isOpen && countdown > 0 && !broadcastSent && isBroadcasting) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0 && isBroadcasting && !broadcastSent) {
      setBroadcastSent(true);
      setIsBroadcasting(false);
    }
    return () => clearInterval(timer);
  }, [isOpen, countdown, isBroadcasting, broadcastSent]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleStartBroadcast = () => {
    setIsBroadcasting(true);
    setCountdown(10);
  };

  const handleCancelBroadcast = () => {
    setIsBroadcasting(false);
    setCountdown(10);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100000,
      padding: '20px'
    }}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="emergency-sos-title"
        style={{
          width: '100%',
          maxWidth: '480px',
          backgroundColor: '#1e293b',
          borderRadius: '24px',
          border: '1px solid rgba(239, 68, 68, 0.4)',
          boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.3)',
          overflow: 'hidden',
          color: '#f8fafc'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldAlert size={26} color="#fff" />
            </div>
            <div>
              <div id="emergency-sos-title" style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>Solo Traveler Emergency SOS</div>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.85)' }}>Community Safety Broadcast System</div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close emergency SOS modal"
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px', textAlign: 'center' }}>
          {!isBroadcasting && !broadcastSent && (
            <div>
              <div
                role="button"
                tabIndex={0}
                aria-label="Start emergency broadcast"
                onClick={handleStartBroadcast}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStartBroadcast();
                  }
                }}
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '2px solid #ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  cursor: 'pointer'
                }}
              >
                <Radio size={48} color="#ef4444" />
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                Need Immediate Help?
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
                Tapping broadcast will alert **3 nearby verified BedHopper hosts** and send your live GPS location to local tourist support dispatchers.
              </p>

              <div style={{
                padding: '12px 16px',
                backgroundColor: '#0f172a',
                borderRadius: '14px',
                border: '1px solid #334155',
                fontSize: '12px',
                color: '#38bdf8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                marginBottom: '20px'
              }}>
                <MapPin size={14} /> GPS Location: <strong>{userLocation}</strong>
              </div>

              <button
                onClick={handleStartBroadcast}
                style={{
                  width: '100%',
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: '#ef4444',
                  border: 'none',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 10px 20px rgba(239, 68, 68, 0.4)'
                }}
              >
                🚨 BROADCAST EMERGENCY SOS
              </button>
            </div>
          )}

          {isBroadcasting && !broadcastSent && (
            <div>
              <div style={{
                fontSize: '48px',
                fontWeight: 900,
                color: '#ef4444',
                margin: '10px 0'
              }}>
                {countdown}s
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                Broadcasting Emergency Alert...
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
                Transmitting encrypted location to nearby node network. Tap below to cancel if triggered by mistake.
              </p>

              <button
                onClick={handleCancelBroadcast}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                  backgroundColor: '#334155',
                  border: '1px solid #475569',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Cancel Broadcast
              </button>
            </div>
          )}

          {broadcastSent && (
            <div>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <CheckCircle size={40} color="#22c55e" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                Emergency Broadcast Active!
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
                Alert sent to 3 nearest hosts (**Anna S.**, **Mark M.**, **Tom H.**). Help is on the way.
              </p>

              {/* Direct Emergency Numbers */}
              <div style={{ textAlign: 'left', backgroundColor: '#0f172a', borderRadius: '16px', padding: '16px', marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '10px' }}>
                  DIRECT HELPLINES:
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px' }}>
                  <span>Tourist Police Hotline:</span>
                  <a href="tel:1155" style={{ color: '#ef4444', fontWeight: 700, textDecoration: 'none' }}>📞 1155</a>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span>BedHopper Safety Dispatch:</span>
                  <a href="tel:+18005550199" style={{ color: '#38bdf8', fontWeight: 700, textDecoration: 'none' }}>📞 +1-800-SAFETY</a>
                </div>
              </div>

              <button
                onClick={onClose}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                  backgroundColor: '#22c55e',
                  border: 'none',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Dismiss Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
