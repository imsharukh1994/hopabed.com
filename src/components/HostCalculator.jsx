import React, { useState } from 'react';
import { Calculator, DollarSign, TrendingUp, ShieldCheck, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export default function HostCalculator({ onStartHosting }) {
  const [hostType, setHostType] = useState('individual'); // 'individual' or 'hostel'
  const [bedsCount, setBedsCount] = useState(hostType === 'individual' ? 1 : 10);
  const [nightlyRate, setNightlyRate] = useState(hostType === 'individual' ? 6 : 12);
  const [occupancyDays, setOccupancyDays] = useState(20);

  const monthlyGross = bedsCount * nightlyRate * occupancyDays;
  const otaCommissionRate = 0.18; // 18% avg Airbnb / OTA fee
  const otaFeesLost = monthlyGross * otaCommissionRate;
  const bedhopperFee = 0; // 0% host commission!
  const yearlySavings = otaFeesLost * 12;

  const handleTypeChange = (type) => {
    setHostType(type);
    if (type === 'individual') {
      setBedsCount(1);
      setNightlyRate(6);
    } else {
      setBedsCount(10);
      setNightlyRate(12);
    }
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: 'var(--radius-lg)',
      padding: '2.5rem 2rem',
      border: '1px solid var(--color-border)',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.75rem'
    }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-teal)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '4px' }}>
            <Calculator size={16} />
            <span>Interactive Host Earnings & Savings Tool</span>
          </div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 900 }}>How Much Can You Earn on BedHopper?</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem' }}>See how much you keep with 100% zero host commission compared to traditional OTAs.</p>
        </div>

        {/* Host Type Selector Toggle */}
        <div style={{
          backgroundColor: 'var(--color-bg-alt)',
          padding: '4px',
          borderRadius: 'var(--radius-pill)',
          display: 'flex',
          border: '1px solid var(--color-border)'
        }}>
          <button
            onClick={() => handleTypeChange('individual')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.85rem',
              fontWeight: 800,
              backgroundColor: hostType === 'individual' ? 'var(--color-primary)' : 'transparent',
              color: hostType === 'individual' ? '#FFFFFF' : 'var(--color-text-muted)'
            }}
          >
            Individual Host
          </button>
          <button
            onClick={() => handleTypeChange('hostel')}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-pill)',
              fontSize: '0.85rem',
              fontWeight: 800,
              backgroundColor: hostType === 'hostel' ? 'var(--color-teal)' : 'transparent',
              color: hostType === 'hostel' ? '#FFFFFF' : 'var(--color-text-muted)'
            }}
          >
            Hostel / Guesthouse
          </button>
        </div>
      </div>

      {/* Interactive Controls & Calculator Output Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'center' }} className="calculator-grid">
        {/* Left Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* 1. Beds Count Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 800 }}>
              <span>Number of Beds Available:</span>
              <span style={{ color: 'var(--color-primary)', fontSize: '1.05rem' }}>{bedsCount} {bedsCount === 1 ? 'Bed / Couch' : 'Beds'}</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max={hostType === 'individual' ? '5' : '50'} 
              value={bedsCount}
              onChange={(e) => setBedsCount(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
            />
          </div>

          {/* 2. Nightly Rate Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 800 }}>
              <span>Nightly Rate per Bed ($):</span>
              <span style={{ color: 'var(--color-primary)', fontSize: '1.05rem' }}>${nightlyRate} / night</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="40" 
              value={nightlyRate}
              onChange={(e) => setNightlyRate(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
            />
          </div>

          {/* 3. Occupancy Days Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem', fontWeight: 800 }}>
              <span>Occupied Days per Month:</span>
              <span style={{ color: 'var(--color-primary)', fontSize: '1.05rem' }}>{occupancyDays} days / mo</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="30" 
              value={occupancyDays}
              onChange={(e) => setOccupancyDays(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Right Calculated Results Card */}
        <div style={{
          backgroundColor: 'var(--color-bg-alt)',
          borderRadius: 'var(--radius-md)',
          padding: '1.75rem',
          border: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>YOUR MONTHLY EARNINGS</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-teal)', lineHeight: 1.1, marginTop: '4px' }}>
              ${monthlyGross.toLocaleString()} <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>/ month</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-green)', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <ShieldCheck size={14} /> 100% Kept on BedHopper ($0 Commission)
            </span>
          </div>

          {/* Airbnb Comparison Box */}
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            fontSize: '0.88rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
              <span>Airbnb / OTA 18% Fees Lost:</span>
              <strong style={{ color: 'var(--color-red)' }}>-${otaFeesLost.toFixed(0)}/mo</strong>
            </div>

            <div style={{ borderTop: '1px dashed var(--color-border)', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between', fontWeight: 900, color: 'var(--color-teal)' }}>
              <span>Yearly Savings on BedHopper:</span>
              <span style={{ fontSize: '1.05rem', color: 'var(--color-teal)' }}>+${yearlySavings.toFixed(0)} / year!</span>
            </div>
          </div>

          {/* Action Button */}
          {onStartHosting && (
            <button 
              className="btn-primary" 
              onClick={onStartHosting}
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.98rem' }}
            >
              <span>List Space & Keep 100%</span>
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
