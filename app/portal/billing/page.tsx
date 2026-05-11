'use client'

import { useState } from 'react'
import { usePortalAuth } from '@/contexts/PortalAuth'
import { PACKAGES, type Package } from '@/lib/types'
import { formatCurrency } from '@/lib/utils'
import { Panel, PageHeader } from '@/components/admin/ui'
import { CreditCard, CheckCircle, ExternalLink, Loader2, AlertCircle, Clock } from 'lucide-react'

const STATUS_MAP = {
  pending: { label: 'Pending setup', icon: Clock, color: 'text-yellow-300', bg: 'bg-yellow-400/10 border-yellow-400/20' },
  active: { label: 'Active', icon: CheckCircle, color: 'text-accent', bg: 'bg-accent/10 border-accent/20' },
  past_due: { label: 'Payment past due', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
  canceled: { label: 'Canceled', icon: AlertCircle, color: 'text-zinc-400', bg: 'bg-zinc-500/10 border-zinc-500/20' },
}

export default function BillingPage() {
  const { client } = usePortalAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!client) return null

  const pkg = PACKAGES[client.package as Package]
  const status = STATUS_MAP[client.subscription_status] ?? STATUS_MAP.pending
  const StatusIcon = status.icon

  const openBillingPortal = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/create-billing-portal-session', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to open billing portal')
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Subscription"
        title="Billing"
        description="View your current plan, subscription status, and manage your payment method."
      />

      <div className="space-y-5 max-w-2xl">
        {/* Status card */}
        <Panel className={`p-6 border ${status.bg}`}>
          <div className="flex items-center gap-3">
            <StatusIcon size={18} className={status.color} />
            <div>
              <p className={`text-[14px] font-semibold ${status.color}`}>{status.label}</p>
              {client.subscription_status === 'past_due' && (
                <p className="text-[12px] text-red-400/70 mt-0.5">Update your payment method to restore access.</p>
              )}
              {client.subscription_status === 'pending' && (
                <p className="text-[12px] text-yellow-300/70 mt-0.5">Your subscription is being set up. This usually takes a few minutes.</p>
              )}
            </div>
          </div>
        </Panel>

        {/* Plan details */}
        <Panel className="p-6">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Current plan</h3>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xl font-bold tracking-tight">{pkg.name}</p>
              <p className="text-[13px] text-muted-foreground mt-0.5">{pkg.tagline}</p>
              <p className="mt-3 text-[13px] text-muted-foreground">Billed monthly · Cancel anytime with 30 days notice</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-[28px] font-bold tracking-tight text-accent">{formatCurrency(pkg.price)}</p>
              <p className="text-[12px] text-muted-foreground">/month</p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-border">
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-3">What&apos;s included</p>
            <div className="grid sm:grid-cols-2 gap-1.5">
              {pkg.features.map(f => (
                <div key={f} className="flex items-start gap-2 text-[12px] text-foreground/70">
                  <CheckCircle size={11} className="text-accent mt-0.5 shrink-0" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </Panel>

        {/* Manage billing */}
        <Panel className="p-6">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Manage billing</h3>
          <p className="text-[13px] text-foreground/70 mb-5 leading-relaxed">
            Update your payment method, download invoices, or cancel your subscription through Stripe&apos;s secure billing portal.
          </p>

          {error && (
            <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-[13px] text-red-400">
              {error}
            </div>
          )}

          {client.stripe_customer_id ? (
            <button
              onClick={openBillingPortal}
              disabled={loading}
              className="inline-flex items-center gap-2.5 h-11 px-5 rounded-xl bg-accent text-[#0A0A0A] font-semibold text-[14px] disabled:opacity-60 hover:brightness-105 active:scale-[0.99] transition-all"
            >
              {loading ? (
                <Loader2 size={15} className="animate-spin" />
              ) : (
                <CreditCard size={15} />
              )}
              {loading ? 'Opening…' : 'Open billing portal'}
              {!loading && <ExternalLink size={13} />}
            </button>
          ) : (
            <div className="rounded-xl bg-surface border border-border px-5 py-4">
              <p className="text-[13px] text-muted-foreground">
                Billing portal will be available once your subscription is active.
                Questions? <a href="mailto:keveend10@gmail.com" className="text-accent hover:underline">Email us →</a>
              </p>
            </div>
          )}
        </Panel>

        {/* Payment terms note */}
        <div className="rounded-xl border border-border bg-surface px-5 py-4 space-y-1.5 text-[12px] text-muted-foreground">
          <p>· Ad spend is billed directly to Google / Meta by you. Not included in retainer.</p>
          <p>· First charge on signup. Billed monthly thereafter on the same date.</p>
          <p>· Cancel with 30 days written notice. Partial months are non-refundable.</p>
        </div>
      </div>
    </div>
  )
}
