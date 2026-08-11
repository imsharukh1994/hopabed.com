import React, { useState } from 'react';
import { Camera, Upload, CheckCircle2, ShieldCheck, DollarSign, X, ArrowRight } from 'lucide-react';

export default function ProofOfWorkModal({ isOpen, onClose, booking, onComplete }) {
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [taskNotes, setTaskNotes] = useState('');
  const [releasing, setReleasing] = useState(false);
  const [completed, setCompleted] = useState(false);

  if (!isOpen || !booking) return null;

  const handleSubmitProof = () => {
    setReleasing(true);
    setTimeout(() => {
      setReleasing(false);
      setCompleted(true);
      if (onComplete) onComplete(booking.id);
    }, 1500);
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
        maxWidth: '480px',
        backgroundColor: '#1e293b',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        color: '#f8fafc'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          background: 'linear-gradient(135deg, #0d9488 0%, #047857 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={24} color="#fff" />
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>Proof of Work & Escrow Release</div>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.85)' }}>Service-Share Deposit Return Flow</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {!completed ? (
            <div>
              <div style={{
                padding: '14px',
                backgroundColor: '#0f172a',
                borderRadius: '14px',
                border: '1px solid #334155',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>STAY / TASK:</div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                  {booking.listingTitle || 'Service-Share Stay'}
                </div>
                <div style={{ fontSize: '12px', color: '#34d399', fontWeight: 600, marginTop: '4px' }}>
                  💰 Escrow Held: {booking.paymentStatus || '$20 Refundable Deposit'}
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                  Upload Task Photo / Proof:
                </label>
                <div 
                  onClick={() => setPhotoUploaded(true)}
                  style={{
                    border: `2px dashed ${photoUploaded ? '#10b981' : '#334155'}`,
                    borderRadius: '16px',
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: '#0f172a',
                    cursor: 'pointer'
                  }}
                >
                  <Camera size={32} color={photoUploaded ? '#10b981' : '#0284c7'} style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '13px', fontWeight: 600, color: photoUploaded ? '#10b981' : '#fff' }}>
                    {photoUploaded ? '✓ Proof Photo Attached: task_completed_proof.jpg' : 'Click to Upload Photo Proof'}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>
                  Task Summary Notes:
                </label>
                <textarea
                  value={taskNotes}
                  onChange={(e) => setTaskNotes(e.target.value)}
                  placeholder="Describe task completed (e.g. Walked dog daily, painted garden fence)..."
                  style={{
                    width: '100%',
                    height: '70px',
                    padding: '10px',
                    borderRadius: '12px',
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              <button
                onClick={handleSubmitProof}
                disabled={releasing}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '14px',
                  backgroundColor: '#047857',
                  border: 'none',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {releasing ? 'Releasing Escrow Deposit...' : 'Submit Proof & Release Deposit'}
                {!releasing && <ArrowRight size={18} />}
              </button>
            </div>
          ) : (
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
                <CheckCircle2 size={40} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>
                Deposit Refunded! 💵
              </h3>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px' }}>
                Your photo proof was verified. **$20.00 Escrow Deposit** has been refunded to your original payment method.
              </p>

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
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
