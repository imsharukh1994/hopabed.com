import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import LoadingScreen from './components/LoadingScreen';

import LandingPage from './pages/LandingPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ListingDetailPage from './pages/ListingDetailPage';
import BookingFlowModal from './pages/BookingFlowModal';
import HostDashboard from './pages/HostDashboard';
import MessagingPage from './pages/MessagingPage';
import TripsPage from './pages/TripsPage';
import ListingWizard from './pages/ListingWizard';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import OpenProtocolPage from './pages/OpenProtocolPage';
import HostelPartnersPage from './pages/HostelPartnersPage';
import TravelGuidesPage from './pages/TravelGuidesPage';
import SkillExchangePage from './pages/SkillExchangePage';

// Feature Components & Modals
import TrustPassportModal from './components/TrustPassportModal';
import EmergencySOSModal from './components/EmergencySOSModal';
import DigitalPassModal from './components/DigitalPassModal';
import ProofOfWorkModal from './components/ProofOfWorkModal';
import CityGuideModal from './components/CityGuideModal';
import HostInquiryModal from './components/HostInquiryModal';
import HostReviewsModal from './components/HostReviewsModal';
import HopperAIAssistant from './components/HopperAIAssistant';
import { Bot } from 'lucide-react';

import { getCloudListings, saveCloudListing, saveCloudBooking, updateCloudUserProfile } from './services/dbService';

import { 
  INITIAL_DESTINATIONS,
  INITIAL_LISTINGS,
  INITIAL_BOOKINGS,
  INITIAL_MESSAGES
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing'); 
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [isBtnFocused, setIsBtnFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);
    const listener = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const [cloudListings, setCloudListings] = useState([]);
  const [useDemoData, setUseDemoData] = useState(true);
  const [destinations] = useState(INITIAL_DESTINATIONS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [loadingCloud, setLoadingCloud] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const [selectedListing, setSelectedListing] = useState(null);
  const [bookingModalData, setBookingModalData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('Bangkok');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  // New Modals State
  const [selectedCityGuide, setSelectedCityGuide] = useState(null);
  const [inquiryListing, setInquiryListing] = useState(null);
  const [reviewsListing, setReviewsListing] = useState(null);

  // Initial Loading Screen Timer (1.2s splash screen)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Theme State ('dark' or 'light')
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('bedhopper_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bedhopper_theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleRefreshHome = () => {
    setActiveTab('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsInitialLoading(true);
    setTimeout(() => {
      setIsInitialLoading(false);
    }, 800);
  };

  // Feature Modals Visibility States
  const [showTrustModal, setShowTrustModal] = useState(false);
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [selectedPassBooking, setSelectedPassBooking] = useState(null);
  const [selectedProofBooking, setSelectedProofBooking] = useState(null);

  // Restore User Session from LocalStorage on Mount
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bedhopper_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  // Active listings list based on Demo Mode toggle or Cloud DB
  const activeListings = useDemoData 
    ? [...cloudListings, ...INITIAL_LISTINGS] 
    : (cloudListings.length > 0 ? cloudListings : INITIAL_LISTINGS);

  // Load Cloud Database Listings on Mount
  useEffect(() => {
    async function loadCloudData() {
      setLoadingCloud(true);
      const realListings = await getCloudListings();
      if (realListings && realListings.length > 0) {
        setCloudListings(realListings);
      }
      setLoadingCloud(false);
    }
    loadCloudData();
  }, []);

  // Navigation Handlers
  const handleSearch = ({ location }) => {
    if (location) setSearchQuery(location);
    setActiveTab('search');
  };

  const handleDestinationClick = (destName) => {
    setSearchQuery(destName);
    setActiveTab('search');
  };

  const handleSelectListing = (listing) => {
    setSelectedListing(listing);
    setActiveTab('detail');
  };

  const handleStartBooking = (listing, details) => {
    setBookingModalData({ listing, details });
  };

  const handleConfirmBooking = async (newBooking) => {
    setBookings([newBooking, ...bookings]);
    setBookingModalData(null);
    setActiveTab('trips');
    await saveCloudBooking(newBooking, currentUser?.id);
  };

  const handlePublishListing = async (newListing) => {
    setCloudListings([newListing, ...cloudListings]);
    setActiveTab('host-dashboard');
    await saveCloudListing(newListing, currentUser?.id);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLoginSuccess = (userSession) => {
    setCurrentUser(userSession);
    localStorage.setItem('bedhopper_user', JSON.stringify(userSession));
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bedhopper_user');
    setActiveTab('landing');
  };

  const handleVerifySuccess = () => {
    if (currentUser) {
      const updated = { ...currentUser, trustPassport: true };
      setCurrentUser(updated);
      localStorage.setItem('bedhopper_user', JSON.stringify(updated));
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-main)', transition: 'background-color 0.3s' }}>
      {/* Global Splash / Loading Screen */}
      {isInitialLoading && <LoadingScreen message="Loading global bed-share network..." />}

      {/* Top Desktop Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onRefreshHome={handleRefreshHome}
      />

      {/* Main Website Router */}
      <main style={{ flex: 1 }}>
        {activeTab === 'landing' && (
          <LandingPage 
            destinations={destinations}
            featuredListings={activeListings}
            onSearch={handleSearch}
            onSelectListing={handleSelectListing}
            onDestinationClick={handleDestinationClick}
            onOpenCityGuide={(cityName) => setSelectedCityGuide(cityName)}
            onNavigate={setActiveTab}
            selectedCurrency={selectedCurrency}
          />
        )}

        {(activeTab === 'search' || activeTab === 'service-share') && (
          <SearchResultsPage 
            listings={activeTab === 'service-share' ? activeListings.filter(l => l.isServiceShare) : activeListings}
            onSelectListing={handleSelectListing}
            initialQuery={searchQuery}
            selectedCurrency={selectedCurrency}
          />
        )}

        {activeTab === 'skill-exchange' && (
          <SkillExchangePage 
            onSelectListing={handleSelectListing}
          />
        )}

        {activeTab === 'detail' && selectedListing && (
          <ListingDetailPage 
            listing={selectedListing}
            onBack={() => setActiveTab('search')}
            onBook={handleStartBooking}
            onOpenInquiry={(lst) => setInquiryListing(lst)}
            onOpenReviews={(lst) => setReviewsListing(lst)}
            selectedCurrency={selectedCurrency}
          />
        )}

        {activeTab === 'host-dashboard' && (
          <HostDashboard 
            listings={activeListings}
            bookings={bookings}
            onCreateNewListing={() => setActiveTab('wizard')}
            onOpenMessaging={() => setActiveTab('messaging')}
          />
        )}

        {activeTab === 'wizard' && (
          <ListingWizard 
            onPublishListing={handlePublishListing}
            onCancel={() => setActiveTab('host-dashboard')}
          />
        )}

        {activeTab === 'messaging' && (
          <MessagingPage 
            initialConversations={messages}
          />
        )}

        {activeTab === 'trips' && (
          <TripsPage 
            bookings={bookings}
            onSelectListing={handleSelectListing}
            onOpenMessaging={() => setActiveTab('messaging')}
            onOpenDigitalPass={(b) => setSelectedPassBooking(b)}
            onOpenProofOfWork={(b) => setSelectedProofBooking(b)}
            selectedCurrency={selectedCurrency}
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage 
            currentUser={currentUser} 
            onOpenTrustModal={() => setShowTrustModal(true)}
            onOpenSOSModal={() => setShowSOSModal(true)}
            onLogout={handleLogout}
            onUpdateUser={async (updated) => {
              setCurrentUser(updated);
              localStorage.setItem('bedhopper_user', JSON.stringify(updated));
              await updateCloudUserProfile(updated);
            }}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard 
            bookings={bookings}
            listings={activeListings}
          />
        )}

        {activeTab === 'protocol' && (
          <OpenProtocolPage onNavigate={setActiveTab} />
        )}

        {activeTab === 'hostel-partners' && (
          <HostelPartnersPage onNavigate={setActiveTab} />
        )}

        {activeTab === 'travel-guides' && (
          <TravelGuidesPage onSearch={handleSearch} />
        )}
      </main>

      {/* Website Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* Booking Flow Modal */}
      {bookingModalData && (
        <BookingFlowModal 
          bookingData={bookingModalData}
          onClose={() => setBookingModalData(null)}
          onConfirmBooking={handleConfirmBooking}
          selectedCurrency={selectedCurrency}
        />
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <AuthModal 
          initialMode={authMode}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Trust Passport Verification Modal */}
      <TrustPassportModal 
        isOpen={showTrustModal}
        onClose={() => setShowTrustModal(false)}
        onVerifySuccess={handleVerifySuccess}
      />

      {/* Solo Traveler Emergency SOS Modal */}
      <EmergencySOSModal 
        isOpen={showSOSModal}
        onClose={() => setShowSOSModal(false)}
      />

      {/* Digital Check-In Wallet Pass Modal */}
      <DigitalPassModal 
        isOpen={!!selectedPassBooking}
        onClose={() => setSelectedPassBooking(null)}
        booking={selectedPassBooking}
        selectedCurrency={selectedCurrency}
      />

      {/* Proof of Work & Escrow Release Modal */}
      {selectedProofBooking && (
        <ProofOfWorkModal 
          isOpen={!!selectedProofBooking}
          onClose={() => setSelectedProofBooking(null)}
          booking={selectedProofBooking}
          onComplete={(bookingId) => {
            setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, paymentStatus: '$20 Escrow Deposit Refunded' } : b));
          }}
        />
      )}

      {/* City Travel Guide Modal */}
      <CityGuideModal 
        isOpen={!!selectedCityGuide}
        onClose={() => setSelectedCityGuide(null)}
        cityName={selectedCityGuide}
      />

      {/* Host Direct Pre-Booking Inquiry Modal */}
      <HostInquiryModal 
        isOpen={!!inquiryListing}
        onClose={() => setInquiryListing(null)}
        listing={inquiryListing}
      />

      {/* Verified Host Reviews Breakdown Modal */}
      <HostReviewsModal 
        isOpen={!!reviewsListing}
        onClose={() => setReviewsListing(null)}
        listing={reviewsListing}
      />

      {/* Hopper AI Assistant Component */}
      <HopperAIAssistant
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        listings={activeListings}
        selectedCurrency={selectedCurrency}
        onSelectListing={handleSelectListing}
      />

      {/* Floating AI Assistant Toggle Button */}
      {!showAIAssistant && (
        <button
          onClick={() => setShowAIAssistant(true)}
          aria-expanded={showAIAssistant}
          aria-label="Open Hopper AI Companion"
          title="Open Hopper AI Chat Companion"
          onFocus={() => setIsBtnFocused(true)}
          onBlur={() => setIsBtnFocused(false)}
          style={{
            position: 'fixed',
            bottom: isMobile ? '80px' : '24px',
            right: '24px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
            color: '#fff',
            border: 'none',
            boxShadow: 'var(--shadow-lg)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9998,
            transition: 'transform 0.2s, background-color 0.2s',
            outline: isBtnFocused ? '3px solid var(--color-accent)' : 'none',
            outlineOffset: '2px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Bot size={22} />
        </button>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={1}
      />
    </div>
  );
}
