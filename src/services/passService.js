// BedHopper Digital Wallet Pass Service
// Handles all pass generation, verification, check-in, check-out and audit logging
// Uses Supabase directly (no server backend) with client-side crypto for token generation

import { supabase, isCloudConnected } from '../lib/supabaseClient';

// ─────────────────────────────────────────────────────────────
// Token Generation Utilities
// ─────────────────────────────────────────────────────────────

/**
 * Generate a cryptographically secure random string using Web Crypto API.
 * Returns uppercase hex characters suitable for public display.
 */
function generateSecureHex(bytes = 4) {
  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map(b => b.toString(16).padStart(2, '0').toUpperCase())
    .join('');
}

/**
 * Generate a URL-safe random token (base36 style).
 */
function generateUrlSafeToken(length = 32) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  return Array.from(array)
    .map(b => chars[b % chars.length])
    .join('');
}

/**
 * Generate a unique Node Code for a property/listing.
 * Format: BH-XXXXXX (6 alphanumeric chars, no ambiguous chars)
 */
export function generateNodeCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const array = new Uint8Array(6);
  crypto.getRandomValues(array);
  const code = Array.from(array)
    .map(b => chars[b % chars.length])
    .join('');
  return `BH-${code}`;
}

/**
 * Generate a pass code. Format: BH-PASS-XXXXXXXX
 */
function generatePassCode() {
  return `BH-PASS-${generateSecureHex(4)}`;
}

/**
 * Generate a simple pass hash (base64 of passCode + bookingId).
 * Since we have no server secret, this is for display only; real
 * verification is always done server-side against the database record.
 */
function generatePassHash(passCode, bookingId) {
  const raw = `${passCode}:${bookingId}:bedhopper`;
  return btoa(raw).replace(/[^A-Za-z0-9]/g, '').substring(0, 16).toUpperCase();
}

// ─────────────────────────────────────────────────────────────
// Pass Expiry Calculation
// ─────────────────────────────────────────────────────────────

/**
 * Calculate pass expiry: check-out date + 24 hours grace period.
 */
function calculateExpiry(checkOutDate) {
  try {
    // Handle formats like "14 Aug 2026" or "2026-08-14"
    const date = new Date(checkOutDate);
    if (isNaN(date.getTime())) {
      // Fallback: 30 days from now
      const fallback = new Date();
      fallback.setDate(fallback.getDate() + 30);
      return fallback.toISOString();
    }
    date.setHours(date.getHours() + 24);
    return date.toISOString();
  } catch {
    const fallback = new Date();
    fallback.setDate(fallback.getDate() + 30);
    return fallback.toISOString();
  }
}

// ─────────────────────────────────────────────────────────────
// Offline LocalStorage Cache
// ─────────────────────────────────────────────────────────────

const PASS_CACHE_PREFIX = 'bedhopper_pass_';
const PASS_SYNC_KEY = 'bedhopper_pass_sync_';

/**
 * Save a sanitized copy of the pass to localStorage for offline use.
 * Does NOT store passwords, auth tokens, or sensitive PII beyond what's
 * needed to display the pass to the guest.
 */
export function cachePassOffline(pass) {
  try {
    const safePass = {
      passCode: pass.passCode || pass.pass_code,
      passId: pass.id || pass.passId,
      bookingId: pass.bookingId || pass.booking_id,
      guestName: pass.guestName,
      hostName: pass.hostName,
      propertyName: pass.propertyName || pass.listingTitle,
      nodeCode: pass.nodeCode,
      checkIn: pass.checkIn,
      checkOut: pass.checkOut,
      qrToken: pass.qrToken || pass.qr_token,
      status: pass.status,
      issuedAt: pass.issuedAt || pass.issued_at,
      expiresAt: pass.expiresAt || pass.expires_at,
    };
    const key = `${PASS_CACHE_PREFIX}${safePass.passCode}`;
    localStorage.setItem(key, JSON.stringify(safePass));
    localStorage.setItem(`${PASS_SYNC_KEY}${safePass.passCode}`, new Date().toISOString());
    return true;
  } catch {
    return false;
  }
}

/**
 * Load a cached pass from localStorage by passCode.
 */
export function loadCachedPass(passCode) {
  try {
    const key = `${PASS_CACHE_PREFIX}${passCode}`;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const pass = JSON.parse(raw);
    const syncTime = localStorage.getItem(`${PASS_SYNC_KEY}${passCode}`);
    return { ...pass, lastSynced: syncTime };
  } catch {
    return null;
  }
}

/**
 * Get all cached passes from localStorage.
 */
export function getAllCachedPasses() {
  try {
    const passes = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PASS_CACHE_PREFIX)) {
        try {
          const raw = localStorage.getItem(key);
          if (raw) {
            const pass = JSON.parse(raw);
            const syncTime = localStorage.getItem(`${PASS_SYNC_KEY}${pass.passCode}`);
            passes.push({ ...pass, lastSynced: syncTime });
          }
        } catch { /* skip corrupt entries */ }
      }
    }
    return passes;
  } catch {
    return [];
  }
}

// ─────────────────────────────────────────────────────────────
// Pass Generation
// ─────────────────────────────────────────────────────────────

/**
 * Generate a digital pass for an approved booking.
 * This is called server-side (Supabase) when a host approves a booking.
 *
 * @param {Object} booking - The booking object
 * @param {Object} listing - The listing/property object
 * @param {Object} guest - The guest user object
 * @param {Object} host - The host user object
 * @returns {Object} The created digital pass
 */
export async function generateDigitalPass(booking, listing, guest, host) {
  const passCode = generatePassCode();
  const qrToken = generateUrlSafeToken(32);
  const passHash = generatePassHash(passCode, booking.id);
  const nodeCode = listing?.nodeCode || generateNodeCode();
  const expiresAt = calculateExpiry(booking.checkOut || booking.check_out_date);

  const passData = {
    passCode,
    passHash,
    qrToken,
    nodeCode,
    bookingId: booking.id,
    guestId: guest?.id || booking.guestId || booking.guest_id,
    hostId: host?.id || booking.hostId,
    listingId: listing?.id || booking.listingId,
    guestName: guest?.name || booking.guestName,
    hostName: host?.name || booking.hostName,
    propertyName: listing?.title || booking.listingTitle,
    checkIn: booking.checkIn || booking.check_in_date,
    checkOut: booking.checkOut || booking.check_out_date,
    expiresAt,
    status: 'ACTIVE',
    issuedAt: new Date().toISOString(),
  };

  if (isCloudConnected()) {
    try {
      const { data, error } = await supabase
        .from('digital_passes')
        .insert([{
          booking_id: passData.bookingId,
          guest_id: passData.guestId,
          host_id: passData.hostId,
          listing_id: passData.listingId,
          pass_code: passData.passCode,
          pass_hash: passData.passHash,
          qr_token: passData.qrToken,
          node_code: passData.nodeCode,
          guest_name: passData.guestName,
          host_name: passData.hostName,
          property_name: passData.propertyName,
          check_in: passData.checkIn,
          check_out: passData.checkOut,
          status: 'ACTIVE',
          issued_at: passData.issuedAt,
          expires_at: passData.expiresAt,
        }])
        .select()
        .single();

      if (!error && data) {
        const cloudPass = { ...passData, id: data.id };
        cachePassOffline(cloudPass);
        await logPassAudit(data.id, 'PASS_GENERATED', passData.hostId, { bookingId: passData.bookingId });
        return cloudPass;
      }
    } catch (err) {
      console.warn('Cloud pass generation failed, using local pass:', err.message);
    }
  }

  // Fallback: local-only pass (no cloud)
  const localPass = { ...passData, id: `local-${passCode}` };
  cachePassOffline(localPass);
  return localPass;
}

// ─────────────────────────────────────────────────────────────
// Pass Retrieval
// ─────────────────────────────────────────────────────────────

/**
 * Get a pass by its QR token (used by the public verification page).
 * Only exposes minimum information needed for verification.
 */
export async function getPassByQrToken(token) {
  if (!token) return null;

  if (isCloudConnected()) {
    try {
      const { data, error } = await supabase
        .from('digital_passes')
        .select('*')
        .eq('qr_token', token)
        .single();

      if (error || !data) return null;

      return {
        id: data.id,
        passCode: data.pass_code,
        nodeCode: data.node_code,
        guestName: data.guest_name,
        hostName: data.host_name,
        propertyName: data.property_name,
        checkIn: data.check_in,
        checkOut: data.check_out,
        status: data.status,
        issuedAt: data.issued_at,
        expiresAt: data.expires_at,
        checkedInAt: data.checked_in_at,
        checkedOutAt: data.checked_out_at,
        bookingId: data.booking_id,
        hostId: data.host_id,
        guestId: data.guest_id,
        listingId: data.listing_id,
      };
    } catch (err) {
      console.warn('Error fetching pass by QR token:', err.message);
    }
  }

  // Offline fallback: search cache
  const allPasses = getAllCachedPasses();
  return allPasses.find(p => p.qrToken === token) || null;
}

/**
 * Get all passes for a specific guest/traveler.
 */
export async function getMyPasses(guestId) {
  if (!guestId) return getAllCachedPasses();

  if (isCloudConnected()) {
    try {
      const { data, error } = await supabase
        .from('digital_passes')
        .select('*')
        .eq('guest_id', guestId)
        .order('issued_at', { ascending: false });

      if (!error && data) {
        return data.map(d => ({
          id: d.id,
          passCode: d.pass_code,
          passHash: d.pass_hash,
          qrToken: d.qr_token,
          nodeCode: d.node_code,
          bookingId: d.booking_id,
          guestId: d.guest_id,
          hostId: d.host_id,
          listingId: d.listing_id,
          guestName: d.guest_name,
          hostName: d.host_name,
          propertyName: d.property_name,
          checkIn: d.check_in,
          checkOut: d.check_out,
          status: d.status,
          issuedAt: d.issued_at,
          expiresAt: d.expires_at,
          checkedInAt: d.checked_in_at,
          checkedOutAt: d.checked_out_at,
        }));
      }
    } catch (err) {
      console.warn('Error fetching passes:', err.message);
    }
  }

  return getAllCachedPasses();
}

/**
 * Get a single pass by its passCode (for modal display).
 */
export async function getPassByCode(passCode) {
  if (!passCode) return null;

  if (isCloudConnected()) {
    try {
      const { data, error } = await supabase
        .from('digital_passes')
        .select('*')
        .eq('pass_code', passCode)
        .single();

      if (!error && data) {
        return {
          id: data.id,
          passCode: data.pass_code,
          passHash: data.pass_hash,
          qrToken: data.qr_token,
          nodeCode: data.node_code,
          bookingId: data.booking_id,
          guestName: data.guest_name,
          hostName: data.host_name,
          propertyName: data.property_name,
          checkIn: data.check_in,
          checkOut: data.check_out,
          status: data.status,
          issuedAt: data.issued_at,
          expiresAt: data.expires_at,
        };
      }
    } catch (err) {
      console.warn('Error fetching pass by code:', err.message);
    }
  }

  return loadCachedPass(passCode);
}

// ─────────────────────────────────────────────────────────────
// Check-in & Check-out
// ─────────────────────────────────────────────────────────────

/**
 * Confirm guest check-in. Only the verified host of the booking may call this.
 *
 * Authorization checks:
 * 1. Pass must exist and be ACTIVE
 * 2. The calling user must be the host_id on the pass
 * 3. Current date must be on/after check-in date
 */
export async function confirmCheckIn(passId, hostId, hostName) {
  if (!passId || !hostId) {
    return { success: false, error: 'Missing required parameters.' };
  }

  if (isCloudConnected()) {
    try {
      // 1. Fetch pass
      const { data: pass, error: fetchError } = await supabase
        .from('digital_passes')
        .select('*')
        .eq('id', passId)
        .single();

      if (fetchError || !pass) {
        return { success: false, error: 'Pass not found.' };
      }

      // 2. Authorization: host must own the pass
      if (pass.host_id !== hostId) {
        return { success: false, error: 'Unauthorized. You are not the host of this booking.', code: 403 };
      }

      // 3. Pass must be ACTIVE
      if (pass.status !== 'ACTIVE') {
        return { success: false, error: `Cannot check in. Pass status is ${pass.status}.` };
      }

      // 4. Date validation: must be on or after check-in date
      const now = new Date();
      const checkInDate = new Date(pass.check_in);
      const checkOutDate = new Date(pass.check_out);
      if (now < checkInDate) {
        return { success: false, error: `Check-in is not allowed before ${pass.check_in}.` };
      }
      if (now > checkOutDate) {
        return { success: false, error: 'Check-in window has passed.' };
      }

      // 5. Update pass status
      const { error: updateError } = await supabase
        .from('digital_passes')
        .update({ status: 'CHECKED_IN', checked_in_at: now.toISOString(), updated_at: now.toISOString() })
        .eq('id', passId);

      if (updateError) throw updateError;

      // 6. Record check-in event
      await supabase.from('check_ins').insert([{
        pass_id: passId,
        booking_id: pass.booking_id,
        verified_by: hostId,
        verification_method: 'qr_scan',
        verified_at: now.toISOString(),
      }]);

      // 7. Audit log
      await logPassAudit(passId, 'CHECKED_IN', hostId, { hostName, method: 'qr_scan' });

      return { success: true, checkedInAt: now.toISOString() };

    } catch (err) {
      console.error('Check-in error:', err);
      return { success: false, error: 'Check-in failed. Please try again.' };
    }
  }

  // Demo mode (no cloud): simulate success
  return { success: true, checkedInAt: new Date().toISOString(), demo: true };
}

/**
 * Confirm guest check-out. Only the verified host of the booking may call this.
 */
export async function confirmCheckOut(passId, hostId, hostName) {
  if (!passId || !hostId) {
    return { success: false, error: 'Missing required parameters.' };
  }

  if (isCloudConnected()) {
    try {
      const { data: pass, error: fetchError } = await supabase
        .from('digital_passes')
        .select('*')
        .eq('id', passId)
        .single();

      if (fetchError || !pass) return { success: false, error: 'Pass not found.' };

      if (pass.host_id !== hostId) {
        return { success: false, error: 'Unauthorized.', code: 403 };
      }

      if (!['ACTIVE', 'CHECKED_IN'].includes(pass.status)) {
        return { success: false, error: `Cannot check out. Pass status is ${pass.status}.` };
      }

      const now = new Date();
      await supabase
        .from('digital_passes')
        .update({ status: 'CHECKED_OUT', checked_out_at: now.toISOString(), updated_at: now.toISOString() })
        .eq('id', passId);

      await logPassAudit(passId, 'CHECKED_OUT', hostId, { hostName });

      return { success: true, checkedOutAt: now.toISOString() };

    } catch (err) {
      console.error('Check-out error:', err);
      return { success: false, error: 'Check-out failed. Please try again.' };
    }
  }

  return { success: true, checkedOutAt: new Date().toISOString(), demo: true };
}

/**
 * Cancel a pass (e.g., when booking is cancelled).
 */
export async function cancelPass(passCode, cancelledBy) {
  if (isCloudConnected()) {
    try {
      const { error } = await supabase
        .from('digital_passes')
        .update({ status: 'CANCELLED', updated_at: new Date().toISOString() })
        .eq('pass_code', passCode);

      if (!error) {
        await logPassAudit(null, 'PASS_CANCELLED', cancelledBy, { passCode });
      }
      return { success: !error };
    } catch {
      return { success: false };
    }
  }
  return { success: true, demo: true };
}

// ─────────────────────────────────────────────────────────────
// Audit Logging
// ─────────────────────────────────────────────────────────────

/**
 * Write an audit log entry for a pass action.
 */
async function logPassAudit(passId, action, performedBy, metadata = {}) {
  if (!isCloudConnected()) return;
  try {
    await supabase.from('pass_audit_logs').insert([{
      pass_id: passId || null,
      action,
      performed_by: performedBy || 'system',
      metadata,
      created_at: new Date().toISOString(),
    }]);
  } catch {
    // Audit log failures must not break the main flow
  }
}

// ─────────────────────────────────────────────────────────────
// Node Code Management
// ─────────────────────────────────────────────────────────────

/**
 * Ensure a listing has a node code. Generate and save one if missing.
 */
export async function ensureListingNodeCode(listingId, existingNodeCode) {
  if (existingNodeCode) return existingNodeCode;

  const nodeCode = generateNodeCode();

  if (isCloudConnected() && listingId) {
    try {
      await supabase
        .from('listings')
        .update({ node_code: nodeCode })
        .eq('id', listingId);
    } catch { /* non-critical */ }
  }

  return nodeCode;
}

// ─────────────────────────────────────────────────────────────
// Booking Approval Workflow
// ─────────────────────────────────────────────────────────────

/**
 * Host approves a booking and triggers automatic pass generation.
 *
 * @returns {{ success: boolean, pass: Object }}
 */
export async function approveBookingAndGeneratePass(booking, listing, guest, host) {
  // Update booking status in Supabase if cloud connected
  if (isCloudConnected() && booking.id) {
    try {
      await supabase
        .from('bookings')
        .update({ status: 'Confirmed', booking_status: 'PASS_ACTIVE' })
        .eq('booking_code', booking.id);
    } catch { /* non-critical, continue */ }
  }

  // Generate the digital pass
  const pass = await generateDigitalPass(booking, listing, guest, host);
  return { success: true, pass };
}

/**
 * Host rejects a booking.
 */
export async function rejectBooking(bookingId, hostId) {
  if (isCloudConnected()) {
    try {
      await supabase
        .from('bookings')
        .update({ status: 'Cancelled', booking_status: 'REJECTED' })
        .eq('booking_code', bookingId);
    } catch { /* non-critical */ }
  }
  return { success: true };
}

// ─────────────────────────────────────────────────────────────
// Status Helpers
// ─────────────────────────────────────────────────────────────

export function getPassStatusLabel(status) {
  const labels = {
    ACTIVE: '✓ Pass Active',
    CHECKED_IN: '✓ Checked In',
    CHECKED_OUT: '✓ Checked Out',
    CANCELLED: '✕ Pass Cancelled',
    EXPIRED: '✕ Pass Expired',
  };
  return labels[status] || status;
}

export function getPassStatusColor(status) {
  const colors = {
    ACTIVE: '#10b981',
    CHECKED_IN: '#0284c7',
    CHECKED_OUT: '#6366f1',
    CANCELLED: '#ef4444',
    EXPIRED: '#94a3b8',
  };
  return colors[status] || '#94a3b8';
}

export function isPassValid(pass) {
  if (!pass) return false;
  if (pass.status === 'CANCELLED') return false;
  if (pass.status === 'EXPIRED') return false;
  if (pass.expiresAt) {
    const expires = new Date(pass.expiresAt);
    if (!isNaN(expires.getTime()) && new Date() > expires) return false;
  }
  return true;
}

/**
 * Format date string for display on pass.
 * Handles both "12 Aug 2026" and "2026-08-12" formats.
 */
export function formatPassDate(dateStr) {
  if (!dateStr) return 'TBD';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}
