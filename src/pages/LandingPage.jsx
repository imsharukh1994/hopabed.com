import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin, ShieldCheck, Heart, Sparkles, ArrowRight, Building2, Cpu, CheckCircle2, Star } from 'lucide-react';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', paddingBottom: '3rem' }}>
      {/* HERO BANNER SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '600px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem 6.5rem 1.5rem',
        backgroundImage: 'linear-gradient(180deg, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0.85) 100%), url("https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '960px', width: '100%', textIndent: 0, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.75rem', zIndex: 2 }}>
          {/* Top Protocol Tagline Badge */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: 'rgba(255, 255, 255, 0.18)', 
            backdropFilter: 'blur(10px)', 
            padding: '0.45rem 1.25rem', 
            borderRadius: 'var(--radius-pill)', 
            width: 'fit-content', 
            margin: '0 auto', 
            fontSize: '0.88rem', 
            fontWeight: 800,
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <Sparkles size={16} color="var(--color-yellow)" />
            <span>The Open Accommodation Protocol for Extreme-Budget Stays</span>
          </div>

          {/* Main Title Heading */}
          <h1 style={{ 
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', 
            color: '#FFFFFF', 
            textShadow: '0 4px 20px rgba(0,0,0,0.5)', 
            fontWeight: 900, 
            lineHeight: 1.15,
            letterSpacing: '-1px'
          }}>
            Find a bed anywhere in the world, <br />
            <span style={{ color: 'var(--color-yellow)', textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>for the price of a coffee.</span>
          </h1>

          <p style={{ 
            fontSize: '1.2rem', 
            color: '#F1F5F9', 
            maxWidth: '680px', 
            margin: '0 auto', 
            textShadow: '0 2px 6px rgba(0,0,0,0.6)', 
            lineHeight: 1.5,
            fontWeight: 500
          }}>
            The world's largest open-source ultra-low-cost accommodation network. Stays from $1/night shared by verified hosts, budget hostels, and service-share stays.
          </p>

          {/* SEARCH WIDGET FLOATING CARD */}
          <form 
            onSubmit={handleSubmitSearch}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-pill)',
              padding: '0.65rem 0.75rem 0.65rem 1.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              boxShadow: '0 20px 45px rgba(0,0,0,0.35)',
              maxWidth: '880px',
              width: '100%',
              margin: '1.5rem auto 0 auto',
              flexWrap: 'wrap',
              color: 'var(--color-text-main)'
            }}
          >
            {/* 1. Location Input */}
            <div style={{ flex: 1.2, minWidth: '180px', display: 'flex', flexDirection: 'column', textIndent: 0, textAlign: 'left' }}>
              <label style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>WHERE ARE YOU GOING?</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, country or region"
                style={{ border: 'none', outline: 'none', fontWeight: 800, fontSize: '1rem', color: 'var(--color-text-main)', background: 'transparent' }}
              />
            </div>

            <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--color-border)' }} className="hide-mobile"></div>

            {/* 2. Check-in Date */}
            <div style={{ minWidth: '120px', display: 'flex', flexDirection: 'column', textIndent: 0, textAlign: 'left' }}>
              <label style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>CHECK-IN</label>
              <input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                style={{ border: 'none', outline: 'none', fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-text-main)', background: 'transparent' }}
              />
            </div>

            <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--color-border)' }} className="hide-mobile"></div>

            {/* 3. Check-out Date */}
            <div style={{ minWidth: '120px', display: 'flex', flexDirection: 'column', textIndent: 0, textAlign: 'left' }}>
              <label style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>CHECK-OUT</label>
              <input 
                type="date" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                style={{ border: 'none', outline: 'none', fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-text-main)', background: 'transparent' }}
              />
            </div>

            <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--color-border)' }} className="hide-mobile"></div>

            {/* 4. Guests Selector */}
            <div style={{ minWidth: '95px', display: 'flex', flexDirection: 'column', textIndent: 0, textAlign: 'left' }}>
              <label style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>GUESTS</label>
              <select 
                value={guests} 
                onChange={(e) => setGuests(Number(e.target.value))}
                style={{ border: 'none', outline: 'none', fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-text-main)', background: 'transparent', cursor: 'pointer' }}
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
              </select>
            </div>

            {/* 5. CTA Button on Far Right */}
            <button type="submit" className="btn-primary" style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
              <Search size={20} />
              <span>Search Beds</span>
            </button>
          </form>
        </div>
      </section>

      {/* METRICS FLOATING CARD ROW */}
      <section className="container" style={{ marginTop: '-4.5rem', position: 'relative', zIndex: 10 }}>
        <div style={{ 
          backgroundColor: 'var(--color-surface)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '2rem 1.5rem', 
          boxShadow: 'var(--shadow-lg)', 
          border: '1px solid var(--color-border)',
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', 
          gap: '1.5rem', 
          textAlign: 'center' 
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1 }}>100%</span>
            <span style={{ color: 'var(--color-text-main)', fontSize: '0.92rem', fontWeight: 800 }}>Zero Host Commission</span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Hosts keep 100% of room rate</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-teal)', lineHeight: 1 }}>$1.4M+</span>
            <span style={{ color: 'var(--color-text-main)', fontSize: '0.92rem', fontWeight: 800 }}>Saved for Backpackers</span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Ultra-budget prices guaranteed</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#D97706', lineHeight: 1 }}>50+</span>
            <span style={{ color: 'var(--color-text-main)', fontSize: '0.92rem', fontWeight: 800 }}>Pilot Cities & Nodes</span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Global federated network</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-primary)', lineHeight: 1, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              4.8 <Star size={24} fill="var(--color-yellow)" color="var(--color-yellow)" />
            </span>
            <span style={{ color: 'var(--color-text-main)', fontSize: '0.92rem', fontWeight: 800 }}>Community Rating</span>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.78rem' }}>Verified host feedback</span>
          </div>
        </div>
      </section>

      {/* POPULAR DESTINATIONS GRID */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Popular Destinations</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Explore top budget travel hubs across the global BedHopper network</p>
          </div>
          <button 
            onClick={() => onSearch({ location: '' })}
            style={{ color: 'var(--color-primary)', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
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
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 65%)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: '#FFFFFF'
              }}>
                <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 900 }}>{dest.name}</h3>
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
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>How BedHopper Works</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem' }}>The extreme-budget marketplace built on trust and open infrastructure</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', textAlign: 'center', alignItems: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.5rem' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Search & Filter by Price</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Sort beds strictly by lowest total price. Compare verified couches, shared dorm beds, private rooms, and free service-share stays.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', textAlign: 'center', alignItems: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-teal-light)', color: 'var(--color-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.5rem' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Verify with Trust Passport</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                Identity verification and reviews travel with you. Carry a single portable Trust Passport badge across any federated node globally.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', textAlign: 'center', alignItems: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-yellow-light)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.5rem' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Book Safely or Service-Share</h3>
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
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Featured Low-Cost Beds</h2>
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
      <section className="container">
        <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '3.5rem 3rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <span className="badge-price" style={{ width: 'fit-content' }}>100% Host Retention</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, lineHeight: 1.25 }}>Monetize Spare Spaces & Unsold Hostel Beds</h2>
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
                  <span>Become a Host</span>
                  <ArrowRight size={18} />
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
        </div>
      </section>

      {/* OPEN PROTOCOL SECTION */}
      <section style={{ backgroundColor: '#0F172A', color: '#FFFFFF', padding: '4.5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', alignItems: 'center' }}>
          <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '340px', boxShadow: '0 12px 35px rgba(0,0,0,0.5)' }}>
            <img src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1000&q=80" alt="Global Network" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)' }}>
              <Cpu size={22} />
              <span style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.5px' }}>Public Infrastructure</span>
            </div>
            <h2 style={{ fontSize: '2.2rem', color: '#FFFFFF', fontWeight: 900, lineHeight: 1.25 }}>Run a BedHopper Node for Your City or Community</h2>
            <p style={{ color: '#94A3B8', fontSize: '0.98rem', lineHeight: 1.6 }}>
              BedHopper is an open protocol released under the MIT license. Universities, hostel chains, NGOs, and municipal housing collectives can run self-hosted instances that federate globally.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <button className="btn-primary" onClick={() => onNavigate('protocol')}>
                <span>Read Protocol Blueprint</span>
                <ArrowRight size={18} />
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
