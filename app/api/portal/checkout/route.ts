import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient, createAdminClient } from '@/lib/supabase/server'
import { PACKAGES } from '@/lib/types'

export async function POST() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const admin = createAdminClient()
  const { data: client } = await admin
    .from('clients')
    .select('id, email, contact_name, business_name, package, monthly_retainer_value, stripe_customer_id')
    .eq('email', user.email)
    .single()

  if (!client) return NextResponse.json({ error: 'Client not found' }, { status: 404 })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const pkg = PACKAGES[(client.package ?? 'growth') as keyof typeof PACKAGES] ?? PACKAGES.growth
  const amount = client.monthly_retainer_value ?? pkg.price

  let stripeCustomerId = client.stripe_customer_id
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: client.email,
      name: client.contact_name ?? client.business_name,
      metadata: { clientId: client.id },
    })
    stripeCustomerId = customer.id
    await admin.from('clients').update({ stripe_customer_id: stripeCustomerId }).eq('id', client.id)
  }

  const price = await stripe.prices.create({
    currency: 'usd',
    unit_amount: Math.round(amount * 100),
    recurring: { interval: 'month' },
    product_data: { name: `Delko — ${pkg.name} Plan` },
  })

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    line_items: [{ price: price.id, quantity: 1 }],
    mode: 'subscription',
    success_url: `${appUrl}/portal/billing?paid=1`,
    cancel_url: `${appUrl}/portal/billing`,
    metadata: { clientId: client.id },
    subscription_data: { metadata: { clientId: client.id } },
    allow_promotion_codes: true,
  })

  await admin.from('clients').update({ pending_checkout_url: session.url }).eq('id', client.id)

  return NextResponse.json({ url: session.url })
}
