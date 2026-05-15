'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Session, User } from '@supabase/supabase-js'
import type { Client } from '@/lib/types'

type PortalCtx = {
  user: User | null
  session: Session | null
  client: Client | null
  loading: boolean
  syncError: string | null
  signOut: () => Promise<void>
  reloadClient: () => Promise<void>
}

const PortalCtx = createContext<PortalCtx>({
  user: null,
  session: null,
  client: null,
  loading: true,
  syncError: null,
  signOut: async () => {},
  reloadClient: async () => {},
})

export function PortalAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [syncError, setSyncError] = useState<string | null>(null)
  const supabase = createClient()

  const syncClient = async () => {
    try {
      setSyncError(null)
      const res = await fetch('/api/portal/sync-client', { method: 'POST' })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setSyncError(body.error ?? 'Failed to load your account.')
        setClient(null)
      } else {
        const { client: c } = await res.json()
        setClient(c ?? null)
      }
    } catch {
      setSyncError('Network error — please try again.')
      setClient(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) syncClient()
      else setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user) {
        setLoading(true)
        syncClient()
      } else {
        setClient(null)
        setSyncError(null)
        setLoading(false)
      }
    })

    return () => sub.subscription.unsubscribe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const signOut = async () => { await supabase.auth.signOut() }
  const reloadClient = async () => { setLoading(true); await syncClient() }

  return (
    <PortalCtx.Provider value={{ user, session, client, loading, syncError, signOut, reloadClient }}>
      {children}
    </PortalCtx.Provider>
  )
}

export const usePortalAuth = () => useContext(PortalCtx)
