import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, Sparkles, Check, Home, Users, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function ListingWizard({ onPublishListing, onCancel }) {
  const [step, setStep] = useState(1);
  const [listingType, setListingType] = useState('couch');
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('Bangkok');
  const [pricePerNight, setPricePerNight] = useState(5);
  const [description, setDescription] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState(['Wi-Fi', 'Kitchen']);
  const [isServiceShare, setIsServiceShare] = useState(false);
  const [taskDescription, setTaskDescription] = useState('Walk my dog 30 mins a day');
  const [hoursPerDay, setHoursPerDay] = useState('0.5 hrs/day');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80');

  const toggleAmenity = (amenity) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const handleFinishPublish = () => {
    const newListing = {
      id: 'bh-' + Math.floor(Math.random() * 900 + 100),
      title: title || 'Cozy guest bed in ' + city,
      city: city,
      country: 'Thailand',
      address: 'Central District',
      distFromCenter: '1.5 km',
      lat: 13.750000,
      lng: 100.520000,
      pricePerNight: isServiceShare ? 0 : Number(pricePerNight),
      currency: '$',
      type: listingType,
      typeLabel: listingType === 'couch' ? 'Couch / Shared Space' : listingType === 'private' ? 'Private Room' : 'Dorm Bed',
      rating: 5.0,
      reviewsCount: 1,
      images: [imageUrl],
      host: {
        id: 'host-anna',
        name: 'Anna Schmidt',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
        isVerified: true,
        trustPassport: true,
        responseRate: '100%',
        joinedDate: 'Just now',
        bio: 'Host on BedHopper'
      },
      amenities: selectedAmenities,
      houseRules: ['Respect common spaces', 'No noise after 11 PM'],
      available: true,
      isServiceShare: isServiceShare,
      serviceShareDetails: isServiceShare ? {
        taskDescription,
        hoursPerDay,
        depositRequired: '$20 deposit held',
        prohibitedTasks: 'No heavy manual labor'
      } : null
    };

    onPublishListing(newListing);
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem', maxWidth: '720px' }}>
      {/* Step Indicator */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button onClick={onCancel} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', fontWeight: 700 }}>
          <ArrowLeft size={18} /> Cancel
        </button>
        <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--color-primary)' }}>
          Step {step} of 5
        </span>
      </div>

      {/* Card Container */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {/* STEP 1: TYPE */}
        {step === 1 && (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>What type of space are you listing?</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>Choose the option that best describes your sleeping arrangement.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { id: 'couch', title: 'Couch / Shared Space', desc: 'Spare couch or mattress in common area', icon: Home },
                { id: 'dorm', title: 'Shared Dorm Bed', desc: 'Bed in a shared room or hostel dorm', icon: Users },
                { id: 'private', title: 'Private Room', desc: 'Private room with door lock', icon: Home },
                { id: 'service-share', title: 'Service-Share Stay', desc: 'Free stay in exchange for light assistance', icon: HeartHandshake }
              ].map(item => {
                const Icon = item.icon;
                const isSelected = listingType === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setListingType(item.id);
                      if (item.id === 'service-share') setIsServiceShare(true);
                      else setIsServiceShare(false);
                    }}
                    style={{
                      border: '2px solid',
                      borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-border)',
                      backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-surface)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      transition: 'var(--transition)'
                    }}
                  >
                    <Icon size={24} color={isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
                    <h4 style={{ fontSize: '1rem', fontWeight: 800 }}>{item.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* STEP 2: PHOTOS */}
        {step === 2 && (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Add photos of your space</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>High-quality photos build immediate trust with travelers.</p>

            <div style={{
              border: '2px dashed var(--color-border-dark)',
              borderRadius: 'var(--radius-md)',
              padding: '2.5rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              backgroundColor: 'var(--color-bg)'
            }}>
              <Upload size={36} color="var(--color-primary)" />
              <span style={{ fontWeight: 800, fontSize: '0.95rem' }}>Drag & drop photos here or paste image URL</span>
              <input 
                type="text" 
                value={imageUrl} 
                onChange={(e) => setImageUrl(e.target.value)}
                style={{ width: '90%', padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.85rem' }} 
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
              <img src={imageUrl} alt="Preview" style={{ width: '100px', height: '80px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
            </div>
          </>
        )}

        {/* STEP 3: DETAILS & PRICING */}
        {step === 3 && (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Basic details & pricing</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>LISTING TITLE</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Cozy couch in Sukhumvit near BTS"
                  style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '4px', fontWeight: 700 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>CITY</label>
                  <input 
                    type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '4px', fontWeight: 700 }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>NIGHTLY PRICE ($)</label>
                  <input 
                    type="number" 
                    value={pricePerNight}
                    disabled={isServiceShare}
                    onChange={(e) => setPricePerNight(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '4px', fontWeight: 700 }}
                  />
                  {isServiceShare && <span style={{ fontSize: '0.75rem', color: 'var(--color-teal)', fontWeight: 700 }}>Free stay for Service-Share!</span>}
                </div>
              </div>
            </div>
          </>
        )}

        {/* STEP 4: SERVICE SHARE DETAILS IF APPLICABLE */}
        {step === 4 && (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Select Amenities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
              {['Wi-Fi', 'Kitchen', 'Air Conditioning', 'Laundry', 'Hot Shower', 'Breakfast', 'Pet Friendly'].map(a => {
                const isChecked = selectedAmenities.includes(a);
                return (
                  <button
                    key={a}
                    onClick={() => toggleAmenity(a)}
                    style={{
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid',
                      borderColor: isChecked ? 'var(--color-teal)' : 'var(--color-border)',
                      backgroundColor: isChecked ? 'var(--color-teal-light)' : 'var(--color-surface)',
                      color: isChecked ? 'var(--color-teal)' : 'var(--color-text-main)',
                      fontWeight: 700,
                      fontSize: '0.85rem'
                    }}
                  >
                    {a}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* STEP 5: REVIEW & PUBLISH */}
        {step === 5 && (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Review & Publish</h2>
            <div style={{ backgroundColor: 'var(--color-bg)', padding: '1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', gap: '1rem' }}>
              <img src={imageUrl} alt="Listing" style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.1rem' }}>{title || 'Cozy guest space'}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{city} • ${isServiceShare ? 0 : pricePerNight} / night</p>
                <span className="badge-verified" style={{ marginTop: '4px' }}><ShieldCheck size={13} /> Ready to Publish</span>
              </div>
            </div>
          </>
        )}

        {/* Navigation CTAs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', marginTop: '1rem' }}>
          {step > 1 ? (
            <button className="btn-outline" onClick={() => setStep(step - 1)}>
              Back
            </button>
          ) : <div></div>}

          {step < 5 ? (
            <button className="btn-primary" onClick={() => setStep(step + 1)}>
              <span>Next Step</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button className="btn-primary" onClick={handleFinishPublish}>
              <span>Publish Listing</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
