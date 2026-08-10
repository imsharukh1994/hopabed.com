import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function MapComponent({ listings, selectedListing, onSelectListing, center = [13.756331, 100.501765], zoom = 12 }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize map if not existing
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(mapInstanceRef.current);

      // OpenStreetMap Light tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    } else {
      mapInstanceRef.current.setView(center, zoom);
    }

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Add markers for listings
    listings.forEach(listing => {
      if (!listing.lat || !listing.lng) return;

      const isSelected = selectedListing && selectedListing.id === listing.id;
      const priceText = listing.isServiceShare ? 'FREE' : `${listing.currency}${listing.pricePerNight}`;

      const iconHTML = `
        <div class="custom-map-pin ${isSelected ? 'active' : ''}">
          ${priceText}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: iconHTML,
        iconSize: [50, 26],
        iconAnchor: [25, 13]
      });

      const marker = L.marker([listing.lat, listing.lng], { icon: customIcon })
        .addTo(mapInstanceRef.current)
        .on('click', () => {
          if (onSelectListing) onSelectListing(listing);
        });

      markersRef.current.push(marker);
    });

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        markersRef.current.forEach(m => m.remove());
      }
    };
  }, [listings, selectedListing, center, zoom]);

  return (
    <div 
      ref={mapContainerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: '400px', 
        borderRadius: 'var(--radius-md)', 
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        zIndex: 1
      }} 
    />
  );
}
