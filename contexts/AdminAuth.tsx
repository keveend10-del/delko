'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Session, User } from '@supabase/supabase-js'

type Ctx = {
  user: User | null
  session: Session | null
  isAdmin: boolean
  loading: boolean
  signOut: () => Promise<void>
}

const AuthCtx = createContext<Ctx>({ user: null, session: null, isAdmin: false, loading: true, signOut: async () => {} })

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  const loadRole = async (uid: string) => {
    const { data } = await supabase.from('user_roles').select('role').eq('user_id', uid)
    setIsAdmin((data ?? []).some((r: any) => r.role === 'admin'))
    setLoading(false)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s); setUser(s?.user ?? null)
      if (s?.user) loadRole(s.user.id); else setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s); setUser(s?.user ?? null)
      if (s?.user) loadRole(s.user.id); else { setIsAdmin(false); setLoading(false) }
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const signOut = async () => { await supabase.auth.signOut() }

  return <AuthCtx.Provider value={{ user, session, isAdmin, loading, signOut }}>{children}</AuthCtx.Provider>
}

export const useAdminAuth = () => useContext(AuthCtx)
