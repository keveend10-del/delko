'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { PACKAGES, type Package } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'
import { ArrowLeft, Check, Loader2 } from 'lucide-react'

const PLAN_KEY_MAP: Record<string, Package> = {
  foundation: 'foundation',
  growth: 'growth',
  dominate: 'dominate',
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planParam = searchParams.get('plan') ?? 'growth'
  const packageKey = PLAN_KEY_MAP[planParam] ?? 'growth'
  const pkg = PACKAGES[packageKey]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!PLAN_KEY_MAP[planParam]) router.replace('/checkout?plan=growth')
  }, [planParam, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: packageKey, name, email, businessName }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start checkout')
      setLoading(false)
    }
  }

  const inputCls = 'h-11 w-full rounded-xl bg-input border border-border px-4 text-[14px] text-foreground outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all placeholder:text-muted-foreground'

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-14 flex items-center gap-4">
          <Link href="/#packages" className="flex items-center gap-1.5 text-[12px] text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} />
            Back
          </Link>
          <div className="flex items-center gap-2 ml-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-[13px] font-semibold tracking-tight">Delko</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-5 py-12 sm:py-16">
        <div className="w-full max-w-4xl grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Left: plan summary */}
          <div className="lg:col-span-2">
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-2">You selected</div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">{pkg.name} Plan</h1>
            <p className="text-muted-foreground text-[14px] mb-6">{pkg.tagline}</p>

            <div className="rounded-2xl border border-border bg-card p-5 mb-6">
              <div className="flex items-baseline gap-1 mb-5 pb-4 border-b border-border">
                <span className="text-[32px] font-bold tracking-tight text-accent">{formatCurrency(pkg.price)}</span>
                <span className="text-[13px] text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2.5">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px]">
                    <Check size={13} className="text-accent mt-0.5 shrink-0" />
                    <span className="text-foreground/75">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-muted px-4 py-3 space-y-1.5 text-[12px] text-muted-foreground">
              <p>· No setup fees. Cancel month-to-month.</p>
              <p>· First charge today. Billed monthly thereafter.</p>
              <p>· Ad spend billed directly to Google / Meta by you.</p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-7 sm:p-8">
              <div className="mb-7">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground mb-1">Step 1 of 2</div>
                <h2 className="text-xl font-bold tracking-tight">Tell us about your business</h2>
                <p className="mt-1 text-[13px] text-muted-foreground">We'll set up your account, then you'll complete payment on Stripe's secure checkout page.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-muted-foreground">Your name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    minLength={2}
                    placeholder="Jane Smith"
                    className={inputCls}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-muted-foreground">Email address <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="jane@yourbusiness.com"
                    className={inputCls}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-muted-foreground">Business name <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    required
                    minLength={2}
                    placeholder="Smith Plumbing & Heating"
                    className={inputCls}
                  />
                </div>

                {error && (
                  <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-[13px] text-red-400">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-accent text-[#0A0A0A] font-semibold text-[15px] disabled:opacity-60 hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Preparing checkout…
                    </>
                  ) : (
                    `Continue to payment — ${formatCurrency(pkg.price)}/mo`
                  )}
                </button>

                <p className="text-[11px] text-muted-foreground text-center leading-relaxed pt-1">
                  You'll be redirected to Stripe's secure checkout page. We never store your card details.
                </p>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-5 w-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  )
}
