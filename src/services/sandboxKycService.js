/**
 * Sandbox.co.in Official India KYC API Service
 * Handles real UIDAI Aadhaar e-KYC OTP generation & verification via Sandbox.co.in API
 */

const SANDBOX_API_KEY = import.meta.env.VITE_SANDBOX_API_KEY || 'key_live_9808f386b14b49d4b66f0e6943307f58';
const SANDBOX_API_SECRET = import.meta.env.VITE_SANDBOX_API_SECRET || 'secret_live_c4ad1791635f41c99d5d7b330fca2fd3';
const BASE_URL = import.meta.env.VITE_SANDBOX_BASE_URL || 'https://api.sandbox.co.in';

let cachedAccessToken = null;
let tokenExpiryTime = 0;

/**
 * Get Sandbox API Bearer Access Token
 */
export async function getSandboxAccessToken() {
  const now = Date.now();
  if (cachedAccessToken && now < tokenExpiryTime) {
    return cachedAccessToken;
  }

  try {
    const res = await fetch(`${BASE_URL}/authenticate`, {
      method: 'POST',
      headers: {
        'x-api-key': SANDBOX_API_KEY,
        'x-api-secret': SANDBOX_API_SECRET,
        'x-api-version': '1.0'
      }
    });

    const data = await res.json();
    if (data && data.access_token) {
      cachedAccessToken = data.access_token;
      tokenExpiryTime = now + 23 * 3600 * 1000; // valid for ~24h
      return cachedAccessToken;
    } else {
      console.warn('Sandbox authentication response:', data);
      throw new Error(data?.message || 'Failed to authenticate with Sandbox API.');
    }
  } catch (err) {
    console.error('Error authenticating with Sandbox API:', err);
    throw err;
  }
}

/**
 * Request real UIDAI Aadhaar OTP via Sandbox API
 * Sends a real SMS OTP directly to user's Aadhaar-linked mobile phone
 * @param {string} aadhaarNumber - 12-digit Aadhaar number
 * @returns {Promise<{ reference_id: string }>}
 */
export async function requestRealAadhaarOtp(aadhaarNumber) {
  const cleanAadhaar = aadhaarNumber.replace(/\s+/g, '').replace(/-/g, '');
  const token = await getSandboxAccessToken();

  const res = await fetch(`${BASE_URL}/kyc/aadhaar/okyc/otp`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'x-api-key': SANDBOX_API_KEY,
      'x-api-version': '1.0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      '@entity': 'in.co.sandbox.kyc.aadhaar.okyc.otp.request',
      'aadhaar_number': cleanAadhaar
    })
  });

  const data = await res.json();

  if (res.ok && data?.data?.reference_id) {
    return {
      success: true,
      referenceId: data.data.reference_id,
      message: data.message || 'OTP sent successfully to your Aadhaar-linked mobile phone!'
    };
  } else {
    const errMsg = data?.message || data?.data?.message || 'Failed to send UIDAI OTP via Sandbox.';
    throw new Error(errMsg);
  }
}

/**
 * Verify real UIDAI Aadhaar OTP entered by user via Sandbox API
 * @param {string} referenceId - Reference ID returned from requestRealAadhaarOtp
 * @param {string} otp - 6-digit OTP received on mobile phone
 */
export async function verifyRealAadhaarOtp(referenceId, otp) {
  const token = await getSandboxAccessToken();

  const res = await fetch(`${BASE_URL}/kyc/aadhaar/okyc/otp/verify`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'x-api-key': SANDBOX_API_KEY,
      'x-api-version': '1.0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      '@entity': 'in.co.sandbox.kyc.aadhaar.okyc.otp.verify',
      'reference_id': referenceId,
      'otp': otp
    })
  });

  const data = await res.json();

  if (res.ok && (data?.data?.status === 'SUCCESS' || data?.data?.name || data?.code === 200)) {
    return {
      success: true,
      data: data.data
    };
  } else {
    const errMsg = data?.message || data?.data?.message || 'Invalid UIDAI OTP. Please check your SMS and try again.';
    throw new Error(errMsg);
  }
}

/**
 * Verify PAN Card details via Sandbox API
 * @param {string} panNumber - 10-character PAN number
 */
export async function verifyRealPanCard(panNumber) {
  const token = await getSandboxAccessToken();

  const res = await fetch(`${BASE_URL}/kyc/pan/verify`, {
    method: 'POST',
    headers: {
      'Authorization': token,
      'x-api-key': SANDBOX_API_KEY,
      'x-api-version': '1.0',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      '@entity': 'in.co.sandbox.kyc.pan.verify',
      'pan': panNumber.toUpperCase()
    })
  });

  const data = await res.json();

  if (res.ok && (data?.data?.full_name || data?.data?.status === 'VALID')) {
    return {
      success: true,
      name: data.data.full_name,
      pan: panNumber.toUpperCase()
    };
  } else {
    throw new Error(data?.message || 'Invalid PAN details.');
  }
}
