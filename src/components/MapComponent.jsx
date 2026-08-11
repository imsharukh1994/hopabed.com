import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { formatPrice } from '../utils/currency';

export default function MapComponent({ 
  listings = [], 
  selectedListing, 
  onSelectListing, 
  center = [13.756331, 100.501765], 
  zoom = 12,
  selectedCurrency = 'USD',
  radiusKm = null
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const circleRef = useRef(null);

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

      // CartoDB Dark/Light style tiles for modern UI
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
      }).addTo(mapInstanceRef.current);
    } else {
      mapInstanceRef.current.setView(center, zoom);
    }

    // Radius Circle Visualizer
    if (circleRef.current) {
      circleRef.current.remove();
      circleRef.current = null;
    }

    if (radiusKm && center) {
      circleRef.current = L.circle(center, {
        radius: radiusKm * 1000,
        color: '#0284c7',
        fillColor: '#0284c7',
        fillOpacity: 0.1,
        weight: 1.5
      }).addTo(mapInstanceRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Add markers for listings
    listings.forEach(listing => {
      if (!listing.lat || !listing.lng) return;

      const isSelected = selectedListing && selectedListing.id === listing.id;
      const formattedPrice = listing.isServiceShare 
        ? 'FREE' 
        : formatPrice(listing.pricePerNight, selectedCurrency);

      const iconHTML = `
        <div style="
          background-color: ${isSelected ? '#0284c7' : listing.isServiceShare ? '#059669' : '#0f172a'};
          color: #ffffff;
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 800;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          border: 2px solid ${isSelected ? '#ffffff' : 'rgba(255,255,255,0.4)'};
          white-space: nowrap;
          cursor: pointer;
          transition: transform 0.2s;
        ">
          ${formattedPrice}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker-pill',
        html: iconHTML,
        iconSize: [60, 28],
        iconAnchor: [30, 14]
      });

      const marker = L.marker([listing.lat, listing.lng], { icon: customIcon })
        .addTo(mapInstanceRef.current)
        .on('click', () => {
          if (onSelectListing) onSelectListing(listing);
        });

      markersRef.current.push(marker);
    });

    return () => {
      if (mapInstanceRef.current) {
        markersRef.current.forEach(m => m.remove());
      }
    };
  }, [listings, selectedListing, center, zoom, selectedCurrency, radiusKm]);

  return (
    <div 
      ref={mapContainerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: '420px', 
        borderRadius: '16px', 
        overflow: 'hidden',
        border: '1px solid #334155',
        zIndex: 1
      }} 
    />
  );
}
