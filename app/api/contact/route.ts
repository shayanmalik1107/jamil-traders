import { NextRequest, NextResponse } from 'next/server';
import { sendContactInquiry, ContactInquiryData } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    let data: ContactInquiryData;
    let attachment: { filename: string; content: Buffer; contentType?: string } | null = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      data = {
        name: (formData.get('name') as string) || '',
        company: (formData.get('company') as string) || '',
        email: (formData.get('email') as string) || '',
        phone: (formData.get('phone') as string) || '',
        projectType: (formData.get('projectType') as string) || 'General Inquiry',
        location: (formData.get('location') as string) || '',
        description: (formData.get('description') as string) || '',
      };

      const file = formData.get('file') as File | null;
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        attachment = {
          filename: file.name,
          content: Buffer.from(arrayBuffer),
          contentType: file.type || undefined,
        };
      }
    } else {
      const json = await req.json();
      data = json;
    }

    if (!data.name || !data.email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    await sendContactInquiry(data, attachment);

    return NextResponse.json({
      success: true,
      message: 'Your project inquiry has been successfully sent to Jameel Traders.',
    });
  } catch (error: any) {
    console.error('Error sending contact inquiry:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to send inquiry. Please try again or WhatsApp us directly.',
      },
      { status: 500 }
    );
  }
}
