import { supabase, isCloudConnected } from '../lib/supabaseClient';

// Save User Profile directly to public.users table in Supabase
export async function saveCloudUser(userSession) {
  if (!isCloudConnected() || !userSession?.email) return userSession;
  try {
    const { data, error } = await supabase
      .from('users')
      .upsert([
        {
          name: userSession.name || userSession.email.split('@')[0],
          email: userSession.email,
          password_hash: 'hashed_auth_session',
          role: userSession.role || 'traveler',
          id_verified: true,
          trust_passport_active: true,
          profile_photo: userSession.avatar || null
        }
      ], { onConflict: 'email' })
      .select();

    if (error) {
      console.warn('Notice saving user to public.users:', error.message);
      return userSession;
    }

    const savedRecord = data?.[0];
    return {
      id: savedRecord?.id || userSession.id,
      name: savedRecord?.name || userSession.name,
      email: savedRecord?.email || userSession.email,
      role: savedRecord?.role || userSession.role,
      isVerified: savedRecord?.id_verified ?? true,
      trustPassport: savedRecord?.trust_passport_active ?? true,
      avatar: savedRecord?.profile_photo || userSession.avatar
    };
  } catch (err) {
    console.error('Error saving user to Supabase:', err);
    return userSession;
  }
}

// Update existing User Profile (photo, name, bio) in public.users table
export async function updateCloudUserProfile(userSession) {
  if (!isCloudConnected() || !userSession?.email) return userSession;
  try {
    const { error } = await supabase
      .from('users')
      .update({
        profile_photo: userSession.avatar || null,
        name: userSession.name,
        bio: userSession.bio
      })
      .eq('email', userSession.email);

    if (error) {
      console.warn('Notice updating profile_photo in public.users:', error.message);
    }
    return userSession;
  } catch (err) {
    console.error('Exception updating user in Supabase:', err);
    return userSession;
  }
}

// Fetch User Profile from public.users table by email
export async function getCloudUserByEmail(email) {
  if (!isCloudConnected() || !email) return null;
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      isVerified: data.id_verified,
      trustPassport: data.trust_passport_active,
      avatar: data.profile_photo || ''
    };
  } catch (err) {
    console.error('Error fetching user from Supabase:', err);
    return null;
  }
}

// Fetch Cloud Listings from public.listings table
export async function getCloudListings() {
  if (!isCloudConnected()) return [];
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type,
      maxGuests: item.max_guests,
      pricePerNight: Number(item.price_per_night),
      currency: item.currency || 'USD',
      city: item.city,
      country: item.country,
      address: item.address,
      images: item.photos || ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'],
      amenities: item.amenities || ['Wi-Fi', 'Hot Shower'],
      houseRules: item.house_rules || ['No smoking inside', 'Quiet hours 10 PM'],
      isServiceShare: item.is_service_share,
      rating: 4.9,
      reviewsCount: 1,
      distFromCenter: '1.0 km',
      host: {
        name: 'Verified Host',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        responseRate: '100%',
        joinedDate: '2026',
        isVerified: true
      }
    }));
  } catch (err) {
    console.error('Error fetching listings from Supabase:', err);
    return [];
  }
}

// Save New Stay Listing to public.listings table
export async function saveCloudListing(listingData, hostId) {
  if (!isCloudConnected()) return listingData;
  try {
    const { data, error } = await supabase
      .from('listings')
      .insert([
        {
          title: listingData.title,
          description: listingData.description || 'Verified low-cost stay',
          type: listingData.type || 'couch',
          max_guests: listingData.maxGuests || 1,
          price_per_night: listingData.pricePerNight || 0,
          currency: listingData.currency || 'USD',
          city: listingData.city || 'Bangkok',
          country: listingData.country || 'Thailand',
          address: listingData.address || 'Central City',
          photos: listingData.images || [],
          amenities: listingData.amenities || ['Wi-Fi'],
          is_service_share: Boolean(listingData.isServiceShare),
          active: true
        }
      ])
      .select();

    if (error) {
      console.warn('Notice saving listing to public.listings:', error.message);
      return listingData;
    }

    return { ...listingData, id: data?.[0]?.id || listingData.id };
  } catch (err) {
    console.error('Error saving listing to Supabase:', err);
    return listingData;
  }
}

// Save New Booking to public.bookings table
export async function saveCloudBooking(bookingData, userId) {
  if (!isCloudConnected()) return bookingData;
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          listing_id: bookingData.listingId || null,
          check_in: bookingData.checkInDate || '2026-08-12',
          check_out: bookingData.checkOutDate || '2026-08-14',
          guests: bookingData.guestsCount || 1,
          total_price: bookingData.totalPrice || 0,
          status: 'confirmed',
          payment_status: bookingData.paymentStatus || 'paid'
        }
      ])
      .select();

    if (error) {
      console.warn('Notice saving booking to public.bookings:', error.message);
      return bookingData;
    }

    return { ...bookingData, id: data?.[0]?.id || bookingData.id };
  } catch (err) {
    console.error('Error saving booking to Supabase:', err);
    return bookingData;
  }
}
