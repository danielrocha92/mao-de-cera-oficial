import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/emailjs';

export async function POST(request) {
  const { templateId, to_email, data } = await request.json();

  if (!templateId || !to_email || !data) {
    return NextResponse.json({ error: 'templateId, to_email, and data are required' }, { status: 400 });
  }

  try {
    // The `data` object should contain all the dynamic variables for your EmailJS template
    const templateParams = {
      to_email: to_email,
      ...data,
    };

    // await sendEmail(templateId, templateParams);
    
    console.log('Email sending process triggered:', { templateId, to_email });

    return NextResponse.json({ message: 'Email sending process initiated' });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
