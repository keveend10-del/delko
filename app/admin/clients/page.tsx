'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PageHeader, Panel, StatusBadge, EmptyState, inputCls, selectCls, textareaCls } from '@/components/admin/ui'
import { Sheet } from '@/components/admin/Sheet'
import { Dialog } from '@/components/admin/Dialog'
import { CLIENT_STATUSES, PAYMENT_STATUSES, PROJECT_STATUSES, PACKAGES, BUSINESS_TYPES, NORTH_SHORE_TOWNS } from '@/lib/admin-constants'
import { Search, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { format, parseISO } from 'date-fns'

export default function Clients() {
  const supabase = createClient()
  const [rows, setRows] = useState<any[]>([])
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<any | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  const load = async () => {
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    setRows(data ?? [])
  }
  useEffect(() => { load() }, [])

  const update = async (id: string, patch: any) => {
    const { error } = await supabase.from('clients').update(patch).eq('id', id)
    if (error) toast.error(error.message)
    else { load(); if (open?.id === id) setOpen((p: any) => ({ ...p, ...patch })) }
  }

  const filtered = rows.filter(r => !q || `${r.business_name} ${r.contact_name ?? ''}`.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <PageHeader
        eyebrow="Roster"
        title="Active clients"
        description="Everyone you're currently building for or supporting."
        actions={<Btn accent onClick={() => setCreateOpen(true)}><Plus size={14} /> New client</Btn>}
      />

      <Panel className="p-4 mb-4">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search clients" className={inputCls + ' pl-9 h-10'} />
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState title="No clients yet" description="Convert a lead from the CRM to populate this list." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr><Th>Business</Th><Th>Contact</Th><Th>Package</Th><Th>Project value</Th><Th>Retainer</Th><Th>Status</Th><Th>Payment</Th><Th>Started</Th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(r => (
                  <tr key={r.id} onClick={() => setOpen(r)} className="hover:bg-surface-elevated/40 cursor-pointer transition-colors">
                    <Td className="font-medium">{r.business_name}</Td>
                    <Td>{r.contact_name ?? '—'}</Td>
                    <Td className="text-muted-foreground">{r.package_purchased ?? '—'}</Td>
                    <Td>{r.project_value ? `$${Number(r.project_value).toLocaleString()}` : '—'}</Td>
                    <Td>{r.monthly_retainer_value ? `$${Number(r.monthly_retainer_value).toLocaleString()}/mo` : '—'}</Td>
                    <Td><StatusBadge value={r.client_status} /></Td>
                    <Td><StatusBadge value={r.payment_status} /></Td>
                    <Td className="text-xs text-muted-foreground">{r.start_date ? format(parseISO(r.start_date), 'MMM d, yyyy') : '—'}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>

      <Sheet open={!!open} onClose={() => setOpen(null)} title={open?.business_name}>
        {open && (
          <div className="mt-6 space-y-4">
            <Detail label="Contact">{open.contact_name ?? '—'} · {open.email ?? '—'}{open.phone && ` · ${open.phone}`}</Detail>
            <Detail label="Town / type">{open.town ?? '—'} · {open.business_type ?? '—'}</Detail>
            <Detail label="Website">{open.website ?? '—'}</Detail>
            <Detail label="Instagram">{open.instagram ?? '—'}</Detail>

            <SF label="Package" value={open.package_purchased} options={PACKAGES} onChange={v => update(open.id, { package_purchased: v })} />
            <div className="grid grid-cols-2 gap-3">
              <SF label="Client status" value={open.client_status} options={CLIENT_STATUSES} onChange={v => update(open.id, { client_status: v })} />
              <SF label="Payment status" value={open.payment_status} options={PAYMENT_STATUSES} onChange={v => update(open.id, { payment_status: v })} />
            </div>
            <SF label="Project status" value={open.project_status} options={PROJECT_STATUSES} onChange={v => update(open.id, { project_status: v })} />

            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Notes</label>
              <textarea value={open.notes ?? ''} onChange={e => setOpen((p: any) => ({ ...p, notes: e.target.value }))} onBlur={() => update(open.id, { notes: open.notes })} rows={4} className={textareaCls} />
            </div>
          </div>
        )}
      </Sheet>

      <ClientCreate supabase={supabase} open={createOpen} onClose={() => setCreateOpen(false)} onSaved={load} />
    </div>
  )
}

function ClientCreate({ supabase, open, onClose, onSaved }: any) {
  const [form, setForm] = useState<any>({
    business_name: '', contact_name: '', email: '', phone: '', town: '', business_type: '',
    website: '', instagram: '', package_purchased: '', project_value: '', monthly_retainer_value: '',
    start_date: new Date().toISOString().slice(0, 10), client_status: 'Active', payment_status: 'Not invoiced',
  })
  const upd = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('clients').insert({
      ...form,
      project_value: form.project_value ? Number(form.project_value) : null,
      monthly_retainer_value: form.monthly_retainer_value ? Number(form.monthly_retainer_value) : null,
    })
    if (error) return toast.error(error.message)
    toast.success('Client added')
    onClose()
    onSaved()
  }

  return (
    <Dialog open={open} onClose={onClose} title="New client" maxWidth="max-w-xl">
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3 mt-3">
        <FF label="Business name" req><input value={form.business_name} onChange={e => upd('business_name', e.target.value)} required maxLength={200} className={inputCls} /></FF>
        <FF label="Contact name"><input value={form.contact_name} onChange={e => upd('contact_name', e.target.value)} maxLength={120} className={inputCls} /></FF>
        <FF label="Email"><input type="email" value={form.email} onChange={e => upd('email', e.target.value)} className={inputCls} /></FF>
        <FF label="Phone"><input value={form.phone} onChange={e => upd('phone', e.target.value)} className={inputCls} /></FF>
        <FF label="Town"><select value={form.town} onChange={e => upd('town', e.target.value)} className={selectCls}><option value="">—</option>{NORTH_SHORE_TOWNS.map(o => <option key={o} value={o}>{o}</option>)}</select></FF>
        <FF label="Type"><select value={form.business_type} onChange={e => upd('business_type', e.target.value)} className={selectCls}><option value="">—</option>{BUSINESS_TYPES.map(o => <option key={o} value={o}>{o}</option>)}</select></FF>
        <FF label="Package"><select value={form.package_purchased} onChange={e => upd('package_purchased', e.target.value)} className={selectCls}><option value="">—</option>{PACKAGES.map(o => <option key={o} value={o}>{o}</option>)}</select></FF>
        <FF label="Start date"><input type="date" value={form.start_date} onChange={e => upd('start_date', e.target.value)} className={inputCls} /></FF>
        <FF label="Project value ($)"><input type="number" value={form.project_value} onChange={e => upd('project_value', e.target.value)} className={inputCls} /></FF>
        <FF label="Monthly retainer ($)"><input type="number" value={form.monthly_retainer_value} onChange={e => upd('monthly_retainer_value', e.target.value)} className={inputCls} /></FF>
        <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn accent type="submit">Save</Btn>
        </div>
      </form>
    </Dialog>
  )
}

const Th = ({ children }: { children: React.ReactNode }) => <th className="px-4 py-3 text-left font-medium">{children}</th>
const Td = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => <td className={`px-4 py-3 ${className}`}>{children}</td>
const Detail = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{label}</div><div className="text-sm">{children}</div></div>
)
const SF = ({ label, value, options, onChange }: { label: string; value?: string; options: string[]; onChange: (v: string) => void }) => (
  <div className="space-y-1.5">
    <label className="text-xs text-muted-foreground">{label}</label>
    <select value={value ?? ''} onChange={e => onChange(e.target.value)} className={selectCls + ' h-9'}>
      <option value="">—</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
)
const FF = ({ label, req, children }: { label: string; req?: boolean; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-xs text-muted-foreground">{label}{req && <span className="text-red-400 ml-1">*</span>}</label>
    {children}
  </div>
)
const Btn = ({ children, onClick, accent, type = 'button', disabled }: any) => (
  <button type={type} onClick={onClick} disabled={disabled}
    className={`flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-medium transition-colors disabled:opacity-50 ${accent ? 'bg-accent text-[#0A0A0A] hover:brightness-105' : 'border border-border bg-surface hover:bg-surface-elevated text-foreground'}`}>
    {children}
  </button>
)
