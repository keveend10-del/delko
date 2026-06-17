'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PageHeader, Panel, EmptyState, inputCls, selectCls, textareaCls } from '@/components/admin/ui'
import { Brain, CheckCircle2, XCircle, Play, Save, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { toast } from 'sonner'

type QueryResult = {
  query: string
  response: string
  mentioned: boolean
  competitors: string[]
}

type AuditResult = {
  business_name: string
  location: string
  industry: string
  results: QueryResult[]
  visibility_score: number
  queries_run: number
  mentioned_in: number
  competitors: string[]
}

type SavedAudit = AuditResult & {
  id: string
  created_at: string
  client_id: string | null
  notes: string | null
}

export default function AIVisibilityPage() {
  const supabase = createClient()

  const [businessName, setBusinessName] = useState('')
  const [location, setLocation] = useState('')
  const [industry, setIndustry] = useState('')
  const [clientId, setClientId] = useState('')
  const [clients, setClients] = useState<{ id: string; business_name: string }[]>([])

  const [running, setRunning] = useState(false)
  const [liveResult, setLiveResult] = useState<AuditResult | null>(null)
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null)

  const [history, setHistory] = useState<SavedAudit[]>([])
  const [loadingHistory, setLoadingHistory] = useState(true)
  const [expandedHistoryId, setExpandedHistoryId] = useState<string | null>(null)

  const loadHistory = async () => {
    setLoadingHistory(true)
    const { data } = await supabase
      .from('ai_audit_results')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)
    setHistory(data ?? [])
    setLoadingHistory(false)
  }

  useEffect(() => {
    loadHistory()
    supabase.from('clients').select('id, business_name').order('business_name').then(({ data }) => {
      setClients(data ?? [])
    })
  }, [])

  const runAudit = async () => {
    if (!businessName.trim() || !location.trim() || !industry.trim()) {
      toast.error('Fill in business name, location, and industry')
      return
    }
    setRunning(true)
    setLiveResult(null)
    setExpandedIdx(null)
    try {
      const res = await fetch('/api/admin/run-ai-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          business_name: businessName.trim(),
          location: location.trim(),
          industry: industry.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setLiveResult(data)
      toast.success('Audit complete')
    } catch (err: any) {
      toast.error(err.message ?? 'Audit failed')
    } finally {
      setRunning(false)
    }
  }

  const saveAudit = async () => {
    if (!liveResult) return
    const { error } = await supabase.from('ai_audit_results').insert({
      business_name: liveResult.business_name,
      location: liveResult.location,
      industry: liveResult.industry,
      results: liveResult.results,
      visibility_score: liveResult.visibility_score,
      queries_run: liveResult.queries_run,
      mentioned_in: liveResult.mentioned_in,
      competitors: liveResult.competitors,
      client_id: clientId || null,
    })
    if (error) toast.error(error.message)
    else { toast.success('Saved to history'); loadHistory() }
  }

  const deleteAudit = async (id: string) => {
    const { error } = await supabase.from('ai_audit_results').delete().eq('id', id)
    if (error) toast.error(error.message)
    else { toast.success('Deleted'); loadHistory() }
  }

  const scoreColor = (score: number) => {
    if (score >= 60) return 'text-emerald-400'
    if (score >= 30) return 'text-amber-400'
    return 'text-rose-400'
  }

  const scoreBg = (score: number) => {
    if (score >= 60) return 'bg-emerald-400/10 border-emerald-400/20'
    if (score >= 30) return 'bg-amber-400/10 border-amber-400/20'
    return 'bg-rose-400/10 border-rose-400/20'
  }

  return (
    <div>
      <PageHeader
        eyebrow="Growth & Visibility"
        title="AI Visibility Audit"
        description="Check how visible a business is in AI search results (ChatGPT, Perplexity, Claude)."
      />

      <div className="grid lg:grid-cols-5 gap-4">
        {/* Form */}
        <Panel className="p-5 lg:col-span-2 space-y-4 self-start">
          <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
            <Brain size={12} className="text-accent" />
            Run new audit
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Business name</label>
            <input
              value={businessName}
              onChange={e => setBusinessName(e.target.value)}
              placeholder="e.g. Salem Plumbing Co."
              className={inputCls + ' h-10'}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Location</label>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Salem, MA"
              className={inputCls + ' h-10'}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Industry / service type</label>
            <input
              value={industry}
              onChange={e => setIndustry(e.target.value)}
              placeholder="e.g. plumbing, pressure washing, med spa"
              className={inputCls + ' h-10'}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Link to client (optional)</label>
            <select value={clientId} onChange={e => setClientId(e.target.value)} className={selectCls + ' h-10'}>
              <option value="">None</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.business_name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={runAudit}
            disabled={running}
            className="w-full h-11 rounded-xl bg-accent text-[#0A0A0A] font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 hover:brightness-105 transition-all"
          >
            {running ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-[#0A0A0A] border-t-transparent animate-spin" />
                Running 5 queries…
              </>
            ) : (
              <>
                <Play size={14} />
                Run AI Audit
              </>
            )}
          </button>

          {liveResult && (
            <button
              onClick={saveAudit}
              className="w-full h-10 rounded-xl border border-border bg-surface hover:bg-surface-elevated text-foreground text-sm font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Save size={13} />
              Save to history
            </button>
          )}
        </Panel>

        {/* Results */}
        <div className="lg:col-span-3 space-y-4">
          {liveResult ? (
            <>
              {/* Score card */}
              <Panel className={`p-5 border ${scoreBg(liveResult.visibility_score)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">AI Visibility Score</div>
                    <div className={`text-5xl font-bold tabular-nums ${scoreColor(liveResult.visibility_score)}`}>
                      {liveResult.visibility_score}%
                    </div>
                    <div className="mt-1.5 text-sm text-muted-foreground">
                      Mentioned in {liveResult.mentioned_in} of {liveResult.queries_run} queries
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-base">{liveResult.business_name}</div>
                    <div className="text-sm text-muted-foreground">{liveResult.location} · {liveResult.industry}</div>
                  </div>
                </div>

                {liveResult.competitors.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Competitors mentioned instead</div>
                    <div className="flex flex-wrap gap-1.5">
                      {liveResult.competitors.map(c => (
                        <span key={c} className="text-xs bg-surface border border-border rounded-full px-3 py-1 text-muted-foreground">{c}</span>
                      ))}
                    </div>
                  </div>
                )}
              </Panel>

              {/* Query breakdown */}
              <Panel className="overflow-hidden">
                <div className="px-5 py-4 border-b border-border text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Query breakdown
                </div>
                <ul className="divide-y divide-border">
                  {liveResult.results.map((r, i) => (
                    <li key={i}>
                      <button
                        onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                        className="w-full flex items-center justify-between gap-3 px-5 py-3.5 hover:bg-surface-elevated/40 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {r.mentioned
                            ? <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                            : <XCircle size={15} className="text-rose-400 shrink-0" />
                          }
                          <span className="text-sm truncate">{r.query}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[11px] font-semibold ${r.mentioned ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                            {r.mentioned ? 'Mentioned' : 'Not found'}
                          </span>
                          {expandedIdx === i ? <ChevronUp size={13} className="text-muted-foreground" /> : <ChevronDown size={13} className="text-muted-foreground" />}
                        </div>
                      </button>
                      {expandedIdx === i && (
                        <div className="px-5 pb-4 bg-surface/50">
                          <div className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                            {r.response}
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </Panel>
            </>
          ) : (
            <Panel className="p-8">
              <EmptyState
                title="No audit run yet"
                description="Fill in the form and run an audit to see AI visibility results."
              />
            </Panel>
          )}
        </div>
      </div>

      {/* History */}
      <div className="mt-6">
        <Panel className="overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Audit history</div>
          </div>
          {loadingHistory ? (
            <div className="flex items-center justify-center py-12">
              <span className="h-4 w-4 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            </div>
          ) : history.length === 0 ? (
            <EmptyState title="No saved audits" description="Run an audit and save it to build a history." />
          ) : (
            <ul className="divide-y divide-border">
              {history.map(h => (
                <li key={h.id}>
                  <button
                    onClick={() => setExpandedHistoryId(expandedHistoryId === h.id ? null : h.id)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-surface-elevated/40 transition-colors text-left"
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-sm">{h.business_name}</div>
                      <div className="text-xs text-muted-foreground">{h.location} · {h.industry}</div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className={`text-lg font-bold tabular-nums ${scoreColor(h.visibility_score)}`}>
                        {h.visibility_score}%
                      </div>
                      <div className="text-xs text-muted-foreground hidden sm:block">
                        {format(parseISO(h.created_at), 'MMM d, yyyy')}
                      </div>
                      {expandedHistoryId === h.id
                        ? <ChevronUp size={13} className="text-muted-foreground" />
                        : <ChevronDown size={13} className="text-muted-foreground" />
                      }
                    </div>
                  </button>
                  {expandedHistoryId === h.id && (
                    <div className="px-5 pb-5 space-y-3 bg-surface/50">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {h.mentioned_in} of {h.queries_run} queries mentioned this business.
                        </div>
                        <button
                          onClick={() => deleteAudit(h.id)}
                          className="flex items-center gap-1.5 text-xs text-rose-400 hover:bg-rose-500/10 px-3 py-1.5 rounded-lg border border-rose-500/20 transition-colors"
                        >
                          <Trash2 size={11} /> Delete
                        </button>
                      </div>
                      {h.competitors?.length > 0 && (
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">Competitors mentioned</div>
                          <div className="flex flex-wrap gap-1.5">
                            {h.competitors.map((c: string) => (
                              <span key={c} className="text-xs bg-surface border border-border rounded-full px-3 py-1 text-muted-foreground">{c}</span>
                            ))}
                          </div>
                        </div>
                      )}
                      <ul className="divide-y divide-border rounded-xl border border-border overflow-hidden">
                        {(h.results as QueryResult[]).map((r, i) => (
                          <li key={i} className="flex items-center gap-3 px-4 py-3">
                            {r.mentioned
                              ? <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                              : <XCircle size={13} className="text-rose-400 shrink-0" />
                            }
                            <span className="text-sm text-muted-foreground truncate">{r.query}</span>
                            <span className={`ml-auto text-[11px] font-semibold shrink-0 ${r.mentioned ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {r.mentioned ? 'Mentioned' : 'Not found'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  )
}
