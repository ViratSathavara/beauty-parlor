import { NextResponse } from 'next/server';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { connectToDatabase } from '@/lib/db/mongodb';

export async function GET() {
  try {
    const startTime = Date.now();
    await connectToDatabase();
    const dbLatencyMs = Date.now() - startTime;

    return apiSuccess({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      database: {
        connected: true,
        latencyMs: dbLatencyMs,
      },
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    return apiError('Database health check failed', 'DATABASE_UNHEALTHY', 500, {
      details: (error as Error).message,
    });
  }
}
