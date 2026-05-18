'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAdminAuth } from '@/contexts/AdminAuth'
import { PageHeader, Panel, EmptyState, inputCls, textareaCls } from '@/components/admin/ui'
import { Dialog } from '@/components/admin/Dialog'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { Send, UserPlus, Search } from 'lucide-react'

export default function AdminMessages() {
  const supabase = createClient()
  const { user } = useAdminAuth()
  const [clients, setClients] = useState<any[]>([])
  const [active, setActive] = useState<any | null>(null)
  const [msgs, setMsgs] = useState<any[]>([])
  const [body, setBody] = useState('')
  const [unread, setUnread] = useState<Record<string, number>>({})
  const [q, setQ] = useState('')
  const [inviteOpen, setInviteOpen] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  const loadClients = async () => {
    const { data } = await supabase.from('clients').select('id, business_name, contact_name, email').order('business_name')
    setClients(data ?? [])
  }
  const loadUnread = async () => {
    const { data } = await supabase.from('client_messages').select('client_id').is('read_at', null).eq('sender_role', 'client')
    const counts: Record<string, number> = {}
    ;(data ?? []).forEach((m: any) => { counts[m.client_id] = (counts[m.client_id] ?? 0) + 1 })
    setUnread(counts)
  }
  const loadMsgs = async (clientId: string) => {
    const { data } = await supabase.from('client_messages').select('*').eq('client_id', clientId).order('created_at')
    setMsgs(data ?? [])
    await supabase.from('client_messages').update({ read_at: new Date().toISOString() })
      .eq('client_id', clientId).is('read_at', null).eq('sender_role', 'client')
    loadUnread()
  }

  useEffect(() => { loadClients(); loadUnread() }, [])
  useEffect(() => { if (active) loadMsgs(active.id) }, [active])
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  useEffect(() => {
    const ch = supabase.channel('admin-msgs')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'client_messages' }, (payload: any) => {
        if (active && payload.new.client_id === active.id) loadMsgs(active.id)
        loadUnread()
      }).subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [active])

  const send = async () => {
    if (!body.trim() || !active || !user) return
    const { error } = await supabase.from('client_messages').insert({
      client_id: active.id, sender_id: user.id, sender_role: 'admin', body: body.trim(),
    })
    if (error) return toast.error(error.message)
    setBody('')
    loadMsgs(active.id)
  }

  const filtered = clients.filter(c => !q || `${c.business_name} ${c.contact_name ?? ''}`.toLowerCase().includes(q.toLowerCase()))

  return (
    <div>
      <PageHeader
        eyebrow="Direct line"
        title="Client messages"
        description="Two-way inbox for everyone with a portal account."
        actions={
          <button onClick={() => setInviteOpen(true)} className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-accent text-[#0A0A0A] text-xs font-semibold hover:brightness-105 transition-all">
            <UserPlus size={14} /> Invite client
          </button>
        }
      />

      <div className="grid lg:grid-cols-[320px_1fr] gap-4">
        <Panel className="overflow-hidden flex flex-col h-[75vh]">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" className={inputCls + ' pl-9 h-9'} />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filtered.map(c => (
              <button
                key={c.id}
                onClick={() => setActive(c)}
                className={`w-full text-left px-4 py-3 border-b border-border/60 hover:bg-surface-elevated/40 transition-colors ${active?.id === c.id ? 'bg-surface-elevated/60' : ''}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-sm font-medium truncate">{c.business_name}</div>
                  {(unread[c.id] ?? 0) > 0 && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-[#0A0A0A] font-semibold">{unread[c.id]}</span>
                  )}
                </div>
                <div className="text-[11px] text-muted-foreground truncate">{c.email ?? c.contact_name ?? '—'}</div>
              </button>
            ))}
          </div>
        </Panel>

        <Panel className="flex flex-col h-[75vh]">
          {!active ? (
            <EmptyState title="Select a conversation" description="Pick a client from the left to start chatting." />
          ) : (
            <>
              <div className="px-5 py-4 border-b border-border">
                <div className="text-sm font-semibold">{active.business_name}</div>
                <div className="text-[11px] text-muted-foreground">{active.email ?? '—'}</div>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {msgs.length === 0 && <div className="text-sm text-muted-foreground text-center py-10">No messages yet.</div>}
                {msgs.map(m => {
                  const mine = m.sender_role === 'admin'
                  return (
                    <div key={m.id} className={`flex w-full ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${mine ? 'bg-accent text-[#0A0A0A]' : 'bg-surface-elevated border border-border'}`}>
                        <div className="whitespace-pre-wrap">{m.body}</div>
                        <div className={`mt-1 text-[10px] ${mine ? 'text-[#0A0A0A]/60' : 'text-muted-foreground'}`}>
                          {format(new Date(m.created_at), 'MMM d, h:mm a')}
                        </div>
                      </div>
                    </div>
                  )
                })}
                <div ref={endRef} />
              </div>
              <div className="border-t border-border p-3 flex gap-2">
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  placeholder="Reply…"
                  rows={2}
                  className={textareaCls}
                  onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) send() }}
                />
                <button
                  onClick={send}
                  disabled={!body.trim()}
                  className="flex items-center justify-center h-auto w-10 rounded-xl bg-accent text-[#0A0A0A] hover:brightness-105 transition-all disabled:opacity-50 shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
            </>
          )}
        </Panel>
      </div>

      <InviteDialog supabase={supabase} open={inviteOpen} onClose={() => setInviteOpen(false)} clients={clients} onDone={loadClients} />
    </div>
  )
}

function InviteDialog({ supabase, open, onClose, clients, onDone }: any) {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)

  const send = async () => {
    if (!email.trim()) return
    setBusy(true)
    const match = clients.find((c: any) => (c.email ?? '').toLowerCase() === email.trim().toLowerCase())
    if (!match) {
      setBusy(false)
      return toast.error('No client record uses this email. Add the client first so we can link the account.')
    }
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${appUrl}/auth/callback?next=/portal/dashboard`,
      },
    })
    setBusy(false)
    if (error) return toast.error(error.message)
    toast.success('Invite sent. Client clicks the link in their email to access the portal instantly.')
    setEmail('')
    onClose()
    onDone()
  }

  return (
    <Dialog open={open} onClose={onClose} title="Invite a client to the portal" maxWidth="max-w-md">
      <p className="text-sm text-muted-foreground mt-2">Enter the email on the client record. We'll email them a secure link to set a password and access their portal.</p>
      <div className="mt-3 space-y-1.5">
        <label className="text-xs text-muted-foreground">Client email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Btn onClick={onClose}>Cancel</Btn>
        <Btn accent onClick={send} disabled={busy}>Send invite</Btn>
      </div>
    </Dialog>
  )
}

const Btn = ({ children, onClick, accent, disabled }: any) => (
  <button onClick={onClick} disabled={disabled}
    className={`flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-medium transition-colors disabled:opacity-50 ${accent ? 'bg-accent text-[#0A0A0A] hover:brightness-105' : 'border border-border bg-surface hover:bg-surface-elevated text-foreground'}`}>
    {children}
  </button>
)
