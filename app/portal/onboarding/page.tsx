'use client'

import { useState, useTransition } from 'react'
import { usePortalAuth } from '@/contexts/PortalAuth'
import { ONBOARDING_TASKS } from '@/lib/types'
import { Panel, PageHeader } from '@/components/admin/ui'
import { CheckCircle, Circle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function OnboardingPage() {
  const { client } = usePortalAuth()
  const [completed, setCompleted] = useState<string[]>(client?.onboarding_completed ?? [])
  const [isPending, startTransition] = useTransition()

  if (!client) return null

  const pct = Math.round((completed.length / ONBOARDING_TASKS.length) * 100)

  const toggle = (key: string) => {
    const next = completed.includes(key)
      ? completed.filter(k => k !== key)
      : [...completed, key]

    setCompleted(next)
    startTransition(async () => {
      const res = await fetch('/api/portal/update-onboarding', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: next }),
      })
      if (!res.ok) {
        setCompleted(completed)
        toast.error('Failed to save. Please try again.')
      }
    })
  }

  return (
    <div>
      <PageHeader
        eyebrow="Getting started"
        title="Onboarding checklist"
        description="Complete these items so we can get your campaigns live as quickly as possible."
      />

      {/* Progress bar */}
      <Panel className="p-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-sm font-semibold">{completed.length} of {ONBOARDING_TASKS.length} complete</span>
            {completed.length === ONBOARDING_TASKS.length && (
              <span className="ml-2 text-[11px] font-bold uppercase tracking-wider text-accent">All done!</span>
            )}
          </div>
          <span className="text-[22px] font-bold tabular-nums text-accent">{pct}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-surface-elevated overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </Panel>

      {/* Task list */}
      <div className="space-y-3">
        {ONBOARDING_TASKS.map((task, idx) => {
          const done = completed.includes(task.key)
          return (
            <Panel
              key={task.key}
              className={`p-0 transition-colors hover:border-white/[0.12] ${done ? 'opacity-70' : ''}`}
            >
              <button
                className="w-full text-left p-5 cursor-pointer"
                onClick={() => toggle(task.key)}
              >
              <div className="flex items-start gap-4">
                <div className="shrink-0 pt-0.5">
                  {isPending ? (
                    <Loader2 size={18} className="text-muted-foreground animate-spin" />
                  ) : done ? (
                    <CheckCircle size={18} className="text-accent" />
                  ) : (
                    <Circle size={18} className="text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-mono text-muted-foreground">0{idx + 1}</span>
                    <p className={`text-[14px] font-semibold ${done ? 'line-through text-muted-foreground' : ''}`}>
                      {task.label}
                    </p>
                  </div>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{task.description}</p>
                </div>
                <div className={`shrink-0 h-6 px-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center ${
                  done
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'bg-surface-elevated text-muted-foreground border border-border'
                }`}>
                  {done ? 'Done' : 'Pending'}
                </div>
              </div>
              </button>
            </Panel>
          )
        })}
      </div>

      <p className="mt-6 text-[12px] text-muted-foreground text-center">
        Need help with any of these? <a href="mailto:keveend10@gmail.com" className="text-accent hover:underline">Email us →</a>
      </p>
    </div>
  )
}
