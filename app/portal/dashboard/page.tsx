'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePortalAuth } from '@/contexts/PortalAuth'
import { createClient } from '@/lib/supabase/client'
import { PACKAGES, ONBOARDING_TASKS, type MonthlyMetrics, type Package } from '@/lib/types'
import { formatCurrency, formatMonth } from '@/lib/utils'
import { Panel, PageHeader, KpiCard } from '@/components/admin/ui'
import { Users, Star, DollarSign, Target, ArrowRight, CheckCircle, Circle, ChevronRight } from 'lucide-react'

const STATUS_COLORS: Record<string, { dot: string; text: string; label: string }> = {
  pending: { dot: 'bg-yellow-400', text: 'text-yellow-300', label: 'Pending setup' },
  active: { dot: 'bg-accent', text: 'text-accent', label: 'Active' },
  past_due: { dot: 'bg-red-400', text: 'text-red-400', label: 'Payment past due' },
  canceled: { dot: 'bg-zinc-500', text: 'text-zinc-400', label: 'Canceled' },
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/55">
    <span className="h-2.5 w-[2px] rounded-full bg-accent/50 shrink-0" />
    {children}
  </h2>
)

export default function PortalDashboard() {
  const { client } = usePortalAuth()
  const supabase = createClient()
  const [metrics, setMetrics] = useState<MonthlyMetrics[]>([])
  const [loadingMetrics, setLoadingMetrics] = useState(true)

  useEffect(() => {
    if (!client) return
    supabase
      .from('monthly_metrics')
      .select('*')
      .eq('client_id', client.id)
      .order('month_year', { ascending: false })
      .limit(3)
      .then(({ data }) => {
        setMetrics(data ?? [])
        setLoadingMetrics(false)
      })
  }, [client?.id])

  if (!client) return null

  const pkg = PACKAGES[(client.package as Package) ?? 'growth'] ?? PACKAGES.growth
  const status = STATUS_COLORS[client.subscription_status] ?? STATUS_COLORS.pending
  const latest = metrics[0]
  const completed = client.onboarding_completed ?? []
  const onboardingPct = Math.round((completed.length / ONBOARDING_TASKS.length) * 100)

  return (
    <div>
      <PageHeader
        eyebrow="Client portal"
        title={`${client.business_name}`}
        description={`${pkg.name} plan · ${formatCurrency(pkg.price)}/mo`}
      />

      {/* Plan status banner */}
      <div className={`mb-6 rounded-2xl border px-5 py-3.5 flex items-center justify-between gap-3 ${
        client.subscription_status === 'active'
          ? 'border-accent/20 bg-accent/5'
          : client.subscription_status === 'past_due'
          ? 'border-red-500/25 bg-red-500/5'
          : 'border-border bg-surface'
      }`}>
        <div className="flex items-center gap-2.5">
          <span className={`h-2 w-2 rounded-full ${status.dot}`} />
          <span className={`text-[13px] font-medium ${status.text}`}>{status.label}</span>
          <span className="text-muted-foreground text-[13px]">·</span>
          <span className="text-[13px] text-muted-foreground">{pkg.name} plan</span>
        </div>
        <Link href="/portal/billing" className="text-[12px] text-accent hover:underline">
          Manage billing →
        </Link>
      </div>

      {/* KPI grid — latest month */}
      {loadingMetrics ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {[...Array(4)].map((_, i) => (
            <Panel key={i} className="p-5 animate-pulse">
              <div className="h-4 w-20 bg-surface-elevated rounded mb-3" />
              <div className="h-8 w-12 bg-surface-elevated rounded" />
            </Panel>
          ))}
        </div>
      ) : latest ? (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] text-muted-foreground">Latest report · {formatMonth(latest.month_year)}</span>
            <Link href="/portal/reports" className="text-[12px] text-accent hover:underline">View all reports →</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <KpiCard label="Leads generated" value={latest.leads_generated} icon={Users} />
            <KpiCard label="Cost per lead" value={latest.cost_per_lead > 0 ? formatCurrency(latest.cost_per_lead) : '—'} icon={Target} />
            <KpiCard label="New reviews" value={latest.new_reviews} icon={Star} />
            <KpiCard label="Ad spend" value={latest.ad_spend > 0 ? formatCurrency(latest.ad_spend) : '—'} icon={DollarSign} />
          </div>
          {latest.next_steps && (
            <Panel className="mt-3 p-5">
              <div className="flex items-center gap-2 mb-2">
                <ArrowRight size={13} className="text-accent" />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">Next steps</span>
              </div>
              <p className="text-[13px] text-foreground/70 leading-relaxed whitespace-pre-line">{latest.next_steps}</p>
            </Panel>
          )}
        </div>
      ) : (
        <Panel className="mb-6 p-8 text-center">
          <p className="text-sm font-medium text-foreground/60">Your first report is on its way.</p>
          <p className="text-[12px] text-muted-foreground mt-1">We'll have Month 1 metrics ready at the end of the month.</p>
        </Panel>
      )}

      {/* Quick links grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Onboarding progress */}
        <Panel className="p-6">
          <SectionTitle>Onboarding</SectionTitle>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold">{completed.length} / {ONBOARDING_TASKS.length} tasks</span>
              <span className="text-[12px] text-accent font-semibold">{onboardingPct}%</span>
            </div>
            <div className="h-2 rounded-full bg-surface-elevated overflow-hidden mb-4">
              <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${onboardingPct}%` }} />
            </div>
            <ul className="space-y-2 mb-4">
              {ONBOARDING_TASKS.slice(0, 4).map(task => {
                const done = completed.includes(task.key)
                return (
                  <li key={task.key} className="flex items-center gap-2.5 text-[12px]">
                    {done
                      ? <CheckCircle size={13} className="text-accent shrink-0" />
                      : <Circle size={13} className="text-muted-foreground shrink-0" />}
                    <span className={done ? 'text-foreground/60 line-through' : 'text-foreground/80'}>{task.label}</span>
                  </li>
                )
              })}
              {ONBOARDING_TASKS.length > 4 && (
                <li className="text-[11px] text-muted-foreground pl-5">+{ONBOARDING_TASKS.length - 4} more</li>
              )}
            </ul>
            <Link href="/portal/onboarding" className="flex items-center gap-1 text-[12px] text-accent hover:underline">
              View full checklist <ChevronRight size={12} />
            </Link>
          </div>
        </Panel>

        {/* Plan details */}
        <Panel className="p-6">
          <SectionTitle>Your plan</SectionTitle>
          <div className="mt-4 space-y-3">
            <div>
              <p className="text-2xl font-bold tracking-tight text-accent">{pkg.name}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">{pkg.tagline}</p>
            </div>
            <div className="h-px bg-border" />
            <ul className="space-y-1.5">
              {pkg.features.slice(0, 5).map(f => (
                <li key={f} className="flex items-start gap-2 text-[12px] text-foreground/70">
                  <CheckCircle size={11} className="text-accent mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
              {pkg.features.length > 5 && (
                <li className="text-[11px] text-muted-foreground pl-4">+{pkg.features.length - 5} more</li>
              )}
            </ul>
            <Link href="/portal/billing" className="flex items-center gap-1 text-[12px] text-accent hover:underline">
              View billing <ChevronRight size={12} />
            </Link>
          </div>
        </Panel>

        {/* Quick actions */}
        <Panel className="p-6">
          <SectionTitle>Quick links</SectionTitle>
          <div className="mt-4 space-y-2">
            {[
              { href: '/portal/project', label: 'View project status', icon: ArrowRight },
              { href: '/portal/messages', label: 'Send a message', icon: ArrowRight },
              { href: '/portal/reports', label: 'See monthly reports', icon: ArrowRight },
              { href: '/portal/billing', label: 'Manage billing', icon: ArrowRight },
            ].map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 text-[13px] font-medium hover:bg-surface-elevated hover:border-border-strong transition-colors"
              >
                {label}
                <Icon size={13} className="text-muted-foreground" />
              </Link>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  )
}
