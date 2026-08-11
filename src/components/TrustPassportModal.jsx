import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Camera, Upload, Lock, Award, X, Sparkles, ChevronRight } from 'lucide-react';

export default function TrustPassportModal({ isOpen, onClose, onVerifySuccess }) {
  const [step, setStep] = useState(1);
  const [idType, setIdType] = useState('passport');
  const [idFileName, setIdFileName] = useState('');
  const [selfieCaptured, setSelfieCaptured] = useState(false);
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [verifying, setVerifying] = useState(false);

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Finalizing Verification
      setVerifying(true);
      setTimeout(() => {
        setVerifying(false);
        setStep(4); // Success screen
        if (onVerifySuccess) {
          onVerifySuccess();
        }
      }, 1500);
    }
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
        maxWidth: '520px',
        backgroundColor: '#1e293b',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        color: '#f8fafc'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #059669 0%, #0d9488 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '14px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={26} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>BedHopper Trust Passport</div>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.85)' }}>Zero-Trust Decentralized Identity Verification</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Progress Tracker */}
        {step <= 3 && (
          <div style={{ display: 'flex', borderBottom: '1px solid #334155', backgroundColor: '#0f172a' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{
                flex: 1,
                padding: '10px 0',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 700,
                color: step === i ? '#10b981' : step > i ? '#34d399' : '#64748b',
                borderBottom: step === i ? '2px solid #10b981' : 'none'
              }}>
                Step {i}: {i === 1 ? 'Government ID' : i === 2 ? 'Biometric Check' : 'Phone & Social'}
              </div>
            ))}
          </div>
        )}

        {/* Body Content */}
        <div style={{ padding: '24px' }}>
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Select Government Issued ID</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
                Your ID is processed locally and hashed onto the BedHopper Trust Protocol to verify true identity without storing your physical document.
              </p>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                {['passport', 'national_id', 'drivers_license'].map(type => (
                  <button
                    key={type}
                    onClick={() => setIdType(type)}
                    style={{
                      flex: 1,
                      padding: '12px',
                      borderRadius: '12px',
                      backgroundColor: idType === type ? '#047857' : '#0f172a',
                      border: `1px solid ${idType === type ? '#10b981' : '#334155'}`,
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {type.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div 
                onClick={() => setIdFileName('passport_scan_verified.jpg')}
                style={{
                  border: '2px dashed #334155',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  backgroundColor: '#0f172a',
                  cursor: 'pointer',
                  marginBottom: '20px'
                }}
              >
                <Upload size={32} color="#10b981" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '13px', fontWeight: 600 }}>
                  {idFileName ? `Uploaded: ${idFileName}` : 'Click to Upload Document Scan'}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Supports JPG, PNG, PDF (Max 10MB)</div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Biometric Live Selfie Verification</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
                Position your face inside the circle to verify matching identity with your uploaded document.
              </p>

              <div style={{
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                border: `3px dashed ${selfieCaptured ? '#10b981' : '#0284c7'}`,
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0f172a',
                position: 'relative'
              }}>
                <Camera size={40} color={selfieCaptured ? '#10b981' : '#0284c7'} />
                {selfieCaptured && (
                  <CheckCircle2 size={28} color="#10b981" style={{ position: 'absolute', bottom: '10px', right: '10px' }} />
                )}
              </div>

              <button
                onClick={() => setSelfieCaptured(true)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: selfieCaptured ? '#059669' : '#0284c7',
                  border: 'none',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {selfieCaptured ? '✓ Facial Match Confirmed' : 'Simulate Camera Capture'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Phone & Node Link Verification</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
                Link your phone number to activate community safety alerts and instant host SMS notifications.
              </p>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{
                padding: '14px',
                borderRadius: '14px',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}>
                <Lock size={20} color="#10b981" />
                <div style={{ fontSize: '12px', color: '#34d399' }}>
                  Your Trust Passport status will give you priority access to zero-deposit Service-Share stays!
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '10px 0' }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Award size={40} color="#10b981" />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                Trust Passport Issued! 🎉
              </h2>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
                Congratulations! You are now a **Verified Trust Member** on BedHopper network.
              </p>

              <div style={{
                padding: '16px',
                backgroundColor: '#0f172a',
                borderRadius: '16px',
                border: '1px solid #334155',
                fontSize: '12px',
                color: '#cbd5e1',
                textAlign: 'left',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Passport ID:</span>
                  <span style={{ fontFamily: 'monospace', color: '#10b981' }}>0x8f2a...9b41</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Status:</span>
                  <span style={{ fontWeight: 700, color: '#10b981' }}>VERIFIED GLOBAL NODE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Trust Score:</span>
                  <span style={{ fontWeight: 700, color: '#38bdf8' }}>98 / 100</span>
                </div>
              </div>

              <button
                onClick={onClose}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                  backgroundColor: '#10b981',
                  border: 'none',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Done & Return to BedHopper
              </button>
            </div>
          )}

          {step <= 3 && (
            <button
              onClick={handleNextStep}
              disabled={verifying}
              style={{
                width: '100%',
                padding: '14px',
                marginTop: '12px',
                borderRadius: '14px',
                backgroundColor: '#10b981',
                border: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {verifying ? 'Verifying Hash...' : step === 3 ? 'Issue Trust Passport' : 'Continue to Next Step'}
              {!verifying && <ChevronRight size={18} />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
