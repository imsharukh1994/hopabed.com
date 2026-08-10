-- BedHopper / HopABed PostgreSQL Relational Database Schema
-- Version: 1.0.0
-- Compatible with PostgreSQL 13+ & Supabase

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_photo TEXT,
    bio TEXT,
    phone VARCHAR(50),
    id_verified BOOLEAN DEFAULT FALSE,
    trust_passport_active BOOLEAN DEFAULT FALSE,
    role VARCHAR(50) DEFAULT 'traveler', -- 'traveler', 'host', 'both', 'admin'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PROPERTIES TABLE (Commercial Hostels & Guesthouses)
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    registration_number VARCHAR(100),
    property_type VARCHAR(100) DEFAULT 'hostel', -- 'hostel', 'guesthouse', 'capsule'
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    approved_by_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. LISTINGS TABLE
CREATE TABLE IF NOT EXISTS listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL, -- 'couch', 'dorm', 'private', 'service-share'
    max_guests INT DEFAULT 1,
    price_per_night DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'USD',
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    photos TEXT[], -- Array of photo URLs
    amenities TEXT[], -- Array of amenities ['Wi-Fi', 'Kitchen', etc]
    house_rules TEXT[],
    is_service_share BOOLEAN DEFAULT FALSE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_code VARCHAR(20) UNIQUE NOT NULL,
    listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
    guest_id UUID REFERENCES users(id) ON DELETE CASCADE,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    nights INT NOT NULL DEFAULT 1,
    guests_count INT NOT NULL DEFAULT 1,
    nightly_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    platform_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.00, -- 8% fee
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Confirmed', 'Cancelled', 'Completed'
    payment_status VARCHAR(100) DEFAULT 'Unpaid',
    is_service_share BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reviewee_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. SERVICE-SHARE AGREEMENTS TABLE
CREATE TABLE IF NOT EXISTS service_share_agreements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    task_category VARCHAR(255) NOT NULL,
    hours_per_day DECIMAL(4, 2) NOT NULL DEFAULT 0.5,
    deposit_held DECIMAL(10, 2) DEFAULT 20.00,
    deposit_status VARCHAR(50) DEFAULT 'Escrow Held', -- 'Escrow Held', 'Refunded', 'Forfeited'
    digital_signature VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_listings_city ON listings(city);
CREATE INDEX IF NOT EXISTS idx_listings_price ON listings(price_per_night);
CREATE INDEX IF NOT EXISTS idx_bookings_guest ON bookings(guest_id);
CREATE INDEX IF NOT EXISTS idx_bookings_listing ON listings(id);

-- ENABLE ROW LEVEL SECURITY (RLS) POLICIES FOR PUBLIC READ ACCESS
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public listings viewable" ON listings;
CREATE POLICY "Public listings viewable" ON listings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public listings insertable" ON listings;
CREATE POLICY "Public listings insertable" ON listings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public bookings viewable" ON bookings;
CREATE POLICY "Public bookings viewable" ON bookings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public bookings insertable" ON bookings;
CREATE POLICY "Public bookings insertable" ON bookings FOR INSERT WITH CHECK (true);
