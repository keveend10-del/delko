'use client'

import { useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PageHeader, Panel, StatusBadge, EmptyState, inputCls, selectCls } from '@/components/admin/ui'
import { LeadDrawer } from '@/components/admin/LeadDrawer'
import { LeadFormModal } from '@/components/admin/LeadFormModal'
import { PIPELINE_STAGES, PRIORITIES, LEAD_SOURCES, NORTH_SHORE_TOWNS, BUSINESS_TYPES } from '@/lib/admin-constants'
import { Search, Plus, Sparkles } from 'lucide-react'
import { format, parseISO } from 'date-fns'

export default function Leads() {
  const supabase = createClient()
  const [rows, setRows] = useState<any[]>([])
  const [q, setQ] = useState('')
  const [filters, setFilters] = useState<any>({ town: 'all', type: 'all', stage: 'all', priority: 'all', source: 'all', swayOnly: false, dueOnly: false })
  const [open, setOpen] = useState<any | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  const load = async () => {
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
    setRows(data ?? [])
  }
  useEffect(() => { load() }, [])

  const filtered = useMemo(() => rows.filter(r => {
    if (filters.town !== 'all' && r.town !== filters.town) return false
    if (filters.type !== 'all' && r.business_type !== filters.type) return false
    if (filters.stage !== 'all' && r.stage !== filters.stage) return false
    if (filters.priority !== 'all' && r.priority !== filters.priority) return false
    if (filters.source !== 'all' && r.lead_source !== filters.source) return false
    if (filters.swayOnly && !r.sway_fit) return false
    if (filters.dueOnly && (!r.next_follow_up || new Date(r.next_follow_up) > new Date())) return false
    if (q && !`${r.business_name} ${r.contact_name ?? ''} ${r.email ?? ''}`.toLowerCase().includes(q.toLowerCase())) return false
    return true
  }), [rows, filters, q])

  const setF = (k: string, v: any) => setFilters((f: any) => ({ ...f, [k]: v }))

  return (
    <div>
      <PageHeader
        eyebrow="Records"
        title="All leads"
        description="Searchable directory of every prospect in the system."
        actions={<Btn accent onClick={() => setCreateOpen(true)}><Plus size={14} /> New lead</Btn>}
      />

      <Panel className="p-4 mb-4 grid md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative lg:col-span-2">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search business, contact, email" className={inputCls + ' pl-9 h-10'} />
        </div>
        <FSel value={filters.stage} onChange={v => setF('stage', v)} all="All stages" options={PIPELINE_STAGES} />
        <FSel value={filters.town} onChange={v => setF('town', v)} all="All towns" options={NORTH_SHORE_TOWNS} />
        <FSel value={filters.type} onChange={v => setF('type', v)} all="All types" options={BUSINESS_TYPES} />
        <FSel value={filters.priority} onChange={v => setF('priority', v)} all="All priorities" options={PRIORITIES} />
        <FSel value={filters.source} onChange={v => setF('source', v)} all="All sources" options={LEAD_SOURCES} />
        <div className="flex items-center gap-2">
          <Toggle active={filters.swayOnly} onClick={() => setF('swayOnly', !filters.swayOnly)}>Sway fit</Toggle>
          <Toggle active={filters.dueOnly} onClick={() => setF('dueOnly', !filters.dueOnly)}>Follow-up due</Toggle>
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState title="No leads found" description="Adjust filters or add your first lead." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr><Th>Business</Th><Th>Contact</Th><Th>Town</Th><Th>Type</Th><Th>Stage</Th><Th>Priority</Th><Th>Value</Th><Th>Next FU</Th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(r => (
                  <tr key={r.id} onClick={() => setOpen(r)} className="hover:bg-surface-elevated/40 cursor-pointer transition-colors">
                    <Td>
                      <div className="flex items-center gap-2 font-semibold">{r.business_name} {r.sway_fit && <Sparkles size={11} className="text-accent shrink-0" />}</div>
                    </Td>
                    <Td className="text-muted-foreground">{r.contact_name ?? '—'}</Td>
                    <Td className="text-muted-foreground">{r.town ?? '—'}</Td>
                    <Td className="text-muted-foreground">{r.business_type ?? '—'}</Td>
                    <Td><StatusBadge value={r.stage} /></Td>
                    <Td><StatusBadge value={r.priority} /></Td>
                    <Td className="text-xs">
                      {r.estimated_value
                        ? <span className="font-semibold tabular-nums">${Number(r.estimated_value).toLocaleString()}</span>
                        : <span className="text-muted-foreground/40">—</span>}
                    </Td>
                    <Td className="text-xs">
                      {r.next_follow_up ? (
                        <span className={new Date(r.next_follow_up) < new Date() ? 'font-semibold text-rose-400' : 'text-muted-foreground'}>
                          {format(parseISO(r.next_follow_up), 'MMM d')}
                        </span>
                      ) : <span className="text-muted-foreground/40">—</span>}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <LeadDrawer lead={open} onClose={() => setOpen(null)} onChange={load} />
      <LeadFormModal open={createOpen} onOpenChange={setCreateOpen} onSaved={load} />
    </div>
  )
}

const Th = ({ children }: { children: React.ReactNode }) => <th className="px-4 py-3 text-left font-medium">{children}</th>
const Td = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => <td className={`px-4 py-3 ${className}`}>{children}</td>
const FSel = ({ value, onChange, all, options }: { value: string; onChange: (v: string) => void; all: string; options: string[] }) => (
  <select value={value} onChange={e => onChange(e.target.value)} className={selectCls + ' h-10'}>
    <option value="all">{all}</option>
    {options.map(o => <option key={o} value={o}>{o}</option>)}
  </select>
)
const Toggle = ({ active, onClick, children }: any) => (
  <button type="button" onClick={onClick} className={`h-10 px-3 rounded-xl text-xs border transition-colors ${active ? 'border-accent/60 bg-accent/10 text-foreground' : 'border-border bg-surface text-muted-foreground hover:text-foreground'}`}>
    {children}
  </button>
)
const Btn = ({ children, onClick, accent }: any) => (
  <button onClick={onClick} className={`flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-medium transition-colors ${accent ? 'bg-accent text-[#0A0A0A] hover:brightness-105' : 'border border-border bg-surface hover:bg-surface-elevated text-foreground'}`}>
    {children}
  </button>
)
