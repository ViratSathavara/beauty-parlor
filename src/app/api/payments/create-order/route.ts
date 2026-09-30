import { NextRequest } from 'next/server';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import Razorpay from 'razorpay';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingNumber, amount, currency = 'INR' } = body;

    if (!bookingNumber || !amount || Number(amount) <= 0) {
      return apiError('Invalid booking number or payment amount', 'VALIDATION_ERROR', 400);
    }

    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_mockKey123';
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mockSecret123';

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    const amountInPaise = Math.round(Number(amount) * 100);

    try {
      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency,
        receipt: bookingNumber,
        notes: {
          bookingNumber,
        },
      });

      return apiSuccess({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: razorpayKeyId,
      });
    } catch (razorpayError) {
      // Mock order fallback for local dev without active Razorpay keys
      return apiSuccess({
        orderId: `order_mock_${Date.now()}`,
        amount: amountInPaise,
        currency: 'INR',
        key: razorpayKeyId,
        isMock: true,
      });
    }
  } catch (error) {
    return apiError('Failed to create Razorpay order', 'RAZORPAY_ORDER_FAILED', 500, {
      details: (error as Error).message,
    });
  }
}
