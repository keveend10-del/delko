import { NextRequest, NextResponse } from 'next/server'
import { resend, welcomeEmailHtml } from '@/lib/resend'
import { createAdminClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { clientSlug } = await req.json()
    const supabase = createAdminClient()

    const { data: client, error } = await supabase
      .from('clients')
      .select('name, business_name, email, slug')
      .eq('slug', clientSlug)
      .single()

    if (error || !client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/${client.slug}`

    await resend.emails.send({
      from: 'Delko <onboarding@resend.dev>',
      to: client.email,
      subject: `You're in — welcome to Berk Growth Co., ${client.name}.`,
      html: welcomeEmailHtml(client.name, client.business_name, dashboardUrl),
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('send-welcome-email error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
