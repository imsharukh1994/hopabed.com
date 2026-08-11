import React from 'react';
import { QrCode, Download, Printer, MapPin, Calendar, User, ShieldCheck, X, Phone } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function DigitalPassModal({ isOpen, onClose, booking, selectedCurrency = 'USD' }) {
  if (!isOpen || !booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        backgroundColor: '#1e293b',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        color: '#f8fafc'
      }}>
        {/* Pass Top Bar */}
        <div style={{
          padding: '16px 20px',
          backgroundColor: '#0f172a',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '18px' }}>🎟️</span>
            <span style={{ fontWeight: 800, fontSize: '15px', color: '#fff' }}>BedHopper Digital Wallet Pass</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Wallet Pass Card Main Body */}
        <div style={{ padding: '20px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #0f766e 100%)',
            borderRadius: '20px',
            padding: '20px',
            color: '#fff',
            boxShadow: '0 12px 24px rgba(0,0,0,0.3)',
            position: 'relative'
          }}>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>
                  OFFLINE CHECK-IN PASS
                </div>
                <div style={{ fontSize: '18px', fontWeight: 800, marginTop: '2px' }}>
                  {booking.listingTitle || 'BedHopper Stay'}
                </div>
              </div>
              <span style={{
                padding: '4px 10px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                fontSize: '11px',
                fontWeight: 700
              }}>
                {booking.status || 'Confirmed'}
              </span>
            </div>

            {/* Check-In / Check-Out Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', backgroundColor: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '12px' }}>
              <div>
                <div style={{ fontSize: '10px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> CHECK-IN
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>{booking.checkIn || '12 Aug 2026'}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} /> CHECK-OUT
                </div>
                <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>{booking.checkOut || '14 Aug 2026'}</div>
              </div>
            </div>

            {/* Host & Location Info */}
            <div style={{ fontSize: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <User size={14} /> <strong>Host:</strong> {booking.hostName || 'Anna Schmidt'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} /> <strong>Node Code:</strong> {booking.id || 'BH-99201'}
              </div>
            </div>

            {/* QR Code Container */}
            <div style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              padding: '16px',
              textAlign: 'center',
              color: '#0f172a'
            }}>
              <div style={{ display: 'inline-block', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                <QrCode size={120} color="#0f172a" />
              </div>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', fontWeight: 700, marginTop: '8px', color: '#64748b' }}>
                PASS-HASH: {booking.id || 'BH-20260810'}
              </div>
              <div style={{ fontSize: '10px', color: '#047857', fontWeight: 700, marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <ShieldCheck size={12} /> Offline Verification Ready (No Wifi Needed)
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
            <button
              onClick={handlePrint}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#334155',
                border: 'none',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Printer size={16} /> Print Pass
            </button>
            <button
              onClick={handlePrint}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#0284c7',
                border: 'none',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <Download size={16} /> Save Pass (PNG)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
