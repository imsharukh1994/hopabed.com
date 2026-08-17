import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, X, Send, Award, DollarSign, MapPin, ChevronRight, Zap } from 'lucide-react';
import { formatPrice } from '../utils/currency';

/**
 * Render an AI chat assistant for finding budget accommodations and Service-Share stays.
 * @param {Object} props - Component configuration.
 * @param {boolean} props.isOpen - Whether the assistant is visible.
 * @param {Function} props.onClose - Called when the assistant closes.
 * @param {Array<Object>} [props.listings=[]] - Listings available for matching.
 * @param {string} [props.selectedCurrency='USD'] - Currency used to display nightly prices.
 * @param {Function} props.onSelectListing - Called with a listing selected from the recommendations.
 * @returns {JSX.Element|null} The assistant interface when open, otherwise `null`.
 */
export default function HopperAIAssistant({ isOpen, onClose, listings = [], selectedCurrency = 'USD', onSelectListing }) {
  const [query, setQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [isCloseFocused, setIsCloseFocused] = useState(false);
  const [isSendFocused, setIsSendFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: "👋 Hi! I'm **Hopper AI**, your ultra-budget travel & skill companion. Ask me to find stays under $10, suggest zero-dollar Service-Share matches, or recommend itineraries!"
    }
  ]);
  const [matchedStays, setMatchedStays] = useState([]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const activeText = textToSend || query;
    if (!activeText.trim()) return;

    const userMsg = { sender: 'user', text: activeText };
    setChatMessages(prev => [...prev, userMsg]);
    setQuery('');

    // Process Query & Find Matches
    setTimeout(() => {
      let aiResponseText = '';
      let matches = [];
      const lower = activeText.toLowerCase();

      if (lower.includes('under $10') || lower.includes('cheap') || lower.includes('budget')) {
        matches = listings.filter(l => l.pricePerNight <= 10 && l.pricePerNight > 0);
        aiResponseText = `I found **${matches.length} stays under $10/night** across our global nodes:`;
      } else if (lower.includes('free') || lower.includes('service-share') || lower.includes('zero') || selectedSkill) {
        matches = listings.filter(l => l.isServiceShare || l.pricePerNight === 0);
        aiResponseText = selectedSkill 
          ? `Matched **${matches.length} zero-dollar stays** accepting **"${selectedSkill}"** micro-services:`
          : `Here are **${matches.length} zero-dollar Service-Share Stays** where you can trade micro-tasks for a free bed:`;
      } else if (lower.includes('tokyo') || lower.includes('japan')) {
        matches = listings.filter(l => l.city.toLowerCase().includes('tokyo') || l.country.toLowerCase().includes('japan'));
        aiResponseText = `Here are top budget stays and capsule nodes in **Tokyo, Japan**:`;
      } else {
        matches = listings.slice(0, 3);
        aiResponseText = `Based on your request, here are top recommended BedHopper nodes:`;
      }

      setChatMessages(prev => [
        ...prev,
        { sender: 'ai', text: aiResponseText }
      ]);
      setMatchedStays(matches);
    }, 600);
  };

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    handleSend(`Show me free Service-Share stays for skill: ${skill}`);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '24px',
      width: '380px',
      maxWidth: 'calc(100vw - 32px)',
      height: '560px',
      maxHeight: 'calc(100vh - 120px)',
      backgroundColor: '#1e293b',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      color: '#f8fafc'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bot size={22} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Hopper AI Companion
              <span style={{ fontSize: '10px', padding: '2px 6px', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: '10px' }}>PRO</span>
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>Smart Skill Match & Itinerary Assistant</div>
          </div>
        </div>
        <button 
          onClick={onClose}
          aria-label="Close Hopper AI Companion"
          onFocus={() => setIsCloseFocused(true)}
          onBlur={() => setIsCloseFocused(false)}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            opacity: 0.8,
            padding: '4px',
            outline: isCloseFocused ? '2px solid #fff' : 'none',
            outlineOffset: '2px',
            borderRadius: '4px'
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Quick Skill Selector */}
      <div style={{ padding: '10px 14px', backgroundColor: '#0f172a', borderBottom: '1px solid #334155' }}>
        <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>
          ⚡ QUICK SKILL MATCH:
        </div>
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
          {['Dog Walking', 'Language Tutoring', 'Graphic Design', 'Web Dev', 'Gardening'].map(skill => (
            <button
              key={skill}
              onClick={() => handleSkillSelect(skill)}
              style={{
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '12px',
                backgroundColor: selectedSkill === skill ? '#0284c7' : '#1e293b',
                color: '#fff',
                border: '1px solid #334155',
                whiteSpace: 'nowrap',
                cursor: 'pointer'
              }}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {chatMessages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            backgroundColor: msg.sender === 'user' ? '#0284c7' : '#334155',
            color: '#fff',
            padding: '10px 14px',
            borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            fontSize: '13px',
            lineHeight: '1.4'
          }}>
            {msg.text.replace(/\*\*(.*?)\*\*/g, '$1')}
          </div>
        ))}

        {/* Matched Stays Container */}
        {matchedStays.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
            <div style={{ fontSize: '11px', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>
              RECOMMENDED MATCHES ({matchedStays.length})
            </div>
            {matchedStays.map(listing => (
              <div
                key={listing.id}
                onClick={() => { onSelectListing(listing); onClose(); }}
                style={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '12px',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <img 
                  src={listing.images[0]} 
                  alt={listing.title} 
                  style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} 
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {listing.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={10} /> {listing.city}, {listing.country}
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8', marginTop: '2px' }}>
                    {listing.isServiceShare ? 'FREE (Service Share)' : `${formatPrice(listing.pricePerNight, selectedCurrency)} / night`}
                  </div>
                </div>
                <ChevronRight size={16} color="#94a3b8" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input Form */}
      <div style={{ padding: '12px', backgroundColor: '#0f172a', borderTop: '1px solid #334155', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI: 'Stays under $10 in Tokyo'..."
          aria-label="Ask Hopper AI companion about ultra-budget stays"
          style={{
            flex: 1,
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '12px',
            padding: '8px 12px',
            color: '#fff',
            fontSize: '13px',
            outline: 'none'
          }}
        />
        <button
          onClick={() => handleSend()}
          aria-label="Send message"
          onFocus={() => setIsSendFocused(true)}
          onBlur={() => setIsSendFocused(false)}
          style={{
            backgroundColor: '#0284c7',
            border: 'none',
            borderRadius: '12px',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            outline: isSendFocused ? '3px solid #38bdf8' : 'none',
            outlineOffset: '2px'
          }}
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
