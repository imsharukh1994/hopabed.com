import { supabase } from '../lib/supabaseClient';

export const S3_CONFIG = {
  endpoint: import.meta.env.VITE_SUPABASE_S3_ENDPOINT || 'https://rrjnbgfgzldcenajnysi.storage.supabase.co/storage/v1/s3',
  region: import.meta.env.VITE_SUPABASE_S3_REGION || 'ap-southeast-1',
  accessKeyId: import.meta.env.VITE_SUPABASE_S3_ACCESS_KEY_ID || '249fffb433bb0bdcf06a9ed349f3f12c'
};

const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL || 'https://rrjnbgfgzldcenajnysi.supabase.co';
const DEFAULT_BUCKET = 'hopabed.bucket';

/**
 * Upload a room photo or user avatar to Supabase Storage bucket: hopabed.bucket
 * @param {File} file - File object to upload
 * @param {string} bucket - Bucket name ('hopabed.bucket')
 * @returns {Promise<string>} - Public web image URL or local Data URL
 */
export async function uploadToSupabaseStorage(file, bucket = DEFAULT_BUCKET) {
  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `img_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

    // Upload file to Supabase Storage bucket 'hopabed.bucket'
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (!error && data) {
      // Returns direct public browser URL:
      // https://rrjnbgfgzldcenajnysi.supabase.co/storage/v1/object/public/hopabed.bucket/img_...
      return `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${bucket}/${fileName}`;
    } else {
      console.warn('Supabase storage upload notice:', error?.message);
    }
  } catch (err) {
    console.warn('Supabase storage upload exception:', err);
  }

  // Fallback to FileReader base64 Data URL so photo ALWAYS displays in UI
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}
