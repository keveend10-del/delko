'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PageHeader, Panel, EmptyState, inputCls, selectCls, textareaCls } from '@/components/admin/ui'
import { Dialog } from '@/components/admin/Dialog'
import { PROJECT_STATUSES, PACKAGES } from '@/lib/admin-constants'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { format, parseISO } from 'date-fns'

export default function Projects() {
  const supabase = createClient()
  const [rows, setRows] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [createOpen, setCreateOpen] = useState(false)
  const [editing, setEditing] = useState<any | null>(null)

  const load = async () => {
    const [p, c] = await Promise.all([
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('clients').select('id, business_name'),
    ])
    setRows(p.data ?? [])
    setClients(c.data ?? [])
  }
  useEffect(() => { load() }, [])

  const update = async (id: string, patch: any) => {
    const { error } = await supabase.from('projects').update(patch).eq('id', id)
    if (error) { console.error('Project update error:', error); toast.error('Could not update project. Please try again.') }
    else load()
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this project?')) return
    const { error } = await supabase.from('projects').delete().eq('id', id)
    if (error) { console.error('Project delete error:', error); toast.error('Could not delete project. Please try again.') }
    else { toast.success('Project deleted'); load() }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Delivery"
        title="Active projects"
        description="Track every client build from intake to launch."
        actions={<Btn accent onClick={() => setCreateOpen(true)}><Plus size={14} /> New project</Btn>}
      />

      {rows.length === 0 ? (
        <Panel><EmptyState title="No projects yet" description="Create one for an active client." /></Panel>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {rows.map(p => {
            const client = clients.find(c => c.id === p.client_id)
            return (
              <Panel key={p.id} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{p.package_type ?? '—'}</div>
                    <h3 className="text-lg font-semibold tracking-tight mt-1 truncate">{p.project_name}</h3>
                    <div className="text-xs text-muted-foreground mt-0.5">{client?.business_name ?? '—'}</div>
                  </div>
                  <select value={p.status} onChange={e => update(p.id, { status: e.target.value })} className={selectCls + ' h-8 w-auto text-xs'}>
                    {PROJECT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                    <span>Progress</span><span>{p.progress ?? 0}%</span>
                  </div>
                  <input
                    type="range" min={0} max={100} step={5}
                    value={p.progress ?? 0}
                    onChange={e => update(p.id, { progress: Number(e.target.value) })}
                    className="w-full accent-[hsl(var(--accent))]"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{p.start_date ? format(parseISO(p.start_date), 'MMM d') : '—'} → {p.due_date ? format(parseISO(p.due_date), 'MMM d') : '—'}</span>
                  {p.project_value && <span className="font-mono text-foreground">${Number(p.project_value).toLocaleString()}</span>}
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-end gap-2">
                  <Btn onClick={() => setEditing(p)}><Pencil size={14} /> Edit</Btn>
                  <Btn onClick={() => remove(p.id)} className="text-red-400 hover:text-red-300"><Trash2 size={14} /> Delete</Btn>
                </div>
              </Panel>
            )
          })}
        </div>
      )}

      <ProjectCreate supabase={supabase} open={createOpen} onClose={() => setCreateOpen(false)} clients={clients} onSaved={load} />
      <ProjectEdit supabase={supabase} project={editing} onClose={() => setEditing(null)} clients={clients} onSaved={load} />
    </div>
  )
}

const EMPTY_FORM = { project_name: '', client_id: '', package_type: '', start_date: '', due_date: '', status: 'Not started', progress: 0, project_value: '', notes: '' }

function ProjectCreate({ supabase, open, onClose, clients, onSaved }: any) {
  const [form, setForm] = useState<any>(EMPTY_FORM)
  const upd = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  useEffect(() => { if (open) setForm(EMPTY_FORM) }, [open])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('projects').insert({
      project_name: form.project_name,
      client_id: form.client_id || null,
      package_type: form.package_type || null,
      start_date: form.start_date || null,
      due_date: form.due_date || null,
      status: form.status,
      progress: Number(form.progress) || 0,
      project_value: form.project_value ? Number(form.project_value) : null,
      notes: form.notes || null,
    })
    if (error) { console.error('Project create error:', error); return toast.error('Project could not be saved. Please check the setup or try again.') }
    toast.success('Project created')
    onClose()
    onSaved()
  }

  return (
    <Dialog open={open} onClose={onClose} title="New project" maxWidth="max-w-xl">
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3 mt-3">
        <FF label="Project name" req className="sm:col-span-2"><input value={form.project_name} onChange={e => upd('project_name', e.target.value)} required maxLength={200} className={inputCls} /></FF>
        <FF label="Client"><select value={form.client_id} onChange={e => upd('client_id', e.target.value)} className={selectCls}><option value="">—</option>{clients.map((c: any) => <option key={c.id} value={c.id}>{c.business_name}</option>)}</select></FF>
        <FF label="Package"><select value={form.package_type} onChange={e => upd('package_type', e.target.value)} className={selectCls}><option value="">—</option>{PACKAGES.map(p => <option key={p} value={p}>{p}</option>)}</select></FF>
        <FF label="Start date"><input type="date" value={form.start_date} onChange={e => upd('start_date', e.target.value)} className={inputCls} /></FF>
        <FF label="Due date"><input type="date" value={form.due_date} onChange={e => upd('due_date', e.target.value)} className={inputCls} /></FF>
        <FF label="Project value ($)" className="sm:col-span-2"><input type="number" value={form.project_value} onChange={e => upd('project_value', e.target.value)} className={inputCls} /></FF>
        <FF label="Notes" className="sm:col-span-2"><textarea value={form.notes} onChange={e => upd('notes', e.target.value)} rows={3} className={textareaCls} /></FF>
        <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn accent type="submit">Save</Btn>
        </div>
      </form>
    </Dialog>
  )
}

function ProjectEdit({ supabase, project, onClose, clients, onSaved }: any) {
  const [form, setForm] = useState<any>(null)

  useEffect(() => {
    if (project) setForm({
      project_name: project.project_name ?? '',
      client_id: project.client_id ?? '',
      package_type: project.package_type ?? '',
      start_date: project.start_date ?? '',
      due_date: project.due_date ?? '',
      status: project.status ?? 'Not started',
      progress: project.progress ?? 0,
      project_value: project.project_value ?? '',
      notes: project.notes ?? '',
    })
  }, [project])

  if (!project || !form) return null
  const upd = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('projects').update({
      project_name: form.project_name,
      client_id: form.client_id || null,
      package_type: form.package_type || null,
      start_date: form.start_date || null,
      due_date: form.due_date || null,
      status: form.status,
      progress: Number(form.progress) || 0,
      project_value: form.project_value === '' || form.project_value === null ? null : Number(form.project_value),
      notes: form.notes || null,
    }).eq('id', project.id)
    if (error) { console.error('Project update error:', error); return toast.error('Project could not be saved. Please check the setup or try again.') }
    toast.success('Project updated')
    onClose()
    onSaved()
  }

  return (
    <Dialog open={!!project} onClose={onClose} title="Edit project" maxWidth="max-w-xl">
      <form onSubmit={submit} className="grid sm:grid-cols-2 gap-3 mt-3">
        <FF label="Project name" req className="sm:col-span-2"><input value={form.project_name} onChange={e => upd('project_name', e.target.value)} required maxLength={200} className={inputCls} /></FF>
        <FF label="Client"><select value={form.client_id} onChange={e => upd('client_id', e.target.value)} className={selectCls}><option value="">—</option>{clients.map((c: any) => <option key={c.id} value={c.id}>{c.business_name}</option>)}</select></FF>
        <FF label="Package"><select value={form.package_type} onChange={e => upd('package_type', e.target.value)} className={selectCls}><option value="">—</option>{PACKAGES.map(p => <option key={p} value={p}>{p}</option>)}</select></FF>
        <FF label="Status"><select value={form.status} onChange={e => upd('status', e.target.value)} className={selectCls}>{PROJECT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></FF>
        <FF label={`Progress (${form.progress}%)`}><input type="range" min={0} max={100} step={5} value={form.progress} onChange={e => upd('progress', Number(e.target.value))} className="w-full accent-[hsl(var(--accent))] mt-3" /></FF>
        <FF label="Start date"><input type="date" value={form.start_date} onChange={e => upd('start_date', e.target.value)} className={inputCls} /></FF>
        <FF label="Due date"><input type="date" value={form.due_date} onChange={e => upd('due_date', e.target.value)} className={inputCls} /></FF>
        <FF label="Project value ($)" className="sm:col-span-2"><input type="number" value={form.project_value} onChange={e => upd('project_value', e.target.value)} className={inputCls} /></FF>
        <FF label="Notes" className="sm:col-span-2"><textarea value={form.notes} onChange={e => upd('notes', e.target.value)} rows={4} className={textareaCls} /></FF>
        <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn accent type="submit">Save changes</Btn>
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
const Btn = ({ children, onClick, accent, type = 'button', disabled, className = '' }: any) => (
  <button type={type} onClick={onClick} disabled={disabled}
    className={`flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-medium transition-colors disabled:opacity-50 ${accent ? 'bg-accent text-[#0A0A0A] hover:brightness-105' : 'border border-border bg-surface hover:bg-surface-elevated text-foreground'} ${className}`}>
    {children}
  </button>
)
