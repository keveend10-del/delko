'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  DndContext, DragEndEvent, DragOverlay, DragStartEvent,
  PointerSensor, useSensor, useSensors, useDroppable, useDraggable,
} from '@dnd-kit/core'
import { PageHeader, StatusBadge } from '@/components/admin/ui'
import { LeadDrawer } from '@/components/admin/LeadDrawer'
import { LeadFormModal } from '@/components/admin/LeadFormModal'
import { PIPELINE_STAGES } from '@/lib/admin-constants'
import { Plus, Sparkles } from 'lucide-react'
import { toast } from 'sonner'
import { format, parseISO } from 'date-fns'

type Lead = any

export default function CrmPipeline() {
  const supabase = createClient()
  const [leads, setLeads] = useState<Lead[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [openLead, setOpenLead] = useState<Lead | null>(null)
  const [createOpen, setCreateOpen] = useState(false)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const load = async () => {
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
    setLeads(data ?? [])
  }
  useEffect(() => { load() }, [])

  const onDragStart = (e: DragStartEvent) => setActiveId(String(e.active.id))
  const onDragEnd = async (e: DragEndEvent) => {
    setActiveId(null)
    const { active, over } = e
    if (!over) return
    const newStage = String(over.id)
    const lead = leads.find(l => l.id === active.id)
    if (!lead || lead.stage === newStage) return
    setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, stage: newStage } : l))
    const { error } = await supabase.from('leads').update({ stage: newStage }).eq('id', lead.id)
    if (error) { toast.error('Failed to move lead'); load() }
    else toast.success(`Moved to ${newStage}`)
  }

  const active = leads.find(l => l.id === activeId)

  return (
    <div>
      <PageHeader
        eyebrow="CRM"
        title="Pipeline view"
        description="Drag leads between stages. Click a card to open."
        actions={
          <button onClick={() => setCreateOpen(true)} className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-accent text-[#0A0A0A] text-xs font-semibold hover:brightness-105 transition-all">
            <Plus size={14} /> New lead
          </button>
        }
      />

      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-5 lg:-mx-8 px-5 lg:px-8">
          {PIPELINE_STAGES.map(stage => {
            const stageLeads = leads.filter(l => l.stage === stage)
            return (
              <Column key={stage} stage={stage} count={stageLeads.length}>
                {stageLeads.map(l => (
                  <LeadCard key={l.id} lead={l} onClick={() => setOpenLead(l)} />
                ))}
              </Column>
            )
          })}
        </div>
        <DragOverlay>
          {active ? <LeadCardView lead={active} dragging /> : null}
        </DragOverlay>
      </DndContext>

      <LeadDrawer lead={openLead} onClose={() => setOpenLead(null)} onChange={load} />
      <LeadFormModal open={createOpen} onOpenChange={setCreateOpen} onSaved={load} />
    </div>
  )
}

function Column({ stage, count, children }: { stage: string; count: number; children: React.ReactNode }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage })
  return (
    <div
      ref={setNodeRef}
      className={`shrink-0 w-72 rounded-2xl border bg-[hsl(0_0%_7%)] transition-colors ${isOver ? 'border-accent/60' : 'border-border'}`}
    >
      <div className="px-4 py-3 border-b border-border/60 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">{stage}</span>
        <span className="text-[11px] font-mono text-muted-foreground">{count}</span>
      </div>
      <div className="p-2 space-y-2 min-h-[120px] max-h-[calc(100vh-260px)] overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

function LeadCard({ lead, onClick }: { lead: any; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: lead.id })
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-30' : ''}`}
    >
      <LeadCardView lead={lead} />
    </div>
  )
}

function LeadCardView({ lead, dragging }: { lead: any; dragging?: boolean }) {
  return (
    <div className={`rounded-xl border border-border bg-surface p-3 hover:border-white/20 transition-colors ${dragging ? 'shadow-2xl rotate-1' : ''}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-medium text-sm truncate">{lead.business_name}</div>
          <div className="text-[11px] text-muted-foreground truncate">{lead.contact_name ?? '—'} · {lead.town ?? '—'}</div>
        </div>
        {lead.sway_fit && <Sparkles size={12} className="text-accent shrink-0 mt-0.5" />}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{lead.business_type ?? '—'}</span>
        {lead.estimated_value && <span className="text-xs font-mono">${Number(lead.estimated_value).toLocaleString()}</span>}
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <StatusBadge value={lead.priority} />
        {lead.next_follow_up && (
          <span className="text-[10px] text-muted-foreground">→ {format(parseISO(lead.next_follow_up), 'MMM d')}</span>
        )}
      </div>
    </div>
  )
}
