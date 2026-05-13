import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import { resend, invoiceEmailHtml } from '@/lib/resend'

export async function POST(req: NextRequest) {
  const supabase = createAdminClient()

  const authHeader = req.headers.get('authorization')
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: { user }, error: authError } = await supabase.auth.getUser(token)
  if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data: roles } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
  const isAdmin = (roles ?? []).some((r: any) => r.role === 'admin')
  if (!isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  try {
    const { clientId, amount, description, mode } = await req.json()

    if (!clientId || !amount || !description || !mode) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    if (!['subscription', 'payment'].includes(mode)) {
      return NextResponse.json({ error: 'Invalid mode' }, { status: 400 })
    }

    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('id, email, contact_name, business_name, stripe_customer_id')
      .eq('id', clientId)
      .single()

    if (clientError || !client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }
    if (!client.email) {
      return NextResponse.json({ error: 'Client has no email address' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

    let stripeCustomerId = client.stripe_customer_id
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: client.email,
        name: client.contact_name ?? client.business_name,
        metadata: { clientId: client.id },
      })
      stripeCustomerId = customer.id
    }

    const priceParams =
      mode === 'subscription'
        ? {
            currency: 'usd' as const,
            unit_amount: Math.round(Number(amount) * 100),
            recurring: { interval: 'month' as const },
            product_data: { name: description },
          }
        : {
            currency: 'usd' as const,
            unit_amount: Math.round(Number(amount) * 100),
            product_data: { name: description },
          }

    const price = await stripe.prices.create(priceParams)

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [{ price: price.id, quantity: 1 }],
      mode,
      success_url: `${appUrl}/portal/billing?paid=1`,
      cancel_url: `${appUrl}/portal/billing`,
      metadata: { clientId: client.id },
      ...(mode === 'subscription' && {
        subscription_data: { metadata: { clientId: client.id } },
      }),
      allow_promotion_codes: true,
    })

    await supabase
      .from('clients')
      .update({
        stripe_customer_id: stripeCustomerId,
        payment_status: 'Invoice sent',
        pending_checkout_url: session.url,
      })
      .eq('id', clientId)

    await resend.emails.send({
      from: 'Delko <onboarding@resend.dev>',
      to: client.email,
      subject: `Invoice from Delko — ${description}`,
      html: invoiceEmailHtml(
        client.contact_name ?? 'there',
        client.business_name,
        description,
        Number(amount),
        session.url!,
        mode,
      ),
    })

    return NextResponse.json({ success: true, url: session.url })
  } catch (err) {
    console.error('send-invoice error:', err)
    const message = err instanceof Error ? err.message : 'Failed to send invoice'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
