import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Footer from './components/Footer';
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

import { 
  INITIAL_DESTINATIONS, 
  INITIAL_LISTINGS, 
  INITIAL_BOOKINGS, 
  INITIAL_MESSAGES 
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing'); // 'landing', 'search', 'detail', 'wizard', 'host-dashboard', 'messaging', 'trips', 'profile', 'admin', 'service-share', 'protocol', 'hostel-partners'
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [destinations] = useState(INITIAL_DESTINATIONS);
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  
  const [selectedListing, setSelectedListing] = useState(null);
  const [bookingModalData, setBookingModalData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('Bangkok');
  const [selectedCurrency, setSelectedCurrency] = useState('$');

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

  const handleConfirmBooking = (newBooking) => {
    setBookings([newBooking, ...bookings]);
    setBookingModalData(null);
    setActiveTab('trips');
  };

  const handlePublishListing = (newListing) => {
    setListings([newListing, ...listings]);
    setActiveTab('host-dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg)' }}>
      {/* Top Desktop & Responsive Web Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCurrency={selectedCurrency}
        setSelectedCurrency={setSelectedCurrency}
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
          <ProfilePage />
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

      {/* Mobile Bottom Navigation Bar (Hidden on Desktop) */}
      <MobileNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={1}
      />
    </div>
  );
}
