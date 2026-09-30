import { NextRequest } from 'next/server';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { connectToDatabase } from '@/lib/db/mongodb';
import { Service } from '@/lib/db/models/Service';
import { Staff } from '@/lib/db/models/Staff';
import { SEED_SERVICES, SEED_STAFF } from '@/lib/db/seedData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const serviceSlug = searchParams.get('service');
    const dateStr = searchParams.get('date'); // YYYY-MM-DD
    const staffId = searchParams.get('staffId'); // optional

    if (!serviceSlug || !dateStr) {
      return apiError('Missing required parameters: service and date', 'VALIDATION_ERROR', 400);
    }

    const bookingDate = new Date(dateStr);
    if (isNaN(bookingDate.getTime())) {
      return apiError('Invalid date format. Use YYYY-MM-DD', 'INVALID_DATE', 400);
    }

    let serviceDuration = 60;
    let serviceBuffer = 15;

    try {
      await connectToDatabase();
      const service = await Service.findOne({ slug: serviceSlug, isActive: true }).lean();
      if (service) {
        serviceDuration = service.durationMinutes || 60;
        serviceBuffer = service.bufferMinutes || 15;
      }
    } catch (e) {
      const seedService = SEED_SERVICES.find((s) => s.slug === serviceSlug);
      if (seedService) {
        serviceDuration = seedService.durationMinutes;
      }
    }

    // Default business hours: 09:00 AM to 07:00 PM (19:00)
    const openingHour = 9;
    const closingHour = 19;
    const totalSlotDuration = serviceDuration + serviceBuffer;

    // Generate candidate time slots at 30-minute intervals
    const candidateSlots: { startTime: string; endTime: string; available: boolean; staffId?: string }[] = [];

    for (let hour = openingHour; hour < closingHour; hour++) {
      for (let min of [0, 30]) {
        const startMinTotal = hour * 60 + min;
        const endMinTotal = startMinTotal + totalSlotDuration;

        // If slot finishes past closing hour (19:00 = 1140 min), skip
        if (endMinTotal > closingHour * 60) continue;

        const startH = String(Math.floor(startMinTotal / 60)).padStart(2, '0');
        const startM = String(startMinTotal % 60).padStart(2, '0');
        const endH = String(Math.floor(endMinTotal / 60)).padStart(2, '0');
        const endM = String(endMinTotal % 60).padStart(2, '0');

        // Lunch break blackout (13:00 - 14:00)
        const isLunchBreak = (startMinTotal >= 13 * 60 && startMinTotal < 14 * 60);

        candidateSlots.push({
          startTime: `${startH}:${startM}`,
          endTime: `${endH}:${endM}`,
          available: !isLunchBreak,
        });
      }
    }

    return apiSuccess({
      date: dateStr,
      serviceSlug,
      durationMinutes: serviceDuration,
      bufferMinutes: serviceBuffer,
      slots: candidateSlots,
    });
  } catch (error) {
    return apiError('Failed to compute time slot availability', 'AVAILABILITY_ERROR', 500, {
      details: (error as Error).message,
    });
  }
}
