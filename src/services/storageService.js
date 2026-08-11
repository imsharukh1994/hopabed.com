import { supabase } from '../lib/supabaseClient';

export const S3_CONFIG = {
  endpoint: import.meta.env.VITE_SUPABASE_S3_ENDPOINT || 'https://rrjnbgfgzldcenajnysi.storage.supabase.co/storage/v1/s3',
  region: import.meta.env.VITE_SUPABASE_S3_REGION || 'ap-southeast-1',
  accessKeyId: import.meta.env.VITE_SUPABASE_S3_ACCESS_KEY_ID || '249fffb433bb0bdcf06a9ed349f3f12c'
};

const SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_URL || 'https://rrjnbgfgzldcenajnysi.supabase.co';
const DEFAULT_BUCKET = 'hopabed.bucket';

/**
 * Upload a room photo or user avatar to Supabase Storage
 * @param {File} file - File object to upload
 * @param {string} bucket - Bucket name ('hopabed.bucket')
 * @returns {Promise<string>} - Public web image URL or base64 data URL
 */
export async function uploadToSupabaseStorage(file, bucket = DEFAULT_BUCKET) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const localDataUrl = e.target.result;

      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        // Upload file to Supabase Storage bucket 'hopabed.bucket'
        const { data, error } = await supabase.storage
          .from(bucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
          });

        if (error) {
          console.warn('Supabase storage upload note:', error.message);
          // Try uploading to root of bucket if subfolder policies differ
          const { data: rootData, error: rootError } = await supabase.storage
            .from(bucket)
            .upload(fileName, file, { cacheControl: '3600', upsert: true });

          if (!rootError && rootData) {
            const publicUrl = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${bucket}/${fileName}`;
            resolve(publicUrl);
            return;
          }
        } else if (data) {
          // Public Web URL format for browser rendering:
          const publicWebUrl = `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${bucket}/${filePath}`;
          resolve(publicWebUrl);
          return;
        }
      } catch (err) {
        console.warn('Supabase bucket exception:', err);
      }

      // Resolve with local image data URL so UI preview is instant
      resolve(localDataUrl);
    };

    reader.readAsDataURL(file);
  });
}
