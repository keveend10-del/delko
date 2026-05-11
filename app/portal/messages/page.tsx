'use client'

import { useEffect, useRef, useState } from 'react'
import { usePortalAuth } from '@/contexts/PortalAuth'
import { createClient } from '@/lib/supabase/client'
import { Panel, PageHeader } from '@/components/admin/ui'
import { Send, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import { format, parseISO } from 'date-fns'

interface Message {
  id: string
  sender: 'client' | 'admin'
  body: string
  created_at: string
  read: boolean
}

export default function MessagesPage() {
  const { client, user } = usePortalAuth()
  const supabase = createClient()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const load = async () => {
    if (!client) return
    const { data } = await supabase
      .from('client_messages')
      .select('*')
      .eq('client_id', client.id)
      .order('created_at', { ascending: true })
    setMessages((data as Message[]) ?? [])
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [client?.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!client || !body.trim()) return
    setSending(true)

    const { error } = await supabase.from('client_messages').insert({
      client_id: client.id,
      sender: 'client',
      body: body.trim(),
    })

    if (error) {
      toast.error('Failed to send message')
    } else {
      setBody('')
      await load()
    }
    setSending(false)
  }

  if (!client) return null

  return (
    <div>
      <PageHeader
        eyebrow="Support"
        title="Messages"
        description="Send a message to Delko. We typically respond within a few hours during business days."
      />

      <div style={{ height: 'calc(100vh - 240px)', minHeight: '400px' }}>
      <Panel className="flex flex-col h-full">
        {/* Message thread */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="h-5 w-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <div className="h-12 w-12 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center mb-4">
                <MessageSquare size={20} className="text-muted-foreground" />
              </div>
              <p className="text-sm font-semibold text-foreground/60 mb-1">No messages yet</p>
              <p className="text-[12px] text-muted-foreground max-w-xs">
                Send us a message below — questions, updates, requests, anything. We&apos;re here.
              </p>
            </div>
          ) : (
            messages.map(msg => {
              const isClient = msg.sender === 'client'
              return (
                <div key={msg.id} className={`flex ${isClient ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[78%] rounded-2xl px-4 py-3 ${
                    isClient
                      ? 'bg-accent text-[#0A0A0A] rounded-tr-sm'
                      : 'bg-surface-elevated border border-border rounded-tl-sm'
                  }`}>
                    {!isClient && (
                      <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1">Delko</p>
                    )}
                    <p className={`text-[13px] leading-relaxed ${isClient ? 'text-[#0A0A0A]' : 'text-foreground/85'}`}>
                      {msg.body}
                    </p>
                    <p className={`text-[10px] mt-1.5 ${isClient ? 'text-[#0A0A0A]/50' : 'text-muted-foreground'}`}>
                      {format(parseISO(msg.created_at), 'MMM d, h:mm a')}
                    </p>
                  </div>
                </div>
              )
            })
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-4">
          <form onSubmit={send} className="flex gap-3">
            <input
              type="text"
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 h-10 rounded-xl bg-surface border border-border px-4 text-[14px] outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={sending || !body.trim()}
              className="h-10 w-10 rounded-xl bg-accent text-[#0A0A0A] flex items-center justify-center disabled:opacity-40 hover:brightness-105 transition-all"
            >
              {sending
                ? <div className="h-3.5 w-3.5 rounded-full border-2 border-[#0A0A0A] border-t-transparent animate-spin" />
                : <Send size={15} />}
            </button>
          </form>
        </div>
      </Panel>
      </div>
    </div>
  )
}
