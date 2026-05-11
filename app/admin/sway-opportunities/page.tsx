'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PageHeader, Panel, EmptyState, inputCls, selectCls, textareaCls } from '@/components/admin/ui'
import { Dialog } from '@/components/admin/Dialog'
import { SWAY_STATUSES, SWAY_USE_CASES, BUSINESS_TYPES, NORTH_SHORE_TOWNS } from '@/lib/admin-constants'
import { Plus, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

export default function SwayOpportunities() {
  const supabase = createClient()
  const [rows, setRows] = useState<any[]>([])
  const [createOpen, setCreateOpen] = useState(false)

  const load = async () => {
    const { data } = await supabase.from('sway_opportunities').select('*').order('sway_fit_score', { ascending: false })
    setRows(data ?? [])
  }
  useEffect(() => { load() }, [])

  const update = async (id: string, patch: any) => {
    const { error } = await supabase.from('sway_opportunities').update(patch).eq('id', id)
    if (error) toast.error(error.message)
    else load()
  }

  return (
    <div>
      <PageHeader
        eyebrow="Future layer"
        title="Sway opportunities"
        description="Businesses that may become Sway clients later."
        actions={
          <button onClick={() => setCreateOpen(true)} className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-accent text-[#0A0A0A] text-xs font-semibold hover:brightness-105 transition-all">
            <Plus size={14} /> Add opportunity
          </button>
        }
      />

      {rows.length === 0 ? (
        <Panel><EmptyState title="No opportunities yet" description="Tag bars, gyms, cafés, and venues with strong repeat-visit potential." /></Panel>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rows.map(s => (
            <Panel key={s.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight truncate flex items-center gap-2">
                    {s.business_name}
                    {s.is_current_client && <span className="text-[9px] uppercase tracking-wider text-emerald-300">Client</span>}
                  </h3>
                  <div className="text-xs text-muted-foreground">{s.business_type ?? '—'} · {s.town ?? '—'}</div>
                </div>
                <span className="flex items-center gap-1 text-accent text-sm font-mono shrink-0">
                  <Sparkles size={12} />{s.sway_fit_score ?? '—'}
                </span>
              </div>

              <div className="mt-3">
                <select value={s.status} onChange={e => update(s.id, { status: e.target.value })} className={selectCls + ' h-8 text-xs'}>
                  {SWAY_STATUSES.map(x => <option key={x} value={x}>{x}</option>)}
                </select>
              </div>

              {s.use_case && <div className="mt-3 text-xs text-muted-foreground"><span className="text-foreground">Use case:</span> {s.use_case}</div>}
              {s.next_step && <div className="mt-1 text-xs text-muted-foreground"><span className="text-foreground">Next step:</span> {s.next_step}</div>}
              {s.notes && <p className="mt-3 text-xs text-muted-foreground whitespace-pre-wrap line-clamp-3">{s.notes}</p>}
            </Panel>
          ))}
        </div>
      )}

      <SwayCreate supabase={supabase} open={createOpen} onClose={() => setCreateOpen(false)} onSaved={load} />
    </div>
  )
}

function SwayCreate({ supabase, open, onClose, onSaved }: any) {
  const [form, setForm] = useState<any>({
    business_name: '', business_type: '', town: '', sway_fit_score: 3, use_case: '',
    repeat_visit_potential: '', event_potential: '', loyalty_potential: '',
    status: 'Possible fit', next_step: '', notes: '',
  })
  const upd = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('sway_opportunities').insert({ ...form, sway_fit_score: Number(form.sway_fit_score) })
    if (error) return toast.error(error.message)
    toast.success('Added')
    onClose()
    onSaved()
  }

  return (
    <Dialog open={open} onClose={onClose} title="New Sway opportunity" maxWidth="max-w-xl">
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3 mt-3">
        <FF label="Business name" req className="sm:col-span-2"><input value={form.business_name} onChange={e => upd('business_name', e.target.value)} required maxLength={200} className={inputCls} /></FF>
        <FF label="Type"><select value={form.business_type} onChange={e => upd('business_type', e.target.value)} className={selectCls}><option value="">—</option>{BUSINESS_TYPES.map(o => <option key={o} value={o}>{o}</option>)}</select></FF>
        <FF label="Town"><select value={form.town} onChange={e => upd('town', e.target.value)} className={selectCls}><option value="">—</option>{NORTH_SHORE_TOWNS.map(o => <option key={o} value={o}>{o}</option>)}</select></FF>
        <FF label="Use case"><select value={form.use_case} onChange={e => upd('use_case', e.target.value)} className={selectCls}><option value="">—</option>{SWAY_USE_CASES.map(o => <option key={o} value={o}>{o}</option>)}</select></FF>
        <FF label="Fit score (1–5)"><input type="number" min={1} max={5} value={form.sway_fit_score} onChange={e => upd('sway_fit_score', e.target.value)} className={inputCls} /></FF>
        <FF label="Repeat visit potential"><input value={form.repeat_visit_potential} onChange={e => upd('repeat_visit_potential', e.target.value)} className={inputCls} /></FF>
        <FF label="Event potential"><input value={form.event_potential} onChange={e => upd('event_potential', e.target.value)} className={inputCls} /></FF>
        <FF label="Loyalty potential"><input value={form.loyalty_potential} onChange={e => upd('loyalty_potential', e.target.value)} className={inputCls} /></FF>
        <FF label="Next step"><input value={form.next_step} onChange={e => upd('next_step', e.target.value)} className={inputCls} /></FF>
        <FF label="Notes" className="sm:col-span-2"><textarea value={form.notes} onChange={e => upd('notes', e.target.value)} rows={3} className={textareaCls} /></FF>
        <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn accent type="submit">Save</Btn>
        </div>
      </form>
    </Dialog>
  )
}

const FF = ({ label, req, className, children }: any) => (
  <div className={`space-y-1.5 ${className ?? ''}`}>
    <label className="text-xs text-muted-foreground">{label}{req && <span className="text-red-400 ml-1">*</span>}</label>
    {children}
  </div>
)
const Btn = ({ children, onClick, accent, type = 'button' }: any) => (
  <button type={type} onClick={onClick}
    className={`flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-medium transition-colors ${accent ? 'bg-accent text-[#0A0A0A] hover:brightness-105' : 'border border-border bg-surface hover:bg-surface-elevated text-foreground'}`}>
    {children}
  </button>
)
