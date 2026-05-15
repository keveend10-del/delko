import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/server'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { PACKAGES, Package } from '@/lib/types'
import { formatCurrency, formatMonth } from '@/lib/utils'
import { PrintButton } from './PrintButton'
import { Users, Target, Star, DollarSign, ArrowRight, FileText } from 'lucide-react'

export const dynamic = 'force-dynamic'

async function getClientData(slug: string) {
  const supabase = createAdminClient()
  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('slug', slug)
    .single()
  if (!client) return null

  const { data: metrics } = await supabase
    .from('monthly_metrics')
    .select('*')
    .eq('client_id', client.id)
    .order('month_year', { ascending: false })
    .limit(12)

  return { client, metrics: metrics ?? [] }
}

const STATUS = {
  pending: { label: 'Pending Setup', dot: 'bg-yellow-400', text: 'text-yellow-400' },
  active: { label: 'Active', dot: 'bg-accent', text: 'text-accent' },
  past_due: { label: 'Payment Past Due', dot: 'bg-red-400', text: 'text-red-400' },
  canceled: { label: 'Canceled', dot: 'bg-white/25', text: 'text-white/30' },
}

function trendDir(curr: number, prev: number | undefined): 'up' | 'down' | 'neutral' {
  if (prev === undefined) return 'neutral'
  if (curr > prev) return 'up'
  if (curr < prev) return 'down'
  return 'neutral'
}

export default async function DashboardPage({
  params,
}: {
  params: { clientSlug: string }
}) {
  const result = await getClientData(params.clientSlug)
  if (!result) notFound()

  const { client, metrics } = result
  const latest = metrics[0]
  const prev = metrics[1]
  const pkg = PACKAGES[client.package as Package]
  const status = STATUS[client.subscription_status as keyof typeof STATUS] ?? STATUS.pending

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[14px] font-semibold tracking-tight">Delko</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              <span className={`text-[12px] font-medium ${status.text}`}>{status.label}</span>
            </div>
            <PrintButton />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 space-y-12">
        {/* Hero */}
        <div className="print-section">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent mb-3">
            Client Dashboard
          </p>
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-tight mb-1">
            {client.business_name}
          </h1>
          <p className="text-white/40 text-[15px]">
            {pkg.name} Plan · {formatCurrency(pkg.price)}/mo
          </p>
        </div>

        {/* Latest month */}
        {latest ? (
          <div className="print-section space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold tracking-tight">
                {formatMonth(latest.month_year)}
              </h2>
              <span className="text-[12px] text-white/30 font-medium">Most recent</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <MetricCard
                label="Leads Generated"
                value={String(latest.leads_generated)}
                icon={<Users size={16} />}
                trend={trendDir(latest.leads_generated, prev?.leads_generated)}
                trendLabel={prev ? `${prev.leads_generated} last month` : undefined}
                accent
              />
              <MetricCard
                label="Cost Per Lead"
                value={latest.cost_per_lead > 0 ? formatCurrency(latest.cost_per_lead) : '—'}
                icon={<Target size={16} />}
                trend={
                  latest.cost_per_lead > 0 && prev?.cost_per_lead > 0
                    ? latest.cost_per_lead < prev.cost_per_lead
                      ? 'up'
                      : 'down'
                    : 'neutral'
                }
                trendLabel={
                  prev?.cost_per_lead > 0
                    ? `${formatCurrency(prev.cost_per_lead)} last month`
                    : undefined
                }
              />
              <MetricCard
                label="New Reviews"
                value={String(latest.new_reviews)}
                icon={<Star size={16} />}
                trend={trendDir(latest.new_reviews, prev?.new_reviews)}
                trendLabel={prev ? `${prev.new_reviews} last month` : undefined}
              />
              <MetricCard
                label="Ad Spend"
                value={latest.ad_spend > 0 ? formatCurrency(latest.ad_spend) : '—'}
                sub={
                  latest.ad_budget > 0
                    ? `of ${formatCurrency(latest.ad_budget)} budget`
                    : undefined
                }
                icon={<DollarSign size={16} />}
              />
            </div>

            {latest.next_steps && (
              <div className="rounded-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <ArrowRight size={14} className="text-accent" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
                    Next Steps
                  </p>
                </div>
                <p className="text-[14px] text-white/70 leading-relaxed whitespace-pre-line">
                  {latest.next_steps}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] p-10 text-center">
            <FileText size={24} className="text-white/20 mx-auto mb-3" />
            <p className="text-[15px] font-medium text-white/50">Your first report is on its way.</p>
            <p className="text-[13px] text-white/30 mt-1">
              We'll have Month 1 metrics ready at the end of the month.
            </p>
          </div>
        )}

        {/* History */}
        {metrics.length > 1 && (
          <div className="print-section space-y-4">
            <h2 className="text-[18px] font-bold tracking-tight">Performance History</h2>
            <div className="space-y-3">
              {metrics.slice(1).map((m) => (
                <div
                  key={m.id}
                  className="rounded-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] p-5"
                >
                  <p className="font-semibold text-[15px] mb-4">{formatMonth(m.month_year)}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[13px]">
                    <div>
                      <p className="text-white/35 mb-0.5">Leads</p>
                      <p className="font-semibold">{m.leads_generated}</p>
                    </div>
                    <div>
                      <p className="text-white/35 mb-0.5">Cost / Lead</p>
                      <p className="font-semibold">
                        {m.cost_per_lead > 0 ? formatCurrency(m.cost_per_lead) : '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/35 mb-0.5">Reviews</p>
                      <p className="font-semibold">{m.new_reviews}</p>
                    </div>
                    <div>
                      <p className="text-white/35 mb-0.5">Ad Spend</p>
                      <p className="font-semibold">
                        {m.ad_spend > 0 ? formatCurrency(m.ad_spend) : '—'}
                      </p>
                    </div>
                  </div>
                  {m.next_steps && (
                    <p className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)] text-[12px] text-white/40 leading-relaxed">
                      {m.next_steps}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center text-[12px] text-white/20 pt-4 border-t border-[rgba(255,255,255,0.06)] no-print">
          Questions?{' '}
          <a href="mailto:hello@berkgrowth.co" className="text-accent hover:underline">
            hello@berkgrowth.co
          </a>
        </div>
      </div>
    </div>
  )
}
