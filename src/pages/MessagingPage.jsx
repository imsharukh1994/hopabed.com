import React, { useState } from 'react';
import { Send, Image, MessageSquare, ShieldCheck } from 'lucide-react';

export default function MessagingPage({ initialConversations }) {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || 'msg-1');
  const [inputMessage, setInputMessage] = useState('');

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeConv) return;

    const newMsg = {
      sender: 'guest',
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(conversations.map(c => {
      if (c.id === activeConv.id) {
        return {
          ...c,
          lastMessage: inputMessage,
          history: [...c.history, newMsg]
        };
      }
      return c;
    }));

    setInputMessage('');
  };

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '1rem',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-md)',
        minHeight: '600px',
        overflow: 'hidden'
      }} className="messaging-grid">
        {/* Left Sidebar Conversations List */}
        <div style={{ borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Messages</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            {conversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                style={{
                  padding: '1rem 1.25rem',
                  borderBottom: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  backgroundColor: conv.id === activeConvId ? 'var(--color-primary-light)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'var(--transition)'
                }}
              >
                <img src={conv.avatar} alt={conv.conversationWith} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 800 }}>{conv.conversationWith}</h4>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{conv.timestamp}</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Active Conversation Chat Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Chat Header */}
          <div style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'var(--color-surface)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <img src={activeConv?.avatar} alt={activeConv?.conversationWith} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800 }}>{activeConv?.conversationWith}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-teal)', fontWeight: 700 }}>
                  Stay: {activeConv?.listingTitle}
                </span>
              </div>
            </div>

            <span className="badge-verified"><ShieldCheck size={13} /> Verified User</span>
          </div>

          {/* Chat History Bubbles */}
          <div style={{
            flex: 1,
            padding: '1.5rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backgroundColor: 'var(--color-bg)'
          }}>
            {activeConv?.history.map((msg, idx) => {
              const isMe = msg.sender === 'guest';
              return (
                <div
                  key={idx}
                  style={{
                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                    maxWidth: '70%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    backgroundColor: isMe ? 'var(--color-primary)' : 'var(--color-surface)',
                    color: isMe ? '#FFFFFF' : 'var(--color-text-main)',
                    padding: '0.75rem 1rem',
                    borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    boxShadow: 'var(--shadow-sm)',
                    fontSize: '0.92rem',
                    lineHeight: 1.45
                  }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '4px', padding: '0 4px' }}>
                    {msg.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form 
            onSubmit={handleSendMessage}
            style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              backgroundColor: 'var(--color-surface)'
            }}
          >
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message to host..."
              style={{
                flex: 1,
                padding: '0.75rem 1.25rem',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid var(--color-border)',
                outline: 'none',
                fontSize: '0.92rem'
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.25rem' }}>
              <Send size={18} />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
