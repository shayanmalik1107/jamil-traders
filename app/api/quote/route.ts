import { NextRequest, NextResponse } from 'next/server';
import { sendQuoteRequest, QuoteRequestData } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const data: QuoteRequestData = await req.json();

    if (!data.name || !data.email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Your project list is empty.' },
        { status: 400 }
      );
    }

    await sendQuoteRequest(data);

    return NextResponse.json({
      success: true,
      message: 'Your project specification quote request has been sent to Jameel Traders.',
    });
  } catch (error: any) {
    console.error('Error sending quote request:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to submit quote request. Please try again.',
      },
      { status: 500 }
    );
  }
}
