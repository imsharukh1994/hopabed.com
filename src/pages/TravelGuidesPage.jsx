import React, { useState } from 'react';
import { Compass, DollarSign, MapPin, ShieldCheck, Utensils, Bus, Sun, ArrowRight, Star } from 'lucide-react';

export default function TravelGuidesPage({ onSearch }) {
  const [selectedCity, setSelectedCity] = useState('bangkok');

  const GUIDES = {
    bangkok: {
      title: 'Bangkok Extreme-Budget Guide: How to Survive & Thrive on $5 a Day',
      country: 'Thailand',
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80',
      dailyBudgetBreakdown: [
        { item: 'BedHopper Couch / Dorm Bed', cost: '$2.00 / night' },
        { item: 'Street Food (Pad Thai & Mango Sticky Rice)', cost: '$1.80 / day' },
        { item: 'MRT / BTS Transit Token', cost: '$0.80 / day' },
        { item: '7-Eleven Iced Coffee', cost: '$0.40 / cup' }
      ],
      topSpots: [
        { name: 'Khao San Night Market', desc: 'Cheap pad thai stalls, vibrant backpacker atmosphere, and $1 street smoothies.' },
        { name: 'Wat Arun (Temple of Dawn)', desc: 'Only 50 THB entry fee ($1.40). Best viewed from free river ferry during sunset.' },
        { name: 'Lumpini Park', desc: 'Free public park with wild monitor lizards, outdoor gyms, and free evening aerobics.' }
      ],
      safetyTips: 'Always use official meters in taxis or use Bolt/Grab. Never accept unmetered tuk-tuk flat rates!'
    },
    'mexico-city': {
      title: 'Mexico City Backpacker Guide: $10/Day Taco & Culture Itinerary',
      country: 'Mexico',
      image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=1200&q=80',
      dailyBudgetBreakdown: [
        { item: 'BedHopper Bed in Roma Norte', cost: '$5.00 / night' },
        { item: 'Tacos al Pastor Stalls (4 Tacos)', cost: '$2.50 / day' },
        { item: 'Metro Card (5 Pesos per ride)', cost: '$0.50 / day' },
        { item: 'Agua Fresca / Churros', cost: '$1.00 / day' }
      ],
      topSpots: [
        { name: 'Bosque de Chapultepec', desc: 'Huge urban park larger than Central Park. Free entry to gardens & outdoor museums.' },
        { name: 'Coyoacán Artisan Market', desc: 'Historic cobblestone streets, cheap street churros, and bohemian market crafts.' },
        { name: 'Soumaya Museum', desc: 'World-class art museum with 100% free admission 365 days a year.' }
      ],
      safetyTips: 'Use Metrobus & Metro during daylight hours. Stick to populated street taco stalls with high customer turnover!'
    }
  };

  const guide = GUIDES[selectedCity] || GUIDES.bangkok;

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Hero Banner */}
      <section style={{
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        padding: '3.5rem 1.5rem',
        borderBottom: '1px solid #1E293B'
      }}>
        <div className="container" style={{ textIndent: 0, textAlign: 'center', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-pill)', width: 'fit-content', margin: '0 auto', fontSize: '0.88rem', fontWeight: 800 }}>
            <Compass size={16} />
            <span>Extreme-Budget Backpacker Guides</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', fontWeight: 900 }}>
            Travel the World on $5 to $10 a Day
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#94A3B8', lineHeight: 1.6 }}>
            Curated insider guides, street food breakdowns, free attractions, and cheap bed recommendations written by backpackers.
          </p>

          {/* City Selector Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedCity('bangkok')}
              className={selectedCity === 'bangkok' ? 'btn-primary' : 'btn-outline'}
              style={{ color: selectedCity === 'bangkok' ? '#FFFFFF' : '#FFFFFF', borderColor: '#334155' }}
            >
              🇹🇭 Bangkok Guide ($5/day)
            </button>
            <button
              onClick={() => setSelectedCity('mexico-city')}
              className={selectedCity === 'mexico-city' ? 'btn-primary' : 'btn-outline'}
              style={{ color: selectedCity === 'mexico-city' ? '#FFFFFF' : '#FFFFFF', borderColor: '#334155' }}
            >
              🇲🇽 Mexico City Guide ($10/day)
            </button>
          </div>
        </div>
      </section>

      {/* Guide Content */}
      <section className="container" style={{ paddingTop: '3.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '2.5rem' }} className="guide-grid">
          {/* Main Article Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '320px', boxShadow: 'var(--shadow-md)' }}>
              <img src={guide.image} alt={guide.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.75rem' }}>{guide.title}</h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Traveling through {guide.country} doesn't have to drain your savings. By combining BedHopper $2–$5 beds with street food markets and public transit, you can live comfortably on a minimal daily budget.
              </p>
            </div>

            {/* Top Free & Budget Spots */}
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '1rem' }}>Top Free & Budget Attractions</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {guide.topSpots.map((spot, idx) => (
                  <div key={idx} style={{ backgroundColor: 'var(--color-surface)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                    <h4 style={{ fontSize: '1.1rem', color: 'var(--color-primary)', fontWeight: 800 }}>{spot.name}</h4>
                    <p style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', marginTop: '4px', lineHeight: 1.5 }}>{spot.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Box */}
            <div style={{ backgroundColor: 'var(--color-yellow-light)', border: '1px solid var(--color-yellow)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ color: '#B45309', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={18} /> Backpacker Safety Tip
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#78350F', marginTop: '4px' }}>{guide.safetyTips}</p>
            </div>
          </div>

          {/* Right Sidebar: Daily Budget Breakdown & Book Beds CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <DollarSign size={20} color="var(--color-teal)" /> Daily Budget Breakdown
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {guide.dailyBudgetBreakdown.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>{item.item}</span>
                    <strong style={{ color: 'var(--color-teal)' }}>{item.cost}</strong>
                  </div>
                ))}
              </div>

              <button 
                className="btn-primary" 
                onClick={() => onSearch({ location: selectedCity })}
                style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
              >
                <span>Find Beds in {selectedCity.toUpperCase()}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
