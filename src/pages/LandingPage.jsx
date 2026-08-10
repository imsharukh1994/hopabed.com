import React, { useState } from 'react';
import { Search, Calendar, Users, MapPin, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';
import ListingCard from '../components/ListingCard';

export default function LandingPage({ 
  destinations, 
  featuredListings, 
  onSearch, 
  onSelectListing, 
  onDestinationClick 
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingBottom: '4rem' }}>
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        minHeight: '480px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        backgroundImage: 'linear-gradient(rgba(30, 41, 59, 0.45), rgba(30, 41, 59, 0.65)), url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'var(--shadow-lg)',
        color: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '850px', width: '100%', textIndent: 0, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem', zIndex: 2 }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(8px)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-pill)', width: 'fit-content', margin: '0 auto', fontSize: '0.88rem', fontWeight: 700 }}>
            <Sparkles size={16} color="var(--color-yellow)" />
            <span>Open-Source Bed & Room Sharing Protocol</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#FFFFFF', textShadow: '0 2px 10px rgba(0,0,0,0.3)', fontWeight: 900, lineHeight: 1.15 }}>
            Find a bed anywhere in the world, <br />
            <span style={{ color: 'var(--color-yellow)' }}>for the price of a coffee.</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: '#F1F5F9', maxWidth: '600px', margin: '0 auto', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>
            The world's most affordable stays. From $1/night. Shared by verified hosts, budget hostels, and service-share stays.
          </p>

          {/* SEARCH WIDGET CARD */}
          <form 
            onSubmit={handleSubmitSearch}
            style={{
              backgroundColor: 'var(--color-surface)',
              borderRadius: 'var(--radius-pill)',
              padding: '0.6rem 0.75rem 0.6rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
              maxWidth: '800px',
              width: '100%',
              margin: '1rem auto 0 auto',
              flexWrap: 'wrap',
              color: 'var(--color-text-main)'
            }}
          >
            {/* Location Input */}
            <div style={{ flex: 1, minWidth: '160px', display: 'flex', flexDirection: 'column', textIndent: 0, textAlign: 'left' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Where are you going?</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, country or region"
                style={{ border: 'none', outline: 'none', fontWeight: 700, fontSize: '0.95rem', color: 'var(--color-text-main)', background: 'transparent' }}
              />
            </div>

            <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--color-border)' }} className="hide-mobile"></div>

            {/* Check-in */}
            <div style={{ minWidth: '110px', display: 'flex', flexDirection: 'column', textIndent: 0, textAlign: 'left' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Check-in</label>
              <input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                style={{ border: 'none', outline: 'none', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-main)', background: 'transparent' }}
              />
            </div>

            <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--color-border)' }} className="hide-mobile"></div>

            {/* Check-out */}
            <div style={{ minWidth: '110px', display: 'flex', flexDirection: 'column', textIndent: 0, textAlign: 'left' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Check-out</label>
              <input 
                type="date" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                style={{ border: 'none', outline: 'none', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-main)', background: 'transparent' }}
              />
            </div>

            <div style={{ width: '1px', height: '32px', backgroundColor: 'var(--color-border)' }} className="hide-mobile"></div>

            {/* Guests */}
            <div style={{ minWidth: '90px', display: 'flex', flexDirection: 'column', textIndent: 0, textAlign: 'left' }}>
              <label style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>Guests</label>
              <select 
                value={guests} 
                onChange={(e) => setGuests(Number(e.target.value))}
                style={{ border: 'none', outline: 'none', fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-main)', background: 'transparent' }}
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
              </select>
            </div>

            {/* CTA Button */}
            <button type="submit" className="btn-primary" style={{ padding: '0.85rem 1.6rem', fontSize: '1rem' }}>
              <Search size={18} />
              <span>Search Beds</span>
            </button>
          </form>
        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem' }}>Popular Destinations</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Explore the most searched pilot cities on BedHopper</p>
          </div>
          <button 
            onClick={() => onSearch({ location: '' })}
            style={{ color: 'var(--color-primary)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            View all <ArrowRight size={16} />
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
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
                height: '180px',
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
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)',
                padding: '0.85rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                color: '#FFFFFF'
              }}>
                <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', fontWeight: 800 }}>{dest.name}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-yellow)', fontWeight: 700 }}>
                  From ${dest.priceFrom}/night
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THREE STRATEGIC PILLARS */}
      <section style={{ backgroundColor: 'var(--color-surface)', padding: '3.5rem 0', borderY: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textIndent: 0 }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <Search size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Price-First Discovery</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
              Unlike inflated traditional OTAs, BedHopper sorts strictly by lowest total price. No hidden cleaning fees or algorithmic gouging.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textIndent: 0 }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-teal)' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Portable Trust Passport</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
              Verify your identity once and carry your verified reputation across any BedHopper node globally. Safety & accountability come standard.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textIndent: 0 }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-yellow-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
              <Heart size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Service-Share Stays</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>
              Exchange light, daily assistance (e.g. dog walking, plant care) for 100% free accommodation under strict platform safety safeguards.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED LISTINGS GRID */}
      <section className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem' }}>Featured Low-Cost Beds</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>Top-rated verified stays available for immediate booking</p>
          </div>
        </div>

        <div className="grid-listings">
          {featuredListings.slice(0, 4).map((listing) => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              onClick={onSelectListing} 
            />
          ))}
        </div>
      </section>
    </div>
  );
}
