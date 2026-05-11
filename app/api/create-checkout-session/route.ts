import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import { getPriceId, generateSlug } from '@/lib/utils'

export async function POST(req: NextRequest) {
  try {
    const { plan, name, email, businessName } = await req.json()

    if (!plan || !name || !email || !businessName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const priceId = getPriceId(plan)
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid plan or missing Stripe price ID' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    const supabase = createAdminClient()

    // Check for existing client by email + package
    const { data: existing } = await supabase
      .from('clients')
      .select('slug, stripe_customer_id')
      .eq('email', email)
      .eq('package', plan)
      .maybeSingle()

    let clientSlug = existing?.slug
    let stripeCustomerId = existing?.stripe_customer_id ?? undefined

    if (!clientSlug) {
      clientSlug = generateSlug(businessName)
      const { error: insertError } = await supabase.from('clients').insert({
        slug: clientSlug,
        name,
        email,
        business_name: businessName,
        package: plan,
        subscription_status: 'pending',
      })
      if (insertError) throw new Error(insertError.message)
    }

    // Create or reuse Stripe customer
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({ email, name })
      stripeCustomerId = customer.id
      await supabase.from('clients').update({ stripe_customer_id: stripeCustomerId }).eq('slug', clientSlug)
    }

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${appUrl}/welcome/${clientSlug}`,
      cancel_url: `${appUrl}/#packages`,
      metadata: { clientSlug },
      subscription_data: { metadata: { clientSlug } },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('create-checkout-session error:', err)
    const message = err instanceof Error ? err.message : 'Failed to create checkout session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
