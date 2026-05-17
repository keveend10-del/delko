'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAdminAuth } from '@/contexts/AdminAuth'
import { PageHeader, Panel, StatusBadge, EmptyState, inputCls, selectCls, textareaCls } from '@/components/admin/ui'
import { Sheet } from '@/components/admin/Sheet'
import { Dialog } from '@/components/admin/Dialog'
import { CLIENT_STATUSES, PAYMENT_STATUSES, PROJECT_STATUSES, PACKAGE_OPTIONS, BUSINESS_TYPES, NORTH_SHORE_TOWNS } from '@/lib/admin-constants'
import { PACKAGES as PKG_CONFIGS, type Package } from '@/lib/types'
import { Search, Plus, Send, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { format, parseISO } from 'date-fns'

export default function Clients() {
  const supabase = createClient()
  const [rows, setRows] = useState<any[]>([])
  const [q, setQ] = useState('')
  const [open, setOpen] = useState<any | null>(null)
  const [createOpen, setCreateOpen] = useState(false)
  const [invoiceOpen, setInvoiceOpen] = useState<any | null>(null)

  const load = async () => {
    const { data } = await supabase.from('clients').select('*').order('created_at', { ascending: false })
    setRows(data ?? [])
  }
  useEffect(() => { load() }, [])

  const remove = async (id: string) => {
    const { error } = await supabase.from('clients').delete().eq('id', id)
    if (error) toast.error(error.message)
    else { toast.success('Client deleted'); setOpen(null); load() }
  }

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
                    <Td className="text-muted-foreground">{PKG_CONFIGS[r.package as Package]?.name ?? r.package_purchased ?? '—'}</Td>
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
            <div className="grid grid-cols-2 gap-3">
              <EF label="Business name" value={open.business_name} onSave={v => update(open.id, { business_name: v })} onChange={v => setOpen((p: any) => ({ ...p, business_name: v }))} />
              <EF label="Contact name" value={open.contact_name ?? ''} onSave={v => update(open.id, { contact_name: v })} onChange={v => setOpen((p: any) => ({ ...p, contact_name: v }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <EF label="Email" value={open.email ?? ''} type="email" onSave={v => update(open.id, { email: v })} onChange={v => setOpen((p: any) => ({ ...p, email: v }))} />
              <EF label="Phone" value={open.phone ?? ''} onSave={v => update(open.id, { phone: v })} onChange={v => setOpen((p: any) => ({ ...p, phone: v }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SF label="Town" value={open.town} options={NORTH_SHORE_TOWNS} onChange={v => update(open.id, { town: v })} />
              <SF label="Business type" value={open.business_type} options={BUSINESS_TYPES} onChange={v => update(open.id, { business_type: v })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <EF label="Website" value={open.website ?? ''} onSave={v => update(open.id, { website: v })} onChange={v => setOpen((p: any) => ({ ...p, website: v }))} />
              <EF label="Instagram" value={open.instagram ?? ''} onSave={v => update(open.id, { instagram: v })} onChange={v => setOpen((p: any) => ({ ...p, instagram: v }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <EF label="Project value ($)" value={open.project_value ?? ''} type="number" onSave={v => update(open.id, { project_value: v ? Number(v) : null })} onChange={v => setOpen((p: any) => ({ ...p, project_value: v }))} />
              <EF label="Monthly retainer ($)" value={open.monthly_retainer_value ?? ''} type="number" onSave={v => update(open.id, { monthly_retainer_value: v ? Number(v) : null })} onChange={v => setOpen((p: any) => ({ ...p, monthly_retainer_value: v }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <EF label="Start date" value={open.start_date ?? ''} type="date" onSave={v => update(open.id, { start_date: v || null })} onChange={v => setOpen((p: any) => ({ ...p, start_date: v }))} />
              <div className="space-y-1.5">
                <label className="text-xs text-muted-foreground">Package</label>
                <select value={open.package ?? ''} onChange={e => { const k = e.target.value; setOpen((p: any) => ({ ...p, package: k })); update(open.id, { package: k || null }) }} className={selectCls + ' h-9'}>
                  <option value="">—</option>
                  {PACKAGE_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <SF label="Client status" value={open.client_status} options={CLIENT_STATUSES} onChange={v => update(open.id, { client_status: v })} />
              <SF label="Payment status" value={open.payment_status} options={PAYMENT_STATUSES} onChange={v => update(open.id, { payment_status: v })} />
            </div>
            <SF label="Project status" value={open.project_status} options={PROJECT_STATUSES} onChange={v => update(open.id, { project_status: v })} />
            <div className="space-y-1.5">
              <label className="text-xs text-muted-foreground">Notes</label>
              <textarea value={open.notes ?? ''} onChange={e => setOpen((p: any) => ({ ...p, notes: e.target.value }))} onBlur={() => update(open.id, { notes: open.notes })} rows={4} className={textareaCls} />
            </div>
            <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
              <Btn danger onClick={() => remove(open.id)}>
                <Trash2 size={13} /> Delete client
              </Btn>
              <Btn accent onClick={() => setInvoiceOpen(open)}>
                <Send size={13} /> Send invoice
              </Btn>
            </div>
          </div>
        )}
      </Sheet>

      <ClientCreate supabase={supabase} open={createOpen} onClose={() => setCreateOpen(false)} onSaved={load} />
      <InvoiceModal client={invoiceOpen} onClose={() => setInvoiceOpen(null)} onSent={load} />
    </div>
  )
}

function ClientCreate({ supabase, open, onClose, onSaved }: any) {
  const [form, setForm] = useState<any>({
    business_name: '', contact_name: '', email: '', phone: '', town: '', business_type: '',
    website: '', instagram: '', package: '', project_value: '', monthly_retainer_value: '',
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
        <FF label="Package"><select value={form.package} onChange={e => upd('package', e.target.value)} className={selectCls}><option value="">—</option>{PACKAGE_OPTIONS.map(o => <option key={o.key} value={o.key}>{o.label}</option>)}</select></FF>
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

function InvoiceModal({ client, onClose, onSent }: { client: any | null; onClose: () => void; onSent: () => void }) {
  const { session } = useAdminAuth()
  const pkgName = (c: any) => PKG_CONFIGS[c?.package as Package]?.name ?? c?.package_purchased ?? 'Monthly Retainer'
  const defaultDesc = client ? `${client.business_name} — ${pkgName(client)}` : ''
  const [form, setForm] = useState({ amount: '', description: defaultDesc, mode: 'subscription' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (client) {
      setForm({
        amount: client.monthly_retainer_value ? String(client.monthly_retainer_value) : '',
        description: `${client.business_name} — ${pkgName(client)}`,
        mode: 'subscription',
      })
      setError('')
    }
  }, [client])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!client) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/send-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify({ clientId: client.id, amount: Number(form.amount), description: form.description, mode: form.mode }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to send invoice')
      toast.success(`Invoice sent to ${client.email}`)
      if (data.url) {
        await navigator.clipboard.writeText(data.url).catch(() => {})
        toast.info('Payment link copied to clipboard — share manually if email fails')
      }
      onSent()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={!!client} onClose={onClose} title={`Send invoice — ${client?.business_name ?? ''}`} maxWidth="max-w-md">
      <form onSubmit={submit} className="space-y-3 mt-3">
        <FF label="Description">
          <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required maxLength={200} className={inputCls} />
        </FF>
        <div className="grid grid-cols-2 gap-3">
          <FF label="Amount ($)" req>
            <input type="number" min="1" step="1" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} required className={inputCls} />
          </FF>
          <FF label="Billing type">
            <select value={form.mode} onChange={e => setForm(f => ({ ...f, mode: e.target.value }))} className={selectCls + ' h-[42px]'}>
              <option value="subscription">Monthly recurring</option>
              <option value="payment">One-time</option>
            </select>
          </FF>
        </div>
        {error && <p className="text-xs text-red-400">{error}</p>}
        <div className="flex justify-end gap-2 pt-1">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn accent type="submit" disabled={loading}>
            {loading ? 'Sending…' : <><Send size={13} /> Send invoice</>}
          </Btn>
        </div>
      </form>
    </Dialog>
  )
}

const Th = ({ children }: { children: React.ReactNode }) => <th className="px-4 py-3 text-left font-medium">{children}</th>
const Td = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => <td className={`px-4 py-3 ${className}`}>{children}</td>
const EF = ({ label, value, type = 'text', onSave, onChange }: { label: string; value: any; type?: string; onSave: (v: string) => void; onChange: (v: string) => void }) => (
  <div className="space-y-1.5">
    <label className="text-xs text-muted-foreground">{label}</label>
    <input
      type={type}
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      onBlur={e => onSave(e.target.value)}
      className={inputCls}
    />
  </div>
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
const Btn = ({ children, onClick, accent, danger, type = 'button', disabled }: any) => (
  <button type={type} onClick={onClick} disabled={disabled}
    className={`flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-medium transition-colors disabled:opacity-50 ${
      accent ? 'bg-accent text-[#0A0A0A] hover:brightness-105' :
      danger ? 'border border-rose-500/25 bg-rose-500/[0.06] text-rose-400 hover:bg-rose-500/15' :
      'border border-border bg-surface hover:bg-surface-elevated text-foreground'
    }`}>
    {children}
  </button>
)
