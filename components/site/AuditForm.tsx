'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ArrowUpRight, CheckCircle2, Globe, MapPin, Star, Search, TrendingUp, MessageSquare } from 'lucide-react'
import { trackAuditSubmission } from '@/lib/analytics'
import { BERKSHIRE_TOWNS, NORTH_SHORE_TOWNS } from '@/lib/admin-constants'

const businessTypes = [
  'Pressure washing', 'Painting', 'HVAC / plumbing',
  'Roofing / contracting', 'Electrician', 'Landscaping',
  'Remodeling / flooring', 'Cleaning services', 'Med spa / wellness',
  'Restaurant / hospitality', 'Law firm', 'Other',
]

const helpOptions = [
  { id: 'Website & mobile experience', label: 'Website', icon: Globe, desc: 'Speed, mobile, design' },
  { id: 'Google Business Profile', label: 'Google Profile', icon: MapPin, desc: 'GBP optimization' },
  { id: 'Reviews & trust signals', label: 'Reviews', icon: Star, desc: 'Build trust online' },
  { id: 'Local SEO', label: 'Local SEO', icon: Search, desc: 'Service pages, rankings' },
  { id: 'AI search visibility', label: 'AI Visibility', icon: TrendingUp, desc: 'ChatGPT, Gemini, AI' },
  { id: 'Lead capture & follow-up', label: 'Leads & Follow-Up', icon: MessageSquare, desc: 'Forms, automation' },
]

const inputCls = 'h-11 w-full rounded-lg bg-surface border border px-4 text-[14px] text-foreground outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all placeholder:text-muted-foreground'
const selectCls = `${inputCls} cursor-pointer`

export const AuditForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', business: '', email: '', phone: '', link: '', town: '', type: '', help: [] as string[], message: '',
  })

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))
  const toggleHelp = (val: string) =>
    setForm((f) => ({ ...f, help: f.help.includes(val) ? f.help.filter((x) => x !== val) : [...f.help, val] }))

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.business || !form.email) { setError('Name, business, and email are required.'); return }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/submit-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
      trackAuditSubmission(form.type)
    } catch {
      setError('Something went wrong. Email us directly at hello@delkoagency.com')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-xl bg-card border border p-12 sm:p-16 text-center shadow-card"
      >
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 18 }}
          className="mx-auto h-16 w-16 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center shadow-[0_0_40px_hsl(var(--accent)/0.2)]"
        >
          <CheckCircle2 className="text-accent" size={32} />
        </motion.div>
        <h3 className="mt-6 text-3xl font-bold tracking-tight">Thanks. Request received.</h3>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">We&apos;ll review your online presence and get back to you within 1–2 business days.</p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-xl bg-card border border p-6 sm:p-10 shadow-card" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">

        {/* Basic fields */}
        <Field label="Name">
          <input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your full name" className={inputCls} />
        </Field>
        <Field label="Business name">
          <input value={form.business} onChange={(e) => update('business', e.target.value)} placeholder="e.g. Harbor Painting Co." className={inputCls} />
        </Field>
        <Field label="Email">
          <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@business.com" className={inputCls} />
        </Field>
        <Field label="Phone" optional>
          <input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="(978) 555-0123" className={inputCls} />
        </Field>
        <Field label="Town / area" optional>
          <select value={form.town} onChange={(e) => update('town', e.target.value)} className={selectCls}>
            <option value="">Where is your business?</option>
            <optgroup label="North Shore">
              {NORTH_SHORE_TOWNS.map(t => <option key={t} value={t}>{t}</option>)}
            </optgroup>
            <optgroup label="Berkshire County">
              {BERKSHIRE_TOWNS.map(t => <option key={t} value={t}>{t}</option>)}
            </optgroup>
          </select>
        </Field>
        <Field label="Website or social link" optional>
          <input value={form.link} onChange={(e) => update('link', e.target.value)} placeholder="https:// or @instagram" className={inputCls} />
        </Field>

        {/* Business type — button grid */}
        <div className="sm:col-span-2 space-y-3">
          <label className="text-[13px] font-semibold text-foreground/90 block">Type of business</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {businessTypes.map((t) => {
              const selected = form.type === t
              return (
                <motion.button
                  key={t}
                  type="button"
                  onClick={() => update('type', selected ? '' : t)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className={`h-10 rounded-lg border px-3 text-[13px] font-medium transition-all text-left truncate ${
                    selected
                      ? 'border-accent/50 bg-accent/10 text-foreground shadow-[0_0_16px_hsl(var(--accent)/0.12)]'
                      : 'border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground'
                  }`}
                >
                  {t}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Help options */}
        <div className="sm:col-span-2 space-y-3">
          <div>
            <label className="text-[13px] font-semibold text-foreground/90 block">What should we look at?</label>
            <p className="text-[11px] text-muted-foreground mt-0.5 tracking-wide">Select everything that applies — we'll cover it in your audit</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {helpOptions.map(({ id, label, icon: Icon, desc }) => {
              const checked = form.help.includes(id)
              return (
                <motion.button
                  key={id}
                  type="button"
                  onClick={() => toggleHelp(id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative flex items-center gap-3 rounded-lg border px-4 py-3.5 text-left transition-all duration-200 ${
                    checked
                      ? 'border-accent/40 bg-accent/[0.06] shadow-[0_0_24px_hsl(var(--accent)/0.08)]'
                      : 'border bg-surface hover:border-border-strong'
                  }`}
                >
                  {/* Radio indicator */}
                  <div className={`relative h-5 w-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all duration-200 ${
                    checked
                      ? 'border-accent bg-accent shadow-[0_0_10px_hsl(var(--accent)/0.6)]'
                      : 'border-muted-foreground/30 bg-transparent'
                  }`}>
                    <AnimatePresence>
                      {checked && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.15, type: 'spring', stiffness: 400 }}
                          className="h-2 w-2 rounded-full bg-background"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  <Icon size={14} className={`shrink-0 transition-colors duration-200 ${checked ? 'text-accent' : 'text-muted-foreground'}`} />

                  <div className="min-w-0">
                    <div className={`text-[13px] font-semibold leading-tight transition-colors ${checked ? 'text-foreground' : 'text-foreground/70'}`}>{label}</div>
                    <div className="text-[11px] text-muted-foreground/70 mt-0.5">{desc}</div>
                  </div>

                  {checked && (
                    <div className="absolute inset-0 rounded-xl pointer-events-none" style={{ background: 'radial-gradient(ellipse at 20% 50%, hsl(var(--accent)/0.06), transparent 70%)' }} />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <Field label="Message" optional>
            <textarea
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              rows={4}
              placeholder="Anything specific you want us to look at?"
              className={`${inputCls} h-auto py-3 resize-none`}
            />
          </Field>
        </div>
      </div>

      {error && <p className="mt-4 text-[13px] text-red-500">{error}</p>}

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-[12px] text-muted-foreground">We respond within 1–2 business days. No spam, no sales pressure.</p>
        <Button type="submit" variant="accent" size="xl" className="w-full sm:w-auto" loading={submitting}>
          Request My Free Visibility Audit <ArrowUpRight size={16} />
        </Button>
      </div>
    </form>
  )
}

function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[13px] font-semibold text-foreground/90 flex items-center gap-2 mb-2">
        {label}
        {optional && <span className="text-[10px] font-normal text-muted-foreground uppercase tracking-wider">Optional</span>}
      </label>
      {children}
    </div>
  )
}
