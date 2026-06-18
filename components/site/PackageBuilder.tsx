'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowUpRight, Sparkles, X } from 'lucide-react'

type Service = {
  id: string
  name: string
  price: number
  category: string
  core?: boolean
}

const SERVICES: Service[] = [
  // Core
  { id: 'gbp', name: 'Google Business Profile management', price: 350, category: 'Core Setup', core: true },
  { id: 'lead-capture', name: 'Lead capture form + tracking', price: 200, category: 'Core Setup', core: true },
  { id: 'monthly-report', name: 'Monthly performance report', price: 150, category: 'Core Setup', core: true },
  // Visibility
  { id: 'website-audit', name: 'Website audit & improvements', price: 300, category: 'Visibility & SEO' },
  { id: 'local-seo', name: 'Local SEO + GEO/AEO optimization', price: 500, category: 'Visibility & SEO' },
  { id: 'ai-search', name: 'AI search visibility (ChatGPT, Google AI)', price: 350, category: 'Visibility & SEO' },
  // Lead Gen
  { id: 'review-system', name: 'Review request & generation system', price: 250, category: 'Lead Generation' },
  { id: 'missed-call', name: 'Missed-call text-back automation', price: 200, category: 'Lead Generation' },
  { id: 'email-sms', name: 'Email & SMS follow-up sequences', price: 350, category: 'Lead Generation' },
  // Content
  { id: 'website-refresh', name: 'Landing page or website refresh', price: 600, category: 'Content & Web' },
  { id: 'social-content', name: 'AI-drafted social content', price: 400, category: 'Content & Web' },
  { id: 'seasonal-campaigns', name: 'Seasonal campaign content', price: 500, category: 'Content & Web' },
  // Paid
  { id: 'google-ads', name: 'Google Ads setup & management', price: 700, category: 'Paid Advertising' },
  { id: 'meta-ads', name: 'Meta (Facebook/Instagram) Ads management', price: 700, category: 'Paid Advertising' },
  // CRM
  { id: 'crm', name: 'CRM setup & management', price: 550, category: 'CRM & Automation' },
  { id: 'ai-workflows', name: 'Full AI workflow automation suite', price: 650, category: 'CRM & Automation' },
  { id: 'reactivation', name: 'Customer reactivation campaigns', price: 450, category: 'CRM & Automation' },
  // Strategy
  { id: 'strategy-monthly', name: 'Monthly strategy call', price: 200, category: 'Strategy & Reporting' },
  { id: 'strategy-biweekly', name: 'Biweekly strategy calls', price: 400, category: 'Strategy & Reporting' },
  { id: 'reputation', name: 'Reputation management', price: 350, category: 'Strategy & Reporting' },
  { id: 'reporting-dashboard', name: 'Custom reporting dashboard', price: 350, category: 'Strategy & Reporting' },
]

const CATEGORIES = Array.from(new Set(SERVICES.map((s) => s.category)))

const PACKAGE_HINTS = [
  {
    name: 'Starter Presence',
    price: 2000,
    key: 'foundation',
    threshold: 1600,
    ceiling: 2100,
    extras: 'review system, missed-call text-back, and lead tracking',
  },
  {
    name: 'Local Growth System',
    price: 3000,
    key: 'growth',
    threshold: 2100,
    ceiling: 3200,
    extras: 'social content, strategy call, and review generation',
  },
  {
    name: 'Growth Partner',
    price: 4500,
    key: 'dominate',
    threshold: 3800,
    ceiling: 999999,
    extras: 'reputation management, biweekly calls, and full reporting dashboard',
  },
]

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const Toggle = ({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean
  onChange: () => void
  disabled?: boolean
}) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    disabled={disabled}
    className={`relative h-5 w-9 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 shrink-0 ${
      checked ? 'bg-accent' : 'bg-foreground/15'
    } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
  >
    <span
      className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
        checked ? 'translate-x-4' : 'translate-x-0'
      }`}
    />
  </button>
)

export const PackageBuilder = () => {
  const router = useRouter()
  const defaultSelected = new Set(SERVICES.filter((s) => s.core).map((s) => s.id))
  const [selected, setSelected] = useState<Set<string>>(defaultSelected)

  const toggle = (id: string, core?: boolean) => {
    if (core) return
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const selectedServices = useMemo(
    () => SERVICES.filter((s) => selected.has(s.id)),
    [selected]
  )

  const total = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.price, 0),
    [selectedServices]
  )

  const hint = useMemo(
    () => PACKAGE_HINTS.find((p) => total >= p.threshold && total < p.ceiling) ?? null,
    [total]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className="mt-16"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-border" />
        <div className="text-[10px] font-bold font-mono uppercase tracking-[0.22em] text-muted-foreground/60 px-2 whitespace-nowrap">
          Or build your own plan
        </div>
        <div className="flex-1 h-px bg-border" />
      </div>

      <div className="mb-6">
        <p className="text-[15px] text-muted-foreground leading-relaxed max-w-xl">
          Need something specific? Pick only the services you want. We&apos;ll confirm scope and timeline on your strategy call.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Service list */}
        <div className="flex-1 min-w-0 space-y-6">
          {CATEGORIES.map((cat) => {
            const catServices = SERVICES.filter((s) => s.category === cat)
            return (
              <div key={cat} className="glass-card rounded-xl p-5">
                <div className="text-[10px] font-bold font-mono uppercase tracking-[0.18em] text-muted-foreground/60 mb-4">
                  {cat}
                </div>
                <div className="space-y-1">
                  {catServices.map((svc) => {
                    const isChecked = selected.has(svc.id)
                    return (
                      <label
                        key={svc.id}
                        className={`flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 transition-colors ${
                          svc.core
                            ? 'opacity-60 cursor-default'
                            : 'cursor-pointer hover:bg-foreground/[0.04]'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Toggle
                            checked={isChecked}
                            onChange={() => toggle(svc.id, svc.core)}
                            disabled={!!svc.core}
                          />
                          <span className="text-[13px] text-foreground/80 truncate">
                            {svc.name}
                          </span>
                          {svc.core && (
                            <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.15em] text-accent bg-accent/10 px-1.5 py-0.5 rounded-full">
                              Core
                            </span>
                          )}
                        </div>
                        <span className="shrink-0 text-[12px] font-semibold text-muted-foreground tabular-nums">
                          +{fmt(svc.price)}/mo
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary panel */}
        <div className="lg:sticky lg:top-24 w-full lg:w-[300px] xl:w-[320px] shrink-0">
          <div className="glass-card rounded-xl p-6 border border-border">
            <div className="text-[10px] font-bold font-mono uppercase tracking-[0.18em] text-muted-foreground/60 mb-4">
              Your custom plan
            </div>

            {selectedServices.length === 0 ? (
              <p className="text-[13px] text-muted-foreground/50 italic">
                No services selected yet.
              </p>
            ) : (
              <ul className="space-y-2 mb-4">
                <AnimatePresence initial={false}>
                  {selectedServices.map((svc) => (
                    <motion.li
                      key={svc.id}
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 8 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="flex items-start justify-between gap-2 overflow-hidden"
                    >
                      <div className="flex items-start gap-1.5 min-w-0">
                        {!svc.core && (
                          <button
                            type="button"
                            onClick={() => toggle(svc.id)}
                            className="mt-0.5 shrink-0 text-muted-foreground/40 hover:text-foreground/60 transition-colors"
                          >
                            <X size={11} />
                          </button>
                        )}
                        {svc.core && <span className="mt-0.5 w-[11px] shrink-0" />}
                        <span className="text-[12px] text-foreground/70 leading-snug">{svc.name}</span>
                      </div>
                      <span className="shrink-0 text-[12px] font-medium tabular-nums text-foreground/60">
                        {fmt(svc.price)}
                      </span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}

            <div className="h-px bg-border my-4" />

            <div className="flex items-baseline justify-between">
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Total
              </span>
              <motion.span
                key={total}
                initial={{ opacity: 0.5, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-[28px] font-bold tracking-[-0.04em] leading-none"
              >
                {fmt(total)}
                <span className="text-[13px] font-medium text-muted-foreground">/mo</span>
              </motion.span>
            </div>

            {/* Package comparison hint */}
            <AnimatePresence>
              {hint && (
                <motion.div
                  key={hint.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 rounded-lg bg-accent/[0.08] border border-accent/20 p-3"
                >
                  <div className="flex items-start gap-2">
                    <Sparkles size={13} className="shrink-0 mt-0.5 text-accent" />
                    <p className="text-[11px] text-foreground/70 leading-relaxed">
                      Our{' '}
                      <button
                        type="button"
                        onClick={() => router.push(`/checkout?plan=${hint.key}`)}
                        className="font-semibold text-accent underline underline-offset-2 hover:no-underline"
                      >
                        {hint.name}
                      </button>{' '}
                      plan covers this and more — including {hint.extras} — for{' '}
                      <span className="font-semibold">{fmt(hint.price)}/mo</span>.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="accent"
              size="lg"
              className="mt-5 w-full"
              onClick={() => router.push('/audit')}
            >
              Get a Quote <ArrowUpRight size={15} />
            </Button>

            <p className="mt-3 text-center text-[11px] text-muted-foreground/50">
              Final scope confirmed on your strategy call.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile sticky total bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-md px-5 py-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] text-muted-foreground uppercase tracking-[0.12em] font-semibold">
            Your plan
          </div>
          <div className="text-[20px] font-bold tracking-[-0.03em] leading-none">
            {fmt(total)}
            <span className="text-[12px] font-medium text-muted-foreground">/mo</span>
          </div>
        </div>
        <Button
          variant="accent"
          size="md"
          onClick={() => router.push('/audit')}
        >
          Get a Quote <ArrowUpRight size={14} />
        </Button>
      </div>
    </motion.div>
  )
}
