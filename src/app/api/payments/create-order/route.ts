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

    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeyId || !razorpayKeySecret) {
      // In development mode without credentials, generate order reference
      const amountInPaise = Math.round(Number(amount) * 100);
      return apiSuccess({
        orderId: `order_dev_${Date.now()}`,
        amount: amountInPaise,
        currency,
        key: 'rzp_test_devKey',
        isDevelopmentMode: true,
      });
    }

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    const amountInPaise = Math.round(Number(amount) * 100);

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
  } catch (error) {
    return apiError('Failed to create Razorpay payment order', 'RAZORPAY_ORDER_FAILED', 500, {
      details: (error as Error).message,
    });
  }
}
