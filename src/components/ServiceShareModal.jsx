import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Lock, CheckCircle2, AlertTriangle, FileText, X, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ServiceShareModal({ listing, onClose, onAgreementSigned }) {
  const [taskCategory, setTaskCategory] = useState('Dog Walking & Pet Care');
  const [dailyHours, setDailyHours] = useState('0.5 hrs/day');
  const [depositAmount, setDepositAmount] = useState(20);
  const [guestSignature, setGuestSignature] = useState('John Doe');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [signed, setSigned] = useState(false);

  if (!listing) return null;

  const handleSignAgreement = (e) => {
    e.preventDefault();
    if (!agreedToTerms) return;

    setSigned(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti triggered');
    }

    setTimeout(() => {
      onAgreementSigned({
        listingId: listing.id,
        listingTitle: listing.title,
        taskCategory,
        dailyHours,
        depositAmount,
        signedBy: guestSignature,
        dateSigned: new Date().toLocaleDateString()
      });
    }, 1500);
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
        maxWidth: '580px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--color-border)',
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
            <Sparkles size={20} color="var(--color-teal)" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900 }}>Service-Share Digital Task Agreement</h3>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {signed ? (
            <div style={{ textIndent: 0, textAlign: 'center', padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-teal-light)', color: 'var(--color-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={40} color="var(--color-teal)" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Agreement Digitally Signed!</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
                Your $20 deposit is securely held in escrow and will be automatically released upon stay completion.
              </p>
              <button className="btn-primary" onClick={onClose} style={{ marginTop: '0.5rem' }}>
                Close & View Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSignAgreement} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Listing Title Snippet */}
              <div style={{ backgroundColor: 'var(--color-bg-alt)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-teal)', textTransform: 'uppercase' }}>SERVICE-SHARE STAY</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '2px' }}>{listing.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Host: {listing.host?.name} • Location: {listing.city}</p>
              </div>

              {/* Prohibited Tasks Safeguard Banner */}
              <div style={{ backgroundColor: '#FEF3C7', border: '1px solid #F59E0B', padding: '1rem', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '10px' }}>
                <AlertTriangle size={20} color="#B45309" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.82rem', color: '#78350F' }}>
                  <strong>Platform Safeguard Policy:</strong> Prohibited tasks include heavy manual labor, hazardous work, sexual services, or coercive duties. Stays are capped at max 2 hours daily assistance.
                </div>
              </div>

              {/* Task Details Customizer */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>PERMITTED TASK</label>
                  <select 
                    value={taskCategory}
                    onChange={(e) => setTaskCategory(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '4px', fontWeight: 700, fontSize: '0.88rem' }}
                  >
                    <option value="Dog Walking & Pet Care">Dog Walking & Pet Care</option>
                    <option value="Hostel Reception Desk">Hostel Reception Desk</option>
                    <option value="Balcony Plant Watering">Balcony Plant Watering</option>
                    <option value="Language Conversation Practice">Language Conversation Practice</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>TIME COMMITMENT</label>
                  <select 
                    value={dailyHours}
                    onChange={(e) => setDailyHours(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '4px', fontWeight: 700, fontSize: '0.88rem' }}
                  >
                    <option value="0.5 hrs/day">0.5 hrs / day (30 mins)</option>
                    <option value="1.0 hrs/day">1.0 hrs / day (60 mins)</option>
                    <option value="1.5 hrs/day">1.5 hrs / day</option>
                  </select>
                </div>
              </div>

              {/* Escrow Deposit Summary */}
              <div style={{ backgroundColor: 'var(--color-teal-light)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(45,106,79,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Lock size={20} color="var(--color-teal)" />
                  <div>
                    <h5 style={{ color: 'var(--color-teal)', fontSize: '0.95rem', fontWeight: 800 }}>Refundable Escrow Deposit</h5>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Held safely until stay completion</span>
                  </div>
                </div>
                <strong style={{ fontSize: '1.25rem', color: 'var(--color-teal)' }}>${depositAmount}.00</strong>
              </div>

              {/* Signature Field */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>DIGITAL SIGNATURE</label>
                <input 
                  type="text" 
                  value={guestSignature}
                  onChange={(e) => setGuestSignature(e.target.value)}
                  placeholder="Type your full legal name"
                  required
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '4px', fontWeight: 700, fontSize: '0.95rem' }}
                />
              </div>

              {/* Consent Checkbox */}
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-teal)', marginTop: '2px' }}
                />
                <span>I agree to perform the specified assistance with care and abide by BedHopper safety terms.</span>
              </label>

              {/* Action Button */}
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={!agreedToTerms}
                style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem', opacity: agreedToTerms ? 1 : 0.5 }}
              >
                <span>Sign & Submit Application</span>
                <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
