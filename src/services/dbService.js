import { supabase, isCloudConnected } from '../lib/supabaseClient';

// Fetch Listings from Supabase Cloud Database
export async function getCloudListings() {
  if (!isCloudConnected()) return null;
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch listings notice:', error.message);
      return null;
    }
    
    // Map Supabase column names to App format if data exists
    return data?.map(item => ({
      id: item.id,
      title: item.title,
      city: item.city,
      country: item.country,
      address: item.address || item.city,
      distFromCenter: '1.5 km',
      lat: item.latitude || 13.7563,
      lng: item.longitude || 100.5018,
      pricePerNight: Number(item.price_per_night),
      currency: item.currency || '$',
      type: item.type,
      typeLabel: item.type === 'service-share' ? 'Service-Share Stay' : item.type === 'couch' ? 'Couch / Shared Space' : item.type === 'dorm' ? 'Shared Dorm Bed' : 'Private Room',
      rating: 5.0,
      reviewsCount: 0,
      images: item.photos && item.photos.length > 0 ? item.photos : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'],
      host: {
        id: item.host_id,
        name: 'Verified Host',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        isVerified: true,
        trustPassport: true,
        responseRate: '100%',
        joinedDate: '2026',
        bio: 'Host on BedHopper network'
      },
      amenities: item.amenities || ['Wi-Fi', 'Essentials'],
      houseRules: item.house_rules || ['Respect host rules'],
      available: item.active,
      isServiceShare: item.is_service_share
    }));
  } catch (err) {
    console.error('Error connecting to Supabase:', err);
    return null;
  }
}

// Publish New Listing directly to Supabase Cloud Database
export async function saveCloudListing(newListing, userId) {
  if (!isCloudConnected()) return null;
  try {
    const { data, error } = await supabase
      .from('listings')
      .insert([
        {
          host_id: userId || 'a1111111-1111-1111-1111-111111111111',
          title: newListing.title,
          description: newListing.description || newListing.title,
          type: newListing.type,
          price_per_night: newListing.pricePerNight,
          currency: newListing.currency || 'USD',
          city: newListing.city,
          country: newListing.country,
          address: newListing.address,
          latitude: newListing.lat || 13.7367,
          longitude: newListing.lng || 100.5604,
          photos: newListing.images || [],
          amenities: newListing.amenities || [],
          house_rules: newListing.houseRules || [],
          is_service_share: newListing.isServiceShare || false,
          active: true
        }
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (err) {
    console.error('Error saving listing to Supabase:', err);
    return null;
  }
}

// Save New Booking directly to Supabase Cloud Database
export async function saveCloudBooking(newBooking, userId) {
  if (!isCloudConnected()) return null;
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          booking_code: newBooking.id,
          guest_id: userId || 'c3333333-3333-3333-3333-333333333333',
          check_in_date: newBooking.checkIn,
          check_out_date: newBooking.checkOut,
          nights: newBooking.nights,
          guests_count: newBooking.guests,
          nightly_price: newBooking.nightlyPrice,
          subtotal: newBooking.subtotal,
          platform_fee: newBooking.serviceFee,
          total_price: newBooking.totalPrice,
          status: newBooking.status,
          payment_status: newBooking.paymentStatus,
          is_service_share: newBooking.totalPrice === 0
        }
      ])
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (err) {
    console.error('Error saving booking to Supabase:', err);
    return null;
  }
}
