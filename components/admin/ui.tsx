import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export const Panel = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('rounded-2xl border border-border bg-[hsl(0_0%_7%)] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_12px_40px_rgba(0,0,0,0.7)]', className)}>
    {children}
  </div>
)

export const PageHeader = ({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7">
    <div>
      {eyebrow && <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{eyebrow}</div>}
      <h1 className="text-3xl sm:text-4xl tracking-tight">
        {title.split(' ').map((w, i, arr) =>
          i === arr.length - 1
            ? <span key={i} className="font-serif italic font-normal">{w}</span>
            : <span key={i}>{w} </span>
        )}
      </h1>
      {description && <p className="mt-2 text-sm text-muted-foreground max-w-xl">{description}</p>}
    </div>
    {actions && <div className="flex items-center gap-2">{actions}</div>}
  </div>
)

const statusColors: Record<string, string> = {
  'New Lead': 'bg-slate-500/15 text-slate-200 border-slate-500/30',
  Researched: 'bg-cyan-500/15 text-cyan-200 border-cyan-500/30',
  Contacted: 'bg-blue-500/15 text-blue-200 border-blue-500/30',
  Interested: 'bg-violet-500/15 text-violet-200 border-violet-500/30',
  'Audit Sent': 'bg-indigo-500/15 text-indigo-200 border-indigo-500/30',
  'Call Booked': 'bg-fuchsia-500/15 text-fuchsia-200 border-fuchsia-500/30',
  'Proposal Sent': 'bg-amber-500/15 text-amber-200 border-amber-500/30',
  Won: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30',
  Lost: 'bg-rose-500/15 text-rose-200 border-rose-500/30',
  Nurture: 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30',
  Low: 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30',
  Medium: 'bg-blue-500/15 text-blue-200 border-blue-500/30',
  High: 'bg-amber-500/15 text-amber-200 border-amber-500/30',
  Hot: 'bg-rose-500/15 text-rose-200 border-rose-500/30',
  Urgent: 'bg-rose-500/20 text-rose-200 border-rose-500/40',
  New: 'bg-accent/15 text-accent border-accent/30',
  Reviewed: 'bg-cyan-500/15 text-cyan-200 border-cyan-500/30',
  Archived: 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30',
  Active: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30',
  Paused: 'bg-amber-500/15 text-amber-200 border-amber-500/30',
  Completed: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30',
  Done: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30',
  'To do': 'bg-slate-500/15 text-slate-200 border-slate-500/30',
  'In progress': 'bg-blue-500/15 text-blue-200 border-blue-500/30',
  Waiting: 'bg-amber-500/15 text-amber-200 border-amber-500/30',
  'Not started': 'bg-zinc-500/15 text-zinc-300 border-zinc-500/30',
}

export const StatusBadge = ({ value }: { value?: string | null }) => {
  if (!value) return null
  const cls = statusColors[value] ?? 'bg-surface-elevated text-muted-foreground border-border'
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider', cls)}>
      {value}
    </span>
  )
}

export const KpiCard = ({ label, value, hint, icon: Icon, urgent }: { label: string; value: string | number; hint?: string; icon?: any; urgent?: boolean }) => {
  const alarmed = urgent && Number(value) > 0
  return (
    <Panel className={cn('p-5 hover:border-white/[0.12] transition-colors', alarmed && 'border-rose-500/30 bg-rose-500/[0.025]')}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground leading-none">{label}</div>
          <div className={cn('mt-2 text-3xl sm:text-4xl font-bold tracking-tight tabular-nums', alarmed ? 'text-rose-300' : 'text-foreground')}>{value}</div>
          {hint && <div className="mt-1 text-xs text-muted-foreground">{hint}</div>}
        </div>
        {Icon && (
          <div className={cn('h-10 w-10 rounded-xl shrink-0 flex items-center justify-center', alarmed ? 'bg-rose-500/12 border border-rose-500/25' : 'bg-accent/10 border border-accent/20')}>
            <Icon size={17} className={alarmed ? 'text-rose-400' : 'text-accent'} />
          </div>
        )}
      </div>
    </Panel>
  )
}

export const EmptyState = ({ title, description, action, icon: Icon }: { title: string; description?: string; action?: ReactNode; icon?: any }) => (
  <div className="text-center py-16 px-4">
    {Icon && (
      <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center">
        <Icon size={20} className="text-muted-foreground" />
      </div>
    )}
    <div className="text-sm font-semibold text-foreground">{title}</div>
    {description && <div className="mt-1 text-sm text-muted-foreground">{description}</div>}
    {action && <div className="mt-5 flex justify-center">{action}</div>}
  </div>
)

export const inputCls = 'h-11 w-full rounded-xl bg-surface border border-border px-4 text-[14px] text-foreground outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/10 transition-all placeholder:text-muted-foreground'
export const textareaCls = `${inputCls} h-auto py-3 resize-none`
export const selectCls = `${inputCls} cursor-pointer`
