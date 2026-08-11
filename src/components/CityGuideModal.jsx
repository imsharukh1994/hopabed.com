import React, { useState } from 'react';
import { X, Utensils, Bus, Wifi, ShieldAlert, MapPin, Sparkles } from 'lucide-react';

export default function CityGuideModal({ isOpen, onClose, cityName = 'Bangkok' }) {
  const [activeTab, setActiveTab] = useState('eats');

  if (!isOpen) return null;

  const cityGuidesData = {
    Bangkok: {
      eats: [
        { name: 'Ari Alley Street Noodles', price: '$1.20', desc: 'Authentic pork broth boat noodles near Ari BTS station.' },
        { name: 'Khao San Night Market Mango Rice', price: '$1.50', desc: 'Fresh sweet mango sticky rice stall operating until 2 AM.' },
        { name: 'Pier 21 Terminal 21 Food Court', price: '$1.00', desc: 'Air-conditioned ultra-cheap food court with $1 pad thai.' }
      ],
      transit: [
        { title: 'BTS Skytrain Rabbit Card', tip: 'Buy a rechargeable Rabbit Card at Phaya Thai station for instant tap-and-go.' },
        { title: 'Chao Phraya Express Orange Flag Boat', tip: 'Takes you to Grand Palace & Wat Arun for 16 THB (~$0.45) flat fare.' }
      ],
      wifi: [
        { name: 'AIS Design Centre (Emporium)', tip: 'Day pass for 100 THB with 1Gbps fiber Wi-Fi and quiet workspaces.' },
        { name: 'Starbucks CentralWorld', tip: 'Free 2-hour high speed Wi-Fi with any $1.50 iced tea purchase.' }
      ],
      safety: [
        { title: 'Tuk-Tuk 20 THB Scam Alert', tip: 'Avoid drivers offering "20 THB city tours" as they take you to overpriced suit tailors.' },
        { title: 'Metered Grab / Bolt Taxis', tip: 'Always request "Meter Please" or use Grab/Bolt apps to avoid flat 300 THB tourist rates.' }
      ]
    },
    Tokyo: {
      eats: [
        { name: '7-Eleven & Lawson Egg Sandwiches', price: '$1.80', desc: 'World famous tamago sando made fresh multiple times daily.' },
        { name: 'Sukiya & Yoshinoya Beef Bowl', price: '$3.50', desc: 'Hot gyudon beef bowl with miso soup served 24/7.' }
      ],
      transit: [
        { title: 'Suica / Pasmo IC Card', tip: 'Add to Apple Wallet / Google Pay for instant subway & vending machine payments.' },
        { title: '24/72-Hour Tokyo Subway Ticket', tip: 'Unlimited Tokyo Metro rides for $11.50 for 3 full days.' }
      ],
      wifi: [
        { name: 'Fuglen Tokyo (Yoyogi)', tip: 'Nordic coffee shop near Yoyogi park with fast Wi-Fi and digital nomad vibe.' },
        { name: 'Haneda & Narita Free Airport Wi-Fi', tip: 'Connect instantly to FreeWiFi_Passport without SMS OTP verification.' }
      ],
      safety: [
        { title: 'Kabukicho Club Touts Warning', tip: 'Never follow street promoters inviting you into free-drink bars in Shinjuku.' }
      ]
    },
    Lisbon: {
      eats: [
        { name: 'Pastéis de Belém', price: '$1.40', desc: 'Original 1837 recipe custard tart dusted with cinnamon.' },
        { name: 'Bifana at O Trevo', price: '$2.80', desc: 'Traditional garlicky braised pork sandwich in Baixa.' }
      ],
      transit: [
        { title: 'Navegante Viva Viagem Card', tip: 'Rechargeable 0.50€ card for 24-hour metro & Tram 28 access.' }
      ],
      wifi: [
        { name: 'Target Nomad Hub (Cais do Sodré)', tip: 'Co-working espresso bar with ocean breeze.' }
      ],
      safety: [
        { title: 'Tram 28 Pickpocket Alert', tip: 'Keep backpack on your front chest during peak Tram 28 rides.' }
      ]
    }
  };

  const currentCityData = cityGuidesData[cityName] || cityGuidesData.Bangkok;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2500,
      padding: '1rem'
    }} className="animate-fade-in">
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '24px',
        maxWidth: '620px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        color: 'var(--color-text-main)'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)',
          color: '#FFFFFF',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 900, color: '#fff', margin: 0 }}>
              {cityName} Backpacker City Guide
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <X size={22} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Navigation Category Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'eats', label: 'Cheap Eats ($1-$3)', icon: Utensils, color: '#f4845f' },
              { id: 'transit', label: 'Transit Hacks', icon: Bus, color: '#0284c7' },
              { id: 'wifi', label: 'Free Wi-Fi Spots', icon: Wifi, color: '#0d9488' },
              { id: 'safety', label: 'Safety & Scam Alerts', icon: ShieldAlert, color: '#ef4444' }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.5rem 0.85rem',
                    borderRadius: '16px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    border: '1px solid',
                    borderColor: isActive ? tab.color : 'var(--color-border)',
                    backgroundColor: isActive ? tab.color : 'var(--color-bg)',
                    color: isActive ? '#FFFFFF' : 'var(--color-text-main)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <Icon size={15} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {activeTab === 'eats' && currentCityData.eats.map((item, idx) => (
              <div key={idx} style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: '16px', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ fontSize: '0.95rem', color: 'var(--color-text-main)' }}>{item.name}</strong>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: '4px 0 0 0' }}>{item.desc}</p>
                </div>
                <span style={{ fontSize: '0.85rem', fontWeight: 900, color: 'var(--color-primary)', backgroundColor: 'var(--color-surface)', padding: '4px 10px', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                  {item.price}
                </span>
              </div>
            ))}

            {activeTab === 'transit' && currentCityData.transit.map((item, idx) => (
              <div key={idx} style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
                <strong style={{ fontSize: '0.95rem', color: '#0284c7', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🚌 {item.title}
                </strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '4px 0 0 0', lineHeight: 1.5 }}>{item.tip}</p>
              </div>
            ))}

            {activeTab === 'wifi' && currentCityData.wifi.map((item, idx) => (
              <div key={idx} style={{ padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
                <strong style={{ fontSize: '0.95rem', color: '#0d9488', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  📶 {item.name}
                </strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '4px 0 0 0', lineHeight: 1.5 }}>{item.tip}</p>
              </div>
            ))}

            {activeTab === 'safety' && currentCityData.safety.map((item, idx) => (
              <div key={idx} style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.08)', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                <strong style={{ fontSize: '0.95rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  ⚠️ {item.title}
                </strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', margin: '4px 0 0 0', lineHeight: 1.5 }}>{item.tip}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
            💡 Verified by local hosts on hopabed.com network
          </div>
        </div>
      </div>
    </div>
  );
}
