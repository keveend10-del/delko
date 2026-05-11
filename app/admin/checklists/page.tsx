'use client'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PageHeader, Panel, EmptyState, inputCls, selectCls } from '@/components/admin/ui'
import { ChevronDown, ChevronRight, Plus, Trash2, Eye, EyeOff, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

type Cat = { id: string; name: string; sort_order: number }
type TItem = { id: string; category_id: string; label: string; sort_order: number }
type PItem = {
  id: string; project_id: string; category_id: string; template_item_id: string | null
  label: string; status: string; notes: string | null; due_date: string | null
  client_visible: boolean; sort_order: number; completed_at: string | null
}

const STATUSES = ['todo', 'in_progress', 'done', 'skipped']
const STATUS_LABEL: Record<string, string> = { todo: 'To do', in_progress: 'In progress', done: 'Done', skipped: 'Skipped' }

export default function Checklists() {
  const [tab, setTab] = useState<'projects' | 'templates'>('projects')
  return (
    <div>
      <PageHeader
        eyebrow="Delivery"
        title="Project checklists"
        description="Standard 16-category playbook applied to every project. Track work and choose what clients see."
        actions={
          <div className="flex gap-1 p-1 rounded-xl border border-border bg-surface">
            <TabBtn active={tab === 'projects'} onClick={() => setTab('projects')}>Per project</TabBtn>
            <TabBtn active={tab === 'templates'} onClick={() => setTab('templates')}>Templates</TabBtn>
          </div>
        }
      />
      {tab === 'projects' ? <ProjectsView /> : <TemplatesView />}
    </div>
  )
}

function ProjectsView() {
  const supabase = createClient()
  const [projects, setProjects] = useState<any[]>([])
  const [clients, setClients] = useState<any[]>([])
  const [projectId, setProjectId] = useState<string>('')
  const [cats, setCats] = useState<Cat[]>([])
  const [items, setItems] = useState<PItem[]>([])
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({})
  const [busy, setBusy] = useState(false)

  const loadProjects = async () => {
    const [{ data: p }, { data: c }, { data: cat }] = await Promise.all([
      supabase.from('projects').select('id, project_name, client_id').order('created_at', { ascending: false }),
      supabase.from('clients').select('id, business_name'),
      supabase.from('checklist_categories').select('*').order('sort_order'),
    ])
    setProjects(p ?? [])
    setClients(c ?? [])
    setCats(cat ?? [])
    if (!projectId && p && p.length) setProjectId(p[0].id)
  }
  useEffect(() => { loadProjects() }, [])

  const loadItems = async () => {
    if (!projectId) return setItems([])
    const { data } = await supabase.from('project_checklist_items').select('*').eq('project_id', projectId).order('sort_order')
    setItems((data ?? []) as PItem[])
  }
  useEffect(() => { loadItems() }, [projectId])

  const apply = async () => {
    if (!projectId) return
    setBusy(true)
    const { data, error } = await supabase.rpc('apply_checklist_templates_to_project', { _project_id: projectId })
    setBusy(false)
    if (error) return toast.error(error.message)
    toast.success(`Added ${data ?? 0} item(s)`)
    loadItems()
  }

  const update = async (id: string, patch: Partial<PItem>) => {
    if (patch.status === 'done') (patch as any).completed_at = new Date().toISOString()
    if (patch.status && patch.status !== 'done') (patch as any).completed_at = null
    setItems(prev => prev.map(i => i.id === id ? { ...i, ...patch } as PItem : i))
    const { error } = await supabase.from('project_checklist_items').update(patch).eq('id', id)
    if (error) { toast.error(error.message); loadItems() }
  }

  const remove = async (id: string) => {
    if (!confirm('Remove this item?')) return
    const { error } = await supabase.from('project_checklist_items').delete().eq('id', id)
    if (error) return toast.error(error.message)
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const addItem = async (category_id: string) => {
    const label = prompt('New checklist item:')
    if (!label?.trim()) return
    const sort_order = (items.filter(i => i.category_id === category_id).reduce((m, i) => Math.max(m, i.sort_order), 0)) + 1
    const { error } = await supabase.from('project_checklist_items').insert({ project_id: projectId, category_id, label: label.trim(), sort_order })
    if (error) return toast.error(error.message)
    loadItems()
  }

  const grouped = useMemo(() => {
    const map: Record<string, PItem[]> = {}
    items.forEach(i => { (map[i.category_id] ||= []).push(i) })
    return map
  }, [items])

  const totals = useMemo(() => {
    const done = items.filter(i => i.status === 'done').length
    return { done, total: items.length, pct: items.length ? Math.round((done / items.length) * 100) : 0 }
  }, [items])

  if (projects.length === 0) {
    return <Panel className="p-10"><EmptyState title="No projects yet" description="Create a project first, then apply the checklist." /></Panel>
  }

  return (
    <div className="space-y-5">
      <Panel className="p-4 flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="flex-1 min-w-0 space-y-1.5">
          <label className="text-xs text-muted-foreground">Project</label>
          <select value={projectId} onChange={e => setProjectId(e.target.value)} className={selectCls}>
            {projects.map(p => {
              const c = clients.find(c => c.id === p.client_id)
              return <option key={p.id} value={p.id}>{p.project_name}{c ? ` — ${c.business_name}` : ''}</option>
            })}
          </select>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Overall</div>
          <div className="text-2xl font-semibold tabular-nums">{totals.pct}%</div>
          <div className="text-xs text-muted-foreground">{totals.done} / {totals.total}</div>
        </div>
        <button onClick={apply} disabled={busy} className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-accent text-[#0A0A0A] text-xs font-semibold hover:brightness-105 transition-all disabled:opacity-50">
          <Sparkles size={14} /> Apply templates
        </button>
      </Panel>

      {items.length === 0 ? (
        <Panel className="p-10"><EmptyState title="No checklist items yet" description="Click 'Apply templates' to load the standard 16-category playbook." /></Panel>
      ) : (
        <div className="space-y-3">
          {cats.map(cat => {
            const list = grouped[cat.id] ?? []
            if (list.length === 0) return null
            const done = list.filter(i => i.status === 'done').length
            const pct = Math.round((done / list.length) * 100)
            const open = openCats[cat.id] ?? true
            return (
              <Panel key={cat.id} className="overflow-hidden">
                <button onClick={() => setOpenCats({ ...openCats, [cat.id]: !open })} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-surface-elevated/40 transition-colors">
                  {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  <div className="flex-1 text-left">
                    <div className="font-medium tracking-tight">{cat.name}</div>
                    <div className="text-[11px] text-muted-foreground">{done} / {list.length} complete</div>
                  </div>
                  <div className="w-32 h-1.5 rounded-full bg-surface-elevated overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="w-10 text-right text-xs tabular-nums text-muted-foreground">{pct}%</div>
                </button>
                {open && (
                  <div className="border-t border-border divide-y divide-border">
                    {list.map(i => (
                      <div key={i.id} className="flex items-start gap-3 px-5 py-3">
                        <input
                          type="checkbox"
                          checked={i.status === 'done'}
                          onChange={e => update(i.id, { status: e.target.checked ? 'done' : 'todo' })}
                          className="h-4 w-4 rounded mt-1 accent-[hsl(var(--accent))] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm ${i.status === 'done' ? 'line-through text-muted-foreground' : ''}`}>{i.label}</div>
                          {i.notes && <div className="text-xs text-muted-foreground mt-0.5 whitespace-pre-wrap">{i.notes}</div>}
                        </div>
                        <select value={i.status} onChange={e => update(i.id, { status: e.target.value })} className={selectCls + ' h-8 w-32 text-xs'}>
                          {STATUSES.map(s => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                        </select>
                        <input type="date" value={i.due_date ?? ''} onChange={e => update(i.id, { due_date: e.target.value || null })} className={inputCls + ' h-8 w-36 text-xs'} />
                        <button title={i.client_visible ? 'Visible to client' : 'Hidden from client'} onClick={() => update(i.id, { client_visible: !i.client_visible })} className="text-muted-foreground hover:text-foreground p-1.5 shrink-0">
                          {i.client_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                        <button title="Delete" onClick={() => remove(i.id)} className="text-muted-foreground hover:text-red-400 p-1.5 shrink-0"><Trash2 size={14} /></button>
                      </div>
                    ))}
                    <div className="px-5 py-3">
                      <button onClick={() => addItem(cat.id)} className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-elevated text-xs transition-colors">
                        <Plus size={14} /> Add item
                      </button>
                    </div>
                  </div>
                )}
              </Panel>
            )
          })}
        </div>
      )}
    </div>
  )
}

function TemplatesView() {
  const supabase = createClient()
  const [cats, setCats] = useState<Cat[]>([])
  const [items, setItems] = useState<TItem[]>([])
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({})
  const [newCat, setNewCat] = useState('')

  const load = async () => {
    const [{ data: c }, { data: i }] = await Promise.all([
      supabase.from('checklist_categories').select('*').order('sort_order'),
      supabase.from('checklist_template_items').select('*').order('sort_order'),
    ])
    setCats(c ?? [])
    setItems(i ?? [])
  }
  useEffect(() => { load() }, [])

  const addCat = async () => {
    if (!newCat.trim()) return
    const sort_order = (cats.reduce((m, c) => Math.max(m, c.sort_order), 0)) + 1
    const { error } = await supabase.from('checklist_categories').insert({ name: newCat.trim(), sort_order })
    if (error) return toast.error(error.message)
    setNewCat(''); load()
  }

  const renameCat = async (id: string, name: string) => {
    const { error } = await supabase.from('checklist_categories').update({ name }).eq('id', id)
    if (error) toast.error(error.message); else load()
  }

  const removeCat = async (id: string) => {
    if (!confirm('Delete category and its template items? (Existing project items remain.)')) return
    const { error } = await supabase.from('checklist_categories').delete().eq('id', id)
    if (error) toast.error(error.message); else load()
  }

  const addItem = async (category_id: string) => {
    const label = prompt('New template item:')
    if (!label?.trim()) return
    const sort_order = (items.filter(i => i.category_id === category_id).reduce((m, i) => Math.max(m, i.sort_order), 0)) + 1
    const { error } = await supabase.from('checklist_template_items').insert({ category_id, label: label.trim(), sort_order })
    if (error) toast.error(error.message); else load()
  }

  const updateItem = async (id: string, label: string) => {
    const { error } = await supabase.from('checklist_template_items').update({ label }).eq('id', id)
    if (error) toast.error(error.message); else load()
  }

  const removeItem = async (id: string) => {
    if (!confirm('Delete this template item?')) return
    const { error } = await supabase.from('checklist_template_items').delete().eq('id', id)
    if (error) toast.error(error.message); else load()
  }

  return (
    <div className="space-y-4">
      <Panel className="p-4 flex gap-2">
        <input placeholder="New category name" value={newCat} onChange={e => setNewCat(e.target.value)} className={inputCls} />
        <button onClick={addCat} className="flex items-center gap-1.5 h-11 px-4 rounded-xl bg-accent text-[#0A0A0A] text-xs font-semibold hover:brightness-105 transition-all shrink-0">
          <Plus size={14} /> Add category
        </button>
      </Panel>
      {cats.map(cat => {
        const list = items.filter(i => i.category_id === cat.id)
        const open = openCats[cat.id] ?? false
        return (
          <Panel key={cat.id} className="overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4">
              <button onClick={() => setOpenCats({ ...openCats, [cat.id]: !open })} className="text-muted-foreground hover:text-foreground shrink-0">
                {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              <input defaultValue={cat.name} onBlur={e => e.target.value !== cat.name && renameCat(cat.id, e.target.value)} className={inputCls + ' flex-1'} />
              <span className="text-xs text-muted-foreground shrink-0">{list.length} items</span>
              <button onClick={() => removeCat(cat.id)} className="text-muted-foreground hover:text-red-400 p-1.5 shrink-0"><Trash2 size={14} /></button>
            </div>
            {open && (
              <div className="border-t border-border divide-y divide-border">
                {list.map(i => (
                  <div key={i.id} className="flex items-center gap-2 px-5 py-2.5">
                    <input defaultValue={i.label} onBlur={e => e.target.value !== i.label && updateItem(i.id, e.target.value)} className={inputCls + ' flex-1 h-9 text-sm'} />
                    <button onClick={() => removeItem(i.id)} className="text-muted-foreground hover:text-red-400 p-1.5 shrink-0"><Trash2 size={14} /></button>
                  </div>
                ))}
                <div className="px-5 py-3">
                  <button onClick={() => addItem(cat.id)} className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-border bg-surface text-muted-foreground hover:text-foreground hover:bg-surface-elevated text-xs transition-colors">
                    <Plus size={14} /> Add item
                  </button>
                </div>
              </div>
            )}
          </Panel>
        )
      })}
    </div>
  )
}

const TabBtn = ({ active, onClick, children }: any) => (
  <button onClick={onClick} className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${active ? 'bg-accent/15 text-accent font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
    {children}
  </button>
)
