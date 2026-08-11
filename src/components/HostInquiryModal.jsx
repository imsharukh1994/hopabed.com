import React, { useState } from 'react';
import { X, Send, MessageCircle, CheckCircle, ShieldCheck } from 'lucide-react';

export default function HostInquiryModal({ isOpen, onClose, listing }) {
  const [question, setQuestion] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen || !listing) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setQuestion('');
      onClose();
    }, 1500);
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
      zIndex: 2500,
      padding: '1rem'
    }} className="animate-fade-in">
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '24px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        color: 'var(--color-text-main)',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)',
          color: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageCircle size={20} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: 0 }}>
              Ask {listing.host?.name || 'Host'} a Question
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle size={44} color="var(--color-teal)" />
              <h4 style={{ fontSize: '1.2rem', fontWeight: 900 }}>Message Delivered!</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', margin: 0 }}>
                {listing.host?.name || 'Host'} typically responds within {listing.host?.responseRate || '1 hour'}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'var(--color-bg)', padding: '0.75rem 1rem', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
                <img 
                  src={listing.host?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'} 
                  alt={listing.host?.name} 
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-text-main)' }}>{listing.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>Hosted by {listing.host?.name} • Verified Host</div>
                </div>
              </div>

              {/* Quick Template Buttons */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {[
                  'Is check-in after 10 PM ok?',
                  'Is luggage storage available?',
                  'Is Wi-Fi fast for zoom calls?'
                ].map((tpl, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setQuestion(tpl)}
                    style={{
                      padding: '0.35rem 0.65rem',
                      borderRadius: '12px',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg)',
                      color: 'var(--color-text-muted)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    + {tpl}
                  </button>
                ))}
              </div>

              {/* Textarea */}
              <textarea
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Type your message to the host here..."
                required
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '14px',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text-main)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  outline: 'none',
                  resize: 'none'
                }}
              />

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem', borderRadius: 'var(--radius-pill)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Send size={16} />
                <span>Send Message to Host</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
