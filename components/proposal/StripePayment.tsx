'use client'

import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Spinner } from '@/components/ui/Spinner'
import { formatCurrency } from '@/lib/utils'
import { Package, PACKAGES } from '@/lib/types'
import { CreditCard, Lock } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const stripeAppearance = {
  theme: 'night' as const,
  variables: {
    colorPrimary: '#1EFF96',
    colorBackground: '#1A1A1A',
    colorText: '#F5F5F5',
    colorDanger: '#ff6b6b',
    fontFamily: 'Outfit, system-ui, sans-serif',
    borderRadius: '12px',
    colorTextPlaceholder: 'rgba(255,255,255,0.25)',
  },
  rules: {
    '.Input': { border: '1px solid rgba(255,255,255,0.08)', backgroundColor: '#1A1A1A' },
    '.Input:focus': { border: '1px solid rgba(30,255,150,0.5)', boxShadow: '0 0 0 3px rgba(30,255,150,0.1)' },
    '.Label': { color: 'rgba(255,255,255,0.6)', fontWeight: '500' },
  },
}

interface StripePaymentProps {
  clientSlug: string
  pkg: Package
  clientEmail: string
  clientName: string
}

export function StripePayment(props: StripePaymentProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api/create-subscription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientSlug: props.clientSlug,
            package: props.pkg,
            email: props.clientEmail,
            name: props.clientName,
          }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error)
        setClientSecret(data.clientSecret)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize payment')
      }
    }
    init()
  }, [props.clientSlug, props.pkg, props.clientEmail, props.clientName])

  if (error) {
    return (
      <Card className="p-6">
        <p className="text-red-400 text-[14px]">{error}</p>
      </Card>
    )
  }

  if (!clientSecret) {
    return (
      <Card className="p-8">
        <Spinner />
        <p className="text-center text-white/40 text-[13px] mt-3">Setting up payment...</p>
      </Card>
    )
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret, appearance: stripeAppearance }}
    >
      <CheckoutForm {...props} />
    </Elements>
  )
}

function CheckoutForm({ clientSlug, pkg }: StripePaymentProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const pkgConfig = PACKAGES[pkg]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    setError('')

    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message ?? 'Payment validation failed')
      setLoading(false)
      return
    }

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/welcome/${clientSlug}`,
      },
    })

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed')
      setLoading(false)
    }
  }

  return (
    <Card variant="accent" className="p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CreditCard size={20} className="text-accent" />
          <h3 className="text-[18px] font-bold tracking-tight">Start your subscription</h3>
        </div>
        <div className="flex items-center gap-1.5 text-white/30">
          <Lock size={12} />
          <span className="text-[12px]">Secured by Stripe</span>
        </div>
      </div>

      <div className="rounded-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] p-4 mb-6 flex items-center justify-between">
        <div>
          <p className="text-[14px] font-semibold">{pkgConfig.name} Plan</p>
          <p className="text-[12px] text-white/40">Billed monthly · Cancel anytime</p>
        </div>
        <p className="text-[22px] font-bold text-accent">{formatCurrency(pkgConfig.price)}<span className="text-[13px] font-normal text-white/40">/mo</span></p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <PaymentElement />

        {error && <p className="text-[13px] text-red-400">{error}</p>}

        <Button type="submit" disabled={!stripe} loading={loading} size="lg" className="w-full">
          Start Subscription — {formatCurrency(pkgConfig.price)}/mo
        </Button>

        <p className="text-[12px] text-white/25 text-center leading-relaxed">
          Ad spend is paid directly to Google/Meta by you. Not included in retainer.
          First charge today. Cancel anytime with 30 days notice.
        </p>
      </form>
    </Card>
  )
}
