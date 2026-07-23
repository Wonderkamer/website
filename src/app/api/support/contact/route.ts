import { NextResponse } from 'next/server';

import { sendContactEmails } from '@/lib/brevo';
import { contactSchema } from '@/lib/contact-schema';
import { verifyRecaptchaToken } from '@/lib/recaptcha';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { recaptchaToken, ...contact } = parsed.data;

  const recaptchaResult = await verifyRecaptchaToken(recaptchaToken);
  if (!recaptchaResult.ok) {
    return NextResponse.json({ message: 'Captcha verification failed' }, { status: 403 });
  }

  try {
    await sendContactEmails(contact);
  } catch (error) {
    console.error('Failed to send contact emails', error);
    return NextResponse.json({ message: 'Failed to send message' }, { status: 502 });
  }

  return new NextResponse(null, { status: 202 });
}
