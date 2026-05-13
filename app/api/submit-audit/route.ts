import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const { name, business, email, phone, link, type, help, message } = await req.json()

    if (!name || !business || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM ?? 'Delko <onboarding@resend.dev>',
      to: ['keveend10@gmail.com'],
      subject: `New Audit Request: ${business}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 24px;">
          <h2 style="margin-top: 0;">New Free Audit Request</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Business</td><td style="padding: 8px 0;">${business}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;">${phone || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Website</td><td style="padding: 8px 0;">${link || '—'}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Type</td><td style="padding: 8px 0;">${type}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Help with</td><td style="padding: 8px 0;">${Array.isArray(help) ? help.join(', ') : help}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Message</td><td style="padding: 8px 0;">${message || '—'}</td></tr>
          </table>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('submit-audit error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
