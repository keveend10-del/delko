'use client'

import { useEffect, useState } from 'react'
import { usePortalAuth } from '@/contexts/PortalAuth'
import { createClient } from '@/lib/supabase/client'
import { Panel, PageHeader } from '@/components/admin/ui'
import { type MonthlyMetrics } from '@/lib/types'
import { formatCurrency, formatMonth } from '@/lib/utils'
import { Users, Star, DollarSign, Target, TrendingUp, TrendingDown, Minus, BarChart2 } from 'lucide-react'

function TrendIcon({ curr, prev, inverse = false }: { curr: number; prev?: number; inverse?: boolean }) {
  if (prev === undefined || prev === curr) return <Minus size={12} className="text-muted-foreground" />
  const improved = inverse ? curr < prev : curr > prev
  return improved
    ? <TrendingUp size={12} className="text-accent" />
    : <TrendingDown size={12} className="text-red-400" />
}

function MetricRow({ label, curr, prev, format: fmt = 'number', inverse = false }: {
  label: string
  curr: number
  prev?: number
  format?: 'number' | 'currency'
  inverse?: boolean
}) {
  const display = curr === 0 ? '—' : fmt === 'currency' ? formatCurrency(curr) : String(curr)
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
      <span className="text-[13px] text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        {prev !== undefined && <TrendIcon curr={curr} prev={prev} inverse={inverse} />}
        <span className="text-[13px] font-semibold tabular-nums">{display}</span>
      </div>
    </div>
  )
}

export default function ReportsPage() {
  const { client } = usePortalAuth()
  const supabase = createClient()
  const [metrics, setMetrics] = useState<MonthlyMetrics[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!client) return
    supabase
      .from('monthly_metrics')
      .select('*')
      .eq('client_id', client.id)
      .order('month_year', { ascending: false })
      .limit(12)
      .then(({ data }) => {
        setMetrics(data ?? [])
        setLoading(false)
      })
  }, [client?.id])

  if (!client) return null

  const current = metrics[selected]
  const prev = metrics[selected + 1]

  return (
    <div>
      <PageHeader
        eyebrow="Performance"
        title="Monthly reports"
        description="See your leads, reviews, ad spend, and cost per lead across every month we've worked together."
      />

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <Panel key={i} className="p-5 animate-pulse">
              <div className="h-4 w-32 bg-surface-elevated rounded" />
            </Panel>
          ))}
        </div>
      ) : metrics.length === 0 ? (
        <Panel className="p-12 text-center">
          <div className="h-12 w-12 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center mx-auto mb-4">
            <BarChart2 size={20} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-semibold text-foreground/60 mb-1">No reports yet</p>
          <p className="text-[12px] text-muted-foreground">Your first month&apos;s report will appear here at the end of the month.</p>
        </Panel>
      ) : (
        <div className="grid lg:grid-cols-3 gap-5">
          {/* Month selector */}
          <div className="lg:col-span-1">
            <Panel className="p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground px-2 mb-3">Select month</p>
              <div className="space-y-1">
                {metrics.map((m, i) => (
                  <button
                    key={m.id}
                    onClick={() => setSelected(i)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors ${
                      i === selected
                        ? 'bg-accent/10 text-foreground border border-accent/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-surface-elevated border border-transparent'
                    }`}
                  >
                    <span>{formatMonth(m.month_year)}</span>
                    {i === 0 && (
                      <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-accent">Latest</span>
                    )}
                  </button>
                ))}
              </div>
            </Panel>
          </div>

          {/* Report detail */}
          <div className="lg:col-span-2 space-y-4">
            {current && (
              <>
                <Panel className="p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold tracking-tight">{formatMonth(current.month_year)}</h2>
                    {selected === 0 && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/25 bg-accent/10 px-2.5 py-1 rounded-full">
                        Most recent
                      </span>
                    )}
                  </div>

                  {/* Summary KPIs */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[
                      { label: 'Leads', value: current.leads_generated, icon: Users },
                      { label: 'Reviews', value: current.new_reviews, icon: Star },
                      { label: 'Cost / Lead', value: current.cost_per_lead > 0 ? formatCurrency(current.cost_per_lead) : '—', icon: Target },
                      { label: 'Ad Spend', value: current.ad_spend > 0 ? formatCurrency(current.ad_spend) : '—', icon: DollarSign },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="rounded-xl bg-surface border border-border p-4">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Icon size={13} className="text-muted-foreground" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
                        </div>
                        <p className="text-xl font-bold tabular-nums">{value}</p>
                        {prev && (
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {label === 'Leads' && `${prev.leads_generated} prev month`}
                            {label === 'Reviews' && `${prev.new_reviews} prev month`}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  <MetricRow label="Leads generated" curr={current.leads_generated} prev={prev?.leads_generated} />
                  <MetricRow label="Cost per lead" curr={current.cost_per_lead} prev={prev?.cost_per_lead} format="currency" inverse />
                  <MetricRow label="New reviews" curr={current.new_reviews} prev={prev?.new_reviews} />
                  <MetricRow label="Ad spend" curr={current.ad_spend} prev={prev?.ad_spend} format="currency" inverse />
                  {current.ad_budget > 0 && (
                    <MetricRow label="Ad budget" curr={current.ad_budget} format="currency" />
                  )}
                  {current.ranking_movement !== 0 && (
                    <MetricRow label="Ranking movement" curr={current.ranking_movement} />
                  )}
                </Panel>

                {current.next_steps && (
                  <Panel className="p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-3">Next steps from Delko</p>
                    <p className="text-[13px] text-foreground/75 leading-relaxed whitespace-pre-line">{current.next_steps}</p>
                  </Panel>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
