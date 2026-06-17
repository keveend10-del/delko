'use client'

import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, KanbanSquare, ClipboardList, Users, Briefcase,
  Send, FolderKanban, CheckSquare, Sparkles, Settings, LogOut,
  Menu, X, MessageSquare, ListChecks, Brain,
} from 'lucide-react'
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuth'
import { createClient } from '@/lib/supabase/client'
import { Toaster } from 'sonner'

const nav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/crm', label: 'CRM Pipeline', icon: KanbanSquare },
  { href: '/admin/audit-requests', label: 'Audit Requests', icon: ClipboardList },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/clients', label: 'Clients', icon: Briefcase },
  { href: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { href: '/admin/outreach', label: 'Outreach', icon: Send },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/checklists', label: 'Checklists', icon: ListChecks },
  { href: '/admin/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/admin/sway-opportunities', label: 'Sway Opportunities', icon: Sparkles },
  { href: '/admin/ai-visibility', label: 'AI Visibility', icon: Brain },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

function AdminLogin() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setMsg('')
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMsg('Check your email to confirm your account.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (err: any) {
      setMsg(err.message ?? 'Authentication failed')
    } finally {
      setBusy(false)
    }
  }

  const signInWithGoogle = async () => {
    setBusy(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/admin` },
    })
    if (error) { setMsg(error.message); setBusy(false) }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-5 py-10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 30% 50%, hsl(var(--accent) / 0.07), transparent 65%)' }} />
      <div className="relative w-full max-w-md">
        <Link href="/" className="block text-center text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-6 hover:text-foreground transition-colors">
          ← Back to site
        </Link>
        <div className="rounded-3xl border border-border bg-[hsl(0_0%_7%)] shadow-[0_24px_80px_rgba(0,0,0,0.8)] p-8 sm:p-10">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Internal access
          </div>
          <h1 className="text-3xl tracking-tight font-bold">
            Admin <span className="font-serif italic font-normal text-muted-foreground">portal</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === 'signin' ? 'Sign in to your operating system.' : 'Create your admin account.'}
          </p>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={signInWithGoogle}
            disabled={busy}
            className="mt-7 w-full h-11 rounded-xl border border-border bg-surface hover:bg-surface-elevated text-[14px] font-medium transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-muted-foreground">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="h-11 w-full rounded-xl bg-surface border border-border px-4 text-[14px] outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-medium text-muted-foreground">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} className="h-11 w-full rounded-xl bg-surface border border-border px-4 text-[14px] outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all" />
            </div>
            {msg && <p className={`text-[13px] ${msg.includes('Check') ? 'text-accent' : 'text-red-400'}`}>{msg}</p>}
            <button type="submit" disabled={busy} className="w-full h-11 rounded-xl bg-accent text-[#0A0A0A] font-semibold text-[14px] disabled:opacity-50 hover:brightness-105 transition-all">
              {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          </form>
          <button onClick={() => setMode(m => m === 'signin' ? 'signup' : 'signin')} className="mt-5 w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors">
            {mode === 'signin' ? 'No account yet? Create one' : 'Already have an account? Sign in'}
          </button>
        </div>
        <p className="mt-5 text-[11px] text-center text-muted-foreground">First account created becomes the admin owner.</p>
      </div>
    </div>
  )
}

function AdminShell({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading, signOut } = useAdminAuth()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="h-5 w-5 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      </div>
    )
  }

  if (!user || !isAdmin) return <AdminLogin />

  const currentLabel = nav.find(n => n.exact ? pathname === n.href : pathname.startsWith(n.href))?.label ?? 'Admin'

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 shrink-0 border-r border-border bg-[hsl(0_0%_6%)] backdrop-blur-xl transition-transform duration-300 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="px-5 pt-6 pb-4 border-b border-border/60">
          <Link href="/admin" onClick={() => setSidebarOpen(false)}>
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Internal · Admin</div>
            <div className="mt-1 text-[17px] font-semibold tracking-tight">
              Delko
            </div>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto px-2.5 py-4 space-y-0.5">
          {nav.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href)
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
              {user.email?.[0] ?? 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-medium truncate">{user.email}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Admin</div>
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
            <div className="ml-auto">
              <Link href="/" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">← Site</Link>
            </div>
          </div>
        </header>
        <main className="flex-1 px-5 lg:px-8 py-7 lg:py-10">{children}</main>
      </div>
    </div>
  )
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dark">
      <AdminAuthProvider>
        <Toaster theme="dark" position="bottom-right" />
        <AdminShell>{children}</AdminShell>
      </AdminAuthProvider>
    </div>
  )
}
