'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { PageHeader, Panel, StatusBadge, EmptyState, inputCls, selectCls, textareaCls } from '@/components/admin/ui'
import { CONTACT_METHODS, RESPONSE_STATUSES } from '@/lib/admin-constants'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { format, parseISO } from 'date-fns'

export default function Outreach() {
  const supabase = createClient()
  const [logs, setLogs] = useState<any[]>([])
  const [templates, setTemplates] = useState<any[]>([])
  const [tab, setTab] = useState('log')
  const [newLog, setNewLog] = useState({ business_name: '', contact_method: 'Email', message_type: 'Initial', message_body: '', response_status: 'No response', follow_up_date: '' })

  const load = async () => {
    const [l, t] = await Promise.all([
      supabase.from('outreach_logs').select('*').order('date_sent', { ascending: false }),
      supabase.from('outreach_templates').select('*').order('name'),
    ])
    setLogs(l.data ?? [])
    setTemplates(t.data ?? [])
  }
  useEffect(() => { load() }, [])

  const addLog = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.from('outreach_logs').insert({ ...newLog, follow_up_date: newLog.follow_up_date || null })
    if (error) return toast.error(error.message)
    toast.success('Logged')
    setNewLog({ ...newLog, business_name: '', message_body: '', follow_up_date: '' })
    load()
  }

  const followUps = logs.filter(l => l.follow_up_date && new Date(l.follow_up_date) <= new Date() && l.response_status !== 'Booked call')

  const tabs = [
    { id: 'log', label: 'Log' },
    { id: 'templates', label: 'Templates' },
    { id: 'followups', label: `Follow-up queue (${followUps.length})` },
  ]

  return (
    <div>
      <PageHeader eyebrow="Command center" title="Outreach desk" description="Track who you contacted, what you said, and when to follow up." />

      <div className="flex gap-1 p-1 rounded-xl border border-border bg-surface mb-5 w-fit">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${tab === t.id ? 'bg-accent/15 text-accent font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'log' && (
        <div className="space-y-4">
          <Panel className="p-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">New outreach</h3>
            <form onSubmit={addLog} className="grid sm:grid-cols-2 gap-3">
              <FF label="Business"><input value={newLog.business_name} onChange={e => setNewLog({ ...newLog, business_name: e.target.value })} required maxLength={200} className={inputCls} /></FF>
              <FF label="Method"><select value={newLog.contact_method} onChange={e => setNewLog({ ...newLog, contact_method: e.target.value })} className={selectCls}>{CONTACT_METHODS.map(c => <option key={c} value={c}>{c}</option>)}</select></FF>
              <FF label="Message type"><input value={newLog.message_type} onChange={e => setNewLog({ ...newLog, message_type: e.target.value })} className={inputCls} /></FF>
              <FF label="Response"><select value={newLog.response_status} onChange={e => setNewLog({ ...newLog, response_status: e.target.value })} className={selectCls}>{RESPONSE_STATUSES.map(c => <option key={c} value={c}>{c}</option>)}</select></FF>
              <FF label="Message" className="sm:col-span-2"><textarea value={newLog.message_body} onChange={e => setNewLog({ ...newLog, message_body: e.target.value })} rows={3} maxLength={4000} className={textareaCls} /></FF>
              <FF label="Follow-up date"><input type="date" value={newLog.follow_up_date} onChange={e => setNewLog({ ...newLog, follow_up_date: e.target.value })} className={inputCls} /></FF>
              <div className="flex items-end justify-end">
                <Btn accent type="submit">Log outreach</Btn>
              </div>
            </form>
          </Panel>

          <Panel className="overflow-hidden">
            {logs.length === 0 ? (
              <EmptyState title="Nothing logged yet" />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border">
                    <tr><Th>Business</Th><Th>Method</Th><Th>Type</Th><Th>Response</Th><Th>Sent</Th><Th>Follow-up</Th></tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {logs.map(l => (
                      <tr key={l.id} className="hover:bg-surface-elevated/40">
                        <Td className="font-medium">{l.business_name ?? '—'}</Td>
                        <Td>{l.contact_method}</Td>
                        <Td className="text-muted-foreground">{l.message_type}</Td>
                        <Td><StatusBadge value={l.response_status} /></Td>
                        <Td className="text-xs text-muted-foreground">{format(parseISO(l.date_sent), 'MMM d')}</Td>
                        <Td className="text-xs text-muted-foreground">{l.follow_up_date ? format(parseISO(l.follow_up_date), 'MMM d') : '—'}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </div>
      )}

      {tab === 'templates' && (
        <div className="grid md:grid-cols-2 gap-4">
          {templates.map(t => (
            <Panel key={t.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t.category}</div>
                  <h3 className="text-lg font-semibold tracking-tight mt-1">{t.name}</h3>
                  {t.subject && <div className="text-xs text-muted-foreground mt-0.5">Subject: {t.subject}</div>}
                </div>
                <Btn onClick={() => { navigator.clipboard.writeText(t.body); toast.success('Copied') }}><Copy size={12} /> Copy</Btn>
              </div>
              <pre className="mt-4 text-xs whitespace-pre-wrap text-muted-foreground font-sans leading-relaxed max-h-64 overflow-y-auto">{t.body}</pre>
            </Panel>
          ))}
          {templates.length === 0 && <Panel><EmptyState title="No templates yet" description="Add outreach templates to your database." /></Panel>}
        </div>
      )}

      {tab === 'followups' && (
        <Panel className="overflow-hidden">
          {followUps.length === 0 ? (
            <EmptyState title="No follow-ups due" description="You're caught up." />
          ) : (
            <ul className="divide-y divide-border">
              {followUps.map(l => (
                <li key={l.id} className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{l.business_name}</div>
                    <div className="text-xs text-muted-foreground">{l.contact_method} · last sent {format(parseISO(l.date_sent), 'MMM d')}</div>
                  </div>
                  <span className="text-xs text-amber-300">Due {format(parseISO(l.follow_up_date), 'MMM d')}</span>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      )}
    </div>
  )
}

const Th = ({ children }: any) => <th className="px-4 py-3 text-left font-medium">{children}</th>
const Td = ({ children, className = '' }: any) => <td className={`px-4 py-3 ${className}`}>{children}</td>
const FF = ({ label, className, children }: any) => (
  <div className={`space-y-1.5 ${className ?? ''}`}>
    <label className="text-xs text-muted-foreground">{label}</label>
    {children}
  </div>
)
const Btn = ({ children, onClick, accent, type = 'button' }: any) => (
  <button type={type} onClick={onClick}
    className={`flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-medium transition-colors ${accent ? 'bg-accent text-[#0A0A0A] hover:brightness-105' : 'border border-border bg-surface hover:bg-surface-elevated text-foreground'}`}>
    {children}
  </button>
)
