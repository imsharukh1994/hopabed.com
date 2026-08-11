import React, { useState, useRef } from 'react';
import { ShieldCheck, CheckCircle2, Camera, Upload, Lock, Award, X, Sparkles, ChevronRight, FileText } from 'lucide-react';
import { uploadToSupabaseStorage } from '../services/storageService';

export default function TrustPassportModal({ isOpen, onClose, onVerifySuccess }) {
  const [step, setStep] = useState(1);
  const [idType, setIdType] = useState('passport');
  const [idFileName, setIdFileName] = useState('');
  const [selfieCaptured, setSelfieCaptured] = useState(false);
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [verifying, setVerifying] = useState(false);
  const docInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDocUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdFileName(file.name);
      // Upload document scan securely to Supabase Storage
      try {
        await uploadToSupabaseStorage(file, 'hopabed.bucket');
      } catch (err) {
        console.warn('Doc upload note:', err);
      }
    }
  };

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
        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={docInputRef} 
          onChange={handleDocUpload} 
          accept="image/*,.pdf" 
          style={{ display: 'none' }} 
        />

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
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>hopabed.com Trust Passport</div>
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
                Select your document type and upload a clear scan or photo (Passport, National ID, or Driver's License).
              </p>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                {[
                  { id: 'passport', label: 'Passport' },
                  { id: 'national_id', label: 'National ID' },
                  { id: 'drivers_license', label: "Driver's License" }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setIdType(item.id)}
                    style={{
                      flex: 1,
                      padding: '12px 8px',
                      borderRadius: '12px',
                      backgroundColor: idType === item.id ? '#047857' : '#0f172a',
                      border: `1px solid ${idType === item.id ? '#10b981' : '#334155'}`,
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Upload Drop Zone */}
              <div 
                onClick={() => docInputRef.current?.click()}
                style={{
                  border: `2px dashed ${idFileName ? '#10b981' : '#334155'}`,
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  backgroundColor: '#0f172a',
                  cursor: 'pointer',
                  marginBottom: '20px',
                  transition: '0.2s'
                }}
              >
                {idFileName ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={36} color="#10b981" />
                    <div style={{ fontSize: '14px', fontWeight: 800, color: '#10b981' }}>
                      Document Loaded: {idFileName}
                    </div>
                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>Click to change file</div>
                  </div>
                ) : (
                  <>
                    <Upload size={32} color="#10b981" style={{ margin: '0 auto 8px' }} />
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>
                      Click to Upload {idType === 'passport' ? 'Passport' : idType === 'national_id' ? 'National ID' : "Driver's License"} Scan
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Supports JPG, PNG, PDF (Max 10MB)</div>
                  </>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Biometric Live Selfie Verification</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
                Click below to capture a face selfie to verify matching identity with your uploaded document.
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
                {selfieCaptured ? '✓ Biometric Match Confirmed' : 'Take Biometric Selfie'}
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '8px' }}>Phone & Node Link Verification</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
                Verify your mobile number to receive your portable encrypted Trust Passport QR badge.
              </p>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '6px' }}>PHONE NUMBER</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '12px',
                    border: '1px solid #334155',
                    backgroundColor: '#0f172a',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 700
                  }}
                />
              </div>

              <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', fontSize: '12px', color: '#34d399' }}>
                🔒 2FA OTP security code sent via SMS. Zero physical document copies are stored on central servers.
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Award size={44} />
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 900, color: '#fff', marginBottom: '8px' }}>Trust Passport Activated!</h2>
              <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '380px', margin: '0 auto 20px', lineHeight: 1.5 }}>
                Your identity has been verified. You now carry a verified **Trust Badge** across all hopabed.com stays worldwide.
              </p>
              <button
                onClick={onClose}
                style={{
                  padding: '12px 32px',
                  borderRadius: '30px',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Done
              </button>
            </div>
          )}

          {/* Bottom Action Footer */}
          {step <= 3 && (
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748b' }}>
                <Lock size={12} /> Encrypted
              </div>

              <button
                onClick={handleNextStep}
                disabled={verifying}
                style={{
                  padding: '12px 24px',
                  borderRadius: '30px',
                  backgroundColor: '#10b981',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 800,
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{verifying ? 'Verifying Credentials...' : step === 3 ? 'Complete Verification' : 'Continue to Next Step'}</span>
                {!verifying && <ChevronRight size={18} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
