import React, { useState } from 'react';
import { SKILL_TASKS_MARKETPLACE } from '../data/mockData';
import { Briefcase, CheckCircle, Clock, ShieldCheck, Search, Sparkles, MapPin, Send } from 'lucide-react';

export default function SkillExchangePage({ onSelectListing }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [appliedTaskId, setAppliedTaskId] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(null);
  const [applicationText, setApplicationText] = useState('');

  const categories = ['All', 'Dog Walking & Pet Care', 'Language Tutoring', 'Graphic Design & Mural Art', 'Web Dev & IT'];

  const filteredTasks = selectedCategory === 'All' 
    ? SKILL_TASKS_MARKETPLACE 
    : SKILL_TASKS_MARKETPLACE.filter(t => t.skillRequired.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleApply = (task) => {
    setShowApplyModal(task);
  };

  const handleConfirmApply = () => {
    if (showApplyModal) {
      setAppliedTaskId(showApplyModal.id);
      setShowApplyModal(null);
      setApplicationText('');
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px', color: 'var(--color-text-main, #f8fafc)' }}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0d9488 0%, #0284c7 100%)',
        borderRadius: '24px',
        padding: '40px 32px',
        color: '#fff',
        marginBottom: '32px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, width: 'fit-content' }}>
          <Sparkles size={16} /> SERVICE-SHARE SKILL EXCHANGE MARKETPLACE
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 900, margin: 0, lineHeight: 1.2 }}>
          Trade Micro-Skills for Free Stays Worldwide 🌎
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.9)', maxWidth: '680px', lineHeight: 1.5, margin: 0 }}>
          Connect with verified hosts offering zero-dollar beds in exchange for 30–90 minutes of daily micro-services (pet care, language conversation, mural art, or web fixes).
        </p>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '24px' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '10px 18px',
              borderRadius: '20px',
              backgroundColor: selectedCategory === cat ? '#0284c7' : '#1e293b',
              color: '#fff',
              border: `1px solid ${selectedCategory === cat ? '#38bdf8' : '#334155'}`,
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Task Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
        {filteredTasks.map(task => (
          <div
            key={task.id}
            style={{
              backgroundColor: '#1e293b',
              borderRadius: '20px',
              border: '1px solid #334155',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s',
              gap: '16px'
            }}
          >
            <div>
              {/* Host info bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <img
                  src={task.hostAvatar}
                  alt={task.hostName}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {task.hostName}
                    {task.isVerifiedHost && <ShieldCheck size={16} color="#10b981" />}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} /> {task.city}, {task.country}
                  </div>
                </div>
              </div>

              {/* Title & Tag */}
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#fff', margin: '0 0 8px 0' }}>
                {task.title}
              </h3>
              <div style={{
                display: 'inline-block',
                fontSize: '11px',
                fontWeight: 700,
                color: '#38bdf8',
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                padding: '4px 10px',
                borderRadius: '10px',
                marginBottom: '12px'
              }}>
                REQUIRED SKILL: {task.skillRequired}
              </div>

              <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5', margin: '0 0 16px 0' }}>
                {task.description}
              </p>

              {/* Specs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', backgroundColor: '#0f172a', padding: '12px', borderRadius: '14px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>WORKLOAD</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', marginTop: '2px' }}>
                    <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    {task.hoursPerDay}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>FREE ACCOMMODATION</div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#38bdf8', marginTop: '2px' }}>
                    {task.nightsOffered} Nights Included
                  </div>
                </div>
              </div>
            </div>

            {/* Application Button */}
            <button
              onClick={() => handleApply(task)}
              disabled={appliedTaskId === task.id}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                backgroundColor: appliedTaskId === task.id ? '#059669' : '#0284c7',
                border: 'none',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 800,
                cursor: appliedTaskId === task.id ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {appliedTaskId === task.id ? (
                <>
                  <CheckCircle size={18} /> Application Sent to Host!
                </>
              ) : (
                <>
                  <Briefcase size={18} /> Apply with Skill
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '20px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '460px',
            backgroundColor: '#1e293b',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px',
            color: '#f8fafc'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '6px' }}>
              Apply to Host: {showApplyModal.hostName}
            </h3>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
              Task: <strong>{showApplyModal.title}</strong> ({showApplyModal.hoursPerDay})
            </p>

            <textarea
              value={applicationText}
              onChange={(e) => setApplicationText(e.target.value)}
              placeholder="Introduce yourself and explain your experience with this skill..."
              style={{
                width: '100%',
                height: '100px',
                padding: '12px',
                borderRadius: '14px',
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                color: '#fff',
                fontSize: '13px',
                outline: 'none',
                marginBottom: '20px'
              }}
            />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setShowApplyModal(null)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: '#334155',
                  border: 'none',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmApply}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  backgroundColor: '#0284c7',
                  border: 'none',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <Send size={16} /> Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
