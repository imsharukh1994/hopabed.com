import React, { useState } from 'react';
import { Star, ShieldCheck, Heart, MapPin, Share2, CheckCircle, Wifi, Coffee, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import ServiceShareModal from '../components/ServiceShareModal';

export default function ListingDetailPage({ listing, onBack, onBook }) {
  const [checkInDate, setCheckInDate] = useState('2026-08-12');
  const [checkOutDate, setCheckOutDate] = useState('2026-08-14');
  const [guestsCount, setGuestsCount] = useState(1);
  const [showServiceShareModal, setShowServiceShareModal] = useState(false);

  if (!listing) return null;

  const nights = 2;
  const nightlyTotal = listing.pricePerNight * nights;
  const platformFee = listing.isServiceShare ? 0 : Number((nightlyTotal * 0.08).toFixed(2));
  const totalPrice = Number((nightlyTotal + platformFee).toFixed(2));

  const handleBookingClick = () => {
    if (listing.isServiceShare) {
      setShowServiceShareModal(true);
    } else {
      onBook(listing, { checkInDate, checkOutDate, guestsCount, totalPrice });
    }
  };

  const handleAgreementSigned = (agreementData) => {
    setShowServiceShareModal(false);
    onBook(listing, { 
      checkInDate, 
      checkOutDate, 
      guestsCount, 
      totalPrice: 0,
      serviceShareAgreement: agreementData 
    });
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Back Button */}
      <button 
        onClick={onBack} 
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontWeight: 700, width: 'fit-content' }}
      >
        <ArrowLeft size={18} /> Back to Search Results
      </button>

      {/* Title Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge-price">${listing.pricePerNight}/night</span>
            {listing.isServiceShare && <span className="badge-service-share"><Sparkles size={13} /> Service-Share Stay</span>}
            <span className="badge-verified"><ShieldCheck size={13} /> Verified Host</span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 900 }}>{listing.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Star size={16} fill="var(--color-yellow)" color="var(--color-yellow)" />
              <span style={{ fontWeight: 800, color: 'var(--color-text-main)' }}>{listing.rating}</span>
              <span>({listing.reviewsCount} reviews)</span>
            </div>
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <MapPin size={15} />
              <span>{listing.address}, {listing.city}, {listing.country} ({listing.distFromCenter} from center)</span>
            </div>
          </div>
        </div>

        {/* Share & Save Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
            <Share2 size={16} /> Share
          </button>
          <button className="btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
            <Heart size={16} /> Save
          </button>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '0.75rem',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        maxHeight: '420px'
      }}>
        <img 
          src={listing.images[0]} 
          alt={listing.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {listing.images.slice(1, 3).map((img, idx) => (
            <img 
              key={idx} 
              src={img} 
              alt="Listing room detail" 
              style={{ width: '100%', height: 'calc(50% - 0.375rem)', objectFit: 'cover' }}
            />
          ))}
        </div>
      </div>

      {/* Main Content & Sticky Booking Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem', marginTop: '1rem' }} className="detail-split-container">
        {/* Left Side: Host, Description, Service-Share, Amenities */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Host Profile Card */}
          <div style={{
            backgroundColor: 'var(--color-surface)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <img 
              src={listing.host?.avatar} 
              alt={listing.host?.name} 
              style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--color-primary)' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem' }}>Hosted by {listing.host?.name}</h3>
                {listing.host?.isVerified && (
                  <span className="badge-verified">
                    <ShieldCheck size={13} /> Verified Host
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Response rate: <strong>{listing.host?.responseRate}</strong> • Joined {listing.host?.joinedDate}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', marginTop: '0.25rem' }}>
                "{listing.host?.bio}"
              </p>
            </div>
          </div>

          {/* Service-Share Callout Box if applicable */}
          {listing.isServiceShare && listing.serviceShareDetails && (
            <div style={{
              backgroundColor: 'var(--color-teal-light)',
              border: '2px solid var(--color-teal)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-teal)', fontWeight: 800 }}>
                <Sparkles size={20} />
                <h3 style={{ color: 'var(--color-teal)', fontSize: '1.15rem' }}>Service-Share Stay Requirements</h3>
              </div>
              <p style={{ fontSize: '0.95rem' }}>
                <strong>Task Expected:</strong> {listing.serviceShareDetails.taskDescription}
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.88rem', color: 'var(--color-teal-dark)' }}>
                <span>⏰ <strong>Hours:</strong> {listing.serviceShareDetails.hoursPerDay}</span>
                <span>🔒 <strong>Deposit:</strong> {listing.serviceShareDetails.depositRequired}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                ℹ️ {listing.serviceShareDetails.prohibitedTasks}
              </p>
            </div>
          )}

          {/* About this place */}
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>About this space</h3>
            <p style={{ color: 'var(--color-text-main)', lineHeight: 1.6, fontSize: '0.98rem' }}>
              Clean, quiet, and friendly space optimized for budget travelers and backpackers. Located in a safe neighborhood close to public transit, local street food markets, and cafes. High-speed Wi-Fi is provided for digital nomads.
            </p>
          </div>

          {/* Amenities Grid */}
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>What this place offers</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
              {listing.amenities?.map((amenity, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem', color: 'var(--color-text-main)' }}>
                  <CheckCircle size={18} color="var(--color-teal)" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* House Rules */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>House Rules</h3>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {listing.houseRules?.map((rule, idx) => (
                <li key={idx} style={{ fontSize: '0.92rem' }}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Sticky Price & Booking Card */}
        <div style={{ position: 'sticky', top: '90px', height: 'fit-content' }}>
          <div style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {/* Pricing Header */}
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              {listing.isServiceShare ? (
                <div>
                  <span style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-teal)' }}>FREE</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginLeft: '6px' }}>stay / night</span>
                </div>
              ) : (
                <div>
                  <span style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-primary)' }}>
                    {listing.currency}{listing.pricePerNight}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}> / night</span>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', fontWeight: 800 }}>
                <Star size={15} fill="var(--color-yellow)" color="var(--color-yellow)" />
                <span>{listing.rating}</span>
              </div>
            </div>

            {/* Date Picker inputs */}
            <div style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ padding: '0.6rem 0.8rem', backgroundColor: 'var(--color-bg)' }}>
                  <label style={{ fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>CHECK-IN</label>
                  <input 
                    type="date" 
                    value={checkInDate} 
                    onChange={(e) => setCheckInDate(e.target.value)}
                    style={{ width: '100%', border: 'none', background: 'transparent', fontWeight: 700, outline: 'none', fontSize: '0.85rem' }} 
                  />
                </div>
                <div style={{ padding: '0.6rem 0.8rem', backgroundColor: 'var(--color-bg)', borderLeft: '1px solid var(--color-border)' }}>
                  <label style={{ fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>CHECKOUT</label>
                  <input 
                    type="date" 
                    value={checkOutDate} 
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    style={{ width: '100%', border: 'none', background: 'transparent', fontWeight: 700, outline: 'none', fontSize: '0.85rem' }} 
                  />
                </div>
              </div>

              <div style={{ padding: '0.6rem 0.8rem', backgroundColor: 'var(--color-surface)' }}>
                <label style={{ fontSize: '0.68rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>GUESTS</label>
                <select 
                  value={guestsCount} 
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  style={{ width: '100%', border: 'none', background: 'transparent', fontWeight: 700, outline: 'none', fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                </select>
              </div>
            </div>

            {/* Price Calculation Breakdown */}
            {!listing.isServiceShare && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.92rem', color: 'var(--color-text-muted)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{listing.currency}{listing.pricePerNight} x {nights} nights</span>
                  <span>{listing.currency}{nightlyTotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    BedHopper Platform Fee (8%)
                  </span>
                  <span>{listing.currency}{platformFee.toFixed(2)}</span>
                </div>
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.6rem', display: 'flex', justifyContent: 'space-between', fontWeight: 900, color: 'var(--color-text-main)', fontSize: '1.1rem' }}>
                  <span>Total (incl. taxes)</span>
                  <span style={{ color: 'var(--color-primary)' }}>{listing.currency}{totalPrice.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* CTA Button */}
            <button 
              className="btn-primary" 
              style={{ width: '100%', padding: '0.9rem', fontSize: '1.05rem', borderRadius: 'var(--radius-pill)' }}
              onClick={handleBookingClick}
            >
              {listing.isServiceShare ? 'Apply for Service-Share' : 'Request to Book'}
            </button>

            <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', textIndent: 0, textAlign: 'center' }}>
              🔒 Powered by BedHopper Trust Protocol & Stripe Connect
            </p>
          </div>
        </div>
      </div>

      {/* Service-Share Agreement Modal */}
      {showServiceShareModal && (
        <ServiceShareModal 
          listing={listing}
          onClose={() => setShowServiceShareModal(false)}
          onAgreementSigned={handleAgreementSigned}
        />
      )}
    </div>
  );
}
