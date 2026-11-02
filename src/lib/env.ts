import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  STORAGE_ENDPOINT: z.string().url('STORAGE_ENDPOINT must be a valid URL'),
  STORAGE_REGION: z.string().default('auto'),
  STORAGE_ACCESS_KEY_ID: z.string().min(1, 'STORAGE_ACCESS_KEY_ID is required'),
  STORAGE_SECRET_ACCESS_KEY: z.string().min(1, 'STORAGE_SECRET_ACCESS_KEY is required'),
  STORAGE_BUCKET_NAME: z.string().min(1, 'STORAGE_BUCKET_NAME is required'),
  STORAGE_FORCE_PATH_STYLE: z
    .string()
    .default('true')
    .transform((val) => val === 'true'),
  PAYSTACK_SECRET_KEY: z.string().min(1, 'PAYSTACK_SECRET_KEY is required'),
  PAYSTACK_PUBLIC_KEY: z.string().min(1, 'PAYSTACK_PUBLIC_KEY is required'),
  APP_BASE_URL: z.string().url('APP_BASE_URL must be a valid URL').default('http://localhost:3000'),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
    console.error(`\n❌ Critical Environment Configuration Error:\n${issues}\n`);
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  return result.data;
}

// Lazy/cached access to prevent crashing build time if env is partially loaded
let parsedEnv: Env | null = null;
export function getEnv(): Env {
  if (!parsedEnv) {
    parsedEnv = validateEnv();
  }
  return parsedEnv;
}

