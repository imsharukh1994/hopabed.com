import React, { useState, useMemo } from 'react';
import ListingCard from '../components/ListingCard';
import MapComponent from '../components/MapComponent';
import AdBanner from '../components/AdBanner';
import { SlidersHorizontal, Map, List, ShieldCheck, Sparkles, Filter, Navigation, Compass } from 'lucide-react';
import { formatPrice } from '../utils/currency';

export default function SearchResultsPage({ listings = [], onSelectListing, initialQuery = '', selectedCurrency = 'USD' }) {
  const [searchLocation, setSearchLocation] = useState(initialQuery || 'Bangkok');
  const [selectedType, setSelectedType] = useState('all');
  const [maxPrice, setMaxPrice] = useState(25);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [serviceShareOnly, setServiceShareOnly] = useState(false);
  const [sortBy, setSortBy] = useState('price-low');
  const [mobileView, setMobileView] = useState('list');
  const [activeListingOnMap, setActiveListingOnMap] = useState(null);
  
  // Geolocation & Radius Filter
  const [radiusKm, setRadiusKm] = useState(25);
  const [userCoords, setUserCoords] = useState(null);
  const [locating, setLocating] = useState(false);

  // Near Me Trigger
  const handleNearMe = () => {
    setLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserCoords([pos.coords.latitude, pos.coords.longitude]);
          setSearchLocation('Near Me');
          setLocating(false);
        },
        () => {
          setUserCoords([13.756331, 100.501765]);
          setSearchLocation('Bangkok (Near Me)');
          setLocating(false);
        }
      );
    } else {
      setLocating(false);
    }
  };

  // Filter & Sort Logic
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // Location match
      if (searchLocation && searchLocation !== 'Near Me' && !searchLocation.includes('Near Me')) {
        const queryLower = searchLocation.toLowerCase();
        const cityMatch = item.city?.toLowerCase().includes(queryLower);
        const countryMatch = item.country?.toLowerCase().includes(queryLower);
        if (!cityMatch && !countryMatch) return false;
      }
      // Type match
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }
      // Price match
      if (!item.isServiceShare && item.pricePerNight > maxPrice) {
        return false;
      }
      // Verified only
      if (verifiedOnly && !item.host?.isVerified) {
        return false;
      }
      // Service Share only
      if (serviceShareOnly && !item.isServiceShare) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.pricePerNight - b.pricePerNight;
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [listings, searchLocation, selectedType, maxPrice, verifiedOnly, serviceShareOnly, sortBy]);

  // Center coordinates based on current city
  const mapCenter = useMemo(() => {
    if (userCoords) return userCoords;
    if (filteredListings.length > 0 && filteredListings[0].lat) {
      return [filteredListings[0].lat, filteredListings[0].lng];
    }
    return [13.756331, 100.501765];
  }, [filteredListings, userCoords]);

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingTop: '1rem', paddingBottom: '3rem' }}>
      {/* FILTER & CONTROL BAR */}
      <div style={{
        backgroundColor: 'var(--color-surface, #1e293b)',
        borderRadius: '16px',
        padding: '1.25rem',
        border: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Top Search Input + Near Me + View Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
            <input 
              type="text" 
              value={searchLocation} 
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Search destination (e.g. Bangkok, Tokyo, Lisbon)..."
              style={{
                width: '100%',
                padding: '0.65rem 1.2rem',
                borderRadius: '24px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text-main)',
                fontWeight: 700,
                outline: 'none'
              }}
            />

            <button
              onClick={handleNearMe}
              style={{
                padding: '0.65rem 1.2rem',
                borderRadius: '24px',
                backgroundColor: '#0284c7',
                border: 'none',
                color: '#fff',
                fontSize: '0.85rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Navigation size={15} /> {locating ? 'Locating...' : 'Near Me'}
            </button>
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--color-text-muted)' }}>Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.5rem 0.8rem',
                borderRadius: '20px',
                border: '1px solid var(--color-border)',
                fontWeight: 700,
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text-main)',
                cursor: 'pointer'
              }}
            >
              <option value="price-low">Lowest Total Price First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>
            <Filter size={14} /> Filters:
          </div>

          {/* Type Filter Buttons */}
          {[
            { id: 'all', label: 'All Stays' },
            { id: 'couch', label: 'Couch Space' },
            { id: 'dorm', label: 'Dorm Bed' },
            { id: 'private', label: 'Private Room' },
            { id: 'service-share', label: 'Service-Share (FREE)' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: '1px solid',
                borderColor: selectedType === t.id ? '#0284c7' : 'var(--color-border)',
                backgroundColor: selectedType === t.id ? '#0284c7' : 'var(--color-bg)',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              {t.label}
            </button>
          ))}

          {/* Verified Toggle Chip */}
          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            style={{
              padding: '0.4rem 0.85rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: 700,
              border: '1px solid',
              borderColor: verifiedOnly ? '#10b981' : 'var(--color-border)',
              backgroundColor: verifiedOnly ? '#059669' : 'var(--color-bg)',
              color: '#fff',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer'
            }}
          >
            <ShieldCheck size={14} /> Verified Hosts Only
          </button>

          {/* Radius Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
            <Compass size={14} /> Radius:
            <select
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              style={{
                padding: '0.3rem 0.6rem',
                borderRadius: '12px',
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-main)',
                fontSize: '0.8rem',
                fontWeight: 700
              }}
            >
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={25}>25 km</option>
              <option value={50}>50 km</option>
            </select>
          </div>
        </div>
      </div>

      {/* SPLIT VIEW (LIST & MAP) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 450px', gap: '1.5rem', minHeight: '600px' }} className="split-view-container">
        {/* Left Column: Listings Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="listings-column">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 800, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Showing {filteredListings.length} beds available in {searchLocation || 'Global Nodes'}
            </span>
          </div>

          {filteredListings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', backgroundColor: 'var(--color-surface)', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '18px', color: 'var(--color-text-main)' }}>No beds found matching your filters</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', fontSize: '14px' }}>Try adjusting your price slider or location query.</p>
              <button 
                className="btn-primary" 
                style={{ marginTop: '1rem', padding: '10px 20px', borderRadius: '12px' }} 
                onClick={() => { setSelectedType('all'); setMaxPrice(25); setVerifiedOnly(false); setSearchLocation(''); }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid-listings" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                {filteredListings.slice(0, 4).map(listing => (
                  <div 
                    key={listing.id} 
                    onMouseEnter={() => setActiveListingOnMap(listing)}
                  >
                    <ListingCard 
                      listing={listing} 
                      onClick={onSelectListing} 
                      selectedCurrency={selectedCurrency}
                    />
                  </div>
                ))}
              </div>

              {filteredListings.length > 4 && (
                <div className="grid-listings" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
                  {filteredListings.slice(4).map(listing => (
                    <div 
                      key={listing.id} 
                      onMouseEnter={() => setActiveListingOnMap(listing)}
                    >
                      <ListingCard 
                        listing={listing} 
                        onClick={onSelectListing} 
                        selectedCurrency={selectedCurrency}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column: Map Component + Sidebar Ad */}
        <div style={{ 
          position: 'sticky', 
          top: '90px', 
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }} className="map-column">
          <div style={{ height: '360px' }}>
            <MapComponent 
              listings={filteredListings}
              selectedListing={activeListingOnMap}
              onSelectListing={onSelectListing}
              center={mapCenter}
              zoom={12}
              selectedCurrency={selectedCurrency}
              radiusKm={radiusKm}
            />
          </div>

          {/* GOOGLE ADS SLOT 2 */}
          <AdBanner slot={2} />
        </div>
      </div>
    </div>
  );
}
