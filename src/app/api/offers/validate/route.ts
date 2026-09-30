import { NextRequest } from 'next/server';
import { apiSuccess, apiError } from '@/lib/apiResponse';

const VALID_COUPONS: Record<string, { code: string; type: 'PERCENTAGE' | 'FIXED'; value: number; minAmount: number; maxDiscount: number; description: string }> = {
  FACIAL20: {
    code: 'FACIAL20',
    type: 'PERCENTAGE',
    value: 20,
    minAmount: 1500,
    maxDiscount: 1000,
    description: '20% OFF on facial rituals above ₹1,500',
  },
  BRIDAL10: {
    code: 'BRIDAL10',
    type: 'PERCENTAGE',
    value: 10,
    minAmount: 5000,
    maxDiscount: 2500,
    description: '10% OFF on bridal & party makeup packages',
  },
  FESTIVE15: {
    code: 'FESTIVE15',
    type: 'PERCENTAGE',
    value: 15,
    minAmount: 2000,
    maxDiscount: 1200,
    description: '15% OFF festive glow treatments',
  },
  WELCOME500: {
    code: 'WELCOME500',
    type: 'FIXED',
    value: 500,
    minAmount: 2500,
    maxDiscount: 500,
    description: 'Flat ₹500 OFF on your first sanctuary visit',
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, cartAmount } = body;

    if (!code || typeof code !== 'string') {
      return apiError('Coupon code is required', 'VALIDATION_ERROR', 400);
    }

    const cleanCode = code.trim().toUpperCase();
    const offer = VALID_COUPONS[cleanCode];

    if (!offer) {
      return apiError('Invalid or expired promotional coupon code', 'INVALID_COUPON', 404);
    }

    const amount = Number(cartAmount) || 0;
    if (amount < offer.minAmount) {
      return apiError(
        `Coupon ${cleanCode} requires a minimum booking amount of ₹${offer.minAmount}`,
        'MINIMUM_AMOUNT_NOT_MET',
        400
      );
    }

    let calculatedDiscount = 0;
    if (offer.type === 'PERCENTAGE') {
      calculatedDiscount = Math.min((amount * offer.value) / 100, offer.maxDiscount);
    } else {
      calculatedDiscount = Math.min(offer.value, offer.maxDiscount);
    }

    return apiSuccess({
      code: offer.code,
      discountType: offer.type,
      discountValue: offer.value,
      discountAmount: calculatedDiscount,
      finalAmount: Math.max(0, amount - calculatedDiscount),
      description: offer.description,
    });
  } catch (error) {
    return apiError('Failed to validate promotional coupon', 'COUPON_VALIDATION_FAILED', 500, {
      details: (error as Error).message,
    });
  }
}
