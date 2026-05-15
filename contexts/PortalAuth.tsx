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
  signOut: () => Promise<void>
}

const PortalCtx = createContext<PortalCtx>({
  user: null,
  session: null,
  client: null,
  loading: true,
  signOut: async () => {},
})

export function PortalAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const loadClient = async (email: string) => {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .eq('email', email.toLowerCase())
      .maybeSingle()
    setClient(data ?? null)
    setLoading(false)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user?.email) loadClient(s.user.email)
      else setLoading(false)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s)
      setUser(s?.user ?? null)
      if (s?.user?.email) loadClient(s.user.email)
      else { setClient(null); setLoading(false) }
    })

    return () => sub.subscription.unsubscribe()
  }, [])

  const signOut = async () => { await supabase.auth.signOut() }

  return (
    <PortalCtx.Provider value={{ user, session, client, loading, signOut }}>
      {children}
    </PortalCtx.Provider>
  )
}

export const usePortalAuth = () => useContext(PortalCtx)
