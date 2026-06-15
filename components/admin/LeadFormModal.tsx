'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Dialog } from '@/components/admin/Dialog'
import { inputCls, selectCls, textareaCls } from '@/components/admin/ui'
import { PIPELINE_STAGES, PRIORITIES, LEAD_SOURCES, BUSINESS_TYPES, BERKSHIRE_TOWNS, NORTH_SHORE_TOWNS, PACKAGES } from '@/lib/admin-constants'
import { toast } from 'sonner'

export function LeadFormModal({ open, onOpenChange, onSaved, initial }: {
  open: boolean
  onOpenChange: (b: boolean) => void
  onSaved: () => void
  initial?: any
}) {
  const supabase = createClient()
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState<any>({
    business_name: '', contact_name: '', email: '', phone: '', town: '',
    business_type: '', website: '', instagram: '', google_business_link: '',
    lead_source: '', stage: 'New Lead', priority: 'Medium', estimated_value: '',
    recommended_package: '', sway_fit: false, sway_fit_score: '', notes: '',
    next_follow_up: '',
  })

  useEffect(() => {
    if (initial) setForm({ ...initial })
  }, [initial, open])

  const upd = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    const payload: any = {
      ...form,
      estimated_value: form.estimated_value ? Number(form.estimated_value) : null,
      sway_fit_score: form.sway_fit_score ? Number(form.sway_fit_score) : null,
      next_follow_up: form.next_follow_up || null,
    }
    const { error } = initial?.id
      ? await supabase.from('leads').update(payload).eq('id', initial.id)
      : await supabase.from('leads').insert(payload)
    setBusy(false)
    if (error) return toast.error(error.message)
    toast.success(initial?.id ? 'Lead updated' : 'Lead created')
    onOpenChange(false)
    onSaved()
  }

  return (
    <Dialog open={open} onClose={() => onOpenChange(false)} title={initial?.id ? 'Edit lead' : 'New lead'} maxWidth="max-w-2xl">
      <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4 mt-2">
        <F label="Business name" req><input value={form.business_name} onChange={e => upd('business_name', e.target.value)} required maxLength={200} className={inputCls} /></F>
        <F label="Contact name"><input value={form.contact_name ?? ''} onChange={e => upd('contact_name', e.target.value)} maxLength={120} className={inputCls} /></F>
        <F label="Email"><input type="email" value={form.email ?? ''} onChange={e => upd('email', e.target.value)} maxLength={200} className={inputCls} /></F>
        <F label="Phone"><input value={form.phone ?? ''} onChange={e => upd('phone', e.target.value)} maxLength={40} className={inputCls} /></F>
        <F label="Town">
          <select value={form.town || ''} onChange={e => upd('town', e.target.value)} className={selectCls}>
            <option value="">Select</option>
            <optgroup label="North Shore">
              {NORTH_SHORE_TOWNS.map(t => <option key={t} value={t}>{t}</option>)}
            </optgroup>
            <optgroup label="Berkshire County">
              {BERKSHIRE_TOWNS.map(t => <option key={t} value={t}>{t}</option>)}
            </optgroup>
          </select>
        </F>
        <F label="Business type"><Sel value={form.business_type} onChange={v => upd('business_type', v)} options={BUSINESS_TYPES} /></F>
        <F label="Website"><input value={form.website ?? ''} onChange={e => upd('website', e.target.value)} maxLength={300} className={inputCls} /></F>
        <F label="Instagram"><input value={form.instagram ?? ''} onChange={e => upd('instagram', e.target.value)} maxLength={200} className={inputCls} /></F>
        <F label="Google Business link" className="sm:col-span-2"><input value={form.google_business_link ?? ''} onChange={e => upd('google_business_link', e.target.value)} maxLength={400} className={inputCls} /></F>
        <F label="Lead source"><Sel value={form.lead_source} onChange={v => upd('lead_source', v)} options={LEAD_SOURCES} /></F>
        <F label="Stage"><Sel value={form.stage} onChange={v => upd('stage', v)} options={PIPELINE_STAGES} /></F>
        <F label="Priority"><Sel value={form.priority} onChange={v => upd('priority', v)} options={PRIORITIES} /></F>
        <F label="Recommended package"><Sel value={form.recommended_package} onChange={v => upd('recommended_package', v)} options={PACKAGES} /></F>
        <F label="Estimated value ($)"><input type="number" value={form.estimated_value ?? ''} onChange={e => upd('estimated_value', e.target.value)} className={inputCls} /></F>
        <F label="Next follow-up"><input type="date" value={form.next_follow_up ? String(form.next_follow_up).slice(0, 10) : ''} onChange={e => upd('next_follow_up', e.target.value)} className={inputCls} /></F>
        <F label="Sway fit score (1–5)"><input type="number" min={1} max={5} value={form.sway_fit_score ?? ''} onChange={e => { upd('sway_fit_score', e.target.value); upd('sway_fit', Number(e.target.value) >= 4) }} className={inputCls} /></F>
        <F label="Notes" className="sm:col-span-2"><textarea value={form.notes ?? ''} onChange={e => upd('notes', e.target.value)} rows={3} maxLength={2000} className={textareaCls} /></F>
        <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
          <Btn onClick={() => onOpenChange(false)}>Cancel</Btn>
          <Btn accent type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save'}</Btn>
        </div>
      </form>
    </Dialog>
  )
}

const F = ({ label, req, className, children }: any) => (
  <div className={`space-y-1.5 ${className ?? ''}`}>
    <label className="text-xs text-muted-foreground">{label}{req && <span className="text-red-400 ml-1">*</span>}</label>
    {children}
  </div>
)
const Sel = ({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) => (
  <select value={value || ''} onChange={e => onChange(e.target.value)} className={selectCls}>
    <option value="">Select</option>
    {options.map(o => <option key={o} value={o}>{o}</option>)}
  </select>
)
const Btn = ({ children, onClick, accent, type = 'button', disabled }: any) => (
  <button type={type} onClick={onClick} disabled={disabled}
    className={`flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-medium transition-colors disabled:opacity-50 ${accent ? 'bg-accent text-[#0A0A0A] hover:brightness-105' : 'border border-border bg-surface hover:bg-surface-elevated text-foreground'}`}>
    {children}
  </button>
)
