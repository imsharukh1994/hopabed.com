import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Lock, CreditCard, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingFlowModal({ bookingData, onClose, onConfirmBooking }) {
  const [step, setStep] = useState(1); // 1: Review, 2: Payment, 3: Confirmed
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('123');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  if (!bookingData) return null;

  const { listing, details } = bookingData;
  const isServiceShare = listing.isServiceShare;

  const handlePayAndBook = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const code = 'BH-' + Math.random().toString(36).substring(2, 8).toUpperCase() + '12';
      setConfirmationCode(code);
      setStep(3);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti effect triggered');
      }

      onConfirmBooking({
        id: code,
        listingId: listing.id,
        listingTitle: listing.title,
        guestName: 'John Doe',
        hostName: listing.host?.name,
        checkIn: details.checkInDate,
        checkOut: details.checkOutDate,
        nights: 2,
        guests: details.guestsCount,
        totalPrice: details.totalPrice || 0,
        status: isServiceShare ? 'Pending Host Approval' : 'Confirmed',
        paymentStatus: isServiceShare ? '$20 Deposit Held' : 'Paid via Stripe Connect',
        createdDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      });
    }, 1200);
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
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '520px',
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
          justifyContent: 'space-between'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
            {step === 1 && '1. Review Your Trip'}
            {step === 2 && '2. Confirm & Pay'}
            {step === 3 && '🎉 Booking Confirmed!'}
          </h3>
          {step !== 3 && (
            <button onClick={onClose} style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}>
              <X size={22} />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* STEP 1: REVIEW TRIP */}
          {step === 1 && (
            <>
              {/* Listing Snippet */}
              <div style={{ display: 'flex', gap: '1rem', padding: '0.85rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                <img src={listing.images[0]} alt={listing.title} style={{ width: '70px', height: '70px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>{listing.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{listing.city}, {listing.country}</p>
                </div>
              </div>

              {/* Trip Dates */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.92rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Dates:</span>
                  <span style={{ fontWeight: 800 }}>{details.checkInDate} to {details.checkOutDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Guests:</span>
                  <span style={{ fontWeight: 800 }}>{details.guestsCount} guest(s)</span>
                </div>
              </div>

              {/* Fee Breakdown */}
              {!isServiceShare && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', backgroundColor: '#F8FAF9', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span>Total due now</span>
                    <strong style={{ fontSize: '1.15rem', color: 'var(--color-primary)' }}>{listing.currency}{details.totalPrice}</strong>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Includes 8% BedHopper platform fee & all taxes.</span>
                </div>
              )}

              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem' }}
                onClick={() => setStep(2)}
              >
                <span>Continue to Payment</span>
                <ArrowRight size={18} />
              </button>
            </>
          )}

          {/* STEP 2: STRIPE PAYMENT */}
          {step === 2 && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem', backgroundColor: 'var(--color-teal-light)', color: 'var(--color-teal)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: 700 }}>
                <Lock size={16} />
                <span>Secured with 256-bit Stripe Connect Encryption</span>
              </div>

              {/* Payment Card Input Simulation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>CARD NUMBER</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 0.8rem', marginTop: '4px' }}>
                    <CreditCard size={18} color="var(--color-primary)" />
                    <input 
                      type="text" 
                      value={cardNumber} 
                      onChange={(e) => setCardNumber(e.target.value)}
                      style={{ border: 'none', outline: 'none', width: '100%', fontWeight: 700 }} 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>EXPIRY</label>
                    <input 
                      type="text" 
                      value={expiry} 
                      onChange={(e) => setExpiry(e.target.value)}
                      style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 0.8rem', marginTop: '4px', width: '100%', fontWeight: 700 }} 
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>CVC</label>
                    <input 
                      type="password" 
                      value={cvc} 
                      onChange={(e) => setCvc(e.target.value)}
                      style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 0.8rem', marginTop: '4px', width: '100%', fontWeight: 700 }} 
                    />
                  </div>
                </div>
              </div>

              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem', marginTop: '0.5rem' }}
                onClick={handlePayAndBook}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing Payment...' : `Pay ${listing.currency}${details.totalPrice}`}
              </button>
            </>
          )}

          {/* STEP 3: CONFIRMED PASS */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', padding: '1rem 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-green-light)', color: 'var(--color-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={40} color="var(--color-teal)" />
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Your booking is confirmed!</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
                A confirmation message has been sent to host <strong>{listing.host?.name}</strong>.
              </p>

              <div style={{ backgroundColor: 'var(--color-bg)', padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border)', width: '100%' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 800 }}>BOOKING CODE</span>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--color-teal)', letterSpacing: '1px', marginTop: '2px' }}>{confirmationCode}</h4>
              </div>

              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
                onClick={onClose}
              >
                Go to My Trips
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
