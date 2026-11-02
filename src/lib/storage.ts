import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getEnv } from './env';

export interface StorageConfig {
  endpoint: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  forcePathStyle: boolean;
}

// Permitted MIME types for tenancy documents and maintenance photos
export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
] as const;

export type AllowedMimeType = (typeof ALLOWED_FILE_TYPES)[number];
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit

let s3ClientInstance: S3Client | null = null;

function getS3Client(): S3Client {
  if (!s3ClientInstance) {
    const env = getEnv();
    s3ClientInstance = new S3Client({
      endpoint: env.STORAGE_ENDPOINT,
      region: env.STORAGE_REGION,
      credentials: {
        accessKeyId: env.STORAGE_ACCESS_KEY_ID,
        secretAccessKey: env.STORAGE_SECRET_ACCESS_KEY,
      },
      forcePathStyle: env.STORAGE_FORCE_PATH_STYLE,
    });
  }
  return s3ClientInstance;
}

/**
 * Validate upload metadata on the server before generating an upload URL.
 */
export function validateFileMetadata(mimeType: string, sizeBytes: number): { valid: boolean; error?: string } {
  if (!ALLOWED_FILE_TYPES.includes(mimeType as AllowedMimeType)) {
    return {
      valid: false,
      error: `Disallowed file type "${mimeType}". Permitted types: ${ALLOWED_FILE_TYPES.join(', ')}`,
    };
  }

  if (sizeBytes <= 0 || sizeBytes > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 10MB limit (attempted: ${(sizeBytes / (1024 * 1024)).toFixed(2)}MB).`,
    };
  }

  return { valid: true };
}

/**
 * Generate a short-lived presigned URL for private direct client uploads.
 */
export async function createPresignedUploadUrl(
  objectKey: string,
  contentType: string,
  expiresInSeconds = 900 // 15 minutes
): Promise<string> {
  const env = getEnv();
  const client = getS3Client();

  const command = new PutObjectCommand({
    Bucket: env.STORAGE_BUCKET_NAME,
    Key: objectKey,
    ContentType: contentType,
  });

  return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}

/**
 * Generate a short-lived presigned URL for private authorised downloads.
 */
export async function createPresignedDownloadUrl(
  objectKey: string,
  expiresInSeconds = 900 // 15 minutes
): Promise<string> {
  const env = getEnv();
  const client = getS3Client();

  const command = new GetObjectCommand({
    Bucket: env.STORAGE_BUCKET_NAME,
    Key: objectKey,
  });

  return getSignedUrl(client, command, { expiresIn: expiresInSeconds });
}

