import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin, ShieldCheck, Heart, Sparkles, ArrowRight, Building2, Cpu, CheckCircle2, Star, BookOpen } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import HostCalculator from '../components/HostCalculator';
import AdBanner from '../components/AdBanner';
import FlashDealsBanner from '../components/FlashDealsBanner';
import { formatPrice } from '../utils/currency';

export default function LandingPage({ 
  destinations = [], 
  featuredListings = [], 
  onSearch, 
  onSelectListing, 
  onDestinationClick,
  onOpenCityGuide,
  onNavigate,
  selectedCurrency = 'USD'
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '4rem' }}>
      {/* HERO BANNER SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '520px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4.5rem 1.5rem 6.5rem 1.5rem',
        backgroundImage: 'linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.9) 100%), url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '980px', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem', zIndex: 2 }}>
          {/* Protocol Tagline Badge */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: 'rgba(255, 255, 255, 0.15)', 
            backdropFilter: 'blur(12px)', 
            padding: '0.45rem 1.25rem', 
            borderRadius: 'var(--radius-pill)', 
            width: 'fit-content', 
            margin: '0 auto', 
            fontSize: '0.85rem', 
            fontWeight: 800,
            border: '1px solid rgba(255, 255, 255, 0.25)'
          }}>
            <Sparkles size={16} color="#fbbf24" />
            <span>The Open Accommodation Protocol for Extreme-Budget Stays</span>
          </div>

          {/* Main Title Heading */}
          <h1 style={{ 
            fontSize: 'clamp(2.4rem, 5vw, 4rem)', 
            color: '#FFFFFF', 
            textShadow: '0 4px 20px rgba(0,0,0,0.6)', 
            fontWeight: 900, 
            lineHeight: 1.15,
            letterSpacing: '-0.5px'
          }}>
            Find a bed anywhere in the world, <br />
            <span style={{ color: '#fbbf24' }}>for the price of a coffee.</span>
          </h1>

          <p style={{ 
            fontSize: '1.15rem', 
            color: '#F1F5F9', 
            maxWidth: '680px', 
            margin: '0 auto', 
            lineHeight: 1.5,
            fontWeight: 500
          }}>
            The world's largest open-source ultra-low-cost accommodation network. Stays from $1/night shared by verified hosts, budget hostels, and service-share stays.
          </p>

          {/* SEARCH WIDGET FLOATING BAR */}
          <form 
            onSubmit={handleSubmitSearch}
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.4rem 0.5rem 0.4rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border)',
              maxWidth: '920px',
              width: '100%',
              margin: '1.5rem auto 0 auto',
              color: 'var(--color-text-main)'
            }}
          >
            {/* 1. Location Input */}
            <div style={{ flex: 1.4, display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: '140px' }}>
              <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>WHERE ARE YOU GOING?</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, country or region"
                style={{ border: 'none', outline: 'none', fontWeight: 800, fontSize: '0.92rem', color: 'var(--color-text-main)', background: 'transparent', width: '100%' }}
              />
            </div>

            <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--color-border)' }} className="desktop-nav"></div>

            {/* 2. Check-in Date */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: '110px' }}>
              <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>CHECK-IN</label>
              <input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                style={{ border: 'none', outline: 'none', fontWeight: 800, fontSize: '0.85rem', color: 'var(--color-text-main)', background: 'transparent', width: '100%' }}
              />
            </div>

            <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--color-border)' }} className="desktop-nav"></div>

            {/* 3. Check-out Date */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: '110px' }}>
              <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>CHECK-OUT</label>
              <input 
                type="date" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                style={{ border: 'none', outline: 'none', fontWeight: 800, fontSize: '0.85rem', color: 'var(--color-text-main)', background: 'transparent', width: '100%' }}
              />
            </div>

            <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--color-border)' }} className="desktop-nav"></div>

            {/* 4. Guests Selector */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', textAlign: 'left', minWidth: '100px' }}>
              <label style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.5px' }}>GUESTS</label>
              <select 
                value={guests} 
                onChange={(e) => setGuests(Number(e.target.value))}
                style={{ border: 'none', outline: 'none', fontWeight: 800, fontSize: '0.85rem', color: 'var(--color-text-main)', background: 'transparent', cursor: 'pointer', width: '100%' }}
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={5}>5 Guests</option>
                <option value={6}>6 Guests</option>
                <option value={8}>8 Guests (Group)</option>
                <option value={10}>10+ Guests (Group)</option>
              </select>
            </div>

            {/* 5. CTA Button */}
            <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.4rem', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', borderRadius: 'var(--radius-pill)', marginLeft: '0.5rem' }}>
              <Search size={17} />
              <span>Search Beds</span>
            </button>
          </form>
        </div>
      </section>

      {/* METRICS HORIZONTAL ROW */}
      <section className="container" style={{ marginTop: '-4.5rem', position: 'relative', zIndex: 10 }}>
        <div className="grid-metrics-desktop" style={{ 
          backgroundColor: 'var(--color-surface)', 
          borderRadius: 'var(--radius-lg)', 
          padding: '2rem 1.5rem', 
          boxShadow: 'var(--shadow-lg)', 
          border: '1px solid var(--color-border)',
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
            <span style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--color-yellow)', lineHeight: 1 }}>50+</span>
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

      {/* TONIGHT'S FLASH DEALS BANNER */}
      <section className="container" id="flash-deals">
        <FlashDealsBanner 
          onSelectListing={onSelectListing} 
          listings={featuredListings}
          selectedCurrency={selectedCurrency}
        />
      </section>

      {/* POPULAR DESTINATIONS GRID WITH CITY GUIDES */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-text-main)' }}>Popular Destinations</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Explore top budget travel hubs & local city guides</p>
          </div>
          <button 
            onClick={() => onSearch({ location: '' })}
            style={{ color: 'var(--color-primary)', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
          >
            View all destinations <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid-destinations-desktop">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onDestinationClick(dest.name)}
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                position: 'relative',
                height: '210px',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--color-border)',
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 900, margin: 0 }}>{dest.name}</h3>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenCityGuide) onOpenCityGuide(dest.name);
                    }}
                    title={`Open ${dest.name} City Guide`}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(255,255,255,0.25)',
                      backdropFilter: 'blur(4px)',
                      color: '#fff',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <BookOpen size={12} /> Guide
                  </button>
                </div>
                <span style={{ fontSize: '0.85rem', color: '#fbbf24', fontWeight: 800, marginTop: '2px' }}>
                  From {formatPrice(dest.priceFrom, selectedCurrency)}/night
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* GOOGLE ADS SLOT 1 */}
        <AdBanner slot={1} />
      </section>

      {/* HOW IT WORKS (3 STEPS) */}
      <section style={{ backgroundColor: 'var(--color-bg-alt)', padding: '4rem 0', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>How hopabed.com Works</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.98rem' }}>The extreme-budget marketplace built on trust and open infrastructure</p>
          </div>

          <div className="grid-features-desktop">
            <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem 1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.4rem' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Search & Filter by Price</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Sort beds strictly by lowest total price. Compare verified couches, shared dorm beds, private rooms, and free service-share stays.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem 1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-teal-light)', color: 'var(--color-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.4rem' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Verify with Trust Passport</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Identity verification and reviews travel with you. Carry a single portable Trust Passport badge across any federated node globally.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem 1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: 'var(--color-yellow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.4rem' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-text-main)' }}>Book Safely or Service-Share</h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
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
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-text-main)' }}>Featured Low-Cost Beds</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Top-rated verified stays available for immediate booking</p>
          </div>
        </div>

        <div className="grid-listings-desktop">
          {featuredListings.slice(0, 8).map((listing) => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              onClick={onSelectListing} 
              selectedCurrency={selectedCurrency}
            />
          ))}
        </div>
      </section>

      {/* FOR HOSTS CALCULATOR */}
      <section className="container">
        <HostCalculator onStartHosting={() => onNavigate('wizard')} />
      </section>
    </div>
  );
}
