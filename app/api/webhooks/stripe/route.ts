import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
  }

  const supabase = createAdminClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const subscriptionId = typeof session.subscription === 'string'
        ? session.subscription
        : (session.subscription as Stripe.Subscription | null)?.id

      const clientSlug = session.metadata?.clientSlug
      if (clientSlug) {
        await supabase
          .from('clients')
          .update({
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: subscriptionId ?? null,
            subscription_status: 'active',
          })
          .eq('slug', clientSlug)
        break
      }

      const clientId = session.metadata?.clientId
      if (clientId) {
        await supabase
          .from('clients')
          .update({
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: subscriptionId ?? null,
            subscription_status: session.mode === 'subscription' ? 'active' : null,
            payment_status: session.mode === 'payment' ? 'Paid in full' : 'Monthly retainer active',
            pending_checkout_url: null,
          })
          .eq('id', clientId)
      }
      break
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice
      const subscriptionId = invoice.subscription as string
      if (subscriptionId) {
        await supabase
          .from('clients')
          .update({ subscription_status: 'active' })
          .eq('stripe_subscription_id', subscriptionId)
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      const subscriptionId = invoice.subscription as string
      if (subscriptionId) {
        await supabase
          .from('clients')
          .update({ subscription_status: 'past_due' })
          .eq('stripe_subscription_id', subscriptionId)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await supabase
        .from('clients')
        .update({ subscription_status: 'canceled' })
        .eq('stripe_subscription_id', sub.id)
      break
    }
  }

  return NextResponse.json({ received: true })
}
