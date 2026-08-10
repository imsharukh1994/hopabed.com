import React from 'react';
import { ShieldCheck, Cpu, Network, ArrowRight, Github, Code, CheckCircle, Server } from 'lucide-react';
import NodeConfigurator from '../components/NodeConfigurator';

export default function OpenProtocolPage({ onNavigate }) {
  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Hero Banner */}
      <section style={{
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        padding: '4rem 1.5rem',
        borderBottom: '1px solid #1E293B'
      }}>
        <div className="container" style={{ textIndent: 0, textAlign: 'center', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <span className="badge-price" style={{ margin: '0 auto', backgroundColor: 'var(--color-teal-light)', color: 'var(--color-teal)' }}>
            MIT Licensed Public Infrastructure
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#FFFFFF', fontWeight: 900 }}>
            The Open Accommodation Protocol
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#94A3B8', lineHeight: 1.6 }}>
            BedHopper is not a centralized platform company. It is an open, federated protocol for ultra-low-cost room and bed sharing—similar to how Email or Mastodon work for communication.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
            <a href="https://github.com/imsharukh1994/hopabed.com" target="_blank" rel="noreferrer" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Github size={18} /> View GitHub Repo
            </a>
            <button className="btn-secondary" style={{ color: '#FFFFFF', borderColor: '#FFFFFF' }} onClick={() => onNavigate('search')}>
              Explore Live Nodes
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Node Configurator Section */}
      <section className="container" style={{ paddingTop: '3.5rem' }}>
        <NodeConfigurator onNavigate={onNavigate} />
      </section>

      {/* 3-Sided Protocol Architecture Diagram */}
      <section className="container" style={{ paddingTop: '4rem' }}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '0.5rem' }}>3-Sided Federated Architecture</h2>
        <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '2.5rem' }}>
          No platform lock-in. No single entity owns the network or your reputation.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Cpu size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>1. Travelers</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Find & book beds starting from $1/night. Carry a single portable **Trust Passport** badge that is recognized across any federated node worldwide.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-teal-light)', color: 'var(--color-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>2. Hosts</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              List beds, spare couches, or dorm capacity at any price. Pay 0% host commission. Own your reviews and reputation data completely.
            </p>
          </div>

          <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--color-yellow-light)', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Server size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>3. Node Operators</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Cities, universities, hostel collectives, and NGOs can run self-hosted BedHopper nodes with local rules, price caps, and custom payment options.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="container" style={{ paddingTop: '4rem' }}>
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Comparing Architectural Models</h2>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-muted)' }}>
                  <th style={{ padding: '0.75rem' }}>Feature</th>
                  <th style={{ padding: '0.75rem' }}>Airbnb / Traditional OTA</th>
                  <th style={{ padding: '0.75rem', color: 'var(--color-primary)' }}>BedHopper Protocol</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.85rem', fontWeight: 800 }}>Host Commission</td>
                  <td style={{ padding: '0.85rem' }}>15% – 20% total fee</td>
                  <td style={{ padding: '0.85rem', fontWeight: 800, color: 'var(--color-teal)' }}>0% (Zero Commission)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.85rem', fontWeight: 800 }}>Platform Lock-in</td>
                  <td style={{ padding: '0.85rem' }}>High (Reviews trapped)</td>
                  <td style={{ padding: '0.85rem', fontWeight: 800, color: 'var(--color-teal)' }}>Zero Lock-in (Portable Trust)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.85rem', fontWeight: 800 }}>Under-$10/night Stays</td>
                  <td style={{ padding: '0.85rem' }}>None (Fees inflate price)</td>
                  <td style={{ padding: '0.85rem', fontWeight: 800, color: 'var(--color-teal)' }}>Primary Focus Segment</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '0.85rem', fontWeight: 800 }}>Source Code & Governance</td>
                  <td style={{ padding: '0.85rem' }}>Closed Proprietary</td>
                  <td style={{ padding: '0.85rem', fontWeight: 800, color: 'var(--color-teal)' }}>Open Source (MIT License)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
