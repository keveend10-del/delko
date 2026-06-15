'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, ListChecks, FolderKanban,
  MessageSquare, CreditCard, BarChart2, Settings,
  LogOut, Menu, X,
} from 'lucide-react'
import { PortalAuthProvider, usePortalAuth } from '@/contexts/PortalAuth'
import { Toaster } from 'sonner'
import { createClient } from '@/lib/supabase/client'

const nav = [
  { href: '/portal/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/portal/onboarding', label: 'Onboarding', icon: ListChecks },
  { href: '/portal/project', label: 'Project', icon: FolderKanban },
  { href: '/portal/messages', label: 'Messages', icon: MessageSquare },
  { href: '/portal/billing', label: 'Billing', icon: CreditCard },
  { href: '/portal/reports', label: 'Reports', icon: BarChart2 },
]

function PortalLogin() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [forgotMode, setForgotMode] = useState(false)

  const appUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL ?? '')
  const reset = () => { setMsg(''); setSuccessMsg('') }

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); reset()
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    setBusy(false)
    if (error) setMsg(error.message)
  }

  const onForgot = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); reset()
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${appUrl}/reset-password`,
    })
    setBusy(false)
    if (error) return setMsg(error.message)
    setSuccessMsg('Password reset link sent — check your email.')
  }

  const inputCls = 'h-11 w-full rounded-xl bg-surface border border-border px-4 text-[14px] outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all placeholder:text-muted-foreground'

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 py-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, hsl(var(--accent) / 0.06), transparent 65%)' }} />
      <div className="relative w-full max-w-md">
        <Link href="/" className="block text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6 hover:text-foreground transition-colors">
          ← Back to site
        </Link>
        <div className="rounded-3xl border border-border bg-surface shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.8)] p-8 sm:p-10">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Client access
          </div>
          <h1 className="text-3xl tracking-tight font-bold mb-6">
            Client <span className="font-serif italic font-normal text-muted-foreground">portal</span>
          </h1>


          {successMsg ? (
            <div className="rounded-2xl border border-accent/20 bg-accent/5 px-5 py-6 text-center">
              <p className="text-[14px] text-foreground">{successMsg}</p>
              <button
                onClick={() => { setSuccessMsg(''); setForgotMode(false) }}
                className="mt-4 text-[12px] text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              >
                Back to sign in
              </button>
            </div>
          ) : forgotMode ? (
            <>
              <h2 className="text-lg font-semibold mb-1">Reset password</h2>
              <p className="text-[13px] text-muted-foreground mb-5">Enter your email and we&apos;ll send a reset link.</p>
              <form onSubmit={onForgot} className="space-y-4">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@yourbusiness.com" className={inputCls} />
                {msg && <p className="text-[13px] text-red-400">{msg}</p>}
                <button type="submit" disabled={busy} className="w-full h-11 rounded-xl bg-accent text-[#0A0A0A] font-semibold text-[14px] disabled:opacity-50 hover:brightness-105 transition-all">
                  {busy ? 'Sending…' : 'Send reset link'}
                </button>
                <button type="button" onClick={() => { setForgotMode(false); reset() }} className="w-full text-[13px] text-muted-foreground hover:text-foreground transition-colors">
                  ← Back to sign in
                </button>
              </form>
            </>
          ) : (
            <form onSubmit={onLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[12px] font-medium text-muted-foreground">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@yourbusiness.com" className={inputCls} />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[12px] font-medium text-muted-foreground">Password</label>
                  <button type="button" onClick={() => { setForgotMode(true); reset() }} className="text-[12px] text-accent hover:underline">
                    Forgot password?
                  </button>
                </div>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" className={inputCls} />
              </div>
              {msg && <p className="text-[13px] text-red-400">{msg}</p>}
              <button type="submit" disabled={busy} className="w-full h-11 rounded-xl bg-accent text-[#0A0A0A] font-semibold text-[14px] disabled:opacity-50 hover:brightness-105 transition-all">
                {busy ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-[12px] text-muted-foreground">
            Don&apos;t have access yet?{' '}
            <a href="mailto:keveend10@gmail.com" className="text-accent hover:underline">Contact Delko →</a>
          </p>
        </div>
      </div>
    </div>
  )
}

function SyncError({ message }: { message: string }) {
  const { reloadClient, signOut } = usePortalAuth()
  const [retrying, setRetrying] = useState(false)

  const handleRetry = async () => {
    setRetrying(true)
    await reloadClient()
    setRetrying(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-5">
      <div className="max-w-md text-center">
        <div className="h-14 w-14 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center mx-auto mb-5">
          <FolderKanban size={22} className="text-muted-foreground" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Setting up your account</h2>
        <p className="text-sm text-muted-foreground mb-6">
          We couldn&apos;t load your client profile right now. This sometimes happens on first login — try again, or contact us if it persists.
        </p>
        {message && (
          <p className="text-xs text-red-400 mb-4 font-mono">{message}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleRetry}
            disabled={retrying}
            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-accent text-[#0A0A0A] font-semibold text-[13px] hover:brightness-105 transition-all disabled:opacity-50"
          >
            {retrying ? 'Retrying…' : 'Try again'}
          </button>
          <a
            href="mailto:keveend10@gmail.com"
            className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl border border-border text-[13px] hover:bg-surface-elevated transition-all"
          >
            Contact Delko
          </a>
          <button
            onClick={signOut}
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  )
}

function PortalShell({ children }: { children: ReactNode }) {
  const { user, client, loading, syncError, signOut } = usePortalAuth()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-5 w-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!user) return <PortalLogin />
  if (syncError || !client) return <SyncError message={syncError ?? 'Client data unavailable.'} />

  const currentLabel = nav.find(n => pathname.startsWith(n.href))?.label ?? 'Portal'
  const displayName = client.name || client.contact_name || client.business_name || '?'
  const initials = displayName.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 shrink-0 border-r border-border bg-surface backdrop-blur-xl transition-transform duration-300 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="px-5 pt-6 pb-4 border-b border-border/60">
          <Link href="/portal/dashboard" onClick={() => setSidebarOpen(false)}>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Client · Portal</div>
            <div className="mt-1 text-[17px] font-semibold tracking-tight">
              Delko <span className="font-serif italic font-normal">Growth</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-2.5 py-4 space-y-0.5">
          {nav.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${
                  active
                    ? 'bg-accent/10 text-foreground border border-accent/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface-elevated border border-transparent'
                }`}
              >
                <Icon size={15} className={active ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border/60 p-3">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent/40 to-accent/10 border border-accent/20 flex items-center justify-center text-xs font-semibold uppercase shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium truncate">{client.business_name}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{displayName}</div>
            </div>
            <button onClick={signOut} className="text-muted-foreground hover:text-foreground transition-colors" title="Sign out">
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-5 lg:px-8 h-14">
            <button onClick={() => setSidebarOpen(o => !o)} className="lg:hidden text-muted-foreground hover:text-foreground">
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-[15px] font-semibold tracking-tight">{currentLabel}</h1>
            <div className="ml-auto flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${client.subscription_status === 'active' ? 'bg-accent' : client.subscription_status === 'past_due' ? 'bg-red-400' : 'bg-yellow-400'}`} />
                <span className="text-[11px] text-muted-foreground capitalize">{(client.subscription_status ?? 'pending').replace('_', ' ')}</span>
              </div>
              <Link href="/" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">← Site</Link>
            </div>
          </div>
        </header>
        <main className="flex-1 px-5 lg:px-8 py-7 lg:py-10">{children}</main>
      </div>
    </div>
  )
}

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <PortalAuthProvider>
      <Toaster position="bottom-right" />
      <PortalShell>{children}</PortalShell>
    </PortalAuthProvider>
  )
}
