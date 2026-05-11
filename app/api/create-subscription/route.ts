import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import { getPriceId } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const { clientSlug, package: pkg, email, name } = await req.json()
    if (!clientSlug || !pkg || !email || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const priceId = getPriceId(pkg)
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid package or missing Stripe price ID' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data: client } = await supabase
      .from('clients')
      .select('stripe_customer_id')
      .eq('slug', clientSlug)
      .single()

    let customerId = client?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({ email, name })
      customerId = customer.id
    }

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
    })

    const invoice = subscription.latest_invoice as any
    const clientSecret = invoice?.payment_intent?.client_secret

    if (!clientSecret) {
      throw new Error('No client secret returned from Stripe')
    }

    await supabase
      .from('clients')
      .update({
        stripe_customer_id: customerId,
        stripe_subscription_id: subscription.id,
        subscription_status: 'pending',
      })
      .eq('slug', clientSlug)

    return NextResponse.json({ clientSecret, subscriptionId: subscription.id })
  } catch (err) {
    console.error('create-subscription error:', err)
    const message = err instanceof Error ? err.message : 'Failed to create subscription'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
