import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  const startTime = Date.now();
  try {
    // Ping database directly without exposing credentials or internal tables
    await prisma.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - startTime;

    return NextResponse.json(
      {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        database: {
          status: 'connected',
          latencyMs,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const latencyMs = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : 'Database connection error';
    
    // Log internal error safely
    console.error('Health Check Database Failure:', errorMessage);

    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        database: {
          status: 'disconnected',
          latencyMs,
          error: 'Unable to establish connection to PostgreSQL system of record.',
        },
      },
      { status: 503 }
    );
  }
}

