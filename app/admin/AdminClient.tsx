'use client'

import { useState, useEffect, useCallback } from 'react'
import { Client, PACKAGES, Package } from '@/lib/types'
import { formatCurrency, formatMonth, currentMonthYear } from '@/lib/utils'
import { LogOut, Plus, Copy, Check, Users, DollarSign, ExternalLink, X } from 'lucide-react'

const STATUS = {
  pending: { label: 'Pending', text: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  active: { label: 'Active', text: 'text-accent', bg: 'bg-accent/10' },
  past_due: { label: 'Past Due', text: 'text-red-400', bg: 'bg-red-400/10' },
  canceled: { label: 'Canceled', text: 'text-white/30', bg: 'bg-white/5' },
}

const EMPTY_CREATE = {
  name: '', businessName: '', email: '',
  pkg: 'growth' as Package, customScope: '',
}

const EMPTY_METRICS = {
  clientId: '', monthYear: currentMonthYear(),
  leadsGenerated: '', costPerLead: '', rankingMovement: '',
  newReviews: '', adSpend: '', adBudget: '', nextSteps: '',
}

export function AdminClient({ initiallyAuthed }: { initiallyAuthed: boolean }) {
  const [authed, setAuthed] = useState(initiallyAuthed)
  const [tab, setTab] = useState<'clients' | 'metrics'>('clients')
  const [clients, setClients] = useState<Client[]>([])
  const [dataLoading, setDataLoading] = useState(false)

  // Login state
  const [password, setPassword] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [loginError, setLoginError] = useState('')

  // Create client state
  const [showCreate, setShowCreate] = useState(false)
  const [createForm, setCreateForm] = useState(EMPTY_CREATE)
  const [createLoading, setCreateLoading] = useState(false)
  const [createError, setCreateError] = useState('')
  const [createdSlug, setCreatedSlug] = useState('')

  // Metrics state
  const [metricsForm, setMetricsForm] = useState(EMPTY_METRICS)
  const [metricsLoading, setMetricsLoading] = useState(false)
  const [metricsError, setMetricsError] = useState('')
  const [metricsSaved, setMetricsSaved] = useState(false)

  // Copy state
  const [copied, setCopied] = useState('')

  const fetchClients = useCallback(async () => {
    setDataLoading(true)
    try {
      const res = await fetch('/api/admin/clients')
      if (!res.ok) return
      setClients(await res.json())
    } finally {
      setDataLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authed) fetchClients()
  }, [authed, fetchClients])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) throw new Error('Invalid password')
      setAuthed(true)
      setPassword('')
    } catch {
      setLoginError('Invalid password')
    } finally {
      setLoginLoading(false)
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    setAuthed(false)
    setClients([])
  }

  async function handleCreateClient(e: React.FormEvent) {
    e.preventDefault()
    setCreateLoading(true)
    setCreateError('')
    try {
      const res = await fetch('/api/admin/create-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: createForm.name,
          businessName: createForm.businessName,
          email: createForm.email,
          pkg: createForm.pkg,
          customScope: createForm.customScope,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setCreatedSlug(data.slug)
      setCreateForm(EMPTY_CREATE)
      fetchClients()
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create client')
    } finally {
      setCreateLoading(false)
    }
  }

  async function handleUpdateMetrics(e: React.FormEvent) {
    e.preventDefault()
    setMetricsLoading(true)
    setMetricsError('')
    setMetricsSaved(false)
    try {
      const res = await fetch('/api/admin/update-metrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: metricsForm.clientId,
          monthYear: metricsForm.monthYear,
          leadsGenerated: parseInt(metricsForm.leadsGenerated) || 0,
          costPerLead: parseFloat(metricsForm.costPerLead) || 0,
          rankingMovement: parseInt(metricsForm.rankingMovement) || 0,
          newReviews: parseInt(metricsForm.newReviews) || 0,
          adSpend: parseFloat(metricsForm.adSpend) || 0,
          adBudget: parseFloat(metricsForm.adBudget) || 0,
          nextSteps: metricsForm.nextSteps || null,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMetricsSaved(true)
    } catch (err) {
      setMetricsError(err instanceof Error ? err.message : 'Failed to save metrics')
    } finally {
      setMetricsLoading(false)
    }
  }

  function copyProposalUrl(slug: string) {
    const url = `${window.location.origin}/proposal/${slug}`
    navigator.clipboard.writeText(url)
    setCopied(slug)
    setTimeout(() => setCopied(''), 2000)
  }

  const mrr = clients
    .filter((c) => c.subscription_status === 'active')
    .reduce((sum, c) => sum + PACKAGES[c.package as Package].price, 0)
  const activeCount = clients.filter((c) => c.subscription_status === 'active').length

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-5">
        <div className="w-full max-w-sm space-y-8">
          <div>
            <div className="flex items-center gap-2.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-[14px] font-semibold tracking-tight">Delko</span>
            </div>
            <h1 className="text-[28px] font-bold tracking-tight mb-1">Admin</h1>
            <p className="text-[14px] text-white/40">Internal use only.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-medium text-white/60">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="h-11 w-full rounded-[12px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] px-4 text-[14px] text-white outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
              />
            </div>
            {loginError && <p className="text-[13px] text-red-400">{loginError}</p>}
            <button
              type="submit"
              disabled={loginLoading || !password}
              className="w-full h-11 rounded-[10px] bg-accent text-[#0A0A0A] font-semibold text-[14px] disabled:opacity-40 hover:bg-[rgba(30,255,150,0.85)] transition-colors"
            >
              {loginLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-[14px] font-semibold tracking-tight">Delko</span>
            <span className="text-[12px] text-white/30 ml-1">/ Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70 transition-colors"
          >
            <LogOut size={13} />
            Sign out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="rounded-[12px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users size={14} className="text-white/40" />
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/40">Total Clients</p>
            </div>
            <p className="text-[32px] font-bold tracking-tight">{clients.length}</p>
          </div>
          <div className="rounded-[12px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Users size={14} className="text-accent" />
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/40">Active</p>
            </div>
            <p className="text-[32px] font-bold tracking-tight text-accent">{activeCount}</p>
          </div>
          <div className="rounded-[12px] bg-[rgba(30,255,150,0.05)] border border-[rgba(30,255,150,0.15)] p-5 col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={14} className="text-accent" />
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/40">MRR</p>
            </div>
            <p className="text-[32px] font-bold tracking-tight text-accent">{formatCurrency(mrr)}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-[10px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] w-fit">
          {(['clients', 'metrics'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`h-8 px-4 rounded-[8px] text-[13px] font-medium transition-all ${
                tab === t
                  ? 'bg-[rgba(255,255,255,0.08)] text-white'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {t === 'clients' ? 'Clients' : 'Add Metrics'}
            </button>
          ))}
        </div>

        {/* Clients tab */}
        {tab === 'clients' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-bold tracking-tight">Clients</h2>
              <button
                onClick={() => { setShowCreate((v) => !v); setCreatedSlug(''); setCreateError('') }}
                className="flex items-center gap-1.5 h-9 px-4 rounded-[8px] bg-accent text-[#0A0A0A] font-semibold text-[13px] hover:bg-[rgba(30,255,150,0.85)] transition-colors"
              >
                {showCreate ? <X size={14} /> : <Plus size={14} />}
                {showCreate ? 'Cancel' : 'New Client'}
              </button>
            </div>

            {/* Create client form */}
            {showCreate && (
              <div className="rounded-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] p-6 space-y-5">
                <h3 className="font-semibold text-[15px]">Create Proposal</h3>

                {createdSlug ? (
                  <div className="space-y-4">
                    <div className="rounded-[10px] bg-[rgba(30,255,150,0.06)] border border-[rgba(30,255,150,0.2)] p-4">
                      <p className="text-[13px] font-semibold text-accent mb-2">Proposal created!</p>
                      <p className="text-[12px] text-white/50 mb-3 break-all">
                        {typeof window !== 'undefined' ? window.location.origin : ''}/proposal/{createdSlug}
                      </p>
                      <button
                        onClick={() => copyProposalUrl(createdSlug)}
                        className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] bg-[rgba(255,255,255,0.06)] text-[12px] font-medium hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                      >
                        {copied === createdSlug ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
                        {copied === createdSlug ? 'Copied!' : 'Copy link'}
                      </button>
                    </div>
                    <button
                      onClick={() => { setCreatedSlug(''); setShowCreate(false) }}
                      className="text-[13px] text-white/40 hover:text-white/70 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCreateClient} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field
                        label="Contact name"
                        value={createForm.name}
                        onChange={(v) => setCreateForm((f) => ({ ...f, name: v }))}
                        placeholder="Jane Smith"
                      />
                      <Field
                        label="Business name"
                        value={createForm.businessName}
                        onChange={(v) => setCreateForm((f) => ({ ...f, businessName: v }))}
                        placeholder="Smith Plumbing"
                      />
                      <Field
                        label="Email"
                        type="email"
                        value={createForm.email}
                        onChange={(v) => setCreateForm((f) => ({ ...f, email: v }))}
                        placeholder="jane@smithplumbing.com"
                      />
                      <div className="space-y-1.5">
                        <label className="text-[13px] font-medium text-white/60">Package</label>
                        <select
                          value={createForm.pkg}
                          onChange={(e) => setCreateForm((f) => ({ ...f, pkg: e.target.value as Package }))}
                          className="h-11 w-full rounded-[12px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] px-4 text-[14px] text-white outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                        >
                          {(Object.entries(PACKAGES) as [Package, typeof PACKAGES[Package]][]).map(([k, p]) => (
                            <option key={k} value={k}>
                              {p.name} — {formatCurrency(p.price)}/mo
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[13px] font-medium text-white/60">
                        Custom scope <span className="text-white/25">(optional, one item per line)</span>
                      </label>
                      <textarea
                        value={createForm.customScope}
                        onChange={(e) => setCreateForm((f) => ({ ...f, customScope: e.target.value }))}
                        placeholder="Weekly calls with owner&#10;Custom landing page build"
                        rows={3}
                        className="w-full rounded-[12px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] px-4 py-3 text-[14px] text-white outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all resize-none"
                      />
                    </div>
                    {createError && <p className="text-[13px] text-red-400">{createError}</p>}
                    <button
                      type="submit"
                      disabled={createLoading || !createForm.name || !createForm.businessName || !createForm.email}
                      className="h-10 px-5 rounded-[8px] bg-accent text-[#0A0A0A] font-semibold text-[13px] disabled:opacity-40 hover:bg-[rgba(30,255,150,0.85)] transition-colors"
                    >
                      {createLoading ? 'Creating…' : 'Create Proposal'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Client list */}
            {dataLoading ? (
              <div className="text-center py-10 text-white/30 text-[14px]">Loading…</div>
            ) : clients.length === 0 ? (
              <div className="text-center py-10 text-white/30 text-[14px]">No clients yet.</div>
            ) : (
              <div className="space-y-2">
                {clients.map((c) => {
                  const s = STATUS[c.subscription_status as keyof typeof STATUS] ?? STATUS.pending
                  const p = PACKAGES[c.package as Package]
                  return (
                    <div
                      key={c.id}
                      className="rounded-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-[15px]">{c.business_name}</p>
                          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
                            {s.label}
                          </span>
                        </div>
                        <p className="text-[13px] text-white/40">
                          {c.name} · {c.email} · {p.name} ({formatCurrency(p.price)}/mo)
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => copyProposalUrl(c.slug)}
                          className="flex items-center gap-1.5 h-8 px-3 rounded-[8px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[12px] text-white/60 hover:text-white transition-colors"
                        >
                          {copied === c.slug ? <Check size={12} className="text-accent" /> : <Copy size={12} />}
                          {copied === c.slug ? 'Copied' : 'Proposal link'}
                        </button>
                        <a
                          href={`/dashboard/${c.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 h-8 px-3 rounded-[8px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[12px] text-white/60 hover:text-white transition-colors"
                        >
                          <ExternalLink size={12} />
                          Dashboard
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Metrics tab */}
        {tab === 'metrics' && (
          <div className="space-y-5">
            <h2 className="text-[18px] font-bold tracking-tight">Add Monthly Metrics</h2>
            <form
              onSubmit={handleUpdateMetrics}
              className="rounded-[12px] bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] p-6 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-white/60">Client</label>
                  <select
                    value={metricsForm.clientId}
                    onChange={(e) => {
                      setMetricsForm((f) => ({ ...f, clientId: e.target.value }))
                      setMetricsSaved(false)
                    }}
                    required
                    className="h-11 w-full rounded-[12px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] px-4 text-[14px] text-white outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                  >
                    <option value="">Select a client…</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.business_name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-medium text-white/60">Month</label>
                  <input
                    type="month"
                    value={metricsForm.monthYear}
                    onChange={(e) => { setMetricsForm((f) => ({ ...f, monthYear: e.target.value })); setMetricsSaved(false) }}
                    required
                    className="h-11 w-full rounded-[12px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] px-4 text-[14px] text-white outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <NumField label="Leads Generated" value={metricsForm.leadsGenerated} onChange={(v) => setMetricsForm((f) => ({ ...f, leadsGenerated: v }))} />
                <NumField label="Cost Per Lead ($)" value={metricsForm.costPerLead} onChange={(v) => setMetricsForm((f) => ({ ...f, costPerLead: v }))} decimal />
                <NumField label="Ranking Movement" value={metricsForm.rankingMovement} onChange={(v) => setMetricsForm((f) => ({ ...f, rankingMovement: v }))} />
                <NumField label="New Reviews" value={metricsForm.newReviews} onChange={(v) => setMetricsForm((f) => ({ ...f, newReviews: v }))} />
                <NumField label="Ad Spend ($)" value={metricsForm.adSpend} onChange={(v) => setMetricsForm((f) => ({ ...f, adSpend: v }))} decimal />
                <NumField label="Ad Budget ($)" value={metricsForm.adBudget} onChange={(v) => setMetricsForm((f) => ({ ...f, adBudget: v }))} decimal />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-white/60">
                  Next Steps <span className="text-white/25">(shown to client)</span>
                </label>
                <textarea
                  value={metricsForm.nextSteps}
                  onChange={(e) => { setMetricsForm((f) => ({ ...f, nextSteps: e.target.value })); setMetricsSaved(false) }}
                  placeholder="Launching Google Ads campaign next week&#10;Increasing review request cadence"
                  rows={3}
                  className="w-full rounded-[12px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] px-4 py-3 text-[14px] text-white outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all resize-none"
                />
              </div>

              {metricsError && <p className="text-[13px] text-red-400">{metricsError}</p>}
              {metricsSaved && (
                <p className="text-[13px] text-accent font-medium">
                  Metrics saved for {metricsForm.monthYear ? formatMonth(metricsForm.monthYear) : 'this month'}.
                </p>
              )}

              <button
                type="submit"
                disabled={metricsLoading || !metricsForm.clientId || !metricsForm.monthYear}
                className="h-10 px-5 rounded-[8px] bg-accent text-[#0A0A0A] font-semibold text-[13px] disabled:opacity-40 hover:bg-[rgba(30,255,150,0.85)] transition-colors"
              >
                {metricsLoading ? 'Saving…' : 'Save Metrics'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

function Field({
  label, value, onChange, placeholder, type = 'text',
}: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] font-medium text-white/60">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-[12px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] px-4 text-[14px] text-white outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
      />
    </div>
  )
}

function NumField({
  label, value, onChange, decimal,
}: {
  label: string; value: string; onChange: (v: string) => void; decimal?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-[13px] font-medium text-white/60">{label}</label>
      <input
        type="number"
        min="0"
        step={decimal ? '0.01' : '1'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="h-11 w-full rounded-[12px] bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] px-4 text-[14px] text-white outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
      />
    </div>
  )
}
