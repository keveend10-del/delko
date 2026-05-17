'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Sheet } from '@/components/admin/Sheet'
import { StatusBadge, inputCls, selectCls, textareaCls } from '@/components/admin/ui'
import { LeadFormModal } from '@/components/admin/LeadFormModal'
import { CONTACT_METHODS, RESPONSE_STATUSES, PIPELINE_STAGES, PRIORITIES } from '@/lib/admin-constants'
import { toast } from 'sonner'
import { format, parseISO } from 'date-fns'
import { Globe, Instagram, MapPin, ExternalLink, Edit2, UserCheck, Trash2 } from 'lucide-react'

export function LeadDrawer({ lead, onClose, onChange }: { lead: any | null; onClose: () => void; onChange: () => void }) {
  const supabase = createClient()
  const [logs, setLogs] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [editing, setEditing] = useState(false)
  const [logForm, setLogForm] = useState({ contact_method: 'Email', message_type: 'Initial', notes: '', response_status: 'No response', follow_up_date: '' })

  useEffect(() => {
    if (!lead?.id) return
    ;(async () => {
      const [l, t] = await Promise.all([
        supabase.from('outreach_logs').select('*').eq('lead_id', lead.id).order('date_sent', { ascending: false }),
        supabase.from('tasks').select('*').eq('related_type', 'lead').eq('related_id', lead.id).order('due_date'),
      ])
      setLogs(l.data ?? [])
      setTasks(t.data ?? [])
    })()
  }, [lead?.id])

  if (!lead) return null

  const updateField = async (field: string, value: any) => {
    const { error } = await supabase.from('leads').update({ [field]: value }).eq('id', lead.id)
    if (error) toast.error(error.message)
    else { toast.success('Updated'); onChange() }
  }

  const logOutreach = async () => {
    const { error } = await supabase.from('outreach_logs').insert({
      lead_id: lead.id,
      business_name: lead.business_name,
      ...logForm,
      follow_up_date: logForm.follow_up_date || null,
    })
    if (error) return toast.error(error.message)
    await supabase.from('leads').update({ last_contacted: new Date().toISOString() }).eq('id', lead.id)
    toast.success('Outreach logged')
    setLogForm({ contact_method: 'Email', message_type: 'Initial', notes: '', response_status: 'No response', follow_up_date: '' })
    const { data } = await supabase.from('outreach_logs').select('*').eq('lead_id', lead.id).order('date_sent', { ascending: false })
    setLogs(data ?? [])
    onChange()
  }

  const deleteLead = async () => {
    const { error } = await supabase.from('leads').delete().eq('id', lead.id)
    if (error) toast.error(error.message)
    else { toast.success('Lead deleted'); onClose(); onChange() }
  }

  const convertToClient = async () => {
    const { error } = await supabase.from('clients').insert({
      business_name: lead.business_name,
      contact_name: lead.contact_name,
      email: lead.email,
      phone: lead.phone,
      town: lead.town,
      business_type: lead.business_type,
      website: lead.website,
      instagram: lead.instagram,
      package_purchased: lead.recommended_package,
      project_value: lead.estimated_value,
      start_date: new Date().toISOString().slice(0, 10),
      notes: lead.notes,
    })
    if (error) return toast.error(error.message)
    await supabase.from('leads').update({ stage: 'Won' }).eq('id', lead.id)
    toast.success('Converted to client')
    onClose()
    onChange()
  }

  return (
    <>
      <Sheet open={!!lead} onClose={onClose} title={lead.business_name}>
        <div className="mt-1 mb-5 flex items-center justify-between gap-3">
          <div className="text-sm text-muted-foreground">{lead.contact_name ?? '—'} · {lead.business_type ?? '—'} · {lead.town ?? '—'}</div>
          <Btn onClick={() => setEditing(true)}><Edit2 size={12} /> Edit</Btn>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2 flex-wrap">
            <select value={lead.stage} onChange={e => updateField('stage', e.target.value)} className={selectCls + ' h-8 w-auto text-xs'}>
              {PIPELINE_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select value={lead.priority} onChange={e => updateField('priority', e.target.value)} className={selectCls + ' h-8 w-auto text-xs'}>
              {PRIORITIES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            {lead.sway_fit && <StatusBadge value="Sway fit" />}
          </div>

          <Section title="Contact">
            <Row label="Email" value={lead.email} />
            <Row label="Phone" value={lead.phone} />
            <LinkRow icon={Globe} label="Website" value={lead.website} />
            <LinkRow icon={Instagram} label="Instagram" value={lead.instagram} />
            <LinkRow icon={MapPin} label="Google Business" value={lead.google_business_link} />
          </Section>

          <Section title="Deal">
            <Row label="Source" value={lead.lead_source} />
            <Row label="Recommended package" value={lead.recommended_package} />
            <Row label="Estimated value" value={lead.estimated_value ? `$${Number(lead.estimated_value).toLocaleString()}` : null} />
            <Row label="Last contacted" value={lead.last_contacted ? format(parseISO(lead.last_contacted), 'MMM d, yyyy') : null} />
            <Row label="Next follow-up" value={lead.next_follow_up ? format(parseISO(lead.next_follow_up), 'MMM d, yyyy') : null} />
            <Row label="Sway fit score" value={lead.sway_fit_score ? `★ ${lead.sway_fit_score}` : null} />
          </Section>

          {lead.notes && (
            <Section title="Notes">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">{lead.notes}</p>
            </Section>
          )}

          <Section title="Log outreach">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <select value={logForm.contact_method} onChange={e => setLogForm({ ...logForm, contact_method: e.target.value })} className={selectCls + ' h-9'}>
                  {CONTACT_METHODS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <select value={logForm.response_status} onChange={e => setLogForm({ ...logForm, response_status: e.target.value })} className={selectCls + ' h-9'}>
                  {RESPONSE_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <textarea placeholder="What did you say?" value={logForm.notes} onChange={e => setLogForm({ ...logForm, notes: e.target.value })} rows={2} className={textareaCls} />
              <div className="flex items-center gap-2">
                <div className="flex-1 space-y-1">
                  <label className="text-[11px] text-muted-foreground">Follow up on</label>
                  <input type="date" value={logForm.follow_up_date} onChange={e => setLogForm({ ...logForm, follow_up_date: e.target.value })} className={inputCls + ' h-9'} />
                </div>
                <Btn accent onClick={logOutreach} className="self-end">Log</Btn>
              </div>
            </div>

            {logs.length > 0 && (
              <ul className="mt-4 space-y-2">
                {logs.map(l => (
                  <li key={l.id} className="text-xs border border-border rounded-lg p-3 bg-surface">
                    <div className="flex justify-between">
                      <span className="font-medium">{l.contact_method} · {l.response_status}</span>
                      <span className="text-muted-foreground">{format(parseISO(l.date_sent), 'MMM d')}</span>
                    </div>
                    {l.notes && <p className="mt-1 text-muted-foreground whitespace-pre-wrap">{l.notes}</p>}
                  </li>
                ))}
              </ul>
            )}
          </Section>

          {tasks.length > 0 && (
            <Section title="Tasks">
              <ul className="space-y-1.5">
                {tasks.map(t => (
                  <li key={t.id} className="text-sm flex justify-between">
                    <span>{t.title}</span>
                    <StatusBadge value={t.status} />
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <div className="pt-2 border-t border-border flex items-center justify-between gap-2">
            <Btn onClick={deleteLead} className="border-rose-500/25 bg-rose-500/[0.06] text-rose-400 hover:bg-rose-500/15">
              <Trash2 size={12} /> Delete
            </Btn>
            <Btn accent onClick={convertToClient}>
              <UserCheck size={14} /> Convert to client
            </Btn>
          </div>
        </div>
      </Sheet>

      <LeadFormModal
        open={editing}
        onOpenChange={setEditing}
        onSaved={() => { onChange() }}
        initial={lead}
      />
    </>
  )
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-3">{title}</h3>
    <div className="space-y-2">{children}</div>
  </div>
)
const Row = ({ label, value }: { label: string; value?: string | null }) =>
  value ? (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  ) : null
const LinkRow = ({ icon: Icon, label, value }: { icon: any; label: string; value?: string | null }) =>
  value ? (
    <div className="flex justify-between text-sm items-center">
      <span className="text-muted-foreground flex items-center gap-1.5"><Icon size={12} /> {label}</span>
      <a href={value.startsWith('http') ? value : `https://${value}`} target="_blank" rel="noreferrer" className="text-accent hover:underline truncate max-w-[200px] flex items-center gap-1">
        {value} <ExternalLink size={10} />
      </a>
    </div>
  ) : null
const Btn = ({ children, onClick, accent, className = '' }: any) => (
  <button onClick={onClick}
    className={`flex items-center gap-1.5 h-8 px-3 rounded-lg text-xs font-medium transition-colors ${accent ? 'bg-accent text-[#0A0A0A] hover:brightness-105' : 'border border-border bg-surface hover:bg-surface-elevated text-foreground'} ${className}`}>
    {children}
  </button>
)
