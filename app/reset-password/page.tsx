'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Suspense } from 'react'

function ResetPasswordForm() {
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [ready, setReady] = useState(false)
  const [exchanging, setExchanging] = useState(true)

  useEffect(() => {
    const code = searchParams.get('code')

    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        setExchanging(false)
        if (error) setMsg('This reset link is expired or invalid. Request a new one.')
        else setReady(true)
      })
    } else {
      // Legacy implicit flow — token in hash handled by Supabase client automatically
      supabase.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY') {
          setExchanging(false)
          setReady(true)
        }
      })
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setExchanging(false)
          setReady(true)
        } else {
          setExchanging(false)
        }
      })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) return setMsg('Passwords do not match.')
    if (password.length < 8) return setMsg('Password must be at least 8 characters.')
    setBusy(true)
    setMsg('')
    const { error } = await supabase.auth.updateUser({ password })
    setBusy(false)
    if (error) return setMsg(error.message)
    setMsg('Password updated! Redirecting to your portal…')
    setTimeout(() => router.push('/portal/dashboard'), 1800)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 py-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, hsl(var(--accent) / 0.06), transparent 65%)' }} />
      <div className="relative w-full max-w-md">
        <Link href="/portal/login" className="block text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6 hover:text-foreground transition-colors">
          ← Back to portal
        </Link>
        <div className="rounded-3xl border border-border bg-[hsl(0_0%_7%)] shadow-[0_24px_80px_rgba(0,0,0,0.8)] p-8 sm:p-10">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Client access
          </div>
          <h1 className="text-3xl tracking-tight font-bold">
            Set <span className="font-serif italic font-normal text-muted-foreground">password</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Choose a new password for your client portal.</p>

          {exchanging ? (
            <div className="mt-8 flex justify-center">
              <div className="h-5 w-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
            </div>
          ) : !ready ? (
            <div className="mt-6">
              {msg && <p className="text-[13px] text-red-400">{msg}</p>}
              <Link
                href="/portal/login"
                className="mt-4 inline-block text-[13px] text-accent hover:underline"
              >
                Request a new reset link →
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-7 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-muted-foreground">New password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Min. 8 characters"
                  className="h-11 w-full rounded-xl bg-surface border border-border px-4 text-[14px] outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-muted-foreground">Confirm password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  className="h-11 w-full rounded-xl bg-surface border border-border px-4 text-[14px] outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all"
                />
              </div>
              {msg && <p className="text-[13px] text-red-400">{msg}</p>}
              <button
                type="submit"
                disabled={busy}
                className="w-full h-11 rounded-xl bg-accent text-[#0A0A0A] font-semibold text-[14px] disabled:opacity-50 hover:brightness-105 transition-all"
              >
                {busy ? 'Saving…' : 'Set password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}
