'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PageHeader, Panel, StatusBadge, EmptyState, inputCls, selectCls, textareaCls } from '@/components/admin/ui'
import { Sheet } from '@/components/admin/Sheet'
import { AUDIT_STATUSES, PRIORITIES } from '@/lib/admin-constants'
import { Search, UserPlus, Archive, Send, Trash2 } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { toast } from 'sonner'

export default function AuditRequests() {
  const supabase = createClient()
  const [rows, setRows] = useState<any[]>([])
  const [q, setQ] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [open, setOpen] = useState<any | null>(null)

  const load = async () => {
    const { data } = await supabase.from('audit_requests').select('*').order('created_at', { ascending: false })
    setRows(data ?? [])
  }
  useEffect(() => { load() }, [])

  const update = async (id: string, patch: any) => {
    const { error } = await supabase.from('audit_requests').update(patch).eq('id', id)
    if (error) toast.error(error.message)
    else { toast.success('Updated'); load(); if (open?.id === id) setOpen((p: any) => ({ ...p, ...patch })) }
  }

  const remove = async (id: string) => {
    const { error } = await supabase.from('audit_requests').delete().eq('id', id)
    if (error) toast.error(error.message)
    else { toast.success('Deleted'); setOpen(null); load() }
  }

  const convert = async (req: any) => {
    const { error } = await supabase.from('leads').insert({
      business_name: req.business_name, contact_name: req.name, email: req.email,
      phone: req.phone, website: req.website_or_social, business_type: req.business_type,
      lead_source: 'Free audit form', stage: 'New Lead', priority: req.priority ?? 'Medium', notes: req.message,
    })
    if (error) return toast.error(error.message)
    await update(req.id, { status: 'Converted to lead' })
    toast.success('Converted to lead')
  }

  const filtered = rows.filter(r => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false
    if (q && !`${r.business_name} ${r.name} ${r.email}`.toLowerCase().includes(q.toLowerCase())) return false
    return true
  })

  return (
    <div>
      <PageHeader eyebrow="Inbox" title="Audit requests" description="Submissions from the public free-audit form." />

      <Panel className="p-4 mb-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search business, name, email" className={inputCls + ' pl-9 h-10'} />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className={selectCls + ' sm:w-48 h-10'}>
          <option value="all">All statuses</option>
          {AUDIT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </Panel>

      <Panel className="overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState title="No requests" description="They'll show up here as the public form gets submissions." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr><Th>Business</Th><Th>Name</Th><Th>Email</Th><Th>Type</Th><Th>Status</Th><Th>Date</Th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(r => (
                  <tr key={r.id} onClick={() => setOpen(r)} className="hover:bg-surface-elevated/40 cursor-pointer transition-colors">
                    <Td className="font-medium">{r.business_name}</Td>
                    <Td>{r.name}</Td>
                    <Td className="text-muted-foreground">{r.email}</Td>
                    <Td className="text-muted-foreground">{r.business_type}</Td>
                    <Td><StatusBadge value={r.status} /></Td>
                    <Td className="text-muted-foreground text-xs">{format(parseISO(r.created_at), 'MMM d, h:mm a')}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <Sheet open={!!open} onClose={() => setOpen(null)} title={open?.business_name}>
        {open && (
          <div className="space-y-5">
            <Detail label="Contact">
              <div className="mt-0.5">
                <div className="font-semibold text-foreground">{open.name}</div>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5 text-muted-foreground">
                  <span>{open.email}</span>
                  {open.phone && <span>{open.phone}</span>}
                </div>
              </div>
            </Detail>

            <Detail label="Website / social">{open.website_or_social ?? '—'}</Detail>
            <Detail label="Business type">{open.business_type ?? '—'}</Detail>

            <Detail label="What do you need help with">
              {open.services_needed?.length ? (
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {open.services_needed.map((s: string) => (
                    <span key={s} className="inline-flex items-center rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-[11px] font-semibold text-accent tracking-wide">{s}</span>
                  ))}
                </div>
              ) : <span className="text-muted-foreground">—</span>}
            </Detail>

            <Detail label="Message">
              <div className="mt-1.5 rounded-xl bg-surface border border-border px-4 py-3 text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{open.message ?? '—'}</div>
            </Detail>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Status</label>
                <select value={open.status} onChange={e => update(open.id, { status: e.target.value })} className={selectCls + ' h-9'}>
                  {AUDIT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Priority</label>
                <select value={open.priority} onChange={e => update(open.id, { priority: e.target.value })} className={selectCls + ' h-9'}>
                  {PRIORITIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Internal notes</label>
              <textarea value={open.notes ?? ''} onChange={e => setOpen((p: any) => ({ ...p, notes: e.target.value }))} onBlur={() => update(open.id, { notes: open.notes })} rows={4} className={textareaCls} />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border">
              <button onClick={() => convert(open)} className="flex items-center gap-2 h-9 px-4 rounded-xl bg-accent text-[#0A0A0A] text-xs font-semibold hover:brightness-105 transition-all">
                <UserPlus size={13} /> Convert to lead
              </button>
              <button onClick={() => update(open.id, { status: 'Audit sent' })} className="flex items-center gap-2 h-9 px-4 rounded-xl border border-border bg-surface hover:bg-surface-elevated text-foreground text-xs font-medium transition-colors">
                <Send size={13} /> Mark audit sent
              </button>
              <button onClick={() => update(open.id, { status: 'Archived' })} className="flex items-center gap-2 h-9 px-4 rounded-xl border border-border bg-surface hover:bg-surface-elevated text-foreground text-xs font-medium transition-colors ml-auto">
                <Archive size={13} /> Archive
              </button>
              <button onClick={() => remove(open.id)} className="flex items-center gap-2 h-9 px-4 rounded-xl text-rose-400 hover:bg-rose-500/10 border border-rose-500/25 text-xs font-medium transition-colors">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  )
}

const Th = ({ children }: { children: React.ReactNode }) => <th className="px-4 py-3 text-left font-medium">{children}</th>
const Td = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => <td className={`px-4 py-3 ${className}`}>{children}</td>
const Detail = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5">{label}</div><div className="text-sm">{children}</div></div>
)
