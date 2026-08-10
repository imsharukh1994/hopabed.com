import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin, ShieldCheck, Heart, Sparkles, ArrowRight, Building2, Cpu, CheckCircle2, Star, Quote } from 'lucide-react';
import ListingCard from '../components/ListingCard';

export default function LandingPage({ 
  destinations, 
  featuredListings, 
  onSearch, 
  onSelectListing, 
  onDestinationClick,
  onNavigate 
}) {
  const [location, setLocation] = useState('Bangkok');
  const [checkIn, setCheckIn] = useState('2026-08-12');
  const [checkOut, setCheckOut] = useState('2026-08-14');
  const [guests, setGuests] = useState(1);

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    onSearch({ location, checkIn, checkOut, guests });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '2rem' }}>
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '520px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.75)), url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'var(--shadow-lg)',
        color: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '900px', width: '100%', textIndent: 0, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem', zIndex: 2 }}>
          {/* Tagline Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(8px)', padding: '0.45rem 1.1rem', borderRadius: 'var(--radius-pill)', width: 'fit-content', margin: '0 auto', fontSize: '0.9rem', fontWeight: 800 }}>
            <Sparkles size={16} color="var(--color-yellow)" />
            <span>The Open Accommodation Protocol for Low-Cost Stays</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', color: '#FFFFFF', textShadow: '0 2px 10px rgba(0,0,0,0.4)', fontWeight: 900, lineHeight: 1.15 }}>
            Find a safe bed anywhere in the world, <br />
            <span style={{ color: 'var(--color-yellow)' }}>for the price of a coffee.</span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: '#F1F5F9', maxWidth: '640px', margin: '0 auto', textShadow: '0 1px 4px rgba(0,0,0,0.5)', lineHeight: 1.5 }}>
            The world's largest open-source extreme-budget marketplace. From $1/night. Shared by verified hosts, budget hostels, and service-share stays.
          </p>

          {/* SEARCH WIDGET CARD */}
          <form 
            onSubmit={handleSubmitSearch}
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.65rem 0.75rem 0.65rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
              maxWidth: '840px',
              width: '100%',
              margin: '1.25rem auto 0 auto',
              flexWrap: 'wrap',
              color: 'var(--color-text-main)'
            }}
          >
            {/* Location Input */}
            <div style={{ flex: 1, minWidth: '180px', display: 'flex', flexDirection: 'column', textIndent: 0, textAlign: 'left' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Where are you going?</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, country or region"
                style={{ border: 'none', outline: 'none', fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-main)', background: 'transparent' }}
              />
            </div>

            <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--color-border)' }} className="hide-mobile"></div>

            {/* Check-in */}
            <div style={{ minWidth: '120px', display: 'flex', flexDirection: 'column', textIndent: 0, textAlign: 'left' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Check-in</label>
              <input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                style={{ border: 'none', outline: 'none', fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-text-main)', background: 'transparent' }}
              />
            </div>

            <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--color-border)' }} className="hide-mobile"></div>

            {/* Check-out */}
            <div style={{ minWidth: '120px', display: 'flex', flexDirection: 'column', textIndent: 0, textAlign: 'left' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Check-out</label>
              <input 
                type="date" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                style={{ border: 'none', outline: 'none', fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-text-main)', background: 'transparent' }}
              />
            </div>

            <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--color-border)' }} className="hide-mobile"></div>

            {/* Guests */}
            <div style={{ minWidth: '90px', display: 'flex', flexDirection: 'column', textIndent: 0, textAlign: 'left' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Guests</label>
              <select 
                value={guests} 
                onChange={(e) => setGuests(Number(e.target.value))}
                style={{ border: 'none', outline: 'none', fontWeight: 700, fontSize: '0.92rem', color: 'var(--color-text-main)', background: 'transparent' }}
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
              </select>
            </div>

            {/* CTA Button */}
            <button type="submit" className="btn-primary" style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem' }}>
              <Search size={20} />
              <span>Search Beds</span>
            </button>
          </form>
        </div>
      </section>

      {/* METRICS STAT BAR */}
      <section style={{ backgroundColor: 'var(--color-surface)', borderY: '1px solid var(--color-border)', padding: '2rem 0', boxShadow: 'var(--shadow-sm)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-primary)' }}>100%</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>Zero Host Booking Commission</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-teal)' }}>$1.4M+</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>Saved for Budget Travelers</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#D97706' }}>50+</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>Pilot Cities & Federated Nodes</p>
          </div>
          <div>
            <h3 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-primary)' }}>4.8 ★</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>Average Community Rating</p>
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem' }}>Popular Destinations</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Explore top budget travel hubs across the global BedHopper network</p>
          </div>
          <button 
            onClick={() => onSearch({ location: '' })}
            style={{ color: 'var(--color-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            View all destinations <ArrowRight size={16} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '1.25rem'
        }}>
          {destinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onDestinationClick(dest.name)}
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                position: 'relative',
                height: '200px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'var(--transition)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 65%)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: '#FFFFFF'
              }}>
                <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 800 }}>{dest.name}</h3>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-yellow)', fontWeight: 800 }}>
                  From ${dest.priceFrom}/night
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS (3 STEPS) */}
      <section style={{ backgroundColor: 'var(--color-surface)', padding: '4rem 0', borderY: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>How BedHopper Works</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem' }}>The extreme-budget marketplace built on trust and open infrastructure</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', textAlign: 'center', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.4rem' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Search & Filter by Price</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Sort beds strictly by lowest total price. Compare verified couches, shared dorm beds, private rooms, and free service-share stays.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', textAlign: 'center', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-teal-light)', color: 'var(--color-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.4rem' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Verify with Trust Passport</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Identity verification and reviews travel with you. Carry a single portable Trust Passport badge across any federated node globally.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', textAlign: 'center', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-yellow-light)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.4rem' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.25rem' }}>Book Safely or Service-Share</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Pay securely via Stripe Connect or exchange light, permitted assistance (dog walking, reception) for 100% free accommodation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS GRID */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem' }}>Featured Low-Cost Beds</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Top-rated verified stays available for immediate booking</p>
          </div>
        </div>

        <div className="grid-listings">
          {featuredListings.map((listing) => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              onClick={onSelectListing} 
            />
          ))}
        </div>
      </section>

      {/* FOR HOSTS & HOSTELS SECTION */}
      <section className="container" style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '3rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }} className="host-section-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <span className="badge-price" style={{ width: 'fit-content' }}>100% Host Retention</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900 }}>Monetize Spare Spaces & Unsold Hostel Beds</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
              Whether you have a spare couch in Bangkok or run an 80-bed hostel in Mexico City, BedHopper empowers you to list capacity with zero host commission fees.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 700 }}>
                <CheckCircle2 color="var(--color-teal)" size={20} />
                <span>Zero commission on all booking earnings</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 700 }}>
                <CheckCircle2 color="var(--color-teal)" size={20} />
                <span>Stripe Connect automated payouts directly to your bank account</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', fontWeight: 700 }}>
                <CheckCircle2 color="var(--color-teal)" size={20} />
                <span>Commercial Hostel portal option for $20/month flat</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button className="btn-primary" onClick={() => onNavigate('wizard')}>
                Become a Host <ArrowRight size={18} />
              </button>
              <button className="btn-secondary" onClick={() => onNavigate('hostel-partners')}>
                Hostel Partners Info
              </button>
            </div>
          </div>

          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '360px', boxShadow: 'var(--shadow-lg)' }}>
            <img src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80" alt="Hostel Room" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* OPEN PROTOCOL SECTION */}
      <section style={{ backgroundColor: '#0F172A', color: '#FFFFFF', padding: '4rem 0' }}>
        <div className="container protocol-section-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '320px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <img src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80" alt="Global Network" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
              <Cpu size={22} />
              <span style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.85rem' }}>Public Infrastructure</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', color: '#FFFFFF', fontWeight: 900 }}>Run a BedHopper Node for Your City or Community</h2>
            <p style={{ color: '#94A3B8', fontSize: '0.98rem', lineHeight: 1.6 }}>
              BedHopper is an open protocol released under the MIT license. Universities, hostel chains, NGOs, and municipal housing collectives can run self-hosted instances that federate globally.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button className="btn-primary" onClick={() => onNavigate('protocol')}>
                Read Protocol Blueprint <ArrowRight size={18} />
              </button>
              <a href="https://github.com/imsharukh1994/bedhopper" target="_blank" rel="noreferrer" className="btn-outline" style={{ color: '#FFFFFF', borderColor: '#334155' }}>
                GitHub Repository
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
