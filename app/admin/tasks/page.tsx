'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PageHeader, Panel, StatusBadge, EmptyState, inputCls, selectCls, textareaCls } from '@/components/admin/ui'
import { Dialog } from '@/components/admin/Dialog'
import { TASK_PRIORITIES, TASK_STATUSES } from '@/lib/admin-constants'
import { Plus, Check, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { format, parseISO, isToday, isThisWeek, isPast } from 'date-fns'

export default function Tasks() {
  const supabase = createClient()
  const [rows, setRows] = useState<any[]>([])
  const [createOpen, setCreateOpen] = useState(false)
  const [selected, setSelected] = useState<any>(null)
  const [tab, setTab] = useState('today')

  const load = async () => {
    const { data } = await supabase.from('tasks').select('*').order('due_date', { ascending: true })
    setRows(data ?? [])
  }
  useEffect(() => { load() }, [])

  const update = async (id: string, patch: any) => {
    const { error } = await supabase.from('tasks').update(patch).eq('id', id)
    if (error) toast.error(error.message)
    else load()
  }

  const today = rows.filter(r => r.due_date && isToday(parseISO(r.due_date)) && r.status !== 'Done')
  const week = rows.filter(r => r.due_date && isThisWeek(parseISO(r.due_date)) && r.status !== 'Done')
  const overdue = rows.filter(r => r.due_date && isPast(parseISO(r.due_date)) && !isToday(parseISO(r.due_date)) && r.status !== 'Done')
  const all = rows

  const tabs = [
    { id: 'today', label: `Today (${today.length})`, list: today },
    { id: 'week', label: `This week (${week.length})`, list: week },
    { id: 'overdue', label: `Overdue (${overdue.length})`, list: overdue },
    { id: 'all', label: `All (${all.length})`, list: all },
  ]
  const activeList = tabs.find(t => t.id === tab)?.list ?? []

  return (
    <div>
      <PageHeader
        eyebrow="To do"
        title="Task list"
        description="Everything pending across leads, clients, and projects."
        actions={<Btn accent onClick={() => setCreateOpen(true)}><Plus size={14} /> New task</Btn>}
      />

      <div className="flex gap-1 p-1 rounded-xl border border-border bg-surface mb-5 w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${tab === t.id ? 'bg-accent/15 text-accent font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <Panel className="overflow-hidden">
        {activeList.length === 0 ? (
          <EmptyState title="Nothing here" />
        ) : (
          <ul className="divide-y divide-border">
            {activeList.map(t => (
              <li key={t.id} className="px-5 py-3 flex items-center gap-3 hover:bg-surface-elevated/30 transition-colors">
                <button
                  onClick={() => update(t.id, { status: t.status === 'Done' ? 'To do' : 'Done' })}
                  className={`h-5 w-5 rounded border flex items-center justify-center transition-colors shrink-0 ${t.status === 'Done' ? 'bg-accent border-accent' : 'border-border hover:border-accent'}`}
                >
                  {t.status === 'Done' && <Check size={12} className="text-[#0A0A0A]" />}
                </button>
                <button className="flex-1 min-w-0 text-left" onClick={() => setSelected(t)}>
                  <div className={`text-sm font-medium truncate ${t.status === 'Done' ? 'line-through text-muted-foreground' : ''}`}>{t.title}</div>
                  {t.notes && <div className="text-xs text-muted-foreground truncate">{t.notes}</div>}
                </button>
                <span className="shrink-0"><StatusBadge value={t.priority} /></span>
                <select value={t.status} onChange={e => update(t.id, { status: e.target.value })} className={selectCls + ' h-8 w-auto text-xs shrink-0'}>
                  {TASK_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <span className="text-xs text-muted-foreground w-16 text-right shrink-0">{t.due_date ? format(parseISO(t.due_date), 'MMM d') : '—'}</span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <TaskCreate supabase={supabase} open={createOpen} onClose={() => setCreateOpen(false)} onSaved={load} />
      {selected && <TaskDetail supabase={supabase} task={selected} onClose={() => setSelected(null)} onSaved={load} />}
    </div>
  )
}

function TaskCreate({ supabase, open, onClose, onSaved }: any) {
  const [form, setForm] = useState<any>({ title: '', due_date: '', priority: 'Medium', status: 'To do', notes: '' })
  const upd = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('tasks').insert({ ...form, due_date: form.due_date || null })
    if (error) return toast.error(error.message)
    toast.success('Task added')
    setForm({ title: '', due_date: '', priority: 'Medium', status: 'To do', notes: '' })
    onClose()
    onSaved()
  }

  return (
    <Dialog open={open} onClose={onClose} title="New task" maxWidth="max-w-md">
      <form onSubmit={submit} className="space-y-3 mt-3">
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Title</label>
          <input value={form.title} onChange={e => upd('title', e.target.value)} required maxLength={200} className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Due</label>
            <input type="date" value={form.due_date} onChange={e => upd('due_date', e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Priority</label>
            <select value={form.priority} onChange={e => upd('priority', e.target.value)} className={selectCls}>
              {TASK_PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Notes</label>
          <textarea value={form.notes} onChange={e => upd('notes', e.target.value)} rows={3} className={textareaCls} />
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn accent type="submit">Save</Btn>
        </div>
      </form>
    </Dialog>
  )
}

function TaskDetail({ supabase, task, onClose, onSaved }: any) {
  const [form, setForm] = useState<any>({ ...task })
  const upd = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  const save = async () => {
    const { error } = await supabase.from('tasks').update({
      title: form.title,
      due_date: form.due_date || null,
      priority: form.priority,
      status: form.status,
      notes: form.notes,
    }).eq('id', task.id)
    if (error) toast.error(error.message)
    else { toast.success('Saved'); onSaved(); onClose() }
  }

  const del = async () => {
    const { error } = await supabase.from('tasks').delete().eq('id', task.id)
    if (error) toast.error(error.message)
    else { toast.success('Deleted'); onSaved(); onClose() }
  }

  return (
    <Dialog open onClose={onClose} title="Task detail" maxWidth="max-w-md">
      <div className="space-y-3 mt-3">
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Title</label>
          <input value={form.title} onChange={e => upd('title', e.target.value)} required className={inputCls} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Due</label>
            <input type="date" value={form.due_date ?? ''} onChange={e => upd('due_date', e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs text-muted-foreground">Priority</label>
            <select value={form.priority} onChange={e => upd('priority', e.target.value)} className={selectCls}>
              {TASK_PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Status</label>
          <select value={form.status} onChange={e => upd('status', e.target.value)} className={selectCls}>
            {TASK_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs text-muted-foreground">Notes</label>
          <textarea value={form.notes ?? ''} onChange={e => upd('notes', e.target.value)} rows={4} className={textareaCls} />
        </div>
        <div className="flex justify-between pt-1">
          <Btn danger onClick={del}><Trash2 size={13} /> Delete</Btn>
          <div className="flex gap-2">
            <Btn onClick={onClose}>Cancel</Btn>
            <Btn accent onClick={save}>Save</Btn>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

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
