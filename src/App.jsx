import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
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

import { getCloudListings, saveCloudListing, saveCloudBooking } from './services/dbService';

import { 
  INITIAL_DESTINATIONS
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing'); 
  const [listings, setListings] = useState([]); // Empty array - strictly real cloud database listings only!
  const [destinations] = useState(INITIAL_DESTINATIONS);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingCloud, setLoadingCloud] = useState(true);
  
  const [selectedListing, setSelectedListing] = useState(null);
  const [bookingModalData, setBookingModalData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('Bangkok');
  const [selectedCurrency, setSelectedCurrency] = useState('$');

  // Load ONLY real Cloud Database Listings on Mount
  useEffect(() => {
    async function loadCloudData() {
      setLoadingCloud(true);
      const realListings = await getCloudListings();
      if (realListings) {
        setListings(realListings); // Set exactly what Supabase cloud returns (empty array if 0 records)
      } else {
        setListings([]);
      }
      setLoadingCloud(false);
    }
    loadCloudData();
  }, []);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

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
    setListings([newListing, ...listings]);
    setActiveTab('host-dashboard');
    await saveCloudListing(newListing, currentUser?.id);
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLoginSuccess = (userSession) => {
    setCurrentUser(userSession);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('landing');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      {/* Top Desktop Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Website Router */}
      <main style={{ flex: 1 }}>
        {activeTab === 'landing' && (
          <LandingPage 
            destinations={destinations}
            featuredListings={listings}
            onSearch={handleSearch}
            onSelectListing={handleSelectListing}
            onDestinationClick={handleDestinationClick}
            onNavigate={setActiveTab}
          />
        )}

        {(activeTab === 'search' || activeTab === 'service-share') && (
          <SearchResultsPage 
            listings={activeTab === 'service-share' ? listings.filter(l => l.isServiceShare) : listings}
            onSelectListing={handleSelectListing}
            initialQuery={searchQuery}
          />
        )}

        {activeTab === 'detail' && selectedListing && (
          <ListingDetailPage 
            listing={selectedListing}
            onBack={() => setActiveTab('search')}
            onBook={handleStartBooking}
          />
        )}

        {activeTab === 'host-dashboard' && (
          <HostDashboard 
            listings={listings}
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
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage currentUser={currentUser} />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard 
            bookings={bookings}
            listings={listings}
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

      {/* Mobile Bottom Navigation Bar (Hidden on Desktop) */}
      <MobileNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={1}
      />
    </div>
  );
}
