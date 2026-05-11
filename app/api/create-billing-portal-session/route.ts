import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // RLS ensures only their own record is returned
    const { data: client } = await supabase
      .from('clients')
      .select('stripe_customer_id')
      .eq('email', user.email)
      .maybeSingle()

    if (!client?.stripe_customer_id) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 })
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: client.stripe_customer_id,
      return_url: `${appUrl}/portal/billing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('create-billing-portal-session error:', err)
    const message = err instanceof Error ? err.message : 'Failed to create billing portal session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
