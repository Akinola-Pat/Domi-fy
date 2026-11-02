import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';

const enquiryInputSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name must be at least 2 characters').max(120),
  email: z.string().trim().email('Invalid email address').max(120),
  phoneNumber: z.string().trim().max(30).optional().or(z.literal('')),
  message: z.string().trim().min(5, 'Message must be at least 5 characters').max(2000),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    
    // Server-side boundary schema validation before executing any logic (Rule 15)
    const validationResult = enquiryInputSchema.safeParse(json);
    if (!validationResult.success) {
      const errorMsg = validationResult.error.issues.map((i) => i.message).join('; ');
      return NextResponse.json(
        { success: false, error: `Validation failure: ${errorMsg}` },
        { status: 400 }
      );
    }

    const { fullName, email, phoneNumber, message } = validationResult.data;

    // Database write
    const createdEnquiry = await prisma.enquiry.create({
      data: {
        fullName,
        email,
        phoneNumber: phoneNumber || null,
        message,
      },
    });

    // Rule 17: Never report success to the user unless the database write returned a created record.
    if (!createdEnquiry || !createdEnquiry.id) {
      return NextResponse.json(
        { success: false, error: 'Database transaction failed to persist the enquiry record.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        enquiryId: createdEnquiry.id,
        createdAt: createdEnquiry.createdAt,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal database processing failure';
    // Log structured error without sensitive credentials
    console.error('Enquiry API Error:', message);
    return NextResponse.json(
      { success: false, error: 'Could not record enquiry. Please verify local database connectivity.' },
      { status: 500 }
    );
  }
}

