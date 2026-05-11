'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Panel, PageHeader, KpiCard, StatusBadge } from '@/components/admin/ui'
import { ClipboardList, Users, Phone, Briefcase, DollarSign, Activity, Calendar, Sparkles } from 'lucide-react'
import { format, isToday, parseISO } from 'date-fns'

export default function Dashboard() {
  const supabase = createClient()
  const [audits, setAudits] = useState<any[]>([])
  const [leads, setLeads] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [sway, setSway] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      const [a, l, c, p, s] = await Promise.all([
        supabase.from('audit_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('clients').select('*'),
        supabase.from('projects').select('*'),
        supabase.from('sway_opportunities').select('*').order('sway_fit_score', { ascending: false }),
      ])
      setAudits(a.data ?? [])
      setLeads(l.data ?? [])
      setClients(c.data ?? [])
      setProjects(p.data ?? [])
      setSway(s.data ?? [])
    })()
  }, [])

  const newAudits = audits.filter(a => a.status === 'New').length
  const activeLeads = leads.filter(l => !['Won', 'Lost'].includes(l.stage)).length
  const callsBooked = leads.filter(l => l.stage === 'Call Booked').length
  const closed = leads.filter(l => l.stage === 'Won').length + clients.length
  const mrr = clients.reduce((s, c) => s + Number(c.monthly_retainer_value ?? 0), 0)
  const projectRev = projects.reduce((s, p) => s + Number(p.project_value ?? 0), 0)
  const followUpsDue = leads.filter(l => l.next_follow_up && new Date(l.next_follow_up) <= new Date())
  const swayFit = sway.filter(s => (s.sway_fit_score ?? 0) >= 4).length
  const urgentFollowUps = followUpsDue.slice().sort((a, b) => new Date(a.next_follow_up).getTime() - new Date(b.next_follow_up).getTime()).slice(0, 8)
  const stageCounts: Record<string, number> = {}
  leads.forEach(l => { stageCounts[l.stage] = (stageCounts[l.stage] ?? 0) + 1 })
  const stageMax = Math.max(1, ...Object.values(stageCounts))
  const activeProjects = projects.filter(p => !['Completed', 'Launched'].includes(p.status))

  return (
    <div>
      <PageHeader eyebrow="Operating system" title="Today's command center" description="What needs your attention right now." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KpiCard label="New audit requests" value={newAudits} icon={ClipboardList} urgent />
        <KpiCard label="Active leads" value={activeLeads} icon={Users} />
        <KpiCard label="Calls booked" value={callsBooked} icon={Phone} />
        <KpiCard label="Clients closed" value={closed} icon={Briefcase} />
        <KpiCard label="Monthly recurring" value={`$${mrr.toLocaleString()}`} icon={DollarSign} />
        <KpiCard label="Project revenue" value={`$${projectRev.toLocaleString()}`} icon={Activity} />
        <KpiCard label="Follow-ups due" value={followUpsDue.length} icon={Calendar} urgent />
        <KpiCard label="Sway-fit businesses" value={swayFit} icon={Sparkles} />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Panel className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <SectionTitle>Follow-ups due</SectionTitle>
            {urgentFollowUps.length > 0 && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-400">{urgentFollowUps.length} overdue</span>
            )}
          </div>
          {urgentFollowUps.length === 0 ? (
            <p className="text-sm text-muted-foreground mt-3">All clear — no overdue follow-ups.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {urgentFollowUps.map(l => {
                const todayFlag = isToday(parseISO(l.next_follow_up))
                return (
                  <li key={l.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-sm truncate">{l.business_name}</div>
                      <div className="text-xs text-muted-foreground">{l.contact_name}{l.town ? ` · ${l.town}` : ''}</div>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      {!todayFlag && <span className="text-[10px] font-semibold text-rose-400 uppercase tracking-wide">Overdue</span>}
                      <StatusBadge value={l.stage} />
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </Panel>

        <Panel className="p-6">
          <SectionTitle>Pipeline snapshot</SectionTitle>
          {Object.keys(stageCounts).length === 0 ? (
            <p className="text-sm text-muted-foreground mt-3">No leads yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {Object.entries(stageCounts).sort(([, a], [, b]) => b - a).map(([stage, count]) => (
                <li key={stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{stage}</span>
                    <span className="text-xs font-semibold font-mono tabular-nums">{count}</span>
                  </div>
                  <div className="h-1 rounded-full bg-surface-elevated overflow-hidden">
                    <div className="h-full bg-accent/40 rounded-full transition-all" style={{ width: `${(count / stageMax) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <SectionTitle>New audit requests</SectionTitle>
            <Link href="/admin/audit-requests" className="text-xs text-accent hover:underline">View all →</Link>
          </div>
          {audits.length === 0 ? (
            <p className="text-sm text-muted-foreground mt-3">No requests yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {audits.slice(0, 5).map(a => (
                <li key={a.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium text-sm truncate">{a.business_name}</div>
                    <div className="text-xs text-muted-foreground truncate">{a.name} · {a.email}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-muted-foreground hidden sm:block">{format(parseISO(a.created_at), 'MMM d')}</span>
                    <StatusBadge value={a.status} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel className="p-6">
          <SectionTitle>Revenue this month</SectionTitle>
          <div className="mt-4 space-y-3">
            <Row label="Monthly retainers" value={`$${mrr.toLocaleString()}`} />
            <Row label="Project revenue" value={`$${projectRev.toLocaleString()}`} />
            <div className="h-px bg-border mt-3 mb-4" />
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1.5">Projected total</div>
              <div className="text-3xl font-bold tabular-nums text-accent">${(projectRev + mrr).toLocaleString()}</div>
            </div>
          </div>
        </Panel>

        <Panel className="p-6 lg:col-span-2">
          <SectionTitle>Active projects</SectionTitle>
          {activeProjects.length === 0 ? (
            <p className="text-sm text-muted-foreground mt-3">No active projects.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {activeProjects.slice(0, 6).map(p => (
                <li key={p.id}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{p.project_name}</span>
                    <StatusBadge value={p.status} />
                  </div>
                  <div className="mt-1.5 h-1.5 rounded-full bg-surface-elevated overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${p.progress ?? 0}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel className="p-6">
          <div className="flex items-center justify-between">
            <SectionTitle>Sway watchlist</SectionTitle>
            <Link href="/admin/sway-opportunities" className="text-xs text-accent hover:underline">View →</Link>
          </div>
          {sway.length === 0 ? (
            <p className="text-sm text-muted-foreground mt-3">No Sway leads yet.</p>
          ) : (
            <ul className="mt-4 divide-y divide-border">
              {sway.slice(0, 6).map(s => (
                <li key={s.id} className="py-2.5 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{s.business_name}</div>
                    <div className="text-xs text-muted-foreground">{s.business_type} · {s.town}</div>
                  </div>
                  <span className="text-xs font-mono text-accent">★ {s.sway_fit_score ?? '—'}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  )
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/55">
    <span className="h-2.5 w-[2px] rounded-full bg-accent/50 shrink-0" />
    {children}
  </h2>
)
const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-medium tabular-nums">{value}</span>
  </div>
)
