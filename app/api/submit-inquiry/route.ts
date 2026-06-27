import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const { name, email, businessName, plan, message } = await req.json()

    if (!name || !email || !businessName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'Delko <onboarding@resend.dev>',
      to: ['keveend10@gmail.com'],
      subject: `New Inquiry — ${plan} Plan — ${businessName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 24px;">
          <h2 style="margin-top: 0;">New Plan Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Business</td><td style="padding: 8px 0;">${businessName}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Plan</td><td style="padding: 8px 0;">${plan}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Message</td><td style="padding: 8px 0;">${message || '—'}</td></tr>
          </table>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('submit-inquiry error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
