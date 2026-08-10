-- BedHopper Initial Seed Data for Supabase Cloud Database

-- 1. SEED TEST USERS
INSERT INTO users (id, name, email, password_hash, profile_photo, bio, phone, id_verified, trust_passport_active, role)
VALUES 
  ('a1111111-1111-1111-1111-111111111111', 'Anna Schmidt', 'anna@bedhopper.org', '$2a$10$hashedpass123', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', 'Digital nomad & travel enthusiast living in Bangkok. Love meeting backpackers!', '+66 81 234 5678', TRUE, TRUE, 'host'),
  ('b2222222-2222-2222-2222-222222222222', 'Tom Holland', 'tom@bedhopper.org', '$2a$10$hashedpass123', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', 'Expat working remotely with a golden retriever. Offering free couch for dog walking!', '+66 82 345 6789', TRUE, TRUE, 'host'),
  ('c3333333-3333-3333-3333-333333333333', 'John Doe', 'john@traveler.com', '$2a$10$hashedpass123', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80', 'Solo backpacker exploring Southeast Asia.', '+1 555 019 2831', TRUE, TRUE, 'traveler')
ON CONFLICT (email) DO NOTHING;

-- 2. SEED SAMPLE LISTINGS
INSERT INTO listings (id, host_id, title, description, type, max_guests, price_per_night, currency, city, country, address, latitude, longitude, photos, amenities, house_rules, is_service_share, active)
VALUES 
  (
    'd4444444-4444-4444-4444-444444444444',
    'a1111111-1111-1111-1111-111111111111',
    'Cozy couch in Sukhumvit',
    'Clean, comfortable sofa in a quiet air-conditioned apartment near BTS Asok.',
    'couch',
    1,
    5.00,
    'USD',
    'Bangkok',
    'Thailand',
    'Soi 23, Sukhumvit Road',
    13.736717,
    100.560411,
    ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80'],
    ARRAY['Wi-Fi', 'Kitchen', 'Air Conditioning', 'Laundry'],
    ARRAY['No smoking inside', 'Quiet hours 11 PM - 7 AM'],
    FALSE,
    TRUE
  ),
  (
    'e5555555-5555-5555-5555-555555555555',
    'b2222222-2222-2222-2222-222222222222',
    'Service-Share Bed (Dog Walking & Reception)',
    'Free comfortable bed in exchange for 45 mins daily dog walking!',
    'service-share',
    1,
    0.00,
    'USD',
    'Bangkok',
    'Thailand',
    'Ari Neighborhood',
    13.779762,
    100.544778,
    ARRAY['https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'],
    ARRAY['Free Accommodation', 'Wi-Fi', 'Pet Friendly'],
    ARRAY['Must love dogs!'],
    TRUE,
    TRUE
  )
ON CONFLICT (id) DO NOTHING;
