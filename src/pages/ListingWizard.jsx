import React, { useState, useRef } from 'react';
import { Home, Users, HeartHandshake, Upload, CheckCircle2, ArrowRight, ArrowLeft, Trash2, Plus, Sparkles } from 'lucide-react';
import { uploadToSupabaseStorage } from '../services/storageService';

export default function ListingWizard({ onPublishListing, onCancel }) {
  const [step, setStep] = useState(1);

  // Form State
  const [listingType, setListingType] = useState('couch');
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('Bangkok');
  const [country, setCountry] = useState('Thailand');
  const [address, setAddress] = useState('Ari Alley 4');
  const [pricePerNight, setPricePerNight] = useState(3);
  const [isServiceShare, setIsServiceShare] = useState(false);
  const [serviceTask, setServiceTask] = useState('Walk host Golden Retriever twice daily');

  // Multi-Photo Upload State
  const [photosList, setPhotosList] = useState([
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'
  ]);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Handle Local File Selection & Upload
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);

    for (const file of files) {
      try {
        const photoUrl = await uploadToSupabaseStorage(file, 'hopabed.bucket');
        if (photoUrl) {
          setPhotosList(prev => [...prev, photoUrl]);
        }
      } catch (err) {
        console.warn('Photo upload note:', err);
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddUrl = () => {
    if (imageUrlInput.trim()) {
      setPhotosList([...photosList, imageUrlInput.trim()]);
      setImageUrlInput('');
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotosList(photosList.filter((_, i) => i !== index));
  };

  const handleCompletePublish = () => {
    const newListing = {
      id: `cloud_${Date.now()}`,
      title: title || 'Cozy Budget Space',
      city,
      country,
      address,
      pricePerNight: isServiceShare ? 0 : Number(pricePerNight),
      rating: 5.0,
      reviewsCount: 1,
      images: photosList.length > 0 ? photosList : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'],
      isServiceShare,
      host: {
        name: 'Verified Host',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        responseRate: '100%',
        joinedDate: '2026',
        isVerified: true
      },
      amenities: ['Wi-Fi', 'Hot Shower', 'Power Outlet', 'Drinking Water'],
      distFromCenter: '1.2 km'
    };

    onPublishListing(newListing);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem', maxWidth: '780px' }}>
      {/* Wizard Navigation Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button onClick={onCancel} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--color-text-muted)', fontWeight: 700 }}>
          <ArrowLeft size={16} /> Cancel
        </button>
        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--color-primary)' }}>
          Step {step} of 4
        </span>
      </div>

      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        color: 'var(--color-text-main)'
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
                      backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-bg)',
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
                    <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-main)' }}>{item.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* STEP 2: REAL PHOTO UPLOAD & MULTI-PHOTO GALLERY */}
        {step === 2 && (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Add photos of your space</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>Upload photos directly from your computer/device or paste image links.</p>

            {/* Hidden File Input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              multiple 
              style={{ display: 'none' }} 
            />

            {/* Drag and Drop Upload Zone */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed var(--color-primary)',
                borderRadius: 'var(--radius-md)',
                padding: '2.5rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                backgroundColor: 'var(--color-bg)',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Upload size={28} />
              </div>
              <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-text-main)' }}>
                {isUploading ? 'Uploading Photos...' : 'Click to Upload Photos from Computer / Mobile'}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Supports JPG, PNG, WEBP (Multiple files allowed)
              </span>
            </div>

            {/* Alternative: Image URL Input */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
              <input 
                type="text" 
                value={imageUrlInput} 
                onChange={(e) => setImageUrlInput(e.target.value)}
                placeholder="Or paste an image web URL (https://...)"
                style={{ flex: 1, padding: '0.65rem 1rem', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', fontSize: '0.88rem' }} 
              />
              <button 
                type="button" 
                onClick={handleAddUrl}
                style={{ padding: '0.65rem 1.1rem', borderRadius: '12px', backgroundColor: 'var(--color-teal)', color: '#fff', fontWeight: 800, border: 'none', cursor: 'pointer', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Plus size={16} /> Add URL
              </button>
            </div>

            {/* Photos Preview Gallery */}
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>
                Uploaded Photos ({photosList.length}):
              </span>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.75rem' }}>
                {photosList.map((url, idx) => (
                  <div key={idx} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '90px', border: '1px solid var(--color-border)' }}>
                    <img src={url} alt={`Upload ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        backgroundColor: 'rgba(239, 68, 68, 0.9)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title="Remove Photo"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
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
                  placeholder="e.g. Clean & Quiet Couch near Ari BTS Metro"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', fontSize: '0.92rem', fontWeight: 700 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>CITY</label>
                  <input 
                    type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', fontSize: '0.92rem' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>COUNTRY</label>
                  <input 
                    type="text" 
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', fontSize: '0.92rem' }}
                  />
                </div>
              </div>

              {!isServiceShare ? (
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>NIGHTLY RATE ($ USD)</label>
                  <input 
                    type="number" 
                    min={1} 
                    max={50}
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(Number(e.target.value))}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', fontSize: '1rem', fontWeight: 900 }}
                  />
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-teal)', fontWeight: 800 }}>
                    💡 You keep 100% of this room rate ($0 host commission fee)
                  </span>
                </div>
              ) : (
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-teal)' }}>EXPECTED SERVICE TASK (FREE STAY)</label>
                  <input 
                    type="text" 
                    value={serviceTask}
                    onChange={(e) => setServiceTask(e.target.value)}
                    placeholder="e.g. Dog walking or 1 hour reception help daily"
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--color-teal)', backgroundColor: 'var(--color-teal-light)', color: 'var(--color-text-main)', fontSize: '0.92rem', fontWeight: 700 }}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {/* STEP 4: PREVIEW & PUBLISH */}
        {step === 4 && (
          <>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Review & Publish Your Stay</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>Your listing will immediately go live on the hopabed.com global network.</p>

            <div style={{ backgroundColor: 'var(--color-bg)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
              <img src={photosList[0]} alt="Preview" style={{ width: '120px', height: '90px', borderRadius: '12px', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900 }}>{title || 'Cozy Budget Stay'}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>📍 {city}, {country}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-primary)', marginTop: '8px' }}>
                  {isServiceShare ? 'FREE ($0/night Service-Share)' : `$${pricePerNight}/night`}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
          {step > 1 ? (
            <button className="btn-outline" onClick={() => setStep(step - 1)}>
              Back
            </button>
          ) : <div></div>}

          {step < 4 ? (
            <button className="btn-primary" onClick={() => setStep(step + 1)} style={{ padding: '0.7rem 1.4rem', fontSize: '0.95rem' }}>
              <span>Next Step</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <button className="btn-primary" onClick={handleCompletePublish} style={{ backgroundColor: 'var(--color-green)', padding: '0.75rem 1.6rem', fontSize: '1rem' }}>
              <CheckCircle2 size={18} />
              <span>Publish Listing Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
