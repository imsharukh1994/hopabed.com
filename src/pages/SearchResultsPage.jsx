import React, { useState, useMemo } from 'react';
import ListingCard from '../components/ListingCard';
import MapComponent from '../components/MapComponent';
import { SlidersHorizontal, Map, List, ShieldCheck, Sparkles, Filter } from 'lucide-react';

export default function SearchResultsPage({ listings, onSelectListing, initialQuery = '' }) {
  const [searchLocation, setSearchLocation] = useState(initialQuery || 'Bangkok');
  const [selectedType, setSelectedType] = useState('all');
  const [maxPrice, setMaxPrice] = useState(20);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [serviceShareOnly, setServiceShareOnly] = useState(false);
  const [sortBy, setSortBy] = useState('price-low');
  const [mobileView, setMobileView] = useState('list'); // 'list' or 'map'
  const [activeListingOnMap, setActiveListingOnMap] = useState(null);

  // Filter & Sort Logic
  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      // Location match
      if (searchLocation && !item.city.toLowerCase().includes(searchLocation.toLowerCase()) && !item.country.toLowerCase().includes(searchLocation.toLowerCase())) {
        return false;
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
    if (filteredListings.length > 0) {
      return [filteredListings[0].lat, filteredListings[0].lng];
    }
    return [13.756331, 100.501765]; // Bangkok fallback
  }, [filteredListings]);

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', paddingTop: '1rem', paddingBottom: '3rem' }}>
      {/* FILTER & CONTROL BAR */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
        border: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* Top Search Input + View Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '240px' }}>
            <input 
              type="text" 
              value={searchLocation} 
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Search destination (e.g. Bangkok, Mexico City)"
              style={{
                width: '100%',
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--color-border)',
                fontWeight: 700,
                outline: 'none'
              }}
            />
          </div>

          {/* Sort Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--color-text-muted)' }}>Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.5rem 0.8rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--color-border)',
                fontWeight: 700,
                backgroundColor: 'var(--color-surface)',
                cursor: 'pointer'
              }}
            >
              <option value="price-low">Lowest Total Price First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* Mobile Map / List Toggle Button */}
          <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--color-bg)', padding: '3px', borderRadius: 'var(--radius-pill)' }} className="mobile-toggle-btn">
            <button 
              onClick={() => setMobileView('list')}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.8rem',
                backgroundColor: mobileView === 'list' ? 'var(--color-surface)' : 'transparent',
                boxShadow: mobileView === 'list' ? 'var(--shadow-sm)' : 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <List size={14} /> List
            </button>
            <button 
              onClick={() => setMobileView('map')}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.8rem',
                backgroundColor: mobileView === 'map' ? 'var(--color-primary)' : 'transparent',
                color: mobileView === 'map' ? '#FFFFFF' : 'var(--color-text-main)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Map size={14} /> Map
            </button>
          </div>
        </div>

        {/* Filter Chips Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', borderTop: '1px solid var(--color-border)', paddingTop: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>
            <Filter size={14} /> Filters:
          </div>

          {/* Type Filter Buttons */}
          {[
            { id: 'all', label: 'All Types' },
            { id: 'couch', label: 'Couch / Shared Space' },
            { id: 'dorm', label: 'Dorm Bed' },
            { id: 'private', label: 'Private Room' },
            { id: 'service-share', label: 'Service-Share Stay' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              style={{
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: '1px solid',
                borderColor: selectedType === t.id ? 'var(--color-primary)' : 'var(--color-border)',
                backgroundColor: selectedType === t.id ? 'var(--color-primary-light)' : 'var(--color-surface)',
                color: selectedType === t.id ? 'var(--color-primary)' : 'var(--color-text-main)'
              }}
            >
              {t.label}
            </button>
          ))}

          {/* Verified Toggle Chip */}
          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            style={{
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.8rem',
              fontWeight: 700,
              border: '1px solid',
              borderColor: verifiedOnly ? 'var(--color-teal)' : 'var(--color-border)',
              backgroundColor: verifiedOnly ? 'var(--color-teal-light)' : 'var(--color-surface)',
              color: verifiedOnly ? 'var(--color-teal)' : 'var(--color-text-main)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <ShieldCheck size={14} /> Verified Hosts Only
          </button>

          {/* Max Price Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto', fontSize: '0.82rem', fontWeight: 700 }}>
            <span>Max Price: ${maxPrice}/night</span>
            <input 
              type="range" 
              min="2" 
              max="20" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ accentColor: 'var(--color-primary)', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* SPLIT VIEW (LIST & MAP) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 450px', gap: '1.5rem', minHeight: '600px' }} className="split-view-container">
        {/* Left Column: Listings Grid */}
        <div style={{ display: mobileView === 'map' ? 'none' : 'flex', flexDirection: 'column', gap: '1rem' }} className="listings-column">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 800, color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Showing {filteredListings.length} beds available in {searchLocation || 'All Locations'}
            </span>
          </div>

          {filteredListings.length === 0 ? (
            <div style={{ textIndent: 0, textAlign: 'center', padding: '4rem 1rem', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)' }}>
              <h3>No beds found matching your filters</h3>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Try adjusting your price slider or location query.</p>
              <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => { setSelectedType('all'); setMaxPrice(20); setVerifiedOnly(false); setSearchLocation(''); }}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid-listings" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
              {filteredListings.map(listing => (
                <div 
                  key={listing.id} 
                  onMouseEnter={() => setActiveListingOnMap(listing)}
                >
                  <ListingCard 
                    listing={listing} 
                    onClick={onSelectListing} 
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Map Component */}
        <div style={{ 
          display: mobileView === 'list' ? 'block' : 'block',
          position: 'sticky', 
          top: '90px', 
          height: 'calc(100vh - 120px)',
          minHeight: '500px'
        }} className="map-column">
          <MapComponent 
            listings={filteredListings}
            selectedListing={activeListingOnMap}
            onSelectListing={onSelectListing}
            center={mapCenter}
            zoom={12}
          />
        </div>
      </div>
    </div>
  );
}
