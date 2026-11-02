import crypto from 'node:crypto';
import { getEnv } from '../env';

export interface SplitCalculation {
  grossAmountKobo: bigint;
  platformFeeKobo: bigint;
  landlordAllocationKobo: bigint;
  currency: string;
}

export const PLATFORM_FEE_PERCENTAGE = 0.015; // 1.5%

/**
 * Calculates the platform fee and landlord allocation in integer kobo.
 * All math uses integer kobo to prevent floating-point inaccuracies.
 */
export function calculateSplit(grossAmountKobo: bigint, currency = 'NGN'): SplitCalculation {
  if (grossAmountKobo <= 0n) {
    throw new Error('Gross rent amount must be a positive integer in kobo.');
  }

  // 1.5% fee calculation: (grossAmountKobo * 15n) / 1000n
  const platformFeeKobo = (grossAmountKobo * 15n) / 1000n;
  const landlordAllocationKobo = grossAmountKobo - platformFeeKobo;

  return {
    grossAmountKobo,
    platformFeeKobo,
    landlordAllocationKobo,
    currency,
  };
}

/**
 * Verify incoming webhook signature against Paystack secret key using HMAC-SHA512.
 */
export function verifyPaystackSignature(rawBody: string, signature: string): boolean {
  const env = getEnv();
  const hash = crypto
    .createHmac('sha512', env.PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest('hex');

  return hash === signature;
}

export interface PaystackCheckoutPayload {
  email: string;
  amountKobo: bigint;
  reference: string;
  callbackUrl: string;
  subaccountCode?: string;
}

export interface PaystackInitializeResponse {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
}

/**
 * Isolated Paystack test-mode checkout initialisation boundary.
 * Live payments remain strictly disabled in this MVP scaffold.
 */
export async function initializeTestPayment(
  payload: PaystackCheckoutPayload
): Promise<PaystackInitializeResponse> {
  const env = getEnv();

  // Guard against non-test credentials
  if (!env.PAYSTACK_SECRET_KEY.startsWith('sk_test_')) {
    throw new Error('SECURITY VIOLATION: Domi-fy MVP only permits Paystack test-mode credentials (sk_test_*).');
  }

  // Scaffold boundary: simulates the provider exchange in test mode
  return {
    authorizationUrl: `https://checkout.paystack.com/test-checkout-mock?reference=${payload.reference}`,
    accessCode: `test_access_${payload.reference}`,
    reference: payload.reference,
  };
}

