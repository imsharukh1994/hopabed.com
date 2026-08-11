import React, { useState } from 'react';
import { X, Check, ShieldCheck, Lock, CreditCard, Sparkles, ArrowRight, CheckCircle2, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatPrice } from '../utils/currency';

export default function BookingFlowModal({ bookingData, onClose, onConfirmBooking, selectedCurrency = 'USD' }) {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'crypto'
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
        hostName: listing.host?.name || 'Anna Schmidt',
        checkIn: details.checkInDate || '12 Aug 2026',
        checkOut: details.checkOutDate || '14 Aug 2026',
        nights: details.nights || 2,
        guests: details.guestsCount || 1,
        totalPrice: details.totalPrice || 0,
        status: isServiceShare ? 'Pending Host Approval' : 'Confirmed',
        paymentStatus: isServiceShare ? '$20 Deposit Held' : paymentMethod === 'crypto' ? 'Paid via USDC Web3 Node' : 'Paid via Stripe Connect',
        createdDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      });
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '1rem'
    }} className="animate-fade-in">
      <div style={{
        backgroundColor: '#1e293b',
        borderRadius: '24px',
        maxWidth: '520px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        border: '1px solid #334155',
        display: 'flex',
        flexDirection: 'column',
        color: '#f8fafc'
      }}>
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)'
        }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0 }}>
            {step === 1 && '1. Review Your Trip'}
            {step === 2 && '2. Checkout & Payment'}
            {step === 3 && '🎉 Booking Confirmed!'}
          </h3>
          {step !== 3 && (
            <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={22} />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* STEP 1: REVIEW TRIP */}
          {step === 1 && (
            <>
              <div style={{ display: 'flex', gap: '1rem', padding: '0.85rem', backgroundColor: '#0f172a', borderRadius: '16px' }}>
                <img src={listing.images[0]} alt={listing.title} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: 0 }}>{listing.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '2px 0 0 0' }}>{listing.city}, {listing.country}</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.92rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                  <span style={{ color: '#94a3b8' }}>Dates:</span>
                  <span style={{ fontWeight: 800, color: '#fff' }}>{details.checkInDate} to {details.checkOutDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '0.5rem' }}>
                  <span style={{ color: '#94a3b8' }}>Guests:</span>
                  <span style={{ fontWeight: 800, color: '#fff' }}>{details.guestsCount} guest(s)</span>
                </div>
              </div>

              {/* Fee Breakdown */}
              {!isServiceShare ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', backgroundColor: '#0f172a', padding: '1rem', borderRadius: '16px', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: '#94a3b8' }}>Total due now</span>
                    <strong style={{ fontSize: '1.2rem', color: '#38bdf8' }}>{formatPrice(details.totalPrice, selectedCurrency)}</strong>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>Includes BedHopper platform fee & all taxes.</span>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', backgroundColor: '#0f172a', padding: '1rem', borderRadius: '16px', border: '1px solid #10b981' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                    <span style={{ color: '#10b981', fontWeight: 800 }}>Service-Share Deposit</span>
                    <strong style={{ fontSize: '1.1rem', color: '#10b981' }}>$20.00 Refundable Escrow</strong>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Refunded back upon host sign-off of micro-service task.</span>
                </div>
              )}

              <button 
                style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem', backgroundColor: '#0284c7', border: 'none', borderRadius: '14px', color: '#fff', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={() => setStep(2)}
              >
                <span>Continue to Checkout</span>
                <ArrowRight size={18} />
              </button>
            </>
          )}

          {/* STEP 2: PAYMENT METHOD (CARD vs CRYPTO) */}
          {step === 2 && (
            <>
              {/* Payment Method Selector */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <button
                  onClick={() => setPaymentMethod('card')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '12px',
                    backgroundColor: paymentMethod === 'card' ? '#0284c7' : '#0f172a',
                    border: `1px solid ${paymentMethod === 'card' ? '#38bdf8' : '#334155'}`,
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  💳 Credit / Debit Card
                </button>
                <button
                  onClick={() => setPaymentMethod('crypto')}
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: '12px',
                    backgroundColor: paymentMethod === 'crypto' ? '#047857' : '#0f172a',
                    border: `1px solid ${paymentMethod === 'crypto' ? '#10b981' : '#334155'}`,
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  🌐 Web3 / USDC Crypto
                </button>
              </div>

              {paymentMethod === 'card' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>CARD NUMBER</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #334155', borderRadius: '12px', padding: '0.6rem 0.8rem', marginTop: '4px', backgroundColor: '#0f172a' }}>
                      <CreditCard size={18} color="#0284c7" />
                      <input 
                        type="text" 
                        value={cardNumber} 
                        onChange={(e) => setCardNumber(e.target.value)}
                        style={{ border: 'none', outline: 'none', width: '100%', fontWeight: 700, backgroundColor: 'transparent', color: '#fff' }} 
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>EXPIRY</label>
                      <input 
                        type="text" 
                        value={expiry} 
                        onChange={(e) => setExpiry(e.target.value)}
                        style={{ border: '1px solid #334155', borderRadius: '12px', padding: '0.6rem 0.8rem', marginTop: '4px', width: '100%', fontWeight: 700, backgroundColor: '#0f172a', color: '#fff' }} 
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8' }}>CVC</label>
                      <input 
                        type="password" 
                        value={cvc} 
                        onChange={(e) => setCvc(e.target.value)}
                        style={{ border: '1px solid #334155', borderRadius: '12px', padding: '0.6rem 0.8rem', marginTop: '4px', width: '100%', fontWeight: 700, backgroundColor: '#0f172a', color: '#fff' }} 
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #334155' }}>
                  <QrCode size={90} color="#10b981" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '12px', fontFamily: 'monospace', color: '#34d399', fontWeight: 700 }}>
                    USDC: 0x71C...9B42 (Solana / Polygon)
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                    Pay total via Web3 Wallet (MetaMask / Phantom)
                  </div>
                </div>
              )}

              <button 
                style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem', marginTop: '0.5rem', backgroundColor: '#0284c7', border: 'none', borderRadius: '14px', color: '#fff', fontWeight: 800, cursor: 'pointer' }}
                onClick={handlePayAndBook}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing Transaction...' : `Confirm & Pay ${formatPrice(details.totalPrice, selectedCurrency)}`}
              </button>
            </>
          )}

          {/* STEP 3: CONFIRMED PASS */}
          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', padding: '1rem 0' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={40} color="#10b981" />
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', margin: 0 }}>Your booking is confirmed!</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.92rem', margin: 0 }}>
                A confirmation message and digital pass have been sent to host <strong>{listing.host?.name}</strong>.
              </p>

              <div style={{ backgroundColor: '#0f172a', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px dashed #334155', width: '100%' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 800 }}>BOOKING CODE</span>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#38bdf8', letterSpacing: '1px', marginTop: '2px', margin: 0 }}>{confirmationCode}</h4>
              </div>

              <button 
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem', backgroundColor: '#0284c7', border: 'none', borderRadius: '14px', color: '#fff', fontWeight: 800, cursor: 'pointer' }}
                onClick={onClose}
              >
                Go to My Trips & Pass
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
