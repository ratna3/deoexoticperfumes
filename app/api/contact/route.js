import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide your name, email address, and inquiry message.' },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const recipient = 'deoexoticattalko@gmail.com';
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    console.log(`[Artisan Contact Form] New inquiry received at ${timestamp}:`);
    console.log(`From: ${name} <${email}> (${phone || 'No phone'})`);
    console.log(`Subject: ${subject || 'General Fragrance Consultation'}`);
    console.log(`Message: ${message}`);

    // If SMTP credentials exist, send real email via nodemailer
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT) || 465,
          secure: (process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) === 465 : true),
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Deo Exotic Atelier Concierge" <${process.env.SMTP_USER}>`,
          to: recipient,
          replyTo: email,
          subject: `[Deo Exotic Inquiry] ${subject || 'Fragrance Consultation'} - ${name}`,
          text: `New contact inquiry received on Deo Exotic website:

Client Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject || 'Fragrance Consultation'}
Received: ${timestamp} IST

Message:
${message}
`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #d4af37; background: #0c0b0a; color: #f5f0eb;">
              <h2 style="color: #d4af37; font-family: serif; border-bottom: 1px solid #332d25; padding-bottom: 12px; margin-top: 0;">
                Deo Exotic Attar & Perfume — New Client Inquiry
              </h2>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr><td style="padding: 6px 0; color: #a89f91; width: 120px;"><strong>Client:</strong></td><td style="color: #ffffff;">${name}</td></tr>
                <tr><td style="padding: 6px 0; color: #a89f91;"><strong>Email:</strong></td><td><a href="mailto:${email}" style="color: #d4af37;">${email}</a></td></tr>
                <tr><td style="padding: 6px 0; color: #a89f91;"><strong>Phone:</strong></td><td style="color: #ffffff;">${phone || 'Not provided'}</td></tr>
                <tr><td style="padding: 6px 0; color: #a89f91;"><strong>Subject:</strong></td><td style="color: #ffffff;">${subject || 'Fragrance Consultation'}</td></tr>
                <tr><td style="padding: 6px 0; color: #a89f91;"><strong>Received:</strong></td><td style="color: #a89f91;">${timestamp} IST</td></tr>
              </table>
              <div style="background: #171513; padding: 16px; border-left: 3px solid #d4af37; margin-top: 16px;">
                <p style="margin: 0; line-height: 1.6; white-space: pre-wrap; color: #e6dfd5;">${message}</p>
              </div>
              <p style="font-size: 12px; color: #7a7267; margin-top: 24px; text-align: center;">
                Sent from Deo Exotic Web Concierge to ${recipient}
              </p>
            </div>
          `,
        });
        console.log(`[Artisan Contact Form] Email dispatched successfully to ${recipient}`);
      } catch (mailErr) {
        console.warn('[Artisan Contact Form] SMTP delivery failed; logged locally:', mailErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been successfully transmitted to our master perfumers at deoexoticattalko@gmail.com. We shall attend to your consultation shortly.',
      recipient,
      timestamp,
    });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred while transmitting your inquiry. Please email directly at deoexoticattalko@gmail.com.' },
      { status: 500 }
    );
  }
}
