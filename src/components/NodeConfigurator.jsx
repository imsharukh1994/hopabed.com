import React, { useState } from 'react';
import { Server, Cpu, ShieldCheck, Download, Copy, Check, Terminal, Sparkles, Globe, ArrowRight } from 'lucide-react';

export default function NodeConfigurator({ onNavigate }) {
  const [nodeName, setNodeName] = useState('Bangkok Budget Housing Node');
  const [domain, setDomain] = useState('bangkok.hopabed.com');
  const [operatorType, setOperatorType] = useState('city-coop'); // 'city-coop', 'university', 'hostel-chain', 'ngo'
  const [priceCap, setPriceCap] = useState(12);
  const [currency, setCurrency] = useState('USD');
  const [verificationReq, setVerificationReq] = useState('id-required');
  const [enableServiceShare, setEnableServiceShare] = useState(true);
  const [enableFederation, setEnableFederation] = useState(true);
  const [copied, setCopied] = useState(false);

  // Generate bedhopper-node.config.json
  const generatedConfig = JSON.stringify({
    node_name: nodeName,
    domain: domain,
    operator_type: operatorType,
    local_rules: {
      max_price_cap_per_night: Number(priceCap),
      currency: currency,
      verification_level: verificationReq,
      enable_service_share: enableServiceShare
    },
    federation: {
      enabled: enableFederation,
      relay_server: "https://relay.hopabed.com/v1",
      sync_interval_seconds: 300
    },
    license: "MIT"
  }, null, 2);

  // Generate docker-compose.yml snippet
  const generatedDocker = `version: '3.8'

services:
  hopabed-node:
    image: ghcr.io/imsharukh1994/hopabed-node:latest
    container_name: hopabed_${domain.replace(/[^a-z0-9]/gi, '_')}
    restart: always
    ports:
      - "8080:8080"
    environment:
      - NODE_DOMAIN=${domain}
      - MAX_PRICE_CAP=${priceCap}
      - CURRENCY=${currency}
      - FEDERATION_ENABLED=${enableFederation}
      - CONFIG_FILE=/etc/hopabed/config.json
    volumes:
      - ./bedhopper-node.config.json:/etc/hopabed/config.json
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedConfig + "\n\n# docker-compose.yml\n" + generatedDocker);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadConfig = () => {
    const blob = new Blob([generatedConfig], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bedhopper-node.config.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
      gap: '2rem'
    }} className="animate-fade-in">
      {/* Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '4px' }}>
          <Server size={16} />
          <span>Open Protocol Developer Tool</span>
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 900 }}>Self-Hosting Node Configurator</h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '700px' }}>
          Configure a custom BedHopper Node for your city, university, hostel network, or NGO. Enforce local price caps, custom verification, and global federation.
        </p>
      </div>

      {/* Grid: Controls & Code Output */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="configurator-split">
        {/* Left Column: Form Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 900, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>NODE NAME</label>
            <input 
              type="text" 
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '4px', fontWeight: 700 }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 900, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>NODE SUBDOMAIN / DOMAIN</label>
            <input 
              type="text" 
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '4px', fontWeight: 700 }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 900, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>OPERATOR TYPE</label>
              <select 
                value={operatorType} 
                onChange={(e) => setOperatorType(e.target.value)}
                style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '4px', fontWeight: 700, cursor: 'pointer' }}
              >
                <option value="city-coop">City Cooperative</option>
                <option value="university">University Board</option>
                <option value="hostel-chain">Hostel Network</option>
                <option value="ngo">NGO / Relief Group</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 900, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>MAX PRICE CAP ($/NIGHT)</label>
              <input 
                type="number" 
                value={priceCap}
                onChange={(e) => setPriceCap(e.target.value)}
                style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', marginTop: '4px', fontWeight: 700 }}
              />
            </div>
          </div>

          {/* Checkbox Switches */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={enableFederation}
                onChange={(e) => setEnableFederation(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--color-teal)' }}
              />
              <span>Enable Global Federation (Sync listings across BedHopper network)</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={enableServiceShare}
                onChange={(e) => setEnableServiceShare(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--color-primary)' }}
              />
              <span>Enable Service-Share Stays (Work-exchange for free stays)</span>
            </label>
          </div>
        </div>

        {/* Right Column: Code Generator Output */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={16} /> GENERATED JSON & DOCKER CONFIG
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-outline" onClick={handleCopyCode} style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>
                {copied ? <Check size={14} color="var(--color-green)" /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
              <button className="btn-primary" onClick={handleDownloadConfig} style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}>
                <Download size={14} />
                <span>Download .json</span>
              </button>
            </div>
          </div>

          <pre style={{
            backgroundColor: '#0F172A',
            color: '#38BDF8',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'monospace',
            fontSize: '0.82rem',
            lineHeight: 1.5,
            maxHeight: '380px',
            overflowY: 'auto',
            border: '1px solid #1E293B'
          }}>
            {generatedConfig}
            {"\n\n# --- docker-compose.yml ---\n"}
            {generatedDocker}
          </pre>

          <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
            🔒 Under MIT license. Anyone can host a BedHopper node with complete data sovereignty.
          </p>
        </div>
      </div>
    </div>
  );
}
