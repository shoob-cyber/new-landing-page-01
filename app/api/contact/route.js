import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, projectType, budget, message, company_fax_hp } = data;

    // Honeypot check for bots
    if (company_fax_hp) {
      return NextResponse.json({ success: true, message: 'Message sent successfully' });
    }

    const errors = {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Please provide your name (at least 2 characters).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      errors.message = 'Please share a brief note about your project (at least 10 characters).';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // TODO: Production Email Dispatch (e.g. Resend or Formspree)
    // Example with Resend:
    // if (process.env.RESEND_API_KEY) {
    //   const resend = new Resend(process.env.RESEND_API_KEY);
    //   await resend.emails.send({
    //     from: 'Portfolio Contact <onboarding@resend.dev>',
    //     to: process.env.CONTACT_EMAIL || 'creator.seikh@gmail.com',
    //     subject: `New Project Inquiry: ${projectType} from ${name}`,
    //     text: `Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nBudget: ${budget || 'Not specified'}\n\nMessage:\n${message}`
    //   });
    // }

    console.log('[Contact Form Submission Received]:', {
      name,
      email,
      projectType,
      budget,
      message,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your message has been received. Shobu will be in touch within 24 hours.'
    });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred. Please try again or reach out directly via email.' },
      { status: 500 }
    );
  }
}
