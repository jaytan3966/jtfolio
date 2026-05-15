import { type NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
    if (!process.env.RESEND_API_KEY || !process.env.MY_EMAIL) {
        console.error('Email API: RESEND_API_KEY or MY_EMAIL env var is missing');
        return NextResponse.json(
            { error: 'Email service is not configured' },
            { status: 500 },
        );
    }

    const { name, email, company, message } = await request.json();

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM ?? 'onboarding@resend.dev';

    const subjectSuffix = company ? ` from ${company}` : '';

    try {
        const { data, error } = await resend.emails.send({
            from: `Portfolio Contact <${from}>`,
            to: process.env.MY_EMAIL,
            replyTo: email,
            subject: `Message from ${name} (${email})${subjectSuffix}`,
            text: message,
        });

        if (error) {
            console.error('Email API: Resend returned error', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: 'Email sent', id: data?.id });
    } catch (err) {
        console.error('Email API: send failed', err);
        const detail = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ error: detail }, { status: 500 });
    }
}
